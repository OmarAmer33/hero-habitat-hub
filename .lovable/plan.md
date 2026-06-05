## Problem

`formatPhone` in `src/components/forms/LeadForm.tsx` strips non-digits then `.slice(0, 10)`. When autofill provides `+1 702 906 3333`, digits become `17029063333` (11 digits). Slicing the first 10 keeps the leading country code `1` and drops the final digit → `(170) 290-6333`.

## Fix

In `formatPhone`, after stripping non-digits, drop a leading `1` when the result is 11 digits and starts with `1` (US country code). Then apply the existing 10-digit slice/format.

```ts
let d = raw.replace(/\D/g, "");
if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
d = d.slice(0, 10);
```

Single-file, presentation-only change. No server/validation changes needed.
