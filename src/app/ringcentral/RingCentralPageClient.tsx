'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
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
  PaperPlaneRight,
  WarningCircle,
  Calculator,
  Check,
  Monitor,
  Presentation,
  Ticket,
  Megaphone,
  Hash,
  Star,
  Globe,
  GlobeHemisphereWest,
  ChatCircleText,
  ChartLineUp,
  SealCheck,
  UsersThree,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Comparison } from '@/components/mdx/Comparison';
import { ArticleFAQ } from '@/components/mdx/ArticleFAQ';
import { company } from '@/config/company';
import {
  lastVerified,
  pricingSourceUrl,
  ringEx,
  ringExTierFeatures,
  ringCx,
  aiReceptionist,
  addOnGroups,
  otherLineItems,
  tierComparisons,
  formatUsd,
  type PlanTier,
  type QuotedPlan,
  type TierFeatures,
} from '@/data/ringcentral-pricing';
import { submitContactForm, type ContactFormData } from '../contact/actions';
import { ringCentralFaq } from './faq';

// --- Insero design system -------------------------------------------------
// Tokens from globals.css. Only the RingCentral logo keeps RingCentral's own
// colours; everything else on this page is Insero's palette.
//
// PRIMARY (#008838) clears AA on white but not on either tint (3.47:1 on the
// band), so it is used for icons and decorative fills only. All accent TEXT
// uses PRIMARY_DARK, which clears AA on white and on both tints.
const INK = 'var(--color-secondary)'; // headlines
const PRIMARY = 'var(--color-primary)'; // icons and decorative fills, on white
const PRIMARY_DARK = 'var(--color-primary-dark)'; // all accent text, any background
const TINT = 'var(--color-primary-50)'; // section background

// --- Section data ---------------------------------------------------------

// RingCentral's real published figures — the numbers RC leads with on its
// own marketing. Big ink numerals, small slate labels.
const rcStats = [
  { value: '600,000+', label: 'Businesses run on RingCentral' },
  { value: '99.999%', label: 'Uptime, 5+ years running' },
  { value: 'Billions', label: 'AI-enabled minutes processed monthly' },
  { value: '100+', label: 'Countries supported' },
];

// Three pillars mirroring RC's own product structure. Descriptions are
// original — deliberately not lifted from RingCentral's marketing copy.
const productPillars = [
  {
    name: 'Business Communications',
    icon: PhoneCall,
    description:
      'AI-powered calls, messaging, video, and fax unified in one RingEX app — so your whole team works from a single place across desk phone, desktop, and mobile.',
  },
  {
    name: 'Contact Center',
    icon: Headset,
    description:
      'RingCX is an AI-first contact center: real-time agent assist, automated conversation scoring, and live analytics that let supervisors step in before a customer walks.',
  },
  {
    name: 'Video Solutions',
    icon: VideoCamera,
    description:
      'AI-enhanced meetings, webinars, and rooms built for hybrid teams — with automatic summaries and action items so nothing from the conversation slips away.',
  },
];

const aiCapabilities = [
  {
    stage: 'Before the call',
    name: 'AI Receptionist (AIR)',
    icon: Robot,
    description:
      'Answers every call 24/7, understands what the caller wants, routes them to the right place, books appointments, and captures lead details — so nothing slips to voicemail at 2am.',
  },
  {
    stage: 'During the call',
    name: 'AI Virtual Assistant (AVA)',
    icon: Lightning,
    description:
      'Works alongside your team in the moment — real-time prompts, answers, and automation so reps get help while the customer is still on the line, not after.',
  },
  {
    stage: 'After the call',
    name: 'AI Conversation Expert (ACE)',
    icon: Brain,
    description:
      'Formerly RingSense. Summarizes calls and meetings, scores conversations for coaching, tracks topics and sentiment, and updates your CRM automatically — turning every conversation into usable insight.',
  },
];

const aiAlsoIncluded = [
  {
    name: 'AI Call Notes & personal assistant',
    icon: Sparkle,
    description:
      'Included with RingEX plans: automatic call summaries, action items, and a personal AI assistant that drafts follow-ups — genuinely useful AI you get without an upgrade.',
  },
  {
    name: 'RingCX — AI contact center',
    icon: Headset,
    description:
      'A full AI-powered contact center: real-time agent assist, automated CSAT scoring, live sentiment, and churn-risk detection so supervisors can step in before a customer walks.',
  },
];

const coreProducts = [
  {
    name: 'Business Phone (RingEX)',
    icon: PhoneCall,
    description: 'Cloud calling with auto-attendant, routing, voicemail, and desk, desktop, and mobile apps.',
  },
  {
    name: 'Video Meetings',
    icon: VideoCamera,
    description: 'Built-in HD video conferencing with AI summaries and recording.',
  },
  {
    name: 'Team Messaging',
    icon: ChatsCircle,
    description: 'Persistent team chat, file sharing, and tasks in one place.',
  },
  {
    name: 'SMS & Business Texting',
    icon: DeviceMobile,
    description: 'Send and receive texts from your business numbers, with compliance built in.',
  },
  {
    name: 'Contact Center (RingCX)',
    icon: Headset,
    description: 'Omnichannel, AI-powered contact center licensed separately from RingEX.',
  },
  {
    name: 'Integrations',
    icon: PuzzlePiece,
    description: 'Microsoft Teams, Salesforce, and a deep catalog of CRM and productivity integrations.',
  },
];

