import { UiProduct } from "@/lib/topup";
import { create } from "zustand";

type PurchaseState = {
  // ✅ product
  product: UiProduct | null;

  // existing state …
  userId: string;
  zoneId: string;
  wa: string;

  // actions
  setProduct: (p: UiProduct | null) => void;

  // (biarin state & action lain tetap)
};

export const usePurchaseStore = create<PurchaseState>((set) => ({
  // initial
  product: null,

  userId: "",
  zoneId: "",
  wa: "",

  // actions
  setProduct: (p) => set({ product: p }),

  // state & action lain tetap…
}));
