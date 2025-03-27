"use client"

import { useEffect, useRef } from 'react'

interface AdSquareProps {
  adSlot: string;
  className?: string;
}

export function AdSquare({ adSlot, className = "" }: AdSquareProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && typeof window !== 'undefined') {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
      }
    }
  }, []);

  return (
    <div className={`ad-container-square ${className}`}>
      <p className="text-xs text-[#5d5345] mb-1 text-center">Advertisement</p>
      <div ref={adRef} className="overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5330176235227654"
          data-ad-slot={adSlot}
          data-ad-format="rectangle"
        />
      </div>
    </div>
  );
} 