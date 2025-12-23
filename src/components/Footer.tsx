export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-b from-[var(--color-tertiary)]/10 to-transparent dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <div className="text-lg font-bold text-[var(--color-primary)]">Zekestore</div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Melayani topup pulsa, PLN, paket data, e-money, dan games.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-tertiary)] dark:text-white">Layanan</div>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>Pulsa</li>
              <li>PLN</li>
              <li>Paket Data</li>
              <li>E-Money</li>
              <li>Topup Games</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-tertiary)] dark:text-white">Bantuan</div>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>FAQ</li>
              <li>Track Transaksi</li>
              <li>Kontak</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="text-xs text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Zekestore. Semua hak cipta.
          </div>
          <div className="flex gap-2">
            <span className="h-6 w-6 rounded bg-[var(--color-primary)]/20" />
            <span className="h-6 w-6 rounded bg-[var(--color-primary)]/20" />
            <span className="h-6 w-6 rounded bg-[var(--color-primary)]/20" />
          </div>
        </div>
      </div>
    </footer>
  )
}
