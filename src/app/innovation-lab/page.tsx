import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BubbleMenu from "@/components/BubbleMenu";
import { PageIntro, PublicPage, SectionHeading } from "@/components/public-page";

const products = [
  {
    name: "E-Visitors",
    tagline: "Smart visitor, access & attendance intelligence.",
    category: "Access & Security",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
    href: "/e-visitors",
  },
  {
    name: "SAN TRACK",
    tagline: "Real-time assets, fleet & operations tracking.",
    category: "IoT & Logistics",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    href: "/connect",
  },
  {
    name: "SAN BOOK",
    tagline: "Digital library, documentation & institutional records.",
    category: "Knowledge & Records",
    image: "https://images.unsplash.com/photo-1507842229452-47d34208a0ab?auto=format&fit=crop&w=800&q=80",
    href: "/connect",
  },
  {
    name: "REVIXSAN",
    tagline: "Quality assurance, audit reviews & operational compliance.",
    category: "Audit & Governance",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    href: "/connect",
  },
  {
    name: "SANVERSE",
    tagline: "Next-gen immersive platforms & virtual spatial spaces.",
    category: "Spatial & Immersive",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80",
    href: "/connect",
  },
];

const services = [
  { label: "Software development", hoverBg: "#0B0E87", rotation: -4 },
  { label: "Web and mobile applications", hoverBg: "#1d4ed8", rotation: 3 },
  { label: "AI solutions", hoverBg: "#7c3aed", rotation: -3 },
  { label: "IoT and embedded systems", hoverBg: "#0891b2", rotation: 4 },
  { label: "Cybersecurity", hoverBg: "#e11d48", rotation: -2 },
  { label: "Digital transformation", hoverBg: "#6d28d9", rotation: 3 },
  { label: "Training and capacity building", hoverBg: "#059669", rotation: -4 },
  { label: "Systems integration", hoverBg: "#0284c7", rotation: 3 },
  { label: "Consultancy", hoverBg: "#0B0E87", rotation: -3 },
];

const serviceMenuItems = services.map((service) => ({
  label: service.label,
  href: `/connect?service=${encodeURIComponent(service.label)}`,
  ariaLabel: `Learn about ${service.label}`,
  rotation: service.rotation,
  hoverStyles: { bgColor: service.hoverBg, textColor: "#ffffff" },
}));

const technologies = [
  "Web platforms",
  "Mobile apps",
  "Cloud systems",
  "AI and machine learning",
  "IoT",
  "Data and analytics",
  "Cybersecurity",
  "Automation",
];

const technologyMenuItems = technologies.map((technology, index) => ({
  label: technology,
  href: `/connect?tech=${encodeURIComponent(technology)}`,
  ariaLabel: `Explore ${technology}`,
  rotation: index % 2 === 0 ? -2.5 : 2.5,
  hoverStyles: {
    bgColor: ["#0B0E87", "#1d4ed8", "#0891b2", "#7c3aed", "#e11d48", "#059669", "#0284c7", "#6d28d9"][index % 8],
    textColor: "#ffffff",
  },
}));

const sectors = [
  "Government",
  "Education",
  "Healthcare",
  "Tourism",
  "Manufacturing",
  "Agriculture",
  "Transport",
  "Financial services",
  "SMEs",
  "NGOs",
];

const sectorMenuItems = sectors.map((sector, index) => ({
  label: sector,
  href: `/connect?sector=${encodeURIComponent(sector)}`,
  ariaLabel: `Explore solutions for ${sector}`,
  rotation: index % 2 === 0 ? -2.5 : 2.5,
  hoverStyles: {
    bgColor: ["#0B0E87", "#1d4ed8", "#059669", "#d97706", "#7c3aed", "#0891b2", "#0284c7", "#e11d48", "#6d28d9", "#c9a313"][index % 10],
    textColor: "#ffffff",
  },
}));

export default function InnovationLabPage() {
  return (
    <PublicPage>
      <PageIntro
        eyebrow="Explore us / Innovation Lab"
        title="A catalogue of what SAN TECH can make possible."
        titleClassName="text-4xl sm:text-5xl lg:text-6xl"
        description="Explore products, services, solutions, projects, and technologies built for the work that matters."
        actions={[
          { label: "Request Demo", href: "/connect" },
          { label: "View E-Visitors", href: "/e-visitors", tone: "secondary" },
        ]}
      />

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Products" title="Tools made for momentum." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Link
                key={product.name}
                href={product.href}
                className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-secondary/40 hover:shadow-[0_24px_60px_rgba(11,14,135,0.18)]"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
                </div>

                {/* Top Row: Index Badge & Category */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="inline-flex rounded-lg bg-white/10 px-2.5 py-1 text-xs font-black tracking-wider text-white backdrop-blur-md">
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f3d45c]">
                    {product.category}
                  </span>
                </div>

                {/* Bottom Row: Product Title, Tagline & Action Arrow */}
                <div className="relative z-10 mt-12 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-exo text-2xl font-black tracking-[-0.04em] text-white transition-colors group-hover:text-[#f3d45c]">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/75">
                      {product.tagline}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-brand-secondary group-hover:text-white group-hover:scale-110">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Services"
              title="Capability that meets the challenge."
              titleClassName="text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.08]"
              description="From first question to long-term support, our teams connect strategy, technology, and delivery."
            />
            <div className="mt-8 flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-secondary">
                Interactive capability hub
              </p>
              <p className="text-sm leading-relaxed text-slate-600">
                Click any service to connect directly with our engineering and innovation specialists.
              </p>
            </div>
          </div>
          <div className="w-full">
            <BubbleMenu items={serviceMenuItems} size="md" />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Technologies" title="The tools behind the outcomes." />
            <div className="mt-8">
              <BubbleMenu
                layout="flex"
                size="sm"
                items={technologyMenuItems}
                staggerDelay={0.04}
              />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="By sector" title="Designed for real contexts." />
            <div className="mt-8">
              <BubbleMenu
                layout="flex"
                size="sm"
                items={sectorMenuItems}
                staggerDelay={0.04}
              />
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
