'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

/**
 * The four pillars, as green-headed columns inside a navy slab.
 *
 * Not a card grid, and the change is more than cosmetic: four bordered boxes
 * with tinted icon tiles was the third consecutive section on this page built
 * that way, which is what made the run read as templated. HowItWorks keeps its
 * cards — each one carries an image and earns the box. Here the structure comes
 * from the slab WhyInsero already established and from rules between columns,
 * so the dividers stand in for the pillars the heading names.
 *
 * The slab carries no horizontal padding of its own. It cannot: the banners run
 * the full width of their column and have to meet the slab's outer corners, so
 * the padding lives inside each column, below the banner. `overflow-hidden` on
 * the slab is what rounds the two outer banners — they are drawn square and the
 * slab's own 24px radius clips them, which also keeps the corners correct at
 * every column count as the grid rewraps.
 *
 * Colour on this ground, all measured: white 15.54:1, white/70 ~8.5:1,
 * white/60 ~6.4:1 at 14px, --color-primary-light 5.03:1. The brand green is
 * 3.39:1 ON navy and would fail as text there, which is why the accents step up
 * to #1FA855 — but white ON the brand green is 4.59:1, so it is the right fill
 * for a banner carrying white type.
 *
 * The per-service colours are gone with the tiles — voice blue, internet teal,
 * sdwan violet, security red. That loss is deliberate; the coding returns with
 * the services-page work rather than surviving here as four tinted squares.
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

        <div className="bg-[#1a2530] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
                   correctly where they overlap. The border runs the column's
                   full height, banner included, so the seam between two green
                   banners reads as the same divider as the one below it. */
                className="flex flex-col border-b border-white/15 last:border-b-0 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:[&:nth-child(n+2)]:border-l"
              >
                <Link href={service.href} className="group flex flex-col h-full">
                  {/* Banner. Flush to the column's top edge and, on the outer
                      two, to the slab's corners — there is no padding above or
                      beside it to hold it off.

                      The colour rides on a span, not on the h3. globals.css
                      carries an UNLAYERED h1-h6 colour rule, and unlayered CSS
                      beats @layer utilities whatever the source order, so
                      `text-white` on the heading itself is inert — it renders
                      #1a2530, which on this banner is a dark title on green and
                      on the navy below would vanish entirely. A span is not a
                      heading, so the utility applies normally. */}
                  <div className="bg-[#008838] px-6 py-4 lg:px-7">
                    <h3 className="text-xl font-display font-bold leading-snug text-balance">
                      <span className="text-white">{service.title}</span>
                    </h3>
                  </div>

                  <div className="flex flex-col flex-grow px-6 pt-6 pb-7 lg:px-7 lg:pt-7 lg:pb-8">
                    {/* Full white, up from white/70. On this navy the tinted
                        whites read as grey rather than as quiet text —
                        white/70 resolves to #BABEC1, which is a colour, not a
                        dimmed version of the one above it. 15.54:1. */}
                    <p className="text-[15px] text-white leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* A short green rule per feature rather than a grey dot.
                        The dot was decoration; at this size the rule reads as
                        the same divider the columns are built from, one scale
                        down. The rule keeps --color-primary-light at 5.03:1.

                        The labels go to white/80 (#D1D3D6, 10.36:1) from
                        white/60 (#A3A8AC, 6.48:1). Not pure white: the
                        description above them is, and holding the list one step
                        back is what keeps the column reading in order rather
                        than as one flat block. Both cleared 4.5:1 before — this
                        was never a contrast failure, it was a hue one, the
                        tinted whites sitting on the navy as grey. */}
                    <ul className="flex flex-col gap-2.5 mb-7 flex-grow">
                      {service.features.map((feature, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[14px_1fr] gap-2.5 items-baseline text-sm text-white/80"
                        >
                          <span aria-hidden="true" className="block h-px bg-[#1FA855] -translate-y-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center gap-2 self-start text-[15px] font-semibold text-[#1FA855]">
                      <span className="border-b border-[#1FA855]/35 pb-0.5 group-hover:border-[#1FA855] transition-colors duration-200">
                        Learn More
                      </span>
                      <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA — unchanged, and outside the slab: it belongs to the
            section, not to the four pillars. */}
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
