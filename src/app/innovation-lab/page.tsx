import InnovationLabPage from "@/components/innovation-lab-page";
import { createPageMetadata } from "@/lib/seo";

export function generateMetadata() {
  return createPageMetadata({
    title: "Explore Solutions",
    description: "Explore SAN TECH products, services, solutions, and technology capabilities built for useful progress.",
    path: "/innovation-lab",
  });
}

export default function InnovationLabIndexPage() {
  return <InnovationLabPage section="product" />;
}
