import type { ScanResponse } from '@/features/scanner/types/scan.types';

export type PendingScanRecord = {
  id: string;
  url: string;
  status: 'pending';
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
  pollCount: number;
};

export type CompletedScanRecord = {
  id: string;
  url: string;
  status: 'done';
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
  data: ScanResponse;
};

export type ErrorScanRecord = {
  id: string;
  url: string;
  status: 'error';
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
  error: string;
};

export type ScanRecord = PendingScanRecord | CompletedScanRecord | ErrorScanRecord;

export type ScanStore = {
  records: Map<string, ScanRecord>;
  idsByUrl: Map<string, string>;
};
