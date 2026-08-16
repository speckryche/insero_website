'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { trackContactClick } from '@/lib/analytics';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  ArrowRight,
  Sparkle,
  Robot,
  Brain,
  Headset,
  PhoneCall,
  VideoCamera,
  ChatsCircle,
  DeviceMobile,
  PuzzlePiece,
  CheckCircle,
  CurrencyDollar,
  ShieldCheck,
  Handshake,
  Scales,
  Clock,
  Lightning,
  BookOpen,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { formatVerifiedDate } from '@/lib/dates';
import { StatsBand } from '@/components/sections/StatsBand';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { Comparison } from '@/components/mdx/Comparison';
import { ArticleFAQ } from '@/components/mdx/ArticleFAQ';
import { company } from '@/config/company';
import { QuoteForm } from '@/components/sections/QuoteForm';
import {
  lastVerified,
  pricingSourceUrl,
  zoomPhone,
  zoomContactCenter,
  addOnGroups as zoomAddOnGroups,
  receptionistPackaging,
  contactCenterAiDeltas,
  contactCenterAiDeltasFavouringRc,
  formatUsd,
  type PlanTier as ZoomPlanTier,
} from '@/data/zoom-pricing';
import { zoomPlatformClaims } from '@/data/zoom-platform-claims';
import { zoomStats, zoomStatsAttribution } from '@/data/zoom-stats';
import { zoomFaq } from './faq';

// --- Insero design system -------------------------------------------------
// Tokens from globals.css. The only Zoom blue left on this page is inside the
// logo image itself, which is not altered.
//
// This is a compliance requirement as much as a design one: Zoom's trademark
// guidelines ask that a bright blue close to their own is not adopted as the
// accent for a product or service that refers to Zoom, and their partner rules
// want the partner's branding to be the more prominent brand.
//
// BLUE (#008838) clears AA on white (4.59:1) but not on either tint (4.07:1 on
// primary-50, 3.47:1 on the card band), so accent TEXT on a tint uses
// BLUE_HOVER. Kept under the old names so the diff stays a colour change only.
const MIDNIGHT = 'var(--color-secondary)'; // headlines
const BLUE = 'var(--color-primary)'; // accents on white, icons, fills
const BLUE_HOVER = 'var(--color-primary-dark)'; // accent text on any tint
const TINT = 'var(--color-primary-50)'; // light section background

/* Hero wash, carrier end. Zoom Blue at 6% over white — the counterpart to the
   8% Insero-accent peach on /ringcentral's hero, and the only place on this
   page the carrier hex appears at all. The palette conversion took Zoom Blue
   off every solid surface here; a 6% wash is a tint of white, not an adoption
   of the mark's colour, and nothing renders on top of it but the video.

   6%, not RC's 8%, because the percentage is not the thing being matched — the
   visible strength of the wash is. Blue is a dark hue, so an identical 8% mix
   lands at #EBF2FF, CIELAB dE 8.41 from white against the peach's 6.30: a
   third stronger, which is the difference between a wash and a colour band.
   6% lands at #F0F5FF, dE 6.30 — the same departure from white as RC's peach,
   and L* 96.51 against its 96.75. Change the percentage only against that
   measurement, not by eye. */
const HERO_WASH = 'color-mix(in srgb, #0B5CFF 6%, #ffffff)';

// --- Section data ---------------------------------------------------------

const aiCapabilities = [
  {
    stage: 'Included with the seat',
    name: 'Zoom AI in Workplace',
    icon: Sparkle,
    description:
      'Included with eligible paid Workplace plans at no extra cost: call and meeting summaries, voicemail prioritization, and task extraction that auto-creates Zoom Tasks with owners and deadlines, plus on-demand answers during and after calls.',
  },
  {
    stage: 'Agentic',
    name: 'Agentic workflows',
    icon: Brain,
    description:
      'Native Workplace AI that pulls context from your files and apps and drives conversation-to-action workflows, rather than only summarizing after the fact.',
  },
  {
    stage: 'Voice AI (add-on)',
    name: 'AI Receptionist & Concierge',
    icon: Robot,
    description:
      'A 24/7 natural-voice agent that answers, routes, books appointments, and covers after-hours. AI Concierge is a paid add-on, but it plugs straight into the same Zoom Phone platform.',
  },
];

const aiAlsoIncluded = [
  {
    name: 'Revenue Accelerator',
    icon: Lightning,
    description:
      "Sales conversation intelligence: deal insights, risk flags, automatic CRM updates, and coaching built from real calls — so your pipeline reflects what's actually happening, not what got typed in.",
  },
  {
    name: 'ZoomMate (add-on)',
    icon: PuzzlePiece,
    description:
      'A separate paid product, launched June 2026, that succeeds Custom AI Companion: an agentic work surface for searching your data and completing tasks. Zoom positions it as an addition to the included AI rather than a replacement for it.',
  },
];

