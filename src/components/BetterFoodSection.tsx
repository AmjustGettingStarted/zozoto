import React from 'react';
import { motion } from 'motion/react';
import { CONTENT } from '../content.ts';
import FoodCutouts from './FoodCutouts.tsx';
import CountUp from './CountUp.tsx';

export const BetterFoodSection: React.FC = () => {
  return (
    <section
      id="better-food"
      className="relative w-full min-h-[920px] bg-white text-[#0B0B0C] py-28 sm:py-36 px-6 sm:px-8 overflow-hidden z-20"
      style={{
        borderTopLeftRadius: 'clamp(32px, 5vw, 64px)',
        borderTopRightRadius: 'clamp(32px, 5vw, 64px)',
        marginTop: '-48px',
        boxShadow: '0 -25px 50px -12px rgba(0, 0, 0, 0.35)',
      }}
    >
      {/* Background Subtle Gradient & Grid Glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_top,#FFF1EB_0%,#FFFFFF_70%] opacity-70 pointer-events-none" />

      {/* Floating 3D-ish Food Cut-outs with Winding SVG Draw Line */}
      <FoodCutouts />

      {/* Center Content Stack */}
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-20">
        {/* Subtle pill pill-badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 bg-[#FFF1EB] border border-[#FF5B2E]/20 text-[#D93A12] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5B2E] animate-ping" />
          The Zozoto Promise
        </motion.div>

        {/* Centered H2 in Brand Flame (#FF5B2E) */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold text-[#FF5B2E] text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-2xl text-balance"
        >
          {CONTENT.betterFood.heading}
        </motion.h2>

        {/* Gray paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-[#6B6B72] max-w-xl font-normal leading-relaxed"
        >
          {CONTENT.betterFood.paragraph}
        </motion.p>

        {/* Floating White Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-20 w-full max-w-3xl bg-white/90 backdrop-blur-xl border border-neutral-200/80 rounded-[28px] p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(217,58,18,0.12),0_0_1px_1px_rgba(0,0,0,0.05)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 gap-6 sm:gap-2">
            {/* Stat 1: 250,000+ restaurants (Storefront icon) */}
            <div className="flex flex-col items-center text-center p-3 sm:px-6">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF1EB] flex items-center justify-center text-[#FF5B2E] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                {/* Illustrated Storefront Icon */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a2 2 0 012-2h12a2 2 0 012 2" />
                </svg>
              </div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B0B0C] tracking-tight">
                <CountUp end={250000} suffix="+" duration={2200} />
              </div>
              <span className="text-sm font-medium text-[#6B6B72] mt-1 capitalize">
                restaurants
              </span>
            </div>

            {/* Stat 2: 700+ cities (Map pin icon) */}
            <div className="flex flex-col items-center text-center p-3 sm:px-6 pt-6 sm:pt-3">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF3C4] flex items-center justify-center text-[#D4A94A] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                {/* Illustrated Map Pin Icon */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B0B0C] tracking-tight">
                <CountUp end={700} suffix="+" duration={1800} />
              </div>
              <span className="text-sm font-medium text-[#6B6B72] mt-1 capitalize">
                cities
              </span>
            </div>

            {/* Stat 3: 2 billion+ orders delivered (Paper bag icon) */}
            <div className="flex flex-col items-center text-center p-3 sm:px-6 pt-6 sm:pt-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E9E1FF] flex items-center justify-center text-[#7C3AED] mb-4 shadow-sm group-hover:scale-110 transition-transform">
                {/* Illustrated Paper Bag Icon */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B0B0C] tracking-tight">
                <CountUp end={2} displayOverride="2 billion+" duration={1500} />
              </div>
              <span className="text-sm font-medium text-[#6B6B72] mt-1 capitalize">
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
