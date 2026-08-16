'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { trackLead } from '@/lib/analytics';
import {
  CheckCircle,
  WarningCircle,
  ArrowRight,
  ArrowDown,
  Phone,
  PhoneCall,
  DeviceMobile,
  Envelope,
  Clock,
  ChatText,
  Buildings,
  UserSound,
  MoonStars,
  SmileyNervous,
  Handshake,
  Trophy,
  PiggyBank,
  CurrencyDollar,
  CaretDown,
  ShieldCheck,
  WifiHigh,
} from '@phosphor-icons/react';
import { submitEcentialForm, EcentialFormData } from './actions';

// ── Data ──────────────────────────────────────────────

const painPoints = [
  {
    icon: PhoneCall,
    title: 'Missed Calls = Missed Enrollments',
    description:
      '80% of parents move on if they don\'t hear back within 5 minutes. If your staff is with children, those enrollment calls go unanswered.',
  },
  {
    icon: MoonStars,
    title: 'After-Hours Inquiries Vanish',
    description:
      'Working parents call after 6 PM when your center is closed. Without after-hours routing, those families choose the center that answered.',
  },
  {
    icon: SmileyNervous,
    title: 'Unprofessional First Impressions',
    description:
      'A frazzled teacher answering between activities isn\'t the first impression you want. Parents judge your center by that first call.',
  },
];

const solutions = [
  {
    icon: UserSound,
    title: 'Auto-Attendant',
    description: '"Press 1 for Enrollment, Press 2 for Your Child\'s Classroom" — professional routing that never takes a sick day.',
  },
  {
    icon: DeviceMobile,
    title: 'Mobile App',
    description: 'Answer center calls from anywhere without giving out your personal number. Director freedom, finally.',
  },
  {
    icon: Envelope,
    title: 'Voicemail-to-Email',
    description: 'Every missed call becomes a lead in your inbox instantly. No more checking the answering machine.',
  },
  {
    icon: Clock,
    title: 'After-Hours Routing',
    description: 'Parents calling at 8 PM get a professional greeting and options, not silence.',
  },
  {
    icon: ChatText,
    title: 'Business Texting',
    description: 'Send reminders and updates from your center\'s number, not your personal phone.',
  },
  {
    icon: Buildings,
    title: 'Multi-Location Support',
    description: 'One system, unified directory, seamless transfers — even across 2+ locations.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Tell Us About Your Center',
    description: 'Quick call. We learn your setup, pain points, and what matters most to you.',
  },
  {
    number: '02',
    title: 'We Find Your Perfect Match',
    description: 'We compare solutions from top providers and recommend the best fit. No bias.',
  },
  {
    number: '03',
    title: 'Go Live',
    description: 'Professional setup, number porting, and training. You\'re live in days, not weeks.',
  },
];

const stats = [
  { value: '500+', label: 'Businesses Served', icon: Handshake },
  { value: '38%', label: 'Average Savings', icon: PiggyBank },
  { value: '25+', label: 'Years Experience', icon: Trophy },
  { value: '$2M+', label: 'Savings Identified', icon: CurrencyDollar },
];