const coreProducts = [
  {
    name: 'Business Phone (Zoom Phone)',
    icon: PhoneCall,
    description: 'Cloud calling with routing, voicemail, and apps for desk, desktop, and mobile — built on the platform you already know.',
  },
  {
    name: 'Meetings & Video',
    icon: VideoCamera,
    description: 'The flagship: reliable HD video and webinars teams actually enjoy using, with AI summaries built in.',
  },
  {
    name: 'Team Chat',
    icon: ChatsCircle,
    description: 'Persistent messaging, channels, and file sharing that tie directly into meetings and calls.',
  },
  {
    name: 'SMS & MMS',
    icon: DeviceMobile,
    description: 'Send and receive business texts and media from your business numbers.',
  },
  {
    name: 'Contact Center (Zoom Contact Center)',
    icon: Headset,
    description: 'An omnichannel, AI-powered contact center that lives in the same Zoom Workplace experience.',
  },
  {
    name: 'Integrations',
    icon: PuzzlePiece,
    description: 'Microsoft Teams via Operator Connect, Salesforce, and a broad catalog of CRM and productivity integrations.',
  },
];

// What going direct does NOT give you. Mirrors /ringcentral exactly, including
// what is deliberately absent: the cost answer lives in the trust strip above
// the pricing and in this section's opening paragraph, and the configuration
// point is already made by "How Insero prices this for you".
//
// Insero escalates and advocates; it is not the support desk. The escalation
// card says so rather than leaving it to be assumed.
const inseroValue = [
  {
    icon: Scales,
    title: 'Carrier-agnostic by default',
    description:
      "We're not Zoom's sales team. We compare Zoom Phone against the other providers we source, and if one of them is the better fit for you, we say so.",
  },
  {
    icon: CheckCircle,
    title: 'Through contracting and implementation',
    description:
      'Paperwork, ordering, number porting, and go-live — we stay on it, so what gets built matches what you signed for.',
  },
  {
    icon: ShieldCheck,
    title: 'Escalation and advocacy',
    description:
      "When a ticket stalls, we escalate it and push on your behalf, for as long as you have the service. Front-line support still comes from Zoom's support team — what we add is someone with leverage.",
  },
  {
    icon: Handshake,
    title: 'One relationship, not one per carrier',
    description:
      'Add a provider later, or change one, and it is the same team and the same contact — not a new account manager and a new process each time.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

// Shared Zoom blue pill CTA
/**
 * Trademark symbol. `sup` defaults to vertical-align: super, which at heading
 * sizes lifts the glyph to near cap height and — with a normal line-height —
 * grows the line box enough to disturb how the heading wraps. A smaller shift
 * and a zeroed line-height keep it tucked against the word without affecting
 * the line it sits on.
 */
function Tm({ children }: { children: React.ReactNode }) {
  return (
    <sup className="text-[0.55em]" style={{ verticalAlign: '0.38em', lineHeight: 0 }}>
      {children}
    </sup>
  );
}

const zoomButtonClass =
  'group inline-flex items-center gap-3 px-10 py-5 bg-accent-cta text-white font-semibold text-lg rounded-full hover:bg-[var(--color-accent-cta-hover)] transition-colors duration-200 shadow-lg shadow-accent-cta/25';

// --- Page -----------------------------------------------------------------

export function ZoomPageClient() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      {/* PALE page. The standard Insero light header sits above; the Zoom
          treatment begins here. No dark-hero attribute, and none is wanted —
          the header flips to its light-on-dark variant only for a section
          carrying data-dark-hero, and every stop in this gradient is within
          dE 8.6 of white. The dark header on it would be unreadable.

          Same two-brand structure as /ringcentral's hero: full-bleed, so the
          background is on the section and only the Container constrains the
          content; horizontal at 90deg rather than diagonal; Insero green on the
          left under the copy, white through the middle, carrier tint on the
          right under the media. The left stop is primary-50 on both pages,
          deliberately identical — the two carrier pages should share a left
          edge and differ only in which brand the right edge belongs to.

          primary-50 is the darkest stop (relative luminance 0.882 against
          white's 1.000 and the wash's 0.911) and it is also the end the text
          sits over, so it is the worst case twice over. Measured there: ink H1
          13.79:1, primary-dark accent and link 7.28:1, gray-600 subhead
          6.82:1. */}
      <section
        className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden"
        style={{
          background: `linear-gradient(90deg, var(--color-primary-50) 0%, #ffffff 50%, ${HERO_WASH} 100%)`,
        }}
      >
        <Container className="relative z-10">
          {/* Copy left, media right, media the wider track (roughly 42/58).
              minmax(0,…) on both so the long H1 cannot push the media column
              past its share. Single column below lg, media underneath. */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)] gap-12 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Logo sits directly on white — no pill needed */}
            {/* Partner mark leads and stays more prominent: the Insero lockup in the
                site header measures 155x64 (mobile) / 194x80 (lg); this renders
                84x20 / 101x24, smaller on both axes at both breakpoints. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carriers/Zoom_Logo_Bloom_RGB.png" alt="Zoom" className="h-5 lg:h-6 w-auto mb-10" />

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.875rem] xl:text-[3.125rem] font-display font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: MIDNIGHT }}
            >
              What Zoom Phone<Tm>&trade;</Tm> actually costs —{' '}
              <span style={{ color: BLUE_TEXT }}>and whether it&apos;s right for you</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-gray-600)] mb-10 leading-relaxed">
              Zoom<Tm>&reg;</Tm> splits phone and contact center pricing
              across separate pages. We put all of it on this one. Insero is an independent advisor who
              sources it at no cost to you — and if something else fits you better, we&apos;ll say so.
            </p>

            {/* Both calls to action stay on this page — the quote form is in the
                final section rather than a hand-off to /contact. */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#get-a-quote" className={zoomButtonClass}>
                <Phone weight="fill" className="w-5 h-5" />
                <span>Get a Free Quote</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 font-semibold text-lg hover:underline"
                style={{ color: BLUE_TEXT }}
              >
                <span>See the pricing</span>
                <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <ZoomHeroMedia />
          </motion.div>
          </div>
        </Container>
      </section>

      {/* ===================== STATS BAND ===================== */}
      <StatsBand stats={zoomStats} attribution={zoomStatsAttribution} />

      {/* ===================== TRUST STRIP ===================== */}
      {/* The "no cost to you" fact, promoted out of the hero subhead to the
          moment it actually matters — immediately before the first price. */}
      <TrustStrip>
        Insero is paid by the provider, never by you — the rates below are the same published rates
        you&apos;d pay going direct.
      </TrustStrip>

      {/* ===================== HONEST PRICING ===================== */}
      {/* The consolidated voice reference. Every figure renders from
          @/data/zoom-pricing — nothing here is hardcoded. */}
      <section
        id="pricing"
        className="py-20 lg:py-28 scroll-mt-24 lg:scroll-mt-28"
        style={{ backgroundColor: TINT }}
      >
        <Container>
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            <SectionEyebrow centered>Honest Pricing</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: MIDNIGHT }}>
              What Zoom Phone actually costs — all of it, in one place
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed">
              Zoom publishes phone and contact center pricing on separate pages, with the add-ons
              inside horizontally-scrolling carousels. A real voice deployment usually spans all of
              it, so the published rates are brought together here — seats, contact center, and the
              add-ons — for you to price in one place.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <ZoomPricingTabs />
          </motion.div>

          {/* Sits outside the tab system so it is visible whichever tab is open. */}
          <motion.div {...fadeUp} className="max-w-5xl mx-auto mt-16 lg:mt-20">
            <AiPackagingCard />
          </motion.div>

          <motion.p {...fadeUp} className="max-w-5xl mx-auto mt-8 text-sm text-[var(--color-gray-600)] text-center leading-relaxed">
            Zoom&apos;s published US list pricing, verified {formatVerifiedDate(lastVerified)}. Current pricing at{' '}
            <a
              href={pricingSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: BLUE_TEXT }}
            >
              zoom.com
            </a>
            .
          </motion.p>

          <motion.div {...fadeUp} className="max-w-5xl mx-auto mt-12 rounded-3xl bg-white p-8 lg:p-10 shadow-sm">
            <div className="flex items-start gap-5">
              <div
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl"
                style={{ backgroundColor: TINT, color: BLUE }}
              >
                <CurrencyDollar weight="fill" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-display font-bold mb-3" style={{ color: MIDNIGHT }}>
                  How Insero prices this for you
                </h3>
                <p className="text-[var(--color-gray-600)] leading-relaxed text-lg">
                  We publish the list pricing because you should be able to see it before you talk to
                  anyone. Those rates are Zoom&apos;s to set. What we add is the fit: requesting
                  pricing on your behalf, structuring the plan mix and contract term around how
                  you&apos;ll actually use the system, and making sure a license you are already
                  paying for is not bought twice.{' '}
                  <Link href="#get-a-quote" className="font-semibold hover:underline" style={{ color: BLUE_TEXT }}>
                    Ask us for a quote
                  </Link>{' '}
                  and we&apos;ll price your actual configuration.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== WHY SOURCE THROUGH INSERO ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mb-14">
            <SectionEyebrow>The Difference</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: MIDNIGHT }}>
              Why not just go direct?
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-500)]">
              A fair question, and the honest answer is short. The providers pay us, not you — there is
              no markup, no fee, and nothing added to your bill for using Insero. The rates above are 
              Zoom&apos;s published rates, the same ones you would be quoted going direct. What we can
              add is access: we buy through technology services distributors, which surfaces promotions
              and pricing programs that are not always offered to direct buyers. And because we are not 
              Zoom&apos;s sales team, we are free to tell you when something else fits you better —
              the same approach we bring to every voice project.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inseroValue.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex gap-5 rounded-3xl p-7"
                  style={{ backgroundColor: TINT }}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-white" style={{ color: BLUE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2" style={{ color: MIDNIGHT }}>
                      {item.title}
                    </h3>
                    <p className="text-[var(--color-gray-600)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== WHAT ZOOM IS ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>The Overview</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: MIDNIGHT }}>
              What Zoom Workplace actually is
            </h2>
            <div className="space-y-5 text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed">
              <p>
                Most people know the Zoom brand for video. The fuller picture is Zoom Workplace — a cloud business
                communications platform that brings phone, meetings, team chat, and a contact center into one
                place. Zoom Phone is the piece that turns the video tool you already use into a complete{' '}
                <Link href="/resources/ucaas-explained" className="font-semibold hover:underline" style={{ color: BLUE }}>
                  hosted UCaaS
                </Link>{' '}
                system: real business calling, one familiar app, no PBX in a closet.
              </p>
              <p>
                It&apos;s built to be relied on at scale — {zoomPlatformClaims.uptimeSla.text},{' '}
                {zoomPlatformClaims.countryCoverage.text}, and {zoomPlatformClaims.byoc.text}. On compliance,{' '}
                {zoomPlatformClaims.compliance.text}. For a lot of teams the biggest advantage is simply
                familiarity: adoption is fast because people already know the interface.
              </p>
              <p>
                But what increasingly sets Zoom Workplace apart is its approach to AI. Where many providers treat capable
                AI as a paid upgrade, Zoom Workplace includes its AI features — formerly branded AI
                Companion — with eligible paid plans at no extra cost.
                That takes the usual question — is the AI worth paying extra for — off the table, with the
                most advanced agentic pieces still available as add-ons when you need them.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== AI CAPABILITIES (hook) ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/10" style={{ color: BLUE_HOVER }}>
              <Sparkle weight="fill" className="w-4 h-4" />
              <span className="text-sm font-semibold">The AI Layer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: MIDNIGHT }}>
              Capable AI that&apos;s included, not billed as an add-on
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed">
              The Zoom Workplace standout is that useful AI comes with the seat. Those AI features are native
              to Workplace and included at no extra cost on eligible paid plans — which makes Zoom Phone one
              of the simplest, most cost-effective ways to put real AI in front of your team. Here&apos;s the
              honest breakdown of what&apos;s included and what&apos;s an add-on.
            </p>
          </motion.div>

          {/* Primary AI capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {aiCapabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-3xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  style={{ backgroundColor: TINT }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-5" style={{ color: BLUE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: BLUE }}>
                    {cap.stage}
                  </span>
                  <h3 className="text-xl font-display font-bold mt-1 mb-3" style={{ color: MIDNIGHT }}>{cap.name}</h3>
                  <p className="text-[var(--color-gray-500)] leading-relaxed text-[15px]">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Also notable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiAlsoIncluded.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 rounded-3xl p-7 shadow-sm"
                  style={{ backgroundColor: TINT }}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10" style={{ color: BLUE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2" style={{ color: MIDNIGHT }}>{item.name}</h3>
                    <p className="text-[var(--color-gray-500)] leading-relaxed text-[15px]">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== CORE PRODUCTS ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container>
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow centered>The Platform</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: MIDNIGHT }}>
              Everything in the Zoom platform
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-500)]">
              The building blocks, in plain terms — so you know what&apos;s standard and what&apos;s a separate
              license.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="rounded-3xl p-7 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white mb-5" style={{ color: BLUE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2" style={{ color: MIDNIGHT }}>
                    {product.name}
                  </h3>
                  <p className="text-[var(--color-gray-600)] leading-relaxed text-[15px]">{product.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== IS IT RIGHT FOR YOU ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container size="md">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <SectionEyebrow centered>Honest Fit</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: MIDNIGHT }}>
              Is Zoom Phone right for you?
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-600)]">
              We&apos;d rather you land on the right platform than the one we&apos;re talking about. Here&apos;s
              the straight version.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <Comparison
              left={{
                title: 'Great fit if…',
                points: [
                  'You already use Zoom Meetings and want one familiar app for calls too',
                  'You want capable AI included without assembling and paying for add-ons',
                  'You want simple, fast deployment your team adopts on day one',
                  'Your team is video-heavy and collaboration-first',
                ],
              }}
              right={{
                title: 'Maybe not if…',
                points: [
                  'You need the deepest contact-center and conversation-intelligence stack — RingCentral tends to pull ahead there',
                  'You want the most advanced agentic voice AI as the core of the system, not as an add-on',
                  'You rely on heavy, specialized contact-center customization out of the box',
                  "You'd rather assemble best-of-breed point tools than run one unified suite",
                ],
              }}
            />
          </motion.div>

          <motion.div {...fadeUp} className="mt-8 rounded-3xl p-7 lg:p-8 shadow-sm"
            style={{ backgroundColor: TINT }}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10" style={{ color: BLUE }}>
                <Scales weight="fill" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold mb-2" style={{ color: MIDNIGHT }}>
                  A quick word on Zoom Phone vs RingCentral
                </h3>
                <p className="text-[var(--color-gray-600)] leading-relaxed">
                  If you&apos;re weighing the two: the Zoom Phone advantage is value and simplicity — capable AI is
                  included and the platform is famously easy to adopt, especially if your team already lives in
                  Zoom Meetings. RingCentral&apos;s advantage is the depth of its contact-center and
                  conversation-intelligence stack, though its most powerful AI comes as add-ons. Read our honest
                  take on{' '}
                  <Link href="/ringcentral" className="font-semibold hover:underline" style={{ color: BLUE }}>
                    RingCentral
                  </Link>
                  , and we&apos;ll compare both against your actual needs — no thumb on the scale.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container size="md">
          <motion.div {...fadeUp} className="mb-10">
            <SectionEyebrow>Common Questions</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold" style={{ color: MIDNIGHT }}>
              Zoom Phone FAQ
            </h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <ArticleFAQ items={zoomFaq} />
          </motion.div>

          {/* Related reading */}
          <motion.div {...fadeUp} className="mt-14">
            <div className="flex items-center gap-2 mb-5" style={{ color: BLUE }}>
              <BookOpen weight="fill" className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">Related Reading</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <RelatedCard
                href="/resources/ucaas-explained"
                label="Voice"
                title="Hosted UCaaS Explained: Costs, Pricing & Hosted PBX"
                description="What cloud phone systems really cost, how pricing works, and how they fit with an existing PBX."
              />
              <RelatedCard
                href="/services/voice"
                label="Service"
                title="Voice Connectivity"
                description="How we help you compare providers and land the right business phone system at the best price."
              />
              <RelatedCard
                href="/resources/how-a-telecom-broker-works"
                label="Explainer"
                title="How a Telecom Broker Works"
                description="What an independent advisor actually does, how they get paid, and why it costs you nothing."
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section
        id="get-a-quote"
        className="pt-24 lg:pt-28 pb-20 lg:pb-24 scroll-mt-24 lg:scroll-mt-28 bg-white"
      >
        <Container size="md">
          <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-8" style={{ color: BLUE_HOVER }}>
              <span className="w-8 h-px" style={{ backgroundColor: BLUE_HOVER }} />
              Let&apos;s Talk
              <span className="w-8 h-px" style={{ backgroundColor: BLUE_HOVER }} />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-[1.1] tracking-tight" style={{ color: MIDNIGHT }}>
              Get a free Zoom Phone quote
            </h2>
            <p className="text-xl text-[var(--color-gray-600)] leading-relaxed">
              Zero cost, honest advice. We&apos;ll price your real configuration — and tell you straight if
              something else fits you better.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <QuoteForm
              idPrefix="zm"
              serviceTag="Zoom (source: zoom-page)"
              leadSource="zoom-page"
              submitLabel="Get My Free Zoom Phone Quote"
              successBody="We'll price your real Zoom Phone configuration and get back to you within one business day."
              messagePlaceholder="Seats, contact center needs, and whether you already use Zoom Meetings — anything that helps us price it right."
              cardClassName="rounded-3xl bg-white shadow-sm"
              successIconBgClassName=""
              successIconBgColor="var(--color-primary-50)"
            />

            <div className="mt-8">
              <a
                href={company.phoneLink}
                onClick={() => trackContactClick({ method: 'phone' })}
                className="inline-flex flex-col items-center text-[var(--color-gray-600)] transition-colors hover:text-secondary"
              >
                <span className="text-lg">or call us at</span>
                <span className="font-bold text-2xl md:text-3xl mt-1" style={{ color: MIDNIGHT }}>{company.phoneFormatted}</span>
              </a>
            </div>

            <div className="mt-16 pt-10 border-t border-primary/20">
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base md:text-lg text-[var(--color-gray-600)] font-medium">
                <TrustItem icon={Handshake}>Independent &mdash; Vendor-Neutral</TrustItem>
                <TrustItem icon={CurrencyDollar}>Same price as going direct</TrustItem>
                <TrustItem icon={Clock}>25+ Years Founder Experience</TrustItem>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== TRADEMARK CREDIT ===================== */}
      {/* Last block of page content, above the site footer. */}
      <section className="pb-10 bg-white">
        <Container size="md">
          <p className="text-xs text-[var(--color-gray-600)] leading-relaxed text-center">
            Zoom and the Zoom logo are trademarks of Zoom Communications, Inc., registered in the
            United States and other countries. Other third-party marks referenced herein are
            trademarks of their respective owners.
          </p>
        </Container>
      </section>
    </>
  );
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Subscribes to the media query; SSR snapshot is false so markup renders the
 *  clip and hydration corrects it. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener('change', onStoreChange);
      return () => mq.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

