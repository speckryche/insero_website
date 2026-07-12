'use client';

import { useState } from 'react';
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
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { Comparison } from '@/components/mdx/Comparison';
import { ArticleFAQ } from '@/components/mdx/ArticleFAQ';
import { company } from '@/config/company';
import { submitContactForm, type ContactFormData } from '../contact/actions';
import { ringCentralFaq } from './faq';

// --- RingCentral brand palette -------------------------------------------
// RC's real design language: white pages, deep ink-navy headlines, bright
// azure accents, and signature orange pill CTAs. Insero lives only in the
// header, footer, and the words — never in the page's color system.
const INK = '#032B44'; // headlines, near-navy
const AZURE = '#0684BC'; // accents, eyebrows, icons, links
const ORANGE = '#F26B00'; // primary CTA (FF7A00 darkened for white-text contrast)
const ORANGE_HOVER = '#D95F00';
const TINT = '#EFF7FB'; // light azure section background

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
  'group inline-flex items-center gap-3 px-10 py-5 bg-[#F26B00] text-white font-semibold text-lg rounded-full hover:bg-[#D95F00] transition-colors duration-200 shadow-lg shadow-[#F26B00]/25';

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
              {/* Logo sits directly on white — no pill needed */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carriers/RingCentral.svg" alt="RingCentral" className="h-8 w-auto mb-10" />

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-display font-bold leading-[1.1] tracking-tight mb-6"
                style={{ color: INK }}
              >
                RingCentral for Business —{' '}
                <span style={{ color: AZURE }}>AI-Powered Phone, Done Right</span>
              </h1>

              <p className="text-lg md:text-xl text-[#475569] mb-10 max-w-3xl leading-relaxed">
                RingCentral is one of the leading AI business communications platforms — phone, video, messaging,
                and a deep agentic AI layer. Insero is the independent advisor who sources it for you at zero cost,
                with honest guidance on whether it&apos;s actually the right fit.
              </p>

              <Link href="/contact">
                <button className={rcButtonClass}>
                  <Phone weight="fill" className="w-5 h-5" />
                  <span>Get a Free Quote</span>
                  <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Link>
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
      <section className="py-16 lg:py-20 bg-white border-t border-gray-100">
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
                  index > 0 ? 'lg:border-l lg:border-[#0684BC]/25' : ''
                }`}
              >
                <div className="font-display font-bold text-4xl sm:text-5xl tracking-tight" style={{ color: INK }}>
                  {stat.value}
                </div>
                <div className="mt-2 text-sm sm:text-[15px] text-[#64748b] leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================== WHAT RINGCENTRAL IS ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>The Overview</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: INK }}>
              What RingCentral actually is
            </h2>
            <div className="space-y-5 text-lg md:text-xl text-[#475569] leading-relaxed">
              <p>
                At its core, RingCentral is a cloud business communications platform: your phone system, video
                meetings, team messaging, and business texting, all delivered as a subscription and managed from
                one place. There&apos;s no PBX in a closet and no carrier lines to babysit — it&apos;s the modern{' '}
                <Link href="/resources/ucaas-explained" className="font-semibold hover:underline" style={{ color: AZURE }}>
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
                below, is that the most powerful pieces are priced as add-ons rather than bundled into the base
                seat. Knowing which ones you actually need is most of the battle.
              </p>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== AI CAPABILITIES (hook) ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[#0684BC]/10" style={{ color: AZURE }}>
              <Sparkle weight="fill" className="w-4 h-4" />
              <span className="text-sm font-semibold">The AI Layer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: INK }}>
              One of the deepest agentic voice-AI stacks in the market
            </h2>
            <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
              RingCentral&apos;s agentic Voice AI suite spans the entire call — an AI that greets and routes
              callers, assists your reps live, and turns finished conversations into coaching and CRM updates.
              Here&apos;s the honest breakdown of what each piece does.
            </p>
          </motion.div>

          {/* Before / During / After */}
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
                  className="rounded-2xl p-7 bg-white border border-gray-100 border-t-2 border-t-[#0684BC] shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0684BC]/10 mb-5" style={{ color: AZURE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: AZURE }}>
                    {cap.stage}
                  </span>
                  <h3 className="text-xl font-display font-bold mt-1 mb-3" style={{ color: INK }}>{cap.name}</h3>
                  <p className="text-[#64748b] leading-relaxed text-[15px]">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Also included / contact center */}
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
                  className="flex gap-4 rounded-2xl p-7 bg-white border border-gray-100 border-t-2 border-t-[#0684BC] shadow-sm"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#0684BC]/10" style={{ color: AZURE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2" style={{ color: INK }}>{item.name}</h3>
                    <p className="text-[#64748b] leading-relaxed text-[15px]">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== PRODUCT PILLARS ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow centered>The Platform</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: INK }}>
              Three pillars, one platform
            </h2>
            <p className="text-lg md:text-xl text-[#64748b]">
              RingCentral is built around three product families. Here&apos;s what each one covers — and where a
              separate license comes into play.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {productPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl p-8 lg:p-10 bg-white border border-gray-100 border-t-2 border-t-[#0684BC] shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0684BC]/10 mb-6" style={{ color: AZURE }}>
                    <Icon weight="fill" className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-3" style={{ color: INK }}>
                    {pillar.name}
                  </h3>
                  <p className="text-[#64748b] leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* The full building-block breakdown stays available below the pillars. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:mt-8">
            {coreProducts.map((product, index) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex gap-4 rounded-2xl p-6 border border-gray-100"
                  style={{ backgroundColor: TINT }}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#0684BC]/10" style={{ color: AZURE }}>
                    <Icon weight="fill" className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold mb-1" style={{ color: INK }}>
                      {product.name}
                    </h3>
                    <p className="text-[#64748b] leading-relaxed text-sm">{product.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ===================== HONEST PRICING ===================== */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>Honest Pricing</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: INK }}>
              The sticker price isn&apos;t the all-in price
            </h2>
            <div className="space-y-5 text-lg md:text-xl text-[#475569] leading-relaxed mb-10">
              <p>
                RingCentral is priced per user, per month, with tiered plans — and committing to annual billing
                is typically meaningfully cheaper than paying month to month. That part is straightforward.
              </p>
              <p>
                What trips people up is everything that sits outside the base seat. The most powerful AI
                features are paid add-ons, not all included — conversation intelligence (ACE / RingSense) and the
                AI Receptionist are add-ons, and the RingCX contact center is a separate license entirely. A
                price you see advertised for a base plan can look very different once the capabilities you came
                for are added in.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-gray-100 border-t-2 border-t-[#0684BC] p-7 lg:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#0684BC]/10" style={{ color: AZURE }}>
                  <CurrencyDollar weight="fill" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-2" style={{ color: INK }}>
                    Why this is exactly where an advisor earns their keep
                  </h3>
                  <p className="text-[#475569] leading-relaxed">
                    Because the all-in number depends entirely on your configuration, the honest answer to
                    &quot;what does RingCentral cost?&quot; is &quot;it depends — let&apos;s price your real
                    setup.&quot; We don&apos;t publish figures here that would be stale next quarter or read as
                    a promise we can&apos;t keep. Instead, we&apos;ll build your actual configuration — seats,
                    the add-ons that matter, and contact center if you need it — and put a real, current number
                    in front of you. Curious what you&apos;re overpaying for elsewhere?{' '}
                    <Link href="/tools/pots-cost-estimator" className="font-semibold hover:underline" style={{ color: AZURE }}>
                      Try our cost estimator
                    </Link>{' '}
                    or just ask for a quote.
                  </p>
                </div>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: INK }}>
              Why source RingCentral through Insero
            </h2>
            <p className="text-lg md:text-xl text-[#64748b]">
              You can buy RingCentral directly. Here&apos;s why most businesses are better off having an
              independent advisor in the mix — at no extra cost. It&apos;s the same approach we bring to{' '}
              <Link href="/services/voice" className="font-semibold hover:underline" style={{ color: AZURE }}>
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
                  className="flex gap-5 rounded-2xl p-7 border border-gray-100"
                  style={{ backgroundColor: TINT }}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#0684BC]/10" style={{ color: AZURE }}>
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2" style={{ color: INK }}>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5" style={{ color: INK }}>
              Is RingCentral right for you?
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

          <motion.div {...fadeUp} className="mt-8 rounded-2xl bg-white border border-gray-100 border-t-2 border-t-[#0684BC] p-7 lg:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[#0684BC]/10" style={{ color: AZURE }}>
                <Scales weight="fill" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold mb-2" style={{ color: INK }}>
                  A quick word on RingCentral vs Zoom
                </h3>
                <p className="text-[#475569] leading-relaxed">
                  If &quot;all the AI included&quot; is your priority, it&apos;s worth comparing.{' '}
                  <Link href="/zoom" className="font-semibold hover:underline" style={{ color: AZURE }}>
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
      <section className="py-20 lg:py-28 bg-white">
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
            <div className="flex items-center gap-2 mb-5" style={{ color: AZURE }}>
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

      {/* ===================== FINAL CTA — LEAD FORM ===================== */}
      <section className="pt-24 lg:pt-28 pb-20 lg:pb-24" style={{ backgroundColor: TINT }}>
        <Container size="md">
          <motion.div {...fadeUp} className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase mb-8" style={{ color: AZURE }}>
              <span className="w-8 h-px" style={{ backgroundColor: AZURE }} />
              Let&apos;s Talk
              <span className="w-8 h-px" style={{ backgroundColor: AZURE }} />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 leading-[1.1] tracking-tight" style={{ color: INK }}>
              Get a free RingCentral quote
            </h2>
            <p className="text-xl text-[#64748b] max-w-xl mx-auto leading-relaxed">
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
              className="inline-flex flex-col items-center text-[#64748b] transition-colors hover:text-[#032B44]"
            >
              <span className="text-lg">or call us at</span>
              <span className="font-bold text-2xl md:text-3xl mt-1" style={{ color: INK }}>{company.phoneFormatted}</span>
            </a>
          </div>

          <div className="mt-14 pt-10 border-t border-[#0684BC]/20">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base md:text-lg text-[#64748b] font-medium">
              <TrustItem icon={Handshake}>Independent &mdash; Vendor-Neutral</TrustItem>
              <TrustItem icon={CurrencyDollar}>Same price as going direct</TrustItem>
              <TrustItem icon={Clock}>25+ Years Founder Experience</TrustItem>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

// --- Hero product video ---------------------------------------------------
// RingCentral's public product loop, the same asset RC partners embed. If the
// asset ever moves, onError hides the whole frame so the hero stays clean.

function HeroVideo() {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#0684BC]/20 shadow-xl shadow-[#032B44]/5">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setFailed(true)}
        className="w-full h-auto block"
      >
        <source
          src="https://www.ringcentral.com/content/dam/rc-www/en_us/images/content/ab-tests/homepages/home_b/video/products-new.mp4"
          type="video/mp4"
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
    'w-full px-4 py-3.5 rounded-xl border-2 bg-white text-[#032B44] transition-colors focus:outline-none';
  const okBorder = 'border-gray-200 focus:border-[#0684BC]';
  const errBorder = 'border-red-400 focus:border-red-500';

  if (isSubmitted) {
    return (
      <div className="rounded-3xl bg-white border border-gray-100 border-t-2 border-t-[#0684BC] p-8 lg:p-12 shadow-sm text-center">
        <div className="w-20 h-20 rounded-full bg-[#0684BC]/10 flex items-center justify-center mx-auto mb-6" style={{ color: AZURE }}>
          <CheckCircle weight="fill" className="w-10 h-10" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-display font-bold mb-3" style={{ color: INK }}>
          Thanks — we&apos;ve got it
        </h3>
        <p className="text-[#64748b] max-w-md mx-auto mb-8">
          We&apos;ll price your real RingCentral configuration and get back to you within one business day.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setSubmitError(null);
            reset();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full border-2 transition-colors"
          style={{ color: AZURE, borderColor: AZURE }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border border-gray-100 border-t-2 border-t-[#0684BC] p-8 lg:p-10 shadow-sm">
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
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#F26B00] text-white font-semibold text-lg rounded-full shadow-lg shadow-[#F26B00]/25 hover:bg-[#D95F00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

        <p className="text-sm text-[#94a3b8] text-center">
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
  color = AZURE,
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
      className="group bg-white rounded-2xl p-6 border border-gray-100 border-t-2 border-t-[#0684BC] hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: AZURE }}>{label}</span>
      <h3 className="font-display font-bold text-base mt-2 mb-2 leading-snug" style={{ color: INK }}>
        {title}
      </h3>
      <p className="text-sm text-[#64748b] leading-relaxed flex-grow">{description}</p>
      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: AZURE }}>
        Read more
        <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

function TrustItem({ icon: Icon, children }: { icon: typeof Handshake; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon weight="fill" className="w-4 h-4" style={{ color: AZURE }} />
      <span>{children}</span>
    </div>
  );
}
