// hooks/useScan.ts
import { useState, useCallback, useRef } from 'react';
import type { ScanResponse } from '@/lib/types/scan.types';

type ScanApiError = { message: string };

export const useScan = () => {
  const [data, setData] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isRequesting = useRef<boolean>(false); // Use ref to prevent dependency changes

  const executeScan = useCallback(async (url: string) => {
    // Prevent multiple concurrent requests
    if (isRequesting.current) {
      console.log('Request already in progress, skipping new one.');
      return;
    }

    setIsLoading(true);
    isRequesting.current = true; // Set requesting flag
    setData(null);
    setError(null);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error((result as ScanApiError).message || 'An unknown error occurred.');
      }

      setData(result.data as ScanResponse);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
      isRequesting.current = false; // Reset requesting flag
    }
  }, []);

  return { data, error, isLoading, isRequesting: isRequesting.current, executeScan }; // Expose isRequesting if needed by UI
};
