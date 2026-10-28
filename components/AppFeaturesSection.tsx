'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CONTENT, FeatureChip } from '@/lib/content';
import { EASE } from '@/lib/motion';
import PinnedPhone from './PinnedPhone';

export const AppFeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [vegMode, setVegMode] = useState(false);
  const [manualScreenOverride, setManualScreenOverride] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [scrollScreenIndex, setScrollScreenIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Toggle veg mode automatically in the first half
      if (latest > 0.15 && latest < 0.8) {
        setVegMode(true);
      }

      if (latest < 0.35) {
        setScrollScreenIndex(0);
      } else if (latest < 0.68) {
        setScrollScreenIndex(1);
      } else {
        setScrollScreenIndex(2);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeScreenIndex = manualScreenOverride !== null ? manualScreenOverride : scrollScreenIndex;

  // Split chips into left (4) and right (4)
  const leftChips = CONTENT.appFeatures.chips.filter((c) => c.side === 'left');
  const rightChips = CONTENT.appFeatures.chips.filter((c) => c.side === 'right');

  // Interactive Chip Icon Renderer
  const renderChipIcon = (icon: string) => {
    switch (icon) {
      case 'salad':
        return (
          <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 11a8 8 0 0016 0H4z" />
            <path d="M7 11c0-3 2-6 5-6s5 3 5 6" />
            <circle cx="10" cy="8" r="1" fill="currentColor" />
          </svg>
        );
      case 'leaf-toggle':
        return (
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7 9.5 0-3.5 1-7 3.5-9.5C15 9.5 18.5 8.5 22 8.5c-.5-4-4-6.5-10-6.5z" />
            </svg>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setVegMode(!vegMode);
              }}
              className={`w-7 h-3.5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                vegMode ? 'bg-green-600 justify-end' : 'bg-neutral-300 justify-start'
              }`}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
            </div>
          </div>
        );
      case 'train':
        return (
          <svg className="w-5 h-5 text-[#FF5B2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="3" width="16" height="15" rx="3" />
            <path d="M4 11h16M8 15h.01M16 15h.01M6 18l-2 3M18 18l2 3" />
          </svg>
        );
      case 'clock':
        return (
          <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 14" />
          </svg>
        );
      case 'bolt':
        return (
          <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h8l-1 8 11-13h-8l1-7z" />
          </svg>
        );
      case 'wallet':
        return (
          <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="5" width="20" height="14" rx="3" />
            <path d="M2 10h20M16 14h2" />
          </svg>
        );
      case 'location':
        return (
          <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative w-full h-[220vh] bg-[#FAFAF8] text-[#0B0B0C]"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between py-12 px-6 sm:px-10 overflow-hidden">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#D93A12] mb-2"
          >
            Engineering Delight
          </motion.div>
          <h2 className="font-extrabold text-3xl sm:text-5xl md:text-6xl text-[#0B0B0C] tracking-tight font-[family-name:var(--font-display)]">
            What&apos;s waiting for you on the{' '}
            <span className="font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E]">
              app?
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B6B72]">
            {CONTENT.appFeatures.subtitle}
          </p>

          {/* Interactive Step Switcher Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1 mt-4 rounded-full bg-neutral-200/60 backdrop-blur-md">
            {CONTENT.appFeatures.screens.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => setManualScreenOverride(i)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeScreenIndex === i
                    ? 'bg-[#FF5B2E] text-white shadow-xs'
                    : 'text-neutral-600 hover:text-[#0B0B0C]'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Central Stage: Pinned Phone with Orbiting Interactive Feature Chips */}
        <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-2">
          {/* Left Feature Chips (Hidden on small screens) */}
          <div className="hidden lg:flex flex-col gap-4 w-64 z-20">
            {leftChips.map((chip, idx) => {
              const isRelevant =
                (activeScreenIndex === 0 && (chip.id === 'chip-schedule' || chip.id === 'chip-veg')) ||
                (activeScreenIndex === 1 && chip.id === 'chip-train');
              return (
                <motion.div
                  key={chip.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.6 }}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                    isRelevant
                      ? 'bg-white border-[#FF5B2E]/40 shadow-[0_10px_25px_rgba(255,91,46,0.12)] scale-102 ring-1 ring-[#FF5B2E]/20'
                      : 'bg-white/80 border-neutral-200/80 shadow-xs hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                      {renderChipIcon(chip.icon)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#0B0B0C]">{chip.title}</div>
                      <div className="text-[11px] text-[#6B6B72]">{chip.tagline}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Pinned Phone Frame */}
          <div className="z-30 px-4">
            <PinnedPhone
              activeScreenIndex={activeScreenIndex}
              vegModeOn={vegMode}
              onToggleVegMode={() => setVegMode(!vegMode)}
            />
          </div>

          {/* Right Feature Chips (Hidden on small screens) */}
          <div className="hidden lg:flex flex-col gap-4 w-64 z-20">
            {rightChips.map((chip, idx) => {
              const isRelevant =
                (activeScreenIndex === 1 && chip.id === 'chip-live') ||
                (activeScreenIndex === 2 && (chip.id === 'chip-offers' || chip.id === 'chip-tip'));
              return (
                <motion.div
                  key={chip.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.6 }}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                    isRelevant
                      ? 'bg-white border-[#FF5B2E]/40 shadow-[0_10px_25px_rgba(255,91,46,0.12)] scale-102 ring-1 ring-[#FF5B2E]/20'
                      : 'bg-white/80 border-neutral-200/80 shadow-xs hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                      {renderChipIcon(chip.icon)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#0B0B0C]">{chip.title}</div>
                      <div className="text-[11px] text-[#6B6B72]">{chip.tagline}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom subtle progress hint */}
        <div className="max-w-md mx-auto text-center text-[11px] font-semibold text-neutral-400">
          Scroll to preview delivery stages • Tap tabs to inspect features
        </div>
      </div>
    </section>
  );
};

export default AppFeaturesSection;
