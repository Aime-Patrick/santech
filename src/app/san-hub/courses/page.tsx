import { PublicPage } from "@/components/public-page";
import { SanHubLearnExperience } from "@/components/san-hub/san-hub-learn-experience";
import { SanHubSectionMenu } from "@/components/san-hub/san-hub-section-menu";
import { SanHubSectionReveal } from "@/components/san-hub/san-hub-section-reveal";
import { sanHubCatalogItems } from "@/lib/san-hub-catalog-data";

const courseItems = sanHubCatalogItems.filter((item) => item.category === "Courses");
const newLearningItems = sanHubCatalogItems.filter((item) => item.category === "Upcoming training").slice(0, 3);
const aiLearningItems = sanHubCatalogItems.filter((item) => ["applied-ai-machine-learning", "build-with-ai", "ai-literacy-for-work"].includes(item.id));

export default function SanHubCoursesPage() {
  return (
    <PublicPage>
      <SanHubSectionMenu activeSection="courses" />
      <SanHubSectionReveal>
        <SanHubLearnExperience
          popularItems={courseItems}
          newItems={newLearningItems}
          aiItems={aiLearningItems}
          searchItems={sanHubCatalogItems}
        />
      </SanHubSectionReveal>
    </PublicPage>
  );
}
