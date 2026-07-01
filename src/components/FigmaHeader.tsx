'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AuthButton } from '@/components/AuthButton';

interface FigmaHeaderProps {
  serverUser?: {
    email?: string;
    profile?: { name?: string | null; avatar_url?: string | null } | null;
    metadata?: Record<string, unknown> | null;
  } | null;
}

export function FigmaHeader({ serverUser }: FigmaHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/figma' },
    { label: 'Produtos', href: '/figma/produtos' },
    { label: 'Sobre', href: '/figma/sobre' },
    { label: 'Contato', href: '/figma/contato' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — black announcement bar */}
      <div className="bg-figma-dark text-figma-dark-text">
        <div className="mx-auto flex max-w-[1170px] items-center justify-between px-4 py-3 text-xs sm:px-6">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-2">
              <span className="hidden sm:inline">
                Summer Sale For All Swim Suits And Free Express Delivery — OFF
                50%!
              </span>
              <span className="sm:hidden">Summer Sale — OFF 50%!</span>
            </p>
            <Link
              href="/figma/produtos"
              className="font-semibold underline underline-offset-4 hover:text-figma-red transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-xs cursor-pointer hover:text-figma-red transition-colors">
            <span>Português</span>
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main header — white */}
      <div className="border-b border-figma-border bg-white">
        <div className="mx-auto flex max-w-[1170px] items-center justify-between px-4 py-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/figma"
            className="text-2xl font-bold text-figma-dark tracking-tight"
          >
            Guia de Suprimentos
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-figma-dark hover:text-figma-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth + Search */}
          <div className="flex items-center gap-4">
            <AuthButton serverUser={serverUser} />

            {/* Search */}
            <form
              className="hidden sm:flex items-center bg-figma-bg-secondary rounded-md px-3 py-2 gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Busca em breve disponível.');
              }}
            >
              <input
                type="text"
                placeholder="O que você procura?"
                className="bg-transparent text-xs text-figma-dark placeholder:text-figma-price-original outline-none w-40 lg:w-56"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="text-figma-dark shrink-0"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden p-1.5 text-figma-dark hover:text-figma-red transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menu"
            >
              {mobileOpen ? (
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
              ) : (
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-figma-border bg-white">
            <div className="mx-auto max-w-[1170px] px-4 py-3 space-y-1 sm:px-6">
              {/* Mobile search */}
              <form
                className="flex items-center bg-figma-bg-secondary rounded-md px-3 py-2.5 gap-2 mb-2 sm:hidden"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Busca em breve disponível.');
                }}
              >
                <button
                  type="submit"
                  aria-label="Buscar"
                  className="text-figma-price-original shrink-0"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="O que você procura?"
                  className="bg-transparent text-sm text-figma-dark placeholder:text-figma-price-original outline-none flex-1"
                />
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2.5 text-base text-figma-dark hover:bg-figma-bg-secondary hover:text-figma-red transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
