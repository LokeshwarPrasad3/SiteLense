// app/scan/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { GradientText } from '@/components/landing/gradient-text';
import { ArrowRight } from 'lucide-react';

export default function ScanPage() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State to disable button

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL.');
      return;
    }
    try {
      new URL(url); // Basic URL validation
      setError('');
      setIsSubmitting(true); // Disable button while navigating
      router.push(`/result?url=${encodeURIComponent(url)}`);
      // Note: The API call happens on the next page load, so button remains disabled until user navigates away or returns.
    } catch (err) {
      setError('Please enter a valid URL.');
      setIsSubmitting(false); // Re-enable if validation fails
    }
  };

  return (
    <SectionWrapper className="pt-28 md:pt-40">
      {/* Background Premium Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-full -translate-x-1/2 overflow-hidden opacity-60">
        <div className="absolute top-[-10%] left-[-15%] h-[600px] w-[600px] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute top-[5%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-50/50 blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] h-[400px] w-[400px] rounded-full bg-blue-50/30 blur-[100px]" />
      </div>

      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl/tight">
          Scan Your Website's <br />
          <GradientText className="relative inline-block">
            Performance.
            <span className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-indigo-50/80" />
          </GradientText>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-gray-600 sm:text-xl/relaxed">
          Enter a URL to analyze your website's performance, SEO, accessibility, and best practices.
        </p>

        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="h-14 flex-grow px-6 text-lg"
            required
            disabled={isSubmitting} // Disable input while submitting
          />
          <Button
            type="submit"
            size="lg"
            className="group h-14 rounded-2xl bg-indigo-600 px-8 text-base font-semibold shadow-2xl shadow-indigo-200/50 transition-all hover:bg-indigo-700 active:scale-95"
            disabled={isSubmitting} // Disable button
          >
            Analyze
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </form>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </SectionWrapper>
  );
}
