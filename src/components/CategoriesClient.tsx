"use client";

import { CategoryType } from "@/api/api";

type Props = {
  categories: CategoryType[];
  selected: CategoryType,
  setSelected:(data : CategoryType) => void
};

export default function CategoriesClient({ categories, selected, setSelected }: Props) {

  const onClickCategory = (e: CategoryType) => {
    setSelected(e);
    // const el = document.getElementById("kategori-grid");
    // if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c: CategoryType) => (
        <button
          key={c.value}
          onClick={() => onClickCategory(c)}
          className={`rounded-full border border-white/20 bg-[${
            selected?.value === c.value ? "var(--color-primary)" : "var(--color-secondary)"
          }] px-3 py-1 text-xs text-[var(--color-tertiary)] transition hover:bg-[var(--color-primary)]/20`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
