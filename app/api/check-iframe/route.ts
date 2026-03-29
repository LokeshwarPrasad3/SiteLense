import { NextRequest, NextResponse } from 'next/server';
import { checkIframeSupport } from '@/features/scanner/services/iframe.service';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const supported = await checkIframeSupport(url);
    return NextResponse.json({ supported }, { status: 200 });
  } catch (error) {
    console.error('API Error checking iframe support:', error);
    return NextResponse.json(
      { supported: false, error: 'Failed to check iframe support' },
      { status: 500 }
    );
  }
}
