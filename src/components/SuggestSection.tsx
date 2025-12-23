export default function SuggestSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/20 p-6 backdrop-blur">
        <h2 className="text-xl font-bold text-[var(--color-tertiary)] dark:text-white">Gak nemu yang kamu cari?</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Kasih tau kami game yang kamu cari.
        </p>
        <div className="mt-4 flex gap-2">
          <input
            placeholder="Tulis nama game atau layanan"
            className="w-full rounded-lg border border-white/20 bg-white/60 px-3 py-2 text-sm text-zinc-900 backdrop-blur placeholder:text-zinc-500"
          />
          <button className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90">
            Kasih Saran
          </button>
        </div>
      </div>
    </section>
  )
}
