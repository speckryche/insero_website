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

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    // Skip non-image files and SVGs (SVGs don't need resizing)
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
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
  console.log('');
}

main();
