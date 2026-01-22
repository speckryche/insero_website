'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Phosphor Icons - Fill variant
import {
  PhoneCall as PhosphorVoice,
  GlobeHemisphereWest as PhosphorInternet,
  Graph as PhosphorNetwork,
  ShieldCheck as PhosphorSecurity,
  Calendar as PhosphorCalendar,
  MagnifyingGlass as PhosphorAnalyze,
  PiggyBank as PhosphorSavings,
  CurrencyCircleDollar as PhosphorDollar,
  Scales as PhosphorBalance,
  Clock as PhosphorClock,
  UsersThree as PhosphorUsers,
  CreditCard as PhosphorCreditCard,
  Question as PhosphorHelp,
  Buildings as PhosphorBuilding,
  TrendUp as PhosphorTrending,
  Phone as PhosphorPhone,
  EnvelopeSimple as PhosphorMail,
  MapPin as PhosphorMapPin,
  CheckCircle as PhosphorCheckCircle,
  PaperPlaneTilt as PhosphorSend,
  Quotes as PhosphorQuote,
} from '@phosphor-icons/react';

// Custom Insero Icons
import {
  IconVoice,
  IconInternet,
  IconNetwork,
  IconSecurity,
  IconCalendar,
  IconAnalyze,
  IconSavings,
  IconDollar,
  IconBalance,
  IconClock,
  IconUsers,
  IconCreditCard,
  IconHelp,
  IconBuilding,
  IconTrending,
  IconPhone,
  IconMail,
  IconMapPin,
  IconCheckCircle,
  IconSend,
  IconQuote,
} from '@/components/ui/InseroIcons';

type IconSet = 'phosphor' | 'insero';

const iconCategories = [
  {
    name: 'Four Pillars of Connectivity',
    description: 'Core service offerings',
    icons: [
      { label: 'Voice', phosphor: PhosphorVoice, insero: IconVoice, color: '#3B82F6' },
      { label: 'Internet', phosphor: PhosphorInternet, insero: IconInternet, color: '#10B981' },
      { label: 'SD-WAN', phosphor: PhosphorNetwork, insero: IconNetwork, color: '#8B5CF6' },
      { label: 'Security', phosphor: PhosphorSecurity, insero: IconSecurity, color: '#EF4444' },
    ],
  },
  {
    name: 'How It Works',
    description: 'Process steps',
    icons: [
      { label: 'Schedule', phosphor: PhosphorCalendar, insero: IconCalendar, color: '#33baab' },
      { label: 'Analyze', phosphor: PhosphorAnalyze, insero: IconAnalyze, color: '#33baab' },
      { label: 'Save', phosphor: PhosphorSavings, insero: IconSavings, color: '#33baab' },
    ],
  },
  {
    name: 'Why Insero',
    description: 'Value propositions',
    icons: [
      { label: 'Zero Cost', phosphor: PhosphorDollar, insero: IconDollar, color: '#33baab' },
      { label: 'Agnostic', phosphor: PhosphorBalance, insero: IconBalance, color: '#33baab' },
      { label: 'Experience', phosphor: PhosphorClock, insero: IconClock, color: '#33baab' },
    ],
  },
  {
    name: 'Pain Points',
    description: 'Customer challenges',
    icons: [
      { label: 'Vendors', phosphor: PhosphorUsers, insero: IconUsers, color: '#1a2e35' },
      { label: 'Overpaying', phosphor: PhosphorCreditCard, insero: IconCreditCard, color: '#1a2e35' },
      { label: 'Confused', phosphor: PhosphorHelp, insero: IconHelp, color: '#1a2e35' },
    ],
  },
  {
    name: 'Stats & Social Proof',
    description: 'Testimonials section',
    icons: [
      { label: 'Business', phosphor: PhosphorBuilding, insero: IconBuilding, color: '#33baab' },
      { label: 'Growth', phosphor: PhosphorTrending, insero: IconTrending, color: '#33baab' },
      { label: 'Quote', phosphor: PhosphorQuote, insero: IconQuote, color: '#33baab' },
    ],
  },
  {
    name: 'Contact & UI',
    description: 'General interface icons',
    icons: [
      { label: 'Phone', phosphor: PhosphorPhone, insero: IconPhone, color: '#33baab' },
      { label: 'Email', phosphor: PhosphorMail, insero: IconMail, color: '#33baab' },
      { label: 'Location', phosphor: PhosphorMapPin, insero: IconMapPin, color: '#33baab' },
      { label: 'Check', phosphor: PhosphorCheckCircle, insero: IconCheckCircle, color: '#10B981' },
      { label: 'Send', phosphor: PhosphorSend, insero: IconSend, color: '#f59e0b' },
    ],
  },
];