const inseroValue = [
  {
    icon: CurrencyDollar,
    title: 'It costs you nothing',
    description:
      'Providers compensate us, so you pay the same as going direct — and often less once current promotions are applied.',
  },
  {
    icon: Scales,
    title: 'Genuinely independent',
    description:
      "We're not RingCentral's sales team. If it's not the right fit for your business, we'll tell you and point you somewhere better.",
  },
  {
    icon: CheckCircle,
    title: 'We price your real configuration',
    description:
      'Seats, the add-ons that matter, and contact center if you need it — so the quote you see is the bill you get.',
  },
  {
    icon: ShieldCheck,
    title: 'We stay in your corner',
    description:
      'Quoting, contracts, implementation, and ongoing escalation and advocacy — one contact for the life of the account.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

// Shared RC orange pill CTA
const rcButtonClass =
  'group inline-flex items-center gap-3 px-10 py-5 bg-accent text-white font-semibold text-lg rounded-full hover:bg-[var(--color-accent-dark)] transition-colors duration-200 shadow-lg shadow-accent/25';

// --- Page -----------------------------------------------------------------

export function RingCentralPageClient() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      {/* WHITE page. The standard Insero light header sits above; the RC
          treatment begins here. No dark-hero attribute. */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-white overflow-hidden">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {/* Official RingCentral logo, unmodified — no recolour, crop, effect,
                  or change of proportion. Sized so it stays smaller than the Insero
                  mark in the site header on BOTH axes at every breakpoint:
                    Insero header  155x64 (mobile) / 194x80 (lg)
                    this logo      132x20 (mobile) / 158x24 (lg)
                  h-8 rendered 211px wide, which was wider than the Insero mark. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/carriers/RingCentral_Logo_%28Color%29.svg"
                alt="RingCentral"
                className="h-5 lg:h-6 w-auto mb-10"
              />

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-display font-bold leading-[1.1] tracking-tight mb-6"
                style={{ color: INK }}
              >
                What RingCentral<sup className="text-[0.5em] align-super">&reg;</sup> actually costs —{' '}
                <span style={{ color: PRIMARY_DARK }}>and whether it&apos;s right for you</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--color-gray-600)] mb-8 max-w-3xl leading-relaxed">
                RingCentral spreads its pricing across six pages. We put all of it on this one. Insero is an
                independent advisor who sources it at no cost to you — and if something else fits you better,
                we&apos;ll say so.
              </p>

              {/* The CTA points at the quote form further down this page rather
                  than /contact, so the hero doesn't send anyone off-page to fill
                  out a form we already have here. */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <a href="#get-a-quote">
                  <button className={rcButtonClass}>
                    <Phone weight="fill" className="w-5 h-5" />
                    <span>Get a Free Quote</span>
                    <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </a>
                <a
                  href="#pricing"
                  className="font-semibold text-lg hover:underline"
                  style={{ color: PRIMARY_DARK }}
                >
                  See the pricing
                </a>
              </div>
            </motion.div>

            {/* RC's public product video. Hides itself gracefully if the asset
                ever moves, so the hero stays clean. */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            >
              <HeroVideo />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===================== STATS BAND ===================== */}
      <section className="py-16 lg:py-20 bg-white border-t border-[var(--color-gray-100)]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {rcStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`px-4 py-6 sm:px-8 text-center lg:text-left ${
                  index > 0 ? 'lg:border-l lg:border-primary/25' : ''
                }`}
              >
                <div className="font-display font-bold text-4xl sm:text-5xl tracking-tight" style={{ color: INK }}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm sm:text-[15px] text-[var(--color-gray-500)] leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* These are RingCentral's own published claims, not Insero's
              measurements — attributed so they don't read as our findings. */}
          <p className="mt-6 px-4 sm:px-8 text-xs text-[var(--color-gray-500)]">Figures published by RingCentral.</p>
        </Container>
      </section>

      {/* ===================== HONEST PRICING ===================== */}
      {/* The consolidated all-in reference. Every figure renders from
          @/data/ringcentral-pricing — nothing here is hardcoded. */}
      <section id="pricing" className="scroll-mt-24 lg:scroll-mt-28 py-20 lg:py-32" style={{ backgroundColor: TINT }}>
        <Container>
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            <SectionEyebrow centered>Honest Pricing</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: INK }}>
              What RingCentral actually costs — all of it, in one place
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed">
              RingCentral publishes its pricing across six pages, one for each product family. A real
              deployment usually spans several of them — seats, contact center, the AI you want, and the
              numbers and rooms that go with it. We&apos;ve brought the published rates together here so you
              can price the whole thing in one place.
            </p>
          </motion.div>

          {/* Tabs. All four panels stay mounted; only CSS hides the inactive
              ones, so every published rate is present in the prerendered HTML. */}
          <motion.div {...fadeUp}>
            <PricingTabs />
          </motion.div>

          {/* The advisor math sits outside the tab system — always visible. */}
          <motion.div {...fadeUp} className="max-w-5xl mx-auto mt-16 lg:mt-20">
            <TierMathCard />
          </motion.div>

          <motion.p {...fadeUp} className="max-w-5xl mx-auto mt-10 lg:mt-12 text-sm text-[var(--color-gray-600)] text-center leading-relaxed">
            RingCentral&apos;s published US list pricing, verified {lastVerified}. Current pricing at{' '}
            <a
              href={pricingSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline"
              style={{ color: PRIMARY_DARK }}
            >
              ringcentral.com
            </a>
            .
          </motion.p>

          {/* --- Advisor close --- */}
          {/* Plain prose on the section tint, not a card. It closes the section
              rather than competing with the tier math above it, which is the
              only block down here that keeps card weight.
              Heading is scoped to configuration and the number, not to the case
              for using an advisor at all — "Why source RingCentral through
              Insero" owns that framing further down the page.
              On tint, gray-600 body text measures 6.82:1 and PRIMARY_DARK links
              clear AA; gray-500 would not, which is why it is not used here. */}
          <motion.div {...fadeUp} className="max-w-5xl mx-auto mt-12">
            <p className="text-base font-bold mb-3" style={{ color: INK }}>
              How Insero prices this for you
            </p>
            <p className="text-lg text-[var(--color-gray-600)] leading-relaxed">
              We publish RingCentral&apos;s list pricing because you should be able to see it before you
              talk to anyone. Those rates are RingCentral&apos;s to set. What we add is the fit: requesting
              pricing on your behalf, structuring the
              contract term and plan mix around how you actually use the system, and matching each tier to
              what you&apos;ll use so you&apos;re not licensing the same capability twice. Above{' '}
              {ringEx.publishedSeatCap} seats pricing is quote-based, so a quote is the only way to see
              your number.{' '}
              <Link href="#get-a-quote" className="font-semibold hover:underline" style={{ color: PRIMARY_DARK }}>
                Ask us for a quote
              </Link>{' '}
              and we&apos;ll price your actual configuration.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ===================== WHY SOURCE THROUGH INSERO ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <SectionEyebrow>The Difference</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: INK }}>
              Why source RingCentral through Insero
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-500)]">
              You can buy RingCentral directly. Here&apos;s why most businesses are better off having an
              independent advisor in the mix — at no extra cost. It&apos;s the same approach we bring to{' '}
              <Link href="/services/voice" className="font-semibold hover:underline" style={{ color: PRIMARY_DARK }}>
                every voice project
              </Link>
              .
            </p>
          </motion.div>

          {/* Also formerly tinted cards on a white section — white body, tinted
              band, same reasoning as the building blocks above. */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${cardGridRows}`}>
            {inseroValue.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={subgridCard}
                >
                  <CardHeader icon={Icon} title={item.title} titleClassName="text-lg" />
                  <div className={cardBodyClass}>
                    <p className="text-[var(--color-gray-600)] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== WHAT RINGCENTRAL IS ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>The Overview</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: INK }}>
              What RingCentral actually is
            </h2>
            <div className="space-y-5 text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed">
              <p>
                At its core, RingCentral is a cloud business communications platform: your phone system, video
                meetings, team messaging, and business texting, all delivered as a subscription and managed from
                one place. There&apos;s no PBX in a closet and no carrier lines to babysit — it&apos;s the modern{' '}
                <Link href="/resources/ucaas-explained" className="font-semibold hover:underline" style={{ color: PRIMARY_DARK }}>
                  hosted UCaaS
                </Link>{' '}
                model, and RingCentral is one of the most established names in it.
              </p>
              <p>
                It has a long-standing reputation for reliability — the kind of uptime and call quality that
                businesses build their day around. But what increasingly sets RingCentral apart is the depth of
                its AI layer. Where many providers bolt a summary feature onto calls and call it &quot;AI,&quot;
                RingCentral has built an agentic stack that does real work before, during, and after a
                conversation.
              </p>
              <p>
                That makes it a strong choice for teams that live on the phone — sales, support, and any
                business where the contact center is the front door. The catch, which we&apos;re upfront about
                above, is that the most powerful pieces are priced as add-ons rather than bundled into the base
                seat. Knowing which ones you actually need is most of the battle.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== AI CAPABILITIES (hook) ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/10" style={{ color: PRIMARY_DARK }}>
              <Sparkle weight="fill" className="w-4 h-4" />
              <span className="text-sm font-semibold">The AI Layer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: INK }}>
              One of the deepest agentic voice-AI stacks in the market
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed">
              RingCentral&apos;s agentic Voice AI suite spans the entire call — an AI that greets and routes
              callers, assists your reps live, and turns finished conversations into coaching and CRM updates.
              Here&apos;s the honest breakdown of what each piece does.
            </p>
          </motion.div>

          {/* Before / During / After */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ${cardGridRows}`}>
            {aiCapabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${subgridCard} hover:shadow-md transition-shadow duration-300`}
                >
                  <CardHeader eyebrow={cap.stage} icon={Icon} title={cap.name} />
                  <div className={cardBodyClass}>
                    <p className="text-[var(--color-gray-500)] leading-relaxed text-[15px]">{cap.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Also included / contact center */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${cardGridRows}`}>
            {aiAlsoIncluded.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={subgridCard}
                >
                  <CardHeader icon={Icon} title={item.name} titleClassName="text-lg" />
                  <div className={cardBodyClass}>
                    <p className="text-[var(--color-gray-500)] leading-relaxed text-[15px]">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== PRODUCT PILLARS ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container>
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow centered>The Platform</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: INK }}>
              Three pillars, one platform
            </h2>
            {/* gray-600, not gray-500: this intro sits directly on the tint now,
                where gray-500 measures 4.42:1 and misses AA. Inside the cards
                below, gray-500 is still on white and stays. */}
            <p className="text-lg md:text-xl text-[var(--color-gray-600)]">
              RingCentral is built around three product families. Here&apos;s what each one covers — and where a
              separate license comes into play.
            </p>
          </motion.div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 ${cardGridRows}`}>
            {productPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${subgridCard} hover:shadow-xl transition-all duration-300`}
                >
                  <CardHeader icon={Icon} title={pillar.name} titleClassName="text-xl lg:text-2xl" />
                  <div className={cardBodyClass}>
                    <p className="text-[var(--color-gray-500)] leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* The full building-block breakdown stays available below the pillars. */}
          {/* These were tinted cards on a white section. As banded cards they'd
              be tint-on-tint, so the body takes the white fill and the band
              carries the tint — matching the pillars directly above. */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:mt-8 ${cardGridRows}`}>
            {coreProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={subgridCard}
                >
                  <CardHeader icon={Icon} title={product.name} level={4} />
                  <div className={cardBodyClass}>
                    <p className="text-[var(--color-gray-500)] leading-relaxed text-sm">{product.description}</p>
                  </div>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: INK }}>
              Is RingCentral right for you?
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
                  'You want deep AI and contact-center capability, not just call summaries',
                  'Agentic voice AI — an AI receptionist, live agent assist, conversation intelligence — would genuinely move the needle',
                  'You value a mature, reliable platform with a long track record',
                  'Sales or support teams live on the phone and coaching matters',
                ],
              }}
              right={{
                title: 'Maybe not if…',
                points: [
                  'You want all the AI included in the base price rather than as add-ons',
                  'You’re very price-sensitive at the entry tier',
                  'A simpler, lighter phone system would cover everything you need',
                  'You’d rather a provider bundle AI in by default',
                ],
              }}
            />
          </motion.div>

          <motion.div {...fadeUp} className={`mt-8 ${cardClass}`}>
            <CardHeader icon={Scales} title="A quick word on RingCentral vs Zoom" titleClassName="text-lg" />
            <div className={cardBodyClass}>
              <div>
                <p className="text-[var(--color-gray-600)] leading-relaxed">
                  If &quot;all the AI included&quot; is your priority, it&apos;s worth comparing.{' '}
                  <Link href="/zoom" className="font-semibold hover:underline" style={{ color: PRIMARY_DARK }}>
                    Zoom
                  </Link>
                  , for example, includes its AI Companion features at no extra charge, which can be more
                  cost-effective when you want capable AI without assembling add-ons. RingCentral tends to pull
                  ahead when you need deep contact-center and conversation intelligence. We&apos;ll compare both
                  against your actual needs — no thumb on the scale.
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold" style={{ color: INK }}>
              RingCentral FAQ
            </h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <ArticleFAQ items={ringCentralFaq} />
          </motion.div>

          {/* Related reading */}
          <motion.div {...fadeUp} className="mt-14">
            <div className="flex items-center gap-2 mb-5" style={{ color: PRIMARY_DARK }}>
              <BookOpen weight="fill" className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">Related Reading</span>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 ${cardGridRows}`}>
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
              {/* Was the POTS cost estimator, which only covers legacy line
                  replacement — a different service, and a dead end for someone
                  pricing RingCentral. This answers the question this page
                  raises most often: how the advisory is free. */}
              <RelatedCard
                href="/resources/how-a-telecom-broker-works"
                label="How We Work"
                title="How a Telecom Broker Actually Works (And Why It's Free)"
                description="The honest answer to how we're paid, what we do that going direct doesn't, and when it isn't worth it."
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== FINAL CTA — LEAD FORM ===================== */}
      <section id="get-a-quote" className="scroll-mt-24 lg:scroll-mt-28 pt-24 lg:pt-28 pb-20 lg:pb-24 bg-white">
        <Container size="md">
          <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-8" style={{ color: PRIMARY_DARK }}>
              <span className="w-8 h-px" style={{ backgroundColor: PRIMARY_DARK }} />
              Let&apos;s Talk
              <span className="w-8 h-px" style={{ backgroundColor: PRIMARY_DARK }} />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-[1.1] tracking-tight" style={{ color: INK }}>
              Get a free RingCentral quote
            </h2>
            <p className="text-xl text-[var(--color-gray-600)] max-w-xl mx-auto leading-relaxed">
              Zero cost, honest advice. We&apos;ll price your real configuration — and tell you straight if
              something else fits you better.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <QuoteForm />
          </motion.div>

          <div className="mt-8 text-center">
            <a
              href={company.phoneLink}
              className="inline-flex flex-col items-center text-[var(--color-gray-600)] transition-colors hover:text-secondary"
            >
              <span className="text-lg">or call us at</span>
              <span className="font-bold text-2xl md:text-3xl mt-1" style={{ color: INK }}>{company.phoneFormatted}</span>
            </a>
          </div>

          <div className="mt-14 pt-10 border-t border-primary/20">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base md:text-lg text-[var(--color-gray-600)] font-medium">
              <TrustItem icon={Handshake}>Independent &mdash; Vendor-Neutral</TrustItem>
              <TrustItem icon={CurrencyDollar}>Same price as going direct</TrustItem>
              <TrustItem icon={Clock}>25+ Years Founder Experience</TrustItem>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== TRADEMARK CREDIT ===================== */}
      {/* Last block of page content, above the site footer. */}
      <section className="pb-10 bg-white">
        <Container size="md">
          <p className="text-xs text-[var(--color-gray-600)] leading-relaxed text-center">
            RingCentral is a registered trademark of RingCentral, Inc. Other third-party marks referenced
            herein are trademarks of their respective owners.
          </p>
        </Container>
      </section>
    </>
  );
}

