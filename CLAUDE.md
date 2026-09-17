# insero_website

Marketing site for insero.cloud. Next.js App Router, React, TypeScript, Tailwind v4, Vercel.

## Before you touch anything

- **Never push to main and never deploy to production.** Ask first, every time. `main` is the live site.
- Active work is on `feat/hero-inzo-video`. `main` is many commits behind; merging is an unmade decision.
- For anything touching existing logic: investigate and report first. Don't commit until Speck has looked.
- Speck does all visual checks. You cannot reach localhost, Vercel previews, or his local drives.

## CSS gotchas that have each cost real time

- **`globals.css` has an unlayered `h1..h6 { color: var(--color-secondary) }` rule.** It outranks Tailwind utilities, so `text-white` or any `text-*` colour class on a heading is inert. Use an inline style or a `<span>` inside the heading. This has forced a workaround three times.
- **Tailwind v4 extracts class names statically.** A class name built at runtime (e.g. `X.replace('border-','divide-')`) never gets CSS emitted and fails silently.
- **`next/image` gates quality through `images.qualities` in next.config.ts.** Adding `quality={90}` without the config entry makes the image 400. Allowed values today: 75 and 90.
- **The carrier marquee reads `public/carriers` wholesale via readdirSync.** Anything dropped there appears on the site automatically.

## Brand and copy rules

Apply to all visible copy, button labels, headings and URLs.

- **Never name Speck personally.** Site copy says "we", "our", "Insero".
- **Never write "audit".** Use "analysis" or "review". Watch synonyms — "free assessment" is the same offer in different words.
- **Never promise a savings percentage.** "Often better pricing than going direct" is allowed.
- **Never bash a carrier by name.** We sell all of them.
- No fabricated testimonials, statistics or scenarios. Stats need a first-party source and a verification date.
- Avoid jargon customers don't share. "TA" is a current offender in visible copy.

## Colour rules

- Orange `#F97316` (`--color-accent`) is **decorative only** — 2.80:1 on white. Anything orange carrying or beside text uses `--color-accent-cta` `#C95000`.
- Service colours come in pairs. `--color-voice` / `--color-internet` / `--color-sdwan` / `--color-security` are fills only; all four fail AA on white. The `-text` variants are for anything a person reads.
- `--color-primary` `#008838` carries white text fine, but for small text on white use `--color-primary-dark` `#005C28`.

## Design tokens

`src/app/globals.css` `:root` is the single source of truth for every colour, font, spacing and radius value.

When any token there changes, remind Speck to re-sync the Insero Brand Style Guide. It's a separate hosted document that does not update itself, and it has drifted before. Do not attempt to update it from here.

`src/app/style-guide/page.tsx` has fallen out of sync with the tokens and should eventually be generated from them.
