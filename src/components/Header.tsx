'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthButton } from '@/components/AuthButton';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Produtos', href: '/produtos' },
    { label: 'Limpeza', href: '/categorias/limpeza' },
    { label: 'Cozinha', href: '/categorias/cozinha' },
    { label: 'Refrigeração', href: '/categorias/refrigeracao' },
    { label: 'Lavagem', href: '/categorias/lavagem' },
    { label: 'Utensílios', href: '/categorias/utensilios' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar — inspired by Di Pratos / Rebal */}
      <div className="hidden md:block bg-brand-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 text-accent-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              (11) 3000-0000
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 text-accent-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              contato@guiadesuprimentos.com.br
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/sobre"
              className="hover:text-accent-300 transition-colors"
            >
              Sobre Nós
            </Link>
            <Link
              href="/contato"
              className="hover:text-accent-300 transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white text-sm font-bold group-hover:bg-brand-800 transition-colors">
              GS
            </div>
            <span className="hidden sm:block text-lg font-bold text-brand-800 tracking-tight">
              Guia de Suprimentos
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Auth + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/produtos"
              className="hidden sm:inline-flex rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition-colors shadow-sm"
            >
              Ver Produtos
            </Link>

            <AuthButton />

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menu"
            >
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
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
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3 space-y-1 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <Link
                  href="/sobre"
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-500 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sobre Nós
                </Link>
                <Link
                  href="/contato"
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-gray-500 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Contato
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
