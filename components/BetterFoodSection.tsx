'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useReducedMotion,
  MotionValue,
} from 'motion/react';
import CountUp from './CountUp';

// High-speed two-row Marquee component with scroll velocity boost
const VelocityMarqueeRow: React.FC<{
  children: React.ReactNode;
  baseVelocity?: number;
  scrollVelocity: MotionValue<number>;
  direction?: 1 | -1;
  className?: string;
}> = ({ children, baseVelocity = 2, scrollVelocity, direction = 1, className = '' }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap flex w-full select-none">
      <motion.div
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
        className={`flex items-center shrink-0 ${className}`}
      >
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">{children}</div>
        <div className="flex items-center gap-6 sm:gap-10 shrink-0 pr-6 sm:pr-10">{children}</div>
      </motion.div>
    </div>
  );
};

// Word-by-word scroll scrubbing component
const ScrubWord: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent?: boolean;
}> = ({ word, progress, range, isAccent }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.25em] transition-colors duration-75 ${
        isAccent
          ? 'font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E]'
          : 'text-[#0E0B09]'
      }`}
    >
      {word}
    </motion.span>
  );
};

export const BetterFoodSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Parallax offsets for the 6 asymmetric collage photo cards (confined to upper region)
  const card1Y = useTransform(scrollYProgress, [0, 1], [-50, 70]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [30, -60]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [-40, 50]);
  const card4Y = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const card5Y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const card6Y = useTransform(scrollYProgress, [0, 1], [20, -50]);

  const dishesRow1 = [
    'HYDERABADI BIRYANI',
    'GALOUTI KEBAB',
    'WOODFIRED PIZZA',
    'CRISPY MASALA DOSA',
    'DAL MAKHANI',
    'SMASH BURGER',
  ];

  const dishesRow2 = [
    'HANDMADE DIM SUM',
    'BUTTER CHICKEN',
    'TENDER SOURDOUGH',
    'MALAI CHOP',
    'MOLTEN GANACHE',
    'TANDOORI CHAAT',
  ];

  const headlineWords = [
    { text: 'Better', accent: false },
    { text: 'food', accent: false },
    { text: 'for', accent: false },
    { text: 'more', accent: true },
    { text: 'people', accent: true },
  ];

  const paragraphText =
    "For over a decade, we've helped millions discover new tastes, celebrate heritage kitchens, and enjoy warm meals delivered to their doorstep in minutes.";
  const paragraphWords = paragraphText.split(' ');

  return (
    <section
      ref={containerRef}
      id="better-food"
      className="relative w-full bg-[#F5EEE3] text-[#0E0B09] py-24 sm:py-36 overflow-hidden z-20 stacked-card -mt-12"
    >
      {/* ── 1. GIANT TWO-ROW MARQUEE (12vw, 1 solid ink, 1 outlined) ──────── */}
      <div className="w-full flex flex-col gap-2 sm:gap-4 mb-16 sm:mb-24 overflow-hidden select-none">
        {/* Row 1: Solid ink, moves left */}
        <VelocityMarqueeRow
          baseVelocity={-1.5}
          scrollVelocity={smoothVelocity}
          direction={-1}
          className="font-extrabold text-[#0E0B09] text-[clamp(2.75rem,8.5vw,9rem)] leading-[0.9] tracking-[-0.04em] font-[family-name:var(--font-display)]"
        >
          {dishesRow1.map((dish, i) => (
            <span key={i} className="inline-flex items-center gap-6 sm:gap-10">
              <span>{dish}</span>
              <span className="text-[#FF5B2E] text-[0.6em]">✦</span>
            </span>
          ))}
        </VelocityMarqueeRow>

        {/* Row 2: Outlined text, moves right */}
        <VelocityMarqueeRow
          baseVelocity={1.5}
          scrollVelocity={smoothVelocity}
          direction={1}
          className="font-extrabold text-stroke-ink text-[clamp(2.75rem,8.5vw,9rem)] leading-[0.9] tracking-[-0.04em] font-[family-name:var(--font-display)]"
        >
          {dishesRow2.map((dish, i) => (
            <span key={i} className="inline-flex items-center gap-6 sm:gap-10">
              <span>{dish}</span>
              <span className="text-[#FF5B2E] text-[0.6em]">✦</span>
            </span>
          ))}
        </VelocityMarqueeRow>
      </div>

      {/* ── 2. EDITORIAL COLLAGE & PROTECTED HEADLINE AREA ──────── */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        {/* Outer Grid: Left cards (col 1), Protected Text (col 2), Right cards (col 3) */}
        <div className="relative min-h-[520px] flex items-center justify-center">
          {/* Left Flank Floating Cards (Strictly in left column, well away from center text) */}
          <div className="absolute left-0 top-0 bottom-0 w-[240px] pointer-events-none hidden xl:block z-0">
            {/* Card 1: Smash Burger */}
            <motion.div
              style={shouldReduceMotion ? {} : { y: card1Y }}
              className="absolute top-2 left-0 w-52 rounded-[28px] overflow-hidden shadow-2xl shadow-[#0E0B09]/15 border-[3px] border-white -rotate-3"
            >
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <div className="p-3 bg-white text-left">
                <span className="text-[10px] font-mono uppercase font-bold text-[#FF5B2E] tracking-wider">
                  Double Brioche
                </span>
                <p className="text-xs font-bold text-[#0E0B09] leading-tight">Smash Burger</p>
              </div>
            </motion.div>

            {/* Card 2: Biryani */}
            <motion.div
              style={shouldReduceMotion ? {} : { y: card2Y }}
              className="absolute top-[280px] left-4 w-48 rounded-[28px] overflow-hidden shadow-2xl shadow-[#0E0B09]/15 border-[3px] border-white rotate-2"
            >
              <div
                className="h-44 w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <div className="p-3 bg-white text-left">
                <span className="text-[10px] font-mono uppercase font-bold text-[#FF5B2E] tracking-wider">
                  Dum Handi
                </span>
                <p className="text-xs font-bold text-[#0E0B09] leading-tight">Royal Biryani</p>
              </div>
            </motion.div>
          </div>

          {/* Right Flank Floating Cards (Strictly in right column) */}
          <div className="absolute right-0 top-0 bottom-0 w-[240px] pointer-events-none hidden xl:block z-0">
            {/* Card 4: Pizza */}
            <motion.div
              style={shouldReduceMotion ? {} : { y: card4Y }}
              className="absolute top-4 right-0 w-52 rounded-[28px] overflow-hidden shadow-2xl shadow-[#0E0B09]/15 border-[3px] border-white rotate-4"
            >
              <div
                className="h-48 w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <div className="p-3 bg-white text-left">
                <span className="text-[10px] font-mono uppercase font-bold text-[#FF5B2E] tracking-wider">
                  Woodfired
                </span>
                <p className="text-xs font-bold text-[#0E0B09] leading-tight">Buffalo Margherita</p>
              </div>
            </motion.div>

            {/* Card 5: Dim Sum */}
            <motion.div
              style={shouldReduceMotion ? {} : { y: card5Y }}
              className="absolute top-[280px] right-4 w-48 rounded-[28px] overflow-hidden shadow-2xl shadow-[#0E0B09]/15 border-[3px] border-white -rotate-3"
            >
              <div
                className="h-44 w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80)',
                }}
              />
              <div className="p-3 bg-white text-left">
                <span className="text-[10px] font-mono uppercase font-bold text-[#FF5B2E] tracking-wider">
                  Steamed Fresh
                </span>
                <p className="text-xs font-bold text-[#0E0B09] leading-tight">Handmade Dim Sum</p>
              </div>
            </motion.div>
          </div>

          {/* PROTECTED CENTER COLUMN: Text lives safely here with zero overlap */}
          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center py-6">
            {/* Centered Headline with Scroll Scrubbing (15% -> 100%) */}
            <h2 className="font-extrabold text-[#0E0B09] text-[clamp(2.5rem,6.8vw,6rem)] leading-[0.92] tracking-[-0.04em] text-balance font-[family-name:var(--font-display)]">
              {headlineWords.map((item, idx) => {
                const start = 0.12 + idx * 0.04;
                const end = start + 0.1;
                return (
                  <ScrubWord
                    key={idx}
                    word={item.text}
                    progress={scrollYProgress}
                    range={[start, end]}
                    isAccent={item.accent}
                  />
                );
              })}
            </h2>

            {/* Subtext Paragraph with subtle scrub */}
            <p className="mt-8 text-base sm:text-lg md:text-xl text-[#7E7771] font-normal leading-relaxed max-w-lg text-balance">
              {paragraphWords.map((word, idx) => {
                const start = 0.2 + (idx / paragraphWords.length) * 0.2;
                const end = start + 0.06;
                return (
                  <ScrubWord
                    key={idx}
                    word={word}
                    progress={scrollYProgress}
                    range={[Math.min(start, 0.65), Math.min(end, 0.72)]}
                  />
                );
              })}
            </p>

            {/* Mobile Photo Preview Strip (only on screens without side cards) */}
            <div className="xl:hidden w-full mt-10 grid grid-cols-2 gap-3 max-w-md mx-auto">
              <div className="rounded-[22px] overflow-hidden shadow-lg border-2 border-white -rotate-1">
                <div
                  className="h-32 w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80)',
                  }}
                />
                <div className="p-2.5 bg-white text-left">
                  <p className="text-[11px] font-bold text-[#0E0B09]">Double Smash Burger</p>
                </div>
              </div>
              <div className="rounded-[22px] overflow-hidden shadow-lg border-2 border-white rotate-1">
                <div
                  className="h-32 w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80)',
                  }}
                />
                <div className="p-2.5 bg-white text-left">
                  <p className="text-[11px] font-bold text-[#0E0B09]">Buffalo Margherita</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. THREE HUGE NUMERALS STATS ROW (Isolated and Wide) ──────── */}
        <div className="w-full max-w-5xl mx-auto mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-[#0E0B09]/15">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0E0B09]/15 gap-8 md:gap-4 items-center">
            {/* Stat 1: 250,000+ */}
            <div className="flex flex-col items-center justify-center text-center px-4">
              <div className="font-extrabold text-[#0E0B09] text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.04em] font-[family-name:var(--font-display)]">
                <CountUp end={250000} suffix="+" duration={2000} />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#7E7771] mt-3">
                Restaurants Partnered
              </span>
            </div>

            {/* Stat 2: 700+ */}
            <div className="flex flex-col items-center justify-center text-center px-4 pt-6 md:pt-0">
              <div className="font-extrabold text-[#0E0B09] text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.04em] font-[family-name:var(--font-display)]">
                <CountUp end={700} suffix="+" duration={1600} />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#7E7771] mt-3">
                Cities Served
              </span>
            </div>

            {/* Stat 3: 2B+ Orders Delivered (Fixed 2B+ numeral display) */}
            <div className="flex flex-col items-center justify-center text-center px-4 pt-6 md:pt-0">
              <div className="font-extrabold text-[#FF5B2E] text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.04em] font-[family-name:var(--font-display)]">
                <CountUp
                  end={2000000000}
                  displayOverride="2B+"
                  suffix=""
                  duration={1800}
                />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#7E7771] mt-3">
                Orders Delivered
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetterFoodSection;
