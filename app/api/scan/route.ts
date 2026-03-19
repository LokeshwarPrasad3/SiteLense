// app/api/scan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { scanRequestSchema } from '@/lib/validators/scan.validator';
import { performScan } from '@/lib/services/scan.service';
import { createSuccessResponse } from '@/lib/utils/response';
import { createErrorResponse } from '@/lib/utils/error';
import type { ScanResponse } from '@/lib/types/scan.types'; // Import ScanResponse type

export const maxDuration = 120; // Set max duration to 2 minutes

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validation = scanRequestSchema.safeParse(body);

    if (!validation.success) {
      const errorMessage = validation.error.issues[0]?.message || 'Invalid input.';
      return createErrorResponse(errorMessage, 400);
    }

    const scanData = await performScan(validation.data);

    // Ensure the data returned matches ScanResponse type
    return createSuccessResponse(scanData as ScanResponse, 200);
  } catch (error: unknown) {
    console.error('API Error in /api/scan:', error);
    if (error instanceof SyntaxError) {
      return createErrorResponse('Invalid JSON payload.', 400);
    }

    // Check for specific error messages from service or generic Error
    let errorMessage = 'An unexpected error occurred during the scan.';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message; // Use specific error message from service (e.g., timeout)
      // If specific status codes are ever thrown by service, handle them here.
      // For now, backend errors are treated as 500.
    }

    return createErrorResponse(errorMessage, statusCode);
  }
}

// History update: 2026-03-08T23:00:28

// Dev session update: 2026-03-08T23:00:53
