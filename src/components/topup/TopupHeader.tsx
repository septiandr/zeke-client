import Image from "next/image";
import Link from "next/link";

type Crumb = { label: string; href: string };

export default function TopupHeader({
  breadcrumbs,
  title,
  subtitle,
  imageSrc,
}: {
  breadcrumbs: Crumb[];
  title: string;
  subtitle: string;
  imageSrc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <nav className="text-sm text-zinc-400">
        {breadcrumbs.map((b, i) => (
          <span key={b.href}>
            <Link href={b.href} className="hover:text-white">
              {b.label}
            </Link>
            {i < breadcrumbs.length - 1 ? <span className="px-2">/</span> : null}
          </span>
        ))}
      </nav>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-black/30">
          <Image src={imageSrc} alt={title} fill className="object-contain p-2" priority />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">{title}</h1>
          <p className="text-sm text-zinc-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
