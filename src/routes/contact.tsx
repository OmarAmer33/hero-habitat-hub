import { createFileRoute, useSearch } from "@tanstack/react-router";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { Halftone } from "@/components/comic/Halftone";
import { LeadForm } from "@/components/forms/LeadForm";
import { SHELLEY, SITE } from "@/content/shelley";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

type Interest = "buying" | "selling" | "leasing" | "property_management" | "exploring";
const VALID_INTERESTS: Interest[] = ["buying", "selling", "leasing", "property_management", "exploring"];
function searchSchema(input: Record<string, unknown>): { interest: Interest } {
  const i = input.interest;
  return { interest: (typeof i === "string" && (VALID_INTERESTS as string[]).includes(i)) ? (i as Interest) : "exploring" };
}

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: `Contact Shelley | ${SITE.name}` },
      { name: "description", content: "Contact Shelley Jackson — Las Vegas REALTOR®. One business-day reply. No popups, no auto-responders." },
      { property: "og:title", content: `Contact Shelley | ${SITE.name}` },
      { property: "og:description", content: "Get in touch with your Las Vegas Super Realtor." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const { interest } = useSearch({ from: "/contact" });

  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-blue py-14 text-white sm:py-20">
        <Halftone variant="yellow" density="normal" opacity={0.18} />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl">Let's make your next move legendary</h1>
          <p className="mt-4 text-lg text-white/95">
            Drop your details. Tell me what you're working on. One business-day reply — just me, no auto-responders.
          </p>
        </div>
      </section>

      <section className="bg-sr-cream py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading as="h2" align="left">Send a signal</SectionHeading>
            <div className="mt-6"><LeadForm defaultInterest={interest} /></div>
          </div>
          <div className="lg:col-span-2">
            <ComicPanel background="yellow" className="p-6">
              <h2 className="text-2xl text-sr-black">Direct line</h2>
              <ul className="mt-4 space-y-4 text-base text-sr-black">
                <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0" aria-hidden /><a href={SHELLEY.phoneHref} className="font-bold hover:underline">{SHELLEY.phone}</a></li>
                <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0" aria-hidden /><a href={SHELLEY.emailHref} className="font-bold break-all hover:underline">{SHELLEY.email}</a></li>
                <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0" aria-hidden /><span>{SHELLEY.hours}</span></li>
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden /><span>{SHELLEY.serviceArea}</span></li>
              </ul>
            </ComicPanel>
          </div>
        </div>
      </section>
    </>
  );
}
