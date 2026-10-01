import type { LucideIcon } from "lucide-react";
import {
  BrainCircuit,
  Boxes,
  Code2,
  Cpu,
  Database,
  FileText,
  Globe2,
  GraduationCap,
  LockKeyhole,
  Network,
  Radar,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";

export type InnovationSection = "product" | "services" | "solutions";

export type InnovationFeature = {
  label: string;
  icon: LucideIcon;
  description: string;
};

export type InnovationMedia = {
  kind: "image" | "video";
  src: string;
  alt: string;
};

export type InnovationItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  subItems?: string[];
  coreFeatures: InnovationFeature[];
  media: InnovationMedia;
};

function innovationSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const productItems: InnovationItem[] = [
  {
    id: "san-track",
    label: "SAN TRACK",
    title: "See operations as they move.",
    description: "Track assets, fleets, and field operations with clearer visibility and better decisions.",
    coreFeatures: [
      { label: "Asset tracking", description: "Register important assets and follow their status, location, and history over time.", icon: Radar },
      { label: "Fleet visibility", description: "See where vehicles are, how they are being used, and when action is needed.", icon: Network },
      { label: "Location intelligence", description: "Turn location data into a clearer view of field activity and operational patterns.", icon: Globe2 },
      { label: "Operations dashboards", description: "Bring live operational signals into one view for faster, better-informed decisions.", icon: Workflow },
    ],
    media: { kind: "image", src: "/images/summit.jpg", alt: "SAN TECH operations and innovation" },
  },
  {
    id: "san-book",
    label: "SAN BOOK",
    title: "Make knowledge easier to use.",
    description: "Bring digital libraries, records, and institutional knowledge into one useful system.",
    coreFeatures: [
      { label: "Digital records", description: "Store important documents and records in a structured place that is easier to maintain.", icon: FileText },
      { label: "Searchable knowledge", description: "Find the right information quickly with organized content and useful search.", icon: Database },
      { label: "Secure access", description: "Give the right people access to the right knowledge while protecting sensitive records.", icon: LockKeyhole },
      { label: "Institutional workflows", description: "Move requests, reviews, and approvals through clear digital steps.", icon: Workflow },
    ],
    media: { kind: "image", src: "/images/team.jpg", alt: "SAN TECH team working with knowledge systems" },
  },
  {
    id: "revixsan",
    label: "REVIXSAN",
    title: "Turn review into improvement.",
    description: "Support quality assurance, audit reviews, and operational compliance with practical evidence.",
    coreFeatures: [
      { label: "Quality reviews", description: "Review work against clear standards and identify where quality can improve.", icon: ShieldCheck },
      { label: "Compliance checks", description: "Check required controls and make gaps visible before they become bigger problems.", icon: ScanLine },
      { label: "Action tracking", description: "Assign follow-up actions, monitor progress, and keep improvement work accountable.", icon: Workflow },
      { label: "Evidence reporting", description: "Collect the evidence behind decisions, reviews, and compliance outcomes.", icon: FileText },
    ],
    media: { kind: "image", src: "/troph.jpg", alt: "SAN TECH recognition and trust" },
  },
  {
    id: "sanverse",
    label: "SANVERSE",
    title: "Build spaces for what comes next.",
    description: "Explore immersive digital platforms and spatial experiences for learning, collaboration, and impact.",
    coreFeatures: [
      { label: "Immersive environments", description: "Create digital spaces that help people learn, explore, and collaborate in new ways.", icon: Boxes },
      { label: "Interactive experiences", description: "Make information and participation more engaging through responsive digital experiences.", icon: Cpu },
      { label: "Virtual collaboration", description: "Bring people together around shared work, ideas, and activities from different places.", icon: Network },
      { label: "Digital storytelling", description: "Use connected media and interaction to make important ideas easier to understand and remember.", icon: Globe2 },
    ],
    media: { kind: "image", src: "/images/summit.jpg", alt: "SAN TECH innovation experience" },
  },
];

const serviceItems: InnovationItem[] = [
  ["Software & Digital Products", "Web, mobile, enterprise software, APIs, and databases.", Code2],
  ["AI, Data & Automation", "AI, machine learning, OCR, computer vision, and analytics.", BrainCircuit],
  ["IoT, Embedded & Robotics", "IoT, sensors, embedded systems, and robotics.", Cpu],
  ["Cybersecurity & Infrastructure", "Cybersecurity, networks, servers, cloud, and data centers.", LockKeyhole],
  ["Smart Systems", "E-Visitors, access control, tracking, and monitoring.", Radar],
  ["Digital Transformation", "Automation, integration, consultancy, modernization, business-process digitization, paperless workflows, and enterprise modernization.", Workflow],
  ["Business Digital Intelligence (BDI)", "ERP, management information systems, CRM, inventory, agriculture, finance, payroll, visitor management, document management, workflow automation, asset management, procurement, attendance, reporting, and analytics.", Database],
  ["Innovation & R&D", "Prototyping, research, product development, testing, and scale.", Boxes],
  ["SAN HUB: Capacity Building & Employment", "Training, internships, mentorship, project development, career guidance, and innovation development programs.", GraduationCap],
  ["Technology Consultancy", "IT strategy, business analysis, system requirements, technology architecture, digital transformation consulting, ICT project management, technical feasibility studies, technology procurement advisory, system audits, and IT policy and documentation.", Globe2],
].map(([label, description, icon]) => ({
  id: innovationSlug(String(label)),
  label: String(label),
  title: String(label),
  description: String(description),
  coreFeatures: [
    { label: "Main services", description: String(description), icon: icon as LucideIcon },
    { label: "Delivery model", description: "Move from discovery and requirements through design, development, deployment, training, and support.", icon: Code2 },
    { label: "Built for growth", description: "Create technology that fits real operational needs and can grow with the organization.", icon: Workflow },
  ],
  media: { kind: "image" as const, src: "/images/team.jpg", alt: `SAN TECH ${String(label)} team` },
}));