export default function IconPreviewPage() {
  const [selectedSet, setSelectedSet] = useState<IconSet | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a1214] text-white overflow-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#33baab]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#33baab]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#33baab 1px, transparent 1px), linear-gradient(90deg, #33baab 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#33baab]/50 to-transparent" />
              <span className="text-[#33baab] text-sm font-mono tracking-widest uppercase">Icon System</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#33baab]/50 to-transparent" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 tracking-tight">
              Choose Your
              <span className="block bg-gradient-to-r from-[#33baab] to-[#5fcec1] bg-clip-text text-transparent">
                Visual Language
              </span>
            </h1>
            <p className="text-center text-white/50 text-lg max-w-2xl mx-auto">
              Two distinct icon styles. One clear decision. Select the aesthetic that best represents Insero&apos;s brand identity.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Selection Cards */}
      <section className="relative px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Option A - Phosphor */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setSelectedSet(selectedSet === 'phosphor' ? null : 'phosphor')}
              className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                selectedSet === 'phosphor'
                  ? 'border-[#3B82F6] bg-[#3B82F6]/10'
                  : 'border-white/10 hover:border-white/30 bg-white/[0.02]'
              }`}
            >
              <div className="absolute top-4 right-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedSet === 'phosphor' ? 'border-[#3B82F6] bg-[#3B82F6]' : 'border-white/30'
                }`}>
                  {selectedSet === 'phosphor' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="mb-6">
                <span className="text-[#3B82F6] text-sm font-mono tracking-wider">OPTION A</span>
                <h3 className="text-2xl font-bold mt-1">Phosphor Fill</h3>
                <p className="text-white/50 text-sm mt-2">Polished icon library with consistent, professional design language</p>
              </div>
              <div className="flex gap-3">
                {[PhosphorVoice, PhosphorInternet, PhosphorNetwork, PhosphorSecurity].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                  >
                    <Icon weight="fill" className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-white/40">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#3B82F6] rounded-full" />
                  Industry-standard library
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#3B82F6] rounded-full" />
                  Extensive icon variety
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#3B82F6] rounded-full" />
                  Rounded, friendly aesthetic
                </li>
              </ul>
            </motion.button>

            {/* Option B - Insero Custom */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setSelectedSet(selectedSet === 'insero' ? null : 'insero')}
              className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                selectedSet === 'insero'
                  ? 'border-[#33baab] bg-[#33baab]/10'
                  : 'border-white/10 hover:border-white/30 bg-white/[0.02]'
              }`}
            >
              <div className="absolute top-4 right-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedSet === 'insero' ? 'border-[#33baab] bg-[#33baab]' : 'border-white/30'
                }`}>
                  {selectedSet === 'insero' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </div>
              <div className="mb-6">
                <span className="text-[#33baab] text-sm font-mono tracking-wider">OPTION B</span>
                <h3 className="text-2xl font-bold mt-1">Insero Geometric</h3>
                <p className="text-white/50 text-sm mt-2">Custom angular icons matching your logo&apos;s bold, geometric style</p>
              </div>
              <div className="flex gap-3">
                {[IconVoice, IconInternet, IconNetwork, IconSecurity].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors"
                  >
                    <Icon size={24} className="text-[#33baab]" />
                  </div>
                ))}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-white/40">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#33baab] rounded-full" />
                  Unique to Insero brand
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#33baab] rounded-full" />
                  Bold, angular, geometric
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#33baab] rounded-full" />
                  Matches logo aesthetic
                </li>
              </ul>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Icon Gallery */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {iconCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <span className="text-white/30 text-sm">{category.description}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.icons.map((icon, iconIndex) => {
                  const PhosphorIcon = icon.phosphor;
                  const InseroIcon = icon.insero;
                  const isHovered = hoveredIcon === `${categoryIndex}-${iconIndex}`;

                  return (
                    <motion.div
                      key={icon.label}
                      onMouseEnter={() => setHoveredIcon(`${categoryIndex}-${iconIndex}`)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      className="relative group"
                    >
                      <div className={`
                        relative p-6 rounded-2xl border transition-all duration-300
                        ${isHovered ? 'bg-white/[0.08] border-white/20' : 'bg-white/[0.02] border-white/5'}
                      `}>
                        <div className="flex justify-center gap-4 mb-4">
                          {/* Phosphor Version */}
                          <div className={`
                            relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                            ${selectedSet === 'phosphor' ? 'bg-[#3B82F6]/20 ring-2 ring-[#3B82F6]' : 'bg-white/5'}
                            ${selectedSet === 'insero' ? 'opacity-30' : ''}
                          `}>
                            <PhosphorIcon
                              weight="fill"
                              className="w-7 h-7"
                              style={{ color: selectedSet === 'phosphor' ? '#3B82F6' : icon.color }}
                            />
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#3B82F6] text-[10px] font-bold flex items-center justify-center">
                              A
                            </span>
                          </div>

                          {/* Insero Version */}
                          <div className={`
                            relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
                            ${selectedSet === 'insero' ? 'bg-[#33baab]/20 ring-2 ring-[#33baab]' : 'bg-white/5'}
                            ${selectedSet === 'phosphor' ? 'opacity-30' : ''}
                          `}>
                            <InseroIcon
                              size={28}
                              style={{ color: selectedSet === 'insero' ? '#33baab' : icon.color }}
                            />
                            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#33baab] text-[10px] font-bold flex items-center justify-center">
                              B
                            </span>
                          </div>
                        </div>

                        <p className="text-center text-sm text-white/60">{icon.label}</p>

                        {/* Hover detail */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full z-10 bg-[#1a2e35] rounded-lg px-3 py-2 text-xs whitespace-nowrap"
                            >
                              <div className="flex gap-4">
                                <span className="text-[#3B82F6]">A: Phosphor</span>
                                <span className="text-[#33baab]">B: Insero</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Size Comparison */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-2">Size Comparison</h2>
            <p className="text-white/40 mb-8">See how each icon set scales across different use cases</p>

            <div className="space-y-12">
              {[
                { label: 'Small (20px)', desc: 'Navigation, inline text', size: 20 },
                { label: 'Medium (32px)', desc: 'Cards, list items', size: 32 },
                { label: 'Large (48px)', desc: 'Feature sections, heroes', size: 48 },
              ].map((sizeConfig) => (
                <div key={sizeConfig.label}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-white/80 font-medium">{sizeConfig.label}</span>
                    <span className="text-white/30 text-sm">{sizeConfig.desc}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Phosphor Row */}
                    <div className={`flex items-center gap-4 p-4 rounded-xl transition-opacity ${selectedSet === 'insero' ? 'opacity-30' : ''}`}>
                      <span className="text-[#3B82F6] text-xs font-mono w-8">A</span>
                      <div className="flex gap-4 flex-wrap">
                        <PhosphorVoice weight="fill" style={{ width: sizeConfig.size, height: sizeConfig.size }} className="text-[#3B82F6]" />
                        <PhosphorInternet weight="fill" style={{ width: sizeConfig.size, height: sizeConfig.size }} className="text-[#10B981]" />
                        <PhosphorNetwork weight="fill" style={{ width: sizeConfig.size, height: sizeConfig.size }} className="text-[#8B5CF6]" />
                        <PhosphorSecurity weight="fill" style={{ width: sizeConfig.size, height: sizeConfig.size }} className="text-[#EF4444]" />
                      </div>
                    </div>
                    {/* Insero Row */}
                    <div className={`flex items-center gap-4 p-4 rounded-xl transition-opacity ${selectedSet === 'phosphor' ? 'opacity-30' : ''}`}>
                      <span className="text-[#33baab] text-xs font-mono w-8">B</span>
                      <div className="flex gap-4 flex-wrap">
                        <IconVoice size={sizeConfig.size} className="text-[#3B82F6]" />
                        <IconInternet size={sizeConfig.size} className="text-[#10B981]" />
                        <IconNetwork size={sizeConfig.size} className="text-[#8B5CF6]" />
                        <IconSecurity size={sizeConfig.size} className="text-[#EF4444]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* In-Context Preview */}
      <section className="relative px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">In Context</h2>
          <p className="text-white/40 mb-8">Preview how icons appear in actual component designs</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phosphor Card */}
            <div className={`transition-opacity duration-300 ${selectedSet === 'insero' ? 'opacity-30' : ''}`}>
              <span className="text-[#3B82F6] text-sm font-mono tracking-wider mb-4 block">OPTION A</span>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-[#3B82F6] flex items-center justify-center mb-6">
                  <PhosphorVoice weight="fill" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Voice Connectivity</h3>
                <p className="text-white/50 text-sm mb-6">Modern phone systems that scale with your business and reduce costs.</p>
                <div className="flex items-center gap-2 text-[#3B82F6]">
                  <span className="text-sm font-medium">Learn more</span>
                  <PhosphorSend weight="fill" className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Insero Card */}
            <div className={`transition-opacity duration-300 ${selectedSet === 'phosphor' ? 'opacity-30' : ''}`}>
              <span className="text-[#33baab] text-sm font-mono tracking-wider mb-4 block">OPTION B</span>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 rounded-2xl p-8">
                <div className="w-16 h-16 rounded-2xl bg-[#33baab] flex items-center justify-center mb-6">
                  <IconVoice size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Voice Connectivity</h3>
                <p className="text-white/50 text-sm mb-6">Modern phone systems that scale with your business and reduce costs.</p>
                <div className="flex items-center gap-2 text-[#33baab]">
                  <span className="text-sm font-medium">Learn more</span>
                  <IconSend size={16} className="text-[#33baab]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Summary */}
      <section className="relative px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#33baab]/20 to-transparent border border-[#33baab]/30 rounded-3xl p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Decide?</h2>
              <p className="text-white/50 mb-8 max-w-lg mx-auto">
                {selectedSet
                  ? `You've selected Option ${selectedSet === 'phosphor' ? 'A (Phosphor Fill)' : 'B (Insero Geometric)'}. Let me know and I'll apply this style across all pages.`
                  : 'Click on either option above to preview it highlighted, then let me know your choice.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className={`px-6 py-4 rounded-xl border-2 transition-all ${
                  selectedSet === 'phosphor'
                    ? 'border-[#3B82F6] bg-[#3B82F6]/10'
                    : 'border-white/10 bg-white/[0.02]'
                }`}>
                  <div className="flex items-center gap-3">
                    <PhosphorVoice weight="fill" className="w-6 h-6 text-[#3B82F6]" />
                    <span className="font-medium">Option A: Phosphor</span>
                  </div>
                </div>
                <div className={`px-6 py-4 rounded-xl border-2 transition-all ${
                  selectedSet === 'insero'
                    ? 'border-[#33baab] bg-[#33baab]/10'
                    : 'border-white/10 bg-white/[0.02]'
                }`}>
                  <div className="flex items-center gap-3">
                    <IconVoice size={24} className="text-[#33baab]" />
                    <span className="font-medium">Option B: Insero</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
