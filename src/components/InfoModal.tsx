"use client"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Product } from "@/lib/products"
import { useState } from "react"

type Props = {
  open: boolean
  product: Product
  initialId?: string
  initialZone?: string
  onClose: () => void
  onSave: (idValue: string, zoneValue: string) => void
}

export default function InfoModal({ open, product, initialId = "", initialZone = "", onClose, onSave }: Props) {
  const [idValue, setIdValue] = useState(initialId)
  const [zoneValue, setZoneValue] = useState(initialZone)

  if (!open) return null
  const isGame = product.category === "game"
  const isPLN = product.slug === "pln"
  const isEMoney = product.slug === "e-money"

  const idLabel = isGame ? "ID Game" : isPLN ? "Nomor Meteran" : isEMoney ? "Nomor Akun" : "Nomor HP"
  const zoneLabel = isGame ? "Zona / Server" : isPLN ? "Nama Pelanggan (opsional)" : isEMoney ? "Provider (opsional)" : "Provider (opsional)"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-[var(--color-secondary)]/10 to-[var(--color-tertiary)]/20 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-[var(--color-tertiary)] dark:text-white">Informasi Diperlukan</div>
          <button onClick={onClose} className="rounded p-1 text-[var(--color-tertiary)] hover:bg-black/10">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <div className="text-sm font-medium text-[var(--color-tertiary)] dark:text-white">{idLabel}</div>
            <input
              value={idValue}
              onChange={e => setIdValue(e.target.value)}
              placeholder={idLabel}
              className="mt-2 w-full rounded-lg border border-white/20 bg-white/70 px-3 py-2 text-sm text-zinc-900 backdrop-blur placeholder:text-zinc-500"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-[var(--color-tertiary)] dark:text-white">{zoneLabel}</div>
            <input
              value={zoneValue}
              onChange={e => setZoneValue(e.target.value)}
              placeholder={zoneLabel}
              className="mt-2 w-full rounded-lg border border-white/20 bg-white/70 px-3 py-2 text-sm text-zinc-900 backdrop-blur placeholder:text-zinc-500"
            />
          </div>
          <button
            type="button"
            onClick={() => onSave(idValue, zoneValue)}
            className="mt-2 w-full rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Simpan
          </button>
        </div>
        <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400">
          Pastikan data sesuai. Untuk transaksi tanpa login, simpan Nomor Transaksi untuk cek status.
        </div>
      </div>
    </div>
  )
}
