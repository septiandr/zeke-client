"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { TypeGroup, UiProduct } from "@/lib/topup";

export default function ProductTabs({ groups }: { groups: TypeGroup[] }) {
  const safeGroups = useMemo(() => groups ?? [], [groups]);

  const [activeType, setActiveType] = useState<string>(safeGroups[0]?.type ?? "");
  const activeTypeGroup = safeGroups.find((g) => g.type === activeType) ?? safeGroups[0];

  const [activeCountry, setActiveCountry] = useState<string>(
    activeTypeGroup?.countries?.[0]?.country ?? "ID"
  );

  const [selected, setSelected] = useState<UiProduct | null>(null);

  // kalau ganti type -> reset country + selected
  useEffect(() => {
    const nextType = safeGroups.find((g) => g.type === activeType) ?? safeGroups[0];
    // defer state update to next tick to avoid cascading renders
    queueMicrotask(() => setActiveCountry(nextType?.countries?.[0]?.country ?? "ID"));
    queueMicrotask(() => setSelected(null));
  }, [activeType, safeGroups]);

  if (!safeGroups.length) {
    return <div className="text-sm text-zinc-400">Belum ada produk.</div>;
  }

  const currentCountryGroup =
    activeTypeGroup?.countries?.find((c) => c.country === activeCountry) ??
    activeTypeGroup?.countries?.[0];

  return (
    <div>
      {/* TYPE TABS */}
      <div className="flex flex-wrap gap-2">
        {safeGroups.map((g) => (
          <button
            key={g.type}
            onClick={() => setActiveType(g.type)}
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

      {/* NOTE */}
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
            className={`rounded-full px-3 py-1 text-xs border ${
              activeCountry === c.country
                ? "bg-sky-500/20 text-sky-100 border-sky-400/40"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 border-white/10"
            }`}
          >
            {c.country}
          </button>
        ))}
      </div>

      {/* GRID */}
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

      {/* SELECTED SUMMARY (opsional) */}
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
