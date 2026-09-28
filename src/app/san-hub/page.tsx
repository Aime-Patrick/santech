import { PublicPage } from "@/components/public-page";
import { SanHubCatalog } from "@/components/san-hub-catalog";
import { SanHubHeroCarousel } from "@/components/san-hub-hero-carousel";

export default function SanHubPage() {
  return (
    <PublicPage>
      <SanHubHeroCarousel />
      <SanHubCatalog />
    </PublicPage>
  );
}
