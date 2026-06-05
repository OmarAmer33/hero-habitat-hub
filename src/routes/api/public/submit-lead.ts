import { z } from "zod";
import * as React from "react";
import { render } from "@react-email/components";
import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { TEMPLATES } from "@/lib/email-templates/registry";

/**
 * Public lead submission endpoint.
 *
 * - Validates input with Zod
 * - Honeypot trip → silent success
 * - Rate limit: 5 inserts / hour / IP → 429 + Retry-After: 3600
 * - Inserts into public.leads
 * - Enqueues a transactional notification email to NOTIFY_EMAIL via the
 *   email queue (service-role; never fails the submission).
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
  website: z.string().max(0).optional(), // honeypot
});

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600;
const NOTIFY_EMAIL = "shelleyjackson@gmail.com";

// Must match the constants baked into src/routes/lovable/email/transactional/send.ts
const SITE_NAME = "Super Realtor";
const SENDER_DOMAIN = "notify.superrealtor.com";
const FROM_DOMAIN = "superrealtor.com";

function getClientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function checkAndIncrementRateLimit(ip: string): Promise<{ allowed: boolean; retryAfter: number }> {
  const now = new Date();
  const windowStartCutoff = new Date(now.getTime() - RATE_LIMIT_WINDOW_SECONDS * 1000);

  const { data: existing } = await supabaseAdmin
    .from("lead_rate_limit")
    .select("ip, window_start, count")
    .eq("ip", ip)
    .maybeSingle();

  if (!existing || new Date(existing.window_start) < windowStartCutoff) {
    await supabaseAdmin
      .from("lead_rate_limit")
      .upsert({ ip, window_start: now.toISOString(), count: 1 }, { onConflict: "ip" });
    return { allowed: true, retryAfter: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX) {
    const elapsedSec = Math.floor((now.getTime() - new Date(existing.window_start).getTime()) / 1000);
    const retryAfter = Math.max(1, RATE_LIMIT_WINDOW_SECONDS - elapsedSec);
    return { allowed: false, retryAfter };
  }

  await supabaseAdmin
    .from("lead_rate_limit")
    .update({ count: existing.count + 1 })
    .eq("ip", ip);
  return { allowed: true, retryAfter: 0 };
}

async function enqueueNewLeadNotification(lead: Record<string, any>, leadId: string) {
  try {
    const template = TEMPLATES["new-lead-notification"];
    if (!template) {
      console.warn("[submit-lead] template not registered; skipping email");
      return;
    }

    const templateData = {
      fullName: lead.full_name,
      email: lead.email,
      phone: lead.phone,
      interest: lead.interest,
      preferredContactMethod: lead.preferred_contact_method,
      bestTimeToContact: lead.best_time_to_contact,
      message: lead.message,
      sourcePath: lead.source_path,
      leadId,
    };

    const messageId = crypto.randomUUID();
    const element = React.createElement(template.component, templateData);
    const html = await render(element);
    const text = await render(element, { plainText: true });
    const subject =
      typeof template.subject === "function" ? template.subject(templateData) : template.subject;

    // Get-or-create a single unsubscribe token for NOTIFY_EMAIL.
    // The email API rejects transactional sends without one.
    const normalizedRecipient = NOTIFY_EMAIL.toLowerCase();
    let unsubscribeToken: string | undefined;
    {
      const { data: existing } = await supabaseAdmin
        .from("email_unsubscribe_tokens")
        .select("token, used_at")
        .eq("email", normalizedRecipient)
        .maybeSingle();

      if (existing?.token && !existing.used_at) {
        unsubscribeToken = existing.token;
      } else if (!existing) {
        const newToken = crypto.randomUUID().replace(/-/g, "") + crypto.randomUUID().replace(/-/g, "");
        await supabaseAdmin
          .from("email_unsubscribe_tokens")
          .upsert(
            { token: newToken, email: normalizedRecipient },
            { onConflict: "email", ignoreDuplicates: true }
          );
        // Re-read to handle race where another insert won.
        const { data: stored } = await supabaseAdmin
          .from("email_unsubscribe_tokens")
          .select("token")
          .eq("email", normalizedRecipient)
          .maybeSingle();
        unsubscribeToken = stored?.token ?? newToken;
      } else {
        // Token exists but is used — recipient previously unsubscribed.
        console.warn("[submit-lead] NOTIFY_EMAIL has used unsubscribe token; skipping send");
        return;
      }
    }

    // Log pending first so we have a record even if enqueue fails.
    await supabaseAdmin.from("email_send_log").insert({
      message_id: messageId,
      template_name: "new-lead-notification",
      recipient_email: NOTIFY_EMAIL,
      status: "pending",
    });

    const { error: enqueueError } = await supabaseAdmin.rpc("enqueue_email", {
      queue_name: "transactional_emails",
      payload: {
        message_id: messageId,
        to: NOTIFY_EMAIL,
        from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
        sender_domain: SENDER_DOMAIN,
        subject,
        html,
        text,
        purpose: "transactional",
        label: "new-lead-notification",
        idempotency_key: `new-lead-${leadId}`,
        unsubscribe_token: unsubscribeToken,
        queued_at: new Date().toISOString(),
      },
    });

    if (enqueueError) {
      console.error("[submit-lead] enqueue_email failed:", enqueueError);
      await supabaseAdmin.from("email_send_log").insert({
        message_id: messageId,
        template_name: "new-lead-notification",
        recipient_email: NOTIFY_EMAIL,
        status: "failed",
        error_message: enqueueError.message,
      });
    }
  } catch (err) {
    console.warn("[submit-lead] notification email skipped:", (err as Error).message);
  }
}

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

        // Honeypot trip — pretend success.
        if (parsed.data.website && parsed.data.website.length > 0) {
          return Response.json({ ok: true });
        }

        const ip = getClientIp(request);

        const rl = await checkAndIncrementRateLimit(ip);
        if (!rl.allowed) {
          return new Response(
            JSON.stringify({ error: "Too many submissions. Please try again later." }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": String(rl.retryAfter),
              },
            }
          );
        }

        const { data: inserted, error: insertErr } = await supabaseAdmin
          .from("leads")
          .insert({
            full_name: parsed.data.full_name,
            email: parsed.data.email,
            phone: parsed.data.phone || null,
            preferred_contact_method: parsed.data.preferred_contact_method,
            interest: parsed.data.interest,
            best_time_to_contact: parsed.data.best_time_to_contact,
            message: parsed.data.message || null,
            source_path: parsed.data.source_path || null,
            user_agent: parsed.data.user_agent || null,
          })
          .select()
          .single();

        if (insertErr || !inserted) {
          console.error("[submit-lead] Insert failed:", insertErr);
          return Response.json({ error: "Could not save your message." }, { status: 500 });
        }

        // Fire-and-forget notification email — never fails submission.
        await enqueueNewLeadNotification(inserted, inserted.id);

        return Response.json({ ok: true });
      },
    },
  },
});
