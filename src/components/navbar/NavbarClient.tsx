"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CategoryType } from "@/api/api";

export default function NavbarClient({
  products,
}: {
  products: CategoryType[];
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return products
      .filter((p) => (p.label || p.value || "").toLowerCase().includes(query))
      .slice(0, 8);
  }, [q, products]);

  const closeMenu = () => setOpen(false);

  const gotoPurchaseMobile = () => {
    // optional: kalau kamu mau setelah pilih game scroll ke purchase di mobile
    if (window.innerWidth < 768) {
      document
        .getElementById("purchase")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/20 backdrop-blur-lg dark:border-white/10 dark:bg-zinc-900/20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={closeMenu}>
            <Image src="/image/logo.png" alt="logo" width={140} height={40} />
          </Link>

          {/* Search (Desktop) */}
          <div className="relative hidden md:block w-[420px]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari game…"
              className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-sky-400/60"
            />

            {results.length > 0 && (
              <div className="absolute mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-lg">
                {results.map((item) => (
                  <Link
                    href={`/topup/${item.value}`}
                    key={item.value ?? item.label}
                    onClick={()=> setQ('')}
                    className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10"
                  >
                    <span className="truncate">{item.label ?? item.value}</span>
                    <span className="text-xs text-white/40">{item.value}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80"
            >
              Beranda
            </Link>
            <Link
              href="#kategori"
              className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80"
            >
              Kategori
            </Link>
            <Link
              href="#faq"
              className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80"
            >
              FAQ
            </Link>
          </nav>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center rounded-lg border border-white/20 p-2 text-white/80 hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l8 8M6 14L14 6" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h14M3 12h14M3 18h14" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu + Search */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-lg">
          <div className="mx-auto max-w-6xl px-4 py-4">
            {/* Search mobile */}
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari game…"
                className="w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 outline-none focus:border-sky-400/60"
              />

              {results.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-black/60">
                  {results.map((item) => (
                    <Link
                      href={`/topup/${item.value}`}
                      key={item.value ?? item.label}
                      onClick={()=> closeMenu()}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10"
                    >
                      <span className="truncate">
                        {item.label ?? item.value}
                      </span>
                      <span className="text-xs text-white/40">
                        {item.value}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <nav className="mt-4 flex flex-col gap-4 text-sm">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-white/90 hover:text-[var(--color-primary)]"
              >
                Beranda
              </Link>
              <Link
                href="#kategori"
                onClick={closeMenu}
                className="text-white/90 hover:text-[var(--color-primary)]"
              >
                Kategori
              </Link>
              <Link
                href="#faq"
                onClick={closeMenu}
                className="text-white/90 hover:text-[var(--color-primary)]"
              >
                FAQ
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
