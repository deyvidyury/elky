'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { FigmaHeader } from '@/components/FigmaHeader';

export function HeaderSwitcher() {
  const pathname = usePathname();
  const isFigma = pathname.startsWith('/figma');
  return isFigma ? <FigmaHeader /> : <Header />;
}
