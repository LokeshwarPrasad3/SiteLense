// app/scan/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { GradientText } from '@/features/landing/components/gradient-text';
import type { StartScanResponse } from '@/features/scanner/types/scan-api.types';
import { ArrowRight, Loader2 } from 'lucide-react';
import { startRouteProgress } from '@/lib/route-progress';

export default function ScanPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    const fullUrl = `https://${url}`;
    try {
      new URL(fullUrl);
      setError('');
      setIsSubmitting(true);

      const response = await axios.post<StartScanResponse>('/api/scan', { url: fullUrl });
      const scanId = response.data.scanId;

      startRouteProgress();
      router.push(`/result?url=${encodeURIComponent(fullUrl)}&id=${encodeURIComponent(scanId)}`);
    } catch (err) {
      setError('Please enter a valid URL.');
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? 'Failed to start analysis.');
      }
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper className="pt-28 md:pt-40">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl/tight">
          Scan Your Website's <br />
          <GradientText className="relative inline-block">
            Performance.
            <span className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-indigo-50/80" />
          </GradientText>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl/relaxed">
          Enter a URL to analyze your website's performance, SEO, accessibility, and best practices.
        </p>

        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
          <div className="group relative flex flex-grow items-center overflow-hidden rounded-2xl border-2 border-gray-100 bg-white transition-all focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10">
            <div className="flex h-14 items-center pr-0 pl-4 text-lg font-semibold tracking-tight text-black/60 select-none">
              https://
            </div>
            <Input
              type="text"
              value={url}
              onChange={(e) => {
                const val = e.target.value.replace(/^https?:\/\//, '');
                setUrl(val);
              }}
              placeholder="example.com"
              className="h-14 border-0 bg-transparent px-4 ps-1 text-lg shadow-none focus-visible:ring-0"
              required
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="group h-14 rounded-2xl bg-indigo-600 px-8 text-base font-semibold shadow-2xl shadow-indigo-200/50 transition-all hover:bg-indigo-700 active:scale-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Analyze
              </>
            ) : (
              <>
                Analyze
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </SectionWrapper>
  );
}
