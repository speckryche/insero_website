'use client';

import { useRef, useState } from 'react';
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
import { Comparison } from '@/components/mdx/Comparison';
import { ArticleFAQ } from '@/components/mdx/ArticleFAQ';
import { company } from '@/config/company';
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
import { zoomFaq } from './faq';

// --- Zoom brand palette ---------------------------------------------------
// Zoom's real design language: white pages, huge near-black "midnight"
// headlines, Zoom Blue for CTAs and accents, soft blue tints, and heavily
// rounded corners — airy and friendly. Insero lives only in the header,
// footer, and the words — never in the page's color system.
const MIDNIGHT = '#00053D'; // headlines, near-black navy
const BLUE = '#0B5CFF'; // CTAs, accents, links
const BLUE_HOVER = '#0847C4';
const TINT = '#EDF3FF'; // light blue section background

// --- Section data ---------------------------------------------------------

const aiCapabilities = [
  {
    stage: 'Included free',
    name: 'AI Companion',
    icon: Sparkle,
    description:
      "Included with eligible paid plans at no extra cost: call and meeting summaries, voicemail prioritization, and task extraction that auto-creates Zoom Tasks with owners and deadlines — plus 'ask AI Companion' for instant answers during and after calls.",
  },
  {
    stage: 'Agentic',
    name: 'AI Companion 3.0',
    icon: Brain,
    description:
      'The agentic evolution: a cross-platform work surface that pulls context from your files and apps and drives conversation-to-action workflows, instead of just summarizing after the fact.',
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
    name: 'Custom AI Companion (add-on)',
    icon: PuzzlePiece,
    description:
      'Vertical- and role-tuned AI agents you can shape to your own workflows — a paid add-on for teams that want AI specialized to how they actually work.',
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
    description: 'Send and receive business texts and media from your Zoom numbers.',
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
      "We're not Zoom's sales team. If it's not the right fit for your business, we'll tell you and point you somewhere better.",
  },
  {
    icon: CheckCircle,
    title: 'We price your real configuration',
    description:
      'Seats, license bundling, the add-ons that matter, and contact center if you need it — so the quote you see is the bill you get.',
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

// Shared Zoom blue pill CTA
const zoomButtonClass =
  'group inline-flex items-center gap-3 px-10 py-5 bg-[#0B5CFF] text-white font-semibold text-lg rounded-full hover:bg-[#0847C4] transition-colors duration-200 shadow-lg shadow-[#0B5CFF]/25';

// --- Page -----------------------------------------------------------------

export function ZoomPageClient() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      {/* WHITE page. The standard Insero light header sits above; the Zoom
          treatment begins here. No dark-hero attribute. */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-white overflow-hidden">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            {/* Logo sits directly on white — no pill needed */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carriers/Zoom.png" alt="Zoom" className="h-8 w-auto mb-10" />

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-display font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: MIDNIGHT }}
            >
              Zoom for Business —{' '}
              <span style={{ color: BLUE }}>AI-First Phone, Built In</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-[#475569] mb-10 max-w-3xl leading-relaxed">
              Zoom Phone is a leading AI-first cloud phone platform — best known for video, but now a full
              business communications suite with capable AI included by default. Insero is the independent
              advisor who sources it for you at zero cost, with honest guidance on whether it actually fits.
            </p>

            <Link href="/contact">
              <button className={zoomButtonClass}>
                <Phone weight="fill" className="w-5 h-5" />
                <span>Get a Free Quote</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ===================== WHAT ZOOM IS ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>The Overview</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: MIDNIGHT }}>
              What Zoom actually is
            </h2>
            <div className="space-y-5 text-lg md:text-xl text-[#475569] leading-relaxed">
              <p>
                Most people know Zoom as the video app. The fuller picture is Zoom Workplace — a cloud business
                communications platform that brings phone, meetings, team chat, and a contact center into one
                place. Zoom Phone is the piece that turns the video tool you already use into a complete{' '}
                <Link href="/resources/ucaas-explained" className="font-semibold hover:underline" style={{ color: BLUE }}>
                  hosted UCaaS
                </Link>{' '}
                system: real business calling, one familiar app, no PBX in a closet.
              </p>
              <p>
                It&apos;s built to be relied on at scale — a 99.999% uptime SLA, availability across 49+
                countries, a bring-your-own-carrier (BYOC) option if you want to keep existing carrier
                relationships, and compliance built in (HIPAA, GDPR, FedRAMP). For a lot of teams the biggest
                advantage is simply familiarity: adoption is fast because people already know the interface.
              </p>
              <p>
                But what increasingly sets Zoom apart is its approach to AI. Where many providers treat capable
                AI as a paid upgrade, Zoom includes its AI Companion with eligible paid plans at no extra cost.
                That makes it one of the simplest, most cost-effective on-ramps to genuinely useful AI — with the
                most advanced agentic pieces still available as add-ons when you need them.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== AI CAPABILITIES (hook) ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[#0B5CFF]/10" style={{ color: BLUE }}>
              <Sparkle weight="fill" className="w-4 h-4" />
              <span className="text-sm font-semibold">The AI Layer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: MIDNIGHT }}>
              Capable AI that&apos;s included, not billed as an add-on
            </h2>
            <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
              Zoom&apos;s standout is that useful AI comes with the seat. AI Companion is included at no extra
              cost on eligible paid plans — which makes Zoom the simplest, most cost-effective way to put real AI
              in front of your team. Here&apos;s the honest breakdown of what&apos;s included and what&apos;s an
              add-on.
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
                  className="rounded-3xl p-7 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0B5CFF]/10 mb-5" style={{ color: BLUE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: BLUE }}>
                    {cap.stage}
                  </span>
                  <h3 className="text-xl font-display font-bold mt-1 mb-3" style={{ color: MIDNIGHT }}>{cap.name}</h3>
                  <p className="text-[#64748b] leading-relaxed text-[15px]">{cap.description}</p>
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
                  className="flex gap-4 rounded-3xl p-7 bg-white shadow-sm"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0B5CFF]/10" style={{ color: BLUE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2" style={{ color: MIDNIGHT }}>{item.name}</h3>
                    <p className="text-[#64748b] leading-relaxed text-[15px]">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== CORE PRODUCTS ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow centered>The Platform</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: MIDNIGHT }}>
              Everything in the Zoom platform
            </h2>
            <p className="text-lg md:text-xl text-[#64748b]">
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
                  className="rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: TINT }}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white mb-5" style={{ color: BLUE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2" style={{ color: MIDNIGHT }}>
                    {product.name}
                  </h3>
                  <p className="text-[#64748b] leading-relaxed text-[15px]">{product.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== HONEST PRICING ===================== */}
      {/* The consolidated voice reference. Every figure renders from
          @/data/zoom-pricing — nothing here is hardcoded. */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container>
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
            <SectionEyebrow centered>Honest Pricing</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: MIDNIGHT }}>
              What Zoom Phone actually costs — all of it, in one place
            </h2>
            <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
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

          <motion.p {...fadeUp} className="max-w-5xl mx-auto mt-8 text-sm text-[#475569] text-center leading-relaxed">
            Zoom&apos;s published US list pricing, verified {lastVerified}. Current pricing at{' '}
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
                  Where an advisor actually earns their keep
                </h3>
                <p className="text-[#475569] leading-relaxed text-lg">
                  We publish the list pricing because you should be able to see it before you talk to
                  anyone. Those rates are Zoom&apos;s to set. What we add is the fit: requesting
                  pricing on your behalf, structuring the plan mix and contract term around how
                  you&apos;ll actually use the system, and making sure a licence you are already
                  paying for is not bought twice. Curious what you&apos;re overpaying for elsewhere?{' '}
                  <Link href="/tools/pots-cost-estimator" className="font-semibold hover:underline" style={{ color: BLUE_TEXT }}>
                    Try our cost estimator
                  </Link>{' '}
                  or just ask for a quote.
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== WHY SOURCE THROUGH INSERO ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <SectionEyebrow>The Difference</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: MIDNIGHT }}>
              Why source Zoom through Insero
            </h2>
            <p className="text-lg md:text-xl text-[#64748b]">
              You can buy Zoom directly. Here&apos;s why most businesses are better off having an independent
              advisor in the mix — at no extra cost. It&apos;s the same approach we bring to{' '}
              <Link href="/services/voice" className="font-semibold hover:underline" style={{ color: BLUE }}>
                every voice project
              </Link>
              .
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
                    <p className="text-[#475569] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== IS IT RIGHT FOR YOU ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container size="md">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <SectionEyebrow centered>Honest Fit</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: MIDNIGHT }}>
              Is Zoom right for you?
            </h2>
            <p className="text-lg md:text-xl text-[#64748b]">
              We&apos;d rather you land on the right platform than the one we&apos;re talking about. Here&apos;s
              the straight version.
            </p>
          </motion.div>

          <motion.div {...fadeUp}>
            <Comparison
              left={{
                title: 'Great fit if…',
                points: [
                  'You already use Zoom for meetings and want one familiar app for calls too',
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
                  'You’d rather assemble best-of-breed point tools than run one unified suite',
                ],
              }}
            />
          </motion.div>

          <motion.div {...fadeUp} className="mt-8 rounded-3xl bg-white p-7 lg:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0B5CFF]/10" style={{ color: BLUE }}>
                <Scales weight="fill" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold mb-2" style={{ color: MIDNIGHT }}>
                  A quick word on Zoom vs RingCentral
                </h3>
                <p className="text-[#475569] leading-relaxed">
                  If you&apos;re weighing the two: Zoom&apos;s advantage is value and simplicity — capable AI is
                  included and the platform is famously easy to adopt, especially if your team already lives in
                  Zoom meetings. RingCentral&apos;s advantage is the depth of its contact-center and
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
      <section className="py-20 lg:py-28 bg-white">
        <Container size="md">
          <motion.div {...fadeUp} className="mb-10">
            <SectionEyebrow>Common Questions</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold" style={{ color: MIDNIGHT }}>
              Zoom FAQ
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
                href="/tools/pots-cost-estimator"
                label="Free Tool"
                title="POTS Replacement Cost Estimator"
                description="See what you're really paying for legacy lines and how much a modern platform could save."
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="pt-24 lg:pt-28 pb-20 lg:pb-24" style={{ backgroundColor: TINT }}>
        <Container size="sm" className="text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-8" style={{ color: BLUE }}>
              <span className="w-8 h-px" style={{ backgroundColor: BLUE }} />
              Let&apos;s Talk
              <span className="w-8 h-px" style={{ backgroundColor: BLUE }} />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-[1.1] tracking-tight" style={{ color: MIDNIGHT }}>
              Get a free Zoom quote
            </h2>
            <p className="text-xl text-[#64748b] mb-10 max-w-xl mx-auto leading-relaxed">
              Zero cost, honest advice. We&apos;ll price your real configuration — and tell you straight if
              something else fits you better.
            </p>
            <Link href="/contact">
              <button className={zoomButtonClass}>
                <Phone weight="fill" className="w-5 h-5" />
                <span>Get a Free Quote</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>

            <div className="mt-6">
              <a
                href={company.phoneLink}
                className="inline-flex flex-col items-center text-[#64748b] transition-colors hover:text-[#00053D]"
              >
                <span className="text-lg">or call us at</span>
                <span className="font-bold text-2xl md:text-3xl mt-1" style={{ color: MIDNIGHT }}>{company.phoneFormatted}</span>
              </a>
            </div>

            <div className="mt-16 pt-10 border-t border-[#0B5CFF]/20">
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base md:text-lg text-[#64748b] font-medium">
                <TrustItem icon={Handshake}>Independent &mdash; Vendor-Neutral</TrustItem>
                <TrustItem icon={CurrencyDollar}>Same price as going direct</TrustItem>
                <TrustItem icon={Clock}>25+ Years Founder Experience</TrustItem>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
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
const BAND = '#CFE0FF';

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
        <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">{description}</p>
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
                    : { color: '#475569' }
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
          <p key={note} className="text-[15px] text-[#475569] max-w-3xl mx-auto leading-relaxed">
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
          style={{ backgroundColor: annual ? BLUE : '#cbd5e1' }}
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
            <span className="text-sm font-semibold text-[#64748b]">from</span>
          )}
          <span className="font-display font-bold text-5xl tracking-tight" style={{ color: MIDNIGHT }}>
            {formatUsd(annual ? tier.annual : tier.monthly)}
          </span>
          {annual && (
            <span className="text-xl text-[#64748b] line-through">{formatUsd(tier.monthly)}</span>
          )}
        </div>
        <p className="mt-2 text-sm text-[#64748b]">
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
          <span className="text-lg text-[#64748b]">at no additional charge</span>
        </div>
        <p className="mt-3 text-[15px] text-[#475569] leading-relaxed">
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
            <p className="mt-1.5 text-[15px] text-[#475569]">
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
        {note && <p className="text-[15px] text-[#475569] leading-relaxed mb-6">{note}</p>}
        <div className="mt-auto">
          <span className="font-display font-bold text-2xl" style={{ color: MIDNIGHT }}>
            {price === null ? 'Contact us for pricing' : formatUsd(price)}
          </span>
          {price !== null && <span className="block mt-1 text-sm text-[#64748b]">{unit}</span>}
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
          <p className="text-lg text-[#475569] leading-relaxed">
            The two platforms package voice AI differently. Zoom Phone plans bundle the{' '}
            {p.zoomFeature} into the seat; RingCentral licenses its equivalent separately. That is a
            difference in packaging rather than a verdict on either platform, and it favours buyers
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
          <p className="mt-2 text-[15px] text-[#475569] leading-relaxed">
            {p.zoomFeature}, {p.zoomAllowance}, at no additional charge with a Zoom Phone plan.
          </p>
        </div>

        <div className="rounded-2xl p-7 lg:p-8" style={{ backgroundColor: TINT }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: BLUE_TEXT }}>
            RingCentral
          </p>
          <div className="font-display font-bold text-3xl" style={{ color: MIDNIGHT }}>
            {formatUsd(p.rcMonthly)}
            <span className="text-base font-normal text-[#64748b]">/month</span>
          </div>
          <p className="mt-2 text-[15px] text-[#475569] leading-relaxed">
            {p.rcFeature}, {p.rcAllowance}, {p.rcBillingUnit} — {formatUsd(p.rcAnnualized)} a year.
          </p>
        </div>
      </div>

      <p className="mt-6 text-[15px] text-[#64748b] leading-relaxed">{p.caveat}</p>

      {/* The counterweight. Same computation, opposite direction. */}
      <div className="mt-8 pt-8 border-t border-[#CFE0FF]">
        <h4 className="text-xl font-display font-bold mb-3" style={{ color: MIDNIGHT }}>
          On the contact center side the comparison narrows
        </h4>
        <p className="text-[15px] text-[#475569] leading-relaxed mb-6">
          The included-AI advantage is a Zoom Phone story. Among the contact center AI capabilities
          both vendors publish a rate for, {contactCenterAiDeltasFavouringRc.length} of{' '}
          {contactCenterAiDeltas.length} are dearer on the Zoom Contact Center side.
        </p>
        <ul className="space-y-3">
          {contactCenterAiDeltas.map((d) => (
            <li
              key={d.capability}
              className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1 text-[15px] text-[#475569]"
            >
              <span className="font-semibold" style={{ color: MIDNIGHT }}>{d.capability}</span>
              <span>
                Zoom Contact Center {formatUsd(d.zoomMonthly)} · RingCentral {formatUsd(d.rcMonthly)}
                {d.delta === 0 ? (
                  <span className="ml-2 text-[#64748b]">— matched</span>
                ) : (
                  <span className="ml-2 font-semibold" style={{ color: BLUE_TEXT }}>
                    — {formatUsd(Math.abs(d.delta))} {d.delta > 0 ? 'more' : 'less'} a month
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] text-[#475569] leading-relaxed">
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
  color = BLUE,
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
      className="group rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
      style={{ backgroundColor: TINT }}
    >
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: BLUE }}>{label}</span>
      <h3 className="font-display font-bold text-base mt-2 mb-2 leading-snug" style={{ color: MIDNIGHT }}>
        {title}
      </h3>
      <p className="text-sm text-[#64748b] leading-relaxed flex-grow">{description}</p>
      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: BLUE }}>
        Read more
        <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

function TrustItem({ icon: Icon, children }: { icon: typeof Handshake; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon weight="fill" className="w-4 h-4" style={{ color: BLUE }} />
      <span>{children}</span>
    </div>
  );
}
