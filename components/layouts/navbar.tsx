import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { GradientText } from '@/features/landing/components/gradient-text';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex cursor-pointer items-center gap-0.5">
          <div className="flex size-10 items-center justify-center rounded-xl transition-transform active:scale-95">
            <Image src="/logo.svg" alt="SiteLens Logo" width={32} height={32} className="size-9" />
          </div>
          <GradientText className="relative top-0.5 text-xl font-black tracking-wide">
            SiteLens
          </GradientText>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {[
            { label: 'Scanner', href: '/#scanner' },
            { label: 'Features', href: '/#features' },
            { label: 'About', href: '/#about' },
            { label: 'Pricing', href: '/#pricing' },
            { label: 'FAQ', href: '/#faq' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative cursor-pointer py-1 text-sm font-semibold text-gray-500 transition-all hover:text-indigo-600"
            >
              <span className="relative top-0.5">{item.label}</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/scan">
            <Button
              size="sm"
              className="flex h-9 cursor-pointer items-center justify-center rounded-lg bg-indigo-600 pt-1 pl-4 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
            >
              Scan Now
              <ChevronRight className="relative -top-0.5 ml-0.5 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// History update: 2026-03-11T23:00:29

// Dev session update: 2026-03-11T23:40:55
