'use client';

import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/landing/section-wrapper';
import { GradientText } from '@/components/landing/gradient-text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { fadeIn } from '@/lib/animations';

export function FAQ() {
  const faqs = [
    {
      question: 'How accurate are the performance scores?',
      answer:
        "We use our own proprietary engine that combines Chromium's Lighthouse metrics with real-world network data from our 24 global edge nodes. This gives you a score that accurately reflects what real users experience in different parts of the world.",
    },
    {
      question: 'Can I automate scans for my CI/CD pipeline?',
      answer:
        'Yes! Professional and Enterprise plans include access to our robust REST API, allowing you to trigger scans automatically after every deployment to ensure no performance regressions reach production.',
    },
    {
      question: "What exactly do you check in a 'Security Header Audit'?",
      answer:
        "We analyze your server responses for critical security headers including Content-Security-Policy (CSP), HTTP Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options, and more. We don't just check for their presence; we evaluate the strength of their configuration.",
    },
    {
      question: 'Is there a limit on how many domains I can scan?',
      answer:
        'Starter accounts can scan any domain but are limited to 3 scans per day. Professional and Enterprise accounts have unlimited scanning across as many domains and subdomains as you need.',
    },
    {
      question: 'Do you offer white-label reports?',
      answer:
        'Enterprise customers can generate fully white-labeled PDF and HTML reports with their own branding, perfect for agencies delivering audit results to their clients.',
    },
  ];

  return (
    <SectionWrapper id="faq">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
        <motion.div variants={fadeIn('right', 0.1)} className="space-y-6 lg:col-span-2">
          <Badge
            variant="outline"
            className="border-indigo-200 px-4 py-1 text-xs font-bold tracking-wider text-indigo-600 uppercase"
          >
            Frequently Asked
          </Badge>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Got <GradientText>Questions</GradientText>? <br /> We have answers.
          </h2>
          <p className="text-lg font-medium text-gray-500">
            Everything you need to know about SiteLens and how we help you build a better web. Can't
            find what you're looking for? Reach out to our support team.
          </p>
        </motion.div>

        <motion.div variants={fadeIn('left', 0.2)} className="lg:col-span-3">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-100 py-2"
              >
                <AccordionTrigger className="text-lg font-bold text-gray-900 transition-colors hover:text-indigo-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed font-medium text-gray-500">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
