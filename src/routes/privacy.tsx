import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/content/shelley";

export const Route = createFileRoute("/privacy")({
  component: Privacy,
  head: () => ({
    meta: [
      { title: `Privacy Policy | ${SITE.name}` },
      { name: "description", content: `Privacy policy for ${SITE.name}.` },
      { property: "og:url", content: "/privacy" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div role="alert" className="mb-8 border-comic-thin bg-sr-yellow p-4 text-center font-display uppercase tracking-wide text-sr-black shadow-comic-sm">
        Draft — pending legal review
      </div>
      <h1 className="text-4xl text-sr-black sm:text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-sr-black/70">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</p>

      <div className="prose mt-8 max-w-none space-y-4 text-base text-sr-black/90">
        <p>{SITE.name}.com (the "Site") respects your privacy. This policy explains what we collect and how we use it.</p>
        <h2 className="font-display text-2xl uppercase">What we collect</h2>
        <p>When you submit the contact form we collect: name, email, optional phone number, preferred contact method, interest type, best time to contact, and your message. We also log the page you submitted from and your browser user agent.</p>
        <h2 className="font-display text-2xl uppercase">How we use it</h2>
        <p>Your submission is sent to Shelley Jackson, REALTOR®, to respond to your inquiry. We do not sell or rent your information to third parties.</p>
        <h2 className="font-display text-2xl uppercase">Cookies</h2>
        <p>The Site uses only essential cookies required for the site to function.</p>
        <h2 className="font-display text-2xl uppercase">Your rights</h2>
        <p>To request deletion of your submitted information, email Shelley directly.</p>
        <h2 className="font-display text-2xl uppercase">Contact</h2>
        <p>Questions about this policy? Contact Shelley via the contact page.</p>
      </div>
    </article>
  );
}
