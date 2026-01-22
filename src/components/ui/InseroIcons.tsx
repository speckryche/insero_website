'use client';

import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Insero Icon System
 *
 * Design Language:
 * - Geometric, angular shapes inspired by the Insero logo
 * - Bold, chunky fills with sharp edges
 * - Beveled/faceted appearance suggesting depth
 * - Consistent 45° and 90° angles
 * - Tech-forward, modern aesthetic
 */

// Voice Connectivity - Angular headset with geometric sound waves
export function IconVoice({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Headband - angular arc */}
      <path d="M12 28V24C12 13.507 20.507 5 31 5H33C43.493 5 52 13.507 52 24V28H46V24C46 16.82 40.18 11 33 11H31C23.82 11 18 16.82 18 24V28H12Z" />
      {/* Left earpiece - chunky geometric */}
      <path d="M6 30H16V48H10C7.791 48 6 46.209 6 44V30Z" />
      <path d="M8 32H14V44H8V32Z" opacity="0.3" />
      {/* Right earpiece */}
      <path d="M48 30H58V44C58 46.209 56.209 48 54 48H48V30Z" />
      <path d="M50 32H56V44H50V32Z" opacity="0.3" />
      {/* Microphone boom - angular */}
      <path d="M48 44L40 44L36 52H28L34 40H48V44Z" />
      {/* Sound waves - sharp angular */}
      <path d="M26 20L30 16L34 20L30 24L26 20Z" opacity="0.6" />
      <path d="M34 14L38 10L42 14L38 18L34 14Z" opacity="0.4" />
    </svg>
  );
}

// Internet - Geometric globe with angular grid lines
export function IconInternet({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Globe base - octagonal for geometric feel */}
      <path d="M32 4L50.627 11.373L58 30V34L50.627 52.627L32 60L13.373 52.627L6 34V30L13.373 11.373L32 4Z" opacity="0.15" />
      {/* Horizontal bands */}
      <path d="M8 28H56V36H8V28Z" />
      <path d="M12 18H52V22H12V18Z" opacity="0.7" />
      <path d="M12 42H52V46H12V42Z" opacity="0.7" />
      {/* Vertical meridian */}
      <path d="M28 6H36V58H28V6Z" />
      {/* Corner nodes - geometric accents */}
      <rect x="10" y="10" width="6" height="6" />
      <rect x="48" y="10" width="6" height="6" />
      <rect x="10" y="48" width="6" height="6" />
      <rect x="48" y="48" width="6" height="6" />
      {/* Outer ring - angular */}
      <path d="M32 4L50.627 11.373L58 30V34L50.627 52.627L32 60L13.373 52.627L6 34V30L13.373 11.373L32 4ZM32 10L17.373 15.373L12 30V34L17.373 48.627L32 54L46.627 48.627L52 34V30L46.627 15.373L32 10Z" opacity="0.5" />
    </svg>
  );
}

// SD-WAN - Interconnected angular nodes with bold connections
export function IconNetwork({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Center node - diamond/square rotated */}
      <path d="M32 20L44 32L32 44L20 32L32 20Z" />
      {/* Top node */}
      <rect x="26" y="2" width="12" height="12" />
      {/* Bottom node */}
      <rect x="26" y="50" width="12" height="12" />
      {/* Left node */}
      <rect x="2" y="26" width="12" height="12" />
      {/* Right node */}
      <rect x="50" y="26" width="12" height="12" />
      {/* Connection paths - bold */}
      <path d="M30 14H34V20H30V14Z" />
      <path d="M30 44H34V50H30V44Z" />
      <path d="M14 30H20V34H14V30Z" />
      <path d="M44 30H50V34H44V30Z" />
      {/* Diagonal connections */}
      <path d="M44 8L52 16L48 20L40 12L44 8Z" opacity="0.6" />
      <path d="M20 8L12 16L16 20L24 12L20 8Z" opacity="0.6" />
      <path d="M44 56L52 48L48 44L40 52L44 56Z" opacity="0.6" />
      <path d="M20 56L12 48L16 44L24 52L20 56Z" opacity="0.6" />
    </svg>
  );
}

// Security - Faceted shield with geometric lock
export function IconSecurity({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Shield - angular, faceted */}
      <path d="M32 4L8 14V30C8 44.359 18.359 56.64 32 60C45.641 56.64 56 44.359 56 30V14L32 4Z" />
      {/* Shield facet highlight */}
      <path d="M32 4L8 14V30L32 38V4Z" opacity="0.2" />
      {/* Lock body - geometric cutout */}
      <rect x="22" y="30" width="20" height="16" rx="2" fill="white" />
      {/* Lock shackle - angular */}
      <path d="M26 30V24C26 20.686 28.686 18 32 18C35.314 18 38 20.686 38 24V30H34V24C34 22.895 33.105 22 32 22C30.895 22 30 22.895 30 24V30H26Z" fill="white" />
      {/* Keyhole - diamond shape */}
      <path d="M32 34L35 37L32 42L29 37L32 34Z" />
    </svg>
  );
}

