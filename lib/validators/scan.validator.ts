// lib/validators/scan.validator.ts
import { z } from 'zod';

// Schema for the incoming request
export const scanRequestSchema = z.object({
  url: z
    .string({
      required_error: 'URL is required.',
    })
    .min(1, 'URL cannot be empty.')
    .url('Please enter a valid URL.'),
});

// Infer the request type from the schema
export type ScanRequest = z.infer<typeof scanRequestSchema>;

// History update: 2026-03-13T23:00:30

// Dev session update: 2026-03-13T21:06:14
