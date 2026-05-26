import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { Halftone } from "@/components/comic/Halftone";
import { ComicLink } from "@/components/comic/ComicButton";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { SITE } from "@/content/shelley";
import illoFaq from "@/assets/illo-faq.jpg";

const FAQS = [
  ["How do I know if I'm ready to buy a home in Las Vegas?", "Three signs: stable income, decent credit (620+ for most loans), and money saved for a down payment plus closing. We can walk through your specifics in a 15-minute call."],
  ["Do you offer home valuations?", "Yes. I'll do a comparative market analysis (CMA) of your home against recent sales — free, no obligation."],
  ["What does property management cost and what's included?", "Pricing depends on the property and scope. Full-service typically covers tenant placement, screening, rent collection, maintenance coordination, financial reporting, and vacancy management."],
  ["Do you work with first-time buyers?", "Most of my clients buy only once or twice. I'll explain every step — pre-approval, search, offer, inspection, close — in plain English."],
  ["What neighborhoods do you specialize in?", "Las Vegas, Henderson, Summerlin, North Las Vegas, and surrounding Southern Nevada. I've worked deals across all four for two decades."],
  ["How quickly can you list my home?", "Once we agree on pricing and prep, professional photos and MLS launch in about 7–10 days. Faster if your home is showing-ready."],
  ["What's the leasing process for renters?", "Tell me your budget and area, I'll send qualifying listings, we'll tour, and I'll help with applications. Owner-side, I'll find and screen tenants for you."],
  ["Can I work with you if I'm relocating from out of state?", "Absolutely — about a third of my buyers are relocating. Virtual tours, video walkthroughs, FaceTime showings, and remote signings make it work."],
  ["Do you offer virtual showings?", "Yes. Live FaceTime or recorded video walkthroughs available for any property."],
  ["How do you market a listing?", "Pro photography, MLS, syndication to Zillow/Realtor.com/Redfin, targeted social, my agent network, and open houses when they make sense."],
  ["What's your fee structure?", "Commission percentages are negotiable and depend on the service. I'll quote clearly before we sign anything."],
  ["How do I get started?", "Use the contact form, call, or text. One business-day reply, every time."],
] as const;

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: `FAQ | ${SITE.name}` },
      { name: "description", content: "Frequently asked questions about buying, selling, leasing, and property management in Las Vegas." },
      { property: "og:title", content: `FAQ | ${SITE.name}` },
      { property: "og:description", content: "Common questions about Las Vegas real estate, answered." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    }) }],
  }),
});

function FAQPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-yellow py-12 sm:py-16">
        <Halftone variant="blue" density="normal" opacity={0.15} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-5xl text-sr-black sm:text-6xl">FAQ</h1>
          <p className="mt-3 text-lg text-sr-black/85">The questions Shelley gets asked most.</p>
        </div>
      </section>

      <section className="bg-sr-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading kicker="Real answers" as="h2">Got a question?</SectionHeading>
          <div className="mt-10 space-y-3">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group border-comic-thin bg-white shadow-comic-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-lg uppercase text-sr-black">
                  <span>{q}</span>
                  <span className="shrink-0 text-2xl text-sr-red transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <div className="border-t-[2px] border-sr-black px-5 py-4 text-base text-sr-black/85">{a}</div>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-base text-sr-black/85">Don't see your question?</p>
            <div className="mt-4"><ComicLink to="/contact" variant="secondary" size="md">Ask Shelley →</ComicLink></div>
          </div>
        </div>
      </section>
    </>
  );
}