// --- Hero media -----------------------------------------------------------
// 16:9 card holding the desk loop with the Zoom interface cards layered over
// it. The aspect ratio is declared up front so the box is reserved before any
// asset arrives — that plus both children being out of flow keeps layout shift
// at zero.
//
// Failure handling mirrors /ringcentral: onError on the video element catches a
// decode failure, onError on the last <source> catches a load failure (that
// event fires on the source and does not bubble, so a handler on the video
// alone would never see it). Either one drops to the poster as a static
// background rather than leaving a dead player.

function ZoomHeroMedia() {
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();
  // Under reduced motion the clip is never played, so the poster stands in for
  // it and the cards render parked. The hero still says the same thing.
  const showPoster = failed || reduced;

  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-3xl shadow-xl"
      style={{ backgroundColor: TINT }}
    >
      {showPoster ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="/video/zoom_hero_poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/zoom_hero_poster.jpg"
          width={1920}
          height={1080}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/zoom_hero_loop.mp4" type="video/mp4" />
          <source
            src="/video/zoom_hero_loop.webm"
            type="video/webm"
            onError={() => setFailed(true)}
          />
        </video>
      )}

    </div>
  );
}

// --- Pricing UI -----------------------------------------------------------
// The same tabbed card layout as /ringcentral — same card anatomy, same
// always-mounted panels, same billing toggle — rendered in Zoom's palette
// rather than Insero's.
//
// Two rules this section follows strictly:
//  1. No rate is written here. Every figure renders from @/data/zoom-pricing,
//     including the savings percentages, which are read out of the published
//     savings notes rather than restated.
//  2. All three panels stay mounted at all times and are hidden with CSS, so a
//     crawler sees the contact center and add-on rates even though the phone
//     tab is the one that opens by default.

