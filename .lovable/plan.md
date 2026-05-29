## Likeness revision — Step 1 only

Confirming the workflow. This plan covers ONLY Step 1 (homepage hero). Steps 2–3 will run as separate turns after explicit approval.

### Step 1 action

1. Copy uploaded reference to `/tmp/shelley-ref.png` (likeness anchor only — not used as style/color source).
2. Call `imagegen--edit_image` with TWO inputs:
   - `src/assets/hero-shelley.jpg` (base — preserves everything)
   - `/tmp/shelley-ref.png` (face/hair likeness reference)
3. Save result to `src/assets/hero-shelley.jpg` (overwrite — same import path, no code changes needed).
4. Aspect ratio: match existing hero's ratio.

### Prompt direction for edit_image

Preserve from base image (hero-shelley.jpg), do not change:
- 1960s pop-art comic style, halftone dots, bold black outlines
- Pose, composition, background, props, SR shield
- Royal blue blazer, RED cape (not magenta), standard lip color
- All comic bursts, sunbursts, halftone treatments
- Aspect ratio and framing

Update ONLY the character's face and hair to resemble the second reference image:
- Long blonde hair, soft side-swept waves
- Blue eyes
- Refined facial features per reference
- Warm, approachable expression

Explicitly ignore the reference's art style, magenta cape, and hot pink lipstick.

### Hard stop

After the revised hero is written, surface it and STOP. Do not touch the other 7 illustrations until you reply with "revised hero approved, propagate to the other 7".

### Step 2 & 3 (deferred — for reference only, not executed now)

When approved, re-edit each of the following one at a time, passing the revised `hero-shelley.jpg` as the character reference alongside the existing illustration as the base:
- illo-about.jpg
- illo-buyers.jpg
- illo-sellers.jpg
- illo-leasing.jpg
- illo-property-management.jpg
- illo-contact.jpg
- illo-faq.jpg
- shelley-photo.png (real photo — confirm whether this should be touched; my read is NO since it's the real photo asset, not an illustration)

Please confirm whether `shelley-photo.png` is in or out of scope before Step 3.