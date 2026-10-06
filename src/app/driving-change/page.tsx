import { PublicPage } from "@/components/public-page";
import { StickyPageMenu } from "@/components/sticky-page-menu";
import { DrivingChangeSliderBrowser } from "@/components/driving-change-slider-browser";

const changeMenu = [
  { key: "impact", label: "Impact in action", href: "/driving-change?type=impact" },
  { key: "career", label: "Career outreach", href: "/driving-change?type=career" },
] as const;

export default async function DrivingChangePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; view?: string }>;
}) {
  const params = await searchParams;
  const rawKey = params.type || params.view || "impact";
  const activeSection: "impact" | "career" = rawKey === "career" ? "career" : "impact";

  return (
    <PublicPage>
      <StickyPageMenu
        items={changeMenu}
        activeKey={activeSection}
        ariaLabel="Driving Change sections"
      />
      <section className="border-t border-slate-200 px-3 pb-8 pt-2 sm:px-8 lg:px-12 lg:pb-10 lg:pt-3">
        <div className="mx-auto max-w-[1600px] border border-slate-200 bg-white p-4 sm:p-6 lg:p-7 shadow-xs">
          <DrivingChangeSliderBrowser key={activeSection} sectionKey={activeSection} />
        </div>
      </section>
    </PublicPage>
  );
}
