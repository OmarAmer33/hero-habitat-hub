import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { Halftone } from "@/components/comic/Halftone";
import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/content/shelley";
import illoSellers from "@/assets/illo-sellers.jpg";

export const Route = createFileRoute("/sellers")({
  component: SellersPage,
  head: () => ({
    meta: [
      { title: `Sellers — Super Seller Strategy | ${SITE.name}` },
      { name: "description", content: "The Super Seller Strategy: prep, market, negotiate, close. Sell your Las Vegas home for top dollar." },
      { property: "og:title", content: `Sellers — Super Seller Strategy | ${SITE.name}` },
      { property: "og:description", content: "Sell for top dollar in Las Vegas." },
      { property: "og:url", content: "/sellers" },
    ],
    links: [{ rel: "canonical", href: "/sellers" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Service",
      name: "Home Selling Services", areaServed: "Las Vegas, NV",
      provider: { "@type": "RealEstateAgent", name: "Shelley Jackson" },
    }) }],
  }),
});

const STEPS = [
  { n: 1, t: "Prep Your Property", b: "Pricing strategy, staging guidance, repair priorities." },
  { n: 2, t: "Launch Marketing", b: "Pro photos, listing copy, MLS, social, open houses." },
  { n: 3, t: "Negotiation Mode", b: "Screen offers, counter smart, protect your bottom line." },
  { n: 4, t: "Closing Day", b: "Paperwork, walkthrough, handoff. Mission complete." },
];

function SellersPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-red py-14 text-white sm:py-20">
        <Halftone variant="yellow" density="normal" opacity={0.2} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="font-marker text-lg text-sr-yellow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>The Super Seller Strategy</p>
            <h1 className="mt-3 text-5xl sm:text-6xl md:text-7xl">Mission: Sell For Top Dollar</h1>
            <p className="mt-6 text-xl text-white/95">
              Your home isn't just a listing — it's the story buyers fall in love with. Here's how we set the stage, draw the crowd, and close strong.
            </p>
          </div>
          <ComicPanel className="overflow-hidden p-0 md:col-span-2" background="cream">
            <img src={illoSellers} alt="Shelley planting a SOLD sign in front of a stylish Las Vegas home with a KA-CHING comic burst." width={1248} height={832} className="block h-full w-full object-cover" />
          </ComicPanel>
        </div>
      </section>


      <section className="border-b-[3px] border-sr-black bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker="The 4-step strategy" as="h2">Your seller journey</SectionHeading>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <ComicPanel key={s.n} background={i % 2 === 0 ? "cream" : "yellow"} className="p-6">
                <div className="font-display text-5xl text-sr-red" style={{ WebkitTextStroke: "2px var(--color-sr-black)", paintOrder: "stroke fill" }}>0{s.n}</div>
                <h3 className="mt-3 text-xl text-sr-black">{s.t}</h3>
                <p className="mt-2 text-sm text-sr-black/85">{s.b}</p>
              </ComicPanel>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sr-blue py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-4xl text-white sm:text-5xl">Get a no-pressure valuation</h2>
          <p className="mt-3 text-center text-white/90">Tell me a little about your place. I'll come back with real numbers.</p>
          <div className="mt-8"><LeadForm defaultInterest="selling" /></div>
        </div>
      </section>
    </>
  );
}
