'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ModernLoader({ hostname }: { hostname: string | null }) {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    'Initializing scan engine...',
    'Crawling site architecture...',
    'Running performance checks...',
    'Analyzing Core Web Vitals...',
    'Evaluating SEO and Accessibility...',
    'Finalizing report...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FDFDFF]">
      <div className="relative mt-10 mb-12 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute size-48 rounded-full bg-indigo-500/20 blur-3xl"
        />

        <div className="relative size-36 rounded-3xl border border-indigo-100 bg-white p-6 shadow-2xl shadow-indigo-200/50">
          <svg viewBox="0 0 100 100" className="size-full overflow-visible">
            {/* Globe Background Lines (Lat/Long) */}
            <g stroke="#e2e8f0" strokeWidth="0.75" fill="none">
              <circle cx="50" cy="50" r="40" />
              <ellipse cx="50" cy="50" rx="40" ry="14" />
              <ellipse cx="50" cy="50" rx="40" ry="28" />
              <ellipse cx="50" cy="50" rx="14" ry="40" />
              <ellipse cx="50" cy="50" rx="28" ry="40" />
            </g>

            {/* Network Nodes & Links */}
            <g stroke="#818cf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
              <motion.line
                x1="25"
                y1="25"
                x2="65"
                y2="35"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.line
                x1="65"
                y1="35"
                x2="75"
                y2="65"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
              />
              <motion.line
                x1="75"
                y1="65"
                x2="35"
                y2="75"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
              />
              <motion.line
                x1="35"
                y1="75"
                x2="25"
                y2="25"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
              />
              <motion.line
                x1="35"
                y1="75"
                x2="50"
                y2="50"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.2, ease: 'easeInOut' }}
              />
              <motion.line
                x1="25"
                y1="25"
                x2="50"
                y2="50"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
              />
            </g>

            {/* Nodes */}
            <g>
              <motion.circle
                cx="25"
                cy="25"
                r="3"
                fill="#6366f1"
                animate={{ r: [2, 4, 2], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="65"
                cy="35"
                r="4"
                fill="#8b5cf6"
                animate={{ r: [3, 5, 3], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="75"
                cy="65"
                r="3.5"
                fill="#3b82f6"
                animate={{ r: [2.5, 4.5, 2.5], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 0.7, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="35"
                cy="75"
                r="3"
                fill="#6366f1"
                animate={{ r: [2, 4, 2], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.1, ease: 'easeInOut' }}
              />

              {/* Central Core Node */}
              <motion.circle
                cx="50"
                cy="50"
                r="5"
                fill="#4f46e5"
                animate={{ r: [4, 6, 4], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(79, 70, 229, 0.6))' }}
              />
            </g>

            {/* Radar Sweep Ring */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="3s"
                repeatCount="indefinite"
              />
              <defs>
                <linearGradient id="radarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 50 10 A 40 40 0 0 1 90 50 L 50 50 Z" fill="url(#radarGlow)" />
              <line x1="50" y1="50" x2="50" y2="10" stroke="#8b5cf6" strokeWidth="1.5" />
            </g>

            {/* Outer Orbiting Data Ring */}
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 50 50"
                to="0 50 50"
                dur="15s"
                repeatCount="indefinite"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="1.5"
                strokeDasharray="12 6"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="flex h-10 items-center justify-center overflow-hidden text-center">
        <motion.h2
          key={textIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-black text-transparent"
        >
          {texts[textIndex]}
        </motion.h2>
      </div>
      <p className="mt-4 text-sm font-bold tracking-widest text-gray-400 uppercase">
        TARGET: <span className="text-indigo-500">{hostname || 'Website'}</span>
      </p>

      <div className="mt-10 h-1.5 w-64 overflow-hidden rounded-full bg-gray-100 shadow-inner">
        <motion.div
          className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ width: '60%' }}
        />
      </div>
    </div>
  );
}
