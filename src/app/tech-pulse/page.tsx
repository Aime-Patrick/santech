import { PublicPage } from "@/components/public-page";
import { SharedContentBrowser, type SharedContentItem } from "@/components/shared-content-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";
import { TechPulseOpportunities } from "@/components/tech-pulse-opportunities";

const pulseMenu = [
  { key: "news", label: "News", href: "/tech-pulse" },
  { key: "trends", label: "Trends", href: "/tech-pulse?type=trends" },
  { key: "announcements", label: "Announcements", href: "/tech-pulse?type=announcements" },
  { key: "opportunities", label: "Opportunities", href: "/tech-pulse?type=opportunities" },
  { key: "research", label: "Research & impact", href: "/tech-pulse?type=research" },
] as const;

const pulseItems: SharedContentItem[] = [
  {
    id: "fellowship",
    label: "Fellowship",
    title: "SAN HUB Tech & AI Innovation Fellowship 2026",
    description: "A full scholarship and incubation pathway for African developers building high-impact AI and embedded systems.",
    details: ["Open until November 30, 2026.", "The opportunity connects learning, mentorship, prototyping, and a route toward real-world deployment."],
    facts: [{ label: "Type", value: "Opportunity" }, { label: "Status", value: "Open now" }],
  },
  {
    id: "news",
    label: "News",
    title: "Designing technology for the realities people live",
    description: "A closer look at how SAN TECH turns practical needs into useful digital systems for institutions and communities.",
    details: ["Published in the SAN TECH journal.", "The story follows the decisions, people, and local context behind useful technology."],
    facts: [{ label: "Type", value: "News" }, { label: "Channel", value: "SAN TECH journal" }],
  },
  {
    id: "announcements",
    label: "Announcements",
    title: "SAN TECH announcements and updates",
    description: "Follow the latest updates from SAN TECH, including new programmes, partnerships, launches, and community milestones.",
    details: ["New announcements are added as the SAN TECH ecosystem moves forward.", "Follow this listing for important updates across products, programmes, and partnerships."],
    facts: [{ label: "Type", value: "Announcement" }, { label: "Channel", value: "SAN TECH updates" }],
  },
  {
    id: "summit",
    label: "Event",
    title: "African Innovation & Digital Systems Summit 2026",
    description: "Industry leaders, policymakers, and engineering teams come together to discuss local manufacturing and responsible technology scale.",
    details: ["Taking place in Kigali on November 12, 2026.", "The program includes conversations, demonstrations, and connections across the ecosystem."],
    facts: [{ label: "Type", value: "Event" }, { label: "Date", value: "12 Nov 2026 · Kigali" }],
  },
  {
    id: "recognition",
    label: "Recognition",
    title: "SAN TECH recognized for ICT and innovation",
    description: "Recognition for pioneering digital transformation and the rapid deployment of E-Visitors across Rwanda.",
    details: ["Published September 2026.", "The recognition reflects the work of the teams, institutions, and partners behind the deployments."],
    facts: [{ label: "Type", value: "Award" }, { label: "Status", value: "Latest" }],
  },
  {
    id: "trends",
    label: "Trends",
    title: "Technology that strengthens sustainable growth",
    description: "Signals and perspectives on technology that improves operations while creating room for people and communities to grow.",
    details: ["In focus across the SAN TECH ecosystem.", "The collection connects technology choices with sustainability, access, and long-term usefulness."],
    facts: [{ label: "Type", value: "Trend" }, { label: "Focus", value: "Sustainable contribution" }],
  },
  {
    id: "impact",
    label: "Impact",
    title: "Tracking contribution beyond the launch",
    description: "Impact is measured through the people reached, systems strengthened, opportunities created, and capabilities that remain after delivery.",
    details: ["The SAN TECH journal documents outcomes beyond a product launch.", "Evidence from programs, partnerships, and deployments will feed the future CMS archive."],
    facts: [{ label: "Type", value: "Research & impact" }, { label: "Channel", value: "SAN TECH journal" }],
  },
];

export default async function TechPulsePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const params = await searchParams;
  const selectedType = params.type === "opportunities" ? "fellowship" : params.type === "research" ? "impact" : params.type === "announcements" ? "announcements" : params.type === "trends" ? "trends" : "news";
  const activeMenu = params.type === "opportunities" ? "opportunities" : params.type === "research" ? "research" : params.type === "announcements" ? "announcements" : params.type === "trends" ? "trends" : "news";

  return (
    <PublicPage>
      <StickyPageMenu items={pulseMenu} activeKey={activeMenu} ariaLabel="Tech Pulse sections" />
      <section className="border-t border-slate-200 px-2 pb-10 pt-2 sm:px-10 lg:px-16 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {params.type === "opportunities" ? <TechPulseOpportunities /> : <SharedContentBrowser items={pulseItems} initialItemId={selectedType} combinedPanel />}
        </div>
      </section>
    </PublicPage>
  );
}
