// app/layout.tsx
import type { Metadata } from 'next';
import '../styles/globals.css'; // Assuming this is the global CSS file
import { Overpass } from 'next/font/google'; // Assuming Inter font is used
import Providers from '@/app/providers'; // Assuming Providers component exists

// Assuming these are available from project context
// import { cn } from '@/lib/utils'; // For class merging if needed

const overpass = Overpass({
  variable: '--font-overpass',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SiteLens - Website Performance Scanner',
  description:
    "Analyze your website\\'s performance, SEO, accessibility, and best practices with SiteLens. Get actionable insights to improve your website speed and user experience.",
  keywords:
    'website performance, seo analysis, accessibility check, page speed, lighthouse, web vitals, site scan',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={overpass.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// History update: 2026-03-04T23:00:27

// Dev session update: 2026-03-04T21:20:57
