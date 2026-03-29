// app/layout.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import '../styles/globals.css'; // Assuming this is the global CSS file
import { Overpass } from 'next/font/google'; // Assuming Inter font is used
import Providers from '@/app/providers';
import { Navbar } from '@/components/layouts/navbar';
import { RouteProgressBar } from '@/components/shared/route-progress-bar';

const overpass = Overpass({
  variable: '--font-overpass',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SiteLens | Modern Website Performance Scanner',
    template: '%s | SiteLens',
  },
  description:
    'SiteLens is a premium website performance scanner. Analyze your speed, SEO, accessibility, and security in seconds with our advanced auditing engine.',
  keywords: [
    'website performance',
    'seo analysis',
    'security audit',
    'page speed',
    'lighthouse scan',
    'web vitals',
    'sitelens',
  ],
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#4F46E5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={overpass.className}>
        <Providers>
          <Suspense fallback={null}>
            <RouteProgressBar />
          </Suspense>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

// History update: 2026-03-04T23:00:27

// Dev session update: 2026-03-04T21:20:57
