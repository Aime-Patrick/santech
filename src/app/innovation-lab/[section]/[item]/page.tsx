import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { PublicPage } from "@/components/public-page";
import { Safari } from "@/components/ui/safari";
import { getInnovationItem, innovationItems, type InnovationSection } from "@/lib/innovation-data";

const sections: InnovationSection[] = ["product", "services", "solutions"];
const sectionLabels: Record<InnovationSection, string> = {
  product: "Products",
  services: "Services",
  solutions: "Solutions & technologies",
};

export function generateStaticParams() {
  return sections.flatMap((section) => innovationItems[section]
    .filter((item) => !(section === "product" && item.id === "e-visitors"))
    .map((item) => ({ section, item: item.id })));
}

export default async function InnovationDetailPage({ params }: { params: Promise<{ section: string; item: string }> }) {
  const { section, item: itemId } = await params;
  if (!sections.includes(section as InnovationSection)) notFound();

  const innovationSection = section as InnovationSection;
  if (innovationSection === "product" && itemId === "e-visitors") redirect("/e-visitors");

  const item = getInnovationItem(innovationSection, itemId);
  if (!item) notFound();

  return (
    <PublicPage>
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-[#edf1f7] to-[#e4eaf3] px-6 pb-14 pt-10 sm:px-10 sm:pb-20 sm:pt-14 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link href={`/innovation-lab${innovationSection === "product" ? "" : `/${innovationSection}`}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0a1f44] transition-colors hover:text-brand-secondary">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to {sectionLabels[innovationSection]}
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">{sectionLabels[innovationSection]}</p>
              <h1 className="font-exo mt-5 text-4xl font-bold leading-[0.98] tracking-[-0.055em] text-[#0a1f44] sm:text-5xl lg:text-6xl">{item.label}</h1>
              <h2 className="font-exo mt-5 max-w-xl text-xl font-normal leading-tight tracking-[-0.03em] text-[#303755] sm:text-2xl">{item.title}</h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#68718a] sm:text-lg">{item.description}</p>
            </div>

            <Safari
              url={`${item.id}.santech.rw`}
              imageSrc={item.media.src}
              className="mx-auto w-full max-w-[760px]"
              aria-label={`${item.label} product preview`}
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">Inside the work</p>
              <h2 className="font-exo mt-4 text-3xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-4xl">Built around the details that matter.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {item.coreFeatures.map(({ label, icon: Icon = BarChart3, description }) => (
                <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(10,31,68,0.05)]">
                  <span className="grid size-10 place-items-center rounded-xl bg-[#e3ebf7] text-brand-secondary">
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-sm font-black uppercase tracking-[0.1em] text-[#0a1f44]">{label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#68718a]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
