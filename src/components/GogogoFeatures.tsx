import { SparklesIcon, ShieldCheckIcon, BoltIcon } from "@heroicons/react/24/solid"
export default function GogogoFeatures() {
  const features = [
    { title: "Harga Termurah", desc: "Top up murah untuk semua game populer", Icon: SparklesIcon },
    { title: "Tanpa Biaya Admin", desc: "Transaksi tanpa biaya tambahan", Icon: ShieldCheckIcon },
    { title: "Cepat & Aman", desc: "Pengiriman instan, pembayaran aman", Icon: BoltIcon }
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="hover-raise gold-glow hover-shimmer rounded-xl border border-white/10 bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] p-6 text-center shadow-sm backdrop-blur"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-primary)]">
              <f.Icon className="h-7 w-7 text-[var(--color-secondary)]" />
            </div>
            <div className="mt-3 text-sm font-bold text-[var(--color-tertiary)] dark:text-white">{f.title}</div>
            <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
