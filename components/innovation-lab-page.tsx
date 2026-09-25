import { PublicPage } from "@/components/public-page";
import { InnovationSectionBrowser, type InnovationSection } from "@/components/innovation-section-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";

const sectionMenu = [
  { key: "product", label: "Product", href: "/innovation-lab" },
  { key: "services", label: "Services", href: "/innovation-lab/services" },
  { key: "solutions", label: "Solution & technologies", href: "/innovation-lab/solutions" },
];

export default function InnovationLabPage({ section }: { section: InnovationSection }) {
  return (
    <PublicPage>
      <StickyPageMenu items={sectionMenu} activeKey={section} ariaLabel="Explore Solutions sections" />
      <section className="border-t border-slate-200 px-6 pb-10 pt-2 sm:px-10 lg:px-16 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-7xl">
          <InnovationSectionBrowser section={section} />
        </div>
      </section>
    </PublicPage>
  );
}
