'use client';

import { motion } from 'framer-motion';
import { Target, Layers, Rocket, Lightbulb } from 'lucide-react';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { FeatureCard } from '@/components/landing/feature-card';
import { fadeIn } from '@/lib/animations';

export function About() {
  return (
    <SectionWrapper variant="gradient" id="about">
      {/* Decorative pattern */}
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-20">
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M.5 40V.5H40" fill="none" stroke="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="mb-20 flex flex-col items-center space-y-4 text-center">
        <motion.div
          variants={fadeIn('up', 0.1)}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm"
        >
          <Lightbulb className="size-3.5" />
          The Vision
        </motion.div>
        <motion.h2
          variants={fadeIn('up', 0.2)}
          className="text-4xl font-black tracking-tight text-white sm:text-5xl"
        >
          Beyond just a scanner. <br />
          <span className="text-indigo-200">A growth engine.</span>
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.3)}
          className="max-w-2xl text-lg font-medium text-indigo-100/80"
        >
          SiteLens was born from a simple idea: that performance data should be actionable,
          accessible, and beautiful.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <FeatureCard
          index={0}
          variant="glass"
          icon={<Target className="size-6" />}
          title="Precision Analysis"
          description="Our custom engine parses every byte to find bottlenecks that standard tools miss."
        />
        <FeatureCard
          index={1}
          variant="glass"
          icon={<Layers className="size-6" />}
          title="Full Stack Insights"
          description="We analyze the entire layer—from your server response times to client-side JS."
        />
        <FeatureCard
          index={2}
          variant="glass"
          icon={<Rocket className="size-6" />}
          title="Actionable Roadmap"
          description="Get a step-by-step priority list of exactly what to change for gains."
        />
      </div>
    </SectionWrapper>
  );
}
