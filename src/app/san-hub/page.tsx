import { PublicPage } from "@/components/public-page";
import { SanHubCatalog } from "@/components/san-hub-catalog";
import { SanHubAboutSection } from "@/components/san-hub/san-hub-about-section";
import { SanHubDigitalLibrary, type LibraryBook } from "@/components/san-hub/san-hub-digital-library";
import { SanHubExploreSection } from "@/components/san-hub/san-hub-explore-section";
import { SanHubImpactSection } from "@/components/san-hub/san-hub-impact-section";
import { SanHubInsightsSection } from "@/components/san-hub/san-hub-insights-section";
import { SanHubSectionMenu, type SanHubSectionId } from "@/components/san-hub/san-hub-section-menu";
import { SanHubSectionReveal } from "@/components/san-hub/san-hub-section-reveal";
import { SanHubTractionSection } from "@/components/san-hub/san-hub-traction-section";
import { SanHubTestimonialSection } from "@/components/san-hub/san-hub-testimonial-section";
import { fetchSanHubCatalogItems, fetchSanHubBooks, fetchTestimonials } from "@/lib/strapi";
import { sanHubProgramItems } from "@/lib/san-hub-catalog-data";
import type { SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "SAN HUB",
    description: "Learn, build, connect, and explore practical pathways through the SAN TECH ecosystem.",
    path: "/san-hub",
  });
}

function resolveSection(value: string | undefined): SanHubSectionId {
  return value === "explore" || value === "impact" || value === "programs" || value === "traction" || value === "insights" || value === "library" || value === "testimonials" ? value : "about";
}

export default async function SanHubPage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const params = await searchParams;
  const section = resolveSection(params.section);

  // Fetch from Strapi; fall back to hardcoded program items if empty
  const [cmsItems, cmsBooks, cmsTestimonials] = await Promise.all([
    fetchSanHubCatalogItems(),
    fetchSanHubBooks(),
    fetchTestimonials("san-hub"),
  ]);
  const catalogItems: readonly SanHubCatalogItem[] = cmsItems.length > 0
    ? cmsItems.map((i) => ({
        id: i.itemId,
        category: i.category as SanHubCatalogItem["category"],
        focus: i.focus as SanHubCatalogItem["focus"] | undefined,
        title: i.title,
        provider: i.provider ?? "",
        description: i.description,
        image: i.image,
        format: i.format ?? "",
        duration: i.duration ?? "",
        level: i.level ?? "",
        badge: i.badge ?? undefined,
        href: i.href ?? "#",
      }))
    : sanHubProgramItems;

  const programItems = catalogItems.filter((i) => i.category === "Programs");
  const libraryBooks: readonly LibraryBook[] = cmsBooks.map((book, index) => ({
    id: book.bookId,
    title: book.title,
    coverTitle: book.coverTitle ?? book.title,
    coverSubtitle: book.coverSubtitle ?? "Useful technology\nstronger systems",
    coverImage: book.coverImage || undefined,
    description: book.description,
    category: book.category,
    pages: book.pageLabel ?? String(index + 1).padStart(2, "0"),
    accent: book.accent ?? "#0a1f44",
    coverInk: book.coverInk ?? "#e8fbff",
    readerUrl: book.readerUrl,
  }));

  return (
    <PublicPage>
      <SanHubSectionMenu activeSection={section} />

      {section === "about" && <SanHubSectionReveal><SanHubAboutSection items={catalogItems} /></SanHubSectionReveal>}

      {section === "explore" && <SanHubSectionReveal><SanHubExploreSection /></SanHubSectionReveal>}

      {section === "impact" && <SanHubSectionReveal><SanHubImpactSection /></SanHubSectionReveal>}

      {section === "programs" && <SanHubSectionReveal><SanHubCatalog compact items={programItems.length > 0 ? programItems : sanHubProgramItems} showFilters={false} showCategoryFilter={false} showResultSummary={false} withTopPadding categories={["Programs"]} /></SanHubSectionReveal>}

      {section === "traction" && <SanHubSectionReveal><SanHubTractionSection /></SanHubSectionReveal>}

      {section === "insights" && <SanHubSectionReveal><SanHubInsightsSection /></SanHubSectionReveal>}

      {section === "library" && <SanHubSectionReveal><SanHubDigitalLibrary books={libraryBooks.length > 0 ? libraryBooks : undefined} /></SanHubSectionReveal>}
      {section === "testimonials" && <SanHubSectionReveal><SanHubTestimonialSection items={cmsTestimonials} /></SanHubSectionReveal>}
    </PublicPage>
  );
}
