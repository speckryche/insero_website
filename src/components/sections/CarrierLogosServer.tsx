import fs from 'fs';
import path from 'path';
import { CarrierLogosClient } from './CarrierLogos';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

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
      return IMAGE_EXTENSIONS.includes(ext);
    })
    .map((file) => {
      // Extract name from filename (remove extension)
      const name = path.basename(file, path.extname(file));
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
