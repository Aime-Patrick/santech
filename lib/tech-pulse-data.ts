export const techPulseCategoryOptions = [
  { id: "all", label: "All stories" },
  { id: "fellowship", label: "Fellowship" },
  { id: "news", label: "News" },
  { id: "announcements", label: "Announcements" },
  { id: "event", label: "Events" },
  { id: "recognition", label: "Recognition" },
  { id: "trends", label: "Trends" },
  { id: "impact", label: "Impact" },
] as const;

export type TechPulseCategory = Exclude<(typeof techPulseCategoryOptions)[number]["id"], "all">;

export type TechPulseArticle = {
  slug: string;
  category: TechPulseCategory;
  categoryLabel: string;
  title: string;
  date: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  body: string[];
};

export const techPulseArticles: readonly TechPulseArticle[] = [
  // FELLOWSHIP
  {
    slug: "san-hub-tech-ai-innovation-fellowship-2026",
    category: "fellowship",
    categoryLabel: "Fellowship",
    title: "SAN HUB Tech & AI Innovation Fellowship 2026",
    date: "June 18, 2026",
    publishedAt: "2026-06-18",
    readingTime: "4 min read",
    image: "/images/graduates.jpg",
    imageAlt: "A community group celebrating a technology and innovation graduation",
    excerpt: "A practical pathway for African builders who want to learn, prototype, and turn useful ideas into technology with lasting impact.",
    body: [
      "The SAN HUB Tech & AI Innovation Fellowship brings together learners, developers, researchers, and mentors around practical problems that matter in African communities.",
      "The fellowship combines guided learning, project work, mentorship, and opportunities to test ideas in real environments. Participants leave with stronger technical capability and a clearer path from prototype to impact.",
      "Applications, eligibility, and cohort dates will be published through SAN HUB as the next intake opens.",
    ],
  },
  {
    slug: "fellowship-cohort-applied-ai-robotics",
    category: "fellowship",
    categoryLabel: "Fellowship",
    title: "Cohort 4: Applied AI & Robotics Hardware Incubation",
    date: "May 24, 2026",
    publishedAt: "2026-05-24",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(108).jpg",
    imageAlt: "Fellowship cohort working on IoT and robotics hardware",
    excerpt: "Young engineering teams prototype IoT sensors, edge AI cameras, and automated monitoring systems for regional deployment.",
    body: [
      "The Applied AI & Robotics track provides dedicated hardware labs, sensor development kits, and cloud infrastructure for fellows building physical compute systems.",
      "Selected prototypes will receive pilot testing support across municipal facilities and partner agricultural stations in Rwanda.",
    ],
  },
  {
    slug: "women-in-cybersecurity-leadership-fellowship",
    category: "fellowship",
    categoryLabel: "Fellowship",
    title: "Advancing Women in Cybersecurity & Digital Forensics",
    date: "April 12, 2026",
    publishedAt: "2026-04-12",
    readingTime: "5 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(1).jpg",
    imageAlt: "Cybersecurity defense training session in progress",
    excerpt: "Specialized fellowship track delivering industry certifications, incident response labs, and SOC operational training.",
    body: [
      "Building robust cybersecurity capacity requires diverse teams equipped with real-world defensive engineering skills.",
      "In partnership with national institutions, the fellowship delivers hands-on SOC monitoring, penetration testing, and compliance frameworks.",
    ],
  },

  // NEWS
  {
    slug: "rwanda-inclusive-digital-public-infrastructure-50-in-5",
    category: "news",
    categoryLabel: "News",
    title: "Rwanda strengthens commitment to inclusive digital public infrastructure",
    date: "June 03, 2026",
    publishedAt: "2026-06-03",
    readingTime: "3 min read",
    image: "/images/Testing.JPG",
    imageAlt: "SAN TECH team demonstrating the E-Visitors system",
    excerpt: "A closer look at the public infrastructure conversation and the role of practical, trusted digital systems in expanding access.",
    body: [
      "Rwanda continues to invest in digital public infrastructure that can make essential services more accessible, accountable, and useful to people and institutions.",
      "For SAN TECH, that direction reinforces the importance of building systems that work in the conditions where they are needed: clear for people, dependable for operators, and designed to improve over time.",
      "The 50-in-5 conversation is a reminder that inclusion is not only about launching technology. It is about making sure the technology can be adopted, supported, and trusted.",
    ],
  },
  {
    slug: "central-bank-of-rwanda-deploys-e-visitors",
    category: "news",
    categoryLabel: "News",
    title: "National Bank of Rwanda (BNR) Deploys Enterprise E-Visitors",
    date: "May 19, 2026",
    publishedAt: "2026-05-19",
    readingTime: "4 min read",
    image: "/images/e-visitor3.png",
    imageAlt: "Enterprise access management interface deployed at BNR",
    excerpt: "Securing national banking infrastructure with biometric identity verification, multi-gate authorization, and audit reporting.",
    body: [
      "The deployment of SAN TECH's E-Visitors system across BNR headquarters marks a critical milestone in institutional security and digital identity compliance.",
      "The system handles over 1,200 daily visitor transactions with automated audit trails and real-time security clearances.",
    ],
  },
  {
    slug: "san-tech-expands-west-africa-hub-bamako",
    category: "news",
    categoryLabel: "News",
    title: "SAN TECH Expands Regional Engineering Operations to Bamako, Mali",
    date: "April 08, 2026",
    publishedAt: "2026-04-08",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(40).jpg",
    imageAlt: "SAN TECH executive leadership meeting with West African partners",
    excerpt: "Scaling pan-African digital solutions across West Africa with localized support and technology integration teams.",
    body: [
      "SAN TECH's Bamako branch now provides direct implementation, training, and technical advisory services for regional government and private enterprise partners.",
    ],
  },

  // ANNOUNCEMENTS
  {
    slug: "san-tech-product-and-community-updates",
    category: "announcements",
    categoryLabel: "Announcements",
    title: "SAN TECH product and community updates",
    date: "May 28, 2026",
    publishedAt: "2026-05-28",
    readingTime: "2 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(164).jpg",
    imageAlt: "E-Visitors operations and hardware presentation",
    excerpt: "New product milestones, ecosystem updates, and community opportunities from across SAN TECH and SAN HUB.",
    body: [
      "Tech Pulse is where SAN TECH shares the updates that help partners, clients, learners, and the wider ecosystem stay close to the work.",
      "This space will cover product releases, new partnerships, programme dates, team news, and the operational lessons behind the systems we build.",
      "The collection will grow as new stories are published and will eventually be managed through the SAN TECH content management system.",
    ],
  },
  {
    slug: "san-track-iot-fleet-management-launch",
    category: "announcements",
    categoryLabel: "Announcements",
    title: "Release: SAN TRACK v2.4 with Predictive Fuel & Route AI",
    date: "May 02, 2026",
    publishedAt: "2026-05-02",
    readingTime: "3 min read",
    image: "/images/santrack.png",
    imageAlt: "SAN TRACK fleet analytics dashboard",
    excerpt: "Major firmware and cloud platform update introducing real-time telemetry, geofencing, and driver behavior scoring.",
    body: [
      "SAN TRACK v2.4 brings advanced telematics and offline data caching for fleet operators navigating cross-border African transit corridors.",
    ],
  },

  // EVENT
  {
    slug: "african-innovation-digital-systems-summit-2026",
    category: "event",
    categoryLabel: "Event",
    title: "African Innovation & Digital Systems Summit 2026",
    date: "May 11, 2026",
    publishedAt: "2026-05-11",
    readingTime: "5 min read",
    image: "/images/summit.jpg",
    imageAlt: "Technology and business leaders gathered at a Rwanda global business forum",
    excerpt: "The people, ideas, and conversations shaping a more useful and locally grounded technology ecosystem.",
    body: [
      "Events are an important part of the SAN TECH ecosystem because they create room for people building, funding, governing, and using technology to meet around shared questions.",
      "The summit programme brings together demonstrations, conversations, and practical connections across digital transformation, innovation, and institutional technology.",
      "More event details, registration links, and programme updates will be added here as they become available.",
    ],
  },
  {
    slug: "tech-forward-live-annual-product-keynote",
    category: "event",
    categoryLabel: "Event",
    title: "Tech Forward Live 2026: The Future of Digital Infrastructure",
    date: "April 20, 2026",
    publishedAt: "2026-04-20",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(23).jpg",
    imageAlt: "CEO Keynote at Tech Forward Live 2026",
    excerpt: "Keynote highlights, product roadmap reveals, and ecosystem demonstrations presented to industry leaders and clients.",
    body: [
      "Over 400 attendees joined SAN TECH leadership at the annual Tech Forward Live summit to explore next-generation applications.",
    ],
  },

  // RECOGNITION
  {
    slug: "best-exhibitor-in-ict-and-innovation",
    category: "recognition",
    categoryLabel: "Recognition",
    title: "SAN TECH recognized for ICT and innovation",
    date: "September 19, 2026",
    publishedAt: "2026-09-19",
    readingTime: "3 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(172).jpg",
    imageAlt: "Award trophy presentation at 29th Rwanda International Trade Fair",
    excerpt: "Recognition is a reflection of the teams, institutions, and partners who make practical technology possible.",
    body: [
      "SAN TECH was recognized as Best Exhibitor in ICT and Innovation at the 29th Rwanda International Trade Fair, Expo 2026.",
      "The recognition reflects the work behind products such as E-Visitors and the wider effort to connect people, ideas, and technology with measurable institutional impact.",
      "We share the recognition with the clients, partners, learners, and builders who continue to challenge us to make technology more useful.",
    ],
  },
  {
    slug: "ncsa-certified-data-controller-processor",
    category: "recognition",
    categoryLabel: "Recognition",
    title: "Certified Data Controller & Processor by National Cyber Security Authority",
    date: "August 10, 2026",
    publishedAt: "2026-08-10",
    readingTime: "3 min read",
    image: "/images/SAN TECH Data Processor Certificate_page-0001.jpg",
    imageAlt: "Official Data Processor Certificate issued by DPPO / NCSA",
    excerpt: "Full statutory compliance with Law N° 058/2021 relating to the protection of personal data and privacy in Rwanda.",
    body: [
      "SAN TECH maintains strict adherence to data protection regulations, ensuring all client records and institutional data remain encrypted, audited, and sovereign.",
    ],
  },

  // TRENDS
  {
    slug: "technology-that-strengthens-sustainable-growth",
    category: "trends",
    categoryLabel: "Trends",
    title: "Technology that strengthens sustainable growth",
    date: "April 30, 2026",
    publishedAt: "2026-04-30",
    readingTime: "6 min read",
    image: "/images/fieldwork.jpg",
    imageAlt: "A community workshop using digital tools in Rwanda",
    excerpt: "Signals and perspectives on technology that improves operations while creating room for people and communities to grow.",
    body: [
      "The most useful technology is not always the newest technology. It is technology that can be understood, supported, and connected to the real goals of the people using it.",
      "Across institutions, businesses, and communities, the next phase of digital transformation will be shaped by responsible adoption, local capability, and systems that keep delivering value after launch.",
      "Tech Pulse will track the ideas and patterns that can help teams make those decisions with more confidence.",
    ],
  },
  {
    slug: "digital-public-goods-and-open-architecture",
    category: "trends",
    categoryLabel: "Trends",
    title: "Why Modular Architecture Outperforms Monolithic Vendor Lock-In",
    date: "March 18, 2026",
    publishedAt: "2026-03-18",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(112).jpg",
    imageAlt: "Architecture diagram review session",
    excerpt: "Analyzing how interoperable APIs and open standards ensure sustainable sovereignty for emerging markets.",
    body: [
      "Public and private institutions increasingly reject closed proprietary platforms in favor of modular, API-first software architectures.",
    ],
  },

  // IMPACT
  {
    slug: "measuring-impact-beyond-the-launch",
    category: "impact",
    categoryLabel: "Impact",
    title: "Measuring contribution beyond the launch",
    date: "April 14, 2026",
    publishedAt: "2026-04-14",
    readingTime: "5 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(80).jpg",
    imageAlt: "Community technology deployment milestone",
    excerpt: "Why useful technology should be measured by the people reached, systems strengthened, and capability left behind.",
    body: [
      "A product launch is a beginning, not the final measure of success. Impact grows through adoption, support, learning, and the outcomes people can see in their daily work.",
      "SAN TECH looks at contribution through the institutions served, people reached, opportunities created, and capabilities that remain after delivery teams move on.",
      "This journal will make those lessons easier to find, discuss, and carry into the next generation of products and programmes.",
    ],
  },
  {
    slug: "digital-skills-empowerment-47-institutions",
    category: "impact",
    categoryLabel: "Impact",
    title: "2,550+ Beneficiaries Across 47+ Partner Institutions",
    date: "February 28, 2026",
    publishedAt: "2026-02-28",
    readingTime: "4 min read",
    image: "/images/techforwardlive2026-photo-download-1of1/Highlights/CEPSTUDIO(174).jpg",
    imageAlt: "Graduation celebration for tech beneficiaries",
    excerpt: "Field metrics tracking software adoption, operational time savings, and workforce digital competency across Rwanda.",
    body: [
      "Through SAN HUB Academy and direct enterprise onboarding, SAN TECH measures genuine impact through retained capability and operational resilience.",
    ],
  },
];

export function getTechPulseArticle(slug: string) {
  return techPulseArticles.find((article) => article.slug === slug);
}
