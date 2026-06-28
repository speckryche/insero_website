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
import { ringCentralFaq } from './faq';

// --- Section data ---------------------------------------------------------

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

// --- Page -----------------------------------------------------------------

export function RingCentralPageClient() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-white overflow-hidden">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            {/* Logo (directly on the white hero) */}
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/carriers/RingCentral.svg" alt="RingCentral" className="h-9 w-auto" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-display font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-6">
              RingCentral for Business —{' '}
              <span className="text-[#008838]">AI-Powered Phone, Done Right</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-[#475569] mb-10 max-w-3xl leading-relaxed">
              RingCentral is one of the leading AI business communications platforms — phone, video, messaging,
              and a deep agentic AI layer. Insero is the independent advisor who sources it for you at zero cost,
              with honest guidance on whether it&apos;s actually the right fit.
            </p>

            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-10 py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <Phone weight="fill" className="w-5 h-5" />
                <span>Get a Free Quote</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* ===================== WHAT RINGCENTRAL IS ===================== */}
      <section className="py-20 lg:py-28 bg-white">
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>The Overview</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-8">
              What RingCentral actually is
            </h2>
            <div className="space-y-5 text-lg md:text-xl text-[#475569] leading-relaxed">
              <p>
                At its core, RingCentral is a cloud business communications platform: your phone system, video
                meetings, team messaging, and business texting, all delivered as a subscription and managed from
                one place. There&apos;s no PBX in a closet and no carrier lines to babysit — it&apos;s the modern{' '}
                <Link href="/resources/ucaas-explained" className="text-[var(--color-primary)] font-semibold hover:underline">
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
      <section className="py-20 lg:py-28 bg-[#e2e8ec]">
        <Container>
          <motion.div {...fadeUp} className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[#008838]/10 text-[#008838]">
              <Sparkle weight="fill" className="w-4 h-4" />
              <span className="text-sm font-semibold">The AI Layer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6">
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
                  className="rounded-2xl p-7 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#008838]/10 text-[#008838] mb-5">
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#008838]">
                    {cap.stage}
                  </span>
                  <h3 className="text-xl font-display font-bold text-[#1e293b] mt-1 mb-3">{cap.name}</h3>
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
                  className="flex gap-4 rounded-2xl p-7 bg-white border border-gray-200 shadow-sm"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#008838]/10 text-[#008838]">
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-[#1e293b] mb-2">{item.name}</h3>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-5">
              Everything in the RingCentral platform
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
                  className="rounded-2xl p-7 bg-[var(--color-gray-50)] border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-voice)]/10 text-[var(--color-voice)] mb-5">
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#1e293b] mb-2">
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
      <section className="py-20 lg:py-28 bg-[var(--color-gray-50)]">
        <Container size="md">
          <motion.div {...fadeUp}>
            <SectionEyebrow>Honest Pricing</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-8">
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

            <div className="rounded-2xl bg-white border border-gray-200 p-7 lg:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  <CurrencyDollar weight="fill" className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-[#1e293b] mb-2">
                    Why this is exactly where an advisor earns their keep
                  </h3>
                  <p className="text-[#475569] leading-relaxed">
                    Because the all-in number depends entirely on your configuration, the honest answer to
                    &quot;what does RingCentral cost?&quot; is &quot;it depends — let&apos;s price your real
                    setup.&quot; We don&apos;t publish figures here that would be stale next quarter or read as
                    a promise we can&apos;t keep. Instead, we&apos;ll build your actual configuration — seats,
                    the add-ons that matter, and contact center if you need it — and put a real, current number
                    in front of you. Curious what you&apos;re overpaying for elsewhere?{' '}
                    <Link href="/tools/pots-cost-estimator" className="text-[var(--color-primary)] font-semibold hover:underline">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-5">
              Why source RingCentral through Insero
            </h2>
            <p className="text-lg md:text-xl text-[#64748b]">
              You can buy RingCentral directly. Here&apos;s why most businesses are better off having an
              independent advisor in the mix — at no extra cost. It&apos;s the same approach we bring to{' '}
              <Link href="/services/voice" className="text-[var(--color-primary)] font-semibold hover:underline">
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
                  className="flex gap-5 rounded-2xl p-7 bg-[var(--color-gray-50)] border border-gray-100"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon weight="fill" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-[#1e293b] mb-2">
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
      <section className="py-20 lg:py-28 bg-[var(--color-gray-50)]">
        <Container size="md">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <SectionEyebrow centered>Honest Fit</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-5">
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

          <motion.div {...fadeUp} className="mt-8 rounded-2xl bg-white border border-gray-200 p-7 lg:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-voice)]/10 text-[var(--color-voice)]">
                <Scales weight="fill" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-[#1e293b] mb-2">
                  A quick word on RingCentral vs Zoom
                </h3>
                <p className="text-[#475569] leading-relaxed">
                  If &quot;all the AI included&quot; is your priority, it&apos;s worth comparing. Zoom, for
                  example, includes its AI Companion features at no extra charge, which can be more
                  cost-effective when you want capable AI without assembling add-ons. RingCentral tends to pull
                  ahead when you need deep contact-center and conversation intelligence. We&apos;ll compare both
                  against your actual needs — no thumb on the scale.
                  {/* TODO: link "Zoom" to /zoom once that page exists. */}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b]">
              RingCentral FAQ
            </h2>
          </motion.div>
          <motion.div {...fadeUp}>
            <ArticleFAQ items={ringCentralFaq} />
          </motion.div>

          {/* Related reading */}
          <motion.div {...fadeUp} className="mt-14">
            <div className="flex items-center gap-2 mb-5 text-[var(--color-primary)]">
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
      <section className="pt-24 lg:pt-28 pb-20 lg:pb-24 bg-[#E6F5EC]">
        <Container size="sm" className="text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-[#008838] text-sm font-semibold tracking-widest uppercase mb-8">
              <span className="w-8 h-px bg-[#008838]" />
              Let&apos;s Talk
              <span className="w-8 h-px bg-[#008838]" />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#1e293b] mb-6 leading-[1.1] tracking-tight">
              Get a free RingCentral quote
            </h2>
            <p className="text-xl text-[#64748b] mb-10 max-w-xl mx-auto leading-relaxed">
              Zero cost, honest advice. We&apos;ll price your real configuration — and tell you straight if
              something else fits you better.
            </p>
            <Link href="/contact">
              <button className="group inline-flex items-center gap-4 px-10 py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <Phone weight="fill" className="w-5 h-5" />
                <span>Get a Free Quote</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>

            <div className="mt-6">
              <a
                href={company.phoneLink}
                className="inline-flex flex-col items-center text-[#64748b] hover:text-[#1e293b] transition-colors"
              >
                <span className="text-lg">or call us at</span>
                <span className="font-bold text-[#1e293b] text-2xl md:text-3xl mt-1">{company.phoneFormatted}</span>
              </a>
            </div>

            <div className="mt-16 pt-10 border-t-2 border-[#008838]/30">
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

function SectionEyebrow({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 mb-3 text-[var(--color-primary)] ${centered ? 'justify-center' : ''}`}
    >
      <span className="w-6 h-px bg-[var(--color-primary)]" />
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
      className="group bg-[var(--color-gray-50)] rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">{label}</span>
      <h3 className="font-display font-bold text-base text-[#1e293b] mt-2 mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-sm text-[#64748b] leading-relaxed flex-grow">{description}</p>
      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[var(--color-primary)]">
        Read more
        <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

function TrustItem({ icon: Icon, children }: { icon: typeof Handshake; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <Icon weight="fill" className="w-4 h-4 text-[#008838]" />
      <span>{children}</span>
    </div>
  );
}
