export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-8 text-white dark:from-zinc-800 dark:to-zinc-700">
        <h1 className="text-2xl font-bold">Isi ulang instan</h1>
        <p className="mt-2 text-sm">Isi ulang instan untuk aksi tanpa henti</p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1">Dapatkan hadiah besar</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Bonus eksklusif untuk meningkatkan permainan Anda</span>
          <span className="rounded-full bg-white/10 px-3 py-1">Terpercaya · Pembayaran aman</span>
        </div>
      </div>
    </section>
  )
}
