"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Handshake, Lightbulb, Users, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type JoinPath = "training" | "internship" | "community" | "innovation";

const peoplePaths: { id: JoinPath; label: string; description: string; icon: typeof GraduationCap }[] = [
  { id: "training", label: "Training", description: "Build practical technology skills through SAN HUB courses and cohorts.", icon: GraduationCap },
  { id: "internship", label: "Internships", description: "Learn inside real delivery teams with guided work and mentorship.", icon: BriefcaseBusiness },
  { id: "community", label: "Community", description: "Join events, conversations, mentorship, and opportunities across the ecosystem.", icon: Users },
  { id: "innovation", label: "Innovation programs", description: "Turn a difficult question or early idea into something tested and useful.", icon: Lightbulb },
];

const pathCopy: Record<JoinPath, { eyebrow: string; title: string; description: string; prompt: string; placeholder: string }> = {
  training: { eyebrow: "Training application", title: "Tell us what you want to learn.", description: "We will use your interests and experience to guide you toward the right SAN HUB learning pathway.", prompt: "Which skills or topics do you want to develop?", placeholder: "For example: full-stack development, AI, cybersecurity, or digital skills..." },
  internship: { eyebrow: "Internship application", title: "Start with a real contribution.", description: "Share your background and the kind of work you want to experience inside a SAN TECH delivery team.", prompt: "What would you like to work on?", placeholder: "Tell us about your skills, project experience, and the kind of team you want to join..." },
  community: { eyebrow: "Community registration", title: "Find your place in the ecosystem.", description: "Join the SAN HUB network for events, mentorship, conversations, and opportunities to contribute.", prompt: "How would you like to participate?", placeholder: "Tell us what you want to learn, share, or contribute..." },
  innovation: { eyebrow: "Innovation program", title: "Move an idea toward impact.", description: "Tell us about the problem, prototype, or research question you want to explore with SAN HUB.", prompt: "What are you working on?", placeholder: "Describe the problem, idea, prototype, or research question..." },
};

