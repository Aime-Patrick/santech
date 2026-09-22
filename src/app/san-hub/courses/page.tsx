import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { PageIntro, Pill, PublicPage, SectionHeading } from "@/components/public-page";

const courses = [
  { title: "Digital product foundations", category: "Product", format: "Workshop", duration: "4 weeks" },
  { title: "Software development pathways", category: "Technology", format: "Cohort", duration: "12 weeks" },
  { title: "AI for practical problem solving", category: "AI", format: "Bootcamp", duration: "6 weeks" },
  { title: "IoT and embedded systems", category: "Innovation", format: "Lab", duration: "8 weeks" },
  { title: "Cybersecurity essentials", category: "Security", format: "Cohort", duration: "8 weeks" },
  { title: "Entrepreneurship and innovation", category: "Enterprise", format: "Seminar", duration: "3 weeks" },
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
            {courses.map((course, index) => (
              <article key={course.title} className="flex min-h-72 flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-brand-secondary">0{index + 1}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{course.category}</span>
                </div>
                <h2 className="mt-12 text-2xl font-black leading-tight tracking-[-0.04em] text-slate-950">{course.title}</h2>
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-semibold text-slate-500">
                  <span>{course.format}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" />{course.duration}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionHeading dark eyebrow="Ready when you are" title="Your next opportunity can start with one application." description="Course registration, beneficiary tracking, certification, and communications will connect through the SAN HUB platform." />
          <Link href="/join-the-community" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-secondary px-6 py-3.5 text-sm font-bold text-white hover:bg-[#1519ad]">Start your application <ArrowUpRight className="size-4" /></Link>
        </div>
      </section>
    </PublicPage>
  );
}
