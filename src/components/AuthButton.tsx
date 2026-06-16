'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insforge } from '@/lib/insforge/client';

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

export function AuthButton() {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });
  const router = useRouter();

  useEffect(() => {
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
  }, []);

  if (state.loading) {
    return <div className="h-9 w-9 rounded-full bg-gray-100 animate-pulse" />;
  }

  if (state.user) {
    return (
      <button
        type="button"
        onClick={() => router.push('/admin')}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white pl-1.5 pr-3 py-1 text-sm text-gray-700 hover:shadow-md transition-all"
        title={state.user.email}
      >
        {state.user.profile?.avatar_url ? (
          <img
            src={state.user.profile.avatar_url}
            alt=""
            className="h-7 w-7 rounded-full"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-semibold">
            {state.user.email?.charAt(0).toUpperCase() ?? '?'}
          </span>
        )}
        <span className="hidden sm:inline text-xs font-medium max-w-[100px] truncate">
          {state.user.profile?.name ?? state.user.email}
        </span>
      </button>
    );
  }

  return (
    <a
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
    </a>
  );
}
