"use client";

import { useState } from "react";

export default function PurchaseFormClient({
  brand,
  category,
}: {
  brand: string;
  category: string;
}) {
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [promo, setPromo] = useState("");
  const [wa, setWa] = useState("");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-sm text-zinc-400">{category}</div>
      <div className="text-lg font-extrabold">{brand}</div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="text-xs text-zinc-400">User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="Contoh: 667632423"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400">Zone ID</label>
          <input
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="Contoh: 5246"
          />
        </div>

        <div className="border-t border-white/10 pt-3">
          <label className="text-xs text-zinc-400">Kode Promo (Opsional)</label>
          <div className="mt-1 flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
              placeholder="Masukkan kode promo"
            />
            <button className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15">
              Pakai
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-zinc-400">No Whatsapp (Opsional)</label>
          <input
            value={wa}
            onChange={(e) => setWa(e.target.value)}
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
            placeholder="08xxxxxxxxxx"
          />
          <p className="mt-2 text-xs text-zinc-500">
            Nomor ini digunakan jika transaksi gagal/kendala & untuk pembayaran e-wallet.
          </p>
        </div>

        <button
          className="w-full rounded-xl bg-emerald-500/80 py-3 font-bold text-white hover:bg-emerald-500"
          onClick={() => console.log({ userId, zoneId, promo, wa })}
        >
          Beli
        </button>
      </div>
    </div>
  );
}
