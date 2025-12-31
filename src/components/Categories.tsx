import { CategoryType, getGames } from "@/api/api";
import Product from "./Product";

export const revalidate = 0; // opsional: kalau mau selalu fresh

export default async function Categories() {
  const products: CategoryType[] = await getGames();

  return (
    <section id="kategori" className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] drop-shadow-[0_0_8px_rgba(255,200,120,0.35)]">
        Game Populer
      </h1>

      <div id="kategori-grid" className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-4">
        {products.length > 0 ? <Product product={products} /> : null}
      </div>
    </section>
  );
}
