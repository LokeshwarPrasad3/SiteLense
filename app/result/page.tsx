// app/result/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useScan } from '@/hooks/useScan';
import type { ScanResponse } from '@/lib/types/scan.types';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Zap,
  Activity,
  CheckCircle2,
  Search,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

// Import local components
import Loader from '@/components/results/Loader';
import ScoreCard from '@/components/results/ScoreCard';
import MetricCard from '@/components/results/MetricCard';
import ChartCard from '@/components/results/ChartCard';
import OpportunityCard from '@/components/results/OpportunityCard';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');

  const { data, error, isLoading, isRequesting, executeScan } = useScan();

  useEffect(() => {
    if (url) {
      executeScan(url);
    }
  }, [url, executeScan]);

  const getHostname = (urlString: string | null): string | null => {
    if (!urlString) return null;
    try {
      return new URL(urlString).hostname;
    } catch (e) {
      return null;
    }
  };

  const hostname = getHostname(url);

  if (!url || !hostname) {
    return (
      <SectionWrapper className="pt-28 md:pt-40">
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-3xl font-bold text-red-600">Invalid Request</h1>
          <p className="text-lg text-gray-700">No valid URL was provided for scanning.</p>
          <Button onClick={() => router.push('/')} className="mt-6">
            Go to Home
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="pt-28 md:pt-40">
      {isLoading && (
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <Loader text="Analyzing your website..." />
        </div>
      )}

      {error && (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-3xl font-bold text-red-600">Scan Failed</h1>
          <p className="mb-6 max-w-xl text-lg text-gray-700">{error}</p>
          {/* Retry button */}
          <Button onClick={() => executeScan(url)} variant="outline" className="h-12 px-6">
            Try Again
          </Button>
        </div>
      )}

      {data && (
        <div className="space-y-12">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900">
            Website Analysis Result for <br />
            <span className="inline-flex items-center gap-2 text-indigo-600">
              {hostname}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${hostname}`}
              >
                <ExternalLink className="size-5 text-indigo-500 transition-colors hover:text-indigo-700" />
              </a>
            </span>
          </h1>

          {/* Score Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ScoreCard title="Performance" score={data.performance} />
            <ScoreCard title="SEO" score={data.seo} />
            <ScoreCard title="Accessibility" score={data.accessibility} />
            <ScoreCard title="Best Practices" score={data.bestPractices} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartCard
              title="Performance Score"
              chartType="radialBar"
              series={[data.performance]}
              options={{
                chart: {
                  height: 280,
                  toolbar: { show: false },
                },
                plotOptions: {
                  radialBar: {
                    hollow: { size: '60%' },
                    dataLabels: {
                      name: { show: false },
                      value: {
                        formatter: function (val: string) {
                          return parseInt(val, 10).toString();
                        },
                        offsetY: 8,
                        color: '#1F2937',
                        fontSize: '24px',
                        fontWeight: 800,
                      },
                    },
                    track: {
                      background: '#e5e7eb', // Gray-200
                      strokeWidth: '12',
                    },
                    dataLabels: {
                      total: {
                        show: true,
                        label: 'Score',
                        formatter: function (val: { globals: { seriesTotals: number[] } }) {
                          return val.globals.seriesTotals[0];
                        },
                        style: {
                          colors: ['#1F2937'],
                          fontSize: '16px',
                          fontWeight: 700,
                        },
                      },
                    },
                  },
                },
                fill: {
                  colors: ['#4F46E5'], // Indigo color
                },
                stroke: {
                  lineCap: 'round',
                },
                labels: ['Performance'],
                grid: {
                  padding: {
                    top: -30,
                    bottom: -20,
                  },
                },
              }}
            />
            <ChartCard
              title="Key Metrics"
              chartType="bar"
              series={[
                {
                  name: 'Value',
                  data: [
                    { x: 'LCP', y: parseFloat(data.metrics.lcp.replace('s', '')) * 1000 },
                    { x: 'CLS', y: parseFloat(data.metrics.cls) * 1000 },
                    { x: 'FCP', y: parseFloat(data.metrics.fcp.replace('s', '')) * 1000 },
                    { x: 'TBT', y: parseFloat(data.metrics.tbt.replace('ms', '')) },
                  ],
                },
              ]}
              options={{
                chart: { id: 'metrics-bar', toolbar: { show: false }, height: 280 },
                xaxis: { type: 'category' },
                yaxis: {
                  title: { text: 'Value (ms)' },
                  labels: {
                    formatter: function (val: number) {
                      return val >= 1000 ? `${val / 1000}s` : `${val}ms`;
                    },
                  },
                },
                colors: ['#4F46E5'], // Indigo color
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '60%',
                    borderRadius: 6,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                grid: {
                  borderColor: '#e5e7eb', // Gray-200
                  row: { colors: ['transparent', 'transparent'], colors: ['#f9fafb'] },
                },
                tooltip: {
                  y: {
                    formatter: function (val: number) {
                      return val >= 1000 ? `${val / 1000}s` : `${val}ms`;
                    },
                  },
                },
              }}
            />
          </div>

          {/* Metrics and Opportunities Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Key Metrics</h2>
              <div className="space-y-4">
                <MetricCard label="LCP" value={data.metrics.lcp} />
                <MetricCard label="CLS" value={data.metrics.cls} />
                <MetricCard label="FCP" value={data.metrics.fcp} />
                <MetricCard label="TBT" value={data.metrics.tbt} />
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Opportunities</h2>
              {data.opportunities.length > 0 ? (
                <div className="space-y-4">
                  {data.opportunities.map((opp, index) => (
                    <OpportunityCard
                      key={index}
                      title={opp.title}
                      description={opp.description}
                      displayValue={opp.displayValue}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No specific opportunities found for improvement.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