// --- Pricing UI -----------------------------------------------------------
// A tabbed card layout mirroring RingCentral's own plans-and-pricing page.
//
// Two rules this file follows strictly:
//  1. No rate is written here. Every figure renders from
//     @/data/ringcentral-pricing, including the savings percentages, which are
//     read out of the published savings notes rather than restated.
//  2. All four panels stay mounted at all times and are hidden with CSS, so a
//     crawler sees RingCX and add-on pricing even though RingEX is the tab
//     that opens by default.

type PhosphorIcon = typeof Handshake;

// Every card in the pricing section is built the same way: a 1px slate border
// on all four sides, a tinted header band clipped by overflow-hidden, and a
// white body. No card carries a colored rule on a single edge.
const cardClass = 'rounded-xl bg-white border border-[var(--color-gray-200)] shadow-sm overflow-hidden';
const cardBodyClass = 'p-7 lg:p-8';

// Cards sit on a subgrid so every header band in a row shares the same bottom
// edge, no matter how many lines each tier description wraps to. The grid
// declares the two rows; each card spans and inherits them.
const cardGridRows = 'grid-rows-[auto_1fr]';
const subgridCard = `row-span-2 grid grid-rows-subgrid ${cardClass}`;

/**
 * Fill for every card header band — the single place this colour is set. One
 * step deeper than the TINT section background, the same relationship the
 * page had before, so a band on a tinted section still reads as part of the
 * card rather than as a recess in the page.
 */
