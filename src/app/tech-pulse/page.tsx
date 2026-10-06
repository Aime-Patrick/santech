import { PublicPage } from "@/components/public-page";
import { StickyPageMenu } from "@/components/sticky-page-menu";
import { TechPulseSliderBrowser } from "@/components/tech-pulse-slider-browser";
import { TechPulseOpportunities } from "@/components/tech-pulse-opportunities";

const pulseMenu = [
  { key: "news", label: "News", href: "/tech-pulse" },
  { key: "trends", label: "Trends", href: "/tech-pulse?type=trends" },
  { key: "announcements", label: "Announcements", href: "/tech-pulse?type=announcements" },
  { key: "opportunities", label: "Opportunities", href: "/tech-pulse?type=opportunities" },
  { key: "research", label: "Research & impact", href: "/tech-pulse?type=research" },
] as const;

export default async function TechPulsePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const isOpportunities = params.type === "opportunities";
  const activeMenu = params.type || "news";
  const initialCategory =
    params.type === "research"
      ? "impact"
      : params.type || "news";

  return (
    <PublicPage>
      <StickyPageMenu items={pulseMenu} activeKey={activeMenu} ariaLabel="Tech Pulse sections" />
      <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
        <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-xs">
          {isOpportunities ? (
            <TechPulseOpportunities />
          ) : (
            <TechPulseSliderBrowser key={initialCategory} initialCategory={initialCategory} />
          )}
        </div>
      </section>
    </PublicPage>
  );
}
