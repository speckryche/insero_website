import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

// Voice Connectivity - Geometric headset with angular waves
export function VoiceIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Headset base */}
      <path d="M8 24C8 15.163 15.163 8 24 8s16 7.163 16 16v4h-4v-4c0-6.627-5.373-12-12-12S12 17.373 12 24v4H8v-4z" />
      {/* Left ear piece - angular */}
      <path d="M6 26h6v14H6a2 2 0 01-2-2V28a2 2 0 012-2z" />
      {/* Right ear piece - angular */}
      <path d="M36 26h6a2 2 0 012 2v10a2 2 0 01-2 2h-6V26z" />
      {/* Microphone boom - geometric */}
      <path d="M36 36h-8l-2 4h-4l4-8h10v4z" />
      {/* Sound waves - angular */}
      <path d="M24 18l3-3 2 2-3 3-2-2z" opacity="0.7" />
      <path d="M29 15l3-3 2 2-3 3-2-2z" opacity="0.5" />
    </svg>
  );
}

// Internet Connectivity - Geometric globe with grid
export function InternetIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Globe circle */}
      <circle cx="24" cy="24" r="20" opacity="0.2" />
      {/* Horizontal bands */}
      <path d="M4 22h40v4H4z" />
      <path d="M8 14h32v3H8z" opacity="0.8" />
      <path d="M8 31h32v3H8z" opacity="0.8" />
      {/* Vertical meridian */}
      <path d="M22 4h4v40h-4z" />
      {/* Angular globe outline */}
      <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z" />
      {/* Connection nodes */}
      <rect x="10" y="10" width="4" height="4" />
      <rect x="34" y="10" width="4" height="4" />
      <rect x="10" y="34" width="4" height="4" />
      <rect x="34" y="34" width="4" height="4" />
    </svg>
  );
}

// SD-WAN - Interconnected geometric nodes
export function NetworkIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Center node - large */}
      <rect x="18" y="18" width="12" height="12" />
      {/* Top node */}
      <rect x="20" y="2" width="8" height="8" />
      {/* Bottom node */}
      <rect x="20" y="38" width="8" height="8" />
      {/* Left node */}
      <rect x="2" y="20" width="8" height="8" />
      {/* Right node */}
      <rect x="38" y="20" width="8" height="8" />
      {/* Connection lines - bold */}
      <path d="M22 10h4v8h-4z" />
      <path d="M22 30h4v8h-4z" />
      <path d="M10 22h8v4h-8z" />
      <path d="M30 22h8v4h-8z" />
      {/* Diagonal connections */}
      <path d="M32 8l6 6-3 3-6-6z" opacity="0.7" />
      <path d="M10 8l-6 6 3 3 6-6z" opacity="0.7" transform="scale(-1,1) translate(-48,0)" />
      <path d="M32 40l6-6-3-3-6 6z" opacity="0.7" />
      <path d="M16 40l-6-6 3-3 6 6z" opacity="0.7" />
    </svg>
  );
}

// Security - Bold geometric shield with lock
export function SecurityIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Shield shape - angular */}
      <path d="M24 4L6 12v14c0 11.1 7.8 21.4 18 24 10.2-2.6 18-12.9 18-24V12L24 4z" />
      {/* Lock body - cut out */}
      <rect x="17" y="22" width="14" height="12" fill="white" />
      {/* Lock shackle */}
      <path d="M19 22v-4a5 5 0 0110 0v4h-3v-4a2 2 0 00-4 0v4h-3z" fill="white" />
      {/* Keyhole - geometric */}
      <circle cx="24" cy="27" r="2" />
      <rect x="23" y="27" width="2" height="4" />
    </svg>
  );
}

// Calendar - Bold geometric
export function CalendarIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Calendar body */}
      <path d="M6 14h36v28a2 2 0 01-2 2H8a2 2 0 01-2-2V14z" />
      {/* Calendar top */}
      <path d="M6 10a2 2 0 012-2h32a2 2 0 012 2v4H6v-4z" opacity="0.8" />
      {/* Hooks */}
      <rect x="14" y="4" width="4" height="8" rx="1" />
      <rect x="30" y="4" width="4" height="8" rx="1" />
      {/* Date squares */}
      <rect x="12" y="20" width="6" height="6" fill="white" />
      <rect x="21" y="20" width="6" height="6" fill="white" />
      <rect x="30" y="20" width="6" height="6" fill="white" />
      <rect x="12" y="29" width="6" height="6" fill="white" />
      <rect x="21" y="29" width="6" height="6" fill="white" />
      <rect x="30" y="29" width="6" height="6" fill="white" />
    </svg>
  );
}

