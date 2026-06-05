## Goal

Keep the public-facing contact email on the site as `shelley@superrealtor.com`, but deliver lead-form notification emails to `shelleyjackson@gmail.com`.

## Changes

1. **`src/routes/api/public/submit-lead.ts`**
   - Change `NOTIFY_EMAIL` from `shelley@superrealtor.com` back to `shelleyjackson@gmail.com`. This is the internal recipient for new-lead notifications — never shown to site visitors.

2. **`src/content/shelley.ts`** — no change. `email` / `emailHref` stay as `shelley@superrealtor.com` so all displayed/`mailto:` links across the site continue to show the branded address.

## Notes

- Reply-to on the notification email (currently set to the lead's own email) is unchanged, so replying still goes to the prospect.
- No DB or template changes needed.
