"use client"

import { useEffect, useRef, useState } from 'react'

interface AdBannerProps {
  adSlot: string;
  className?: string;
}

export function AdBanner({ adSlot, className = "" }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (containerRef.current && !adLoaded && typeof window !== 'undefined') {
      try {
        const insElement = containerRef.current.querySelector('.adsbygoogle');
        
        if (insElement && !insElement.querySelector('iframe')) {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          setAdLoaded(true);
        }
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
      }
    }
  }, [adLoaded]);

  return (
    <div className={`ad-container ${className}`}>
      <p className="text-xs text-[#5d5345] mb-1 text-center">Advertisement</p>
      <div ref={containerRef} className="overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5330176235227654"
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
} 