const CARD_BAND = 'var(--color-primary-100)'; // #C6E8D3

/**
 * Text and badge colours that sit on CARD_BAND or on a badge fill. Measured
 * against WCAG AA (4.5:1) for normal text — the badges are 11px, so none of
 * them qualify for the large-text allowance.
 *
 *   INK             #1a2530 on CARD_BAND     11.76:1
 *   BAND_EYEBROW    #005C28 on CARD_BAND      6.20:1
 *   BAND_TEXT       #455563 on CARD_BAND      5.81:1
 *   white           on BADGE_SOLID            4.59:1
 *   BADGE_SOFT_TEXT on BADGE_SOFT_BG          7.28:1
 *
 * Badges are green, not orange: Insero's accent is reserved for CTAs, and an
 * Insero-orange badge sitting near the RingCentral-orange logo would read as
 * a mistake rather than a decision.
 */
const BAND_EYEBROW = PRIMARY_DARK;
const BAND_TEXT = 'var(--color-gray-600)';
const BADGE_SOLID = PRIMARY;
const BADGE_SOFT_BG = 'var(--color-primary-50)';
const BADGE_SOFT_TEXT = PRIMARY_DARK;

/** Tinted band at the top of every card: optional icon, title, optional badge
 *  opposite it, and an optional one-line description beneath. */
function CardHeader({
  title,
  description,
  badge,
  eyebrow,
  icon: Icon,
  level = 3,
  titleClassName,
}: {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  /** Small uppercase label above the title (a stage, a category). */
  eyebrow?: string;
  icon?: PhosphorIcon;
  level?: 3 | 4;
  /** Overrides the default title size where a card needs a different scale. */
  titleClassName?: string;
}) {
  const Heading = level === 4 ? 'h4' : 'h3';
  return (
    <div className="px-7 lg:px-8 py-6 border-b border-[var(--color-gray-200)]" style={{ backgroundColor: CARD_BAND }}>
      {eyebrow && (
        <span
          className="block text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: BAND_EYEBROW }}
        >
          {eyebrow}
        </span>
      )}
      {/* min-h pins the row to the heading's line box so a badge can't make one
          card's band taller than its neighbours' and misalign the dividers. */}
      <div className="flex items-center justify-between gap-3 min-h-7">
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <span
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-white"
              style={{ color: PRIMARY_DARK }}
            >
              <Icon weight="fill" className="w-5 h-5" />
            </span>
          )}
          <Heading
            className={`font-display font-bold ${titleClassName ?? (level === 4 ? 'text-base' : 'text-xl')}`}
            style={{ color: INK }}
          >
            {title}
          </Heading>
        </div>
        {badge}
      </div>
      {description && (
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: BAND_TEXT }}>
          {description}
        </p>
      )}
    </div>
  );
}

function PopularBadge() {
  return (
    <span
      className="flex-shrink-0 px-3 py-1 rounded-full text-white text-[11px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: BADGE_SOLID }}
    >
      Most popular
    </span>
  );
}

function PricedDifferentlyBadge() {
  return (
    <span
      className="flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: BADGE_SOFT_BG, color: BADGE_SOFT_TEXT }}
    >
      Priced differently
    </span>
  );
}

const TABS = [
  // First-use trademark symbols live here: after the pricing section moved
  // above the AI layer, these tab labels are the first RingEX / RingCX
  // mentions in DOM order. Later mentions carry no symbol.
  { id: 'ringex', label: `Business Phone (${ringEx.name}™)` },
  { id: 'ringcx', label: `Contact Center (${ringCx.name}™)` },
  { id: 'air', label: aiReceptionist.name },
  { id: 'other', label: 'Everything Else' },
] as const;

type TabId = (typeof TABS)[number]['id'];

/** Pull "33%" out of a published savings note so the toggle label never
 *  restates a number the data file already owns. */
function savingsPercent(note: string): string | null {
  return note.match(/\d+%/)?.[0] ?? null;
}

