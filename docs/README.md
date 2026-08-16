# docs/

Internal reference material that ships with the repo but is **never served**.

Next.js serves `public/` at the site root, so anything in there is a public URL
whether or not it is linked. `insero-style-guide_2026.html` lived there and was
reachable at `https://insero.cloud/insero-style-guide_2026.html` — 1.1 MB, no
way to attach a robots meta tag to a static file, and nothing pointing at it
except anyone who happened to have the URL.

Nothing in this directory is read by the build. Open the files directly from
disk (`file://`) — the style guide is self-contained apart from two Google
Fonts links, so it renders the same from here as it did when it was served.

The two live style-guide routes, `/style-guide` and `/icon-preview`, are
handled differently: they stay in `src/app` and return 404 in production via a
`notFound()` guard in each route's `layout.tsx`. They work normally under
`next dev` and on preview deployments.
