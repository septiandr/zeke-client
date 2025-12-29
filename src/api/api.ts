/* eslint-disable @typescript-eslint/no-explicit-any */
// /lib/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://103.150.226.85:8080/api/v1";

// =====================
// Types
// =====================

export type Product = {
  brand: string;
  buyer_product_status: boolean;
  buyer_sku_code: string;
  category: string;
  desc: string;
  end_cut_off: string;
  multi: boolean;
  price: number;
  product_name: string;
  seller_name: string;
  seller_product_status: boolean;
  start_cut_off: string;
  stock: number;
  type: string;
  unlimited_stock: boolean;
};

export type CategoryType = {
  label: string;
  value: string;
};

export type BackendGame = {
  id?: string | number;
  name?: string;
  title?: string;
  slug?: string;
  href?: string;
  imageUrl?: string;
  image_url?: string;
  brand?: string;
};

export type Game = { name: string; href: string; imageUrl?: string };

export type DigiflazzProduct = {
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

type PaymentResponse = {
  success: boolean;
  data: {
    title: string;
    bank_accounts: {
      bank: string;
      account_name: string;
      account_number: string;
    }[];
    ewallets: {
      provider: string;
      account_name: string;
      number: string;
    }[];
    note?: string;
  };
};

export type PaymentPayload = {
  phone_number: string;
  amount: number;
  payment_method: string;
  payment_channel: string;
};

// =====================
// Core fetch helpers
// =====================

function buildUrl(path: string) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function unwrapJsonData(json: any) {
  // Support backend response format like:
  // { success: true, data: ... }
  if (json && typeof json === "object" && "success" in json && "data" in json) {
    return json.data;
  }
  return json;
}

export async function apiGet<T = any>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = buildUrl(path);

  const res = await fetch(url, {
    ...init,
    // Don't override init.next if caller sets it
    next: (init as any)?.next ?? { revalidate: 60 },
    headers: {
      accept: "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API GET ${url} failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  return unwrapJsonData(json) as T;
}

export async function apiPost<T = any>(
  path: string,
  body: unknown,
  init?: RequestInit
): Promise<T> {
  const url = buildUrl(path);

  const res = await fetch(url, {
    ...init,
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API POST ${url} failed: ${res.status} ${text}`);
  }

  const json = await res.json();
  return unwrapJsonData(json) as T;
}

// =====================
// Products / Categories / Brands
// =====================

export async function getProducts() {
  return apiGet<DigiflazzProduct[]>("/products");
}

export async function getCategories() {
  return apiGet<CategoryType[]>("/products/categories");
}

export async function getBrandList(category: string) {
  return apiGet<CategoryType[]>(`/products/brands-item?category=${category}`);
}
export async function getGames() {
  return apiGet<CategoryType[]>(`/products/brands-item?category=games`);
}
export async function getPaymentList(): Promise<PaymentResponse> {
  return apiGet("/payments/payment_method");
}
export async function createPayment(payload : PaymentPayload) {
  return apiPost("/payments", payload);
}

export async function getBrands(category: string) {
  const qs = new URLSearchParams({ category });
  return apiGet<Product[]>(`/products/brands?${qs.toString()}`);
}

// ✅ ini yang kamu butuh:
// GET /products/items?category=games&brand=point-blank
export async function getProductsByTopupSlug(params: {
  category: string;
  brand: string;
}): Promise<DigiflazzProduct[]> {
  const qs = new URLSearchParams({
    category: params.category,
    brand: params.brand,
  });

  const data = await apiGet<any>(`/products/items?${qs.toString()}`);
  return Array.isArray(data) ? (data as DigiflazzProduct[]) : [];
}
// =====================
// Nickname checker
// =====================

export async function checkNickname(
  game: string,
  id: string | number,
  opts?: { server?: string | number; decode?: boolean }
) {
  const params = new URLSearchParams();
  params.set("id", String(id));
  if (opts?.server !== undefined) params.set("server", String(opts.server));
  if (opts?.decode !== undefined) params.set("decode", String(opts.decode));

  return apiGet(`/nickname/${encodeURIComponent(game)}?${params.toString()}`);
}

// =====================
// Product lookup by SKU
// =====================

export async function getProductBySku(
  sku: string
): Promise<DigiflazzProduct | null> {
  const products = await getProducts();
  if (!Array.isArray(products)) return null;
  return products.find((p) => p.buyer_sku_code === sku) || null;
}

// =====================
// Transaction
// =====================

export async function createTransaction(input: {
  buyer_sku_code: string;
  customer_no: string;
  ref_id: string;
}) {
  return apiPost("/digiflazz/transaction", input);
}
