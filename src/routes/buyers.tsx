import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { ComicLink } from "@/components/comic/ComicButton";
import { Halftone } from "@/components/comic/Halftone";
import { LeadForm } from "@/components/forms/LeadForm";
import { SITE } from "@/content/shelley";
import illoBuyers from "@/assets/illo-buyers.jpg";

export const Route = createFileRoute("/buyers")({
  component: BuyersPage,
  head: () => ({
    meta: [
      { title: `Buyers — Super Buyer Blueprint | ${SITE.name}` },
      { name: "description", content: "The Super Buyer Blueprint: how to buy a Las Vegas home with confidence — pre-approval to keys-in-hand." },
      { property: "og:title", content: `Buyers — Super Buyer Blueprint | ${SITE.name}` },
      { property: "og:description", content: "Buy your Las Vegas home with a 20-year local pro." },
      { property: "og:url", content: "/buyers" },
    ],
    links: [{ rel: "canonical", href: "/buyers" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Service",
        name: "Home Buying Services", areaServed: "Las Vegas, NV",
        provider: { "@type": "RealEstateAgent", name: "Shelley Jackson" },
      }) },
      { type: "application/ld+json", children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much home can I afford?",
            acceptedAnswer: { "@type": "Answer", text: "Start with pre-approval from a lender. It sets your real ceiling and tells sellers you're serious." },
          },
          {
            "@type": "Question",
            name: "How long does buying take?",
            acceptedAnswer: { "@type": "Answer", text: "From offer to close in Las Vegas is typically 30–45 days for financed deals, faster with cash." },
          },
          {
            "@type": "Question",
            name: "Do you work with first-time buyers?",
            acceptedAnswer: { "@type": "Answer", text: "Absolutely. Most of my clients have only bought once or twice. I'll walk you through every step." },
          },
        ],
      }) },
    ],
  }),
});

const STEPS = [
  { n: 1, t: "Origin Story", b: "Pre-approval, credit, budget, must-haves vs nice-to-haves." },
  { n: 2, t: "House Hunt Mode", b: "Touring, market analysis, neighborhood evaluation." },
  { n: 3, t: "Make Your Move", b: "Offer strategy, negotiation, inspections, appraisal." },
  { n: 4, t: "Victory", b: "Closing day. Keys in hand. Celebration." },
];

function BuyersPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-blue py-14 text-white sm:py-20">
        <Halftone variant="yellow" density="normal" opacity={0.2} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="font-marker text-lg text-sr-yellow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>The Super Buyer Blueprint</p>
            <h1 className="mt-3 text-5xl sm:text-6xl md:text-7xl">Mission: Buy Your Las Vegas Home</h1>
            <p className="mt-6 text-xl text-white/95">
              Las Vegas moves fast, but a good home purchase doesn't. Here's the process that keeps you confident from "I want to buy" to "give me the keys."
            </p>
          </div>
          <ComicPanel className="overflow-hidden p-0 md:col-span-2" background="cream">
            <img src={illoBuyers} alt="Shelley handing the keys to a happy young couple in front of their new Las Vegas home." width={1248} height={832} className="block h-full w-full object-cover" />
          </ComicPanel>
        </div>
      </section>


      <section className="border-b-[3px] border-sr-black bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading kicker="The 4-step blueprint" as="h2">Your buyer journey</SectionHeading>
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

      <section className="border-b-[3px] border-sr-black bg-sr-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading kicker="Quick answers" as="h2">Top buyer questions</SectionHeading>
          <dl className="mt-10 space-y-6">
            {[
              ["How much home can I afford?", "Start with pre-approval from a lender. It sets your real ceiling and tells sellers you're serious."],
              ["How long does buying take?", "From offer to close in Las Vegas is typically 30–45 days for financed deals, faster with cash."],
              ["Do you work with first-time buyers?", "Absolutely. Most of my clients have only bought once or twice. I'll walk you through every step."],
            ].map(([q, a]) => (
              <div key={q}>
                <dt className="font-display text-xl uppercase text-sr-black">{q}</dt>
                <dd className="mt-2 text-base text-sr-black/85">{a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 text-center">
            <ComicLink to="/faq" variant="secondary" size="md">See all FAQs →</ComicLink>
          </div>
        </div>
      </section>

      <section className="bg-sr-red py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-4xl text-white sm:text-5xl">Ready to start the hunt?</h2>
          <div className="mt-8"><LeadForm defaultInterest="buying" /></div>
        </div>
      </section>
    </>
  );
}
