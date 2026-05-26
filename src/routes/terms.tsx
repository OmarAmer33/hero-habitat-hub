import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/content/shelley";

export const Route = createFileRoute("/terms")({
  component: Terms,
  head: () => ({
    meta: [
      { title: `Terms of Use | ${SITE.name}` },
      { name: "description", content: `Terms of use for ${SITE.name}.` },
      { property: "og:url", content: "/terms" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div role="alert" className="mb-8 border-comic-thin bg-sr-yellow p-4 text-center font-display uppercase tracking-wide text-sr-black shadow-comic-sm">
        Draft — pending legal review
      </div>
      <h1 className="text-4xl text-sr-black sm:text-5xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-sr-black/70">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>

      <div className="prose mt-8 max-w-none space-y-4 text-base text-sr-black/90">
        <p>By using {SITE.name}.com (the "Site") you agree to these terms.</p>
        <h2 className="font-display text-2xl uppercase">Information accuracy</h2>
        <p>Content on the Site is for informational purposes only. Information about properties and pricing is deemed reliable but not guaranteed. Always verify directly with Shelley Jackson before making any real estate decision.</p>
        <h2 className="font-display text-2xl uppercase">No legal or financial advice</h2>
        <p>Nothing on the Site is legal, tax, or financial advice. Consult a qualified professional for your specific situation.</p>
        <h2 className="font-display text-2xl uppercase">Fair Housing</h2>
        <p>Shelley Jackson supports Equal Housing Opportunity. All real estate services are offered without regard to race, color, religion, sex, handicap, familial status, or national origin.</p>
        <h2 className="font-display text-2xl uppercase">Brokerage</h2>
        <p>Shelley Jackson, REALTOR®, NV License S.0190593, Castle Rock Realty. Each office is independently owned and operated.</p>
        <h2 className="font-display text-2xl uppercase">Changes</h2>
        <p>These terms may be updated at any time.</p>
      </div>
    </article>
  );
}
