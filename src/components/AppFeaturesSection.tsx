import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CONTENT, FeatureChip } from '../content.ts';
import PinnedPhone from './PinnedPhone.tsx';

export const AppFeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [vegMode, setVegMode] = useState(false);
  const [manualScreenOverride, setManualScreenOverride] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active screen from scroll progress (0..1 across 300vh)
  const [scrollScreenIndex, setScrollScreenIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Veg mode auto-animates ON as you scroll past 0.2
      if (latest > 0.18 && latest < 0.85) {
        setVegMode(true);
      }

      if (latest < 0.36) {
        setScrollScreenIndex(0);
      } else if (latest < 0.7) {
        setScrollScreenIndex(1);
      } else {
        setScrollScreenIndex(2);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeScreenIndex = manualScreenOverride !== null ? manualScreenOverride : scrollScreenIndex;

  // Phone enters from bottom into center, stays, then slides down as next section covers it
  const phoneY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    ['120px', '0px', '0px', '-80px']
  );

  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    [0.92, 1, 1, 0.96]
  );

  // Left & right chips parallax and opacity
  const chipsOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.8, 0.95], [0, 1, 1, 0.4]);
  const leftChipsX = useTransform(scrollYProgress, [0, 0.2], ['-40px', '0px']);
  const rightChipsX = useTransform(scrollYProgress, [0, 0.2], ['40px', '0px']);

  // Split chips into left (4) and right (4)
  const leftChips = CONTENT.appFeatures.chips.filter((c) => c.side === 'left');
  const rightChips = CONTENT.appFeatures.chips.filter((c) => c.side === 'right');

  // Render Illustrated SVG Icons for Chips
  const renderChipIcon = (icon: string) => {
    switch (icon) {
      case 'salad':
        return (
          <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 11a8 8 0 0016 0H4z" />
            <path d="M7 11c0-3 2-6 5-6s5 3 5 6" />
            <circle cx="10" cy="8" r="1" fill="currentColor" />
            <circle cx="14" cy="7" r="1" fill="currentColor" />
          </svg>
        );
      case 'leaf-toggle':
        return (
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7 9.5 0-3.5 1-7 3.5-9.5C15 9.5 18.5 8.5 22 8.5c-.5-4-4-6.5-10-6.5z" />
            </svg>
            {/* Animated toggle pill */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setVegMode(!vegMode);
              }}
              className={`w-8 h-4 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                vegMode ? 'bg-green-600 justify-end' : 'bg-neutral-300 justify-start'
              }`}
            >
              <motion.div
                layout
                className="w-3 h-3 rounded-full bg-white shadow-xs"
              />
            </div>
          </div>
        );
      case 'party':
        return (
          <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19h16M5 19v-6a2 2 0 012-2h10a2 2 0 012 2v6" />
            <path d="M12 4v4m-4-2l2 2m6-2l-2 2" />
          </svg>
        );
      case 'gift':
        return (
          <svg className="w-5 h-5 text-[#FF5B2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="8" width="18" height="13" rx="2" />
            <path d="M12 8v13M3 12h18" />
            <path d="M12 8c-2-2-4-3-5-2s-1 4 5 2c6 2 6-3 5-2s-3 0-5 2z" />
          </svg>
        );
      case 'cloche':
        return (
          <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 18h16M12 4a8 8 0 00-8 8h16a8 8 0 00-8-8zM12 4V2" />
          </svg>
        );
      case 'percent':
        return (
          <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="9" r="2.5" />
            <circle cx="15" cy="15" r="2.5" />
            <path d="M16 8L8 16" />
          </svg>
        );
      case 'train':
        return (
          <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="3" width="16" height="15" rx="3" />
            <line x1="4" y1="11" x2="20" y2="11" />
            <line x1="8" y1="18" x2="6" y2="21" />
            <line x1="16" y1="18" x2="18" y2="21" />
            <circle cx="8" cy="15" r="1" fill="currentColor" />
            <circle cx="16" cy="15" r="1" fill="currentColor" />
          </svg>
        );
      case 'cards':
        return (
          <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="14" height="14" rx="2" />
            <path d="M7 21h12a2 2 0 002-2V7" />
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
      className="relative w-full h-[300vh] bg-gradient-to-b from-white via-[#FFF8F5] to-[#FFF1EB]"
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-8 sm:py-10 px-4 sm:px-8 overflow-hidden z-20">
        
        {/* Title Header */}
        <div className="relative text-center max-w-2xl mx-auto z-30 pt-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold text-[#FF5B2E] text-3xl sm:text-4xl md:text-5xl tracking-tight text-balance"
          >
            {CONTENT.appFeatures.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-sm sm:text-base text-[#6B6B72] max-w-lg mx-auto"
          >
            {CONTENT.appFeatures.subtitle}
          </motion.p>

          {/* Screen step indicators pills (clickable) */}
          <div className="flex items-center justify-center gap-2 mt-3.5">
            {CONTENT.appFeatures.screens.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => setManualScreenOverride(i)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 ${
                  activeScreenIndex === i
                    ? 'bg-[#FF5B2E] text-white shadow-sm scale-105'
                    : 'bg-white/80 text-neutral-600 hover:bg-white border border-neutral-200'
                }`}
              >
                <span>{sc.stepNumber}.</span>
                <span className="hidden sm:inline">{sc.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Arena: Flanked Chips + Phone */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto z-20">
          
          {/* Left Column of 4 Chips (Desktop) */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : { opacity: chipsOpacity, x: leftChipsX }
            }
            className="hidden lg:flex flex-col gap-5 w-64 z-20"
          >
            {leftChips.map((chip, idx) => {
              // Gentle independent floating bob
              const bobDelay = idx * 0.4;
              return (
                <motion.div
                  key={chip.id}
                  animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + idx * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: bobDelay,
                  }}
                  whileHover={{ scale: 1.05, x: 6 }}
                  className="bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-3.5 shadow-soft-card flex items-center gap-3 cursor-pointer group hover:border-[#FF5B2E]/40 transition-all"
                  onClick={() => {
                    if (chip.isToggle) setVegMode(!vegMode);
                    else setManualScreenOverride(0);
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 group-hover:bg-[#FFF1EB] transition-colors flex items-center justify-center flex-shrink-0 shadow-xs">
                    {renderChipIcon(chip.icon)}
                  </div>
                  <div className="text-left">
                    <div className="font-heading font-bold text-sm text-[#0B0B0C] group-hover:text-[#FF5B2E] transition-colors flex items-center gap-2">
                      <span>{chip.title}</span>
                      {chip.isToggle && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${vegMode ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                          {vegMode ? 'ON' : 'OFF'}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#6B6B72] leading-tight">
                      {chip.tagline}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pinned Phone in Center */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : { y: phoneY, scale: phoneScale }
            }
            className="relative z-30 px-2 sm:px-6 my-auto will-change-transform"
          >
            <PinnedPhone
              activeScreenIndex={activeScreenIndex}
              vegModeOn={vegMode}
              onToggleVegMode={() => setVegMode(!vegMode)}
            />
          </motion.div>

          {/* Right Column of 4 Chips (Desktop) */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : { opacity: chipsOpacity, x: rightChipsX }
            }
            className="hidden lg:flex flex-col gap-5 w-64 z-20"
          >
            {rightChips.map((chip, idx) => {
              const bobDelay = (idx + 2) * 0.4;
              return (
                <motion.div
                  key={chip.id}
                  animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
                  transition={{
                    duration: 3.2 + idx * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: bobDelay,
                  }}
                  whileHover={{ scale: 1.05, x: -6 }}
                  className="bg-white/95 backdrop-blur-md border border-neutral-200/80 rounded-2xl p-3.5 shadow-soft-card flex items-center gap-3 cursor-pointer group hover:border-[#FF5B2E]/40 transition-all text-left"
                  onClick={() => {
                    if (chip.id === 'gourmet') setManualScreenOverride(1);
                    else if (chip.id === 'offers') setManualScreenOverride(2);
                    else setManualScreenOverride(1);
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-50 group-hover:bg-[#FFF1EB] transition-colors flex items-center justify-center flex-shrink-0 shadow-xs">
                    {renderChipIcon(chip.icon)}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-[#0B0B0C] group-hover:text-[#FF5B2E] transition-colors">
                      {chip.title}
                    </div>
                    <div className="text-[11px] text-[#6B6B72] leading-tight">
                      {chip.tagline}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile Chips Carousel / Grid (Visible on screens < lg) */}
        <div className="lg:hidden w-full flex overflow-x-auto gap-2 py-2 px-2 no-scrollbar z-30">
          {CONTENT.appFeatures.chips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => {
                if (chip.isToggle) setVegMode(!vegMode);
              }}
              className="flex-shrink-0 bg-white/90 border border-neutral-200 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-neutral-800 shadow-xs"
            >
              <span>{chip.title}</span>
              {chip.isToggle && (
                <span className={`w-2 h-2 rounded-full ${vegMode ? 'bg-green-500' : 'bg-neutral-300'}`} />
              )}
            </button>
          ))}
        </div>

        {/* Scroll Progress Bar at the bottom of the sticky viewport */}
        <div className="w-full max-w-xs mx-auto flex items-center gap-2 text-xs text-[#6B6B72] pb-1 z-30">
          <span className="text-[10px] font-bold uppercase tracking-wider">Scroll Experience</span>
          <div className="flex-1 h-1 bg-black/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-[#FF5B2E]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeaturesSection;
