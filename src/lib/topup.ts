import { parseCountryFromName } from "./country";
import { ProductWithProfit } from "./profit";

export type RawProduct = {
  product_name: string;
  category: string;
  brand: string;
  type: string;
  seller_name: string;
  price: number;
  original_price?: number;
  discount_percent?: number;
  buyer_sku_code: string;
};

export type UiProduct = {
  id: string;
  name: string;
  country: string;
  sellerName: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rawName: string;
  productCode: string;
};

export type CountryGroup = {
  country: string;
  items: UiProduct[];
};

export type TypeGroup = {
  type: string;
  note?: string;
  countries: CountryGroup[];
};

function makeId(p: RawProduct, idx: number) {
  return `${p.brand}-${p.type}-${p.product_name}-${idx}`.replace(/\s+/g, "-");
}

function extractNumber(name: string) {
  const m = name.replace(/\./g, "").match(/(\d+)/);
  return m ? Number(m[1]) : 9999999;
}

const preferredCountryOrder = ["ID", "PH", "MY", "SG", "BR", "Brazil"];

function sortCountry(a: string, b: string) {
  const ia = preferredCountryOrder.indexOf(a);
  const ib = preferredCountryOrder.indexOf(b);
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
}

export function buildTypeCountryGroups(raw: ProductWithProfit[]): TypeGroup[] {
  const byType = new Map<string, ProductWithProfit[]>();
  for (const p of raw) {
    const key = p.type || "Lainnya";
    byType.set(key, [...(byType.get(key) ?? []), p]);
  }

  const typeGroups: TypeGroup[] = Array.from(byType.entries()).map(
    ([type, list]) => {
      const byCountry = new Map<string, UiProduct[]>();

      list.forEach((p, idx) => {
        const { cleanName, country } = parseCountryFromName(p.product_name);

        const item: UiProduct = {
          id: makeId(p, idx),
          name: cleanName,
          rawName: p.product_name,
          country,
          productCode:p.buyer_sku_code,
          sellerName: p.seller_name,
          price: Number(p.sell_price) || 0,
          originalPrice: p.base_price
            ? Number(p.base_price)
            : undefined,
          // discountPercent: p.
          //   ? Number(p.discount_percent)
          //   : undefined,
        };

        byCountry.set(country, [...(byCountry.get(country) ?? []), item]);
      });

      const countries: CountryGroup[] = Array.from(byCountry.entries())
        .map(([country, items]) => ({
          country,
          items: items.sort(
            (a, b) => extractNumber(a.name) - extractNumber(b.name)
          ),
        }))
        .sort((a, b) => sortCountry(a.country, b.country));

      return {
        type,
        note: type.toLowerCase().includes("membership")
          ? "Membership biasanya memiliki batas pembelian per akun (tergantung provider)."
          : undefined,
        countries,
      };
    }
  );

  // sort type aman (yang tidak ada di list, taruh terakhir)
  const typeOrder = ["Umum", "Membership", "Lainnya"];
  typeGroups.sort((a, b) => {
    const ia = typeOrder.indexOf(a.type);
    const ib = typeOrder.indexOf(b.type);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  return typeGroups;
}

// ✅ alias biar kamu bisa tetap import buildGroups
export const buildGroups = buildTypeCountryGroups;
