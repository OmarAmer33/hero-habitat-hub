import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";

/**
 * Public lead submission endpoint.
 *
 * Wired and ready. Activates fully once Lovable Cloud is enabled and the
 * `leads` table + email infra are provisioned. Until then, returns a 503
 * with a clear message so the UI can surface a friendly fallback.
 */

const InterestEnum = z.enum(["buying", "selling", "leasing", "property_management", "exploring"]);
const ContactMethodEnum = z.enum(["phone", "text", "email"]);
const BestTimeEnum = z.enum(["morning", "afternoon", "evening", "anytime"]);

const LeadSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  preferred_contact_method: ContactMethodEnum.default("email"),
  interest: InterestEnum,
  best_time_to_contact: BestTimeEnum.default("anytime"),
  message: z.string().trim().max(500).optional().or(z.literal("")),
  source_path: z.string().max(255).optional(),
  user_agent: z.string().max(500).optional(),
  // honeypot
  website: z.string().max(0).optional(),
});

export const Route = createFileRoute("/api/public/submit-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body." }, { status: 400 });
        }

        const parsed = LeadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed.", issues: parsed.error.flatten() },
            { status: 400 }
          );
        }

        // Honeypot trip — pretend success so bots don't retry.
        if (parsed.data.website && parsed.data.website.length > 0) {
          return Response.json({ ok: true });
        }

        // TODO(Cloud): once Lovable Cloud is enabled, insert into public.leads via supabaseAdmin
        // and enqueue a transactional email to shelleyjackson@gmail.com.
        // For now, log to server output so submissions during testing are visible.
        const url = process.env.SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !serviceKey) {
          console.warn("[submit-lead] Lovable Cloud not yet enabled. Lead received but not stored:", parsed.data);
          return Response.json(
            {
              error:
                "We're putting the finishing touches on our system. Please call or email Shelley directly for now.",
            },
            { status: 503 }
          );
        }

        // Insert via Supabase REST (no SDK required for a single insert).
        const insertRes = await fetch(`${url}/rest/v1/leads`, {
          method: "POST",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            full_name: parsed.data.full_name,
            email: parsed.data.email,
            phone: parsed.data.phone || null,
            preferred_contact_method: parsed.data.preferred_contact_method,
            interest: parsed.data.interest,
            best_time_to_contact: parsed.data.best_time_to_contact,
            message: parsed.data.message || null,
            source_path: parsed.data.source_path || null,
            user_agent: parsed.data.user_agent || null,
          }),
        });

        if (!insertRes.ok) {
          const text = await insertRes.text();
          console.error("[submit-lead] Insert failed:", insertRes.status, text);
          return Response.json({ error: "Could not save your message." }, { status: 500 });
        }

        // TODO(Cloud-Emails): trigger Lovable Email template `new-lead-notification`
        // to shelleyjackson@gmail.com once email infra is provisioned.

        return Response.json({ ok: true });
      },
    },
  },
});
