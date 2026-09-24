"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, BriefcaseBusiness, CalendarDays, Clock3, FlaskConical, GraduationCap, Lightbulb, Rocket, Sparkles, Users } from "lucide-react";
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

const programs = [
  { title: "Technology Training", description: "Practical skills for building and supporting useful systems.", items: ["Software engineering", "AI", "Cybersecurity", "IoT", "Embedded systems", "Networking", "Robotics", "Digital literacy"] },
  { title: "Innovation Development", description: "Move promising ideas from a question to something people can use.", items: ["Ideation", "Prototyping", "Product development", "Research", "Pitching", "Commercialization"] },
  { title: "Career Development", description: "Create clearer routes from learning into meaningful technology work.", items: ["Apprenticeships", "Internships", "Mentorship", "Career guidance", "Industry exposure"] },
  { title: "Entrepreneurship", description: "Help founders and organizations test, grow, and digitize their work.", items: ["Startup development", "Business digitization", "Product-market validation", "Pitch preparation", "Partnerships"] },
];

const impactStats = [
  ["2,500+", "People empowered"],
  ["17+", "Countries reached"],
  ["300+", "Scholarships and international training opportunities"],
  ["54+", "Innovation / startup projects"],
  ["700+", "Jobs and career opportunities influenced"],
  ["39%", "Participants progressing into work, entrepreneurship, or related opportunities"],
] as const;

const paths = [
  ["Trainee", "Learn practical technology skills."],
  ["Intern", "Gain experience through real projects."],
  ["Researcher", "Collaborate on technology research."],
  ["Mentor", "Support emerging innovators."],
  ["Trainer", "Share technical knowledge."],
  ["Volunteer", "Contribute skills and community support."],
  ["Partner", "Create programs and opportunities with SAN TECH."],
  ["Community Member", "Connect with the wider technology ecosystem."],
] as const;

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
          start: "top top+=104",
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
      <section data-hub-pin-section className="bg-slate-50 px-6 py-10 text-slate-950 sm:px-10 lg:flex lg:h-[calc(100svh-104px)] lg:min-h-0 lg:items-center lg:overflow-hidden lg:px-16 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary lg:mb-5">The SAN HUB ecosystem</p>

          <div className="grid gap-6 lg:grid-cols-[minmax(170px,0.34fr)_minmax(0,560px)] lg:items-center lg:justify-between lg:gap-10">
            <div className="relative lg:flex lg:min-h-[350px] lg:items-center">
              <span className="absolute bottom-0 left-0 top-0 hidden w-px bg-slate-300 lg:block" aria-hidden="true"><span data-hub-fill className="block h-full w-full origin-top bg-brand-secondary" /></span>
              <div className="w-full">
                <ul className="grid gap-3 pl-0 lg:relative lg:grid-cols-1 lg:gap-4 lg:pl-7">
                {hubTracks.map((track) => <li key={track.title} data-hub-label className="text-sm font-bold text-slate-400 transition-colors sm:text-base">{track.title}</li>)}
                </ul>
              </div>
            </div>

            <div className="relative grid gap-3 lg:block lg:h-[350px] lg:max-w-[560px] lg:w-full lg:justify-self-end">
              {hubTracks.map((track, index) => {
                const Icon = track.icon;
                return <article key={track.title} data-hub-slide className={`relative flex min-h-[340px] flex-col justify-between rounded-xl p-6 shadow-[0_18px_45px_rgba(7,11,36,0.10)] sm:min-h-[380px] sm:p-7 lg:absolute lg:inset-0 lg:min-h-0 lg:shadow-[0_26px_65px_rgba(7,11,36,0.14)] ${track.tone}`}>
                  <div className="flex items-start justify-between gap-4"><span className={`grid size-12 place-items-center rounded-xl ${track.iconTone}`}><Icon className="size-6" /></span><span className="text-sm font-black opacity-50">0{index + 1} / 06</span></div>
                  <div className="mt-6"><p className="text-xs font-bold uppercase tracking-[0.22em] opacity-55">{track.label}</p><h3 className="font-exo mt-2 max-w-2xl text-2xl font-bold leading-[1] tracking-[-0.04em] sm:text-3xl">{track.title}</h3><p className="mt-3 max-w-xl text-sm leading-6 opacity-70">{track.description}</p></div>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-current/15 pt-4"><span className="text-xs font-bold opacity-70">{track.meta}</span><Link href={track.href} className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-950">Explore this path <ArrowUpRight className="size-4" /></Link></div>
                </article>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#edf1f7] px-6 py-14 text-slate-950 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-secondary">SAN HUB programs</p>
          <h2 className="font-exo mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">Learn the skill. Build the idea. Move it into the world.</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">SAN HUB connects learners, innovators, researchers, mentors, trainers, institutions, businesses, and technology opportunities.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {programs.map((program) => (
              <article key={program.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_14px_36px_rgba(7,11,36,0.06)] sm:p-6">
                <h3 className="font-exo text-xl font-bold tracking-[-0.03em] text-[#0c1230]">{program.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{program.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {program.items.map((item) => <span key={item} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600">{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0c1230] px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-cyan">SAN HUB impact</p>
              <h2 className="font-exo mt-3 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">Learning that creates opportunity.</h2>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">Last updated: 2026</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {impactStats.map(([value, label]) => (
              <div key={label} className="border-l border-white/20 pl-3">
                <p className="font-exo text-2xl font-bold leading-none tracking-[-0.04em] text-white sm:text-3xl">{value}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 pb-20 text-white sm:px-10 lg:px-16 lg:pb-28"><div className="mx-auto grid max-w-7xl gap-12 border-t border-white/10 pt-16 lg:grid-cols-[0.72fr_1.28fr]"><div><p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-secondary">What is happening next</p><h2 className="font-exo mt-4 max-w-xl text-3xl font-bold leading-[1] tracking-[-0.045em] sm:text-4xl">A calendar built around momentum.</h2><p className="mt-5 max-w-lg text-base leading-7 text-white/60">Training and events are the meeting points between learning, delivery, and the wider SAN TECH ecosystem.</p></div><div className="divide-y divide-white/15 border-y border-white/15">{upcoming.map((item) => { const Icon = item.icon; return <div key={item.title} className="grid gap-4 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center"><span className="grid size-11 place-items-center rounded-xl bg-brand-secondary text-white"><Icon className="size-5" /></span><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary">{item.type}</p><h3 className="font-exo mt-1 text-lg font-bold tracking-[-0.02em] text-white">{item.title}</h3><p className="mt-1 text-sm text-white/55">{item.detail}</p></div><div className="flex items-center gap-2 text-sm font-bold text-white/70 sm:text-right"><Clock3 className="size-4 text-brand-secondary" />{item.date}</div></div>; })}</div></div></section>

      <section className="bg-[#edf1f7] px-6 py-14 text-slate-950 sm:px-10 lg:px-16 lg:py-20"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-secondary">SAN HUB — who can join?</p><h2 className="font-exo mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl">Choose your place in the ecosystem.</h2><p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Every role helps SAN HUB turn learning, innovation, and opportunity into practical progress.</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{paths.map(([title, description]) => <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(7,11,36,0.05)]"><h3 className="font-exo text-lg font-bold tracking-[-0.02em] text-[#0c1230]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    </div>
  );
}
