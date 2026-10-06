import { PublicPage } from "@/components/public-page";
import { SanHubCourseCatalog } from "@/components/san-hub/san-hub-course-catalog";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { sanHubCatalogItems } from "@/lib/san-hub-catalog-data";

const courseItems = sanHubCatalogItems.filter((item) => item.category === "Courses");

export default function SanHubCoursesPage() {
  return (
    <PublicPage>
      <SanHubSectionMenu activeSection="courses" />
      <SanHubCourseCatalog items={courseItems} />
    </PublicPage>
  );
}
