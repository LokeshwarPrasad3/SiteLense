import type {
  ErrorScanRecord,
  PendingScanRecord,
  ScanRecord,
  ScanStore,
} from '@/features/scanner/types/scan-job.types';

declare global {
  var __siteLenseScanStore: ScanStore | undefined;
}

function createStore(): ScanStore {
  return {
    records: new Map<string, ScanRecord>(),
    idsByUrl: new Map<string, string>(),
  };
}

export function getScanStore() {
  globalThis.__siteLenseScanStore ??= createStore();
  return globalThis.__siteLenseScanStore;
}

export function cleanupExpiredScans(now = Date.now()) {
  const store = getScanStore();

  for (const [id, record] of store.records.entries()) {
    if (record.expiresAt > now) {
      continue;
    }

    store.records.delete(id);
    if (store.idsByUrl.get(record.url) === id) {
      store.idsByUrl.delete(record.url);
    }
  }
}

export function getScanById(id: string) {
  return getScanStore().records.get(id) ?? null;
}

export function getReusableScanByUrl(url: string, now: number) {
  const store = getScanStore();
  const existingId = store.idsByUrl.get(url);

  if (!existingId) {
    return null;
  }

  const record = store.records.get(existingId);
  if (!record) {
    store.idsByUrl.delete(url);
    return null;
  }

  if (record.expiresAt <= now) {
    store.records.delete(existingId);
    store.idsByUrl.delete(url);
    return null;
  }

  return record;
}

export function saveScan(record: ScanRecord) {
  const store = getScanStore();
  store.records.set(record.id, record);
  store.idsByUrl.set(record.url, record.id);
  return record;
}

export function incrementPendingPoll(record: PendingScanRecord, now: number) {
  const updatedRecord: PendingScanRecord = {
    ...record,
    pollCount: record.pollCount + 1,
    updatedAt: now,
  };

  saveScan(updatedRecord);
  return updatedRecord;
}

export function markScanError(
  record: PendingScanRecord,
  error: string,
  ttlMs: number,
  now = Date.now()
) {
  const failedRecord: ErrorScanRecord = {
    id: record.id,
    url: record.url,
    status: 'error',
    createdAt: record.createdAt,
    updatedAt: now,
    expiresAt: now + ttlMs,
    error,
  };

  saveScan(failedRecord);
  return failedRecord;
}
