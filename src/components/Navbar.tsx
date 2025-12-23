import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-white/20 backdrop-blur-lg dark:border-white/10 dark:bg-zinc-900/20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="text-lg font-bold text-[var(--color-primary)]">
            <Image src="/image/logo.png" alt="logo" width={200} height={200} />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80">
              Beranda
            </Link>
            <Link href="#kategori" className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80">
              Kategori
            </Link>
            <Link href="#faq" className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80">
              FAQ
            </Link>
            <Link href="/checkout" className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80">
              Transaksi
            </Link>
            <Link href="#layanan" className="link-underline text-[var(--color-tertiary)] hover:text-[var(--color-primary)] dark:text-white/80">
              Layanan
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
