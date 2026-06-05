import { useEffect, useState } from "react";
import { ComicButton } from "@/components/comic/ComicButton";
import { SoundFx } from "@/components/comic/SoundFx";

type Interest = "buying" | "selling" | "leasing" | "property_management" | "exploring";
type ContactMethod = "phone" | "text" | "email";
type BestTime = "morning" | "afternoon" | "evening" | "anytime";

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  preferred_contact_method: ContactMethod;
  interest: Interest;
  best_time_to_contact: BestTime;
  message: string;
  /** honeypot — leave empty */
  website: string;
}

const initial: FormState = {
  full_name: "",
  email: "",
  phone: "",
  preferred_contact_method: "email",
  interest: "exploring",
  best_time_to_contact: "anytime",
  message: "",
  website: "",
};

interface LeadFormProps {
  /** pre-populated from ?interest= URL param */
  defaultInterest?: Interest;
  className?: string;
}

const fieldClass =
  "block w-full border-comic-thin bg-white px-4 py-3 text-base text-sr-black placeholder:text-sr-black/40 focus:outline-none focus:ring-0";

export function LeadForm({ defaultInterest, className = "" }: LeadFormProps) {
  const [form, setForm] = useState<FormState>({ ...initial, interest: defaultInterest ?? "exploring" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (defaultInterest) setForm((f) => ({ ...f, interest: defaultInterest }));
  }, [defaultInterest]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.full_name.trim()) e.full_name = "Please share your name.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (form.message.length > 500) e.message = "Please keep it under 500 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function formatPhone(raw: string) {
    let d = raw.replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
    d = d.slice(0, 10);
    if (d.length < 4) return d;
    if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (form.website) return; // honeypot
    if (!validate()) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/public/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source_path: typeof window !== "undefined" ? window.location.pathname : "",
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Something went wrong." }));
        throw new Error(body.error ?? `Request failed (${res.status}).`);
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`border-comic bg-white p-8 text-center shadow-comic ${className}`}>
        <SoundFx text="WHOOSH!" rotation={-8} color="yellow" size="lg" />
        <p className="mt-6 text-xl text-sr-black">
          Your signal is on its way to Shelley.
        </p>
        <p className="mt-2 text-base text-sr-black/80">
          Expect a reply within one business day. — Shelley
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Contact Shelley" className={`border-comic bg-white p-6 shadow-comic sm:p-8 ${className}`}>
      {/* Honeypot — hidden from real users */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name *" htmlFor="full_name" error={errors.full_name}>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            onBlur={validate}
            aria-invalid={!!errors.full_name}
            className={fieldClass}
          />
        </Field>

        <Field label="Email *" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={validate}
            aria-invalid={!!errors.email}
            className={fieldClass}
          />
        </Field>

        <Field label="Phone (optional)" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(702) 555-1234"
            value={form.phone}
            onChange={(e) => update("phone", formatPhone(e.target.value))}
            className={fieldClass}
          />
        </Field>

        <Field label="I'm interested in" htmlFor="interest">
          <select
            id="interest"
            name="interest"
            value={form.interest}
            onChange={(e) => update("interest", e.target.value as Interest)}
            className={fieldClass}
          >
            <option value="buying">Buying a home</option>
            <option value="selling">Selling a home</option>
            <option value="leasing">Leasing / renting</option>
            <option value="property_management">Property management</option>
            <option value="exploring">Just exploring</option>
          </select>
        </Field>

        <Field label="Best time to contact" htmlFor="best_time_to_contact">
          <select
            id="best_time_to_contact"
            name="best_time_to_contact"
            value={form.best_time_to_contact}
            onChange={(e) => update("best_time_to_contact", e.target.value as BestTime)}
            className={fieldClass}
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="anytime">Anytime</option>
          </select>
        </Field>

        <fieldset className="sm:col-span-1">
          <legend className="mb-2 block font-display text-base uppercase tracking-wide text-sr-black">
            Preferred contact method *
          </legend>
          <div className="flex flex-wrap gap-2">
            {(["phone", "text", "email"] as ContactMethod[]).map((m) => (
              <label
                key={m}
                className={`inline-flex cursor-pointer items-center gap-2 border-comic-thin px-3 py-2 text-sm uppercase tracking-wide ${
                  form.preferred_contact_method === m
                    ? "bg-sr-yellow shadow-comic-sm"
                    : "bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="preferred_contact_method"
                  value={m}
                  checked={form.preferred_contact_method === m}
                  onChange={() => update("preferred_contact_method", m)}
                  className="sr-only"
                />
                <span className="font-display">{m}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-5">
        <Field label="Tell Shelley a bit more (optional)" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={500}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={fieldClass}
          />
          <div className="mt-1 text-right text-xs text-sr-black/60">{form.message.length}/500</div>
        </Field>
      </div>

      {status === "error" && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-4 border-comic-thin bg-sr-red px-4 py-3 text-white"
        >
          {errorMsg}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <ComicButton type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send the Signal →"}
        </ComicButton>
        <p className="text-xs text-sr-black/60">
          No spam. No popups. One business-day reply.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-display text-base uppercase tracking-wide text-sr-black">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" aria-live="polite" className="mt-1 text-sm text-sr-red">
          {error}
        </p>
      )}
    </div>
  );
}
