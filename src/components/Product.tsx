import { CategoryType, Product as ProductType } from "@/api/api";
import Link from "next/link";
import React from "react";

type Props = { product: CategoryType[] };

function Product({ product }: Props) {
  return product.map((game, index) => {
    const gameLink = game?.value == 'ragnarok-m:-eternal-love' ? `/game/ragnarok.webp` :  `/game/${game.value}.webp`
    return(
    <Link
      key={`${game.value}-${index}`}
      href={`/topup/${game.value}-${index}`}
      className="group hover-raise gold-glow hover-shimmer rounded-xl border border-white/10 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/20 p-4 shadow-sm backdrop-blur"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-[var(--color-secondary)]/20 to-[var(--color-tertiary)]/30 transition-transform duration-200 group-hover:scale-105">
        <img
          src={gameLink}
          alt={game.value}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-2 text-sm font-semibold text-[var(--color-tertiary)] dark:text-white">
        {game.label}
      </div>
      <div className="text-xs text-zinc-500">Mulai top up</div>
    </Link>
  )});
}

export default Product;
