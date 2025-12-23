"use client"
import Link from "next/link"

const chips = ["Game Populer", "Game Lokal", "Favorit berikutnya Anda", "Voucher", "Pulsa", "PLN", "Paket Data", "E-Money"]
const items = [
  { slug: "mobile-legends", name: "Mobile Legends" },
  { slug: "free-fire", name: "Free Fire" },
  { slug: "pubg-mobile", name: "PUBG Mobile" },
  { slug: "genshin-impact", name: "Genshin Impact" },
  { slug: "call-of-duty", name: "Call of Duty Mobile" },
  { slug: "valorant", name: "Valorant" }
]

export default function Categories() {
  return (
    <section id="kategori" className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-wrap gap-2">
        {chips.map(c => (
          <button
            key={c}
            onClick={() => {
              const el = document.getElementById("kategori-grid")
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
            className="rounded-full border border-white/20 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/20 px-3 py-1 text-xs text-[var(--color-tertiary)] transition hover:bg-[var(--color-primary)]/20"
          >
            {c}
          </button>
        ))}
      </div>
      <div id="kategori-grid" className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(item => (
          <Link
            key={item.slug}
            href={`/topup/${item.slug}`}
            className="group hover-raise gold-glow hover-shimmer rounded-xl border border-white/10 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/20 p-4 shadow-sm backdrop-blur"
          >
            <div className="aspect-square w-full rounded-lg bg-gradient-to-br from-[var(--color-secondary)]/20 to-[var(--color-tertiary)]/30 transition-transform duration-200 group-hover:scale-105" />
            <div className="mt-2 text-sm font-semibold text-[var(--color-tertiary)] dark:text-white">{item.name}</div>
            <div className="text-xs text-zinc-500">Mulai top up</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
