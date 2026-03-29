'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  doneRouteProgress,
  getRouteProgressState,
  startRouteProgress,
  subscribeRouteProgress,
} from '@/lib/route-progress';

function isPlainLeftClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function shouldTrackAnchor(anchor: HTMLAnchorElement) {
  if (
    anchor.target === '_blank' ||
    anchor.hasAttribute('download') ||
    anchor.getAttribute('rel')?.includes('external')
  ) {
    return false;
  }

  const href = anchor.getAttribute('href');

  if (!href || href.startsWith('#')) {
    return false;
  }

  const nextUrl = new URL(anchor.href, window.location.href);
  const currentUrl = new URL(window.location.href);

  if (nextUrl.origin !== currentUrl.origin) {
    return false;
  }

  return nextUrl.pathname !== currentUrl.pathname || nextUrl.search !== currentUrl.search;
}

export function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const hasMountedRef = useRef(false);
  const state = useSyncExternalStore(
    subscribeRouteProgress,
    getRouteProgressState,
    getRouteProgressState
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isPlainLeftClick(event)) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest('a');

      if (anchor && shouldTrackAnchor(anchor)) {
        startRouteProgress();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    doneRouteProgress();
  }, [pathname, search]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[100] h-[3px] w-full transition-opacity duration-200 ${
        state.isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="h-full origin-left bg-linear-to-r from-indigo-500 via-blue-500 to-cyan-400 shadow-[0_0_12px_rgba(79,70,229,0.35)] transition-transform duration-200 ease-out"
        style={{ transform: `scaleX(${state.progress / 100})` }}
      />
    </div>
  );
}
