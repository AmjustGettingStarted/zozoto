'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { CONTENT } from '@/lib/content';
import PinnedPhone from './PinnedPhone';

export const AppFeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 300 });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest < 0.34) {
        setActiveScreenIndex(0);
      } else if (latest < 0.68) {
        setActiveScreenIndex(1);
      } else {
        setActiveScreenIndex(2);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const steps = [
    {
      number: '01',
      title: 'Schedule your order',
      description:
        'Pick your exact date, time slot & kitchen note ahead of peak rushes. Guaranteed zero surge pricing with advance table prep.',
    },
    {
      number: '02',
      title: 'Track your rider',
      description:
        'Real-time live telemetry with heat-insulated bag monitoring, live GPS route telemetry, and instant direct rider concierge.',
    },
    {
      number: '03',
      title: 'Pay securely',
      description:
        '1-Tap seamless UPI autopay checkout with instant cashback tokens, digital GST tax receipts, and split-bill friends payment.',
    },
  ];

  // Chips for the two-row marquee under the sticky area
  const allChips = [
    { name: 'Healthy', icon: '🥗', color: '#10B981', tag: 'Nutrient-counted' },
    { name: 'Veg Mode', icon: '🌱', color: '#16A34A', tag: '100% Pure Veg' },
    { name: 'Plan a Party', icon: '🎉', color: '#8B5CF6', tag: 'Bulk platters' },
    { name: 'Gift Cards', icon: '🎁', color: '#EC4899', tag: 'Instant Feast' },
    { name: 'Gourmet', icon: '✨', color: '#D4A94A', tag: '5-Star Masters' },
    { name: 'Offers', icon: '🏷️', color: '#FF5B2E', tag: 'Daily Promos' },
    { name: 'Food on Train', icon: '🚆', color: '#0284C7', tag: 'Seat delivery' },
    { name: 'Collections', icon: '📚', color: '#6366F1', tag: 'Handpicked' },
  ];

  const chipsRow1 = allChips.slice(0, 4);
  const chipsRow2 = allChips.slice(4, 8);

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative w-full bg-[#F5EEE3] text-[#0E0B09] stacked-card -mt-12 z-20"
    >
      {/* ── 300vh STICKY CONTAINER ────────────────────────────────────────── */}
      <div className="relative h-[300vh] w-full">
        {/* Sticky Full-Viewport Stage */}
        <div className="sticky top-0 w-full h-screen flex flex-col justify-center py-6 sm:py-10 px-6 sm:px-12 lg:px-20 overflow-hidden">
          {/* Main 2-Column Grid: Stacked Items Left, Pinned Phone Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center max-w-7xl mx-auto w-full">
            {/* Left Column: 3 Big Stacked Items with Vertical Progress Line */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="relative pl-6 sm:pl-10 flex flex-col gap-5 sm:gap-10">
                {/* Thin Background Progress Track */}
                <div className="absolute left-1.5 sm:left-2 top-2 bottom-2 w-[2px] bg-[#0E0B09]/15 rounded-full" />

                {/* Animated Flame Fill Bar that follows scroll */}
                <motion.div
                  style={{
                    scaleY: smoothProgress,
                    transformOrigin: 'top',
                  }}
                  className="absolute left-1.5 sm:left-2 top-2 bottom-2 w-[2.5px] bg-[#FF5B2E] rounded-full"
                />

                {/* The 3 Stacked Items */}
                {steps.map((step, idx) => {
                  const isActive = activeScreenIndex === idx;
                  return (
                    <div
                      key={step.number}
                      onClick={() => setActiveScreenIndex(idx)}
                      data-cursor="SELECT"
                      className={`cursor-pointer transition-all duration-500 group select-none ${
                        isActive ? 'opacity-100' : 'opacity-25 hover:opacity-50'
                      }`}
                    >
                      {/* Step Number & Title */}
                      <div className="flex items-baseline gap-2.5 sm:gap-4">
                        <span
                          className={`text-xs sm:text-base font-mono font-bold tracking-wider transition-colors ${
                            isActive ? 'text-[#FF5B2E]' : 'text-[#7E7771]'
                          }`}
                        >
                          {step.number}
                        </span>
                        <h3 className="font-extrabold text-xl sm:text-3xl lg:text-4.5xl xl:text-5xl tracking-[-0.035em] text-[#0E0B09] font-[family-name:var(--font-display)] leading-tight">
                          {step.title}
                        </h3>
                      </div>

                      {/* Expandable Description */}
                      <div
                        className={`grid transition-all duration-500 ease-out overflow-hidden ${
                          isActive ? 'grid-rows-[1fr] mt-2 sm:mt-3 opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm sm:text-base lg:text-lg text-[#7E7771] max-w-lg leading-relaxed font-normal">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: The Phone (never clipped, max-h 78vh) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <PinnedPhone activeScreenIndex={activeScreenIndex} />
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-ROW AUTO-SCROLLING PILL MARQUEE UNDER STICKY AREA ──────── */}
      <div className="relative w-full py-20 sm:py-28 bg-[#F5EEE3] border-t border-[#0E0B09]/10 overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#7E7771]">
            Explore Handcrafted App Modes
          </p>
        </div>

        {/* Row 1: moves left */}
        <div className="overflow-hidden whitespace-nowrap flex w-full mb-4">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
            className="flex items-center gap-4 shrink-0 pr-4"
          >
            {[...chipsRow1, ...chipsRow1, ...chipsRow1, ...chipsRow1].map((chip, idx) => (
              <div
                key={idx}
                className="px-6 py-3.5 rounded-full bg-white border border-[#0E0B09]/10 shadow-[0_4px_16px_rgba(14,11,9,0.06)] hover:shadow-[0_8px_24px_rgba(255,91,46,0.12)] hover:border-[#FF5B2E]/40 transition-all duration-300 flex items-center gap-3 shrink-0 cursor-default"
              >
                <span className="text-xl">{chip.icon}</span>
                <span className="font-extrabold text-sm sm:text-base text-[#0E0B09] font-[family-name:var(--font-display)]">
                  {chip.name}
                </span>
                <span className="text-xs font-mono text-[#7E7771] pl-1">({chip.tag})</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: moves right */}
        <div className="overflow-hidden whitespace-nowrap flex w-full">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
            className="flex items-center gap-4 shrink-0 pr-4"
          >
            {[...chipsRow2, ...chipsRow2, ...chipsRow2, ...chipsRow2].map((chip, idx) => (
              <div
                key={idx}
                className="px-6 py-3.5 rounded-full bg-white border border-[#0E0B09]/10 shadow-[0_4px_16px_rgba(14,11,9,0.06)] hover:shadow-[0_8px_24px_rgba(255,91,46,0.12)] hover:border-[#FF5B2E]/40 transition-all duration-300 flex items-center gap-3 shrink-0 cursor-default"
              >
                <span className="text-xl">{chip.icon}</span>
                <span className="font-extrabold text-sm sm:text-base text-[#0E0B09] font-[family-name:var(--font-display)]">
                  {chip.name}
                </span>
                <span className="text-xs font-mono text-[#7E7771] pl-1">({chip.tag})</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppFeaturesSection;
