import type { SanHubCatalogItem, SanHubCategory } from "@/lib/san-hub-catalog-data";

export type SanHubAudienceId = "individuals" | "businesses" | "universities" | "governments";

export type SanHubAudienceTab = {
  id: SanHubAudienceId;
  label: string;
  href: string;
};

export type SanHubAudienceView = {
  title: string;
  description: string;
  guideTitle: string;
  guideDescription: string;
  guidePlaceholder: string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredDescription: string;
  catalogCategories: readonly SanHubCategory[];
};

export const sanHubAudienceTabs: readonly SanHubAudienceTab[] = [
  { id: "individuals", label: "For Individuals", href: "/san-hub?audience=individuals#san-hub-goals" },
  { id: "businesses", label: "For Businesses", href: "/san-hub?audience=businesses#san-hub-guide" },
  { id: "universities", label: "For Universities", href: "/san-hub?audience=universities#san-hub-goals" },
  { id: "governments", label: "For Governments", href: "/san-hub?audience=governments#san-hub-guide" },
];

export const sanHubAudienceViews: Record<SanHubAudienceId, SanHubAudienceView> = {
  individuals: {
    title: "Find your next skill, project, or opportunity.",
    description: "Choose a practical route and keep moving from learning into visible capability.",
    guideTitle: "Tell us what you want to learn or build.",
    guideDescription: "Describe your next move and start with a focused SAN HUB pathway.",
    guidePlaceholder: "Try: I want to learn AI",
    featuredEyebrow: "For your next move",
    featuredTitle: "Featured pathways for useful work.",
    featuredDescription: "Start small, build something real, and keep your next step close.",
    catalogCategories: ["Courses", "Upcoming training", "Apprenticeships / Internships", "Events"],
  },
  businesses: {
    title: "Build the capability your team needs next.",
    description: "Practical programs for stronger systems, clearer digital processes, and responsible AI adoption.",
    guideTitle: "Tell us what your team needs to improve.",
    guideDescription: "Find a focused starting point for digital transformation, AI literacy, or innovation support.",
    guidePlaceholder: "Try: We need practical AI training",
    featuredEyebrow: "For teams",
    featuredTitle: "Programs that move work forward.",
    featuredDescription: "Shape capability around your people, systems, and real operating context.",
    catalogCategories: ["Upskilling programs", "Innovation programs", "Upcoming training"],
  },
  universities: {
    title: "Connect learning to practical technology work.",
    description: "Create clearer routes from curriculum and skills development to projects, mentorship, and industry experience.",
    guideTitle: "Find a pathway for your learners.",
    guideDescription: "Explore courses, project-based learning, placements, and community opportunities.",
    guidePlaceholder: "Try: We need an internship pathway",
    featuredEyebrow: "For learning communities",
    featuredTitle: "Learning that meets the real world.",
    featuredDescription: "Give learners a way to practice, prove, and connect what they know.",
    catalogCategories: ["Courses", "Upcoming training", "Apprenticeships / Internships", "Innovation programs"],
  },
  governments: {
    title: "Build systems and people ready for public impact.",
    description: "Explore practical learning, innovation, and digital transformation routes for institutions and communities.",
    guideTitle: "Start with the public challenge in front of you.",
    guideDescription: "Find a pathway for stronger services, better capability, or a tested innovation direction.",
    guidePlaceholder: "Try: We need to improve a public service",
    featuredEyebrow: "For public impact",
    featuredTitle: "Practical routes to stronger systems.",
    featuredDescription: "Connect people, technology, and implementation around a problem that matters.",
    catalogCategories: ["Innovation programs", "Upskilling programs", "Courses", "Events"],
  },
};

export function filterSanHubAudienceItems(items: readonly SanHubCatalogItem[], categories: readonly SanHubCategory[]) {
  return items.filter((item) => categories.includes(item.category));
}
