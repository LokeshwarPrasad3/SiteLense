'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { FeatureCard } from '@/components/landing/feature-card';
import { GradientText } from '@/components/landing/gradient-text';
import { Badge } from '@/components/ui/badge';
import { fadeIn } from '@/lib/animations';
import { ShieldCheck, Zap, Search, Lock, Smartphone, Globe2 } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: <Zap className="size-6" />,
      title: 'Instant Core Web Vitals',
      description:
        'Get real-time feedback on LCP, FID, and CLS with precision timing up to 3 decimal places.',
    },
    {
      icon: <ShieldCheck className="size-6" />,
      title: 'Security Header Audit',
      description:
        'Automatically check for CSP, HSTS, and XSS protection to ensure your users stay safe.',
    },
    {
      icon: <Search className="size-6" />,
      title: 'Advanced SEO Insights',
      description:
        'Analyze meta tags, alt text, and semantic structure to boost your search engine rankings.',
    },
    {
      icon: <Smartphone className="size-6" />,
      title: 'Mobile Responsiveness',
      description:
        'Preview how your site performs across various screen sizes and mobile network conditions.',
    },
    {
      icon: <Globe2 className="size-6" />,
      title: 'Global Edge Nodes',
      description:
        "Test your site's latency from 24 different locations worldwide for a true global perspective.",
    },
    {
      icon: <Lock className="size-6" />,
      title: 'SSL/TLS Verification',
      description:
        'Deep dive into your certificate chain and protocol versions to prevent security downgrades.',
    },
  ];

  return (
    <SectionWrapper id="features">
      <div className="mb-16 flex flex-col items-center space-y-4 text-center">
        <motion.div variants={fadeIn('up', 0.1)}>
          <Badge
            variant="outline"
            className="border-indigo-200 px-4 py-1 text-xs font-bold tracking-wider text-indigo-600 uppercase"
          >
            Powerful Features
          </Badge>
        </motion.div>
        <motion.h2
          variants={fadeIn('up', 0.2)}
          className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl"
        >
          Everything you need for a <GradientText>Faster Web</GradientText>.
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.3)}
          className="max-w-2xl text-lg font-medium text-gray-500"
        >
          Our comprehensive suite of tools helps you identify and fix performance bottlenecks before
          they impact your conversion rates.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            index={index}
            variant="outline"
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="h-full"
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
