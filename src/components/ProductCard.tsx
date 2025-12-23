import Link from "next/link"
import Image from "next/image"
import { Product } from "@/lib/products"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/topup/${product.slug}`}
      className="group hover-raise gold-glow hover-shimmer rounded-xl border border-white/10 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/20 p-4 shadow-sm backdrop-blur"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-white/20 bg-gradient-to-br from-[var(--color-secondary)]/20 to-[var(--color-tertiary)]/30">
          <Image src={product.image} alt={product.name} fill className="object-contain p-2 transition-transform duration-200 group-hover:scale-105" />
        </div>
        <div className="flex-1">
          <div className="text-sm uppercase tracking-wide text-zinc-500">{product.category}</div>
          <div className="text-lg font-semibold text-[var(--color-tertiary)] dark:text-white">{product.name}</div>
          <div className="mt-1 text-xs text-zinc-500">
            {product.denominations[0].label} mulai dari Rp{product.denominations[0].price.toLocaleString("id-ID")}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        {product.tags.slice(0, 3).map(t => (
          <span
            key={t}
            className="rounded-full border border-white/20 bg-[var(--color-primary)]/10 px-2 py-1 text-xs text-zinc-700 group-hover:bg-[var(--color-primary)]/20 dark:text-zinc-200"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}
