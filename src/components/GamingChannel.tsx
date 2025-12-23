export default function GamingChannel() {
  const items = [
    "MUSIM UJAN EMANG RAWAN BANJIR SIHH🌧",
    "HMM KAYAKNYA ADA YANG ANEH YAA😂",
    "HARAP FOKUS YAA KALO MAIN TEBAK KATAA🤣",
    "GOKIIL BERHASIL SAPU BERSIH NIH GAISS!🔥",
    "NENEKNYA PELARI KALCER NIHH🤭🏃‍♀️",
    "GAMPANG INI MAHH AYO COBA TEBAK GAIS!👀",
    "How to Buy PSN Codes on UniPin | Fast, Secure & Instant Delivery",
    "Buy PUBG Mobile UC on UniPin in Seconds | Step-by-Step Tutorial"
  ]
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">UniPin Gaming Channel</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Watch the best gaming action on UniPin Gaming</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((title, i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="aspect-video w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
