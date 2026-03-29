import axios from 'axios';

/**
 * Service to check if a website can be displayed in an iframe.
 * It checks for 'X-Frame-Options' and 'Content-Security-Policy' headers.
 */
export async function checkIframeSupport(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, {
      timeout: 5000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      // In case HEAD is not allowed, we don't want to fail immediately
      validateStatus: (status) => status >= 200 && status < 400,
    });

    return analyzeHeaders(response.headers as any);
  } catch (error: any) {
    // If HEAD fails, try a GET but only for headers (limitted by timeout/size)
    try {
      const response = await axios.get(url, {
        timeout: 5000,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        // We only care about headers, so we can try to abort or just use a small response if possible
        // but axios doesn't easily support "headers only" on GET.
        // However, we just need to see if it completes.
      });
      return analyzeHeaders(response.headers as any);
    } catch (innerError) {
      console.error(`Error checking iframe support for ${url}:`, innerError);
      return false; // Fail safe
    }
  }
}

function analyzeHeaders(headers: Record<string, string>): boolean {
  const xFrameOptions = (headers['x-frame-options'] || headers['X-Frame-Options'])?.toUpperCase();
  const csp = (
    headers['content-security-policy'] || headers['Content-Security-Policy']
  )?.toLowerCase();

  // If X-Frame-Options is DENY or SAMEORIGIN, it's not supported
  if (xFrameOptions === 'DENY' || xFrameOptions === 'SAMEORIGIN') {
    return false;
  }

  // If CSP has frame-ancestors, it's likely restricted
  if (csp && csp.includes('frame-ancestors')) {
    if (csp.includes("frame-ancestors 'none'") || csp.includes("frame-ancestors 'self'")) {
      return false;
    }
    // If it mentions specific origins, it's also restricted for our generic preview
    return false;
  }

  return true;
}
