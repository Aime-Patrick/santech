import { EVisitorsProductPage } from "@/components/e-visitors-product-page";
import { fetchTestimonials, fetchEVisitorsFeatures, fetchProductMilestones, fetchFaqItems } from "@/lib/strapi";

export default async function EVisitorsPage() {
  const [cmsTestimonials, cmsFeatures, cmsMilestones, cmsFaqs] = await Promise.all([
    fetchTestimonials(),
    fetchEVisitorsFeatures(),
    fetchProductMilestones("e-visitors"),
    fetchFaqItems("e-visitors"),
  ]);
  return (
    <EVisitorsProductPage
      cmsTestimonials={cmsTestimonials}
      cmsFeatures={cmsFeatures}
      cmsMilestones={cmsMilestones}
      cmsFaqs={cmsFaqs}
    />
  );
}
