'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, trackVisitor } from '@/lib/firestoreService';

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
    if (typeof window === 'undefined') return;
    
    const path = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    const isResultsPage = path.includes('/results') || path.includes('/engineering/results');
    
    if (!visitorTrackedRef.current && !isResultsPage) {
      const fingerprint = generateFingerprint();
      trackVisitor(fingerprint);
      visitorTrackedRef.current = true;
    }
    
    if (path !== prevPathRef.current && !isResultsPage) {
      trackPageView(path);
      prevPathRef.current = path;
    }
  }, [pathname, searchParams]);
  
  return null;
} 