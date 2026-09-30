import { PublicPage } from "@/components/public-page";
import { SharedContentBrowser, type SharedContentItem } from "@/components/shared-content-browser";
import { StickyPageMenu } from "@/components/sticky-page-menu";

const changeMenu = [
  { key: "impact", label: "Impact in action", href: "/driving-change?view=impact" },
  { key: "career", label: "Career outreach", href: "/driving-change?view=career" },
] as const;

const impactItems: readonly SharedContentItem[] = [
  {
    id: "systems-in-use",
    label: "Systems in use",
    title: "Technology that improves the everyday work around it.",
    description: "We build practical systems that help institutions welcome people, protect information, understand operations, and make better decisions.",
    details: ["From visitor management to connected operations, the work starts with a real need.", "The measure of a system is what becomes easier, safer, or more useful after it is adopted."],
    facts: [{ label: "Focus", value: "Useful systems" }, { label: "Approach", value: "Built with context" }],
    media: { kind: "image", src: "/images/ch10-datacenter.jpg", alt: "Technology infrastructure supporting practical digital systems" },
  },
  {
    id: "learning-that-remains",
    label: "Learning that remains",
    title: "Leave capability behind, not only a completed project.",
    description: "Our work connects delivery with training, documentation, and support so people can continue improving the systems they depend on.",
    details: ["Teams gain clearer processes, stronger digital habits, and the confidence to keep learning.", "SAN HUB extends this work through courses, mentorship, innovation programs, and placements."],
    facts: [{ label: "Focus", value: "Lasting capability" }, { label: "Route", value: "Learn · build · prove" }],
    media: { kind: "image", src: "/images/ch12-curriculum.jpg", alt: "Learner working through a practical technology curriculum" },
  },
  {
    id: "african-context",
    label: "African context",
    title: "Design for the realities people and institutions live.",
    description: "We keep local context close to the decisions: access, infrastructure, language, people, and the conditions that make technology useful.",
    details: ["Good technology is not only innovative; it is understandable, adoptable, and ready for the environment where it will work.", "Every engagement is an opportunity to strengthen the wider ecosystem around it."],
    facts: [{ label: "Focus", value: "Context-led design" }, { label: "Region", value: "Rwanda and Africa" }],
    media: { kind: "image", src: "/images/rw-graphic01-30p.png", alt: "Rwanda-inspired graphic representing local context and connection" },
  },
];

const careerItems: readonly SharedContentItem[] = [
  {
    id: "practical-entry",
    label: "Practical entry",
    title: "Create clearer routes into technology work.",
    description: "Career outreach connects people to practical learning, project experience, and the relationships that help a career move forward.",
    details: ["Courses and short programs build foundations around software, AI, cybersecurity, and connected systems.", "Learners leave with work they can explain, improve, and use as evidence of capability."],
    facts: [{ label: "Focus", value: "Practical skills" }, { label: "Route", value: "Learning to work" }],
    media: { kind: "image", src: "/images/graduates.jpg", alt: "SAN TECH graduates and emerging technology practitioners" },
  },
  {
    id: "mentorship-and-placement",
    label: "Mentorship and placement",
    title: "Make the next opportunity easier to see.",
    description: "Apprenticeships, internships, mentorship, and industry exposure help emerging practitioners move from potential into contribution.",
    details: ["People learn through guided contribution, feedback, and the habits of working with a real team.", "Partners can help shape pathways around the skills and opportunities their communities need."],
    facts: [{ label: "Focus", value: "Experience" }, { label: "Connection", value: "People and teams" }],
    media: { kind: "image", src: "/images/team.jpg", alt: "Technology team collaborating on practical work" },
  },
  {
    id: "community-outreach",
    label: "Community outreach",
    title: "Bring more people into the conversation.",
    description: "Career outreach is also about meeting people where they are through talks, open days, school connections, and accessible starting points.",
    details: ["The aim is to make technology feel possible, practical, and connected to a person’s own ambitions.", "Community is the bridge between a program and the wider ecosystem it is meant to strengthen."],
    facts: [{ label: "Focus", value: "Access and belonging" }, { label: "Format", value: "Talks and programs" }],
    media: { kind: "image", src: "/images/fieldwork.jpg", alt: "SAN TECH team engaging with a community" },
  },
];

export default async function DrivingChangePage({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const params = await searchParams;
  const activeMenu = params.view === "career" ? "career" : "impact";
  const items = activeMenu === "career" ? careerItems : impactItems;

  return (
    <PublicPage>
      <StickyPageMenu items={changeMenu} activeKey={activeMenu} ariaLabel="Driving Change sections" />
      <section className="border-t border-slate-200 px-6 pb-10 pt-2 sm:px-10 lg:px-16 lg:pb-16 lg:pt-4">
        <div className="mx-auto max-w-7xl bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <SharedContentBrowser items={items} />
        </div>
      </section>
    </PublicPage>
  );
}
