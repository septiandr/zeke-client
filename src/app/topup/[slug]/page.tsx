import Image from "next/image"
import { getProductBySlug, getProductsByCategory } from "@/lib/products"
import TopupForm from "@/components/TopupForm"
import Categories from "@/components/Categories"
import CategorySection from "@/components/CategorySection"

type Props = {
  params: { slug: string }
}

export default function TopupPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="text-center text-zinc-700 dark:text-zinc-300">Produk tidak ditemukan</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 font-sans">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" />
          </div>
          <div>
            <div className="text-sm uppercase tracking-wide text-zinc-500">{product.category}</div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{product.name}</h1>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">Isi ulang instan, pembayaran aman</div>
          </div>
        </div>
        <TopupForm product={product} />
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <Categories />
        <CategorySection
          title="Produk terkait"
          products={getProductsByCategory(product.category).filter(p => p.slug !== product.slug).slice(0, 6)}
        />
      </div>
    </div>
  )
}
