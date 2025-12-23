"use client"
import { useState } from "react"
import { useEffect } from "react"

const slides = [
  { title: "Promo Akhir Tahun", desc: "Diskon hingga 50% untuk game populer", color: "from-[var(--color-primary)] to-[var(--color-secondary)]" },
  { title: "Tanpa Biaya Admin", desc: "Transaksi lebih hemat setiap hari", color: "from-[var(--color-primary)] to-[var(--color-secondary)]" },
  { title: "Pengiriman Instan", desc: "Top up langsung masuk ke akun Anda", color: "from-[var(--color-primary)] to-[var(--color-secondary)]" }
]

export default function Banner() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % slides.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="rounded-2xl p-8 text-black">
        <div className={`bg-gradient-to-br ${slides[index].color} rounded-2xl p-8 text-black`}>
          <h2 className="text-xl font-bold"> {slides[index].title}</h2>
          <p className="mt-2 text-sm">{slides[index].desc}</p>
          <div className="mt-6 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={"h-2 w-6 rounded-full " + (index === i ? "bg-black" : "bg-black/40")}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
