// lib/services/scan.service.ts
import type { ScanRequest } from '@/lib/validators/scan.validator';
import type { ScanResponse, AuditItem, Metric } from '@/lib/types/scan.types';
import { createErrorResponse } from '@/lib/utils/error'; // Import error utility

// Assume PageSpeed Insights API URL and categories are needed
const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const SCAN_CATEGORIES = ['performance', 'seo', 'accessibility', 'best_practices']; // Note: 'best practices' is underscore in API
const API_FETCH_TIMEOUT_MS = 15000; // 15 seconds timeout for API request

/**
 * Fetches data from the Google PageSpeed Insights API.
 * @param {string} url - The URL to scan.
 * @param {string | undefined} apiKey - The Google API key.
 * @returns {Promise<any>} The raw API response.
 */
const fetchPageSpeedInsights = async (url: string, apiKey?: string): Promise<any> => {
  const params = new URLSearchParams({
    url: url,
    category: SCAN_CATEGORIES.join(','),
    // strategy: 'mobile', // Defaulting to mobile, can be added as an option
  });

  let apiUrl = `${PAGESPEED_API_URL}?${params.toString()}`;
  if (apiKey) {
    apiUrl += `&key=${apiKey}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // Clear timeout if fetch completes in time

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`PageSpeed Insights API fetch failed for ${url}:`, error);
    if (error.name === 'AbortError') {
      throw new Error('PageSpeed Insights API request timed out.');
    }
    // Re-throw other errors with a more descriptive message
    throw new Error(error.message || 'Failed to fetch data from PageSpeed Insights API.');
  }
};

/**
 * Maps the raw PageSpeed Insights API response to our defined ScanResponse structure.
 * @param {any} psiResult - The raw result from PageSpeed Insights API.
 * @returns {ScanResponse} The structured scan data.
 */
const mapPageSpeedResult = (psiResult: any): ScanResponse => {
  const categories = psiResult.lighthouseResult?.categories;
  const audits = psiResult.lighthouseResult?.audits;
  const loadingExperience = psiResult.loadingExperience;

  if (!categories || !audits || !loadingExperience) {
    throw new Error('Incomplete data received from PageSpeed Insights API.');
  }

  // Extract scores and convert from 0-1 to 0-100
  const performance = Math.round((categories.performance.score || 0) * 100);
  const accessibility = Math.round((categories.accessibility.score || 0) * 100);
  const bestPractices = Math.round((categories['best_practices'].score || 0) * 100);
  const seo = Math.round((categories.seo.score || 0) * 100);

  // Extract key metrics from loadingExperience or audits
  const metrics: Metric = {
    // PageSpeed API returns these as strings or numbers, need careful conversion
    lcp: loadingExperience.metrics.LCP?.displayValue || audits['largest-contentful-paint']?.displayValue || 'N/A',
    cls: loadingExperience.metrics.CLS?.displayValue || audits['cumulative-layout-shift']?.displayValue || 'N/A',
    fcp: loadingExperience.metrics.FCP?.displayValue || audits['first-contentful-paint']?.displayValue || 'N/A',
    tbt: loadingExperience.metrics.TBT?.displayValue || audits['total-blocking-time']?.displayValue || 'N/A',
  };

  // Map opportunities
  const opportunities = Object.values(audits)
    .filter((audit: any) => audit.score !== null && audit.score < 1 && audit.details?.type === 'opportunity')
    .map((audit: any): AuditItem => ({
      title: audit.title,
      description: audit.description,
      score: audit.score,
      displayValue: audit.displayValue,
    }))
    .slice(0, 5);

  // Map diagnostics
  const diagnostics = Object.values(audits)
    .filter((audit: any) => audit.details?.type === 'diagnostic')
    .map((audit: any): AuditItem => ({
      title: audit.title,
      description: audit.description,
      score: audit.score, // Score might be null for diagnostics
      displayValue: audit.displayValue,
      numericValue: audit.numericValue,
    }))
    .slice(0, 5);

  return {
    performance,
    accessibility,
    bestPractices,
    seo,
    metrics,
    opportunities,
    diagnostics,
  };
};

/**
 * Performs website analysis using Google PageSpeed Insights API.
 * @param {ScanRequest} request - The validated request object.
 * @returns {Promise<ScanResponse>} A promise that resolves to the structured scan data.
 */
export const performScan = async (request: ScanRequest): Promise<ScanResponse> => {
  const { url } = request;
  const apiKey = process.env.PAGESPEED_API_KEY; // Get API key from environment variables

  if (!apiKey) {
    console.warn('PageSpeed Insights API key not found. Running without API key might limit results or fail.');
    // Consider throwing an error if API key is strictly required
    // throw new Error('PageSpeed Insights API key is missing.');
  }

  try {
    const psiResult = await fetchPageSpeedInsights(url, apiKey);
    const scanData = mapPageSpeedResult(psiResult);
    return scanData;
  } catch (error) {
    console.error(`PageSpeed Insights scan failed for URL: ${url}`, error);
    throw error; // Re-throw error to be caught by API route
  }
};

// History update: 2026-03-09T23:00:29

// Dev session update: 2026-03-09T21:16:23
