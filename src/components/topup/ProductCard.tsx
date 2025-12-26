"use client";

import type { UiProduct } from "@/lib/topup";

export default function ProductCard({
  product,
  selected,
  onSelect,
}: {
  product: UiProduct;
  selected: boolean;
  onSelect: (p: UiProduct) => void;
}) {
  return (
    <button
      onClick={() => onSelect(product)}
      className={`rounded-2xl border p-4 text-left ${
        selected ? "border-sky-400 bg-black/30" : "border-white/10 bg-black/20 hover:bg-black/30"
      }`}
    >
      <div className="font-bold">{product.name}</div>
      <div className="text-xs text-zinc-400">{product.sellerName}</div>
      <div className="mt-2 font-extrabold">Rp {product.price.toLocaleString("id-ID")}</div>
    </button>
  );
}
