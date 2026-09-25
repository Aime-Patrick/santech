import { notFound } from "next/navigation";
import InnovationLabPage from "@/components/innovation-lab-page";
import type { InnovationSection } from "@/components/innovation-section-browser";

const sections: InnovationSection[] = ["product", "services", "solutions"];

export function generateStaticParams() {
  return sections.filter((section) => section !== "product").map((section) => ({ section }));
}

export default async function InnovationLabSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section as InnovationSection) || section === "product") notFound();

  return <InnovationLabPage section={section as InnovationSection} />;
}
