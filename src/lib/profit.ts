type RoundMode = "none" | "ceil" | "floor" | "round";

export type BaseProduct = {
  product_name: string;
  category: string;
  brand: string;
  type: string;
  seller_name: string;
  price: number;
  buyer_sku_code: string;
  buyer_product_status: boolean;
  seller_product_status: boolean;
  unlimited_stock: boolean;
  stock: number;
  multi: boolean;
  start_cut_off: string;
  end_cut_off: string;
  desc: string;
};

export type ProfitConfig = {
  profit: {
    dev: number;
    patner: number;
    user: number;
    vip: number;
    vvip: number;
  };
  output?: Record<string, string>;
};

export type ProductWithProfit = BaseProduct & {
  base_price: number;   // harga asli
  sell_price: number;   // harga + profit
  profit_level: number; // misal 1.1
};


function roundTo(value: number, step = 100, mode: RoundMode = "ceil") {
  if (!Number.isFinite(value)) return 0;
  if (mode === "none" || step <= 0) return Math.round(value);

  const x = value / step;
  if (mode === "ceil") return Math.ceil(x) * step;
  if (mode === "floor") return Math.floor(x) * step;
  return Math.round(x) * step; // "round"
}

export function applyProfitUser(
  products: BaseProduct[],
  profitCfg: ProfitConfig,
  opts?: {
    roundStep?: number;     // default 100
    roundMode?: RoundMode;  // default "ceil"
    minPrice?: number;      // optional: minimal harga jual
  }
): ProductWithProfit[] {
  const level = profitCfg?.profit?.user ?? 1; // fallback aman

  const roundStep = opts?.roundStep ?? 0;
  const roundMode = opts?.roundMode ?? "ceil";
  const minPrice = opts?.minPrice ?? 0;

  return products.map((p) => {
    const base = Number(p.price) || 0;
    const rawSell = base * level;
    const sell = Math.max(minPrice, roundTo(rawSell, roundStep, roundMode));

    return {
      ...p,
      base_price: base,
      sell_price: sell,
      profit_level: level,
    };
  });
}
