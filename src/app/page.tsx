import { SantechHomeStage } from "@/components/santech-home-stage";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-[#edf1f7] pt-[112px] text-slate-900 xl:h-svh xl:overflow-hidden">
      <SiteHeader landing />
      <SantechHomeStage />
    </main>
  );
}
