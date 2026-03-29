'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { fadeIn } from '@/utils/animations';
import { startRouteProgress } from '@/lib/route-progress';

export function CTA() {
  const router = useRouter();

  return (
    <SectionWrapper
      variant="gradient"
      className="mx-6 mb-16 rounded-[3rem] py-20 shadow-2xl shadow-indigo-200 md:py-24 lg:mx-8"
    >
      <div className="flex flex-col items-center space-y-8 text-center">
        <motion.div
          variants={fadeIn('up', 0.1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm"
        >
          <Sparkles className="size-3.5" />
          Ready to scale?
        </motion.div>

        <motion.h2
          variants={fadeIn('up', 0.2)}
          className="max-w-3xl text-4xl leading-[1.1] font-black tracking-tight text-white sm:text-6xl"
        >
          Stop guessing. Start <br />
          <span className="text-indigo-200 italic">optimizing</span> your web.
        </motion.h2>

        <motion.p
          variants={fadeIn('up', 0.3)}
          className="max-w-xl text-lg font-medium text-indigo-100/80"
        >
          Join thousands of developers using SiteLens to monitor, audit, and perfect their web
          performance. Your first audit is free.
        </motion.p>

        <motion.div variants={fadeIn('up', 0.4)} className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button
            size="lg"
            onClick={() => {
              startRouteProgress();
              router.push('/scan');
            }}
            className="h-14 rounded-2xl bg-white px-10 text-lg font-bold text-indigo-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-50"
          >
            Get Started
            <ArrowRight className="ml-2 size-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 rounded-2xl border-white/30 px-10 text-lg font-bold text-black transition-all hover:bg-white/10"
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
