'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '@/lib/content';
import { EASE } from '@/lib/motion';
import CountUp from './CountUp';
import Marquee from './primitives/Marquee';

export const BetterFoodSection: React.FC = () => {
  const culinaryHighlights = [
    'Hyderabadi Dum Biryani',
    'Lucknowi Galouti Kebabs',
    'Woodfired Neapolitan Pizza',
    'Crispy Masala Dosa',
    'Creamy Dal Makhani',
    'Truffle Smash Burgers',
    'Handmade Dim Sum',
    'Old Delhi Butter Chicken',
    'Artisanal Sourdough',
  ];

  return (
    <section
      id="better-food"
      className="relative w-full bg-[#FAFAF8] text-[#0B0B0C] pt-24 sm:pt-32 pb-28 px-6 sm:px-8 overflow-hidden z-20"
      style={{
        borderTopLeftRadius: 'clamp(32px, 5vw, 64px)',
        borderTopRightRadius: 'clamp(32px, 5vw, 64px)',
        marginTop: '-48px',
        boxShadow: '0 -30px 60px -15px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[450px] bg-gradient-to-b from-[#FFF1EB]/80 to-transparent pointer-events-none" />

      {/* Culinary Ticker Marquee */}
      <div className="relative max-w-6xl mx-auto mb-16 sm:mb-20">
        <Marquee speed={25} className="py-2 text-neutral-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
          {culinaryHighlights.map((dish) => (
            <span key={dish} className="inline-flex items-center gap-3">
              <span className="text-[#FF5B2E]">✦</span>
              <span className="text-neutral-600 hover:text-[#0B0B0C] transition-colors">{dish}</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Center Editorial Content Stack */}
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-20">
        {/* Editorial Subtitle Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: EASE.out }}
          className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#D93A12] mb-4"
        >
          Curated Flavours • Trusted Kitchens
        </motion.div>

        {/* Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE.out }}
          className="font-extrabold text-[#0B0B0C] text-4xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight max-w-3xl leading-[1.08] text-balance font-[family-name:var(--font-display)]"
        >
          Better food for{' '}
          <span className="font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E] px-1">
            more people
          </span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE.out }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#6B6B72] max-w-2xl font-normal leading-relaxed text-balance"
        >
          {CONTENT.betterFood.paragraph}
        </motion.p>

        {/* Three High-End Visual Food Highlights (Photographic Cards, never overlapping text) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-14 sm:mt-18 text-left">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE.out }}
            className="group relative rounded-3xl bg-white border border-neutral-200/80 p-5 shadow-[0_15px_35px_rgba(11,11,12,0.04)] hover:shadow-[0_20px_45px_rgba(255,91,46,0.1)] transition-all duration-300"
          >
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-neutral-100 mb-4">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#0B0B0C] shadow-xs">
                Smash Burgers
              </span>
            </div>
            <h3 className="font-bold text-lg text-[#0B0B0C] font-[family-name:var(--font-display)]">
              Double Brioche Stack
            </h3>
            <p className="text-xs text-[#6B6B72] mt-1 leading-relaxed">
              Caramelized onion jam, aged cheddar, toasted butter-glazed brioche.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE.out }}
            className="group relative rounded-3xl bg-white border border-neutral-200/80 p-5 shadow-[0_15px_35px_rgba(11,11,12,0.04)] hover:shadow-[0_20px_45px_rgba(255,91,46,0.1)] transition-all duration-300"
          >
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-neutral-100 mb-4">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#0B0B0C] shadow-xs">
                Royal Biryani
              </span>
            </div>
            <h3 className="font-bold text-lg text-[#0B0B0C] font-[family-name:var(--font-display)]">
              Nizami Dum Handi
            </h3>
            <p className="text-xs text-[#6B6B72] mt-1 leading-relaxed">
              Saffron-infused long-grain basmati, layered with spiced tender cuts and mint raita.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE.out }}
            className="group relative rounded-3xl bg-white border border-neutral-200/80 p-5 shadow-[0_15px_35px_rgba(11,11,12,0.04)] hover:shadow-[0_20px_45px_rgba(255,91,46,0.1)] transition-all duration-300"
          >
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-neutral-100 mb-4">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#0B0B0C] shadow-xs">
                Woodfired Sourdough
              </span>
            </div>
            <h3 className="font-bold text-lg text-[#0B0B0C] font-[family-name:var(--font-display)]">
              Buffalo Margherita
            </h3>
            <p className="text-xs text-[#6B6B72] mt-1 leading-relaxed">
              Crushed San Marzano plum tomatoes, fresh sweet basil, and torn buffalo mozzarella.
            </p>
          </motion.div>
        </div>

        {/* Elevated Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE.out }}
          className="mt-14 sm:mt-18 w-full max-w-4xl bg-white border border-neutral-200/90 rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(11,11,12,0.06),0_0_1px_rgba(11,11,12,0.05)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 gap-6 sm:gap-2">
            {/* Stat 1: 250,000+ restaurants */}
            <div className="flex flex-col items-center text-center p-3 sm:px-6">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF1EB] flex items-center justify-center text-[#FF5B2E] mb-4">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
                </svg>
              </div>
              <div className="font-extrabold text-3xl sm:text-4xl text-[#0B0B0C] tracking-tight font-[family-name:var(--font-display)]">
                <CountUp end={250000} suffix="+" duration={2000} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#6B6B72] mt-1 capitalize">
                restaurants partnered
              </span>
            </div>

            {/* Stat 2: 700+ cities */}
            <div className="flex flex-col items-center text-center p-3 sm:px-6 pt-6 sm:pt-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF3C4] flex items-center justify-center text-[#D4A94A] mb-4">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="font-extrabold text-3xl sm:text-4xl text-[#0B0B0C] tracking-tight font-[family-name:var(--font-display)]">
                <CountUp end={700} suffix="+" duration={1600} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#6B6B72] mt-1 capitalize">
                cities served
              </span>
            </div>

            {/* Stat 3: 2B+ orders delivered */}
            <div className="flex flex-col items-center text-center p-3 sm:px-6 pt-6 sm:pt-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E9E1FF] flex items-center justify-center text-[#7C3AED] mb-4">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="font-extrabold text-3xl sm:text-4xl text-[#0B0B0C] tracking-tight font-[family-name:var(--font-display)]">
                <CountUp end={2000000000} displayOverride="2B+" suffix="+" duration={1800} />
              </div>
              <span className="text-xs sm:text-sm font-medium text-[#6B6B72] mt-1 capitalize">
                orders delivered
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BetterFoodSection;
