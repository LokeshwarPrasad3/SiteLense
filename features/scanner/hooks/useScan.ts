import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { ScanQueryResponse, StartScanResponse } from '@/features/scanner/types/scan-api.types';

const DEFAULT_POLL_INTERVAL_MS = 4000;

export const useScan = () => {
  const [scanId, setScanId] = useState<string | null>(null);

  const startScanMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await axios.post<StartScanResponse>('/api/scan', { url });
      return response.data;
    },
    onSuccess: (data) => {
      setScanId(data.scanId);
    },
  });

  const scanQuery = useQuery({
    queryKey: ['scan', scanId],
    queryFn: async () => {
      const response = await axios.get<ScanQueryResponse>(`/api/scan?id=${scanId}`);
      return response.data;
    },
    enabled: !!scanId,
    refetchInterval: (query) => {
      const data = query.state.data;
      return data?.status === 'pending' ? (data.nextPollMs ?? DEFAULT_POLL_INTERVAL_MS) : false;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
    retry: 1,
    staleTime: 0,
  });

  const executeScan = useCallback(
    (url: string) => {
      if (startScanMutation.isPending || scanQuery.data?.status === 'pending') {
        return;
      }

      setScanId(null);
      startScanMutation.reset();
      startScanMutation.mutate(url);
    },
    [scanQuery, startScanMutation]
  );

  const error =
    (startScanMutation.error as any)?.response?.data?.error ||
    startScanMutation.error?.message ||
    (scanQuery.data?.status === 'error' ? scanQuery.data.error : null) ||
    (scanQuery.error as any)?.response?.data?.error ||
    scanQuery.error?.message ||
    null;

  const isLoading = startScanMutation.isPending || scanQuery.data?.status === 'pending';
  const scanData = scanQuery.data?.status === 'done' ? scanQuery.data.data : null;

  return {
    data: scanData,
    error,
    isLoading,
    executeScan,
    isPending: startScanMutation.isPending,
    scanId,
    pollCount: scanQuery.data?.status === 'pending' ? scanQuery.data.pollCount : 0,
  };
};