export function JoinCommunityPage({ initialPath = "community", course = "", openInitially = false }: { initialPath?: JoinPath; course?: string; openInitially?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const [path, setPath] = useState<JoinPath>(initialPath);
  const [isDialogOpen, setIsDialogOpen] = useState(openInitially);
  const [submitted, setSubmitted] = useState(false);
  const copy = pathCopy[path];

  useEffect(() => {
    if (!isDialogOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsDialogOpen(false); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [isDialogOpen]);

  function openPath(nextPath: JoinPath) {
    setPath(nextPath);
    setSubmitted(false);
    setIsDialogOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="relative overflow-hidden px-6 py-7 sm:px-10 sm:py-9 lg:px-16 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
            <div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">SAN TECH / Join us</p><h1 className="font-exo mt-2 max-w-2xl text-2xl font-bold leading-[1] tracking-[-0.05em] text-[#07152d] sm:text-3xl lg:text-4xl">Choose the way you want to move forward.</h1></div>
          <motion.article initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="rounded-2xl bg-[#07152d] p-5 text-white shadow-[0_16px_35px_rgba(7,11,36,0.14)] sm:p-6">
            <div><h2 className="font-exo text-xl font-bold tracking-[-0.04em] sm:text-2xl">Work with SAN TECH.</h2></div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">Partner, sponsor a pathway, explore E-Visitors, or bring a technology challenge to our team.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">{[{ label: "Partner with us", href: "/connect?topic=partnership", icon: Handshake }, { label: "Book a demo", href: "/connect?topic=e-visitors-demo", icon: ArrowUpRight }, { label: "Talk with us", href: "/connect?topic=talk", icon: Users }].map(({ label, href, icon: Icon }, index) => <motion.a key={label} href={href} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2, boxShadow: "0 12px 26px rgba(8,198,231,0.22)" }} whileTap={{ scale: 0.98 }} transition={{ opacity: { duration: 0.25, delay: 0.12 + index * 0.08 }, y: { duration: 0.2, delay: 0.12 + index * 0.08 }, boxShadow: { duration: 0.2 } }} className="group relative flex min-h-12 items-center justify-between gap-2 overflow-hidden rounded-xl border border-brand-cyan bg-white px-2.5 py-2 text-left text-[#07152d] shadow-[0_8px_20px_rgba(8,198,231,0.14)] transition-shadow"><motion.span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-brand-cyan/25 to-transparent" initial={{ x: "-30%" }} animate={prefersReducedMotion ? { x: "-30%" } : { x: ["-30%", "420%"] }} transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 4, delay: index * 0.65, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }} /><span className="relative z-10 text-sm font-bold">{label}</span><motion.span className="relative z-10 shrink-0 text-brand-secondary" whileHover={{ scale: 1.12, rotate: 8 }} transition={{ type: "spring", stiffness: 500, damping: 24 }}><Icon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></motion.span></motion.a>)}</div>
          </motion.article>
          </div>

          <div className="mt-7 border-t border-slate-200 pt-6">
            <article className="rounded-2xl border-t-4 border-brand-cyan bg-white p-5 shadow-[0_16px_35px_rgba(7,11,36,0.08)] sm:p-6">
              <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">For people</p><h2 className="font-exo mt-2 text-xl font-bold tracking-[-0.04em] text-[#07152d] sm:text-2xl">Join the SAN HUB ecosystem.</h2></div><Users className="size-6 text-brand-secondary" aria-hidden="true" /></div>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Learn, contribute, find mentorship, and build the experience needed to create useful technology.</p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">{peoplePaths.map(({ id, label, description, icon: Icon }) => <button key={id} type="button" onClick={() => openPath(id)} className="group rounded-xl border border-brand-cyan bg-white p-3.5 text-left shadow-[0_8px_20px_rgba(8,198,231,0.14)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(8,198,231,0.22)]"><span className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-sm font-bold text-[#07152d]"><Icon className="size-4 text-brand-secondary" aria-hidden="true" />{label}</span><ArrowUpRight className="size-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span><span className="mt-1.5 block text-xs leading-5 text-slate-500">{description}</span></button>)}</div>
            </article>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isDialogOpen && <motion.div key="join-dialog" className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152d]/65 p-4 backdrop-blur-sm sm:p-6" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onMouseDown={(event) => { if (event.currentTarget === event.target) setIsDialogOpen(false); }}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="join-dialog-title" className="max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/60 bg-[#f7faff] shadow-[0_30px_90px_rgba(7,21,45,0.28)]" initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.24, ease: "easeOut" }}>
            <div className="flex items-start justify-between gap-5 border-b border-slate-200 bg-white px-5 py-4 sm:px-7"><div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-secondary">{copy.eyebrow}</p><h2 id="join-dialog-title" className="font-exo mt-1 text-xl font-bold leading-tight tracking-[-0.035em] text-[#07152d] sm:text-2xl">{copy.title}</h2></div><button type="button" onClick={() => setIsDialogOpen(false)} aria-label="Close application form" className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-brand-secondary hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"><X className="size-4" /></button></div>
            <div className="p-5 sm:p-7">{submitted ? <div className="rounded-xl border border-emerald-200 bg-white p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">Request prepared</p><h3 className="font-exo mt-3 text-2xl font-bold text-[#07152d]">Thank you for starting the conversation.</h3><p className="mt-3 text-sm leading-6 text-slate-600">Your {copy.eyebrow.toLowerCase()} details are ready for the SAN HUB team. We will use the contact information you provided to follow up with the next steps.</p><div className="mt-6 flex flex-wrap gap-2"><button type="button" onClick={() => setSubmitted(false)} className="inline-flex items-center gap-2 rounded-lg bg-[#07152d] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-secondary">Submit another request <ArrowUpRight className="size-4" /></button><button type="button" onClick={() => setIsDialogOpen(false)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#07152d] transition-colors hover:border-brand-secondary">Close</button></div></div> : <><p className="mb-5 max-w-2xl text-sm leading-6 text-slate-600">{copy.description}</p><form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2"><label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Full name<input required minLength={2} name="name" placeholder="Your full name" className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary" /></label><label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Email address<input required type="email" name="email" placeholder="you@example.com" className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary" /></label><label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Phone number<input required type="tel" name="phone" pattern="\\+?[0-9\\s().-]{7,}" title="Enter a valid phone number" placeholder="+250 7xx xxx xxx" className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary" /></label><label className="grid gap-1.5 text-xs font-bold text-[#07152d]">Country<input required defaultValue="Rwanda" name="country" placeholder="Rwanda" className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary" /></label>{path === "training" && <label className="grid gap-1.5 text-xs font-bold text-[#07152d] sm:col-span-2">Learning format<select required defaultValue="" name="format" className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-brand-secondary"><option value="" disabled>Select a learning format</option><option>In-person</option><option>Online</option><option>Either</option></select></label>}{path === "internship" && <label className="grid gap-1.5 text-xs font-bold text-[#07152d] sm:col-span-2">School or institution<input required minLength={2} name="institution" placeholder="School, university, or organization" className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary" /></label>}<label className="grid gap-1.5 text-xs font-bold text-[#07152d] sm:col-span-2">{path === "training" ? "Preferred course or programme" : path === "internship" ? "Area of interest" : "Experience or organization"}<input required minLength={2} defaultValue={course} name="focus" className="h-10 rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary" placeholder={path === "training" ? "Course or skill area" : "What should we know?"} /></label><label className="grid gap-1.5 text-xs font-bold text-[#07152d] sm:col-span-2">{copy.prompt}<textarea required minLength={20} name="message" rows={4} className="resize-y rounded-lg border border-slate-200 bg-white p-3 font-normal outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary" placeholder={copy.placeholder} /></label><button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#07152d] px-5 text-sm font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary sm:col-span-2">Continue with {peoplePaths.find((item) => item.id === path)?.label.toLowerCase()} <ArrowUpRight className="size-4" /></button></form></>}</div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
