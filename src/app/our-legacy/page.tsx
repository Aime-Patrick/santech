import { PublicPage } from "@/components/public-page";
import { SharedContentBrowser, type SharedContentItem } from "@/components/shared-content-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";
import { BorderBeam } from "@/components/ui/border-beam";

const legacyMenu = [
  { key: "who-we-are", label: "Who we are", href: "/our-legacy" },
  { key: "journey", label: "Our journey", href: "/our-legacy?section=journey" },
  { key: "focus", label: "Our focus", href: "/our-legacy?section=focus" },
  { key: "mission", label: "Mission & vision", href: "/our-legacy?section=mission" },
  { key: "recognition", label: "Recognition", href: "/our-legacy?section=recognition" },
  { key: "certificate", label: "Certificate", href: "/our-legacy?section=certificate" },
  { key: "leadership", label: "Leadership", href: "/our-legacy?section=leadership&view=executive" },
  { key: "profile", label: "Company profile", href: "/our-legacy?section=profile" },
] as const;

const legacyItems: SharedContentItem[] = [
  {
    id: "who-we-are",
    label: "Who we are",
    title: "Technology with a human reason.",
    description: "SAN TECH is a technological company focused on digital transformation and innovation.",
    content: "identity",
  },
  {
    id: "journey",
    label: "Our journey",
    title: "SAN TECH Journey at a Glance",
    description: "A decade of turning practical problems into technology, capability, partnerships, and a growing African innovation ecosystem.",
    content: "journey",
  },
  {
    id: "focus",
    label: "Our focus",
    title: "Turning capability into useful progress.",
    description: "From software and AI to training and deployment, SAN TECH brings the capabilities needed to move from a challenge or idea to a working solution.",
    content: "focus",
  },
  {
    id: "mission",
    label: "Mission & vision",
    title: "Useful systems. Wider possibility.",
    description: "Our mission is to build technology and pathways that help people and institutions move forward with confidence.",
    content: "mission",
  },
  {
    id: "recognition",
    label: "Recognition",
    title: "Recognition belongs to the ecosystem.",
    description: "Our work is shaped by the people and partners who make every product, program, and outcome possible.",
    content: "recognition",
  },
  {
    id: "certificate",
    label: "Certificate",
    title: "SAN TECH Certificate",
    description: "SAN TECH Certificate",
    content: "certificate",
  },
  {
    id: "leadership",
    label: "Leadership",
    title: "The people behind useful progress.",
    description: "SAN TECH is led by a focused direction team and supported by employees who bring technology, learning, and delivery together.",
    details: [
      "Executive direction keeps SAN TECH focused on useful products, responsible innovation, and opportunities that create measurable impact.",
      "Our team brings together software engineering, product and design, innovation and research, and community programs.",
    ],
    facts: [
      { label: "Executive direction", value: "Founder & CEO · Co-founder & COO/CFO" },
      { label: "Our team", value: "Builders · researchers · educators" },
      { label: "Working style", value: "Accountable and close to the work" },
    ],
    content: "leadership",
  },
  {
    id: "profile",
    label: "Company profile",
    title: "Turning Ideas into Impact.",
    description: "SAN TECH is a Kigali-based technology and innovation company that connects people, ideas, and technology to create digital products, strengthen organizations, and grow the next generation of builders.",
    content: "profile",
  },
];

export default async function OurLegacyPage({ searchParams }: { searchParams: Promise<{ section?: string; view?: string }> }) {
  const params = await searchParams;
  const selectedSection = legacyMenu.find((item) => item.key === params.section)?.key ?? "who-we-are";
  const leadershipView = params.view === "organization" ? "organization" : params.view === "team" ? "team" : "executive";

  return (
    <PublicPage>
      <StickyPageMenu items={legacyMenu} activeKey={selectedSection} ariaLabel="Our Legacy sections" />
      <section className="border-t border-slate-200 px-6 pb-5 pt-2 sm:px-10 lg:px-16 lg:pb-5 lg:pt-4">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="relative z-10">
            <SharedContentBrowser items={legacyItems} initialItemId={selectedSection} initialLeadershipView={leadershipView} syncUrl />
          </div>
          <BorderBeam
            size={120}
            duration={8}
            initialOffset={12}
            borderWidth={1.5}
            colorFrom="#09bce7"
            colorTo="#0a1f44"
            className="from-transparent via-brand-cyan to-transparent opacity-75"
          />
          <BorderBeam
            size={120}
            duration={8}
            delay={4}
            initialOffset={62}
            borderWidth={1}
            colorFrom="#0a1f44"
            colorTo="#4d8dff"
            className="from-transparent via-[#4d8dff] to-transparent opacity-60"
          />
        </div>
      </section>
    </PublicPage>
  );
}
