import fs from 'fs';
import path from 'path';
import { CarrierLogosContinuousClient } from './CarrierLogosContinuous';

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

/**
 * Vendor logo variants that must not become slots.
 *
 * This folder is a drop-in on purpose: every image in public/carriers becomes a
 * slot, in filename order, with no allow-list to maintain. Adding a carrier is
 * adding a file. The cost is that a vendor's REVERSED logo — the white one cut
 * for dark backgrounds — becomes a slot of its own, and the marquee card is
 * white, so it loads fine, occupies its full fixed-width slot, and paints
 * nothing. The result is a hole exactly one logo wide that scrolls along with
 * everything else.
 *
 * Two were doing it: RingCentral_Logo_(White).svg, a single fill:#FFFFFF, and
 * Zoom_Logo_White_RGB.png, 52% opaque with 0% of it non-white. Both sort
 * immediately after their colour siblings under localeCompare, which is why the
 * gaps sat directly after the RingCentral and Zoom logos rather than anywhere
 * else in the run.
 *
 * Matched as a DELIMITED word, not a substring, so a carrier whose own name
 * contains one of these is not caught — this hits "(White)" and "_White_" but
 * not "Whitelabel". Kept as a pattern rather than two filenames because the
 * next reversed logo dropped in here would otherwise reopen the same hole with
 * nothing to explain it.
 *
 * The files stay on disk. They are the correct asset the day this section gets
 * a dark-background treatment; they are only wrong against white.
 */
const REVERSED_VARIANT = /(^|[^a-z])(white|reversed|reverse|knockout|inverse|inverted)([^a-z]|$)/i;

function getCarrierLogos() {
  const carriersDir = path.join(process.cwd(), 'public', 'carriers');
  if (!fs.existsSync(carriersDir)) return [];

  return fs.readdirSync(carriersDir)
    .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .filter((file) => !REVERSED_VARIANT.test(path.basename(file, path.extname(file))))
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
