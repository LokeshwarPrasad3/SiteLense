// hooks/useScan.ts
import { useState, useCallback, useRef } from 'react';
import type { ScanResponse } from '@/features/scanner/types/scan.types';

export const useScan = () => {
  const [data, setData] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isRequesting = useRef<boolean>(false);

  const executeScan = useCallback(async (url: string) => {
    if (isRequesting.current) {
      console.log('Request already in progress, skipping new one.');
      return;
    }

    setIsLoading(true);
    isRequesting.current = true;
    setData(null);
    setError(null);

    try {
      // 1. Kickoff the background scan
      const startResponse = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const startResult = await startResponse.json();

      if (!startResponse.ok || !startResult.scanId) {
        throw new Error(startResult.error || 'Initialization failed.');
      }

      const scanId = startResult.scanId;

      // 2. Poll for the background scan results
      const pollServer = async () => {
        try {
          const pollResponse = await fetch(`/api/scan?id=${scanId}`);
          const pollResult = await pollResponse.json();

          if (!pollResponse.ok) {
            throw new Error(pollResult.error || 'Failed to check scan status.');
          }

          if (pollResult.status === 'pending') {
            // If still pending, poll again in 2.5 seconds
            setTimeout(pollServer, 2500);
          } else if (pollResult.status === 'error') {
            setError(pollResult.error || 'Analysis failed on the server.');
            setIsLoading(false);
            isRequesting.current = false;
          } else if (pollResult.status === 'done') {
            setData(pollResult.data as ScanResponse);
            setIsLoading(false);
            isRequesting.current = false;
          }
        } catch (pollErr: any) {
          setError(pollErr.message || 'Error occurred while checking result.');
          setIsLoading(false);
          isRequesting.current = false;
        }
      };

      // Begin polling loop
      pollServer();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setIsLoading(false);
      isRequesting.current = false;
    }
  }, []);

  return { data, error, isLoading, isRequesting: isRequesting.current, executeScan };
};
