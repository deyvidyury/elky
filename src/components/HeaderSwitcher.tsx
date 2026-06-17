'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { FigmaHeader } from '@/components/FigmaHeader';

interface HeaderSwitcherProps {
  serverUser?: {
    email?: string;
    profile?: { name?: string | null; avatar_url?: string | null } | null;
    metadata?: Record<string, unknown> | null;
  } | null;
}

export function HeaderSwitcher({ serverUser }: HeaderSwitcherProps) {
  const pathname = usePathname();

  // Hide site header on admin routes — admin has its own navigation
  if (pathname.startsWith('/admin')) return null;

  const isFigma = pathname.startsWith('/figma');
  return isFigma ? (
    <FigmaHeader serverUser={serverUser} />
  ) : (
    <Header serverUser={serverUser} />
  );
}
