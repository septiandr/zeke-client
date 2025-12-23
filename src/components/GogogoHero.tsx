export default function GogogoHero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col items-center gap-10 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-soft)] p-8 text-black md:flex-row md:items-center md:justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/image/logo.svg"
            alt="Logo Toko Game"
            className="h-40 w-40 rounded-xl object-contain bg-[var(--color-secondary)]  p-2"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">
            Toko Game Online Harga Termurah Tanpa Biaya Admin
          </h1>
          <p className="mt-2 text-sm">
            Top up cepat, aman, dan tanpa biaya admin
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs md:justify-start">
            <span className="rounded-full bg-[var(--color-secondary)]/80 px-3 py-1 text-white font-semibold">
              Harga murah
            </span>
            <span className="rounded-full bg-[var(--color-secondary)]/80 px-3 py-1 text-white font-semibold">
              Tanpa biaya admin
            </span>
            <span className="rounded-full bg-[var(--color-secondary)]/80 px-3 py-1 text-white font-semibold">
              Pengiriman instan
            </span>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              href="#kategori"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--color-tertiary)]/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
            >
              Beli Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
