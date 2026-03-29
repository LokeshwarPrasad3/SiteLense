import { NextRequest, NextResponse } from 'next/server';
import {
  getScanJob,
  getScanPollIntervalMs,
  startScanJob,
} from '@/features/scanner/services/scan-orchestrator.service';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (typeof body?.url !== 'string' || !body.url.trim()) {
      return NextResponse.json({ error: 'Valid "url" is required.' }, { status: 400 });
    }

    const payload = startScanJob(body.url);
    return NextResponse.json(payload, {
      status: 202,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to start scan.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing "id" param.' }, { status: 400 });
  }

  const payload = getScanJob(id);
  if (!payload) {
    return NextResponse.json({ error: 'Scan ID not found or expired.' }, { status: 404 });
  }

  const headers = new Headers({ 'Cache-Control': 'no-store, max-age=0' });
  if (payload.status === 'pending') {
    headers.set('Retry-After', String(Math.ceil(getScanPollIntervalMs() / 1000)));
  }

  return NextResponse.json(payload, { status: 200, headers });
}