const solutionItems: InnovationItem[] = [
  ["Software Engineering", "Design and build dependable digital products for everyday work, institutional operations, and growing organizations.", ["Web applications", "Mobile applications", "Desktop applications", "Enterprise systems", "API development & integration", "ERP, HRMIS and workflow systems", "Database systems"], Globe2],
  ["Artificial Intelligence & Machine Learning", "Apply intelligent systems to understand information, automate work, and support better decisions.", ["Computer vision", "OCR and document recognition", "AI assistants and chatbots", "Predictive analytics", "Recommendation systems", "Intelligent automation", "AI-powered decision-support systems"], BrainCircuit],
  ["E-Visitors & Access Management", "Create safer, more visible visitor and access experiences for institutions, facilities, and events.", ["Visitor registration", "Appointment management", "VIP management", "Gate-pass management", "QR/barcode access", "ID/passport OCR", "Watchlist/blacklist management", "Vehicle and driver tracking", "Visitor analytics and reports"], ScanLine],
  ["IoT & Embedded Systems", "Connect devices, environments, and operational data to systems that can monitor and guide action.", ["IoT monitoring", "Smart sensors", "RFID/NFC", "GPS tracking", "Embedded systems", "Smart access control", "Industrial monitoring", "Automation and control systems"], Cpu],
  ["Cybersecurity", "Protect systems, data, identities, and organizations through security built into technology and operations.", ["Security assessments", "Vulnerability assessment", "Network security", "Identity and access management", "Security monitoring", "Data protection", "Secure application development", "Cybersecurity awareness and training"], ShieldCheck],
  ["Digital Transformation", "Help organizations move from manual processes to connected, paperless, and modern digital operations.", ["Business-process digitization", "Paperless workflows", "Digital records", "Automation", "System integration", "Digital platforms", "Enterprise modernization"], Workflow],
  ["Networking & IT Infrastructure", "Build and maintain the reliable network and infrastructure foundations that technology depends on.", ["LAN/WAN", "Wi-Fi infrastructure", "Servers", "Data-center solutions", "CCTV and surveillance infrastructure", "Structured cabling", "Network monitoring", "IT infrastructure maintenance"], Network],
  ["Cloud & DevOps", "Deploy, operate, and improve applications and infrastructure with repeatable cloud and delivery practices.", ["Cloud deployment", "Application hosting", "CI/CD", "Containerization", "System monitoring", "Backup and disaster recovery", "Infrastructure automation"], Database],
  ["Data & Analytics", "Turn operational information into clear reporting, useful intelligence, and better decisions.", ["Database architecture", "Business intelligence", "Dashboards", "Data visualization", "Reporting systems", "Data integration", "Operational analytics"], Workflow],
  ["Innovation & R&D", "Move promising ideas from research and prototypes toward tested, useful, and scalable products.", ["Prototype development", "Proof-of-concept development", "Research systems", "Product engineering", "Technology testing", "Innovation challenges", "Commercialization support"], Boxes],
  ["SAN HUB", "Develop the technology talent and innovation capacity needed to create products, careers, and opportunity.", ["Technology training", "Digital skills development", "Internships", "Mentorship", "Innovation programs", "Startup development", "Research and product development"], GraduationCap],
  ["Industry Solutions", "Adapt technology to the operating realities of sectors that serve people, communities, and the economy.", ["Banking & financial services", "Government", "Education", "Healthcare", "Manufacturing", "Hospitality", "Logistics", "Real estate", "Retail", "NGOs and development organizations"], Globe2],
].map(([label, description, subItems, icon]) => ({
  id: innovationSlug(String(label)),
  label: String(label),
  title: String(label),
  description: String(description),
  subItems: subItems as string[],
  coreFeatures: [],
  media: { kind: "image" as const, src: "/images/summit.jpg", alt: `SAN TECH ${String(label)} solution` },
}));

export const innovationItems: Record<InnovationSection, InnovationItem[]> = {
  product: productItems,
  services: serviceItems,
  solutions: solutionItems,
};

export function getInnovationItem(section: InnovationSection, id: string) {
  return innovationItems[section].find((item) => item.id === id);
}
