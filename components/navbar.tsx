'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, ChevronRight } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Zap className="size-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">SiteLens</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: 'Features', href: '/#features' },
            { label: 'About', href: '/#about' },
            { label: 'Pricing', href: '/#pricing' },
            { label: 'FAQ', href: '/#faq' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="cursor-pointer text-sm font-semibold text-gray-500 transition-all hover:text-indigo-600"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden cursor-pointer font-semibold text-gray-600 hover:bg-gray-50 sm:inline-flex"
          >
            Log in
          </Button>
          <Link href="/scan">
            <Button
              size="sm"
              className="cursor-pointer rounded-lg bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
            >
              Scan Now
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// History update: 2026-03-11T23:00:29

// Dev session update: 2026-03-11T23:40:55
