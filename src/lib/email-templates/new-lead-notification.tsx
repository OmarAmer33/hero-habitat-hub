import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "Super Realtor";

interface NewLeadProps {
  fullName?: string;
  email?: string;
  phone?: string | null;
  interest?: string;
  preferredContactMethod?: string;
  bestTimeToContact?: string;
  message?: string | null;
  sourcePath?: string | null;
  leadId?: string;
}

const labelize = (v?: string | null) =>
  v ? v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "—";

const NewLeadNotificationEmail = ({
  fullName,
  email,
  phone,
  interest,
  preferredContactMethod,
  bestTimeToContact,
  message,
  sourcePath,
  leadId,
}: NewLeadProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      New lead: {fullName ?? "Unknown"} ({labelize(interest)})
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={banner}>
          <Heading style={h1}>🦸 NEW LEAD!</Heading>
          <Text style={bannerSub}>A new contact just landed from {SITE_NAME}.</Text>
        </Section>

        <Section style={card}>
          <Row label="Name" value={fullName} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone || "—"} />
          <Row label="Interest" value={labelize(interest)} />
          <Row label="Preferred contact" value={labelize(preferredContactMethod)} />
          <Row label="Best time" value={labelize(bestTimeToContact)} />
          {message ? (
            <>
              <Hr style={hr} />
              <Text style={msgLabel}>Message</Text>
              <Text style={msgBody}>{message}</Text>
            </>
          ) : null}
          <Hr style={hr} />
          <Text style={meta}>
            Source: {sourcePath || "—"}
            <br />
            Lead ID: {leadId || "—"}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const Row = ({ label, value }: { label: string; value?: string | null }) => (
  <Text style={rowText}>
    <strong style={rowLabel}>{label}:</strong> {value || "—"}
  </Text>
);

export const template = {
  component: NewLeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `🦸 New lead: ${data.fullName ?? "Unknown"} (${labelize(data.interest)})`,
  displayName: "New lead notification",
  previewData: {
    fullName: "Jane Buyer",
    email: "jane@example.com",
    phone: "+1 702 555 0123",
    interest: "buying",
    preferredContactMethod: "phone",
    bestTimeToContact: "morning",
    message: "Looking for a 3-bed in Summerlin under $650k.",
    sourcePath: "/contact",
    leadId: "00000000-0000-0000-0000-000000000000",
  },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",
  padding: "24px 0",
};
const container = { maxWidth: "560px", margin: "0 auto", padding: "0 16px" };
const banner = {
  backgroundColor: "#FFD93D",
  border: "3px solid #111111",
  borderRadius: "6px",
  padding: "20px 24px",
  textAlign: "center" as const,
  boxShadow: "4px 4px 0 #111111",
};
const h1 = {
  fontFamily: "'Bangers', Impact, sans-serif",
  fontSize: "32px",
  letterSpacing: "1px",
  color: "#111111",
  margin: "0 0 6px",
};
const bannerSub = { fontSize: "14px", color: "#111111", margin: 0 };
const card = {
  marginTop: "20px",
  backgroundColor: "#FFF8E7",
  border: "3px solid #111111",
  borderRadius: "6px",
  padding: "20px 24px",
  boxShadow: "4px 4px 0 #111111",
};
const rowText = { fontSize: "14px", color: "#111111", margin: "6px 0", lineHeight: "1.5" };
const rowLabel = { color: "#111111" };
const msgLabel = {
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  color: "#555555",
  margin: "10px 0 4px",
};
const msgBody = {
  fontSize: "14px",
  color: "#111111",
  lineHeight: "1.55",
  margin: 0,
  whiteSpace: "pre-wrap" as const,
};
const hr = { borderColor: "#111111", borderWidth: "1px", margin: "16px 0" };
const meta = { fontSize: "11px", color: "#666666", margin: "8px 0 0", lineHeight: "1.5" };
