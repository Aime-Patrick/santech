import { PublicPage } from "@/components/public-page";
import { InnovationSectionBrowser, type InnovationSection } from "@/components/innovation-section-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";
import { TechnologySectionBrowser } from "@/components/technology-section-browser";
import {
  fetchInnovationProducts,
  fetchInnovationServices,
  fetchInnovationSolutions,
  fetchTechnologyCategories,
} from "@/lib/strapi";
import {
  innovationItems,
  type InnovationItem,
} from "@/lib/innovation-data";
import { technologyCategories, type TechnologyCategory } from "@/lib/technology-data";

export type ExploreSection = InnovationSection | "technologies" | "programming-languages";

const sectionMenu = [
  { key: "product", label: "Product", href: "/innovation-lab" },
  { key: "services", label: "Services", href: "/innovation-lab/services" },
  { key: "solutions", label: "Solutions", href: "/innovation-lab/solutions" },
  { key: "technologies", label: "Technologies", href: "/innovation-lab/technologies" },
  { key: "programming-languages", label: "Programming languages", href: "/innovation-lab/programming-languages" },
];

/** Map a CMS innovation item to the local InnovationItem shape */
function mapCmsInnovationItem(
  item: Awaited<ReturnType<typeof fetchInnovationProducts>>[number]
): InnovationItem {
  return {
    id: item.productId,
    label: item.label,
    title: item.title,
    description: item.description,
    coreFeatures: (item.coreFeatures ?? []).map((f) => ({
      label: f.label,
      description: f.description,
      // icon stays as a code-side fallback — not stored in CMS
      icon: require("lucide-react").BarChart3,
    })),
    media: {
      kind: item.mediaKind,
      src: item.mediaImage || "/images/team.jpg",
      images: item.mediaImages.length > 0 ? item.mediaImages : undefined,
      alt: item.mediaAlt,
    },
  };
}

function mapCmsServiceItem(
  item: Awaited<ReturnType<typeof fetchInnovationServices>>[number]
): InnovationItem {
  return {
    id: item.serviceId,
    label: item.label,
    title: item.label,
    description: item.description,
    coreFeatures: [
      { label: "Main services", description: item.description, icon: require("lucide-react").Code2 },
      { label: "Delivery model", description: "Move from discovery and requirements through design, development, deployment, training, and support.", icon: require("lucide-react").Code2 },
      { label: "Built for growth", description: "Create technology that fits real operational needs and can grow with the organization.", icon: require("lucide-react").Workflow },
    ],
    media: { kind: "image", src: "/images/team.jpg", alt: `SAN TECH ${item.label} team` },
  };
}

function mapCmsSolutionItem(
  item: Awaited<ReturnType<typeof fetchInnovationSolutions>>[number]
): InnovationItem {
  return {
    id: item.solutionId,
    label: item.label,
    title: item.label,
    description: item.description,
    subItems: item.subItems,
    coreFeatures: [],
    media: { kind: "image", src: "/images/summit.jpg", alt: `SAN TECH ${item.label} solution` },
  };
}

function mapCmsTechCategory(
  item: Awaited<ReturnType<typeof fetchTechnologyCategories>>[number]
): TechnologyCategory {
  // Find the matching hardcoded category to preserve the LucideIcon
  const hardcoded = technologyCategories.find((c) => c.id === item.categoryId);
  return {
    id: item.categoryId,
    label: item.label,
    description: item.description,
    items: item.items,
    icon: hardcoded?.icon ?? require("lucide-react").Code2,
  };
}

export default async function InnovationLabPage({ section }: { section: ExploreSection }) {
  // Fetch all innovation data in parallel
  const [cmsProducts, cmsServices, cmsSolutions, cmsTechCategories] = await Promise.all([
    fetchInnovationProducts(),
    fetchInnovationServices(),
    fetchInnovationSolutions(),
    fetchTechnologyCategories(),
  ]);

  // Map CMS → InnovationItem shape, fall back to hardcoded if empty
  const products: readonly InnovationItem[] =
    cmsProducts.length > 0 ? cmsProducts.map(mapCmsInnovationItem) : innovationItems.product;
  const services: readonly InnovationItem[] =
    cmsServices.length > 0 ? cmsServices.map(mapCmsServiceItem) : innovationItems.services;
  const solutions: readonly InnovationItem[] =
    cmsSolutions.length > 0 ? cmsSolutions.map(mapCmsSolutionItem) : innovationItems.solutions;
  const techCategories: readonly TechnologyCategory[] =
    cmsTechCategories.length > 0 ? cmsTechCategories.map(mapCmsTechCategory) : technologyCategories;

  // Pick the right items for the current section
  const sectionItems: Record<InnovationSection, readonly InnovationItem[]> = {
    product: products,
    services: services,
    solutions: solutions,
  };

  return (
    <PublicPage>
      <StickyPageMenu items={sectionMenu} activeKey={section} ariaLabel="Explore Solutions sections" />
      <section className="border-t border-slate-200 px-6 pb-10 pt-2 sm:px-10 lg:px-16 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {section === "technologies" ? (
            <TechnologySectionBrowser cmsCategories={techCategories} />
          ) : section === "programming-languages" ? (
            <TechnologySectionBrowser mode="programming-languages" cmsCategories={techCategories} />
          ) : (
            <InnovationSectionBrowser section={section} cmsItems={sectionItems[section]} />
          )}
        </div>
      </section>
    </PublicPage>
  );
}
