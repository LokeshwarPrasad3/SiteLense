// lib/types/scan.types.ts

// Type for Opportunities/Diagnostics items from Lighthouse (now generic AuditItem for PageSpeed API)
export type AuditItem = {
  title: string;
  description: string;
  score: number | null; // Score from PageSpeed Insights is 0-1
  displayValue?: string; // e.g., "1.5s" for LCP, "150 ms" for TBT
  numericValue?: number; // Numeric value of the metric, if available
};

// Type for key metrics like LCP, CLS, FCP, TBT
export type Metric = {
  lcp: string; // e.g., "2.0s"
  cls: string; // e.g., "0.05"
  fcp: string; // e.g., "1.5s"
  tbt: string; // e.g., "150 ms"
};

// Main response structure for a successful scan, matching ScanResponse from previous step
export type ScanResponse = {
  performance: number; // 0-100
  accessibility: number; // 0-100
  bestPractices: number; // 0-100
  seo: number; // 0-100
  metrics: Metric;
  opportunities: AuditItem[]; // Mapped from PSI audits with 'opportunity' type details
  diagnostics: AuditItem[]; // Mapped from PSI audits with 'diagnostic' type details
  realUser?: boolean;
};
