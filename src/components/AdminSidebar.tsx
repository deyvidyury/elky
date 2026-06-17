'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignOutButton } from '@/app/admin/SignOutButton';

interface AdminSidebarProps {
  children: React.ReactNode;
  user: {
    email?: string;
    profile?: { name?: string | null; avatar_url?: string | null } | null;
    metadata?: Record<string, unknown> | null;
  };
  isAdmin: boolean;
}

export function AdminSidebar({ children, user, isAdmin }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change (mobile nav)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <div className="flex min-h-screen">
      {/* Mobile top bar — only visible below lg */}
      <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <Link
          href="/admin"
          className="font-display text-lg font-bold text-gray-900"
        >
          Admin
        </Link>
        {/* Home button */}
        <Link
          href="/"
          aria-label="Ir para página inicial"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-700 transition-colors"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
      </div>

      {/* Backdrop overlay — mobile only */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar — slides in on mobile, static on desktop */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-gray-200 bg-white',
          'transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0', // Always visible on desktop
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <Link
            href="/admin"
            onClick={close}
            className="font-display text-xl font-bold text-gray-900"
          >
            Admin
          </Link>
          {/* Close button — mobile only */}
          <button
            onClick={close}
            aria-label="Fechar menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarLink
            href="/admin"
            label="Dashboard"
            icon={DashboardIcon}
            onClick={close}
          />
          <SidebarLink
            href="/admin/produtos"
            label="Produtos"
            icon={PackageIcon}
            onClick={close}
          />
          <SidebarLink
            href="/admin/categorias"
            label="Categorias"
            icon={TagIcon}
            onClick={close}
          />
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-gray-100">
          {isAdmin ? (
            <div className="flex items-center gap-3 mb-3">
              {user.profile?.avatar_url ? (
                <img
                  src={user.profile.avatar_url}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
                  {user.email?.charAt(0).toUpperCase() ?? '?'}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.profile?.name ?? user.email}
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-amber-600">Sem permissão admin</p>
            </div>
          )}
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50 min-w-0 pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {!isAdmin && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm text-amber-800 font-medium">
                Acesso restrito
              </p>
              <p className="text-sm text-amber-700 mt-1">
                Sua conta não tem permissão de administrador. Você pode
                visualizar esta página, mas não poderá criar, editar ou excluir
                itens.
              </p>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-brand-50 text-brand-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      ].join(' ')}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {label}
    </Link>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6h.008v.008H6V6z"
      />
    </svg>
  );
}
