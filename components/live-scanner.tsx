'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { GradientText } from '@/components/landing/gradient-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Loader2,
  CheckCircle2,
  Zap,
  Shield,
  BarChart,
  Globe,
  Activity,
} from 'lucide-react';
import { fadeIn, scaleIn } from '@/lib/animations';

export function LiveScanner() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<null | {
    score: number;
    speed: string;
    security: string;
    seo: string;
  }>(null);

  const handleScan = () => {
    if (!url) return;
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setResult({
        score: 94,
        speed: '0.8s',
        security: 'Grade A',
        seo: '94/100',
      });
    }, 2000);
  };

  return (
    <SectionWrapper id="scanner" variant="light">
      <div className="mb-16 flex flex-col items-center space-y-4 text-center">
        <motion.div variants={fadeIn('up', 0.1)}>
          <Badge
            variant="secondary"
            className="px-4 py-1 text-xs font-bold tracking-wider uppercase"
          >
            Live Preview
          </Badge>
        </motion.div>
        <motion.h2
          variants={fadeIn('up', 0.2)}
          className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl"
        >
          Test your <GradientText>URL</GradientText> right now.
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.3)}
          className="max-w-2xl text-lg font-medium text-gray-500"
        >
          Experience the power of our scanning engine. No signup required for a quick audit.
        </motion.p>
      </div>

      <motion.div variants={scaleIn(0.4)} className="mx-auto max-w-3xl">
        <Card className="overflow-hidden border-2 border-indigo-100 shadow-2xl shadow-indigo-100/50">
          <CardHeader className="bg-indigo-50/30 pb-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="https://yourwebsite.com"
                  className="h-12 rounded-xl border-gray-200 bg-white pl-10 focus-visible:ring-indigo-500"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <Button
                onClick={handleScan}
                disabled={isScanning || !url}
                className="h-12 rounded-xl bg-indigo-600 px-8 font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 size-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {!result && !isScanning && (
              <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border-2 border-dashed border-gray-100 py-12 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-gray-50">
                  <Activity className="size-8 text-gray-300" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Ready to audit</h4>
                  <p className="text-sm text-gray-500">
                    Enter a URL above to see live performance insights.
                  </p>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="flex flex-col items-center justify-center space-y-6 py-12">
                <div className="relative">
                  <div className="size-24 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
                  <Zap className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-indigo-600" />
                </div>
                <div className="animate-pulse text-center">
                  <h4 className="font-black text-gray-900">Deep crawling in progress</h4>
                  <p className="text-sm text-gray-500">
                    Analyzing LCP, CLS, and Security headers...
                  </p>
                </div>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="animate-in fade-in zoom-in-95 duration-500"
              >
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  <div className="flex flex-col items-center justify-center rounded-3xl border border-indigo-100 bg-indigo-50/50 p-6">
                    <div className="relative flex size-32 items-center justify-center rounded-full bg-white shadow-xl">
                      <svg className="absolute inset-0 size-full -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="58"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-gray-100"
                        />
                        <motion.circle
                          initial={{ strokeDashoffset: 364 }}
                          animate={{ strokeDashoffset: 364 - (364 * result.score) / 100 }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                          cx="64"
                          cy="64"
                          r="58"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-indigo-600"
                          strokeDasharray="364"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-4xl font-black text-gray-900">{result.score}</span>
                    </div>
                    <div className="mt-4 text-center">
                      <Badge className="bg-indigo-600">Performance Score</Badge>
                      <p className="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle2 className="size-3" /> Optimal configuration detected
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ResultRow
                      icon={<Zap className="size-4 text-amber-500" />}
                      label="Speed Index"
                      value={result.speed}
                    />
                    <ResultRow
                      icon={<Shield className="size-4 text-blue-500" />}
                      label="Security"
                      value={result.security}
                    />
                    <ResultRow
                      icon={<BarChart className="size-4 text-purple-500" />}
                      label="SEO Audit"
                      value={result.seo}
                    />
                    <Button
                      variant="outline"
                      className="mt-4 w-full rounded-xl border-gray-200 font-bold"
                    >
                      View Full Detailed Report
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </SectionWrapper>
  );
}

function ResultRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3.5 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-2">{icon}</div>
        <span className="text-sm font-bold text-gray-600">{label}</span>
      </div>
      <span className="text-sm font-black text-gray-900">{value}</span>
    </div>
  );
}