// Search/Analyze - Geometric magnifying glass with data
export function AnalyzeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Magnifying glass circle */}
      <circle cx="20" cy="20" r="16" />
      <circle cx="20" cy="20" r="11" fill="white" />
      {/* Handle - bold angular */}
      <path d="M32 28l14 14-4 4-14-14z" />
      {/* Bar chart inside */}
      <rect x="12" y="22" width="4" height="8" />
      <rect x="18" y="16" width="4" height="14" />
      <rect x="24" y="19" width="4" height="11" />
    </svg>
  );
}

// Savings/Money - Geometric piggy bank
export function SavingsIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Body */}
      <ellipse cx="24" cy="28" rx="18" ry="14" />
      {/* Coin slot */}
      <rect x="20" y="12" width="8" height="4" />
      {/* Ear */}
      <path d="M36 18l6-4v8l-6-4z" />
      {/* Snout */}
      <rect x="4" y="24" width="8" height="8" rx="1" />
      {/* Nostrils */}
      <rect x="5" y="26" width="2" height="2" fill="white" />
      <rect x="5" y="30" width="2" height="2" fill="white" />
      {/* Legs - angular */}
      <rect x="12" y="38" width="5" height="6" />
      <rect x="31" y="38" width="5" height="6" />
      {/* Eye */}
      <rect x="32" y="22" width="3" height="3" fill="white" />
    </svg>
  );
}

// Dollar/Zero Cost - Bold dollar in circle
export function DollarIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Circle background */}
      <circle cx="24" cy="24" r="20" />
      {/* Dollar sign */}
      <path
        d="M22 10h4v4h4a2 2 0 012 2v6h-6v-4h-6v4l10 4v8a2 2 0 01-2 2h-4v4h-4v-4h-4a2 2 0 01-2-2v-6h6v4h6v-4l-10-4v-8a2 2 0 012-2h4v-4z"
        fill="white"
      />
    </svg>
  );
}

// Scale/Balance - Carrier Agnostic
export function BalanceIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Center pillar */}
      <rect x="21" y="8" width="6" height="32" />
      {/* Base */}
      <rect x="12" y="38" width="24" height="6" />
      {/* Beam */}
      <rect x="4" y="10" width="40" height="4" />
      {/* Left pan */}
      <path d="M4 18h14l-2 12H6l-2-12z" />
      {/* Right pan */}
      <path d="M30 18h14l-2 12H32l-2-12z" />
      {/* Chains */}
      <rect x="6" y="14" width="2" height="4" />
      <rect x="16" y="14" width="2" height="4" />
      <rect x="30" y="14" width="2" height="4" />
      <rect x="40" y="14" width="2" height="4" />
    </svg>
  );
}

// Clock/Experience - Geometric clock
export function ClockIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Clock face */}
      <circle cx="24" cy="24" r="20" />
      <circle cx="24" cy="24" r="15" fill="white" />
      {/* Hour markers */}
      <rect x="22" y="6" width="4" height="4" />
      <rect x="22" y="38" width="4" height="4" />
      <rect x="6" y="22" width="4" height="4" />
      <rect x="38" y="22" width="4" height="4" />
      {/* Clock hands - angular */}
      <rect x="22" y="14" width="4" height="12" />
      <rect x="24" y="22" width="10" height="4" />
      {/* Center */}
      <rect x="21" y="21" width="6" height="6" />
    </svg>
  );
}

// Users/Vendors - Multiple people geometric
export function UsersIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Front person */}
      <circle cx="24" cy="14" r="8" />
      <path d="M12 44V34a12 12 0 0124 0v10H12z" />
      {/* Left person */}
      <circle cx="10" cy="16" r="6" opacity="0.6" />
      <path d="M2 44V36a8 8 0 0116 0v8H2z" opacity="0.6" />
      {/* Right person */}
      <circle cx="38" cy="16" r="6" opacity="0.6" />
      <path d="M30 44V36a8 8 0 0116 0v8H30z" opacity="0.6" />
    </svg>
  );
}

