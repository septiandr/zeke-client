"use client";

import { useMemo, useState } from "react";
import type { RawProduct, TypeGroup, UiProduct } from "@/lib/topup";
import { buildTypeCountryGroups } from "@/lib/topup";
import ProductCard from "./ProductCard";

export default function TopupFormClient({ items }: { items: RawProduct[] }) {
  const groups: TypeGroup[] = useMemo(() => buildTypeCountryGroups(items), [items]);

  const [activeType, setActiveType] = useState<string>(groups[0]?.type ?? "");
  const activeTypeGroup = groups.find((g) => g.type === activeType) ?? groups[0];

  const [activeCountry, setActiveCountry] = useState<string>(
    activeTypeGroup?.countries?.[0]?.country ?? "ID"
  );

  // ketika ganti type, reset country ke country pertama type tsb
  const onChangeType = (type: string) => {
    setActiveType(type);
    const nextType = groups.find((g) => g.type === type);
    setActiveCountry(nextType?.countries?.[0]?.country ?? "ID");
  };

  const currentCountryGroup =
    activeTypeGroup?.countries?.find((c) => c.country === activeCountry) ??
    activeTypeGroup?.countries?.[0];

  const [selected, setSelected] = useState<UiProduct | null>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      {/* TYPE TABS */}
      <div className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g.type}
            onClick={() => onChangeType(g.type)}
            className={`rounded-full px-3 py-1 text-sm ${
              activeType === g.type
                ? "bg-white/15 text-white"
                : "bg-white/5 text-zinc-300 hover:bg-white/10"
            }`}
          >
            {g.type}
          </button>
        ))}
      </div>

      {activeTypeGroup?.note ? (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-zinc-300">
          {activeTypeGroup.note}
        </div>
      ) : null}

      {/* COUNTRY TABS */}
      <div className="mt-4 flex flex-wrap gap-2">
        {activeTypeGroup?.countries?.map((c) => (
          <button
            key={c.country}
            onClick={() => setActiveCountry(c.country)}
            className={`rounded-full px-3 py-1 text-xs ${
              activeCountry === c.country
                ? "bg-sky-500/20 text-sky-100 border border-sky-400/40"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            {c.country}
          </button>
        ))}
      </div>

      {/* GRID ITEMS */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {currentCountryGroup?.items?.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            selected={selected?.id === p.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* SELECTED SUMMARY */}
      {selected ? (
        <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-3">
          <div className="text-xs text-zinc-400">Dipilih</div>
          <div className="font-semibold">{selected.name}</div>
          <div className="text-sm text-zinc-400">
            Negara: <span className="text-white">{selected.country}</span> • Seller:{" "}
            <span className="text-white">{selected.sellerName}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
