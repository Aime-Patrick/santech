import { PublicPage } from "@/components/public-page";
import { SanHubCourseCatalog } from "@/components/san-hub/san-hub-course-catalog";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { fetchSanHubCatalogItems, fetchSanHubCourseCategories } from "@/lib/strapi";
import { getSanHubCatalogHref, sanHubCatalogItems, sanHubCourseCategories, type SanHubCatalogItem } from "@/lib/san-hub-catalog-data";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "SAN HUB Courses",
    description: "Build practical technology skills through SAN HUB courses and project-based learning.",
    path: "/san-hub/courses",
  });
}

export default async function SanHubCoursesPage() {
  const [cmsItems, cmsCategories] = await Promise.all([
    fetchSanHubCatalogItems("Courses", { fresh: true }),
    fetchSanHubCourseCategories(),
  ]);

  const courseItems: readonly SanHubCatalogItem[] = cmsItems.length > 0
    ? cmsItems.map((i) => ({
        id: i.itemId,
        category: "Courses" as const,
        courseCategory: i.courseCategory?.name as SanHubCatalogItem["courseCategory"] | undefined,
        title: i.title,
        provider: i.provider ?? "",
        description: i.description,
        image: i.image,
        format: i.format ?? "",
        duration: i.duration ?? "",
        level: i.level ?? "",
        badge: i.badge ?? undefined,
        href: getSanHubCatalogHref({ id: i.itemId, category: "Courses" }),
      }))
    : sanHubCatalogItems.filter((item) => item.category === "Courses");

  return (
    <PublicPage>
      <SanHubSectionMenu activeSection="courses" />
      <SanHubCourseCatalog items={courseItems} categories={cmsCategories.length > 0 ? cmsCategories.map((item) => item.name) : sanHubCourseCategories} />
    </PublicPage>
  );
}
