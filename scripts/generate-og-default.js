// Generates /public/og-default.png (1200x630) — the default Open Graph image
// referenced by root metadata. Per-page OGs override this.
//
// Run manually: node scripts/generate-og-default.js
// (Not wired into prebuild — regenerate when brand/copy changes.)

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const SVG_PATH = path.join(PUBLIC_DIR, 'og-default.svg');
const PNG_PATH = path.join(PUBLIC_DIR, 'og-default.png');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#008838" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#008838" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0L0 0 0 48" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.045"/>
    </pattern>
  </defs>

  <!-- Background: brand secondary -->
  <rect width="1200" height="630" fill="#1a2530"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Decorative accent shapes -->
  <circle cx="1080" cy="80" r="180" fill="#008838" fill-opacity="0.10"/>
  <circle cx="120" cy="550" r="140" fill="#1FA855" fill-opacity="0.06"/>

  <!-- Wordmark -->
  <text x="600" y="220" fill="#ffffff"
    font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="140" font-weight="800" text-anchor="middle" letter-spacing="-3">INSERO</text>

  <!-- Eyebrow -->
  <text x="600" y="285" fill="#1FA855"
    font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="22" font-weight="600" text-anchor="middle" letter-spacing="10">TELECOM BROKERAGE</text>

  <!-- Accent bar -->
  <rect x="560" y="335" width="80" height="4" rx="2" fill="#008838"/>

  <!-- Tagline -->
  <text x="600" y="425" fill="#ffffff"
    font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="46" font-weight="700" text-anchor="middle">Voice. Internet. Redundancy.</text>
  <text x="600" y="490" fill="#1FA855"
    font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="38" font-weight="700" text-anchor="middle">At zero cost.</text>

  <!-- URL footer -->
  <text x="600" y="585" fill="#ffffff" fill-opacity="0.55"
    font-family="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20" font-weight="500" text-anchor="middle">insero.cloud</text>
</svg>`;

fs.writeFileSync(SVG_PATH, svg);

sharp(Buffer.from(svg), { density: 96 })
  .resize(1200, 630)
  .png({ compressionLevel: 9 })
  .toFile(PNG_PATH)
  .then((info) => {
    console.log(`Wrote ${PNG_PATH} (${info.width}x${info.height}, ${info.size} bytes)`);
  })
  .catch((err) => {
    console.error('Failed to generate og-default.png:', err);
    process.exit(1);
  });
