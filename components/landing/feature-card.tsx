'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn } from '@/lib/animations';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  variant?: 'default' | 'glass' | 'outline';
  index?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
  variant = 'default',
  index = 0,
}: FeatureCardProps) {
  const variants = {
    default: 'bg-white border-gray-100 shadow-sm hover:shadow-md',
    glass: 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15',
    outline: 'bg-transparent border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30',
  };

  return (
    <motion.div
      variants={fadeIn('up', index * 0.1)}
      className={cn(
        'group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300',
        variants[variant],
        className
      )}
    >
      <div
        className={cn(
          'mb-6 flex size-12 items-center justify-center rounded-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:rotate-3',
          variant === 'glass'
            ? 'bg-white text-indigo-600'
            : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
        )}
      >
        {icon}
      </div>
      <h3
        className={cn(
          'mb-3 text-xl font-bold',
          variant === 'glass' ? 'text-white' : 'text-gray-900'
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          'leading-relaxed font-medium',
          variant === 'glass' ? 'text-indigo-100/60' : 'text-gray-500'
        )}
      >
        {description}
      </p>
    </motion.div>
  );
}
