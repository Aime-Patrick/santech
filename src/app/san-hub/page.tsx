import { PublicPage } from "@/components/public-page";
import { SanHubCatalog } from "@/components/san-hub-catalog";
import { SanHubAboutSection } from "@/components/san-hub/san-hub-about-section";
import { SanHubFeaturedRail } from "@/components/san-hub/san-hub-featured-rail";
import { SanHubGuide } from "@/components/san-hub/san-hub-guide";
import { SanHubDigitalLibrary } from "@/components/san-hub/san-hub-digital-library";
import { SanHubImpactSection } from "@/components/san-hub/san-hub-impact-section";
import { SanHubSectionMenu, type SanHubSectionId } from "@/components/san-hub/san-hub-section-menu";
import { SanHubSectionReveal } from "@/components/san-hub/san-hub-section-reveal";
import { SanHubTractionSection } from "@/components/san-hub/san-hub-traction-section";
import { SanHubTestimonialSection } from "@/components/san-hub/san-hub-testimonial-section";
import { sanHubCatalogItems, sanHubProgramItems } from "@/lib/san-hub-catalog-data";

const courseItems = sanHubCatalogItems.filter((item) => item.category === "Courses");

function resolveSection(value: string | undefined): SanHubSectionId {
  return value === "explore" || value === "impact" || value === "programs" || value === "traction" || value === "insights" || value === "library" || value === "testimonials" ? value : "about";
}

export default async function SanHubPage({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const params = await searchParams;
  const section = resolveSection(params.section);

  return (
    <PublicPage>
      <SanHubSectionMenu activeSection={section} />

      {section === "about" && <SanHubSectionReveal><SanHubAboutSection /></SanHubSectionReveal>}

      {section === "explore" && <>
        <SanHubSectionReveal><SanHubFeaturedRail items={courseItems} eyebrow="SAN HUB / Courses" title="Build skills for useful work." description="Choose a course, build something real, and apply for the pathway that fits your next move." /></SanHubSectionReveal>
        <SanHubSectionReveal><SanHubCatalog items={courseItems} /></SanHubSectionReveal>
      </>}

      {section === "impact" && <SanHubSectionReveal><SanHubImpactSection /></SanHubSectionReveal>}

      {section === "programs" && <SanHubSectionReveal><SanHubCatalog items={sanHubProgramItems} showFilters={false} categories={["Programs"]} /></SanHubSectionReveal>}

      {section === "traction" && <SanHubSectionReveal><SanHubTractionSection /></SanHubSectionReveal>}

      {section === "insights" && <SanHubSectionReveal><SanHubGuide title="See what you can make possible." description="Explore focused routes through learning, innovation, and opportunity at SAN HUB." placeholder="Try: I want to build something useful" /></SanHubSectionReveal>}

      {section === "library" && <SanHubSectionReveal><SanHubDigitalLibrary /></SanHubSectionReveal>}
      {section === "testimonials" && <SanHubSectionReveal><SanHubTestimonialSection /></SanHubSectionReveal>}
    </PublicPage>
  );
}
