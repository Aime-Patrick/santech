import { PublicPage } from "@/components/public-page";
import { SanHubCourseCatalog } from "@/components/san-hub/san-hub-course-catalog";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { fetchSanHubCatalogItems } from "@/lib/strapi";
import { sanHubCatalogItems, type SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "SAN HUB Courses",
    description: "Build practical technology skills through SAN HUB courses and project-based learning.",
    path: "/san-hub/courses",
  });
}

export default async function SanHubCoursesPage() {
  const cmsItems = await fetchSanHubCatalogItems("Courses", { fresh: true });

  const courseItems: readonly SanHubCatalogItem[] = cmsItems.length > 0
    ? cmsItems.map((i) => ({
        id: i.itemId,
        category: "Courses" as const,
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
    : sanHubCatalogItems.filter((item) => item.category === "Courses");

  return (
    <PublicPage>
      <SanHubSectionMenu activeSection="courses" />
      <SanHubCourseCatalog items={courseItems} />
    </PublicPage>
  );
}
