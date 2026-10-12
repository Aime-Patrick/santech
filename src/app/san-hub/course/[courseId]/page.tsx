import { notFound } from "next/navigation";
import { getSanHubCourse, getSanHubCourseFromCms, SanHubCourseDetail } from "@/components/san-hub-course-detail";
import { fetchSanHubCatalogItems } from "@/lib/strapi";
import { createPageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const cmsItems = await fetchSanHubCatalogItems("Courses");
  const courseIds = new Set([
    "full-stack-software-engineering",
    "applied-ai-machine-learning",
    "cybersecurity-defense",
    ...cmsItems.map((item) => item.itemId),
  ]);
  return [...courseIds].map((courseId) => ({ courseId }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const cmsItems = await fetchSanHubCatalogItems("Courses");
  const cmsItem = cmsItems.find((item) => item.itemId === courseId);
  const course = cmsItem ? getSanHubCourseFromCms(cmsItem) : getSanHubCourse(courseId);

  return createPageMetadata({
    title: course?.title || "SAN HUB course",
    description: course?.description || "Build practical technology skills through SAN HUB learning pathways.",
    path: `/san-hub/course/${courseId}`,
    image: course?.image,
  });
}

export default async function SanHubCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const cmsItems = await fetchSanHubCatalogItems("Courses");
  const cmsItem = cmsItems.find((item) => item.itemId === courseId);
  const course = cmsItem ? getSanHubCourseFromCms(cmsItem) : getSanHubCourse(courseId);
  if (!course) notFound();
  return <SanHubCourseDetail course={course} />;
}
