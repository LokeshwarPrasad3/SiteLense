'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Zap,
  Activity,
  CheckCircle2,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { GradientText } from '@/components/landing/gradient-text';
import { fadeIn, scaleIn } from '@/lib/animations';

export function Hero() {
  return (
    <SectionWrapper className="pt-28 md:pt-40">
      {/* Background Premium Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-full -translate-x-1/2 overflow-hidden opacity-60">
        <div className="absolute top-[-10%] left-[-15%] h-[600px] w-[600px] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute top-[5%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-50/50 blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] h-[400px] w-[400px] rounded-full bg-blue-50/30 blur-[100px]" />
      </div>

      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        {/* Left Column: Modern Typography & Content */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          <motion.div variants={fadeIn('right', 0.1)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1 pr-4 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-100/50">
              <span className="flex h-5 items-center rounded-full bg-indigo-600 px-2 text-[10px] text-white">
                New
              </span>
              <span className="flex items-center gap-1">
                V2.0 Scanner is live <ChevronRight className="size-3" />
              </span>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              variants={fadeIn('right', 0.2)}
              className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl/tight"
            >
              Your website, <br />
              <GradientText className="relative inline-block">
                fully optimized.
                <span className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-indigo-50/80" />
              </GradientText>
            </motion.h1>
            <motion.p
              variants={fadeIn('right', 0.3)}
              className="max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl/relaxed"
            >
              SiteLens gives you the data you need to build faster, safer, and more discoverable web
              experiences in seconds.
            </motion.p>
          </div>

          <motion.div variants={fadeIn('right', 0.4)} className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="group h-14 rounded-2xl bg-indigo-600 px-8 text-base font-semibold shadow-2xl shadow-indigo-200/50 transition-all hover:bg-indigo-700 active:scale-95"
            >
              Start Free Scan
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 rounded-2xl border-gray-200 bg-white px-8 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
            >
              View Live Demo
            </Button>
          </motion.div>

          <motion.div
            variants={fadeIn('right', 0.5)}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4"
          >
            <FeatureItem text="Enterprise Security" />
            <FeatureItem text="SEO Insights" />
            <FeatureItem text="Core Web Vitals" />
          </motion.div>
        </div>

        {/* Right Column: Professional Visual Mockup */}
        <motion.div
          variants={scaleIn(0.4)}
          className="relative flex items-center justify-center md:col-span-1 lg:col-span-1"
        >
          {/* Background Decorative Rings */}
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-indigo-50/30 blur-2xl" />

          {/* Main Application Card */}
          <div className="relative z-10 overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex flex-col">
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/30 px-6 py-3">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full border border-red-400/30 bg-red-400/20" />
                    <div className="size-2.5 rounded-full border border-amber-400/30 bg-amber-400/20" />
                    <div className="size-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/20" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-white px-3 py-1 shadow-xs">
                    <Globe className="size-3 text-indigo-500" />
                    <span className="text-[10px] font-semibold text-gray-400">https://</span>
                    <span className="text-[10px] font-bold text-gray-700">acme-corp.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  <span className="text-[9px] font-black tracking-widest text-gray-400 uppercase">
                    Live
                  </span>
                </div>
              </div>

              {/* Mockup Content */}
              <div className="p-7">
                <div className="flex flex-col items-center justify-center gap-8 py-2">
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-full bg-indigo-50/40 blur-2xl" />
                    <div className="relative flex size-44 items-center justify-center rounded-full bg-white shadow-xl shadow-indigo-100/20">
                      <svg className="absolute inset-0 size-full -rotate-90">
                        <circle
                          cx="88"
                          cy="88"
                          r="80"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          className="text-gray-50"
                        />
                        <circle
                          cx="88"
                          cy="88"
                          r="80"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="10"
                          className="text-indigo-600 drop-shadow-sm"
                          strokeDasharray="502"
                          strokeDashoffset="30"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-center">
                        <span className="text-6xl font-black tracking-tighter text-gray-900">
                          98
                        </span>
                        <span className="mt-1 block text-[10px] font-black tracking-[0.2em] text-indigo-600 uppercase">
                          Optimized
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-[11px] font-bold text-emerald-700 shadow-xs">
                    <CheckCircle2 className="size-3.5" />
                    Performance is in the Top 1%
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <PremiumStatCard
                    icon={<Zap className="size-4 text-amber-500" />}
                    label="Speed Index"
                    value="0.8s"
                    status="Optimum"
                  />
                  <PremiumStatCard
                    icon={<Activity className="size-4 text-emerald-500" />}
                    label="Responsiveness"
                    value="99.9%"
                    status="Perfect"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Decorative Elements */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-16 -right-4 z-20 hidden scale-90 lg:block"
          >
            <div className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-indigo-600 text-white shadow-lg shadow-indigo-200">
                  <Search className="size-5" />
                </div>
                <div>
                  <div className="text-[11px] font-black tracking-wider text-gray-900 uppercase">
                    SEO Score
                  </div>
                  <div className="text-[10px] font-bold text-indigo-600">100/100 Perfect</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute bottom-12 -left-8 z-20 hidden scale-95 lg:block"
          >
            <div className="rounded-2xl border border-white/50 bg-white/80 p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-blue-200">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <div className="text-[11px] font-black tracking-wider text-gray-900 uppercase">
                    Security
                  </div>
                  <div className="text-[10px] font-bold text-indigo-600">A+ Certified</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-5 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <CheckCircle2 className="size-3" />
      </div>
      <span className="text-sm font-semibold text-gray-600">{text}</span>
    </div>
  );
}

function PremiumStatCard({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:border-indigo-100 hover:shadow-lg hover:shadow-gray-100/50">
      <div className="mb-3 flex items-center justify-between">
        <div className="rounded-lg bg-gray-50 p-2 transition-colors group-hover:bg-indigo-50">
          {icon}
        </div>
        <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black text-white uppercase">
          {status}
        </span>
      </div>
      <div className="space-y-1">
        <div className="text-[10px] font-black tracking-[0.15em] text-gray-400 uppercase">
          {label}
        </div>
        <div className="text-xl font-black text-gray-900">{value}</div>
      </div>
    </div>
  );
}

// History update: 2026-03-05T23:00:28

// Dev session update: 2026-03-05T20:12:51
