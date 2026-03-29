import type { ScanResponse } from '@/features/scanner/types/scan.types';

const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const SCAN_CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'] as const;
const PAGESPEED_TIMEOUT_MS = 45 * 1000;

function buildPageSpeedUrl(url: string) {
  const params = new URLSearchParams({ url, strategy: 'mobile' });
  SCAN_CATEGORIES.forEach((category) => params.append('category', category));

  if (process.env.PAGESPEED_API_KEY) {
    params.append('key', process.env.PAGESPEED_API_KEY);
  }

  return `${PAGESPEED_API_URL}?${params.toString()}`;
}

function mapPageSpeedResult(result: any): ScanResponse {
  const categories = result.lighthouseResult?.categories ?? {};
  const audits = result.lighthouseResult?.audits ?? {};
  const loadingExperience = result.loadingExperience?.metrics ?? {};

  if (!result.lighthouseResult) {
    throw new Error('Invalid response from Google PageSpeed API.');
  }

  const getAuditValue = (key: string) => audits[key]?.displayValue || 'N/A';

  let fcp = getAuditValue('first-contentful-paint');
  let lcp = getAuditValue('largest-contentful-paint');
  let cls = getAuditValue('cumulative-layout-shift');
  const tbt = getAuditValue('total-blocking-time');

  if (loadingExperience.FIRST_CONTENTFUL_PAINT_MS?.percentile) {
    fcp = `${(loadingExperience.FIRST_CONTENTFUL_PAINT_MS.percentile / 1000).toFixed(1)} s`;
  }
  if (loadingExperience.LARGEST_CONTENTFUL_PAINT_MS?.percentile) {
    lcp = `${(loadingExperience.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000).toFixed(1)} s`;
  }
  if (loadingExperience.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile) {
    cls = (loadingExperience.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100).toFixed(2);
  }

  const opportunities = Object.values(audits)
    .filter(
      (audit: any) =>
        audit.score !== null && audit.score < 1 && audit.details?.type === 'opportunity'
    )
    .map((audit: any) => ({
      title: audit.title,
      description: audit.description,
      score: audit.score,
      displayValue: audit.displayValue,
    }))
    .slice(0, 5);

  const diagnostics = Object.values(audits)
    .filter((audit: any) => audit.details?.type === 'diagnostic')
    .map((audit: any) => ({
      title: audit.title,
      description: audit.description,
      score: audit.score,
      displayValue: audit.displayValue,
      numericValue: audit.numericValue,
    }))
    .slice(0, 5);

  return {
    performance: Math.round((categories.performance?.score || 0) * 100),
    accessibility: Math.round((categories.accessibility?.score || 0) * 100),
    bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
    seo: Math.round((categories.seo?.score || 0) * 100),
    metrics: { fcp, lcp, cls, tbt },
    opportunities,
    diagnostics,
    realUser: Object.keys(loadingExperience).length > 0,
  };
}

export async function runPageSpeedScan(url: string) {
  const response = await fetch(buildPageSpeedUrl(url), {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal: AbortSignal.timeout(PAGESPEED_TIMEOUT_MS),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || `Google API status ${response.status}`);
  }

  const payload = await response.json();
  return mapPageSpeedResult(payload);
}
