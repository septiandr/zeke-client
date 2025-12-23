import Link from "next/link"

type Item = {
  slug: string
  name: string
  tag?: string
}

const items: Item[] = [
  { slug: "mobile-legends", name: "Mobile Legends" },
  { slug: "free-fire", name: "Free Fire" },
  { slug: "pubg-mobile", name: "PUBG Mobile" },
  { slug: "genshin-impact", name: "Genshin Impact" },
  { slug: "call-of-duty", name: "Call of Duty Mobile" },
  { slug: "valorant", name: "Valorant" }
]

export default function GogogoProductGrid({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-xl font-bold text-[var(--color-tertiary)] dark:text-white">{title}</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
