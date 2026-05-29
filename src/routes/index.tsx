import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { ComicLink } from "@/components/comic/ComicButton";
import { Halftone } from "@/components/comic/Halftone";
import { ActionLines } from "@/components/comic/ActionLines";
import { Burst } from "@/components/comic/Burst";
import { SpeechBubble } from "@/components/comic/SpeechBubble";
import { SoundFx } from "@/components/comic/SoundFx";
import { LeadForm } from "@/components/forms/LeadForm";
import { SHELLEY, SITE } from "@/content/shelley";
import { Phone, Mail, Zap, Home, KeyRound, Building2, ArrowRight } from "lucide-react";
import heroShelley from "@/assets/hero-shelley.jpg";
import illoAbout from "@/assets/illo-about.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: `${SITE.name} — Your Real Estate Hero | Las Vegas` },
      {
        name: "description",
        content:
          "Las Vegas real estate, supercharged. Shelley Jackson — 20-year local REALTOR® for buying, selling, leasing & property management.",
      },
      { property: "og:title", content: `${SITE.name} — Las Vegas Real Estate Hero` },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: SHELLEY.name,
          jobTitle: SHELLEY.title,
          telephone: SHELLEY.phone,
          email: SHELLEY.email,
          areaServed: SHELLEY.cities,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Las Vegas",
            addressRegion: "NV",
            addressCountry: "US",
          },
          description: SITE.description,
          sameAs: [SHELLEY.googleBusinessUrl],
        }),
      },
    ],
  }),
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <MeetShelleyPreview />
      <WhyCards />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

/* ---------- Section A: Hero ---------- */

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-cream">
      <Halftone variant="blue" density="normal" opacity={0.15} />
      <div className="absolute inset-0 flex items-center justify-end opacity-50">
        <div className="relative -mr-32 h-[600px] w-[600px] md:-mr-20">
          <ActionLines color="blue" count={48} />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-5 md:py-20 lg:py-24">
        <div className="md:col-span-3">
          <p className="font-marker text-xl text-sr-red" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
            Las Vegas · Henderson · Summerlin
          </p>
          <h1 className="mt-3 text-5xl text-sr-black sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            <span className="block">Your</span>
            <span className="block text-sr-red" style={{ WebkitTextStroke: "2px var(--color-sr-black)", paintOrder: "stroke fill" }}>
              Real Estate
            </span>
            <span className="block">Hero.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-sr-black/85 sm:text-xl">
            Las Vegas real estate, supercharged. Buying, selling, leasing, property management —
            handled with cape-level service by a 20-year local pro.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/contact?interest=buying"
              className="relative inline-flex items-center justify-center gap-2 border-comic-thin bg-sr-yellow px-7 py-3.5 font-display text-xl uppercase tracking-wide text-sr-black shadow-comic-sm transition-transform duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover md:text-2xl"
            >
              Find your dream home <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="/contact?interest=selling"
              className="font-display text-lg uppercase tracking-wide text-sr-blue underline decoration-sr-yellow decoration-4 underline-offset-4 hover:text-sr-red"
            >
              Or sell your place →
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-sr-black/80 sm:text-sm">
            <span>20 Years Experience</span>
            <span aria-hidden>·</span>
            <span>Las Vegas Local</span>
            <span aria-hidden>·</span>
            <span>Licensed REALTOR®</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <ComicPanel className="overflow-hidden p-0" background="cream">
            <img
              src={heroShelley}
              alt="Shelley Jackson, Las Vegas Super Realtor, in royal-blue blazer and red cape with a giant golden house key, Las Vegas skyline behind her."
              width={1408}
              height={800}
              className="block h-full w-full object-cover"
            />
          </ComicPanel>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section B: Services Grid ---------- */

