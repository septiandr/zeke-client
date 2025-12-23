"use client"
import { useMemo, useState } from "react"
import { Product, Denomination } from "@/lib/products"
import PaymentMethodSelector from "./PaymentMethodSelector"
import { useRouter } from "next/navigation"
import InfoModal from "./InfoModal"

type Props = {
  product: Product
}

export default function TopupForm({ product }: Props) {
  const router = useRouter()
  const [playerId, setPlayerId] = useState("")
  const [server, setServer] = useState("")
  const [denom, setDenom] = useState<Denomination | null>(product.denominations[0] || null)
  const [payment, setPayment] = useState("QRIS")
  const [openInfo, setOpenInfo] = useState(false)

  const total = useMemo(() => (denom ? denom.price : 0), [denom])

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg border border-white/20 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/20 p-4">
            <div className="text-sm font-medium text-[var(--color-tertiary)] dark:text-white">Data Pembeli</div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/20 bg-white/60 px-2 py-1 text-black">
                {playerId ? playerId : "ID/No. (belum diisi)"}
              </span>
              {product.requiresServer && (
                <span className="rounded-full border border-white/20 bg-white/60 px-2 py-1 text-black">
                  {server ? server : "Zona/Server (belum diisi)"}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setOpenInfo(true)}
              className="mt-3 rounded-lg bg-[var(--color-primary)] px-3 py-2 text-xs font-semibold text-black hover:opacity-90"
            >
              Lengkapi Data
            </button>
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Nominal</div>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {product.denominations.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDenom(d)}
                  className={
                    "rounded-lg border px-3 py-2 text-sm " +
                    (denom?.id === d.id
                      ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                      : "border-zinc-300 bg-white text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300")
                  }
                >
                  <div>{d.label}</div>
                  <div className="text-xs">Rp{d.price.toLocaleString("id-ID")}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Metode Pembayaran</div>
            <div className="mt-2">
              <PaymentMethodSelector value={payment} onChange={setPayment} />
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Total</div>
              <div className="text-lg font-semibold">Rp{total.toLocaleString("id-ID")}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                const orderId = Math.random().toString(36).slice(2, 10)
                const params = new URLSearchParams({
                  product: product.slug,
                  denom: denom?.id || "",
                  id: playerId,
                  server,
                  pay: payment,
                  order: orderId
                })
                router.push(`/checkout?${params.toString()}`)
              }}
              disabled={!playerId || !denom}
              className="mt-4 w-full rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-black/30"
            >
              Bayar Sekarang
            </button>
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Pembayaran instan dan aman</div>
          </div>
        </div>
      </div>
      <InfoModal
        key={`${product.slug}-${openInfo}-${playerId}-${server}`}
        open={openInfo}
        product={product}
        initialId={playerId}
        initialZone={server}
        onClose={() => setOpenInfo(false)}
        onSave={(idValue, zoneValue) => {
          setPlayerId(idValue)
          setServer(zoneValue)
          setOpenInfo(false)
        }}
      />
    </div>
  )
}
