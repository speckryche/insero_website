'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

/**
 * The four pillars, divided by the vertical rules the heading names.
 *
 * Not a card grid, and the change is more than cosmetic: four bordered boxes
 * with tinted icon tiles was the third consecutive section on this page built
 * that way. The columns here are separated by hairlines at
 * --color-secondary/15, the same device WhyInsero divides its stat strip with,
 * so the rules ARE the pillars rather than decoration around them.
 *
 * The per-service colours are gone with the tiles — voice blue, internet teal,
 * sdwan violet, security red. They were the strongest per-service signal on the
 * page and this is a real loss, taken deliberately: the section now reads in
 * brand colours only, and the coding returns with the services-page work rather
 * than surviving here as four tinted squares.
 */
const services = [
  {
    title: 'Voice Connectivity',
    description: 'Modern phone systems that scale with your business and reduce costs.',
    features: ['VoIP Solutions', 'Unified Communications', 'Call Analytics'],
    href: '/services/voice',
  },
  {
    title: 'Internet Connectivity',
    description: 'Speed and reliability optimized for your specific needs and budget.',
    features: ['Fiber & Broadband', 'Dedicated Internet', 'Multi-carrier Options'],
    href: '/services/internet',
  },
  {
    title: 'SD-WAN & Redundancy',
    description: 'Never lose connection again with intelligent network management.',
    features: ['Failover Protection', 'Traffic Optimization', 'Multi-site Connectivity'],
    href: '/services/sdwan',
  },
  {
    title: 'Security',
    description: 'Protection without complexity. Enterprise security made accessible.',
    features: ['Firewall Solutions', 'Threat Detection', 'Compliance Support'],
    href: '/services/security',
  },
];

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#e2e8ec]">
      <div className="container-custom">
        {/* Section header — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            Four Pillars of <span className="text-[#008838]">Connectivity</span>
          </h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-3xl mx-auto">
            We help you navigate the complex world of cloud and connectivity services
            to find the perfect fit for your business.
          </p>
        </motion.div>

        {/* The negative margin is what lets the outer columns carry the same
            padding as the inner ones without their text sitting inset from the
            heading above. -mx-6 is exactly --container-padding (1.5rem), so the
            grid's edges land on the container's content edge and nothing
            overflows; -mx-5 does the same job inside the 24px at sm. The
            alternative — first:pl-0 / last:pr-0 — collides with the nth-child
            rules below at equal specificity and resolves on stylesheet order,
            which is not something to leave to chance. */}
        <div className="grid grid-cols-1 border-t border-[#1a2530]/15 sm:grid-cols-2 sm:-mx-5 lg:grid-cols-4 lg:-mx-6 lg:border-b">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              /* Which edge carries the rule changes with the column count. At
                 two across, only the even children start a second column, so
                 only they take a left border — an unconditional one would draw
                 a stray rule down the left edge of every row start. At four
                 across every child but the first does. The two rules union
                 correctly where they overlap. */
              className="flex flex-col py-8 border-b border-[#1a2530]/15 sm:px-5 sm:[&:nth-child(even)]:border-l lg:px-6 lg:py-10 lg:border-b-0 lg:[&:nth-child(n+2)]:border-l"
            >
              <Link href={service.href} className="group flex flex-col h-full">
                <h3 className="text-xl font-display font-bold text-[#1e293b] leading-snug mb-2.5 text-balance group-hover:text-[#008838] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-[15px] text-[#475569] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* A short green rule per feature rather than a grey dot. The
                    dot was decoration; at this size the rule reads as the same
                    hairline the columns are built from, one scale down. */}
                <ul className="flex flex-col gap-2.5 mb-7 flex-grow">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[14px_1fr] gap-2.5 items-baseline text-sm text-[#64748b]"
                    >
                      <span aria-hidden="true" className="block h-px bg-[#008838] -translate-y-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-2 self-start text-[15px] font-semibold text-[#005C28]">
                  <span className="border-b border-[#005C28]/30 pb-0.5 group-hover:border-[#005C28] transition-colors duration-200">
                    Learn More
                  </span>
                  <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#008838] text-[#005C28] font-semibold rounded-xl hover:bg-[#008838] hover:text-white transition-colors duration-200"
          >
            <span>View All Services</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
