import { PublicPage } from "@/components/public-page";
import { InnovationSectionBrowser, type InnovationSection } from "@/components/innovation-section-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";
import { TechnologySectionBrowser } from "@/components/technology-section-browser";

export type ExploreSection = InnovationSection | "technologies" | "programming-languages";

const sectionMenu = [
  { key: "product", label: "Product", href: "/innovation-lab" },
  { key: "services", label: "Services", href: "/innovation-lab/services" },
  { key: "solutions", label: "Solutions", href: "/innovation-lab/solutions" },
  { key: "technologies", label: "Technologies", href: "/innovation-lab/technologies" },
  { key: "programming-languages", label: "Programming languages", href: "/innovation-lab/programming-languages" },
];

export default function InnovationLabPage({ section }: { section: ExploreSection }) {
  return (
    <PublicPage>
      <StickyPageMenu items={sectionMenu} activeKey={section} ariaLabel="Explore Solutions sections" />
      <section className="border-t border-slate-200 px-6 pb-10 pt-2 sm:px-10 lg:px-16 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-7xl bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {section === "technologies" ? <TechnologySectionBrowser /> : section === "programming-languages" ? <TechnologySectionBrowser mode="programming-languages" /> : <InnovationSectionBrowser section={section} />}
        </div>
      </section>
    </PublicPage>
  );
}
