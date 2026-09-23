"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, CalendarDays, Check, Clock3, FlaskConical, GraduationCap, Lightbulb, MapPin, Rocket, Sparkles, Users } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const hubTracks = [
  { label: "Learn", title: "Courses", description: "Practical courses, bootcamps, workshops, and labs for people building useful technology.", meta: "6 learning pathways", icon: BookOpen, href: "/san-hub/courses", tone: "bg-white text-slate-950", iconTone: "bg-brand-secondary text-white" },
  { label: "Join us next", title: "Upcoming training", description: "See the next training cohorts, their delivery format, and the skills each one is designed to unlock.", meta: "Next cohort · 14 Oct 2026", icon: CalendarDays, href: "/connect?topic=upcoming-training", tone: "bg-slate-900 text-white", iconTone: "bg-white text-brand-secondary" },
  { label: "Make it real", title: "Innovation programs", description: "Turn a difficult question into a tested idea through research, prototyping, and partnership.", meta: "Labs · challenges · pilots", icon: FlaskConical, href: "/innovation-lab", tone: "bg-brand-secondary text-white", iconTone: "bg-white text-brand-secondary" },
  { label: "Get experience", title: "Apprenticeships / Internships", description: "Learn inside real delivery teams with guided work, mentorship, and a clear path to contribution.", meta: "Applications open by placement", icon: BriefcaseBusiness, href: "/join-the-community?role=Intern", tone: "bg-slate-100 text-slate-950", iconTone: "bg-slate-950 text-white" },
  { label: "Keep growing", title: "Upskilling programs", description: "Focused learning for teams and professionals who need to apply new skills immediately at work.", meta: "For teams · professionals · institutions", icon: GraduationCap, href: "/connect?topic=upskilling", tone: "bg-white text-slate-950", iconTone: "bg-brand-secondary text-white" },
  { label: "Meet the ecosystem", title: "Events", description: "Join conversations, demonstrations, showcases, and community moments around technology and impact.", meta: "Talks · demos · showcases", icon: Users, href: "/tech-pulse", tone: "bg-slate-900 text-white", iconTone: "bg-brand-secondary text-white" },
];

const upcoming = [
  { type: "Training", title: "Build with AI: practical problem solving", date: "14 Oct 2026", detail: "6-week evening cohort", icon: Sparkles },
  { type: "Workshop", title: "Designing a useful digital product", date: "03 Nov 2026", detail: "One-day product workshop", icon: Lightbulb },
  { type: "Event", title: "SAN TECH Innovation Open Day", date: "21 Nov 2026", detail: "Showcase, demos, and community connections", icon: Rocket },
];

const paths = ["Trainee", "Intern", "Researcher", "Mentor", "Trainer", "Volunteer", "Partner", "Community member"];

