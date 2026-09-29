import { SantechHomeStage } from "@/components/santech-home-stage";
import { SiteHeader } from "@/components/site-header";
import { CircuitBackground } from "@/components/ui/circuit-background";

export default function HomePage() {
  return (
    <CircuitBackground as="main" className="min-h-svh overflow-x-hidden pt-[112px] text-slate-900 xl:h-svh xl:overflow-hidden">
      <SiteHeader landing />
      <SantechHomeStage />
    </CircuitBackground>
  );
}
