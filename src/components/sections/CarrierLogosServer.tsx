import fs from 'fs';
import path from 'path';
import { CarrierLogosClient } from './CarrierLogos';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

// White / inverse logo variants, kept in the repo for dark sections but never
// shown in this carousel.
const INVERSE_VARIANT = /(white|inverse|reverse)/i;

function getCarrierLogos() {
  const carriersDir = path.join(process.cwd(), 'public', 'carriers');

  // Check if directory exists
  if (!fs.existsSync(carriersDir)) {
    return [];
  }

  const files = fs.readdirSync(carriersDir);

  const logos = files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      if (!IMAGE_EXTENSIONS.includes(ext)) return false;
      // Inverse variants exist for dark sections. This carousel sits on a light
      // background, where a white-on-transparent mark renders as nothing.
      return !INVERSE_VARIANT.test(path.basename(file, ext));
    })
    .map((file) => {
      // Official partner-portal exports are named like
      // "Zoom_Logo_Bloom_RGB" or "RingCentral_Logo_(Color)". Everything from
      // "_Logo" onwards is export metadata, not a brand name, so cut it.
      const raw = path.basename(file, path.extname(file));
      const name = raw.replace(/[_-]?Logo.*$/i, '').replace(/[_-]+/g, ' ').trim() || raw;
      return {
        name,
        file,
      };
    })
    // Sort alphabetically by name
    .sort((a, b) => a.name.localeCompare(b.name));

  return logos;
}

export function CarrierLogos() {
  const logos = getCarrierLogos();
  return <CarrierLogosClient logos={logos} />;
}

export default CarrierLogos;
