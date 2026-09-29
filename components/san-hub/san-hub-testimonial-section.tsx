import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "SAN HUB helped me move from learning concepts to building something people could actually use.",
    name: "Aline M.",
    role: "SAN HUB learner",
  },
  {
    quote: "The practical projects and mentorship gave our team the confidence to take an idea further.",
    name: "Eric N.",
    role: "Innovation program participant",
  },
  {
    quote: "SAN HUB creates a useful bridge between technology skills, opportunity, and the needs of our community.",
    name: "Diane U.",
    role: "Community partner",
  },
] as const;

export function SanHubTestimonialSection() {
  return (
    <section id="san-hub-testimonials" className="san-hub-graphic-section scroll-mt-40 border-b border-slate-200 px-6 py-10 sm:px-10 lg:px-16 lg:py-16">
      <div className="mx-auto max-w-[1500px] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid gap-8 border-b border-slate-200 pb-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-brand-secondary">SAN HUB / Testimonials</p>
            <h1 className="font-exo mt-4 max-w-xl text-3xl font-bold leading-[1.02] tracking-[-0.055em] text-[#0a1f44] sm:text-4xl">What people are building from here.</h1>
          </div>
          <p className="max-w-2xl text-base leading-7 text-slate-600">SAN HUB is measured by the people who leave with more clarity, stronger capability, and a next step they can act on.</p>
        </div>

        <div className="grid divide-y divide-slate-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="flex min-h-[250px] flex-col justify-between py-8 lg:px-7 lg:first:pl-0 lg:last:pr-0">
              <div>
                <Quote className="size-7 text-brand-cyan" aria-hidden="true" />
                <p className="mt-5 text-lg leading-8 text-[#303755]">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
              <footer className="mt-8">
                <cite className="not-italic text-sm font-bold text-[#0a1f44]">{testimonial.name}</cite>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{testimonial.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
