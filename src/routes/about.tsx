import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/comic/SectionHeading";
import { ComicPanel } from "@/components/comic/ComicPanel";
import { ComicLink } from "@/components/comic/ComicButton";
import { Halftone } from "@/components/comic/Halftone";
import { Burst } from "@/components/comic/Burst";
import { SHELLEY, SITE } from "@/content/shelley";
import { Home, Building2, MapPin, Zap, Shield } from "lucide-react";
import illoAbout from "@/assets/illo-about.jpg";
import shelleyPhoto from "@/assets/shelley-photo.png";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: `About Shelley | ${SITE.name}` },
      {
        name: "description",
        content: `Meet Shelley Jackson, Las Vegas REALTOR® with 20 years across Las Vegas, Henderson, Summerlin & North Las Vegas.`,
      },
      { property: "og:title", content: `About Shelley Jackson | ${SITE.name}` },
      { property: "og:description", content: "20-year Las Vegas REALTOR® and property manager." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
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
          description: "Las Vegas REALTOR® and property manager with 20 years of local experience.",
        }),
      },
    ],
  }),
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-blue py-16 text-white sm:py-20">
        <Halftone variant="yellow" density="normal" opacity={0.2} />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="font-marker text-lg text-sr-yellow" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
            The origin story
          </p>
          <h1 className="mt-3 text-5xl sm:text-6xl md:text-7xl">
            Meet Shelley Jackson
          </h1>
          <p className="mt-6 text-xl text-white/95">{SHELLEY.tagline}</p>
        </div>
      </section>

      <section className="border-b-[3px] border-sr-black bg-sr-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-3">
          <ComicPanel className="overflow-hidden p-0 md:col-span-1" background="white">
            <img
              src={illoAbout}
              alt="Shelley Jackson in royal-blue blazer and red cape standing on a Las Vegas residential street."
              width={894}
              height={1192}
              className="block h-full w-full object-cover"
            />
          </ComicPanel>
          <div className="md:col-span-2">
            <SectionHeading as="h2" align="left">Twenty years on the ground.</SectionHeading>
            <div className="mt-6 space-y-4 text-lg text-sr-black/90">
              <p>
                I'm Shelley Jackson — a licensed Las Vegas REALTOR® and property manager with 20
                years on the ground in Southern Nevada. I help buyers find homes they'll love,
                sellers walk away with top dollar, and investors run rental portfolios without
                losing sleep.
              </p>
              <p>
                What makes me different? I don't just close deals — I build the kind of
                relationships where you're calling me five years from now to help your sister buy
                her first place. Real estate is a long game. I play it that way.
              </p>
              <p className="font-display text-2xl uppercase text-sr-red">
                Your goals. My mission. Let's make your next move legendary.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Superpowers />
      <Different />
      <ServiceArea />

      <section className="border-b-[3px] border-sr-black bg-sr-yellow py-14">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
          <ComicPanel className="overflow-hidden p-0" background="white">
            <img
              src={shelleyPhoto}
              alt="Shelley Jackson, Las Vegas REALTOR®"
              width={600}
              height={800}
              className="block h-full w-full object-cover"
            />
          </ComicPanel>
          <div className="text-center md:text-left">
            <h2 className="text-3xl text-sr-black sm:text-4xl">Ready to talk?</h2>
            <p className="mt-2 text-base text-sr-black/85">One business day. Real answers.</p>
            <div className="mt-6">
              <ComicLink to="/contact" variant="secondary" size="lg">Contact Shelley →</ComicLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Superpowers() {
  const items = [
    { icon: Home, t: "Residential expertise", b: "Buying & selling across Vegas, Henderson, Summerlin, North Las Vegas." },
    { icon: Building2, t: "Property management", b: "20 years protecting owners' assets and income." },
    { icon: MapPin, t: "Local market knowledge", b: "Neighborhood-by-neighborhood pricing, trends & timing." },
    { icon: Zap, t: "Fast communication", b: "You call. I answer. Imagine that." },
    { icon: Shield, t: "Client advocacy", b: "I negotiate hard, because it's your money." },
  ];
  return (
    <section className="border-b-[3px] border-sr-black bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker="The superpowers" as="h2">My superpowers</SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <ComicPanel key={it.t} background={i % 2 === 0 ? "cream" : "white"} className="p-6">
              <div className="mb-3 inline-flex h-14 w-14 items-center justify-center border-comic-thin bg-sr-yellow shadow-comic-sm">
                <it.icon className="h-7 w-7 text-sr-black" aria-hidden />
              </div>
              <h3 className="text-xl text-sr-black">{it.t}</h3>
              <p className="mt-2 text-sm text-sr-black/85">{it.b}</p>
            </ComicPanel>
          ))}
        </div>
      </div>
    </section>
  );
}

function Different() {
  return (
    <section className="relative overflow-hidden border-b-[3px] border-sr-black bg-sr-cream py-16 sm:py-20">
      <Halftone variant="blue" density="sparse" opacity={0.1} />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading kicker="The difference" as="h2">What makes me different</SectionHeading>
        <div className="mt-10 space-y-6 text-lg text-sr-black/90">
          <p>
            <strong className="font-display text-2xl uppercase text-sr-red">Honesty over hype.</strong>{" "}
            I'll tell you if a house is overpriced. I'll tell you if your listing strategy needs work.
            You don't pay me to nod along.
          </p>
          <p>
            <strong className="font-display text-2xl uppercase text-sr-red">Speed without sacrifice.</strong>{" "}
            Twenty years of pattern recognition means I move fast — without missing the details that
            cost you money.
          </p>
          <p>
            <strong className="font-display text-2xl uppercase text-sr-red">Relationships, not transactions.</strong>{" "}
            The best clients call me again. And again. And then send their friends.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  return (
    <section className="border-b-[3px] border-sr-black bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <SectionHeading kicker="Where I work" as="h2" align="left">Service area</SectionHeading>
          <p className="mt-6 text-lg text-sr-black/90">{SHELLEY.serviceArea}.</p>
          <ul className="mt-6 grid grid-cols-2 gap-2 font-display text-lg uppercase text-sr-black">
            {SHELLEY.cities.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <Burst size={20} color="yellow" /> {c}
              </li>
            ))}
          </ul>
        </div>
        <ComicPanel className="aspect-[4/3] overflow-hidden p-0" background="cream">
          <VegasMap />
        </ComicPanel>
      </div>
    </section>
  );
}

function VegasMap() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-label="Map of Las Vegas service area">
      <rect width="400" height="300" fill="var(--color-sr-paper)" />
      {/* Mountains */}
      <path d="M0 220 L60 160 L120 200 L180 140 L250 190 L320 150 L400 200 L400 300 L0 300 Z" fill="var(--color-sr-black)" opacity="0.1" />
      {/* The Strip */}
      <line x1="200" y1="80" x2="220" y2="240" stroke="var(--color-sr-red)" strokeWidth="4" strokeDasharray="6 4" />
      {/* City markers */}
      {[
        { x: 200, y: 130, label: "Las Vegas" },
        { x: 250, y: 220, label: "Henderson" },
        { x: 130, y: 150, label: "Summerlin" },
        { x: 210, y: 70, label: "N. Las Vegas" },
      ].map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r="6" fill="var(--color-sr-yellow)" stroke="var(--color-sr-black)" strokeWidth="2" />
          <text x={c.x + 10} y={c.y + 4} fontFamily="Bangers, sans-serif" fontSize="14" fill="var(--color-sr-black)">
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
