import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { Halftone } from "@/components/comic/Halftone";
import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/content/shelley";

export const Route = createFileRoute("/property-management")({
  component: PMPage,
  head: () => ({
    meta: [
      { title: `Property Management | ${SITE.name}` },
      { name: "description", content: "Las Vegas property management: tenant screening, rent collection, maintenance, financial reporting. 20 years of experience." },
      { property: "og:title", content: `Property Management | ${SITE.name}` },
      { property: "og:description", content: "Protect your investment with 20 years of Las Vegas property management." },
      { property: "og:url", content: "/property-management" },
    ],
    links: [{ rel: "canonical", href: "/property-management" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Service",
      name: "Property Management Services", areaServed: "Las Vegas, NV",
      provider: { "@type": "RealEstateAgent", name: "Shelley Jackson" },
    }) }],
  }),
});

function PMPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-black py-14 text-white sm:py-20">
        <Halftone variant="yellow" density="normal" opacity={0.18} />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="font-marker text-lg text-sr-yellow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>Mission: Protect the investment</p>
          <h1 className="mt-3 text-5xl sm:text-6xl md:text-7xl">Property Management</h1>
          <p className="mt-6 text-xl text-white/95">
            You bought it to make money, not to chase tenants and fix water heaters at 11 p.m. That's where 20 years of property management experience comes in.
          </p>
        </div>
      </section>

      <section className="border-b-[3px] border-sr-black bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading kicker="What's included" as="h2">Full-service management</SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Tenant placement", "Marketing, showings, applications — qualified renters only."],
              ["Rigorous screening", "Credit, income, rental history, background. Done right."],
              ["Rent collection", "On-time payments, late-pay handling, deposit accounting."],
              ["Maintenance coordination", "Vetted vendors, transparent pricing, fast turnarounds."],
              ["Financial reporting", "Monthly statements. Year-end tax docs. No surprises."],
              ["Vacancy minimization", "Renewals first. Re-list strategy second. Empty units cost money."],
            ].map(([t, b]) => (
              <ComicPanel key={t} background="cream" className="p-6">
                <h3 className="text-xl text-sr-black">{t}</h3>
                <p className="mt-2 text-sm text-sr-black/85">{b}</p>
              </ComicPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-[3px] border-sr-black bg-sr-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading kicker="Who it's for" as="h2">Is this you?</SectionHeading>
          <ul className="mt-8 space-y-3 text-lg text-sr-black/90">
            <li>→ Out-of-state owners who can't be on call locally</li>
            <li>→ Accidental landlords (inherited a property, relocated for work)</li>
            <li>→ Investors with multi-unit portfolios who want one point of contact</li>
            <li>→ Anyone who values their evenings more than answering tenant texts</li>
          </ul>
        </div>
      </section>

      <section className="bg-sr-yellow py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-4xl text-sr-black sm:text-5xl">Let's talk management</h2>
          <div className="mt-8"><LeadForm defaultInterest="property_management" /></div>
        </div>
      </section>
    </>
  );
}
