import { PublicPage } from "@/components/public-page";
import { SharedContentBrowser, type SharedContentItem } from "@/components/shared-content-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";

const legacyMenu = [
  { key: "who-we-are", label: "Who we are", href: "/our-legacy" },
  { key: "mission", label: "Mission & vision", href: "/our-legacy?section=mission" },
  { key: "leadership", label: "Leadership", href: "/our-legacy?section=leadership&view=executive" },
] as const;

const legacyItems: SharedContentItem[] = [
  {
    id: "who-we-are",
    label: "Who we are",
    title: "Technology with a human reason.",
    description: "SAN TECH is a Rwandan technology and innovation company established in 2019 by young engineers with a mission to turn ideas and operational challenges into practical solutions.",
    details: [
      "We bring together software engineering, artificial intelligence, cybersecurity, IoT, research, product development, digital transformation, and technology education for real African environments.",
      "We help institutions, organizations, and innovators move from an idea or problem to design, development, deployment, and impact.",
    ],
    facts: [
      { label: "Established", value: "2019" },
      { label: "Focus", value: "Digital transformation" },
      { label: "Promise", value: "Practical impact" },
    ],
  },
  {
    id: "mission",
    label: "Mission & vision",
    title: "Useful systems. Wider possibility.",
    description: "Our mission is to build technology and pathways that help people and institutions move forward with confidence.",
    details: [
      "Our vision is an African innovation ecosystem where ideas become trusted, lasting impact.",
      "Our values are practical thinking, curiosity, inclusion, accountability, and generous knowledge-sharing.",
    ],
    facts: [
      { label: "Mission", value: "Build useful technology" },
      { label: "Vision", value: "Grow African innovation" },
      { label: "Values", value: "Practical · curious · accountable" },
    ],
  },
  {
    id: "journey",
    label: "Our journey",
    title: "Built one useful step at a time.",
    description: "SAN TECH continues to grow through products, programs, partnerships, and people empowered to create more.",
    details: [
      "2019 — SAN TECH founded with a focus on homegrown technology and digital capacity.",
      "2022 — Training and innovation programs connected skills, ideas, and communities.",
      "2023 — SAN HUB expanded into a shared space for courses, mentorship, and progress.",
      "2024–2026 — Products, platforms, and partnerships grew into a wider African ecosystem.",
    ],
  },
  {
    id: "recognition",
    label: "Recognition",
    title: "Recognition belongs to the ecosystem.",
    description: "Our work is shaped by the people and partners who make every product, program, and outcome possible.",
    details: [
      "This recognition marks the shared effort behind SAN TECH's technology, learning, and community work.",
      "Trust is earned through useful delivery, responsible systems, and consistent progress.",
    ],
    media: { kind: "image", src: "/troph.jpg", alt: "SAN TECH recognition for ICT and innovation" },
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
      { label: "Executive direction", value: "CEO · Operations and programs" },
      { label: "Our team", value: "Builders · researchers · educators" },
      { label: "Working style", value: "Accountable and close to the work" },
    ],
    content: "leadership",
  },
];

export default async function OurLegacyPage({ searchParams }: { searchParams: Promise<{ section?: string; view?: string }> }) {
  const params = await searchParams;
  const selectedSection = params.section === "mission" ? "mission" : params.section === "leadership" ? "leadership" : "who-we-are";
  const leadershipView = params.view === "team" ? "team" : "executive";

  return (
    <PublicPage>
      <StickyPageMenu items={legacyMenu} activeKey={selectedSection} ariaLabel="Our Legacy sections" />
      <section className="border-t border-slate-200 px-6 pb-10 pt-2 sm:px-10 lg:px-16 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-7xl">
          <SharedContentBrowser items={legacyItems} initialItemId={selectedSection} initialLeadershipView={leadershipView} />
        </div>
      </section>
    </PublicPage>
  );
}
