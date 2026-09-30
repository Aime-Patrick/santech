import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SanHubCatalogCard } from "@/components/san-hub/san-hub-course-card";
import { sanHubCatalogItems } from "@/lib/san-hub-catalog-data";

type FeaturedRailProps = {
  items?: typeof sanHubCatalogItems;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function SanHubFeaturedRail({ items = sanHubCatalogItems.filter((item) => item.category === "Courses"), eyebrow = "Start with a pathway", title = "Featured learning for useful work.", description = "Choose a focused route, build something real, and keep your next step close." }: FeaturedRailProps) {
  return (
    <section id="san-hub-programs" className="san-hub-graphic-section scroll-mt-40 px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">{eyebrow}</p>
            <h2 className="font-exo mt-4 text-3xl font-bold leading-tight tracking-[-0.05em] text-[#0a1f44] sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{description}</p>
          </div>
          <Link href="#san-hub-catalog" className="inline-flex items-center gap-2 text-sm font-bold text-brand-secondary underline-offset-4 hover:text-[#0a1f44] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2">View all SAN HUB programs <ArrowUpRight className="size-4" aria-hidden="true" /></Link>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {items.slice(0, 3).map((item) => <SanHubCatalogCard key={item.id} item={item} />)}
        </div>
      </div>
    </section>
  );
}