const faqItems = [
  {
    question: 'Is this really free?',
    answer:
      'Yes, 100%. We\'re a telecom broker — similar to how an insurance broker works. We compare dozens of providers on your behalf, and the provider we recommend compensates us directly. You never pay us a penny.',
  },
  {
    question: 'Will I need new phones or hardware?',
    answer:
      'Usually no. Most modern cloud phone systems work with your existing internet connection and devices. You can use desk phones, computers, or even mobile apps. We\'ll assess your current setup and let you know.',
  },
  {
    question: 'How long does setup take?',
    answer:
      'Typically 1-2 weeks from start to finish, including number porting (transferring your existing phone number). Many centers are up and running in under a week.',
  },
  {
    question: 'What about my existing phone number?',
    answer:
      'We port it over to the new system. Parents, Google listings, and marketing materials all stay the same. They\'ll never notice the switch.',
  },
  {
    question: "I'm locked into a contract. Can you still help?",
    answer:
      'Absolutely. We\'ll assess your current situation, calculate any early termination costs, and time the transition to minimize or eliminate them. Even if you can\'t switch today, knowing your options puts you in control at renewal time.',
  },
  {
    question: 'What other services can you help with?',
    answer:
      'Beyond phone systems, Insero also helps childcare centers with business internet and network redundancy — making sure you\'re never without connectivity. Same free, unbiased approach.',
  },
  {
    question: 'How is Ecential involved?',
    answer:
      'Ecential has partnered with Insero to bring this exclusive telecom consulting service to the childcare community. Ecential identified the need; Insero provides the expertise and carrier relationships to deliver solutions.',
  },
];

const trustChecks = [
  'No consulting fees',
  'No markups on service',
  'No contracts with us',
  'No obligation to switch',
];

const locationOptions = ['1', '2', '3-5', '5+'];
const staffOptions = ['1-10', '11-25', '26-50', '50+'];

// ── Animations ────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── Helpers ───────────────────────────────────────────

