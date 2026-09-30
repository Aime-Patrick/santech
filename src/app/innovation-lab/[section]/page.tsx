import { notFound } from "next/navigation";
import InnovationLabPage from "@/components/innovation-lab-page";
import type { ExploreSection } from "@/components/innovation-lab-page";

const sections: ExploreSection[] = ["product", "services", "solutions", "technologies", "programming-languages"];

export function generateStaticParams() {
  return sections.filter((section) => section !== "product").map((section) => ({ section }));
}

export default async function InnovationLabSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.includes(section as ExploreSection) || section === "product") notFound();

  return <InnovationLabPage section={section as ExploreSection} />;
}
