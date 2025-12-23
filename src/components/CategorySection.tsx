import { Product } from "@/lib/products"
import ProductCard from "./ProductCard"

type Props = {
  title: string
  products: Product[]
}

export default function CategorySection({ title, products }: Props) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  )
}
