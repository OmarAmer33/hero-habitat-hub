import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Public lead submission endpoint.
 *
 * - Validates input with Zod
 * - Honeypot trip → silent success
 * - Rate limit: 5 inserts / hour / IP → 429 + Retry-After: 3600
 * - Inserts into public.leads
 * - Fires a fire-and-forget transactional email to shelleyjackson@gmail.com
 *   (silent no-op if the email endpoint isn't deployed yet)
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

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600;
const NOTIFY_EMAIL = "shelleyjackson@gmail.com";

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
    // Fresh window
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

async function fireNotificationEmail(origin: string, lead: Record<string, unknown>, leadId: string) {
  try {
    const res = await fetch(`${origin}/lovable/email/transactional/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Internal call — uses service role key as bearer for the send route.
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""}`,
      },
      body: JSON.stringify({
        templateName: "new-lead-notification",
        recipientEmail: NOTIFY_EMAIL,
        idempotencyKey: `new-lead-${leadId}`,
        templateData: {
          fullName: lead.full_name,
          email: lead.email,
          phone: lead.phone,
          interest: lead.interest,
          preferredContactMethod: lead.preferred_contact_method,
          bestTimeToContact: lead.best_time_to_contact,
          message: lead.message,
          sourcePath: lead.source_path,
          leadId,
        },
      }),
    });
    if (!res.ok) {
      console.warn("[submit-lead] notification email returned non-OK:", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    // Email infrastructure may not be deployed yet — never fail the submission on this.
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

        // Honeypot trip — pretend success so bots don't retry.
        if (parsed.data.website && parsed.data.website.length > 0) {
          return Response.json({ ok: true });
        }

        const ip = getClientIp(request);

        // Rate limit check
        const rl = await checkAndIncrementRateLimit(ip);
        if (!rl.allowed) {
          return new Response(
            JSON.stringify({
              error: "Too many submissions. Please try again later.",
            }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": String(rl.retryAfter),
              },
            }
          );
        }

        // Insert via supabaseAdmin
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

        // Fire-and-forget notification email (never fails the submission)
        const origin = new URL(request.url).origin;
        await fireNotificationEmail(origin, inserted, inserted.id);

        return Response.json({ ok: true });
      },
    },
  },
});
