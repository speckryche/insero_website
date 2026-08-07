#!/usr/bin/env node

/**
 * Auto-resize carrier logos script
 * Runs automatically before build to ensure all PNG logos are consistently sized
 * SVG files are skipped (they scale perfectly)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CARRIERS_DIR = path.join(process.cwd(), 'public', 'carriers');
const MAX_DIMENSION = 400; // Max width or height in pixels
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg'];

/**
 * Full-resolution hero assets that must never be resized.
 *
 * This script rewrites files IN PLACE, so anything it touches loses its
 * original pixels permanently — a `git checkout` is the only way back. These
 * files live in the same directory as the carousel logos but are used as hero
 * marks on the provider landing pages, where they render against a much larger
 * box and need the headroom. They are deliberately above the cap.
 *
 * Filenames must match exactly, including case.
 */
const PRESERVE_FULL_RESOLUTION = [
  // /zoom hero — official partner-portal export, 1466x334. Was silently
  // crushed to 400x91 on every build before this exclusion existed.
  'Zoom_Logo_Bloom_RGB.png',
  // Inverse variant of the same export, kept for future dark-section use.
  // Currently 400x91; listed so a full-resolution replacement survives.
  'Zoom_Logo_White_RGB.png',
];

function getImageDimensions(filePath) {
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}" 2>/dev/null`, {
      encoding: 'utf-8'
    });
    const widthMatch = output.match(/pixelWidth:\s*(\d+)/);
    const heightMatch = output.match(/pixelHeight:\s*(\d+)/);
    if (widthMatch && heightMatch) {
      return {
        width: parseInt(widthMatch[1], 10),
        height: parseInt(heightMatch[1], 10)
      };
    }
  } catch (e) {
    // Ignore errors
  }
  return null;
}

function resizeImage(filePath) {
  try {
    execSync(`sips --resampleHeightWidthMax ${MAX_DIMENSION} "${filePath}" 2>/dev/null`, {
      encoding: 'utf-8'
    });
    return true;
  } catch (e) {
    return false;
  }
}

function main() {
  console.log('🖼️  Checking carrier logos...');

  if (!fs.existsSync(CARRIERS_DIR)) {
    console.log('   No carriers directory found, skipping.');
    return;
  }

  const files = fs.readdirSync(CARRIERS_DIR);
  let resizedCount = 0;
  let skippedCount = 0;
  let preservedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    // Skip non-image files and SVGs (SVGs don't need resizing)
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
      continue;
    }

    // Hero assets are exempt from the cap. Logged rather than skipped quietly,
    // so it is obvious in build output why one file is not being resized.
    if (PRESERVE_FULL_RESOLUTION.includes(file)) {
      console.log(`   🔒 Preserving ${file} (full-resolution hero asset, exempt from the ${MAX_DIMENSION}px cap)`);
      preservedCount++;
      continue;
    }

    const filePath = path.join(CARRIERS_DIR, file);
    const dimensions = getImageDimensions(filePath);

    if (!dimensions) {
      console.log(`   ⚠️  Could not read dimensions: ${file}`);
      continue;
    }

    const { width, height } = dimensions;
    const maxCurrent = Math.max(width, height);

    if (maxCurrent > MAX_DIMENSION) {
      console.log(`   📐 Resizing ${file} (${width}x${height} → max ${MAX_DIMENSION}px)`);
      if (resizeImage(filePath)) {
        resizedCount++;
      }
    } else {
      skippedCount++;
    }
  }

  if (resizedCount > 0) {
    console.log(`✅ Resized ${resizedCount} logo(s)`);
  }
  if (skippedCount > 0) {
    console.log(`✓  ${skippedCount} logo(s) already properly sized`);
  }
  if (preservedCount > 0) {
    console.log(`🔒 ${preservedCount} full-resolution hero asset(s) preserved`);
  }
  console.log('');
}

main();
