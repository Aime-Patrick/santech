import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Lightbulb, PackageOpen, ShieldCheck } from "lucide-react";
import { PageIntro, Pill, PublicPage, SectionHeading } from "@/components/public-page";
import { CourseCard, type Course } from "@/components/course-card";

const courses: Course[] = [
  { title: "Digital product foundations", category: "Product", format: "Workshop", duration: "4 weeks", description: "Learn how useful digital products move from a real problem to a tested first release.", icon: PackageOpen, image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=85" },
  { title: "Software development pathways", category: "Technology", format: "Cohort", duration: "12 weeks", description: "Build the practical foundations for creating reliable web, mobile, and platform experiences.", icon: Code2, image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85" },
  { title: "AI for practical problem solving", category: "AI", format: "Bootcamp", duration: "6 weeks", description: "Use AI responsibly to understand problems, improve decisions, and make everyday work clearer.", icon: BrainCircuit, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85" },
  { title: "IoT and embedded systems", category: "Innovation", format: "Lab", duration: "8 weeks", description: "Connect sensors, devices, and data to build systems that respond to the real world.", icon: Cpu, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85" },
  { title: "Cybersecurity essentials", category: "Security", format: "Cohort", duration: "8 weeks", description: "Develop the habits and tools needed to protect systems, information, and people.", icon: ShieldCheck, image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85" },
  { title: "Entrepreneurship and innovation", category: "Enterprise", format: "Seminar", duration: "3 weeks", description: "Turn promising ideas into focused opportunities through research, testing, and shared learning.", icon: Lightbulb, image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85" },
];

export default function CoursesPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="SAN HUB / Courses"
        title="Learn something. Build something."
        description="Explore practical courses, workshops, bootcamps, and labs designed for the next step in your journey."
        actions={[{ label: "Join SAN HUB", href: "/join-the-community" }, { label: "Ask about a course", href: "/connect", tone: "secondary" }]}
      />

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-6">
            <Pill>All courses</Pill>
            <Pill>Technology</Pill>
            <Pill>Innovation</Pill>
            <Pill>Enterprise</Pill>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => <CourseCard key={course.title} course={course} index={index} />)}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading dark eyebrow="Ready when you are" title="Your next opportunity can start with one application." description="Course registration, beneficiary tracking, certification, and communications will connect through the SAN HUB platform." />
          <Link href="/join-the-community" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary px-6 py-3.5 text-sm font-bold text-white hover:bg-[#1519ad]">Start your application <ArrowUpRight className="size-4" /></Link>
        </div>
      </section>
    </PublicPage>
  );
}
