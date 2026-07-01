'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { insforge } from '@/lib/insforge/client';
import { signOut } from '@/lib/insforge/actions';

interface AuthState {
  user: {
    email?: string;
    profile?: {
      name?: string | null;
      avatar_url?: string | null;
    } | null;
    metadata?: Record<string, unknown> | null;
  } | null;
  loading: boolean;
}

interface AuthButtonProps {
  /** Pre-fetched user from server — avoids client-side flash on SSR */
  serverUser?: AuthState['user'];
}

export function AuthButton({ serverUser }: AuthButtonProps) {
  const pathname = usePathname();
  const fromParam = pathname.startsWith('/figma') ? '?from=/figma' : '';

  const [state, setState] = useState<AuthState>({
    user: serverUser ?? null,
    loading: !serverUser,
  });
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // If we already have a server-provided user, skip the client fetch
    if (serverUser) return;

    let cancelled = false;

    async function hydrate() {
      const { data, error } = await insforge.auth.getCurrentUser();
      if (cancelled) return;
      setState({
        user: error ? null : (data?.user ?? null),
        loading: false,
      });
    }

    hydrate();
    return () => {
      cancelled = true;
    };
  }, [serverUser]);

  async function handleLogout() {
    setLoggingOut(true);
    await signOut();
  }

  if (state.loading) {
    return <div className="h-9 w-20 rounded-lg bg-gray-100 animate-pulse" />;
  }

  if (state.user) {
    const isAdmin =
      state.user.metadata &&
      (state.user.metadata as Record<string, unknown>).role === 'admin';

    return (
      <div className="flex items-center gap-1.5">
        {isAdmin && (
          <Link
            href={`/admin${fromParam}`}
            className="inline-flex items-center gap-1 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-800 transition-colors"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            Admin
          </Link>
        )}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {loggingOut ? 'Saindo...' : 'Sair'}
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/sign-in"
      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-white px-3.5 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 hover:border-brand-300 transition-colors"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m-3 0h13.5A2.25 2.25 0 0121 11.25v7.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-7.5A2.25 2.25 0 015.25 9z"
        />
      </svg>
      Entrar
    </Link>
  );
}
