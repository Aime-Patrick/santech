import { PublicPage } from "@/components/public-page";
import { JoinCommunityPage } from "@/components/join-community-page";
import { fetchTraineeAwards } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Join the SAN HUB Community",
    description: "Learn, contribute, find mentorship, and build the experience needed to create useful technology.",
    path: "/join-the-community",
  });
}

export default async function JoinTheCommunityRoute({ searchParams }: { searchParams: Promise<{ course?: string; path?: string; role?: string }> }) {
  const { course, path, role } = await searchParams;
  const initialPath = path === "training" || path === "internship" || path === "community" || path === "innovation"
    ? path
    : role?.toLowerCase().includes("intern")
      ? "internship"
      : course
        ? "training"
        : "community";
  const awards = await fetchTraineeAwards();

  return (
    <PublicPage>
      <JoinCommunityPage initialPath={initialPath} course={course ?? ""} openInitially={Boolean(course || path || role)} awards={awards} />
    </PublicPage>
  );
}
