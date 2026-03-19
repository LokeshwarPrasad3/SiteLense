'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer } from '@/lib/animations';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'light' | 'dark' | 'gradient';
  animate?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  variant = 'default',
  animate = true,
}: SectionWrapperProps) {
  const variants = {
    default: 'bg-transparent',
    light: 'bg-white',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-linear-to-b from-indigo-600 to-purple-700 text-white',
  };

  if (!animate) {
    return (
      <section
        id={id}
        className={cn('relative overflow-hidden py-24 md:py-32', variants[variant], className)}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn('relative overflow-hidden py-24 md:py-32', variants[variant], className)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </motion.section>
  );
}
