/**
 * Single source of truth for Shelley's contact + brand facts.
 * All values flagged `CONFIRM WITH SHELLEY` are pending her final confirmation.
 */

export const SHELLEY = {
  name: "Shelley Jackson",
  title: "REALTOR®",
  license: "NV License S.0190593",
  brokerage: "Castle Rock Realty",
  yearsExperience: 20,
  phone: "(702) 906-3333",
  phoneHref: "tel:+17029063333",
  email: "shelley@superrealtor.com",
  emailHref: "mailto:shelley@superrealtor.com",
  // CONFIRM WITH SHELLEY
  hours: "Mon–Sat, 8am–8pm PT · Sun by appointment",
  serviceArea: "Las Vegas, Henderson, Summerlin, North Las Vegas & surrounding Southern Nevada",
  cities: ["Las Vegas", "Henderson", "Summerlin", "North Las Vegas"],
  googleBusinessUrl: "https://share.google/rYHmTtteXTK28HnfN",
  tagline: "Your real estate hero.",
  // CONFIRM WITH SHELLEY / Castle Rock Realty — exact required wording for Nevada
  brokerageDisclosure:
    "Each office is independently owned and operated. Equal Housing Opportunity. Information deemed reliable but not guaranteed.",
} as const;

export const SITE = {
  name: "SuperRealtor",
  fullName: "Super Realtor — Shelley Jackson",
  domain: "superrealtor.com",
  description:
    "Las Vegas real estate, supercharged. Buying, selling, leasing, and property management with 20 years of local expertise.",
} as const;
