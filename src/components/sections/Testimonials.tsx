'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Quotes,
  Star,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react';

const testimonials = [
  {
    quote:
      'Insero helped us cut our telecom costs by 40% while actually improving our service quality. Their carrier-agnostic approach meant we got the best solution, not just the one that paid them the most.',
    author: 'Sarah Johnson',
    title: 'CFO',
    company: 'TechStart Inc.',
    avatar: 'SJ',
    rating: 5,
    savings: '40%'
  },
  {
    quote:
      'The fact that their services cost us nothing was almost too good to be true. But they delivered exactly what they promised - better connectivity at lower costs.',
    author: 'Michael Chen',
    title: 'Operations Director',
    company: 'Midwest Manufacturing',
    avatar: 'MC',
    rating: 5,
    savings: '35%'
  },
  {
    quote:
      'After years of dealing with confusing carrier contracts, Insero made everything simple. They translated the tech jargon and found us the perfect solution.',
    author: 'Emily Rodriguez',
    title: 'IT Manager',
    company: 'Regional Healthcare Group',
    avatar: 'ER',
    rating: 5,
    savings: '28%'
  },
];

export function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[var(--color-gray-50)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 lg:mb-20"
        >
<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-secondary)] mb-6 leading-tight">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-gray-500)] max-w-2xl mx-auto">
            Real results from real businesses who trusted us with their connectivity needs.
          </p>
        </motion.div>

        {/* Featured testimonial - Desktop */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-12 gap-8 items-center"
          >
            {/* Main testimonial card */}
            <div className="col-span-7">
              <div className="relative bg-white rounded-3xl p-10 lg:p-12 shadow-xl border border-gray-100">
                {/* Quote icon */}
                <Quotes
                  weight="fill"
                  className="absolute top-8 right-8 w-16 h-16 text-[var(--color-primary)]/10"
                />

                {/* Savings badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-internet)]/10 text-[var(--color-internet)] rounded-full mb-6">
                  <span className="font-bold">{testimonials[activeIndex].savings}</span>
                  <span className="text-sm">Cost Savings</span>
                </div>

                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl text-[var(--color-secondary)] leading-relaxed mb-8 relative z-10">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </blockquote>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} weight="fill" className="w-5 h-5 text-amber-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-secondary)] text-lg">
                      {testimonials[activeIndex].author}
                    </div>
                    <div className="text-[var(--color-gray-500)]">
                      {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation and other testimonials */}
            <div className="col-span-5 space-y-6">
              {testimonials.map((testimonial, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-[var(--color-primary)]/5 border-[var(--color-primary)]'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        index === activeIndex
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-gray-100 text-[var(--color-gray-500)]'
                      }`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--color-secondary)]">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-[var(--color-gray-500)]">
                        {testimonial.company}
                      </div>
                    </div>
                    <div
                      className={`ml-auto text-sm font-bold ${
                        index === activeIndex
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--color-gray-400)]'
                      }`}
                    >
                      {testimonial.savings}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile testimonials carousel */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              {/* Quote icon */}
              <Quotes
                weight="fill"
                className="absolute top-6 right-6 w-12 h-12 text-[var(--color-primary)]/10"
              />

              {/* Savings badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-internet)]/10 text-[var(--color-internet)] rounded-full mb-4">
                <span className="font-bold text-sm">{testimonials[activeIndex].savings}</span>
                <span className="text-xs">Savings</span>
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-[var(--color-secondary)] leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} weight="fill" className="w-4 h-4 text-amber-400" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonials[activeIndex].avatar}
                </div>
                <div>
                  <div className="font-bold text-[var(--color-secondary)]">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-sm text-[var(--color-gray-500)]">
                    {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[var(--color-gray-500)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
              >
                <CaretLeft weight="bold" className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? 'w-8 bg-[var(--color-primary)]'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[var(--color-gray-500)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
              >
                <CaretRight weight="bold" className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
