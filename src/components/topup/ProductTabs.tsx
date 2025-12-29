"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { TypeGroup, UiProduct } from "@/lib/topup";
import { usePurchaseStore } from "@/stores/productStore";

export default function ProductTabs({ groups }: { groups: TypeGroup[] }) {
  const safeGroups = useMemo(() => groups ?? [], [groups]);
  const setProduct = usePurchaseStore((s) => s.setProduct);

  // simpan cuma "keys"
  const [activeType, setActiveType] = useState<string>("");
  const [activeCountry, setActiveCountry] = useState<string>("ID");
  const [selected, setSelected] = useState<UiProduct | null>(null);

  // ✅ sync selected -> zustand (external system)
  useEffect(() => {
    setProduct(selected);
  }, [selected, setProduct]);

  // ---------- Derived / normalized values (NO setState) ----------
  const firstType = safeGroups[0]?.type ?? "";
  const normalizedType = useMemo(() => {
    if (!safeGroups.length) return "";
    if (activeType && safeGroups.some((g) => g.type === activeType)) return activeType;
    return firstType;
  }, [safeGroups, activeType, firstType]);

  const activeTypeGroup = useMemo(() => {
    if (!safeGroups.length) return undefined;
    return safeGroups.find((g) => g.type === normalizedType) ?? safeGroups[0];
  }, [safeGroups, normalizedType]);

  const firstCountry = activeTypeGroup?.countries?.[0]?.country ?? "ID";
  const normalizedCountry = useMemo(() => {
    if (!activeTypeGroup) return "ID";
    if (activeCountry && activeTypeGroup.countries?.some((c) => c.country === activeCountry)) {
      return activeCountry;
    }
    return firstCountry;
  }, [activeTypeGroup, activeCountry, firstCountry]);

  const currentCountryGroup =
    activeTypeGroup?.countries?.find((c) => c.country === normalizedCountry) ??
    activeTypeGroup?.countries?.[0];

  // ---------- Handlers (reset occurs on user action) ----------
  const handleChangeType = (type: string) => {
    if (!safeGroups.length) return;

    // set default kalau kosong
    const nextType = type;
    const nextTypeGroup = safeGroups.find((g) => g.type === nextType) ?? safeGroups[0];
    const nextCountry = nextTypeGroup?.countries?.[0]?.country ?? "ID";

    setActiveType(nextType);
    setActiveCountry(nextCountry);

    // reset selection + store
    setSelected(null);
    setProduct(null);
  };

  const handleChangeCountry = (country: string) => {
    setActiveCountry(country);
    setSelected(null);
    setProduct(null);
  };

  // ✅ optional: on first render, kalau activeType masih kosong, pakai fallback di UI
  // (tanpa setState, jadi tidak memicu warning)

  if (!safeGroups.length) {
    return <div className="text-sm text-zinc-400">Belum ada produk.</div>;
  }

  return (
    <div>
      {/* TYPE TABS */}
      <div className="flex flex-wrap gap-2">
        {safeGroups.map((g) => (
          <button
            key={g.type}
            onClick={() => handleChangeType(g.type)}
            className={`rounded-full px-3 py-1 text-sm ${
              normalizedType === g.type
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
            onClick={() => handleChangeCountry(c.country)}
            className={`rounded-full px-3 py-1 text-xs border ${
              normalizedCountry === c.country
                ? "bg-sky-500/20 text-sky-100 border-sky-400/40"
                : "bg-white/5 text-zinc-300 hover:bg-white/10 border-white/10"
            }`}
          >
            {c.country}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div
        key={`${normalizedType}-${normalizedCountry}`} // optional: remount grid saat tab berubah
        className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
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