// Card header band: one step deeper than TINT (1.20x), the same relationship
// /ringcentral uses, so a band on a tinted section still reads as part of the
// card rather than as a recess in the page.
const BAND = 'var(--color-primary-100)';

// Accent TEXT, not BLUE. Zoom Blue clears AA on white (5.26:1) but fails on
// the band (3.95:1); the darker blue clears both — 5.82:1 on the band, 6.96:1
// on TINT, 7.75:1 on white. BLUE stays on icons and fills.
const BLUE_TEXT = BLUE_HOVER;

// Borderless and heavily rounded, matching the cards already on this page. The
// band-to-white transition is its own divider, so no rule is needed between
// them.
const zoomCardClass = 'rounded-3xl bg-white shadow-sm overflow-hidden';
const zoomCardBody = 'p-7 lg:p-8';
const zoomGridRows = 'grid-rows-[auto_1fr]';
const zoomSubgridCard = `row-span-2 grid grid-rows-subgrid ${zoomCardClass}`;

/** Pull "15%" out of a published savings note so a toggle label never restates
 *  a number the data file already owns. The three groups differ. */
function savingsPercent(note: string): string | null {
  return note.match(/\d+%/)?.[0] ?? null;
}

function ZoomCardHeader({
  title,
  description,
  badge,
  eyebrow,
}: {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="px-7 lg:px-8 py-6" style={{ backgroundColor: BAND }}>
      {eyebrow && (
        <span
          className="block text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: BLUE_TEXT }}
        >
          {eyebrow}
        </span>
      )}
      {/* min-h pins the row to the heading's line box so a badge cannot make one
          card's band taller than its neighbours' and misalign the boundaries. */}
      <div className="flex items-center justify-between gap-3 min-h-7">
        <h3 className="font-display font-bold text-xl" style={{ color: MIDNIGHT }}>
          {title}
        </h3>
        {badge}
      </div>
      {description && (
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-gray-600)]">{description}</p>
      )}
    </div>
  );
}

function IncludedBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="flex-shrink-0 px-3 py-1 rounded-full text-white text-[11px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: BLUE }}
    >
      {children}
    </span>
  );
}

const ZOOM_TABS = [
  { id: 'phone', label: `Business Phone (${zoomPhone.name})` },
  { id: 'cc', label: 'Contact Center' },
  { id: 'addons', label: 'Add-ons' },
] as const;

type ZoomTabId = (typeof ZOOM_TABS)[number]['id'];

function ZoomPricingTabs() {
  const [active, setActive] = useState<ZoomTabId>('phone');
  // Billing choice is shared across the panels, so switching tabs does not
  // silently reset what the visitor picked.
  const [annual, setAnnual] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = ZOOM_TABS.length - 1;
    let next = -1;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next < 0) return;
    event.preventDefault();
    setActive(ZOOM_TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Zoom Phone and Zoom Contact Center pricing categories"
          className="inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-full bg-white shadow-sm"
        >
          {ZOOM_TABS.map((tab, index) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`zoom-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`zoom-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className="px-5 sm:px-7 py-3 rounded-full text-sm sm:text-base font-semibold transition-colors duration-200"
                style={
                  selected
                    ? { backgroundColor: BLUE, color: '#ffffff' }
                    : { color: 'var(--color-gray-600)' }
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 lg:mt-14">
        <ZoomTabPanel id="phone" active={active}>
          <PlanPanel
            tiers={zoomPhone.tiers}
            savingsNote={zoomPhone.annualSavingsNote}
            annual={annual}
            onToggle={setAnnual}
            included={<IncludedReceptionistCard />}
            notes={[
              `${zoomPhone.metered.name}: ${formatUsd(zoomPhone.metered.annual)} per user, per month billed annually, ${formatUsd(zoomPhone.metered.monthly)} month-to-month. ${zoomPhone.metered.note}`,
            ]}
          />
        </ZoomTabPanel>

        <ZoomTabPanel id="cc" active={active}>
          <PlanPanel
            tiers={zoomContactCenter.tiers}
            savingsNote={zoomContactCenter.annualSavingsNote}
            annual={annual}
            onToggle={setAnnual}
            startingAt
            notes={[zoomContactCenter.startingAtNote, zoomContactCenter.licensingNote]}
          />
        </ZoomTabPanel>

        <ZoomTabPanel id="addons" active={active}>
          <AddOnsPanel />
        </ZoomTabPanel>
      </div>
    </div>
  );
}

function ZoomTabPanel({
  id,
  active,
  children,
}: {
  id: ZoomTabId;
  active: ZoomTabId;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      id={`zoom-panel-${id}`}
      aria-labelledby={`zoom-tab-${id}`}
      className={active === id ? '' : 'hidden'}
    >
      {children}
    </div>
  );
}

// Tier cards carry no descriptive blurb. The data file holds published rates
// only, and writing "what this tier includes" copy without a verified source
// would be asserting the contents of a real product's plan.
function PlanPanel({
  tiers,
  savingsNote,
  annual,
  onToggle,
  notes,
  included,
  startingAt = false,
}: {
  tiers: readonly ZoomPlanTier[];
  savingsNote: string;
  annual: boolean;
  onToggle: (next: boolean) => void;
  notes: string[];
  included?: React.ReactNode;
  startingAt?: boolean;
}) {
  return (
    <div>
      <BillingToggle annual={annual} onToggle={onToggle} savingsNote={savingsNote} />

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 ${zoomGridRows}`}>
        {tiers.map((tier) => (
          <PlanCard key={tier.name} tier={tier} annual={annual} startingAt={startingAt} />
        ))}
      </div>

      {included && <div className="mt-6">{included}</div>}

      <div className="mt-10 space-y-2 text-center">
        {notes.map((note) => (
          <p key={note} className="text-[15px] text-[var(--color-gray-600)] max-w-3xl mx-auto leading-relaxed">
            {note}
          </p>
        ))}
      </div>
    </div>
  );
}

function BillingToggle({
  annual,
  onToggle,
  savingsNote,
}: {
  annual: boolean;
  onToggle: (next: boolean) => void;
  savingsNote: string;
}) {
  const percent = savingsPercent(savingsNote);
  return (
    <div className="flex justify-center sm:justify-end mb-8">
      <button
        type="button"
        role="switch"
        aria-checked={annual}
        onClick={() => onToggle(!annual)}
        className="group inline-flex items-center gap-3 rounded-full px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ outlineColor: BLUE }}
      >
        <span
          aria-hidden="true"
          className="relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-200"
          style={{ backgroundColor: annual ? BLUE : 'var(--color-gray-300)' }}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
              annual ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </span>
        <span className="text-[15px] font-semibold" style={{ color: MIDNIGHT }}>
          {percent ? `Save up to ${percent} by paying annually` : savingsNote}
        </span>
      </button>
    </div>
  );
}

function PlanCard({
  tier,
  annual,
  startingAt,
}: {
  tier: ZoomPlanTier;
  annual: boolean;
  startingAt: boolean;
}) {
  return (
    <div className={zoomSubgridCard}>
      <ZoomCardHeader title={tier.name} />
      <div className={`flex flex-col ${zoomCardBody}`}>
        <div className="flex items-baseline gap-3 flex-wrap">
          {startingAt && (
            <span className="text-sm font-semibold text-[var(--color-gray-500)]">from</span>
          )}
          <span className="font-display font-bold text-5xl tracking-tight" style={{ color: MIDNIGHT }}>
            {formatUsd(annual ? tier.annual : tier.monthly)}
          </span>
          {annual && (
            <span className="text-xl text-[var(--color-gray-500)] line-through">{formatUsd(tier.monthly)}</span>
          )}
        </div>
        <p className="mt-2 text-sm text-[var(--color-gray-500)]">
          /user/month {annual ? 'paid annually' : 'billed monthly'}
        </p>
      </div>
    </div>
  );
}

// The included receptionist is the point of the page, so it gets a card of its
// own rather than a row in the add-on table — the same reasoning that keeps
// RingCentral's usage-priced receptionist out of its per-user tables.
function IncludedReceptionistCard() {
  const feature = zoomPhone.includedFeature;
  return (
    <div className={zoomCardClass}>
      <ZoomCardHeader
        title={feature.name}
        eyebrow="Included with the seat"
        badge={<IncludedBadge>Included</IncludedBadge>}
      />
      <div className={zoomCardBody}>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-display font-bold text-4xl tracking-tight" style={{ color: MIDNIGHT }}>
            {feature.allowance}
          </span>
          <span className="text-lg text-[var(--color-gray-500)]">at no additional charge</span>
        </div>
        <p className="mt-3 text-[15px] text-[var(--color-gray-600)] leading-relaxed">
          {feature.note} {feature.trialNote}
        </p>
      </div>
    </div>
  );
}

function AddOnsPanel() {
  return (
    <div className="space-y-14">
      {zoomAddOnGroups.map((group) => (
        <div key={group.group}>
          <div className="mb-7">
            <h3 className="text-2xl font-display font-bold" style={{ color: MIDNIGHT }}>
              {group.group}
            </h3>
            <p className="mt-1.5 text-[15px] text-[var(--color-gray-600)]">
              {[group.unit, group.annualSavingsNote, group.requirement].filter(Boolean).join(' · ')}
            </p>
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${zoomGridRows}`}>
            {group.items.map((item) => (
              <AddOnCard key={item.name} name={item.name} price={item.price} note={item.note} unit={group.unit} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AddOnCard({
  name,
  price,
  note,
  unit,
}: {
  name: string;
  price: number | null;
  note?: string;
  unit: string;
}) {
  return (
    <div className={zoomSubgridCard}>
      <ZoomCardHeader title={name} />
      <div className={`flex flex-col ${zoomCardBody}`}>
        {note && <p className="text-[15px] text-[var(--color-gray-600)] leading-relaxed mb-6">{note}</p>}
        <div className="mt-auto">
          <span className="font-display font-bold text-2xl" style={{ color: MIDNIGHT }}>
            {price === null ? 'Contact us for pricing' : formatUsd(price)}
          </span>
          {price !== null && <span className="block mt-1 text-sm text-[var(--color-gray-500)]">{unit}</span>}
        </div>
      </div>
    </div>
  );
}

// The packaging comparison, computed in the data layer from both published
// rate cards. Both directions are stated: neither vendor comes out ahead on
// every line, and publishing only the flattering half would not be honest.
function AiPackagingCard() {
  const p = receptionistPackaging;
  return (
    <div className={`${zoomCardClass} p-8 lg:p-12`}>
      <div className="flex items-start gap-5 mb-8">
        <div
          className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl"
          style={{ backgroundColor: TINT, color: BLUE }}
        >
          <Sparkle weight="fill" className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold mb-3" style={{ color: MIDNIGHT }}>
            The AI is already in the price
          </h3>
          <p className="text-lg text-[var(--color-gray-600)] leading-relaxed">
            The two platforms package voice AI differently. Zoom Phone plans bundle the{' '}
            {p.zoomFeature} into the seat; RingCentral licenses its equivalent separately. That is a
            difference in packaging rather than a verdict on either platform, and it favors buyers
            who want capable AI without assembling add-ons.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="rounded-2xl p-7 lg:p-8" style={{ backgroundColor: TINT }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE_TEXT }}>
            Zoom Phone
          </p>
          <div className="font-display font-bold text-3xl" style={{ color: MIDNIGHT }}>
            Included
          </div>
          <p className="mt-2 text-[15px] text-[var(--color-gray-600)] leading-relaxed">
            {p.zoomFeature}, {p.zoomAllowance}, at no additional charge with a Zoom Phone plan.
          </p>
        </div>

        <div className="rounded-2xl p-7 lg:p-8" style={{ backgroundColor: TINT }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE_TEXT }}>
            RingCentral
          </p>
          <div className="font-display font-bold text-3xl" style={{ color: MIDNIGHT }}>
            {formatUsd(p.rcMonthly)}
            <span className="text-base font-normal text-[var(--color-gray-600)]">/month</span>
          </div>
          <p className="mt-2 text-[15px] text-[var(--color-gray-600)] leading-relaxed">
            {p.rcFeature}, {p.rcAllowance}, {p.rcBillingUnit} — {formatUsd(p.rcAnnualized)} a year.
          </p>
        </div>
      </div>

      <p className="mt-6 text-[15px] text-[var(--color-gray-500)] leading-relaxed">{p.caveat}</p>

      {/* The counterweight. Same computation, opposite direction. */}
      <div className="mt-8 pt-8 border-t border-[var(--color-gray-200)]">
        <h4 className="text-xl font-display font-bold mb-3" style={{ color: MIDNIGHT }}>
          On the contact center side the comparison narrows
        </h4>
        <p className="text-[15px] text-[var(--color-gray-600)] leading-relaxed mb-6">
          The included-AI advantage is a Zoom Phone story. Among the contact center AI capabilities
          both vendors publish a rate for, {contactCenterAiDeltasFavouringRc.length} of{' '}
          {contactCenterAiDeltas.length} cost more on the Zoom Contact Center side.
        </p>
        <ul className="space-y-3">
          {contactCenterAiDeltas.map((d) => (
            <li
              key={d.capability}
              className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 text-[15px] text-[var(--color-gray-600)]"
            >
              <span className="font-semibold" style={{ color: MIDNIGHT }}>{d.capability}</span>
              <span>
                Zoom Contact Center {formatUsd(d.zoomMonthly)} · RingCentral {formatUsd(d.rcMonthly)}
                {d.delta === 0 ? (
                  <span className="ml-2 text-[var(--color-gray-500)]">— matched</span>
                ) : (
                  <span className="ml-2 font-semibold" style={{ color: BLUE_TEXT }}>
                    — {formatUsd(Math.abs(d.delta))} {d.delta > 0 ? 'more' : 'less'} a month
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] text-[var(--color-gray-600)] leading-relaxed">
          Which way that nets out depends on how much contact center AI you actually license, which
          is the sort of thing worth working through before you sign rather than after.
        </p>
      </div>
    </div>
  );
}


// --- Small presentational helpers ----------------------------------------

function SectionEyebrow({
  children,
  centered = false,
  color = BLUE_HOVER,
}: {
  children: React.ReactNode;
  centered?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 mb-3 ${centered ? 'justify-center' : ''}`}
      style={{ color }}
    >
      <span className="w-6 h-px" style={{ backgroundColor: color }} />
      <span className="text-sm font-semibold tracking-widest uppercase">{children}</span>
    </div>
  );
}

function RelatedCard({
  href,
  label,
  title,
  description,
}: {
  href: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: BLUE_HOVER }}>{label}</span>
      <h3 className="font-display font-bold text-base mt-2 mb-2 leading-snug" style={{ color: MIDNIGHT }}>
        {title}
      </h3>
      <p className="text-sm text-[var(--color-gray-600)] leading-relaxed flex-grow">{description}</p>
      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: BLUE_HOVER }}>
        Read more
        <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

function TrustItem({ icon: Icon, children }: { icon: typeof Handshake; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon weight="fill" className="w-4 h-4" style={{ color: BLUE_HOVER }} />
      <span>{children}</span>
    </div>
  );
}
