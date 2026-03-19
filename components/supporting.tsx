'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Globe2 } from 'lucide-react';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { fadeIn } from '@/lib/animations';

export function Supporting() {
  return (
    <SectionWrapper className="pb-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/60 p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-12">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-3">
          <motion.div variants={fadeIn('right', 0.1)} className="text-center md:text-left">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Global Infrastructure <br />
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Scale with Confidence
              </span>
            </h2>
            <p className="mt-4 text-sm font-medium text-gray-500">
              Powering over 10,000+ growing teams with real-time performance intelligence and
              security audits.
            </p>
          </motion.div>

          <div className="col-span-2 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Metric
              index={0}
              icon={<Zap className="size-5 text-amber-500" />}
              label="Daily Scans"
              value="45k+"
            />
            <Metric
              index={1}
              icon={<Globe2 className="size-5 text-indigo-500" />}
              label="Global Nodes"
              value="24"
            />
            <Metric
              index={2}
              icon={<Shield className="size-5 text-emerald-500" />}
              label="Uptime"
              value="99.9%"
            />
            <Metric
              index={3}
              icon={<BarChart3 className="size-5 text-purple-500" />}
              label="Accuracy"
              value="100%"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function Metric({
  icon,
  label,
  value,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeIn('up', 0.2 + index * 0.1)}
      className="flex flex-col items-center gap-3 text-center md:items-start md:text-left"
    >
      <div className="flex size-10 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-transform hover:scale-110">
        {icon}
      </div>
      <div className="space-y-0.5">
        <div className="text-2xl font-black text-gray-900">{value}</div>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{label}</div>
      </div>
    </motion.div>
  );
}