// Credit Card - Overpaying
export function CreditCardIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Card body */}
      <rect x="2" y="10" width="44" height="28" rx="3" />
      {/* Magnetic stripe */}
      <rect x="2" y="16" width="44" height="8" fill="white" opacity="0.3" />
      {/* Chip */}
      <rect x="8" y="26" width="10" height="8" fill="white" />
      <rect x="10" y="28" width="2" height="4" />
      <rect x="14" y="28" width="2" height="4" />
      {/* Numbers placeholder */}
      <rect x="24" y="30" width="18" height="4" fill="white" opacity="0.5" />
    </svg>
  );
}

// Question/Help - No guidance
export function HelpIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Circle */}
      <circle cx="24" cy="24" r="20" />
      {/* Question mark */}
      <path
        d="M24 10a8 8 0 018 8c0 4-4 6-6 8v2h-6v-4c0-2 4-4 4-6a2 2 0 00-4 0h-6a8 8 0 0110-8z"
        fill="white"
      />
      {/* Dot */}
      <rect x="20" y="32" width="6" height="6" fill="white" />
    </svg>
  );
}

// Building - Business
export function BuildingIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Main building */}
      <path d="M8 44V12l16-8 16 8v32H8z" />
      {/* Windows */}
      <rect x="14" y="16" width="6" height="6" fill="white" />
      <rect x="28" y="16" width="6" height="6" fill="white" />
      <rect x="14" y="26" width="6" height="6" fill="white" />
      <rect x="28" y="26" width="6" height="6" fill="white" />
      {/* Door */}
      <rect x="18" y="34" width="12" height="10" fill="white" />
    </svg>
  );
}

// Trending Up - Growth
export function TrendingIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      {/* Chart area */}
      <path d="M4 40L16 28l8 8 16-20v24H4z" opacity="0.3" />
      {/* Line */}
      <path d="M4 40l12-12 8 8 20-24v6L26 32l-8-8-10 10v6z" />
      {/* Arrow head */}
      <path d="M38 6h8v8l-4-4-4 4V6z" />
    </svg>
  );
}

// Phone
export function PhoneIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M14 4h20a2 2 0 012 2v36a2 2 0 01-2 2H14a2 2 0 01-2-2V6a2 2 0 012-2z" />
      <rect x="14" y="8" width="20" height="28" fill="white" />
      <rect x="20" y="38" width="8" height="4" fill="white" />
    </svg>
  );
}

// Mail
export function MailIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <rect x="4" y="10" width="40" height="28" rx="2" />
      <path d="M4 14l20 12 20-12v-2L24 24 4 12v2z" fill="white" />
    </svg>
  );
}

// Map Pin
export function MapPinIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M24 4C15.163 4 8 11.163 8 20c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" />
      <circle cx="24" cy="20" r="6" fill="white" />
    </svg>
  );
}

// Check Circle
export function CheckCircleIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <circle cx="24" cy="24" r="20" />
      <path d="M14 24l8 8 14-16-4-4-10 12-4-4-4 4z" fill="white" />
    </svg>
  );
}

// Send
export function SendIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M4 4l40 20L4 44V28l24-4-24-4V4z" />
    </svg>
  );
}

// Quote
export function QuoteIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M8 8h14v14l-8 18H6l6-14H8V8z" />
      <path d="M28 8h14v14l-8 18h-8l6-14h-4V8z" />
    </svg>
  );
}

// Arrow Right
export function ArrowRightIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M8 20h24V12l12 12-12 12v-8H8v-8z" />
    </svg>
  );
}

// Arrow Down
export function ArrowDownIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M20 8v24H12l12 12 12-12h-8V8h-8z" />
    </svg>
  );
}

// Menu
export function MenuIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <rect x="6" y="10" width="36" height="5" />
      <rect x="6" y="22" width="36" height="5" />
      <rect x="6" y="34" width="36" height="5" />
    </svg>
  );
}

// Close/X
export function CloseIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M10 6l14 14L38 6l4 4-14 14 14 14-4 4-14-14-14 14-4-4 14-14L6 10l4-4z" />
    </svg>
  );
}

// Chevron Down
export function ChevronDownIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      {...props}
    >
      <path d="M8 16l16 16 16-16-4-4-12 12-12-12-4 4z" />
    </svg>
  );
}
