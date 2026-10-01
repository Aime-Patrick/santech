import { AtSign, ArrowUpRight, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Radio } from "lucide-react";
import { PublicPage } from "@/components/public-page";

const contactDetails = [
  { label: "Phone", value: "+250 783 250 033 / +250 780 309 833", href: "tel:+250783250033", icon: Phone },
  { label: "WhatsApp", value: "+250 727 923 756", href: "https://wa.me/250727923756", icon: MessageCircle },
  { label: "Email", value: "info@santechinnovate.com", href: "mailto:info@santechinnovate.com", icon: Mail },
  { label: "Alternative email", value: "santechrw@gmail.com", href: "mailto:santechrw@gmail.com", icon: AtSign },
  { label: "Website", value: "santechinnovate.com", href: "https://santechinnovate.com", icon: Globe2 },
] as const;

export default function ConnectPage() {
  return (
    <PublicPage>
      <section className="san-hub-graphic-section border-y border-slate-200 py-2 sm:px-4 lg:px-10 lg:py-4">
        <div className="mx-auto max-w-[1500px] bg-white px-5 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-8">
          <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr_0.82fr] lg:items-start">
            <section className="p-0" aria-labelledby="contact-details-title">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">SAN TECH / Contacts</p>
              <h2 id="contact-details-title" className="font-exo mt-2 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]">Smart Applications and Networking Technology.</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">From ideation to transformative impact.</p>

              <address className="mt-5 not-italic">
                <div className="flex gap-3 text-sm leading-6 text-[#303755]">
                  <MapPin className="mt-1 size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
                  <span>Plot 48, KN 1 Road, Sofaru Building, 3rd Floor, Muhima, Kigali, Rwanda</span>
                </div>
              </address>

              <div className="mt-5 space-y-3">
                {contactDetails.map(({ label, value, href, icon: Icon }) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="group flex gap-3 text-sm transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary">
                    <Icon className="mt-0.5 size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
                    <span className="min-w-0"><span className="block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</span><span className="mt-1 block break-words text-[#303755] group-hover:text-brand-secondary">{value}</span></span>
                  </a>
                ))}
              </div>

              <div className="mt-4 flex gap-3 text-sm text-[#303755]"><Radio className="mt-0.5 size-4 shrink-0 text-brand-secondary" aria-hidden="true" /><span><span className="block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">SAN TECH Radio</span><span className="mt-1 block">Zeno.FM – SAN TECH</span></span></div>
            </section>

            <form className="grid gap-4 border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(10,31,68,0.06)] sm:grid-cols-2 sm:p-6" aria-labelledby="contact-form-title">
              <div className="sm:col-span-2"><p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">Start a conversation</p><h2 id="contact-form-title" className="font-exo mt-3 text-2xl font-bold leading-tight tracking-[-0.04em] text-[#0a1f44]">How can SAN TECH help?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Share a little context and our team will route your request.</p></div>
              <label className="grid gap-2 text-xs font-bold text-[#0a1f44]">Name<input required name="name" className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 font-normal text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white" placeholder="Your name" /></label>
              <label className="grid gap-2 text-xs font-bold text-[#0a1f44]">Email<input required type="email" name="email" className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 font-normal text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white" placeholder="you@example.com" /></label>
              <label className="grid gap-2 text-xs font-bold text-[#0a1f44]">Organization<input name="organization" className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 font-normal text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white" placeholder="Company or institution" /></label>
              <label className="grid gap-2 text-xs font-bold text-[#0a1f44]">Inquiry type<select name="type" className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 font-normal text-slate-700 outline-none transition-colors focus:border-brand-secondary focus:bg-white"><option>Product inquiry</option><option>Service inquiry</option><option>Training</option><option>E-Visitors demo</option><option>Partnership</option><option>General inquiry</option></select></label>
              <label className="grid gap-2 text-xs font-bold text-[#0a1f44] sm:col-span-2">Message<textarea required name="message" rows={7} className="resize-y rounded-lg border border-slate-200 bg-slate-50 p-3 font-normal text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-secondary focus:bg-white" placeholder="Tell us what you are working on..." /></label>
              <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0a1f44] px-5 text-sm font-bold text-white transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2 sm:col-span-2">Send inquiry <ArrowUpRight className="size-4" aria-hidden="true" /></button>
            </form>

            <section className="border border-slate-200 bg-white p-3" aria-labelledby="map-title">
              <div className="flex items-start justify-between gap-3 px-2 pb-3"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-brand-secondary">Find us</p><h2 id="map-title" className="font-exo mt-2 text-xl font-bold tracking-[-0.03em] text-[#0a1f44]">Sofaru Building</h2></div><MapPin className="mt-1 size-5 text-brand-secondary" aria-hidden="true" /></div>
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                <iframe title="SAN TECH location at Sofaru Building in Kigali" src="https://www.google.com/maps?q=Sofaru+Building,+Plot+48,+KN+1+Road,+Muhima,+Kigali,+Rwanda&output=embed" className="h-[260px] w-full border-0 sm:h-[300px] lg:h-[280px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Sofaru+Building,+Plot+48,+KN+1+Road,+Muhima,+Kigali,+Rwanda" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 px-2 text-xs font-black uppercase tracking-[0.14em] text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary">Open in Google Maps <ArrowUpRight className="size-4" aria-hidden="true" /></a>
            </section>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
