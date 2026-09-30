import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

import { PageIntro, PublicPage } from "@/components/public-page";
import { SanHubCatalog } from "@/components/san-hub-catalog";
import { SanHubFeaturedRail } from "@/components/san-hub/san-hub-featured-rail";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { SanHubSectionReveal } from "@/components/san-hub/san-hub-section-reveal";
import { getSanHubExploreRoute, sanHubExploreRoutes, type SanHubExploreRouteId } from "@/lib/san-hub-explore-data";
import { sanHubCatalogItems, sanHubProgramItems, type SanHubCatalogItem } from "@/lib/san-hub-catalog-data";

const courseItems = sanHubCatalogItems.filter((item) => item.category === "Courses");

const routeItems: Record<SanHubExploreRouteId, readonly SanHubCatalogItem[]> = {
  learn: courseItems,
  build: sanHubCatalogItems.filter((item) => item.category === "Innovation programs"),
  innovate: sanHubProgramItems.filter((item) => ["innovation-accelerator", "research-development", "challenges-hackathons"].includes(item.id)),
  launch: [...sanHubCatalogItems.filter((item) => item.id === "startup-product-studio"), ...sanHubProgramItems.filter((item) => item.id === "startup-development")],
  connect: sanHubCatalogItems.filter((item) => item.category === "Events"),
  work: sanHubCatalogItems.filter((item) => item.category === "Apprenticeships / Internships"),
  research: [...sanHubCatalogItems.filter((item) => item.id === "innovation-internship"), ...sanHubProgramItems.filter((item) => item.id === "research-development")],
  commercialize: [...sanHubCatalogItems.filter((item) => item.id === "startup-product-studio"), ...sanHubProgramItems.filter((item) => item.id === "startup-development")],
};

export function generateStaticParams() {
  return sanHubExploreRoutes.map(({ id: route }) => ({ route }));
}

function RouteFocus({ route }: { route: NonNullable<ReturnType<typeof getSanHubExploreRoute>> }) {
  return (
    <section className="border-b border-slate-200 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-[1500px] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN HUB / {route.label}</p>
            <h2 className="font-exo mt-4 max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl">What this pathway includes</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#303755]">{route.pageDescription}</p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {route.focus.map((item, index) => (
            <div key={item} className="border border-slate-200 bg-[#fbfcfe] p-5">
              <span className="text-[10px] font-black tracking-[0.16em] text-brand-secondary">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-8 text-sm font-bold leading-6 text-[#0a1f44]">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RouteNextStep({ route }: { route: NonNullable<ReturnType<typeof getSanHubExploreRoute>> }) {
  return (
    <section className="border-b border-slate-200 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 bg-[#07152d] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10 lg:px-12">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Continue with SAN HUB</p>
          <h2 className="font-exo mt-3 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Ready to take the next step?</h2>
        </div>
        <Link href="/join-the-community?source=san-hub" className="inline-flex w-fit items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-black text-[#07152d] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152d]">
          Join SAN HUB <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default async function SanHubExploreRoutePage({ params }: { params: Promise<{ route: string }> }) {
  const { route: routeId } = await params;
  const route = getSanHubExploreRoute(routeId);
  if (!route) notFound();

  const items = routeItems[route.id];

  return (
    <PublicPage>
      <PageIntro eyebrow={`SAN HUB / ${route.label}`} title={route.title} description={route.pageDescription} actions={[{ label: "Back to Explore", href: "/san-hub?section=explore", tone: "secondary" }, { label: "Join SAN HUB", href: "/join-the-community?source=san-hub" }]} />
      <SanHubSectionMenu activeSection="explore" />
      <SanHubSectionReveal><RouteFocus route={route} /></SanHubSectionReveal>
      {route.id === "learn" && <SanHubSectionReveal><SanHubFeaturedRail items={courseItems} eyebrow="SAN HUB / Courses" title="Choose a course and start building." description="Explore focused learning pathways designed to turn knowledge into useful capability." /></SanHubSectionReveal>}
      {items.length > 0 && <SanHubSectionReveal><SanHubCatalog items={items} showFilters={false} showCategoryFilter={false} withTopPadding={route.id === "learn"} categories={[items[0].category]} /></SanHubSectionReveal>}
      <SanHubSectionReveal><RouteNextStep route={route} /></SanHubSectionReveal>
    </PublicPage>
  );
}
