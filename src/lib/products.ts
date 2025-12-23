export type Denomination = {
  id: string
  label: string
  amount: number
  currency: string
  price: number
}

export type Product = {
  slug: string
  name: string
  image: string
  category: "game" | "voucher" | "services"
  tags: string[]
  denominations: Denomination[]
  requiresServer?: boolean
}

export const products: Product[] = [
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile UC",
    image: "/window.svg",
    category: "game",
    tags: ["popular", "global"],
    denominations: [
      { id: "uc60", label: "60 UC", amount: 60, currency: "UC", price: 18000 },
      { id: "uc300", label: "300 UC", amount: 300, currency: "UC", price: 85000 },
      { id: "uc600", label: "600 UC", amount: 600, currency: "UC", price: 160000 }
    ]
  },
  {
    slug: "pulsa",
    name: "Topup Pulsa",
    image: "/window.svg",
    category: "services",
    tags: ["services", "popular"],
    denominations: [
      { id: "pulsa10", label: "Pulsa 10K", amount: 10000, currency: "IDR", price: 10000 },
      { id: "pulsa25", label: "Pulsa 25K", amount: 25000, currency: "IDR", price: 25000 },
      { id: "pulsa50", label: "Pulsa 50K", amount: 50000, currency: "IDR", price: 50000 }
    ]
  },
  {
    slug: "pln",
    name: "Token PLN",
    image: "/globe.svg",
    category: "services",
    tags: ["services"],
    denominations: [
      { id: "pln20", label: "Token 20K", amount: 20000, currency: "IDR", price: 20000 },
      { id: "pln50", label: "Token 50K", amount: 50000, currency: "IDR", price: 50000 },
      { id: "pln100", label: "Token 100K", amount: 100000, currency: "IDR", price: 100000 }
    ]
  },
  {
    slug: "paket-data",
    name: "Paket Data",
    image: "/file.svg",
    category: "services",
    tags: ["services"],
    denominations: [
      { id: "data1", label: "1 GB", amount: 1, currency: "GB", price: 15000 },
      { id: "data5", label: "5 GB", amount: 5, currency: "GB", price: 60000 },
      { id: "data10", label: "10 GB", amount: 10, currency: "GB", price: 100000 }
    ]
  },
  {
    slug: "e-money",
    name: "Topup E-Money",
    image: "/next.svg",
    category: "services",
    tags: ["services"],
    denominations: [
      { id: "em50", label: "Saldo 50K", amount: 50000, currency: "IDR", price: 50000 },
      { id: "em100", label: "Saldo 100K", amount: 100000, currency: "IDR", price: 100000 },
      { id: "em200", label: "Saldo 200K", amount: 200000, currency: "IDR", price: 200000 }
    ]
  },
  {
    slug: "mobile-legends",
    name: "Mobile Legends Diamonds",
    image: "/globe.svg",
    category: "game",
    tags: ["popular", "local"],
    denominations: [
      { id: "dm86", label: "86 Diamonds", amount: 86, currency: "Diamonds", price: 22000 },
      { id: "dm172", label: "172 Diamonds", amount: 172, currency: "Diamonds", price: 43000 },
      { id: "dm344", label: "344 Diamonds", amount: 344, currency: "Diamonds", price: 85000 }
    ],
    requiresServer: true
  },
  {
    slug: "psn",
    name: "PSN Wallet Code",
    image: "/file.svg",
    category: "voucher",
    tags: ["voucher", "global"],
    denominations: [
      { id: "psn100k", label: "IDR 100.000", amount: 100000, currency: "IDR", price: 100000 },
      { id: "psn250k", label: "IDR 250.000", amount: 250000, currency: "IDR", price: 250000 },
      { id: "psn500k", label: "IDR 500.000", amount: 500000, currency: "IDR", price: 500000 }
    ]
  },
  {
    slug: "steam-wallet",
    name: "Steam Wallet Code",
    image: "/next.svg",
    category: "voucher",
    tags: ["popular", "global"],
    denominations: [
      { id: "steam120", label: "IDR 120.000", amount: 120000, currency: "IDR", price: 120000 },
      { id: "steam250", label: "IDR 250.000", amount: 250000, currency: "IDR", price: 250000 },
      { id: "steam400", label: "IDR 400.000", amount: 400000, currency: "IDR", price: 400000 }
    ]
  }
]

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug) || null
}

export function getProductsByTag(tag: string) {
  return products.filter(p => p.tags.includes(tag))
}

export function getProductsByCategory(category: Product["category"]) {
  return products.filter(p => p.category === category)
}
