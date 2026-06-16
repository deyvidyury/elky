'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/Footer';
import { FigmaFooter } from '@/components/FigmaFooter';

export function FooterSwitcher() {
  const pathname = usePathname();
  const isFigma = pathname.startsWith('/figma');
  return isFigma ? <FigmaFooter /> : <Footer />;
}