function PricingTabs() {
  const [active, setActive] = useState<TabId>('ringex');
  // Billing choice is shared across the two plan tabs, so switching tabs
  // doesn't silently reset what the visitor picked.
  const [annual, setAnnual] = useState(true);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = TABS.length - 1;
    let next = -1;
    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    if (next < 0) return;
    event.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      {/* Segmented pill selector */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="RingCentral pricing categories"
          className="inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-full bg-white border border-[var(--color-gray-200)] shadow-sm"
        >
          {TABS.map((tab, index) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`rc-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`rc-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`px-5 sm:px-7 py-3 rounded-full text-sm sm:text-base font-semibold transition-colors duration-200 ${
                  selected ? 'bg-primary text-white shadow-sm' : 'text-[var(--color-gray-500)] hover:text-secondary'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12 lg:mt-14">
        <TabPanel id="ringex" active={active}>
          <PlanPanel
            tiers={ringEx.tiers}
            quoted={ringEx.quoted}
            descriptions={ringExDescriptions}
            features={(name) => {
              const tierFeatures = ringExTierFeatures[name];
              return tierFeatures ? <TierFeatureList features={tierFeatures} /> : null;
            }}
            savingsNote={ringEx.annualSavingsNote}
            annual={annual}
            onToggle={setAnnual}
            notice={<SeatCapNotice />}
            // aboveBandNote is no longer appended here: it carries SeatCapNotice
            // now, and repeating it in the small print would undercut the promotion.
            footnote={ringEx.seatBandNote}
          />
        </TabPanel>

        <TabPanel id="ringcx" active={active}>
          <PlanPanel
            tiers={ringCx.tiers}
            quoted={ringCx.quoted}
            descriptions={ringCxDescriptions}
            features={(name) => {
              const items = ringCxFeatures(name);
              return <FeatureList items={items.length > 0 ? items : quotedFeatures} />;
            }}
            savingsNote={ringCx.annualSavingsNote}
            annual={annual}
            onToggle={setAnnual}
            footnote={`${ringCx.name} is licensed separately from ${ringEx.name}.`}
          />
        </TabPanel>

        <TabPanel id="air" active={active}>
          <AIReceptionistPanel />
        </TabPanel>

        <TabPanel id="other" active={active}>
          <EverythingElsePanel />
        </TabPanel>
      </div>
    </div>
  );
}

function TabPanel({
  id,
  active,
  children,
}: {
  id: TabId;
  active: TabId;
  children: React.ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      id={`rc-panel-${id}`}
      aria-labelledby={`rc-tab-${id}`}
      className={active === id ? '' : 'hidden'}
    >
      {children}
    </div>
  );
}

// --- Plan tabs (RingEX, RingCX) -------------------------------------------

// Card copy below is descriptive only. Nothing here asserts a capability that
// this page doesn't already state elsewhere, and the RingCX inclusions are
// derived from the data file rather than retyped — see ringCxFeatures.

const ringExDescriptions: Record<string, string> = {
  Core: 'Cloud phone, video, and messaging for teams coming off legacy lines.',
  Advanced: 'More depth for teams that spend the whole day on the phone.',
  Ultra: 'The top of the platform, for the most demanding deployments.',
  'Customer Engagement Bundle': 'Packaged pricing RingCentral quotes case by case.',
};

const ringCxDescriptions: Record<string, string> = {
  Standard: 'Omnichannel contact center, with the AI licensed as add-ons.',
  Professional: 'Standard, with two of the AI capabilities folded in.',
  Elite: 'Professional, with the remaining AI capabilities included.',
  'Enterprise Contact Center': 'Quote-based, scoped to the deployment.',
};

const ringCxBaseFeatures: Record<string, string[]> = {
  Standard: [
    'Omnichannel voice and digital contact center',
    'Live dashboards and reporting for supervisors',
    'AI capabilities available as add-ons',
  ],
  Professional: ['Everything in Standard'],
  Elite: ['Everything in Professional'],
};

/** Base copy plus the add-ons the tier bundles — read from tierComparisons so
 *  the card and the math callout can never disagree about what's included. */
function ringCxFeatures(tierName: string): string[] {
  const bundled =
    tierComparisons
      .find((comparison) => comparison.targetTier === tierName)
      ?.addOns.map((addOn) => `${addOn.name} included`) ?? [];
  return [...(ringCxBaseFeatures[tierName] ?? []), ...bundled];
}

const quotedFeatures = ['Quote-based pricing', 'We scope and quote it with you'];

function PlanPanel({
  tiers,
  quoted,
  descriptions,
  features,
  savingsNote,
  annual,
  onToggle,
  footnote,
  notice,
}: {
  tiers: readonly PlanTier[];
  quoted: readonly QuotedPlan[];
  descriptions: Record<string, string>;
  features: (tierName: string) => React.ReactNode;
  savingsNote: string;
  annual: boolean;
  onToggle: (next: boolean) => void;
  footnote: string;
  /** Sits between the cards and the footnote, for anything that must not be
      read as small print. */
  notice?: React.ReactNode;
}) {
  // The middle priced tier carries the badge, the way RC flags a plan.
  const popularIndex = Math.floor((tiers.length - 1) / 2);

  return (
    <div>
      <BillingToggle annual={annual} onToggle={onToggle} savingsNote={savingsNote} />

      <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7 ${cardGridRows}`}>
        {tiers.map((tier, index) => (
          <PlanCard
            key={tier.name}
            tier={tier}
            annual={annual}
            popular={index === popularIndex}
            description={descriptions[tier.name]}
            features={features(tier.name)}
          />
        ))}
        {quoted.map((plan) => (
          <QuotePlanCard
            key={plan.name}
            plan={plan}
            description={descriptions[plan.name]}
            features={features(plan.name)}
          />
        ))}
      </div>

      {/* The footnote describes the cards, so it sits with them, above any
          notice. It used to be stranded between two callouts. */}
      <p className="mt-10 text-center text-[15px] text-[var(--color-gray-600)] max-w-3xl mx-auto leading-relaxed">
        {footnote}
      </p>

      {notice}
    </div>
  );
}

/**
 * The seat-cap caution, directly under the RingEX cards.
 *
 * This was a clause in the small-print footnote, where a 250-seat buyer could
 * read the published rates as theirs and budget from a number that was never
 * quoted to them — the most expensive misread available on this page. It gets
 * card weight instead.
 *
 * Deliberately no accent orange: that colour is the CTA's alone here. The
 * caution reads from the icon, the rule, and the position, not from a warning
 * colour. The framing is neutral toward RingCentral — publishing one band and
 * quoting the rest is ordinary enterprise practice, not a catch.
 *
 * An inline notice rather than a banded card: below the plan cards only the
 * tier math earns full card weight, and three stacked cards flattened the
 * whole section to one level. This reads as an important aside instead.
 * White fill, so gray-600 body text and a PRIMARY_DARK link both keep the
 * contrast they had inside the card.
 */
function SeatCapNotice() {
  return (
    <div
      className="mt-8 max-w-3xl mx-auto bg-white rounded-r-lg py-5 pl-6 pr-7"
      style={{ borderLeft: '3px solid var(--color-primary)' }}
    >
      <p className="text-[var(--color-gray-600)] leading-relaxed">
        <WarningCircle
          weight="fill"
          className="inline w-5 h-5 mr-2 align-text-bottom"
          style={{ color: PRIMARY }}
        />
        <strong className="font-semibold" style={{ color: INK }}>
          Buying more than {ringEx.publishedSeatCap} seats?
        </strong>{' '}
        The rates above are RingCentral&apos;s published pricing for 1&ndash;{ringEx.publishedSeatCap}{' '}
        users. Past {ringEx.publishedSeatCap} seats RingCentral prices each deployment individually and
        publishes no rate at all, so a quote is the only way to know your number &mdash; it is not the
        published price with a discount applied.{' '}
        <Link href="#get-a-quote" className="font-semibold hover:underline" style={{ color: PRIMARY_DARK }}>
          Get a quote for your seat count
        </Link>
        .
      </p>
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
        className="group inline-flex items-center gap-3 rounded-full px-2 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span
          aria-hidden="true"
          className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors duration-200 ${
            annual ? 'bg-primary' : 'bg-[var(--color-gray-300)]'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
              annual ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </span>
        <span className="text-[15px] font-semibold" style={{ color: INK }}>
          {percent ? `Save up to ${percent} by paying annually` : savingsNote}
        </span>
      </button>
    </div>
  );
}

function PlanCard({
  tier,
  annual,
  popular,
  description,
  features,
}: {
  tier: PlanTier;
  annual: boolean;
  popular: boolean;
  description?: string;
  features: React.ReactNode;
}) {
  return (
    <div className={subgridCard}>
      <CardHeader
        title={tier.name}
        description={description}
        badge={popular ? <PopularBadge /> : undefined}
      />

      <div className={`flex flex-col flex-grow ${cardBodyClass}`}>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-display font-bold text-5xl tracking-tight" style={{ color: INK }}>
            {formatUsd(annual ? tier.annual : tier.monthly)}
          </span>
          {annual && (
            <span className="text-xl text-[var(--color-gray-500)] line-through">{formatUsd(tier.monthly)}</span>
          )}
        </div>
        <p className="mt-2 text-sm text-[var(--color-gray-500)]">
          /user/month {annual ? 'paid annually' : 'billed monthly'}
        </p>

        {features}
      </div>
    </div>
  );
}

function QuotePlanCard({
  plan,
  description,
  features,
}: {
  plan: QuotedPlan;
  description?: string;
  features: React.ReactNode;
}) {
  return (
    <div className={subgridCard}>
      <CardHeader title={plan.name} description={description} />

      <div className={`flex flex-col flex-grow ${cardBodyClass}`}>
        <span className="font-display font-bold text-3xl tracking-tight leading-tight block" style={{ color: INK }}>
          Contact us for pricing
        </span>
        <p className="mt-2 text-sm text-[var(--color-gray-500)]">{plan.note}</p>

        {features}
      </div>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-8 pt-7 border-t border-[var(--color-gray-100)]">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] text-[var(--color-gray-600)] leading-snug">
            <Check weight="bold" className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: PRIMARY }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// RingEX tier contents. RingCentral presents its tiers cumulatively, so each
// card leads with what it inherits and lists only what the tier adds. The AI
// group is kept visually separate the way RC separates it.
//
// Display cap only — if a tier's transcribed list ever outgrows the card, the
// overflow is linked rather than silently dropped. Nothing truncates today
// (Ultra is the longest at exactly this many items).
const MAX_BASE_FEATURES = 6;

function TierFeatureList({ features }: { features: TierFeatures }) {
  const shown = features.base.slice(0, MAX_BASE_FEATURES);
  const overflow = features.base.length - shown.length;

  return (
    <div className="mt-8 pt-7 border-t border-[var(--color-gray-100)]">
      {features.inheritsFrom && (
        <p className="text-[15px] font-semibold mb-4 leading-snug" style={{ color: INK }}>
          Everything in {features.inheritsFrom}{' '}
          <span style={{ color: PRIMARY_DARK }}>PLUS:</span>
        </p>
      )}

      <ul className="space-y-3">
        {shown.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] text-[var(--color-gray-600)] leading-snug">
            <Check weight="bold" className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: PRIMARY }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {overflow > 0 && (
        <a
          href={pricingSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm font-semibold hover:underline"
          style={{ color: PRIMARY_DARK }}
        >
          +{overflow} more on RingCentral&apos;s pricing page
        </a>
      )}

      {features.ai.length > 0 && (
        <div className="mt-6 pt-5 border-t border-[var(--color-gray-100)]">
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: PRIMARY_DARK }}>
            AI
          </p>
          <ul className="space-y-3">
            {features.ai.map((item) => (
              <li key={item.name} className="flex gap-3 text-[15px] text-[var(--color-gray-600)] leading-snug">
                <Sparkle weight="fill" className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: PRIMARY }} />
                <span>
                  {item.name}
                  {item.addOn && (
                    <span
                      className="ml-2 inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide align-middle"
                      style={{ backgroundColor: BADGE_SOFT_BG, color: BADGE_SOFT_TEXT }}
                    >
                      Add-on
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// --- AI Receptionist tab --------------------------------------------------
// Kept visually distinct in orange: AIR is licensed per receptionist instance
// and metered by minutes, so it does not belong in a per-user card grid.

function AIReceptionistPanel() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h3 className="text-2xl sm:text-3xl font-display font-bold" style={{ color: INK }}>
          {aiReceptionist.name} ({aiReceptionist.abbreviation}) is not a per-user add-on
        </h3>
        <p className="mt-4 text-lg text-[var(--color-gray-600)] leading-relaxed max-w-2xl mx-auto">
          Every other plan on this page is billed per user, per month.{' '}
          {aiReceptionist.abbreviation} is licensed{' '}
          <strong style={{ color: INK }}>{aiReceptionist.billingUnit}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-7">
        <AirPriceCard
          amount={aiReceptionist.withRingEx}
          title={`With ${ringEx.name}`}
          description={`Added to existing ${ringEx.name} phone service.`}
        />
        <AirPriceCard
          amount={aiReceptionist.standalone}
          title="Standalone"
          description={`On its own, without ${ringEx.name}.`}
        />
      </div>

      <div className={`mt-7 ${cardClass}`}>
        <CardHeader title="How the usage model works" icon={Robot} />
        <div className={cardBodyClass}>
          <div>
            <ul className="space-y-3 mb-7">
              <li className="flex gap-3 text-[var(--color-gray-600)] leading-relaxed">
                <Check weight="bold" className="w-4 h-4 mt-1.5 flex-shrink-0" style={{ color: PRIMARY }} />
                <span>{aiReceptionist.includedMinutes} minutes included at both price points.</span>
              </li>
              <li className="flex gap-3 text-[var(--color-gray-600)] leading-relaxed">
                <Check weight="bold" className="w-4 h-4 mt-1.5 flex-shrink-0" style={{ color: PRIMARY }} />
                <span>
                  {formatUsd(aiReceptionist.overagePerMinute)} per minute after that.{' '}
                  {aiReceptionist.overageNote}
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-gray-600)] leading-relaxed">
                <Check weight="bold" className="w-4 h-4 mt-1.5 flex-shrink-0" style={{ color: PRIMARY }} />
                <span>{aiReceptionist.bundleNote}</span>
              </li>
            </ul>
            <p className="text-[var(--color-gray-600)] leading-relaxed text-lg border-t border-[var(--color-gray-100)] pt-6">
              <strong style={{ color: INK }}>Worth saying plainly:</strong> people routinely budget{' '}
              {aiReceptionist.abbreviation} as a per-seat cost and it isn&apos;t one. A ten-person business and
              a two-hundred-person business pay the same license fee. What separates their bills is how many
              minutes of calls the receptionist actually handles — so the number to forecast is call volume,
              not headcount.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AirPriceCard({
  amount,
  title,
  description,
}: {
  amount: number;
  title: string;
  description: string;
}) {
  return (
    <div className={`flex flex-col ${cardClass}`}>
      <CardHeader title={title} badge={<PricedDifferentlyBadge />} />
      <div className={cardBodyClass}>
        <div>
          <span className="font-display font-bold text-5xl tracking-tight" style={{ color: INK }}>
            {formatUsd(amount)}
          </span>
          <span className="text-lg text-[var(--color-gray-500)] ml-1">/mo</span>
        </div>
        <p className="mt-3 text-[15px] text-[var(--color-gray-500)] leading-relaxed">{description}</p>
        <p className="mt-1 text-sm font-semibold" style={{ color: PRIMARY_DARK }}>
          {aiReceptionist.billingUnit}
        </p>
      </div>
    </div>
  );
}

// --- Everything Else tab --------------------------------------------------

const lineItemIcons: Record<string, PhosphorIcon> = {
  'Conversational Intelligence (ACE)': Brain,
  'Call Queues Booster': PhoneCall,
  'Business SMS Booster': DeviceMobile,
  'AI Quality Management': SealCheck,
  'AI Interaction Analytics': ChartLineUp,
  'AI Agent Assist': Lightning,
  'AI Supervisor Assist': Headset,
  'AI Workforce Management': UsersThree,
  'Video Meetings': VideoCamera,
  'RingCentral Rooms': Monitor,
  'RingCentral Webinar': Presentation,
  'RingCentral Events': Ticket,
  'Push to Talk': Megaphone,
  'Additional toll-free or local numbers': Hash,
  'Vanity numbers': Star,
  'Additional international toll-free': Globe,
  'Additional international numbers': GlobeHemisphereWest,
  'High Volume SMS': ChatCircleText,
};

function EverythingElsePanel() {
  return (
    <div className="space-y-14">
      {addOnGroups.map((group) => (
        <div key={group.group}>
          <LineItemGroupHeading title={group.group} subtitle={`Licensed on top of a base plan · ${group.unit}`} />
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${cardGridRows}`}>
            {group.items.map((item) => (
              <LineItemCard
                key={item.name}
                name={item.name}
                description={item.note}
                price={formatUsd(item.price)}
                priceNote={group.unit}
              />
            ))}
          </div>
        </div>
      ))}

      <div>
        <LineItemGroupHeading title="Other line items" subtitle="Metered as noted on each card" />
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${cardGridRows}`}>
          {otherLineItems.map((item) => (
            <LineItemCard
              key={item.name}
              name={item.name}
              description={item.note}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LineItemGroupHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7">
      <h3 className="text-2xl font-display font-bold" style={{ color: INK }}>{title}</h3>
      <p className="mt-1.5 text-[15px] text-[var(--color-gray-600)]">{subtitle}</p>
    </div>
  );
}

function LineItemCard({
  name,
  description,
  price,
  priceNote,
}: {
  name: string;
  description?: string;
  price: string;
  priceNote?: string;
}) {
  const Icon = lineItemIcons[name] ?? PuzzlePiece;
  return (
    <div className={subgridCard}>
      <CardHeader title={name} icon={Icon} level={4} />
      <div className={`flex flex-col flex-grow ${cardBodyClass}`}>
        {description && <p className="text-[15px] text-[var(--color-gray-500)] leading-relaxed mb-6">{description}</p>}
        {/* mt-auto keeps prices on one baseline across a row even when only
            some cards in that row carry a description. */}
        <div className="mt-auto">
          <span className="font-display font-bold text-2xl" style={{ color: INK }}>{price}</span>
          {priceNote && <span className="block mt-1 text-sm text-[var(--color-gray-500)]">{priceNote}</span>}
        </div>
      </div>
    </div>
  );
}

// --- The advisor math -----------------------------------------------------
// Comparisons are computed in the data file from the same published rates the
// cards render, so the two can never drift. Presentation only below here.

function TierMathCard() {
  return (
    // The only full card below the plan cards, and the one carrying the
    // section's payoff — a heavier shadow lifts it in front of the inline
    // notice and the prose around it. Built off cardClass by swapping the
    // shadow rather than appending one, so there is no shadow-sm/shadow-lg
    // race in the emitted class order.
    <div className={cardClass.replace('shadow-sm', 'shadow-lg')}>
      <CardHeader title="Sometimes the higher tier costs less" icon={Calculator} />

      <div className="p-8 lg:p-10">
        <p className="text-lg text-[var(--color-gray-600)] leading-relaxed mb-8">
          RingCentral bundles several AI features into the higher {ringCx.name} tiers. That means the tier you
          need sometimes costs less than building up from a lower one. Here&apos;s where that happens.
        </p>

        {/* Four shared row lines — heading, line items, à-la-carte total,
            winning chip — so the dividers and chips land on the same baseline
            in both columns even though one comparison has three line items and
            the other has four. The 1fr on the line-items row is what absorbs
            the difference: the shorter list stretches, and everything after it
            stays aligned. Same subgrid technique as the card header bands.

            Subgrid is lg-only. Stacked on one column there is nothing to align
            across, so the children stay in normal flow and space-y-5 carries
            the rhythm at both breakpoints — which is also why the row gap goes
            to 0 at lg, so the two never stack up. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-y-0 gap-x-8 lg:gap-x-12 lg:grid-rows-[auto_1fr_auto_auto]">
        {tierComparisons.map((comparison) => (
          <div
            key={`${comparison.baseTier}-${comparison.targetTier}`}
            className="space-y-5 lg:row-span-4 lg:grid lg:grid-rows-subgrid"
          >
            {/* 1 — the progression being priced */}
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: PRIMARY_DARK }}>
              {comparison.baseTier} &rarr; {comparison.targetTier}
            </p>

            {/* 2 — the addends */}
            <ul className="space-y-3">
              <EquationRow label={`${ringCx.name} ${comparison.baseTier}`} value={formatUsd(comparison.baseTierPrice)} />
              {comparison.addOns.map((addOn) => (
                <EquationRow key={addOn.name} label={`+ ${addOn.name}`} value={formatUsd(addOn.price)} />
              ))}
            </ul>

            {/* 3 — the setup: what building it up costs. Deliberately quiet. */}
            <div className="flex justify-between items-baseline gap-4 border-t border-[var(--color-gray-200)] pt-5 text-lg text-[var(--color-gray-600)]">
              <span>Built à la carte</span>
              <span className="font-semibold tabular-nums whitespace-nowrap">
                {formatUsd(comparison.buildUpTotal)}/agent/mo
              </span>
            </div>

            {/* 4 — the answer. The chip is the only filled element in the card,
                which is what makes the punchline findable without reading the
                stack above it. */}
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--color-primary-50)' }}>
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-display font-semibold text-lg leading-snug" style={{ color: PRIMARY_DARK }}>
                  {ringCx.name} {comparison.targetTier}
                </span>
                <span
                  className="font-display font-semibold text-xl tabular-nums whitespace-nowrap"
                  style={{ color: PRIMARY_DARK }}
                >
                  {formatUsd(comparison.targetTierPrice)}/agent/mo
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold" style={{ color: PRIMARY_DARK }}>
                Saves {formatUsd(comparison.savings)}/agent/mo
              </p>
            </div>
          </div>
          ))}
        </div>

        <p className="text-lg text-[var(--color-gray-600)] leading-relaxed mt-8">
          Both examples use the published rates above. Matching the tier to what you&apos;ll actually use is
          part of every quote we put together — it&apos;s usually the quickest place to find savings.
        </p>
      </div>
    </div>
  );
}

function EquationRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between items-baseline gap-4 text-[15px] text-[var(--color-gray-600)]">
      <span>{label}</span>
      {/* tabular-nums so the prices form a column even at ragged label widths. */}
      <span className="font-semibold tabular-nums whitespace-nowrap">{value}</span>
    </li>
  );
}


// --- Hero product video ---------------------------------------------------
// RingCentral's official partner-portal animation, self-hosted from
// /public/video rather than streamed from RingCentral's CDN.
//
// The asset is 776x700 — nearly square, not the landscape shape a hero column
// usually takes. The wrapper is capped and centred so the clip plays at its
// own proportions; w-full h-auto lets the video size intrinsically, so it is
// never stretched or cropped.
//
// Both encodes carry a real alpha channel, so the clip composites over the
// desk backdrop instead of being keyed against the page.
//
// webm is listed first and is the one Chrome and Firefox take: VP9-with-alpha
// at 2.1 MB. Safari cannot decode it and falls through to the HEVC-with-alpha
// mp4, which is 7.2 MB — the reason the order is the reverse of the old
// opaque pair, where the smaller file was the mp4. The mp4's type carries
// codecs="hvc1" because Safari will not select the source on the bare
// video/mp4 type.
//
// Two error handlers, covering the two distinct failure modes:
//
//  - LOAD failure fires `error` on the <source> element, and that event does
//    not bubble, so only a handler on the source sees it. The browser walks
//    the list in order and gives up after the last entry, so that is the one
//    that has to report.
//  - DECODE failure (MEDIA_ERR_DECODE — file downloads fine but will not play)
//    fires on the media element instead, where no source handler would run.
//
// Both call the same setFailed, and the frame can only unmount once.

function HeroVideo() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // 16:9 panel filling its grid column, matching the proportions RingCentral
    // gives its own hero visual. aspect-video reserves the full box before any
    // asset arrives, and both children are taken out of flow, so nothing here
    // can shift the page as it loads.
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
      {/* The surface the devices float on. A <picture> rather than a CSS
          background-image: image-set() is the only way to express
          "webp, falling back to jpg" that every browser honours — image-set()
          with type() only landed in Safari 17, and Safari is precisely the
          browser being served here, so 15 and 16 would have got no backdrop
          at all behind a now-transparent clip. Cover and centred, filling the
          panel and clipped by its overflow-hidden. */}
      <picture>
        <source srcSet="/images/rc_hero_desk_wide.webp" type="image/webp" />
        <img
          src="/images/rc_hero_desk_wide.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>

      {/* The clip is 776x700, so it can never fill a 16:9 box without being
          stretched. Sized by height instead and centred: at 88% of panel
          height it comes out ~55% of panel width, leaving the bokeh to carry
          the rest — which is the point of the wide panel. Absolutely
          positioned so it stays out of flow and contributes no layout shift.

          aspect-[776/700] is load-bearing, not decoration. The width/height
          attributes give the UA `aspect-ratio: auto 776 / 700`, and the `auto`
          keyword defers to the media's real ratio — which is 0x0 until the clip
          decodes. Before that, w-auto had nothing to resolve against and fell
          back to the containing block, stretching the box to the panel's 16:9
          (measured 506x285 instead of 316x285). An explicit ratio holds 776:700
          from first paint, through the poster, and after load. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        // Same URL the <picture> above resolves to on any browser that can
        // decode either alpha encode, so the poster costs no extra bytes: one
        // fetch shared with the backdrop. Pointing it at the .jpg instead
        // pulled a second copy of the same image on every load.
        poster="/images/rc_hero_desk_wide.webp"
        width={776}
        height={700}
        onError={() => setFailed(true)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[88%] w-auto aspect-[776/700] max-w-full block"
      >
        <source src="/video/rc_hero_alpha.webm" type="video/webm" />
        <source
          src="/video/rc_hero_alpha.mp4"
          type='video/mp4; codecs="hvc1"'
          onError={() => setFailed(true)}
        />
      </video>
    </div>
  );
}

// --- On-page quote form ---------------------------------------------------
// Reuses the exact /contact submission path (submitContactForm → Supabase
// insert + email + portal opportunity). Source is tagged through the existing
// `service` column since the schema has no dedicated source field.

interface QuoteFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  _hp?: string;
}

function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formLoadedAt] = useState(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>();

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitError(null);
    const trimmedName = data.name.trim();
    const firstSpace = trimmedName.indexOf(' ');
    const firstName = firstSpace === -1 ? trimmedName : trimmedName.slice(0, firstSpace);
    const lastName = firstSpace === -1 ? '' : trimmedName.slice(firstSpace + 1).trim();

    const formData: ContactFormData = {
      firstName,
      lastName,
      email: data.email,
      phone: data.phone || undefined,
      company: data.company || undefined,
      // Tag the lead source through the existing service field.
      services: ['RingCentral (source: ringcentral-page)'],
      message: data.message || undefined,
      _hp: data._hp,
      _t: formLoadedAt,
    };

    const result = await submitContactForm(formData);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl border-2 bg-white text-secondary transition-colors focus:outline-none';
  const okBorder = 'border-[var(--color-gray-200)] focus:border-primary';
  const errBorder = 'border-red-400 focus:border-red-500';

  if (isSubmitted) {
    return (
      <div className="rounded-xl bg-white border border-[var(--color-gray-200)] p-8 lg:p-12 shadow-sm text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6" style={{ color: PRIMARY }}>
          <CheckCircle weight="fill" className="w-10 h-10" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-display font-bold mb-3" style={{ color: INK }}>
          Thanks — we&apos;ve got it
        </h3>
        <p className="text-[var(--color-gray-500)] max-w-md mx-auto mb-8">
          We&apos;ll price your real RingCentral configuration and get back to you within one business day.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setSubmitError(null);
            reset();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full border-2 transition-colors"
          style={{ color: PRIMARY_DARK, borderColor: PRIMARY_DARK }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white border border-[var(--color-gray-200)] p-8 lg:p-10 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot — hidden from real users */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
          <label htmlFor="rc-website">Website</label>
          <input type="text" id="rc-website" tabIndex={-1} autoComplete="off" {...register('_hp')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="rc-name" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Name *</label>
            <input
              type="text" id="rc-name"
              {...register('name', { required: 'Name is required' })}
              className={`${inputClass} ${errors.name ? errBorder : okBorder}`}
              placeholder="Jane Smith"
            />
            {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="rc-email" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Email *</label>
            <input
              type="email" id="rc-email"
              {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
              className={`${inputClass} ${errors.email ? errBorder : okBorder}`}
              placeholder="jane@company.com"
            />
            {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="rc-phone" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Phone</label>
            <input
              type="tel" id="rc-phone" {...register('phone')}
              className={`${inputClass} ${okBorder}`}
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <label htmlFor="rc-company" className="block text-sm font-semibold mb-2" style={{ color: INK }}>Company</label>
            <input
              type="text" id="rc-company" {...register('company')}
              className={`${inputClass} ${okBorder}`}
              placeholder="Your Company Inc."
            />
          </div>
        </div>

        <div>
          <label htmlFor="rc-message" className="block text-sm font-semibold mb-2" style={{ color: INK }}>How can we help?</label>
          <textarea
            id="rc-message" {...register('message')} rows={3}
            className={`${inputClass} ${okBorder} resize-none`}
            placeholder="Seats, add-ons you're weighing, contact center needs — anything that helps us price it right."
          />
        </div>

        {submitError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <WarningCircle weight="fill" className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white font-semibold text-lg rounded-full shadow-lg shadow-accent/25 hover:bg-[var(--color-accent-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Sending…</span>
          ) : (
            <>
              <span>Get My Free RingCentral Quote</span>
              <PaperPlaneRight weight="fill" className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-sm text-[var(--color-gray-500)] text-center">
          By submitting, you agree to be contacted about your quote. We never share your information.
        </p>
      </form>
    </div>
  );
}

// --- Small presentational helpers ----------------------------------------

function SectionEyebrow({
  children,
  centered = false,
  color = PRIMARY_DARK,
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
    <Link href={href} className={`group ${subgridCard} hover:shadow-xl transition-all duration-300`}>
      <CardHeader eyebrow={label} title={title} titleClassName="text-base leading-snug" />
      <div className={`flex flex-col ${cardBodyClass}`}>
        <p className="text-sm text-[var(--color-gray-500)] leading-relaxed flex-grow">{description}</p>
        <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: PRIMARY_DARK }}>
          Read more
          <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

function TrustItem({ icon: Icon, children }: { icon: typeof Handshake; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon weight="fill" className="w-4 h-4" style={{ color: PRIMARY_DARK }} />
      <span>{children}</span>
    </div>
  );
}