function ServicesGrid() {
  const services = [
    { title: "Buy a Home", to: "/buyers", anchor: "/services#buying", icon: Home, blurb: "First-time or fifth-time. The Super Buyer Blueprint." },
    { title: "Sell for Top Dollar", to: "/sellers", anchor: "/services#selling", icon: Zap, blurb: "Strategy, marketing, negotiation. The Super Seller Strategy." },
    { title: "Property Management", to: "/property-management", anchor: "/services#property-management", icon: Building2, blurb: "Twenty years of protecting your investment." },
    { title: "Lease / Rent", to: "/contact?interest=leasing", anchor: "/services#leasing", icon: KeyRound, blurb: "Find a place to call home. Fast." },
  ];

  return (
    <section className="relative border-b-[3px] border-sr-black bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker="Pick your mission" as="h2">
          What can Super Realtor do for you?
        </SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Link
              key={s.title}
              to={s.anchor.startsWith("/services") ? "/services" : s.to.split("?")[0] as never}
              hash={s.anchor.includes("#") ? s.anchor.split("#")[1] : undefined}
              className="group"
            >
              <ComicPanel hover background="cream" tilt={i % 2 === 0 ? -0.6 : 0.6} className="h-full p-6">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center border-comic-thin bg-sr-yellow shadow-comic-sm">
                  <s.icon className="h-7 w-7 text-sr-black" aria-hidden />
                </div>
                <h3 className="text-2xl text-sr-black">{s.title}</h3>
                <p className="mt-2 text-sm text-sr-black/80">{s.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-display text-base uppercase text-sr-red">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </ComicPanel>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section C: Meet Shelley preview ---------- */

function MeetShelleyPreview() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-cream py-16 sm:py-20">
      <Halftone variant="red" density="sparse" opacity={0.1} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <ComicPanel className="overflow-hidden p-0" background="white">
            <img
              src={illoAbout}
              alt="Portrait of Shelley Jackson in her royal-blue blazer and red cape, standing on a Las Vegas residential street."
              width={894}
              height={1192}
              loading="lazy"
              className="block h-full w-full object-cover"
            />
          </ComicPanel>
        </div>
        <div className="md:col-span-3">
          <SectionHeading kicker="Meet your Super Realtor" as="h2" align="left">
            Shelley Jackson
          </SectionHeading>
          <p className="mt-6 text-lg text-sr-black/85">
            In a city that never slows down, you need a real estate expert who moves faster, thinks
            smarter, and fights harder for your goals. That's the job — and it's been mine for 20 years.
          </p>
          <p className="mt-4 text-lg text-sr-black/85">
            I help buyers find homes they'll love, sellers walk away with top dollar, and investors
            run rental portfolios without losing sleep. Real estate is a long game. I play it that way.
          </p>
          <div className="mt-6">
            <ComicLink to="/about" variant="secondary" size="md">
              Meet Shelley →
            </ComicLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section D: Why Cards ---------- */

function WhyCards() {
  const items = [
    { num: 1, title: "Local Expert", body: "20 years across the Las Vegas Valley. Neighborhood pricing, trends, and where the deals actually live." },
    { num: 2, title: "Fast + Responsive", body: "Direct line. Real answers. No runaround, no auto-responder maze." },
    { num: 3, title: "Full-Service", body: "From first showing to long-term property management. One pro, every step." },
  ];
  return (
    <section className="relative border-b-[3px] border-sr-black bg-sr-blue py-16 text-white sm:py-20">
      <Halftone variant="yellow" density="normal" opacity={0.18} />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker="Why Super Realtor" as="h2" className="[&_h2]:text-white">
          <span className="text-white">Three Superpowers</span>
        </SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((it) => (
            <ComicPanel key={it.num} background="cream" className="relative p-6 pt-12">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Burst size={70} color="yellow">
                  <span className="font-display text-3xl text-sr-black">{it.num}</span>
                </Burst>
              </div>
              <h3 className="text-2xl text-sr-black">{it.title}</h3>
              <p className="mt-2 text-base text-sr-black/85">{it.body}</p>
            </ComicPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section E: How It Works ---------- */

function HowItWorks() {
  const steps = [
    { n: 1, t: "Origin Story", b: "Tell me your goal — buy, sell, lease, or manage." },
    { n: 2, t: "House Hunt Mode", b: "Strategy, market analysis, neighborhood scouting." },
    { n: 3, t: "Make Your Move", b: "Negotiate, inspect, close. I fight for your number." },
    { n: 4, t: "Victory", b: "Keys in hand. Mission accomplished." },
  ];
  return (
    <section className="border-b-[3px] border-sr-black bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker="How it works" as="h2">
          From Hello to Keys in Hand
        </SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <ComicPanel key={s.n} background={i % 2 === 0 ? "cream" : "yellow"} className="p-6">
              <div className="font-display text-5xl text-sr-red" style={{ WebkitTextStroke: "2px var(--color-sr-black)", paintOrder: "stroke fill" }}>
                0{s.n}
              </div>
              <h3 className="mt-3 text-xl text-sr-black">{s.t}</h3>
              <p className="mt-2 text-sm text-sr-black/85">{s.b}</p>
            </ComicPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section F: Testimonials ---------- */

const TESTIMONIALS = [
  {
    quote:
      "Shelley is one of the best realtors in town. She's caring, understanding of your needs and works fast to help you get into where you'd love to be. She made one of the most dreaded processes smooth and easy for me. Highly recommend her services!",
    name: "Carissa A., Las Vegas",
  },
  {
    quote:
      "We listed our Henderson home with Shelley last spring and had a strong offer in under two weeks. She priced it right, the marketing hit the right buyers, and she walked us through every step of the negotiation. Couldn't have asked for a smoother sale.",
    name: "Mike R., Henderson",
  },
  {
    quote:
      "I own a rental property in Las Vegas but live out of state, and managing it from afar was a nightmare until Shelley took over. Tenants placed quickly, rent on time, repairs handled before I even hear about them. Total peace of mind.",
    name: "David K., Summerlin",
  },
];


function Testimonials() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-cream py-16 sm:py-20">
      <Halftone variant="red" density="normal" opacity={0.08} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker="Real wins" as="h2">
          What clients are saying
        </SectionHeading>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="pt-4">
              <SpeechBubble tailDirection={i % 2 === 0 ? "bottom-left" : "bottom-right"}>
                <div className="mb-2 flex gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} />
                  ))}
                </div>
                <p className="text-base text-sr-black/85">{t.quote}</p>
                <p className="mt-3 text-sm font-bold uppercase tracking-wide text-sr-black">
                  — {t.name}
                </p>
              </SpeechBubble>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2 L14.8 9.1 L22 9.7 L16.5 14.5 L18.2 21.6 L12 17.7 L5.8 21.6 L7.5 14.5 L2 9.7 L9.2 9.1 Z"
        fill="var(--color-sr-yellow)"
        stroke="var(--color-sr-black)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Section G: Final CTA + Form ---------- */

function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-sr-red py-16 text-white sm:py-20">
      <Halftone variant="yellow" density="normal" opacity={0.18} />
      <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SoundFx text="LET'S GO!" rotation={-6} color="yellow" size="md" />
          <h2 className="mt-6 text-4xl text-white sm:text-5xl md:text-6xl">
            Ready to make your move?
          </h2>
          <p className="mt-4 text-lg text-white/95">
            Drop your details. I'll get back to you within one business day — no auto-responders,
            no call centers. Just me.
          </p>
          <div className="mt-8 space-y-3">
            <a href={SHELLEY.phoneHref} className="flex items-center gap-3 text-lg font-bold text-white hover:underline">
              <Phone className="h-5 w-5" aria-hidden /> {SHELLEY.phone}
            </a>
            <a href={SHELLEY.emailHref} className="flex items-center gap-3 text-lg font-bold text-white hover:underline">
              <Mail className="h-5 w-5" aria-hidden /> {SHELLEY.email}
            </a>
          </div>
        </div>
        <div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