// Calendar - Bold geometric with angular elements
export function IconCalendar({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Calendar body */}
      <path d="M8 18H56V56C56 58.209 54.209 60 52 60H12C9.791 60 8 58.209 8 56V18Z" />
      {/* Header */}
      <path d="M8 12C8 9.791 9.791 8 12 8H52C54.209 8 56 9.791 56 12V18H8V12Z" opacity="0.8" />
      {/* Hooks - chunky */}
      <rect x="18" y="4" width="6" height="12" rx="1" />
      <rect x="40" y="4" width="6" height="12" rx="1" />
      {/* Date grid - geometric */}
      <rect x="14" y="24" width="10" height="10" fill="white" />
      <rect x="27" y="24" width="10" height="10" fill="white" />
      <rect x="40" y="24" width="10" height="10" fill="white" />
      <rect x="14" y="37" width="10" height="10" fill="white" />
      <rect x="27" y="37" width="10" height="10" fill="white" />
      <rect x="40" y="37" width="10" height="10" fill="white" />
      {/* Selected date accent */}
      <rect x="27" y="24" width="10" height="10" opacity="0.3" />
    </svg>
  );
}

// Analyze - Angular magnifier with bar chart
export function IconAnalyze({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Magnifier glass - octagonal */}
      <path d="M26 6L38 6L46 14V26L38 34H26L18 26V14L26 6Z" />
      <path d="M26 12L38 12L42 16V24L38 28H26L22 24V16L26 12Z" fill="white" />
      {/* Handle - bold angular */}
      <path d="M40 34L58 52L52 58L34 40L40 34Z" />
      <path d="M42 38L54 50L52 52L40 40L42 38Z" opacity="0.3" />
      {/* Bar chart inside */}
      <rect x="25" y="22" width="4" height="6" />
      <rect x="30" y="18" width="4" height="10" />
      <rect x="35" y="20" width="4" height="8" />
    </svg>
  );
}

// Savings - Geometric piggy with angular features
export function IconSavings({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Body - rounded but angular */}
      <path d="M14 24C14 24 10 32 10 38C10 48 18 54 32 54C46 54 54 48 54 38C54 32 50 24 50 24C50 20 46 16 40 16H24C18 16 14 20 14 24Z" />
      {/* Coin slot - geometric */}
      <rect x="26" y="10" width="12" height="6" />
      {/* Ear - angular */}
      <path d="M50 22L58 18V28L50 24V22Z" />
      {/* Snout - rectangular */}
      <rect x="4" y="32" width="12" height="12" rx="2" />
      {/* Nostrils */}
      <rect x="6" y="35" width="3" height="3" fill="white" />
      <rect x="6" y="40" width="3" height="3" fill="white" />
      {/* Legs - chunky angular */}
      <rect x="18" y="50" width="8" height="10" />
      <rect x="38" y="50" width="8" height="10" />
      {/* Eye - geometric */}
      <path d="M44 28L48 32L44 36L40 32L44 28Z" fill="white" />
    </svg>
  );
}

// Dollar - Bold dollar in angular circle
export function IconDollar({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Octagonal background */}
      <path d="M24 4H40L56 20V44L40 60H24L8 44V20L24 4Z" />
      {/* Dollar sign - bold geometric */}
      <path d="M30 12H34V18H40C41.105 18 42 18.895 42 20V28H36V24H28V28L40 34V44C40 45.105 39.105 46 38 46H34V52H30V46H24C22.895 46 22 45.105 22 44V36H28V40H36V36L24 30V20C24 18.895 24.895 18 26 18H30V12Z" fill="white" />
    </svg>
  );
}

// Balance - Angular scale
export function IconBalance({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Center pillar */}
      <rect x="28" y="12" width="8" height="40" />
      {/* Base - angular */}
      <path d="M16 52H48L52 60H12L16 52Z" />
      {/* Beam */}
      <rect x="6" y="10" width="52" height="6" />
      {/* Triangle top */}
      <path d="M32 4L38 10H26L32 4Z" />
      {/* Left pan - angular bowl */}
      <path d="M6 20H22L18 36H10L6 20Z" />
      <path d="M8 22H20L17 32H11L8 22Z" opacity="0.3" />
      {/* Right pan */}
      <path d="M42 20H58L54 36H46L42 20Z" />
      <path d="M44 22H56L53 32H47L44 22Z" opacity="0.3" />
      {/* Chains - geometric */}
      <rect x="10" y="16" width="4" height="4" />
      <rect x="18" y="16" width="4" height="4" />
      <rect x="42" y="16" width="4" height="4" />
      <rect x="50" y="16" width="4" height="4" />
    </svg>
  );
}

