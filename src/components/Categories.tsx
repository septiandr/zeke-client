"use client";

import {
  CategoryType,
  getBrandList,
  getBrands,
  getCategories,
  getGames,
  Product as ProductType,
} from "@/api/api";
import { useEffect, useState } from "react";
import CategoriesClient from "./CategoriesClient";
import Product from "./Product";

export type BrandProps = CategoryType & {
  imageUrl: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selected, setSelected] = useState<CategoryType>({
    label: "Games",
    value: "games",
  });
  const [products, setProducts] = useState<CategoryType[]>([]);

  // fetch categories sekali
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // fetch product berdasarkan selected
  useEffect(() => {
    async function fetchProducts() {
      const data = await getGames();
      setProducts(data);
    }
    fetchProducts();
  }, [selected.value]);

  return (
    <section id="kategori" className="mx-auto max-w-6xl px-4 py-6">
      {/* <CategoriesClient
        categories={categories}
        selected={selected}
        setSelected={setSelected}
      /> */}
      <h1 className="text-3xl font-bold text-[var(--color-primary)] drop-shadow-[0_0_8px_rgba(255,200,120,0.35)]">
        Game Populer
      </h1>

      <div id="kategori-grid" className="mt-4 grid grid-cols-4 gap-4">
        <Product product={products} />
      </div>
    </section>
  );
}
