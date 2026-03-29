'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense, useMemo, useRef } from 'react';
import { usePdfExport } from '@/hooks/usePdfExport';
import { useScan } from '@/features/scanner/hooks/useScan';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Refactored Sections and Components
import ModernLoader from '@/features/scanner/components/ModernLoader';
import PdfReport from '@/features/scanner/components/PdfReport';
import { useConfetti } from '@/hooks/useConfetti';
import { startRouteProgress } from '@/lib/route-progress';

// Layout sections
import { ReportHeader } from '@/features/scanner/components/sections/ReportHeader';
import { ReportSummaryCards } from '@/features/scanner/components/sections/ReportSummaryCards';
import { ReportCharts } from '@/features/scanner/components/sections/ReportCharts';
import { ReportDetails } from '@/features/scanner/components/sections/ReportDetails';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');
  const initialScanId = searchParams.get('id');

  const { data, error, isLoading, executeScan, scanId } = useScan(initialScanId);
  const { fireConfetti } = useConfetti();
  const resultsRef = useRef<HTMLDivElement>(null);
  const showLoader = isLoading && !data && !error;

  const hostname = useMemo(() => {
    if (!url) return null;
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  }, [url]);

  const pdfRef = useRef<HTMLDivElement>(null);
  const { exportToPdf, isGenerating } = usePdfExport(`site-report-${hostname || 'analysis'}.pdf`);

  const hasTriggered = useRef(false);

  useEffect(() => {
    if (url && !scanId && !hasTriggered.current) {
      executeScan(url);
      hasTriggered.current = true;
    }
  }, [url, scanId, executeScan]);

  useEffect(() => {
    if (data && !isLoading && !error) {
      fireConfetti();
    }
  }, [data, isLoading, error, fireConfetti]);

  if (!url || !hostname) {
    return (
      <SectionWrapper className="pt-28 md:pt-40">
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <AlertCircle className="mb-4 size-16 text-red-500" />
          <h1 className="mb-2 text-3xl font-black text-gray-900">Invalid Request</h1>
          <p className="text-lg text-gray-500">No valid URL was provided for scanning.</p>
          <Button
            onClick={() => {
              startRouteProgress();
              router.push('/');
            }}
            variant="default"
            className="mt-8 h-12 rounded-xl px-10 shadow-lg shadow-indigo-200"
          >
            Go back to safety
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="pt-28 pb-20 md:pt-32">
      {showLoader && <ModernLoader hostname={hostname} />}

      {error && (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-3xl bg-red-50 p-6 text-red-500">
            <AlertCircle className="size-12" />
          </div>
          <h1 className="mb-2 text-3xl font-black text-gray-900">Analysis Failed</h1>
          <p className="mb-10 max-w-md text-gray-500">{error}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => {
                startRouteProgress();
                router.push('/scan');
              }}
              variant="outline"
              className="h-12 rounded-xl border-gray-200 px-8 transition-colors hover:bg-gray-50"
            >
              Scan Other Website
            </Button>
            <Button
              onClick={() => executeScan(url)}
              variant="outline"
              className="h-12 rounded-xl border-gray-200 px-8 transition-colors hover:bg-gray-50"
            >
              Retry analysis
            </Button>
          </div>
        </div>
      )}

      {data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
          ref={resultsRef}
        >
          <ReportHeader
            hostname={hostname}
            url={url}
            onExport={() => exportToPdf(pdfRef.current)}
            isGenerating={isGenerating}
            onScanOther={() => {
              startRouteProgress();
              router.push('/scan');
            }}
          />
          <ReportSummaryCards data={data} url={url} hostname={hostname} />
          <ReportCharts data={data} />
          <ReportDetails data={data} />
        </motion.div>
      )}

      {data && (
        <div style={{ position: 'absolute', left: '-9999px', top: '0', zIndex: -1 }}>
          <PdfReport ref={pdfRef} data={data} hostname={hostname} url={url} />
        </div>
      )}
    </SectionWrapper>
  );
}

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] selection:bg-indigo-100 selection:text-indigo-700">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-lg font-black tracking-tighter text-gray-300"
            >
              SITE ANALYSIS
            </motion.div>
          </div>
        }
      >
        <ResultContent />
      </Suspense>
    </div>
  );
}
