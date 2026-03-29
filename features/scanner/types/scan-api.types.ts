import type { ScanResponse } from '@/features/scanner/types/scan.types';

export type ScanApiStatus = 'pending' | 'done' | 'error';

export type StartScanResponse = {
  scanId: string;
  status: ScanApiStatus;
  reused: boolean;
};

export type PendingScanResponse = {
  status: 'pending';
  scanId: string;
  url: string;
  pollCount: number;
  nextPollMs: number;
  startedAt: string;
};

export type CompletedScanResponse = {
  status: 'done';
  scanId: string;
  url: string;
  completedAt: string;
  data: ScanResponse;
};

export type FailedScanResponse = {
  status: 'error';
  scanId: string;
  url: string;
  completedAt: string;
  error: string;
};

export type ScanQueryResponse = PendingScanResponse | CompletedScanResponse | FailedScanResponse;
