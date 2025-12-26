export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="h-8 w-48 rounded bg-white/10" />
      <div className="mt-4 grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-white/5" />
        ))}
      </div>
    </section>
  );
}
