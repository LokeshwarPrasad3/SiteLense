// lib/utils/response.ts
import { NextResponse } from 'next/server';

type SuccessResponse<T> = {
  success: true;
  data: T;
};

/**
 * Creates a standardized success JSON response.
 * @param {T} data - The payload to be included in the response.
 * @param {number} status - The HTTP status code. Defaults to 200.
 * @returns {NextResponse<SuccessResponse<T>>} A Next.js JSON response object.
 */
export const createSuccessResponse = <T>(
  data: T,
  status: number = 200
): NextResponse<SuccessResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
};
