import { notFound } from "next/navigation";
import { getSanHubCourse, SanHubCourseDetail } from "@/components/san-hub-course-detail";

export function generateStaticParams() {
  return ["full-stack-software-engineering", "applied-ai-machine-learning", "cybersecurity-defense"].map((courseId) => ({ courseId }));
}

export default async function SanHubCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = getSanHubCourse(courseId);
  if (!course) notFound();
  return <SanHubCourseDetail course={course} />;
}
