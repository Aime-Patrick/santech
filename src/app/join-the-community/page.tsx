import { PublicPage } from "@/components/public-page";
import { JoinCommunityPage } from "@/components/join-community-page";

export default async function JoinTheCommunityRoute({ searchParams }: { searchParams: Promise<{ course?: string; path?: string; role?: string }> }) {
  const { course, path, role } = await searchParams;
  const initialPath = path === "training" || path === "internship" || path === "community" || path === "innovation"
    ? path
    : role?.toLowerCase().includes("intern")
      ? "internship"
      : course
        ? "training"
        : "community";

  return (
    <PublicPage>
      <JoinCommunityPage initialPath={initialPath} course={course ?? ""} openInitially={Boolean(course || path || role)} />
    </PublicPage>
  );
}
