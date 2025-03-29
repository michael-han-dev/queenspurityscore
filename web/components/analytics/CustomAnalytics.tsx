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
    if (typeof window === 'undefined') return;
    
    // Combine path and search params for full URL tracking
    const path = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // Check if this is a new page load or a client-side navigation
    const isPageLoad = !prevPathRef.current;
    

    if (isPageLoad || !visitorTrackedRef.current) {

      const fingerprint = generateFingerprint();
      
      // Always track visitor on page load - sessionStorage might have been cleared
      trackVisitor(fingerprint);
      sessionStorage.setItem('visitorTracked', 'true');
      sessionStorage.setItem('visitorFingerprint', fingerprint);
      console.log('Visitor tracked with fingerprint');
      
      visitorTrackedRef.current = true;
    }
    
    // Track page view when path changes or on initial load
    if (path !== prevPathRef.current) {
      trackPageView(path);
      prevPathRef.current = path;
      console.log('Page view tracked:', path);
    }
  }, [pathname, searchParams]);
  
  return null;
} 