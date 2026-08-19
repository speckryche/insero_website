import Image from 'next/image';

/**
 * The single place the Insero wordmark is named.
 *
 * Before this existed the filenames were retyped in the header (twice) and the
 * footer, as raw <img> tags. Three literals meant three files to edit for any
 * asset change, and no optimisation: the 1646x678 PNGs were shipped whole to
 * every device on every page, 378 KB of it, for a mark that never renders wider
 * than 194 CSS px.
 *
 * The rendered assets are 583x240 WebP, which is that 194px cap at 3x DPR. The
 * PNGs stay in public/ and are still the canonical source — the OG/JSON-LD
 * `logo` in app/layout.tsx points at one, and the lead-magnet PDF reads the
 * other off disk as base64. Neither of those can consume WebP, so deleting the
 * PNGs would break both.
 *
 * A vector version is being commissioned. When it lands, changing the two
 * strings in LOGO_SOURCES is the whole migration: `unoptimized` derives from the
 * extension below, because /_next/image refuses to process SVG unless
 * `dangerouslyAllowSVG` is set, and would answer 400 rather than pass it
 * through. Do not drop that check when the paths change.
 */

export const LOGO_SOURCES = {
  /** For light backgrounds — dark ink. */
  light: '/insero-logo-light-with-tagline-retina.webp',
  /** For dark backgrounds — reversed to white. */
  dark: '/insero-logo-dark-with-tagline-retina.webp',
} as const;

export type LogoVariant = keyof typeof LOGO_SOURCES;

/**
 * Intrinsic pixel size of the assets above. Passed to next/image on every
 * render so the box is reserved before the bytes arrive; callers then size the
 * mark in CSS (`h-16 w-auto` and friends), which overrides these without
 * disturbing the reserved aspect ratio.
 */
export const LOGO_WIDTH = 583;
export const LOGO_HEIGHT = 240;

interface LogoProps {
  variant: LogoVariant;
  /** Never omit. This is a link to the homepage in both current call sites. */
  alt: string;
  className?: string;
  /** True only above the fold. The footer must not set it. */
  priority?: boolean;
}

export function Logo({ variant, alt, className, priority = false }: LogoProps) {
  const src = LOGO_SOURCES[variant];

  return (
    <Image
      src={src}
      alt={alt}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      unoptimized={src.endsWith('.svg')}
      className={className}
    />
  );
}
