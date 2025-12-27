"use client";

import { useState } from "react";

export default function HowToAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between"
      >
        <div>
          <div className="text-sm text-zinc-400">Lihat cara top up</div>
          <div className="text-lg font-bold">Cara Top Up</div>
        </div>
        <span className="text-zinc-300">{open ? "–" : "+"}</span>
      </button>

      {open && (
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-zinc-300">
          <li>Masukkan User ID dan Zone ID kamu (contoh: 667632423 (5246))</li>
          <li>Pilih nominal/paket yang kamu inginkan</li>
          <li>Selesaikan pembayaran</li>
          <li>Item akan masuk ke akun kamu</li>
        </ol>
      )}
    </div>
  );
}
