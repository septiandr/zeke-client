import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
export default function TrackTransaction() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Cek Status Transaksi</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Masukkan Nomor Transaksi untuk melacak status pesanan Anda
        </p>
        <div className="mt-4 flex gap-2">
          <input
            placeholder="Nomor Transaksi"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <button className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Cek
          </button>
        </div>
        <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Login diperlukan untuk melihat riwayat transaksi lengkap
        </div>
      </div>
    </section>
  )
}
