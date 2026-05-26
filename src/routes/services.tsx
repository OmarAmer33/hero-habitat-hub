import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { Halftone } from "@/components/comic/Halftone";
import { SITE } from "@/content/shelley";
import { ArrowRight, Home, Zap, Building2, KeyRound } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: `Services | ${SITE.name}` },
      {
        name: "description",
        content:
          "Las Vegas real estate services: buying, selling, leasing, and property management with Shelley Jackson, REALTOR®.",
      },
      { property: "og:title", content: `Services | ${SITE.name}` },
      { property: "og:description", content: "Buying, selling, leasing, and property management in Las Vegas." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Real Estate Services",
          areaServed: "Las Vegas, NV",
          provider: { "@type": "RealEstateAgent", name: "Shelley Jackson" },
        }),
      },
    ],
  }),
});

function ServicesPage() {
  // Smooth scroll to anchors on initial hash navigation, with reduced-motion fallback
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-yellow py-14 sm:py-20">
        <Halftone variant="red" density="normal" opacity={0.15} />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="font-marker text-lg text-sr-red" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
            All the missions
          </p>
          <h1 className="mt-3 text-5xl text-sr-black sm:text-6xl md:text-7xl">Services</h1>
          <p className="mt-4 text-lg text-sr-black/85">
            Four services. One Super Realtor. Jump to what you need:
          </p>
          <nav aria-label="Services jump menu" className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              ["#buying", "Buying"],
              ["#selling", "Selling"],
              ["#leasing", "Leasing"],
              ["#property-management", "Property Mgmt"],
            ].map(([h, l]) => (
              <a
                key={h}
                href={h}
                className="border-comic-thin bg-white px-4 py-2 font-display text-base uppercase tracking-wide shadow-comic-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <ServiceSection
        id="buying"
        kicker="Mission 01"
        title="Buying"
        icon={Home}
        accent="cream"
        whatsIncluded={[
          "Lender intros, pre-approval guidance, and budgeting reality check",
          "Personalized search across Las Vegas, Henderson, Summerlin, North LV",
          "Neighborhood walkthroughs and tour scheduling",
          "Offer strategy, negotiation, inspection coordination, closing",
        ]}
        whoFor="First-time buyers, growing families, relocating professionals, investors."
        ctaHref="/contact?interest=buying"
        ctaLabel="Tell Shelley you're buying"
        learnHref="/buyers"
      />
      <ServiceSection
        id="selling"
        kicker="Mission 02"
        title="Selling"
        icon={Zap}
        accent="white"
        whatsIncluded={[
          "Comparative market analysis with realistic, top-of-range pricing",
          "Staging guidance, pro photos, and marketing rollout",
          "Showing coordination and qualified-buyer screening",
          "Offer review, negotiation, and closing-day handoff",
        ]}
        whoFor="Owners ready to move on — to a bigger place, a smaller place, or a brand-new chapter."
        ctaHref="/contact?interest=selling"
        ctaLabel="Tell Shelley you're selling"
        learnHref="/sellers"
      />
      <ServiceSection
        id="leasing"
        kicker="Mission 03"
        title="Leasing & Renting"
        icon={KeyRound}
        accent="cream"
        whatsIncluded={[
          "Rental search across Southern Nevada",
          "Application support and lease review",
          "Move-in coordination",
          "Owner-side: tenant placement and screening",
        ]}
        whoFor="Renters relocating to Vegas, owners filling vacancies."
        ctaHref="/contact?interest=leasing"
        ctaLabel="Tell Shelley you're leasing"
      />
      <ServiceSection
        id="property-management"
        kicker="Mission 04"
        title="Property Management"
        icon={Building2}
        accent="white"
        whatsIncluded={[
          "Tenant placement and rigorous screening",
          "Rent collection and financial reporting",
          "Maintenance coordination and vendor management",
          "Vacancy minimization and lease renewals",
        ]}
        whoFor="Out-of-state owners, accidental landlords, investors with multi-unit portfolios."
        ctaHref="/contact?interest=property_management"
        ctaLabel="Tell Shelley you need management"
        learnHref="/property-management"
      />
    </>
  );
}

interface ServiceSectionProps {
  id: string;
  kicker: string;
  title: string;
  icon: typeof Home;
  accent: "cream" | "white";
  whatsIncluded: string[];
  whoFor: string;
  ctaHref: string;
  ctaLabel: string;
  learnHref?: string;
}

function ServiceSection({
  id, kicker, title, icon: Icon, accent, whatsIncluded, whoFor, ctaHref, ctaLabel, learnHref,
}: ServiceSectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-b-[3px] border-sr-black py-16 sm:py-20 ${accent === "cream" ? "bg-sr-cream" : "bg-white"}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="inline-flex h-16 w-16 items-center justify-center border-comic-thin bg-sr-yellow shadow-comic-sm">
              <Icon className="h-9 w-9 text-sr-black" aria-hidden />
            </div>
            <p className="mt-4 font-marker text-base text-sr-red" style={{ transform: "rotate(-1deg)", display: "inline-block" }}>
              {kicker}
            </p>
            <h2 className="mt-2 text-4xl text-sr-black sm:text-5xl">{title}</h2>
            <p className="mt-4 text-base text-sr-black/85"><strong>Who it's for:</strong> {whoFor}</p>
          </div>
          <ComicPanel background={accent === "cream" ? "white" : "cream"} className="p-6 lg:col-span-3">
            <h3 className="text-2xl text-sr-black">What's included</h3>
            <ul className="mt-4 space-y-2.5">
              {whatsIncluded.map((p) => (
                <li key={p} className="flex gap-3 text-base text-sr-black/90">
                  <span className="mt-1 inline-block h-3 w-3 shrink-0 rotate-45 border-comic-thin bg-sr-yellow" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 border-comic-thin bg-sr-yellow px-5 py-2.5 font-display text-lg uppercase shadow-comic-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover"
              >
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </a>
              {learnHref && (
                <a href={learnHref} className="font-display text-lg uppercase text-sr-red underline-offset-4 hover:underline">
                  Deep dive →
                </a>
              )}
            </div>
          </ComicPanel>
        </div>
      </div>
    </section>
  );
}