export function SanHubEcosystem() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = scope.current;
    if (!root) return;

    const pinSection = root.querySelector<HTMLElement>("[data-hub-pin-section]");
    const listItems = gsap.utils.toArray<HTMLElement>("[data-hub-label]", root);
    const slides = gsap.utils.toArray<HTMLElement>("[data-hub-slide]", root);
    const fill = root.querySelector<HTMLElement>("[data-hub-fill]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!pinSection || !fill || listItems.length === 0 || slides.length === 0) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 1024px)", () => {
      const activeColor = "#0B0E87";
      const inactiveColor = "rgba(15,23,42,0.45)";
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          start: "top top+=128",
          end: `+=${listItems.length * 50}%`,
          pin: true,
          scrub: true,
        },
      });

      gsap.set(fill, { scaleY: 1 / listItems.length, transformOrigin: "top left" });
      gsap.set(slides, { autoAlpha: 0 });

      if (reduceMotion) {
        gsap.set(listItems, { color: inactiveColor });
        gsap.set(listItems[0], { color: activeColor });
        gsap.set(slides[0], { autoAlpha: 1 });
        return () => timeline.kill();
      }

      listItems.forEach((item, index) => {
        const previousItem = listItems[index - 1];
        if (previousItem) {
          timeline
            .set(item, { color: activeColor }, 0.5 * index)
            .to(slides[index], { autoAlpha: 1, duration: 0.2 }, "<")
            .set(previousItem, { color: inactiveColor }, "<")
            .to(slides[index - 1], { autoAlpha: 0, duration: 0.2 }, "<");
        } else {
          gsap.set(item, { color: activeColor });
          gsap.set(slides[index], { autoAlpha: 1 });
        }
      });

      timeline.to(fill, { scaleY: 1, transformOrigin: "top left", ease: "none", duration: timeline.duration() }, 0).to({}, { duration: 0.25 });
      return () => timeline.kill();
    });

    media.add("(max-width: 1023px)", () => {
      gsap.set(slides, { autoAlpha: 1 });
      return undefined;
    });

    return () => media.revert();
  }, { scope });

  return (
    <div ref={scope}>
      <section data-hub-pin-section className="bg-slate-50 px-6 py-10 text-slate-950 sm:px-10 lg:flex lg:min-h-[calc(100vh-128px)] lg:items-start lg:px-16 lg:pb-8 lg:pt-20">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-8 text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary lg:mb-7">The SAN HUB ecosystem</p>

          <div className="grid gap-8 lg:grid-cols-[minmax(150px,0.36fr)_1fr] lg:items-stretch">
            <div className="relative lg:flex lg:min-h-[520px] lg:items-center">
              <span className="absolute bottom-0 left-0 top-0 hidden w-px bg-slate-300 lg:block" aria-hidden="true"><span data-hub-fill className="block h-full w-full origin-top bg-brand-secondary" /></span>
              <div className="w-full">
                <ul className="grid gap-3 pl-0 lg:relative lg:grid-cols-1 lg:gap-5 lg:pl-7">
                {hubTracks.map((track) => <li key={track.title} data-hub-label className="text-base font-bold text-slate-400 transition-colors sm:text-lg">{track.title}</li>)}
                </ul>
              </div>
            </div>

            <div className="relative grid gap-3 lg:block lg:min-h-[520px] lg:max-w-[680px] lg:justify-self-end lg:w-full">
              {hubTracks.map((track, index) => {
                const Icon = track.icon;
                return <article key={track.title} data-hub-slide className={`relative flex min-h-[390px] flex-col justify-between rounded-xl p-7 shadow-[0_18px_45px_rgba(7,11,36,0.10)] sm:p-10 lg:absolute lg:inset-0 lg:min-h-0 lg:shadow-[0_26px_65px_rgba(7,11,36,0.14)] ${track.tone}`}>
                  <div className="flex items-start justify-between gap-6"><span className={`grid size-14 place-items-center rounded-xl ${track.iconTone}`}><Icon className="size-7" /></span><span className="text-sm font-black opacity-50">0{index + 1} / 06</span></div>
                  <div className="mt-14"><p className="text-xs font-bold uppercase tracking-[0.22em] opacity-55">{track.label}</p><h3 className="font-exo mt-3 max-w-2xl text-4xl font-black leading-[0.95] tracking-[-0.06em] sm:text-6xl">{track.title}</h3><p className="mt-5 max-w-xl text-base leading-7 opacity-70">{track.description}</p></div>
                  <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-current/15 pt-5"><span className="text-sm font-bold opacity-70">{track.meta}</span><Link href={track.href} className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-950">Explore this path <ArrowUpRight className="size-4" /></Link></div>
                </article>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 pb-20 text-white sm:px-10 lg:px-16 lg:pb-28"><div className="mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">What is happening next</p><h2 className="font-exo mt-4 max-w-xl text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-5xl">A calendar built around momentum.</h2><p className="mt-5 max-w-lg text-base leading-7 text-white/60">Training and events are the meeting points between learning, delivery, and the wider SAN TECH ecosystem.</p></div><div className="divide-y divide-white/15 border-y border-white/15">{upcoming.map((item) => { const Icon = item.icon; return <div key={item.title} className="grid gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"><span className="grid size-11 place-items-center rounded-xl bg-brand-secondary text-white"><Icon className="size-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary">{item.type}</p><h3 className="font-exo mt-1 text-xl font-black tracking-[-0.03em] text-white">{item.title}</h3><p className="mt-1 text-sm text-white/55">{item.detail}</p></div><div className="flex items-center gap-2 text-sm font-bold text-white/70 sm:text-right"><Clock3 className="size-4 text-brand-secondary" />{item.date}</div></div>; })}</div></div></section>

      <section className="bg-slate-950 px-6 pb-20 text-white sm:px-10 lg:px-16 lg:pb-28"><div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-16 lg:grid-cols-[1fr_0.8fr] lg:items-start"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">Find your path</p><h2 className="font-exo mt-4 max-w-xl text-4xl font-black leading-[0.94] tracking-[-0.06em] sm:text-5xl">There is a place for your contribution.</h2><p className="mt-5 max-w-lg text-base leading-7 text-white/60">Choose the role that best describes how you want to learn, help, research, mentor, or partner with the ecosystem.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{paths.map((path) => <div key={path} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] p-4 text-sm font-semibold text-white/80"><span className="grid size-7 place-items-center rounded-xl bg-brand-secondary text-white"><Check className="size-3.5" /></span>{path}</div>)}</div></div><div className="rounded-xl bg-brand-secondary p-8 text-white sm:p-10"><MapPin className="size-8" /><p className="mt-12 text-xs font-bold uppercase tracking-[0.2em] text-white/65">Beyond a course</p><h3 className="font-exo mt-3 text-3xl font-black leading-tight tracking-[-0.05em]">Build the skill. Meet the people. Put it to work.</h3><p className="mt-4 text-sm leading-6 text-white/75">SAN HUB connects learning to real projects, community support, and opportunities to contribute.</p><Link href="/join-the-community" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-secondary transition-colors hover:bg-slate-100">Choose your path <ArrowUpRight className="size-4" /></Link></div></div></section>
    </div>
  );
}
