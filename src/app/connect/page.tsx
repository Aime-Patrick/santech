import { AtSign, ArrowUpRight, Mail, MapPin, MessageCircle, Navigation, Phone, Radio } from "lucide-react";
import { PublicPage } from "@/components/public-page";
import { ConnectDialog } from "@/components/connect-dialog";
import { CalendlyDialog } from "@/components/calendly-dialog";

const contactDetails = [
  { label: "Phone", value: "+250 783 250 033 / +250 780 309 833", href: "tel:+250783250033", icon: Phone },
  { label: "WhatsApp", value: "+250 727 923 756", href: "https://wa.me/250727923756", icon: MessageCircle },
  { label: "Email", value: "info@santechinnovate.com", href: "mailto:info@santechinnovate.com", icon: Mail },
  { label: "Alternative email", value: "santechrw@gmail.com", href: "mailto:santechrw@gmail.com", icon: AtSign },
] as const;

export default function ConnectPage() {
  return (
    <PublicPage>
      <section className="san-hub-graphic-section border-y border-slate-200 py-2 sm:px-4 lg:px-8 lg:py-3">
        <div className="mx-auto max-w-[1280px] bg-white px-4 py-4 sm:px-7 sm:py-5 lg:px-8 lg:py-6">
          <header className="mb-5 grid gap-2 border-b border-slate-200 pb-4 md:grid-cols-[0.86fr_1.14fr] md:items-end md:gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">SAN TECH / Connect</p>
              <h1 className="font-exo mt-1.5 text-2xl font-bold leading-tight tracking-[-0.045em] text-[#0a1f44] sm:text-3xl">
                Let&apos;s move something forward.
              </h1>
            </div>
            <p className="max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
              Tell us what you are building, improving, or exploring. We will connect you with the right SAN TECH team.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-8">
            {/* Left: Contact Info & Action Buttons */}
            <div className="min-w-0">
              <section className="p-0" aria-labelledby="contact-details-title">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary">Contact details</p>
                <p id="contact-details-title" className="mt-1 text-xs leading-5 text-slate-600">
                  From ideation to transformative impact.
                </p>

                {/* Physical Address */}
                <address className="mt-3.5 flex gap-2.5 text-xs leading-5 text-[#303755] not-italic">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
                  <span className="font-medium">Plot 48, KN 1 Road, Sofaru Building, 3rd Floor, Muhima, Kigali, Rwanda</span>
                </address>

                {/* Contact Badges Grid */}
                <div className="mt-3.5 grid gap-2 sm:grid-cols-2">
                  {contactDetails.map(({ label, value, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="group min-w-0 border border-slate-100 bg-slate-50/50 px-3 py-2 transition-colors hover:border-brand-secondary hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                    >
                      <span className="flex items-start gap-2">
                        <Icon className="mt-0.5 size-3.5 shrink-0 text-brand-secondary" aria-hidden="true" />
                        <span className="min-w-0">
                          <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-slate-400">{label}</span>
                          <span className="mt-0.5 block break-words text-[11px] font-semibold leading-4 text-[#303755] group-hover:text-brand-secondary">
                            {value}
                          </span>
                        </span>
                      </span>
                    </a>
                  ))}
                </div>

                {/* SAN TECH Radio Link */}
                <a
                  href="https://zeno.fm/radio/san-tech/"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-3 flex items-center justify-between border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 transition-colors hover:border-brand-secondary hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex size-2.5 shrink-0">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <Radio className="size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Live Stream
                      </span>
                      <span className="text-xs font-bold text-[#0a1f44] group-hover:text-brand-secondary transition-colors">
                        SAN TECH Radio <span className="font-normal text-slate-500">· Zeno.FM</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-brand-secondary">
                    <span>Listen live</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </div>
                </a>

                {/* Action Buttons Row */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <ConnectDialog initialTopic="talk" />
                  <CalendlyDialog />
                </div>
              </section>
            </div>

            {/* Right: Google Map */}
            <section aria-label="SAN TECH location map" className="relative">
              <div className="relative overflow-hidden border border-slate-200 shadow-2xs">
                <iframe
                  title="SAN TECH location at Sofaru Building in Kigali"
                  src="https://www.google.com/maps?q=SAN+TECH,+Sofaru+Building,+Plot+48,+KN+1+Road,+Muhima,+Kigali,+Rwanda&z=18&output=embed"
                  className="h-[270px] w-full border-0 sm:h-[320px] lg:h-[350px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Get Directions Link */}
              <div className="mt-2.5 flex items-center justify-between">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Sofaru+Building,+Plot+48,+KN+1+Road,+Muhima,+Kigali,+Rwanda"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#0a1f44] transition-colors hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                >
                  <Navigation className="size-3.5 text-brand-secondary" aria-hidden="true" />
                  <span>Get directions on Google Maps</span>
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>

                <span className="text-[10px] font-semibold text-slate-400">Plot 48, KN 1 Road</span>
              </div>
            </section>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
