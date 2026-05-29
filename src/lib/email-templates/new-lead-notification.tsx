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

interface NewLeadNotificationProps {
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

const NewLeadNotification = ({
  fullName = "—",
  email = "—",
  phone,
  interest,
  preferredContactMethod,
  bestTimeToContact,
  message,
  sourcePath,
  leadId,
}: NewLeadNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New lead: {fullName} — {labelize(interest)}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={banner}>
          <Text style={kicker}>NEW LEAD · {SITE_NAME}</Text>
          <Heading style={h1}>{fullName} wants to talk.</Heading>
        </Section>

        <Section style={card}>
          <Row label="Name" value={fullName} />
          <Row label="Email" value={email} />
          <Row label="Phone" value={phone || "—"} />
          <Row label="Interest" value={labelize(interest)} />
          <Row label="Preferred contact" value={labelize(preferredContactMethod)} />
          <Row label="Best time to contact" value={labelize(bestTimeToContact)} />
          <Row label="Source page" value={sourcePath || "—"} />
          {leadId ? <Row label="Lead ID" value={leadId} /> : null}
        </Section>

        {message ? (
          <Section style={messageCard}>
            <Text style={messageLabel}>Message</Text>
            <Text style={messageBody}>{message}</Text>
          </Section>
        ) : null}

        <Hr style={hr} />
        <Text style={footer}>
          Sent automatically by {SITE_NAME}. Reply directly to the lead at{" "}
          {email}.
        </Text>
      </Container>
    </Body>
  </Html>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={rowText}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value}</span>
  </Text>
);

export const template = {
  component: NewLeadNotification,
  subject: (data: Record<string, unknown>) =>
    `New lead: ${(data?.fullName as string) ?? "Website visitor"}${
      data?.interest ? ` (${labelize(data.interest as string)})` : ""
    }`,
  displayName: "New lead notification",
  to: "shelleyjackson@gmail.com",
  previewData: {
    fullName: "Jane Buyer",
    email: "jane@example.com",
    phone: "(702) 555-0123",
    interest: "buying",
    preferredContactMethod: "phone",
    bestTimeToContact: "morning",
    message: "Looking for a 3-bed in Summerlin under $700k. Cash buyer.",
    sourcePath: "/",
    leadId: "00000000-0000-0000-0000-000000000000",
  },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};
const container = { padding: "24px", maxWidth: "560px", margin: "0 auto" };
const banner = {
  backgroundColor: "#FFD400",
  border: "3px solid #0a0a0a",
  padding: "18px 20px",
  marginBottom: "20px",
};
const kicker = {
  fontSize: "11px",
  letterSpacing: "0.12em",
  fontWeight: 700,
  color: "#0a0a0a",
  margin: "0 0 6px",
};
const h1 = {
  fontSize: "22px",
  lineHeight: "1.2",
  fontWeight: 800,
  color: "#0a0a0a",
  margin: 0,
};
const card = {
  border: "3px solid #0a0a0a",
  padding: "16px 18px",
  backgroundColor: "#FFF8E7",
};
const rowText = { fontSize: "14px", color: "#0a0a0a", margin: "0 0 6px" };
const rowLabel = { fontWeight: 700 };
const rowValue = { fontWeight: 400 };
const messageCard = {
  border: "3px solid #0a0a0a",
  padding: "16px 18px",
  backgroundColor: "#ffffff",
  marginTop: "16px",
};
const messageLabel = {
  fontSize: "11px",
  letterSpacing: "0.12em",
  fontWeight: 700,
  margin: "0 0 8px",
  color: "#0a0a0a",
};
const messageBody = { fontSize: "14px", color: "#0a0a0a", margin: 0, lineHeight: "1.5" };
const hr = { borderTop: "1px solid #e5e5e5", margin: "24px 0 12px" };
const footer = { fontSize: "12px", color: "#666", margin: 0 };