// Clock - Geometric with angular hands
export function IconClock({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Outer ring - octagonal */}
      <path d="M24 4H40L56 20V44L40 60H24L8 44V20L24 4Z" />
      <path d="M26 10H38L50 22V42L38 54H26L14 42V22L26 10Z" fill="white" />
      {/* Hour markers - bold squares */}
      <rect x="30" y="12" width="4" height="6" />
      <rect x="30" y="46" width="4" height="6" />
      <rect x="12" y="30" width="6" height="4" />
      <rect x="46" y="30" width="6" height="4" />
      {/* Clock hands - angular */}
      <rect x="30" y="20" width="4" height="14" />
      <rect x="32" y="30" width="12" height="4" />
      {/* Center - diamond */}
      <path d="M32 26L38 32L32 38L26 32L32 26Z" />
    </svg>
  );
}

// Users - Geometric people
export function IconUsers({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Front person */}
      <circle cx="32" cy="18" r="10" />
      <path d="M18 58V44C18 36.268 24.268 30 32 30C39.732 30 46 36.268 46 44V58H18Z" />
      {/* Left person - behind */}
      <circle cx="14" cy="20" r="7" opacity="0.5" />
      <path d="M4 58V48C4 42.477 8.477 38 14 38C19.523 38 24 42.477 24 48V58H4Z" opacity="0.5" />
      {/* Right person - behind */}
      <circle cx="50" cy="20" r="7" opacity="0.5" />
      <path d="M40 58V48C40 42.477 44.477 38 50 38C55.523 38 60 42.477 60 48V58H40Z" opacity="0.5" />
    </svg>
  );
}

// Credit Card - Angular with chip detail
export function IconCreditCard({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Card body */}
      <rect x="4" y="12" width="56" height="40" rx="4" />
      {/* Magnetic stripe */}
      <rect x="4" y="20" width="56" height="10" opacity="0.3" />
      {/* Chip - geometric detail */}
      <rect x="12" y="34" width="14" height="10" fill="white" />
      <rect x="14" y="36" width="4" height="6" opacity="0.4" />
      <rect x="20" y="36" width="4" height="6" opacity="0.4" />
      {/* Card number placeholder */}
      <rect x="32" y="38" width="6" height="4" fill="white" opacity="0.6" />
      <rect x="40" y="38" width="6" height="4" fill="white" opacity="0.6" />
      <rect x="48" y="38" width="6" height="4" fill="white" opacity="0.6" />
      {/* Angular accent */}
      <path d="M52 12L60 12V20L52 12Z" opacity="0.2" />
    </svg>
  );
}

// Help/Question - Bold question in angular circle
export function IconHelp({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Octagonal background */}
      <path d="M24 4H40L56 20V44L40 60H24L8 44V20L24 4Z" />
      {/* Question mark - chunky */}
      <path d="M26 16H38C41.314 16 44 18.686 44 22V26C44 29.314 41.314 32 38 32H34V38H30V28H38V22H26V16Z" fill="white" />
      <rect x="30" y="42" width="4" height="6" fill="white" />
    </svg>
  );
}

// Building - Geometric skyscraper
export function IconBuilding({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Main tower */}
      <path d="M20 60V16L32 8L44 16V60H20Z" />
      {/* Tower top accent */}
      <path d="M32 8L44 16H20L32 8Z" opacity="0.3" />
      {/* Windows - geometric grid */}
      <rect x="26" y="20" width="6" height="6" fill="white" />
      <rect x="34" y="20" width="6" height="6" fill="white" />
      <rect x="26" y="30" width="6" height="6" fill="white" />
      <rect x="34" y="30" width="6" height="6" fill="white" />
      <rect x="26" y="40" width="6" height="6" fill="white" />
      <rect x="34" y="40" width="6" height="6" fill="white" />
      {/* Door - angular */}
      <rect x="28" y="50" width="10" height="10" fill="white" />
      {/* Side wings */}
      <path d="M8 60V32H20V60H8Z" opacity="0.6" />
      <path d="M44 60V32H56V60H44Z" opacity="0.6" />
    </svg>
  );
}

