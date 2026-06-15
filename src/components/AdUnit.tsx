'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Google AdSense ad unit component.
 *
 * In development, shows a placeholder with the slot name.
 * In production, renders the actual AdSense <ins> tag.
 * The AdSense script is loaded once by the root layout.
 */
export function AdUnit({ slot, format = 'auto', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);

  // Push ad when component mounts (for SPA-like behavior within static pages)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adRef.current) {
        // If adsbygoogle is loaded, push a new ad unit
        const adsbygoogle = (window as unknown as Record<string, unknown>)
          .adsbygoogle as { push: (obj: object) => void } | undefined;
        if (adsbygoogle?.push) {
          adsbygoogle.push({});
        }
      }
    } catch {
      // Silently ignore ad errors — they shouldn't break the site
    }
  }, []);

  const adClient = 'ca-pub-XXXXXXXXXXXXXXXX'; // Placeholder — replace with real AdSense publisher ID

  return (
    <div
      ref={adRef}
      className={`flex min-h-[100px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 ${className}`}
    >
      {/* Placeholder visible in development; hidden when real ad loads */}
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          Anúncio
        </p>
        <p className="mt-1 text-[10px] text-gray-300">{slot}</p>
      </div>

      {/* Real AdSense code — hidden in dev, enabled in production */}
      {process.env.NODE_ENV === 'production' && (
        <ins
          className="adsbygoogle block"
          data-ad-client={adClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}
