---
paths:
  - "src/components/sections/Hero.tsx"
  - "public/hero-video/**"
---

# Hero — do not modify without being asked

The hero is finished. These values are load-bearing and have each been arrived at by trial.

- Timing constants are fixed: FIRST_HOLD_MS 1800, 3300ms cadence, HOLD 2500, SWIPE 400, PANE_REVEAL_VIDEO_S 3.75.
- The plate image must be the literal last frame of the shipped video; the start frame the literal first. A new video means re-extracting both and rebuilding all three panes.
- Pane overlays: zero alpha outside the glass polygon TL(1250,278) TR(1667,318) BR(1669,647) BL(1250,679). Clip by "drop pixels wholly outside", not "keep only pixels strictly inside" — those differ on the x=1250 column.
