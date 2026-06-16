'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { initiateOAuth } from '@/lib/insforge/actions';

function SignInContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:py-28">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-6">
          <svg
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m-3 0h13.5A2.25 2.25 0 0121 11.25v7.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-7.5A2.25 2.25 0 015.25 9z"
            />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-bold text-gray-900">
          Entrar
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Faça login com sua conta Google para acessar o painel administrativo.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error === 'oauth_failed' &&
              'Falha na autenticação. Tente novamente.'}
            {error === 'missing_verifier' &&
              'Sessão expirada. Tente novamente.'}
            {error === 'exchange_failed' &&
              'Erro ao finalizar autenticação. Tente novamente.'}
            {!['oauth_failed', 'missing_verifier', 'exchange_failed'].includes(
              error,
            ) && 'Ocorreu um erro inesperado. Tente novamente.'}
          </div>
        )}

        <form action={initiateOAuth.bind(null, 'google')} className="mt-8">
          <button
            type="submit"
            className="inline-flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Entrar com Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-20 sm:py-28">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700 mb-6 animate-pulse" />
            <div className="h-7 w-24 bg-gray-100 rounded mx-auto mb-3 animate-pulse" />
            <div className="h-4 w-64 bg-gray-100 rounded mx-auto animate-pulse" />
          </div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