// Trending Up - Bold arrow chart
export function IconTrending({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Chart area fill */}
      <path d="M8 56L20 40L32 48L56 20V56H8Z" opacity="0.2" />
      {/* Trend line - bold */}
      <path d="M8 56L20 40L32 48L56 20V28L32 52L20 44L8 60V56Z" />
      {/* Arrow head - geometric */}
      <path d="M48 12H60V24L56 20L52 24L48 12Z" />
      {/* Grid lines */}
      <rect x="8" y="54" width="48" height="2" opacity="0.3" />
      <rect x="8" y="44" width="48" height="2" opacity="0.2" />
      <rect x="8" y="34" width="48" height="2" opacity="0.1" />
    </svg>
  );
}

// Phone - Geometric smartphone
export function IconPhone({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Phone body */}
      <rect x="16" y="4" width="32" height="56" rx="4" />
      {/* Screen */}
      <rect x="20" y="10" width="24" height="38" fill="white" />
      {/* Speaker */}
      <rect x="28" y="6" width="8" height="2" fill="white" opacity="0.5" />
      {/* Home button - geometric */}
      <rect x="28" y="52" width="8" height="4" rx="1" fill="white" />
      {/* Screen content hint */}
      <rect x="22" y="14" width="20" height="4" opacity="0.2" />
      <rect x="22" y="20" width="14" height="4" opacity="0.2" />
    </svg>
  );
}

// Mail - Angular envelope
export function IconMail({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Envelope body */}
      <rect x="4" y="14" width="56" height="36" rx="2" />
      {/* Envelope flap - angular V */}
      <path d="M4 16L32 36L60 16V20L32 40L4 20V16Z" fill="white" />
      {/* Bottom accent */}
      <path d="M4 46L20 36L32 44L44 36L60 46V50H4V46Z" opacity="0.2" />
    </svg>
  );
}

// Map Pin - Bold geometric marker
export function IconMapPin({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Pin body - angular */}
      <path d="M32 4C19.85 4 10 13.85 10 26C10 42 32 60 32 60C32 60 54 42 54 26C54 13.85 44.15 4 32 4Z" />
      {/* Inner highlight */}
      <path d="M32 4C19.85 4 10 13.85 10 26L32 38V4Z" opacity="0.2" />
      {/* Center dot - diamond */}
      <path d="M32 18L40 26L32 34L24 26L32 18Z" fill="white" />
    </svg>
  );
}

// Check Circle - Geometric checkmark
export function IconCheckCircle({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Octagonal background */}
      <path d="M24 4H40L56 20V44L40 60H24L8 44V20L24 4Z" />
      {/* Checkmark - bold angular */}
      <path d="M18 32L28 42L46 20L42 16L28 34L22 28L18 32Z" fill="white" />
    </svg>
  );
}

// Send - Angular paper plane
export function IconSend({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Paper plane - sharp angular */}
      <path d="M4 8L60 32L4 56V36L40 32L4 28V8Z" />
      {/* Wing highlight */}
      <path d="M4 8L40 32L4 36V8Z" opacity="0.3" />
    </svg>
  );
}

// Quote - Bold angular quotation marks
export function IconQuote({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      {/* Left quote */}
      <path d="M8 8H26V28L14 52H6L14 32H8V8Z" />
      {/* Right quote */}
      <path d="M36 8H54V28L42 52H34L42 32H36V8Z" />
      {/* Accent */}
      <path d="M8 8H26V16H8V8Z" opacity="0.3" />
      <path d="M36 8H54V16H36V8Z" opacity="0.3" />
    </svg>
  );
}

// Arrow Right - Bold geometric
export function IconArrowRight({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      <path d="M8 26H40V16L56 32L40 48V38H8V26Z" />
    </svg>
  );
}

// Arrow Down - Bold geometric
export function IconArrowDown({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      <path d="M26 8H38V40H48L32 56L16 40H26V8Z" />
    </svg>
  );
}

// Menu - Chunky hamburger
export function IconMenu({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      <rect x="8" y="12" width="48" height="8" rx="1" />
      <rect x="8" y="28" width="48" height="8" rx="1" />
      <rect x="8" y="44" width="48" height="8" rx="1" />
    </svg>
  );
}

// Close/X - Bold geometric X
export function IconClose({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      <path d="M14 8L32 26L50 8L56 14L38 32L56 50L50 56L32 38L14 56L8 50L26 32L8 14L14 8Z" />
    </svg>
  );
}

// Chevron Down - Bold angular
export function IconChevronDown({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="currentColor" {...props}>
      <path d="M8 20L32 44L56 20L50 14L32 32L14 14L8 20Z" />
    </svg>
  );
}
