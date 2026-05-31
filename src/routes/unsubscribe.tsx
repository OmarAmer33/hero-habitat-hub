import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
  head: () => ({
    meta: [
      { title: "Unsubscribe | Super Realtor" },
      {
        name: "description",
        content: "Unsubscribe from Super Realtor email notifications. One-click opt-out for transactional and update emails.",
      },
      { property: "og:title", content: "Unsubscribe | Super Realtor" },
      { property: "og:description", content: "Manage your Super Realtor email preferences and opt out of future messages." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type State =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

function UnsubscribePage() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (!t) {
      setState({ kind: "invalid" });
      return;
    }
    setToken(t);
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) return setState({ kind: "invalid" });
        if (j.valid === false && j.reason === "already_unsubscribed") {
          return setState({ kind: "already" });
        }
        if (j.valid) return setState({ kind: "ready" });
        setState({ kind: "invalid" });
      })
      .catch(() => setState({ kind: "invalid" }));
  }, []);

  const confirm = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const r = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.success) return setState({ kind: "success" });
      if (j.reason === "already_unsubscribed") return setState({ kind: "already" });
      setState({ kind: "error", message: j.error || "Something went wrong." });
    } catch (e) {
      setState({ kind: "error", message: (e as Error).message });
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-sr-cream px-4 py-16">
      <div className="w-full max-w-md border-comic-thin bg-white p-8 shadow-comic-sm">
        <h1 className="font-display text-3xl uppercase text-sr-black">Unsubscribe</h1>
        <div className="mt-4 text-sr-black/80">
          {state.kind === "loading" && <p>Checking your link…</p>}
          {state.kind === "invalid" && (
            <p>This unsubscribe link is invalid or expired.</p>
          )}
          {state.kind === "already" && (
            <p>You're already unsubscribed. No further emails will be sent.</p>
          )}
          {state.kind === "ready" && (
            <>
              <p>Click below to confirm you no longer want to receive these emails.</p>
              <button
                onClick={confirm}
                className="mt-6 inline-flex items-center border-comic-thin bg-sr-yellow px-6 py-3 font-display text-xl uppercase shadow-comic-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-comic-hover"
              >
                Confirm Unsubscribe
              </button>
            </>
          )}
          {state.kind === "submitting" && <p>Processing…</p>}
          {state.kind === "success" && (
            <p>You've been unsubscribed. We're sorry to see you go.</p>
          )}
          {state.kind === "error" && (
            <p className="text-sr-red">Error: {state.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
