export type SanHubGoalId = "learn" | "build" | "opportunity" | "team";

export type SanHubGoalPathway = {
  title: string;
  description: string;
  meta: string;
  href: string;
};

export type SanHubGoal = {
  id: SanHubGoalId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  pathways: readonly SanHubGoalPathway[];
};

export const sanHubGoals: readonly SanHubGoal[] = [
  {
    id: "learn",
    label: "Learn a skill",
    eyebrow: "Build your foundation",
    title: "Build skills for useful technology.",
    description: "Choose a practical pathway, work through guided lessons, and finish with something you can show.",
    actionLabel: "Explore all courses",
    actionHref: "#san-hub-catalog",
    pathways: [
      { title: "Full-Stack Software Engineering", description: "Build and deploy reliable web products from idea to release.", meta: "16 weeks · Cohort", href: "/san-hub/course/full-stack-software-engineering" },
      { title: "Applied AI & Machine Learning", description: "Turn real-world data and problems into useful AI workflows.", meta: "12 weeks · Weekend labs", href: "/san-hub/course/applied-ai-machine-learning" },
      { title: "Cybersecurity & Threat Intelligence", description: "Learn how to protect the systems people and organizations depend on.", meta: "10 weeks · Intensive labs", href: "/san-hub/course/cybersecurity-defense" },
    ],
  },
  {
    id: "build",
    label: "Build a solution",
    eyebrow: "Move from idea to evidence",
    title: "Bring a difficult question. Leave with a tested direction.",
    description: "Get the structure, feedback, and technical support to turn a promising idea into a useful prototype.",
    actionLabel: "Explore innovation programs",
    actionHref: "/innovation-lab",
    pathways: [
      { title: "Innovation Challenge Lab", description: "Frame a problem, test assumptions, and build toward a working possibility.", meta: "8-week cycle · Teams", href: "/innovation-lab" },
      { title: "Startup & Product Studio", description: "Shape an early product with validation, mentorship, and partner feedback.", meta: "Rolling intake · Studio", href: "/innovation-lab" },
      { title: "Build with AI", description: "Apply responsible AI workflows to everyday challenges in your context.", meta: "Upcoming · Evening cohort", href: "/connect?topic=upcoming-training" },
    ],
  },
  {
    id: "opportunity",
    label: "Find an opportunity",
    eyebrow: "Connect learning to work",
    title: "Make your next step visible to the people and teams building here.",
    description: "Find practical routes into mentorship, apprenticeships, internships, and community-led opportunities.",
    actionLabel: "Join the community",
    actionHref: "/join-the-community",
    pathways: [
      { title: "Software Engineering Apprenticeship", description: "Contribute to real systems while learning delivery habits from a team.", meta: "3–6 months · Placement", href: "/join-the-community?role=Intern" },
      { title: "Innovation & Research Internship", description: "Explore evidence, prototypes, and impact with researchers and builders.", meta: "Mentored · Placement", href: "/join-the-community?role=Intern" },
      { title: "SAN HUB Community Talks", description: "Meet practitioners, mentors, and innovators working on useful technology.", meta: "Monthly · Open to all", href: "/tech-pulse" },
    ],
  },
  {
    id: "team",
    label: "Grow a team",
    eyebrow: "Build capability together",
    title: "Give your team practical confidence for the next digital challenge.",
    description: "Move beyond one-off training with focused programs shaped around your people, systems, and goals.",
    actionLabel: "Talk to SAN HUB",
    actionHref: "/connect?topic=upskilling",
    pathways: [
      { title: "Digital Transformation for Teams", description: "Create clearer digital processes and stronger habits across your organization.", meta: "Custom schedule · Teams", href: "/connect?topic=upskilling" },
      { title: "AI Literacy for Everyday Work", description: "Build practical confidence with responsible AI tools and decisions.", meta: "2–4 weeks · Professionals", href: "/connect?topic=upskilling" },
      { title: "Partner with SAN HUB", description: "Shape a learning or innovation program around a real organizational need.", meta: "Conversation · Kigali / online", href: "/connect?topic=partnership" },
    ],
  },
];

export type SanHubJourneyStage = {
  id: "learn" | "build" | "prove" | "connect";
  label: string;
  title: string;
  description: string;
  outcome: string;
};

export const sanHubLearningJourney: readonly SanHubJourneyStage[] = [
  {
    id: "learn",
    label: "Learn",
    title: "Understand the tools and the context.",
    description: "Build the technical foundation through clear teaching, guided practice, and examples grounded in real work.",
    outcome: "A stronger foundation",
  },
  {
    id: "build",
    label: "Build",
    title: "Use the skill on a real problem.",
    description: "Turn lessons into a working prototype, workflow, or system with feedback from people who build every day.",
    outcome: "A useful project",
  },
  {
    id: "prove",
    label: "Prove",
    title: "Make your capability visible.",
    description: "Document the decisions, results, and lessons behind your work so others can understand what you can do.",
    outcome: "Evidence of ability",
  },
  {
    id: "connect",
    label: "Connect",
    title: "Take the next step with people.",
    description: "Move toward mentorship, an apprenticeship, an internship, a partner, or the next SAN HUB program.",
    outcome: "A clearer opportunity",
  },
];

export type SanHubGuideRoute = {
  id: string;
  keywords: readonly string[];
  itemId: string;
  prompt: string;
};

export const sanHubGuideRoutes: readonly SanHubGuideRoute[] = [
  { id: "learn-engineering", keywords: ["learn", "code", "software", "frontend", "backend", "web", "developer"], itemId: "full-stack-software-engineering", prompt: "I want to learn how to build digital products." },
  { id: "learn-ai", keywords: ["ai", "machine learning", "data", "automation", "model", "python"], itemId: "applied-ai-machine-learning", prompt: "I want to learn AI and solve a real problem." },
  { id: "build-innovation", keywords: ["build", "idea", "prototype", "startup", "product", "innovation"], itemId: "innovation-challenge-lab", prompt: "I have an idea and want to build a prototype." },
  { id: "find-opportunity", keywords: ["job", "work", "internship", "apprenticeship", "career", "mentor"], itemId: "software-apprenticeship", prompt: "I want to move from learning into an opportunity." },
  { id: "grow-team", keywords: ["team", "company", "organization", "staff", "business", "upskill"], itemId: "team-digital-transformation", prompt: "I want to grow my team’s digital capability." },
];
