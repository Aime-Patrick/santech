import { AtSign, ArrowUpRight, Globe2, Mail, MapPin, MessageCircle, Phone, Radio } from "lucide-react";
import { PublicPage } from "@/components/public-page";
import { ConnectDialog } from "@/components/connect-dialog";
import { CalendlyDialog } from "@/components/calendly-dialog";

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
      <section className="san-hub-graphic-section border-y border-slate-200 py-2 sm:px-4 lg:px-8 lg:py-3">
        <div className="mx-auto max-w-[1280px] bg-white px-4 py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-6">
          <header className="mb-5 grid gap-2 border-b border-slate-200 pb-4 md:grid-cols-[0.86fr_1.14fr] md:items-end md:gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">SAN TECH / Connect</p>
              <h1 className="font-exo mt-1.5 text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">Let&apos;s move something forward.</h1>
            </div>
            <p className="max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">Tell us what you are building, improving, or exploring. We will connect you with the right SAN TECH team.</p>
          </header>

          <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr] lg:items-start lg:gap-6">
            <div className="min-w-0">
              <section className="p-0" aria-labelledby="contact-details-title">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">Contact details</p>
                <p id="contact-details-title" className="mt-1.5 text-xs leading-5 text-slate-600">From ideation to transformative impact.</p>

                <address className="mt-4 flex gap-2.5 text-xs leading-5 text-[#303755] not-italic">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
                  <span>Plot 48, KN 1 Road, Sofaru Building, 3rd Floor, Muhima, Kigali, Rwanda</span>
                </address>

                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {contactDetails.map(({ label, value, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="group min-w-0 rounded-xl px-2.5 py-2 transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                    >
                      <span className="flex items-start gap-2">
                        <Icon className="mt-0.5 size-3.5 shrink-0 text-brand-secondary" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-slate-400">{label}</span>
                          <span className="mt-0.5 block break-words text-[11px] leading-4 text-[#303755] group-hover:text-brand-secondary">{value}</span>
                        </span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-2 text-[11px] text-[#303755]"><Radio className="size-3.5 shrink-0 text-brand-secondary" aria-hidden="true" /><span><span className="font-black uppercase tracking-[0.13em] text-slate-400">SAN TECH Radio</span><span className="ml-2">Zeno.FM — SAN TECH</span></span></div>
                <ConnectDialog initialTopic="talk" />
                <CalendlyDialog />
              </section>
            </div>
            <section aria-label="SAN TECH location map">
              <div className="relative overflow-hidden rounded-xl">
                <iframe title="SAN TECH location at Sofaru Building in Kigali" src="https://www.google.com/maps?q=SAN+TECH,+Sofaru+Building,+Plot+48,+KN+1+Road,+Muhima,+Kigali,+Rwanda&z=17&output=embed" className="h-[250px] w-full border-0 sm:h-[300px] lg:h-[340px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0a1f44] shadow-md ring-1 ring-slate-200">
                  <span className="size-2 rounded-full bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.18)]" aria-hidden="true" />
                  SAN TECH · Sofaru Building
                </div>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=Sofaru+Building,+Plot+48,+KN+1+Road,+Muhima,+Kigali,+Rwanda" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.13em] text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary">Get directions <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
            </section>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
