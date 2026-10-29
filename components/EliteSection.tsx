'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  AnimatePresence,
} from 'motion/react';
import { CONTENT } from '@/lib/content';
import { SPRING } from '@/lib/motion';

// Embossed Metallic 3D Gold Coin
const EliteGoldCoin: React.FC<{
  size: number;
  blur?: number;
  className?: string;
}> = ({ size, blur = 0, className = '' }) => (
  <div
    style={{
      width: size,
      height: size,
      filter:
        blur > 0
          ? `blur(${blur}px)`
          : 'drop-shadow(0 20px 35px rgba(212, 169, 74, 0.45)) drop-shadow(0 6px 12px rgba(0,0,0,0.8))',
    }}
    className={`relative rounded-full select-none ${className}`}
  >
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id={`eliteRim-${size}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF6CC" />
          <stop offset="25%" stopColor="#F6E3A1" />
          <stop offset="60%" stopColor="#D4A94A" />
          <stop offset="85%" stopColor="#8C6A1F" />
          <stop offset="100%" stopColor="#4A3408" />
        </radialGradient>
        <radialGradient id={`eliteCenter-${size}`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFFBE6" />
          <stop offset="35%" stopColor="#E5BE5A" />
          <stop offset="75%" stopColor="#B58928" />
          <stop offset="100%" stopColor="#66460A" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="56" fill={`url(#eliteRim-${size})`} stroke="#6B4D0E" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="50" stroke="#FFF6CC" strokeWidth="1.5" strokeDasharray="3 4" fill="none" opacity="0.75" />
      <circle cx="60" cy="60" r="44" fill={`url(#eliteCenter-${size})`} stroke="#8C6A1F" strokeWidth="1.5" />

      {/* Embossed Crown */}
      <path
        d="M40 72 L40 67 L44 52 L54 60 L60 44 L66 60 L76 52 L80 67 L80 72 Z"
        fill="#4A3408"
      />
      <path
        d="M42 70 L42 66 L45 54 L54 61 L60 47 L66 61 L75 54 L78 66 L78 70 Z"
        fill="#FFF6CC"
      />
      <circle cx="44" cy="50" r="2.5" fill="#FFEAA0" />
      <circle cx="60" cy="42" r="3.2" fill="#FFEAA0" />
      <circle cx="76" cy="50" r="2.5" fill="#FFEAA0" />
      <rect x="42" y="72" width="36" height="4" rx="2" fill="#4A3408" />
      <rect x="43" y="71" width="34" height="3" rx="1.5" fill="#FFF6CC" />
    </svg>
  </div>
);

export const EliteSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [ordersPerWeek, setOrdersPerWeek] = useState(4);

  // Mouse Parallax for coins
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set((clientX - centerX) / centerX);
    mouseY.set((clientY - centerY) / centerY);
  };

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Coin Scroll Drift
  const coinFarY = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const coinMidY = useTransform(scrollYProgress, [0, 1], [60, -90]);
  const coinCloseY = useTransform(scrollYProgress, [0, 1], [-80, 130]);

  // Dynamic Phase calculation for content switching
  // Phase 0: 0.0 - 0.22 -> Wordmark & Intro
  // Phase 1: 0.22 - 0.44 -> Benefit 01
  // Phase 2: 0.44 - 0.66 -> Benefit 02
  // Phase 3: 0.66 - 0.84 -> Benefit 03
  // Phase 4: 0.84 - 1.0  -> Savings Calculator
  const [activePhase, setActivePhase] = useState(0);

  scrollYProgress.on('change', (latest) => {
    if (latest < 0.24) setActivePhase(0);
    else if (latest < 0.48) setActivePhase(1);
    else if (latest < 0.70) setActivePhase(2);
    else if (latest < 0.86) setActivePhase(3);
    else setActivePhase(4);
  });

  const benefits = [
    {
      num: '01',
      title: 'Free delivery on all orders',
      highlight: 'within 6 km',
      subtext: 'Zero surge surcharges, even during midnight monsoon rushes & weekend peaks.',
    },
    {
      num: '02',
      title: 'Up to 25% extra savings',
      highlight: 'at 15,000+ partners',
      subtext: 'Stacks on top of existing promotional codes and restaurant chef coupons.',
    },
    {
      num: '03',
      title: 'Priority concierge & dispatch',
      highlight: 'in under 30 seconds',
      subtext: 'Express kitchen slot queuing and dedicated live speed rider routing.',
    },
  ];

  const monthlySavings = ordersPerWeek * 170 * 4;

  return (
    <section
      ref={containerRef}
      id="elite"
      onMouseMove={handleMouseMove}
      className="relative w-full h-[250vh] bg-[#0E0B09] text-white stacked-card -mt-12 z-20"
    >
      {/* Sticky Pinned Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-12 lg:px-20 film-grain bg-[#0E0B09]">
        {/* Radial Warm Gold Sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,169,74,0.18)_0%,rgba(14,11,9,0.98)_70%)] pointer-events-none z-0" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#D4A94A]/10 blur-[180px] rounded-full pointer-events-none z-0" />

        {/* ── 5-6 GOLD COINS AT 3 DEPTH LAYERS ─────────────────────────── */}
        {/* Layer 1: Foreground (Close & Large) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: coinCloseY,
                  x: useTransform(smoothMouseX, (v) => v * 35),
                }
          }
          className="absolute left-[5%] top-[18%] z-20 pointer-events-none hidden md:block"
        >
          <EliteGoldCoin size={110} />
        </motion.div>

        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: coinCloseY,
                  x: useTransform(smoothMouseX, (v) => v * -35),
                }
          }
          className="absolute right-[6%] bottom-[16%] z-20 pointer-events-none hidden md:block"
        >
          <EliteGoldCoin size={120} />
        </motion.div>

        {/* Layer 2: Midground (Medium) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: coinMidY,
                  x: useTransform(smoothMouseX, (v) => v * 20),
                }
          }
          className="absolute right-[12%] top-[20%] z-10 pointer-events-none hidden md:block"
        >
          <EliteGoldCoin size={75} />
        </motion.div>

        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: coinMidY,
                  x: useTransform(smoothMouseX, (v) => v * -20),
                }
          }
          className="absolute left-[14%] bottom-[22%] z-10 pointer-events-none hidden md:block"
        >
          <EliteGoldCoin size={70} />
        </motion.div>

        {/* Layer 3: Background (Far, Blurred) */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: coinFarY,
                  x: useTransform(smoothMouseX, (v) => v * 10),
                }
          }
          className="absolute left-[24%] top-[12%] z-0 pointer-events-none hidden lg:block"
        >
          <EliteGoldCoin size={45} blur={2.5} />
        </motion.div>

        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: coinFarY,
                  x: useTransform(smoothMouseX, (v) => v * -10),
                }
          }
          className="absolute right-[22%] bottom-[28%] z-0 pointer-events-none hidden lg:block"
        >
          <EliteGoldCoin size={48} blur={2} />
        </motion.div>

        {/* ── TOP: THE ONLY ALLOWED PILL EYEBROW ───────────────────────── */}
        <div className="relative z-30 w-full flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#201A14] border border-[#D4A94A]/30 text-[#FCE8B3] text-xs font-bold uppercase tracking-widest shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#D4A94A] animate-pulse" />
            <span>ZOZOTO ELITE VIP</span>
          </div>
        </div>

        {/* ── CENTER STAGE: SEQUENCED CONTENT WITH CONTINUOUS FOCAL POINT ── */}
        <div className="relative z-30 w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto px-4">
          <AnimatePresence mode="wait">
            {/* PHASE 0: Giant ELITE Wordmark Hero */}
            {activePhase === 0 && (
              <motion.div
                key="phase-wordmark"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <h2 className="font-black text-[clamp(4.5rem,21vw,20rem)] leading-[0.82] tracking-[-0.05em] text-gold-gradient font-[family-name:var(--font-display)] select-none drop-shadow-[0_20px_50px_rgba(212,169,74,0.3)]">
                  ELITE
                </h2>
                <p className="mt-6 text-lg sm:text-2xl text-neutral-300 font-medium max-w-xl">
                  The ultimate savings club for midnight food lovers.
                </p>
                <div className="mt-8 text-xs sm:text-sm font-mono tracking-widest uppercase text-[#D4A94A]/80 flex items-center gap-2">
                  <span>Scroll to uncover VIP privileges</span>
                  <span>↓</span>
                </div>
              </motion.div>
            )}

            {/* PHASE 1: Benefit 01 */}
            {activePhase === 1 && (
              <motion.div
                key="phase-benefit-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                <div className="font-mono text-sm sm:text-base font-bold text-[#D4A94A] tracking-wider uppercase mb-3">
                  Privilege 01 / 03
                </div>
                <h3 className="font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] font-[family-name:var(--font-display)]">
                  01 Free delivery <br />
                  <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                    within 6 km
                  </span>
                </h3>
                <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                  {benefits[0].subtext}
                </p>
              </motion.div>
            )}

            {/* PHASE 2: Benefit 02 */}
            {activePhase === 2 && (
              <motion.div
                key="phase-benefit-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                <div className="font-mono text-sm sm:text-base font-bold text-[#D4A94A] tracking-wider uppercase mb-3">
                  Privilege 02 / 03
                </div>
                <h3 className="font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] font-[family-name:var(--font-display)]">
                  02 Up to 25% extra off <br />
                  <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                    at 15,000+ restaurants
                  </span>
                </h3>
                <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                  {benefits[1].subtext}
                </p>
              </motion.div>
            )}

            {/* PHASE 3: Benefit 03 */}
            {activePhase === 3 && (
              <motion.div
                key="phase-benefit-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="max-w-3xl"
              >
                <div className="font-mono text-sm sm:text-base font-bold text-[#D4A94A] tracking-wider uppercase mb-3">
                  Privilege 03 / 03
                </div>
                <h3 className="font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] font-[family-name:var(--font-display)]">
                  03 Priority concierge <br />
                  <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                    under 30 seconds
                  </span>
                </h3>
                <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                  {benefits[2].subtext}
                </p>
              </motion.div>
            )}

            {/* PHASE 4: Compact Glass Savings Calculator */}
            {activePhase === 4 && (
              <motion.div
                key="phase-calc"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-lg bg-[#191410]/85 backdrop-blur-2xl border border-[#D4A94A]/30 rounded-[32px] p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.6)] text-left"
              >
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D4A94A]">
                      VIP SAVINGS SIMULATOR
                    </span>
                    <h4 className="font-extrabold text-lg sm:text-xl text-white font-[family-name:var(--font-display)]">
                      How many orders weekly?
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black text-gold-gradient font-mono">
                      ₹{monthlySavings.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-neutral-400">est. monthly savings</span>
                  </div>
                </div>

                <div className="py-6">
                  <div className="flex justify-between text-xs text-neutral-400 font-mono mb-2">
                    <span>1 order/wk</span>
                    <span className="text-[#D4A94A] font-bold">{ordersPerWeek} orders / week</span>
                    <span>10 orders/wk</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={ordersPerWeek}
                    onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4A94A]"
                  />
                </div>

                <button
                  data-cursor="JOIN"
                  className="w-full py-3.5 bg-gradient-to-r from-[#F6E3A1] via-[#D4A94A] to-[#8C6A1F] text-[#0E0B09] rounded-2xl font-black text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(212,169,74,0.3)] hover:opacity-95 transition-opacity cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <span>Join Elite for ₹199 / 3 mos</span>
                  <span>→</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── BOTTOM PAGINATION INDICATOR ───────────────────────────────── */}
        <div className="relative z-30 w-full flex items-center justify-center gap-2 pt-4">
          {[0, 1, 2, 3, 4].map((step) => (
            <div
              key={step}
              onClick={() => setActivePhase(step)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activePhase === step ? 'w-8 bg-[#D4A94A]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteSection;
