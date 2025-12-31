import { getPrice, getProductsByTopupSlug, Product } from "@/api/api";
import HowToAccordion from "@/components/topup/HowToAccordion";
import ProductTabs from "@/components/topup/ProductTabs";
import PurchaseFormClient from "@/components/topup/PurchaseFromClient";
import TopupHeader from "@/components/topup/TopupHeader";
import { applyProfitUser } from "@/lib/profit";
import { parseTopupSlug } from "@/lib/slug";
import { buildGroups, RawProduct } from "@/lib/topup";

type Props = { params: Promise<{ slug: string }> };

export default async function TopupPage({ params }: Props) {
  const { slug } = await params;

  // ✅ parse slug -> brand + category
  const { brandSlug, categorySlug } = parseTopupSlug(slug);

  // ✅ hit endpoint sesuai wrapper kamu
  const raw: Product[] = await getProductsByTopupSlug({
    brand: slug,
    category: 'games',
  });

  const price = await getPrice();
  const productsWithProfit = applyProfitUser(raw, price);

  const groups = buildGroups(productsWithProfit);

  const brandName = raw?.[0]?.brand ?? brandSlug.replaceAll("-", " ").toUpperCase();
  const categoryName = raw?.[0]?.category ?? categorySlug.toUpperCase();

  return (
    <div className="min-h-screen  text-white pt-20 christmas-bg">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <TopupHeader
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Top Up", href: "/topup" },
            { label: brandName, href: `/topup/${slug}` },
          ]}
          title={`Top Up ${brandName}`}
          subtitle="Isi ulang instan, pembayaran aman"
          imageSrc={`/game/${slug}.webp`}
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* KIRI */}
          <div className="space-y-6">
            <HowToAccordion />

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-bold">
                  1
                </div>
                <h2 className="text-lg font-bold">Pilih Nominal atau Paket</h2>
              </div>

              <div className="mt-4">
                <ProductTabs groups={groups} />
              </div>
            </div>
          </div>

          {/* KANAN */}
          <div className="lg:sticky lg:top-20">
            <PurchaseFormClient category={categoryName} brand={brandName} slug={slug}/>
          </div>
        </div>
      </div>
    </div>
  );
}
