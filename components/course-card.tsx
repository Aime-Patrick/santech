import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Course = {
  title: string;
  category: string;
  format: string;
  duration: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

export function CourseCard({ course, index }: { course: Course; index: number }) {
  const Icon = course.icon;

  return (
    <article className="group flex min-h-[430px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-secondary/30 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
      <div className="relative h-36 overflow-visible bg-slate-950 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(135deg, rgba(7, 11, 36, 0.72), rgba(11, 14, 135, 0.26)), url(${course.image})` }}>
        <div className="absolute inset-0 overflow-hidden bg-brand-secondary/5 transition-colors duration-300 group-hover:bg-transparent" />
        <span className="absolute right-5 top-5 rounded-xl border border-white/30 bg-slate-950/35 px-3 py-1 text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">{course.category}</span>
        <div className="absolute -bottom-7 left-5 z-10 grid size-14 place-items-center rounded-xl bg-brand-secondary text-white shadow-[0_10px_24px_rgba(11,14,135,0.3)] transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-7" strokeWidth={1.6} aria-hidden="true" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-12">
        <span className="text-sm font-black tracking-[0.16em] text-brand-secondary/55">0{index + 1}</span>
        <h2 className="font-exo text-2xl font-black leading-tight tracking-[-0.04em] text-slate-950">{course.title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">{course.description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-slate-500">
          <span>{course.format}</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4" />{course.duration}</span>
        </div>
        <Link href={`/join-the-community?course=${encodeURIComponent(course.title)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-secondary transition-colors hover:text-[#1519ad]">Learn More <ArrowUpRight className="size-4" /></Link>
      </div>
    </article>
  );
}