function scrollToForm() {
  document.getElementById('ecential-form')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToHowItWorks() {
  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
}

// ── Component ─────────────────────────────────────────

interface FormData {
  fullName: string;
  centerName: string;
  email: string;
  phone: string;
  locationCount: string;
  staffCount: string;
  challenge: string;
  _hp?: string;
}

export function EcentialLanding() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formLoadedAt] = useState(() => Date.now());
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const painRef = useRef(null);
  const solutionsRef = useRef(null);
  const howRef = useRef(null);
  const trustRef = useRef(null);
  const statsRef = useRef(null);
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const painInView = useInView(painRef, { once: true, margin: '-80px' });
  const solutionsInView = useInView(solutionsRef, { once: true, margin: '-80px' });
  const howInView = useInView(howRef, { once: true, margin: '-80px' });
  const trustInView = useInView(trustRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const formInView = useInView(formRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const payload: EcentialFormData = {
      fullName: data.fullName,
      centerName: data.centerName,
      email: data.email,
      phone: data.phone,
      locationCount: data.locationCount,
      staffCount: data.staffCount,
      challenge: data.challenge || undefined,
      _hp: data._hp,
      _t: formLoadedAt,
    };
    const result = await submitEcentialForm(payload);
    if (result.success) {
      // See the contact form: success alone covers spam and unconfigured runs.
      if (result.ref) {
        trackLead({ form_name: 'partner', lead_source: 'ecential', page_path: pathname });
      }
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* ── 1. Sticky Header ─────────────────────────── */}
      <header className={`ec-header ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="ec-container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Image
              src="/ecential_logo.jpg"
              alt="Ecential"
              width={180}
              height={40}
              className="h-10 sm:h-11 w-auto"
            />
            <span className="hidden sm:inline text-base text-[var(--ec-gray-400)]">
              In partnership with <span className="font-semibold text-[var(--ec-navy)]">Insero</span>
            </span>
          </div>
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-[var(--ec-blue)] text-white text-base font-semibold rounded-lg hover:bg-[var(--ec-blue-dark)] transition-colors shadow-sm"
          >
            Get Your Free Quote
          </motion.button>
        </div>
      </header>

      {/* ── 2. Hero ───────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-16 sm:pt-20 lg:pt-28 pb-16 lg:pb-24 bg-[var(--ec-off-white)] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--ec-blue)]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--ec-blue)]/3 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="ec-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
              Stop Losing Enrollment Calls.{' '}
              <span className="ec-text-gradient">Start Growing Your Center.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--ec-gray-400)] max-w-2xl mx-auto mb-10 leading-relaxed">
              A modern phone system built for childcare centers &mdash; so every parent inquiry gets answered, even when your hands are full.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-10 py-4.5 bg-[var(--ec-blue)] text-white font-semibold text-lg md:text-xl rounded-xl shadow-lg shadow-[var(--ec-blue)]/25 hover:shadow-xl hover:shadow-[var(--ec-blue)]/35 transition-all duration-300"
              >
                <span>Get a Free Quote</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={scrollToHowItWorks}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-10 py-4.5 border-2 border-[var(--ec-gray-200)] text-[var(--ec-navy)] font-semibold text-lg md:text-xl rounded-xl hover:border-[var(--ec-blue)] hover:text-[var(--ec-blue)] transition-colors"
              >
                <span>See How It Works</span>
                <ArrowDown weight="bold" className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-base text-[var(--ec-gray-300)]"
            >
              {['Trusted by 25,000+ childcare professionals', 'Zero cost to you', 'No contracts'].map(
                (badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--ec-blue)] rounded-full" />
                    <span>{badge}</span>
                  </div>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Pain Points ─────────────────────────────── */}
      <section ref={painRef} className="py-20 lg:py-28 bg-white">
        <div className="ec-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={painInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-base font-semibold text-[var(--ec-blue)] uppercase tracking-wider mb-3">Sound familiar?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              These Phone Problems Are{' '}
              <span className="ec-text-gradient">Costing You Families</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={painInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {painPoints.map((point, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <div className="relative bg-white rounded-2xl p-8 border border-[var(--ec-gray-100)] h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[var(--ec-blue)]/20">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--ec-blue)] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-14 h-14 bg-[var(--ec-blue-50)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[var(--ec-blue)] transition-colors duration-300">
                    <point.icon
                      weight="fill"
                      className="w-7 h-7 text-[var(--ec-blue)] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3">{point.title}</h3>
                  <p className="text-base lg:text-lg text-[var(--ec-gray-400)] leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. Solutions Grid ──────────────────────────── */}
      <section ref={solutionsRef} className="py-20 lg:py-28 bg-[var(--ec-off-white)]">
        <div className="ec-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-base font-semibold text-[var(--ec-blue)] uppercase tracking-wider mb-3">What you get</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              A Phone System That Works{' '}
              <span className="ec-text-gradient">as Hard as You Do</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--ec-gray-400)] max-w-2xl mx-auto">
              Modern cloud-based voice solutions designed for childcare centers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={solutionsInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {solutions.map((sol, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-white rounded-2xl p-7 border border-[var(--ec-gray-100)] h-full hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-[var(--ec-blue-50)] rounded-xl flex items-center justify-center mb-4">
                    <sol.icon weight="fill" className="w-6 h-6 text-[var(--ec-blue)]" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold mb-2">{sol.title}</h3>
                  <p className="text-[var(--ec-gray-400)] text-base leading-relaxed">{sol.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. How It Works ─────────────────────────────── */}
      <section id="how-it-works" ref={howRef} className="py-20 lg:py-28 bg-white">
        <div className="ec-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Get Set Up in{' '}
              <span className="ec-text-gradient">3 Simple Steps</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--ec-blue)] text-white text-lg font-bold rounded-2xl mb-5 shadow-lg shadow-[var(--ec-blue)]/20">
                  {step.number}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-base lg:text-lg text-[var(--ec-gray-400)] leading-relaxed">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowDown weight="bold" className="w-5 h-5 text-[var(--ec-blue)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={howInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-10 text-[var(--ec-gray-400)] text-lg md:text-xl"
          >
            Our service is <span className="font-semibold text-[var(--ec-navy)]">completely free</span>. Providers pay us, not you.
          </motion.p>
        </div>
      </section>

      {/* ── 6. Why It's Free / Trust ────────────────────── */}
      <section ref={trustRef} className="py-20 lg:py-28 bg-[var(--ec-off-white)]">
        <div className="ec-container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={trustInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Yes, It&apos;s Really Free.{' '}
                <span className="ec-text-gradient">Here&apos;s Why.</span>
              </h2>
              <p className="text-lg md:text-xl text-[var(--ec-gray-400)] leading-relaxed">
                Insero is a telecom broker &mdash; think of us like an insurance broker for your phone and internet. We compare dozens of providers on your behalf and recommend the best fit. The provider we match you with compensates us directly. You never pay anything.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={trustInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
            >
              {trustChecks.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--ec-gray-100)]"
                >
                  <CheckCircle weight="fill" className="w-5 h-5 text-[var(--ec-success)] flex-shrink-0" />
                  <span className="text-[var(--ec-navy)] font-medium text-base lg:text-lg">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={trustInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-[var(--ec-gray-100)] text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <Image
                  src="/ecential_logo.jpg"
                  alt="Ecential"
                  width={160}
                  height={36}
                  className="h-9 w-auto"
                />
                <span className="text-[var(--ec-gray-300)] text-lg">+</span>
                <Image
                  src="/insero-logo-dark.png"
                  alt="Insero"
                  width={100}
                  height={28}
                  className="h-7 w-auto"
                />
              </div>
              <p className="text-[var(--ec-gray-400)] text-base leading-relaxed">
                Ecential has partnered with Insero, a telecom consultancy trusted by 500+ businesses with 25+ years of experience, to bring this exclusive service to childcare center owners.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. Stats Bar ────────────────────────────────── */}
      <section ref={statsRef} className="ec-stats-gradient py-16 lg:py-20">
        <div className="ec-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3">
                  <stat.icon weight="fill" className="w-6 h-6 text-[var(--ec-blue-light)]" />
                </div>
                <div className="text-3xl lg:text-5xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-base font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 8. Lead Capture Form ─────────────────────────── */}
      <section
        id="ecential-form"
        ref={formRef}
        className="scroll-mt-20 py-20 lg:py-28 bg-[var(--ec-off-white)]"
      >
        <div className="ec-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Get Your Free{' '}
              <span className="ec-text-gradient">Phone System Assessment</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--ec-gray-400)] max-w-xl mx-auto">
              Tell us about your center and we&apos;ll have a recommendation within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[var(--ec-gray-100)] shadow-[var(--ec-shadow-lg)]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-[var(--ec-blue-50)] rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle weight="fill" className="w-8 h-8 text-[var(--ec-success)]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                  <p className="text-[var(--ec-gray-400)] max-w-md mx-auto">
                    We&apos;ll be in touch within 1 business day to get started on your assessment.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Honeypot field — hidden from humans, visible to bots */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('_hp')}
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-base font-semibold text-[var(--ec-navy)] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register('fullName', { required: 'Full name is required' })}
                      className={`ec-input ${errors.fullName ? 'error' : ''}`}
                      placeholder="Jane Smith"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-[var(--ec-error)]">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Center Name */}
                  <div>
                    <label htmlFor="centerName" className="block text-base font-semibold text-[var(--ec-navy)] mb-2">
                      Center Name *
                    </label>
                    <input
                      type="text"
                      id="centerName"
                      {...register('centerName', { required: 'Center name is required' })}
                      className={`ec-input ${errors.centerName ? 'error' : ''}`}
                      placeholder="Sunshine Learning Center"
                    />
                    {errors.centerName && (
                      <p className="mt-1 text-sm text-[var(--ec-error)]">{errors.centerName.message}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-base font-semibold text-[var(--ec-navy)] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`ec-input ${errors.email ? 'error' : ''}`}
                        placeholder="jane@center.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-[var(--ec-error)]">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-base font-semibold text-[var(--ec-navy)] mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone', { required: 'Phone number is required' })}
                        className={`ec-input ${errors.phone ? 'error' : ''}`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-[var(--ec-error)]">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Locations & Staff */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="locationCount" className="block text-base font-semibold text-[var(--ec-navy)] mb-2">
                        Number of Locations *
                      </label>
                      <select
                        id="locationCount"
                        {...register('locationCount', { required: 'Please select location count' })}
                        className={`ec-input ${errors.locationCount ? 'error' : ''}`}
                      >
                        <option value="">Select...</option>
                        {locationOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.locationCount && (
                        <p className="mt-1 text-sm text-[var(--ec-error)]">{errors.locationCount.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="staffCount" className="block text-base font-semibold text-[var(--ec-navy)] mb-2">
                        Number of Staff *
                      </label>
                      <select
                        id="staffCount"
                        {...register('staffCount', { required: 'Please select staff count' })}
                        className={`ec-input ${errors.staffCount ? 'error' : ''}`}
                      >
                        <option value="">Select...</option>
                        {staffOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      {errors.staffCount && (
                        <p className="mt-1 text-sm text-[var(--ec-error)]">{errors.staffCount.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Challenge */}
                  <div>
                    <label htmlFor="challenge" className="block text-base font-semibold text-[var(--ec-navy)] mb-2">
                      Biggest Phone Challenge{' '}
                      <span className="font-normal text-[var(--ec-gray-300)]">(optional)</span>
                    </label>
                    <textarea
                      id="challenge"
                      {...register('challenge')}
                      rows={3}
                      className="ec-input resize-none"
                      placeholder="e.g., We miss too many enrollment calls during nap time"
                    />
                  </div>

                  {/* Error */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <WarningCircle weight="fill" className="w-5 h-5 text-[var(--ec-error)] flex-shrink-0" />
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[var(--ec-blue)] text-white font-semibold text-lg rounded-xl shadow-lg shadow-[var(--ec-blue)]/25 hover:bg-[var(--ec-blue-dark)] hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <span>Submitting...</span> : <span>Get My Free Assessment</span>}
                  </motion.button>

                  <p className="text-xs text-[var(--ec-gray-300)] text-center">
                    By submitting, you agree to be contacted about phone system solutions. We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────── */}
      <section ref={faqRef} className="py-20 lg:py-28 bg-white">
        <div className="ec-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="border border-[var(--ec-gray-100)] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--ec-off-white)] transition-colors"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-[var(--ec-navy)] pr-4 text-base lg:text-lg">{item.question}</span>
                  <CaretDown
                    weight="bold"
                    className={`w-5 h-5 text-[var(--ec-gray-300)] flex-shrink-0 transition-transform duration-200 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div className={`ec-faq-answer ${openFaq === index ? 'open' : ''}`}>
                  <p className="px-5 pb-5 text-[var(--ec-gray-400)] text-base lg:text-lg leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Final CTA + Footer ──────────────────────── */}
      <section ref={ctaRef} className="py-20 lg:py-28 bg-[var(--ec-off-white)]">
        <div className="ec-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Every Missed Call Is a Family{' '}
              <span className="ec-text-gradient">You Didn&apos;t Enroll</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--ec-gray-400)] mb-10 max-w-xl mx-auto">
              Get your free phone system assessment today. It takes 2 minutes and could transform how families experience your center.
            </p>
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--ec-blue)] text-white font-semibold text-lg rounded-xl shadow-lg shadow-[var(--ec-blue)]/25 hover:shadow-xl hover:shadow-[var(--ec-blue)]/35 transition-all duration-300"
            >
              <span>Get My Free Assessment</span>
              <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-[var(--ec-gray-100)]">
        <div className="ec-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/ecential_logo.jpg"
                alt="Ecential"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-base text-[var(--ec-gray-300)]">In partnership with</span>
              <Image
                src="/insero-logo-dark.png"
                alt="Insero"
                width={90}
                height={24}
                className="h-6 w-auto"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--ec-gray-300)]">
              <a href="/privacy" className="hover:text-[var(--ec-navy)] transition-colors">
                Privacy Policy
              </a>
              <span>&copy; {new Date().getFullYear()} Insero. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
