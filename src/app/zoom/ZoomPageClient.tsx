'use client';

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
      <section className="py-20 lg:py-28" style={{ backgroundColor: TINT }}>
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>Honest Pricing</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: MIDNIGHT }}>
              The sticker price isn&apos;t always the all-in price
            </h2>
            <div className="space-y-5 text-lg md:text-xl text-[#475569] leading-relaxed mb-10">
              <p>
                Zoom Phone is priced per user, per month, with competitive entry pricing and month-to-month
                options, and it bundles neatly with Zoom Workplace licenses if you&apos;re already paying for
                meetings. The standout advantage is that AI Companion is included rather than billed separately —
                so a lot of genuinely useful AI is already in the price.
              </p>
              <p>
                Where the number moves is the advanced tier. The most powerful pieces — AI Concierge, Custom AI
                Companion, the deeper Revenue Accelerator tiers, and the Power Pack / Customer Engagement Pack —
                are paid add-ons. So even with Zoom&apos;s strong included baseline, the base sticker isn&apos;t
                always the all-in number once you add the advanced capabilities you came for.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 lg:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-[#0B5CFF]/10" style={{ color: BLUE }}>
                  <CurrencyDollar weight="fill" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold mb-2" style={{ color: MIDNIGHT }}>
                    Why this is exactly where an advisor earns their keep
                  </h3>
                  <p className="text-[#475569] leading-relaxed">
                    Because the all-in number depends on your plan mix and add-ons, the honest answer to
                    &quot;what does Zoom cost?&quot; is &quot;it depends — let&apos;s price your real setup.&quot;
                    We don&apos;t publish figures here that would be stale next quarter or read as a promise we
                    can&apos;t keep. Instead, we&apos;ll build your actual configuration — seats, license
                    bundling, the add-ons that matter, and contact center if you need it — and put a real,
                    current number in front of you. Curious what you&apos;re overpaying for elsewhere?{' '}
                    <Link href="/tools/pots-cost-estimator" className="font-semibold hover:underline" style={{ color: BLUE }}>
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
