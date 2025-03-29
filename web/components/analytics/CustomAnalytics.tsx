'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, trackVisitor } from '@/lib/firestoreService';

// Generate fingerprint from browser data
function generateFingerprint(): string {
  const userAgent = navigator.userAgent;
  const screenSize = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  
  let hash = 0;
  const str = `${userAgent}-${screenSize}-${timezone}-${language}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  
  return hash.toString(36);
}

export function CustomAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef<string | null>(null);
  const visitorTrackedRef = useRef<boolean>(false);
  
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Combine path and search params for full URL tracking
    const path = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Skip tracking if on results pages
    const isResultsPage = path.includes('/results') || path.includes('/engineering/results');
    
    // Track unique visitor on first load only
    if (!visitorTrackedRef.current && !isResultsPage) {
      const fingerprint = generateFingerprint();
      trackVisitor(fingerprint);
      visitorTrackedRef.current = true;
    }
    
    // Track page view when path changes (except results pages)
    if (path !== prevPathRef.current && !isResultsPage) {
      trackPageView(path);
      prevPathRef.current = path;
    }
  }, [pathname, searchParams]);
  
  return null;
} 