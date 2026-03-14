// lib/utils/error.ts
import { NextResponse } from 'next/server';

type ErrorResponse = {
  success: false;
  message: string;
}

/**
 * Creates a standardized error JSON response.
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code.
 * @returns {NextResponse<ErrorResponse>} A Next.js JSON response object.
 */
export const createErrorResponse = (message: string, status: number): NextResponse<ErrorResponse> => {
  return NextResponse.json({
    success: false,
    message,
  }, { status });
};

// History update: 2026-03-15T23:00:30

// Dev session update: 2026-03-15T01:32:26
