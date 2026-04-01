import type { StartScanResponse, ScanQueryResponse } from '@/features/scanner/types/scan-api.types';
import type { PendingScanRecord } from '@/features/scanner/types/scan-job.types';
import { runPageSpeedScan } from '@/features/scanner/services/pagespeed-api.service';
import {
  cleanupExpiredScans,
  getReusableScanByUrl,
  getScanById,
  incrementPendingPoll,
  markScanError,
  saveScan,
} from '@/features/scanner/services/scan-store.service';

const SCAN_RESULT_TTL_MS = 10 * 60 * 1000;
const SCAN_ERROR_TTL_MS = 3 * 60 * 1000;
const SCAN_PENDING_TIMEOUT_MS = 90 * 1000;
const DEFAULT_POLL_INTERVAL_MS = 4000;

function normalizeUrl(input: string) {
  const parsed = new URL(input);
  parsed.hash = '';
  parsed.hostname = parsed.hostname.toLowerCase();

  if (
    (parsed.protocol === 'https:' && parsed.port === '443') ||
    (parsed.protocol === 'http:' && parsed.port === '80')
  ) {
    parsed.port = '';
  }

  if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }

  return parsed.toString();
}

function toPendingResponse(record: PendingScanRecord): ScanQueryResponse {
  return {
    status: 'pending',
    scanId: record.id,
    url: record.url,
    pollCount: record.pollCount,
    nextPollMs: DEFAULT_POLL_INTERVAL_MS,
    startedAt: new Date(record.createdAt).toISOString(),
  };
}

async function runScan(record: PendingScanRecord) {
  try {
    const data = await runPageSpeedScan(record.url);
    const now = Date.now();

    saveScan({
      id: record.id,
      url: record.url,
      status: 'done',
      createdAt: record.createdAt,
      updatedAt: now,
      expiresAt: now + SCAN_RESULT_TTL_MS,
      data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to complete the PageSpeed analysis.';
    markScanError(record, message, SCAN_ERROR_TTL_MS);
  }
}

function createPendingScan(url: string, now: number) {
  const record: PendingScanRecord = {
    id: crypto.randomUUID(),
    url,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    expiresAt: now + SCAN_PENDING_TIMEOUT_MS,
    pollCount: 0,
  };

  saveScan(record);
  void runScan(record);
  return record;
}

export function startScanJob(rawUrl: string): StartScanResponse {
  cleanupExpiredScans();

  const normalizedUrl = normalizeUrl(rawUrl.trim());
  const now = Date.now();
  const reusable = getReusableScanByUrl(normalizedUrl, now);

  if (reusable) {
    return {
      scanId: reusable.id,
      status: reusable.status,
      reused: true,
    };
  }

  const record = createPendingScan(normalizedUrl, now);
  return {
    scanId: record.id,
    status: record.status,
    reused: false,
  };
}

export function getScanJob(scanId: string): ScanQueryResponse | null {
  cleanupExpiredScans();

  const record = getScanById(scanId);
  if (!record) {
    return null;
  }

  if (record.status === 'pending') {
    const now = Date.now();

    if (now >= record.expiresAt) {
      const failedRecord = markScanError(
        record,
        'Scan timed out while waiting for Google PageSpeed.',
        SCAN_ERROR_TTL_MS,
        now
      );

      return {
        status: 'error',
        scanId: failedRecord.id,
        url: failedRecord.url,
        completedAt: new Date(failedRecord.updatedAt).toISOString(),
        error: failedRecord.error,
      };
    }

    const updatedRecord = incrementPendingPoll(record, now);
    return toPendingResponse(updatedRecord);
  }

  if (record.status === 'done') {
    return {
      status: 'done',
      scanId: record.id,
      url: record.url,
      completedAt: new Date(record.updatedAt).toISOString(),
      data: record.data,
    };
  }

  return {
    status: 'error',
    scanId: record.id,
    url: record.url,
    completedAt: new Date(record.updatedAt).toISOString(),
    error: record.error,
  };
}

export function getScanPollIntervalMs() {
  return DEFAULT_POLL_INTERVAL_MS;
}
