import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/comic/Logo";
import { SHELLEY, SITE } from "@/content/shelley";
import { Halftone } from "@/components/comic/Halftone";

export function Footer() {
  return (
    <footer className="mt-20 border-t-[3px] border-sr-black bg-sr-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo variant="stacked" height={36} />
          <p className="mt-4 font-marker text-lg text-sr-red" style={{ transform: "rotate(-1deg)", display: "inline-block" }}>
            {SHELLEY.tagline}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xl text-sr-black">Quick Links</h3>
          <ul className="space-y-1.5 text-base">
            {[
              ["/about", "About"],
              ["/services", "Services"],
              ["/buyers", "Buyers"],
              ["/sellers", "Sellers"],
              ["/property-management", "Property Management"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-sr-black underline-offset-4 hover:text-sr-red hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xl text-sr-black">Contact</h3>
          <ul className="space-y-1.5 text-base">
            <li>
              <a href={SHELLEY.phoneHref} className="text-sr-black underline-offset-4 hover:text-sr-red hover:underline">
                {SHELLEY.phone}
              </a>
            </li>
            <li>
              <a href={SHELLEY.emailHref} className="text-sr-black underline-offset-4 hover:text-sr-red hover:underline">
                {SHELLEY.email}
              </a>
            </li>
            <li className="text-sr-black">{SHELLEY.serviceArea}</li>
            <li>
              <a
                href={SHELLEY.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sr-black underline-offset-4 hover:text-sr-red hover:underline"
              >
                Google Business ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance band */}
      <div className="relative overflow-hidden border-y-[3px] border-sr-black bg-sr-cream">
        <Halftone variant="blue" density="dense" opacity={0.08} />
        <div className="relative mx-auto max-w-7xl px-4 py-6 text-center text-xs sm:px-6 sm:text-sm">
          <p className="font-semibold uppercase tracking-wide text-sr-black">
            {SHELLEY.name}, {SHELLEY.title} · {SHELLEY.license} · {SHELLEY.brokerage}
          </p>
          <p className="mt-1 text-sr-black/80">{SHELLEY.brokerageDisclosure}</p>
          <div className="mt-3 flex items-center justify-center gap-4" aria-label="Compliance marks">
            <EhoMark />
            <RealtorMark />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-sr-black/70 sm:px-6">
        © {new Date().getFullYear()} {SITE.name}.com ·{" "}
        <Link to="/privacy" className="underline-offset-4 hover:underline">Privacy</Link> ·{" "}
        <Link to="/terms" className="underline-offset-4 hover:underline">Terms</Link>
      </div>
    </footer>
  );
}

/* Simplified Equal Housing Opportunity mark */
function EhoMark() {
  return (
    <svg width="46" height="46" viewBox="0 0 64 64" role="img" aria-label="Equal Housing Opportunity">
      <rect x="2" y="2" width="60" height="60" rx="4" fill="none" stroke="var(--color-sr-black)" strokeWidth="2.5" />
      <path d="M32 14 L52 30 H46 V50 H18 V30 H12 Z" fill="var(--color-sr-black)" />
      <text x="32" y="60" textAnchor="middle" fontSize="6" fill="var(--color-sr-black)" fontWeight="bold">EHO</text>
    </svg>
  );
}

/* Simplified REALTOR® mark */
function RealtorMark() {
  return (
    <svg width="46" height="46" viewBox="0 0 64 64" role="img" aria-label="REALTOR®">
      <rect x="2" y="2" width="60" height="60" rx="4" fill="var(--color-sr-blue)" stroke="var(--color-sr-black)" strokeWidth="2.5" />
      <text x="32" y="40" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="22" fill="white">
        R
      </text>
      <text x="32" y="56" textAnchor="middle" fontSize="6" fill="white" fontWeight="bold">REALTOR®</text>
    </svg>
  );
}
