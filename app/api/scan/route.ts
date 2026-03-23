// app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// 1. In-memory store safely attached to globalThis for dev HMR
const globalStore = globalThis as unknown as { scanStore: Record<string, any> };
const scanStore = globalStore.scanStore || (globalStore.scanStore = {});

const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// Background processor
async function processScanInBackground(scanId: string, url: string) {
  try {
    const apiKey = process.env.PAGESPEED_API_KEY;
    const params = new URLSearchParams({ url, strategy: 'mobile' });

    // Restore all categories (Safe now since it's background processed)
    const scanCategories = ['performance', 'accessibility', 'best-practices', 'seo'];
    scanCategories.forEach((category) => params.append('category', category));

    if (apiKey) params.append('key', apiKey);

    const apiUrl = `${PAGESPEED_API_URL}?${params.toString()}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      scanStore[scanId] = {
        status: 'error',
        error: errorData?.error?.message || `Google API status ${response.status}`,
      };
      return;
    }

    const data = await response.json();

    if (!data.lighthouseResult) {
      scanStore[scanId] = { status: 'error', error: 'Invalid response from Google API.' };
      return;
    }

    const categories = data.lighthouseResult.categories || {};
    const audits = data.lighthouseResult.audits || {};
    const loadingExperience = data.loadingExperience?.metrics || {};

    const getAuditValue = (key: string) => audits[key]?.displayValue || 'N/A';

    let fcp = getAuditValue('first-contentful-paint');
    let lcp = getAuditValue('largest-contentful-paint');
    let cls = getAuditValue('cumulative-layout-shift');
    let tbt = getAuditValue('total-blocking-time');

    const hasRealUser = Object.keys(loadingExperience).length > 0;
    if (hasRealUser) {
      if (loadingExperience.FIRST_CONTENTFUL_PAINT_MS?.percentile) {
        fcp = `${(loadingExperience.FIRST_CONTENTFUL_PAINT_MS.percentile / 1000).toFixed(1)} s`;
      }
      if (loadingExperience.LARGEST_CONTENTFUL_PAINT_MS?.percentile) {
        lcp = `${(loadingExperience.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000).toFixed(1)} s`;
      }
      if (loadingExperience.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile) {
        cls = (loadingExperience.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100).toFixed(2);
      }
    }

    // Map opportunities (crucial for frontend /result page mapping)
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

    // Map diagnostics
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

    scanStore[scanId] = {
      status: 'done',
      data: {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
        metrics: { fcp, lcp, cls, tbt },
        opportunities,
        diagnostics,
        realUser: hasRealUser,
      },
    };
  } catch (error: unknown) {
    console.error(`Background scan failed for ${scanId}:`, error);
    scanStore[scanId] = {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = body?.url;

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Valid "url" is required.' }, { status: 400 });
    }

    const scanId = crypto.randomUUID();
    scanStore[scanId] = { status: 'pending' };

    // 3. FIX: Execute immediately without await so the promise initiates.
    // In next dev, setTimeout can cause the macro-task to hang indefinitely when the response is flushed.
    processScanInBackground(scanId, url).catch(console.error);

    return NextResponse.json({ scanId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to start scan.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing "id" param.' }, { status: 400 });

  const result = scanStore[id];
  if (!result)
    return NextResponse.json({ error: 'Scan ID not found or expired.' }, { status: 404 });

  return NextResponse.json(result, { status: 200 });
}
