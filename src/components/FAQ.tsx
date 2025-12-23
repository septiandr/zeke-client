"use client"
import { useState } from "react"

const items = [
  {
    q: "Bagaimana cara cek riwayat transaksi?",
    a: "Login ke akun untuk melihat riwayat transaksi di halaman Transaksi. Jika bertransaksi tanpa login, gunakan Nomor Transaksi pada kolom track transaksi untuk cek status."
  },
  {
    q: "Apa itu top up game?",
    a: "Top up game adalah membeli mata uang virtual/item dalam game menggunakan uang sungguhan untuk membeli skin, battle pass, senjata, dan item lain."
  },
  {
    q: "Contoh game yang bisa di-top up?",
    a: "Mobile Legends, Free Fire, PUBG Mobile, dan berbagai game populer lainnya."
  }
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Frequently Asked Questions</h2>
      <div className="mt-4 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{it.q}</span>
              <span className="text-xl text-zinc-500">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{it.a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
