import { getProductBySlug } from "@/lib/products"
import Link from "next/link"

type Props = {
  searchParams: {
    product?: string
    denom?: string
    id?: string
    server?: string
    pay?: string
    order?: string
  }
}

export default function CheckoutPage({ searchParams }: Props) {
  const product = searchParams.product ? getProductBySlug(searchParams.product) : null
  const denom = product?.denominations.find(d => d.id === searchParams.denom)

  return (
    <div className="min-h-screen bg-zinc-50 py-8 font-sans dark:bg-black">
      <div className="mx-auto max-w-3xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Pesanan Berhasil</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Detail pesanan Anda</p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Order ID</div>
          <div className="text-sm font-medium">{searchParams.order || "-"}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Produk</div>
          <div className="text-sm font-medium">{product?.name || "-"}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Nominal</div>
          <div className="text-sm font-medium">{denom ? denom.label : "-"}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">ID Pemain</div>
          <div className="text-sm font-medium">{searchParams.id || "-"}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Server</div>
          <div className="text-sm font-medium">{searchParams.server || "-"}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Metode Pembayaran</div>
          <div className="text-sm font-medium">{searchParams.pay || "-"}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Total</div>
          <div className="text-sm font-medium">Rp{denom ? denom.price.toLocaleString("id-ID") : 0}</div>
        </div>
        <div className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">Pembayaran diproses. Anda akan menerima kode atau isi ulang secara instan.</div>
        <div className="mt-6">
          <Link
            href="/"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-black"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
