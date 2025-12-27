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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isML = ["MOBILE LEGENDS", "Magic Chess"].includes(brand);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!userId.trim()) {
      newErrors.userId = "User ID wajib diisi";
    }

    if (isML && !zoneId.trim()) {
      newErrors.zoneId = "Zone ID wajib diisi";
    }

    if (!wa.trim()) {
      newErrors.wa = "Nomor WhatsApp wajib diisi";
    } else if (!/^08\d{8,12}$/.test(wa)) {
      newErrors.wa = "Format nomor WhatsApp tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // submit data
    console.log({
      brand,
      userId,
      zoneId: isML ? zoneId : undefined,
      promo,
      wa,
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-sm text-zinc-400">{category}</div>
      <div className="text-lg font-extrabold">{brand}</div>

      <div className="mt-4 space-y-3">
        {/* USER ID */}
        <div>
          <label className="text-xs text-zinc-400">User ID *</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className={`mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 text-sm outline-none
              ${
                errors.userId
                  ? "border-red-500"
                  : "border-white/10 focus:border-white/20"
              }`}
            placeholder="Contoh: 667632423"
          />
          {errors.userId && (
            <p className="mt-1 text-xs text-red-400">{errors.userId}</p>
          )}
        </div>

        {/* ZONE ID */}
        {isML && (
          <div>
            <label className="text-xs text-zinc-400">Zone ID *</label>
            <input
              value={zoneId}
              onChange={(e) => setZoneId(e.target.value)}
              className={`mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 text-sm outline-none
                ${
                  errors.zoneId
                    ? "border-red-500"
                    : "border-white/10 focus:border-white/20"
                }`}
              placeholder="Contoh: 5246"
            />
            {errors.zoneId && (
              <p className="mt-1 text-xs text-red-400">{errors.zoneId}</p>
            )}
          </div>
        )}

        {/* PROMO */}
        {/* <div className="border-t border-white/10 pt-3">
          <label className="text-xs text-zinc-400">Kode Promo (Opsional)</label>
          <div className="mt-1 flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:border-white/20"
              placeholder="Masukkan kode promo"
            />
            <button
              type="button"
              className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
            >
              Pakai
            </button>
          </div>
        </div> */}

        {/* WHATSAPP */}
        <div>
          <label className="text-xs text-zinc-400">
            No WhatsApp *
          </label>
          <input
            value={wa}
            onChange={(e) => setWa(e.target.value)}
            className={`mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 text-sm outline-none
              ${
                errors.wa
                  ? "border-red-500"
                  : "border-white/10 focus:border-white/20"
              }`}
            placeholder="08xxxxxxxxxx"
          />
          {errors.wa && (
            <p className="mt-1 text-xs text-red-400">{errors.wa}</p>
          )}
          <p className="mt-2 text-xs text-zinc-500">
            Nomor ini digunakan jika transaksi gagal/kendala & untuk pembayaran
            e-wallet.
          </p>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-emerald-500/80 py-3 font-bold text-white hover:bg-emerald-500"
        >
          Beli
        </button>
      </div>
    </div>
  );
}
