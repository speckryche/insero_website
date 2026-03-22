import fs from 'fs';
import path from 'path';
import { CarrierLogosContinuousClient } from './CarrierLogosContinuous';

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

function getCarrierLogos() {
  const carriersDir = path.join(process.cwd(), 'public', 'carriers');

  if (!fs.existsSync(carriersDir)) {
    return [];
  }

  const files = fs.readdirSync(carriersDir);

  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    })
    .map((file) => ({
      name: path.basename(file, path.extname(file)),
      file,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function CarrierLogosContinuous() {
  const logos = getCarrierLogos();
  return <CarrierLogosContinuousClient logos={logos} />;
}
