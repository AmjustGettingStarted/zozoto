'use client';

import React, { useRef, useState, useEffect } from 'react';
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

// Embossed Metallic 3D Gold Coin with depth perspective
const EliteGoldCoin: React.FC<{
  size: number;
  blur?: number;
  rotate?: number;
  className?: string;
}> = ({ size, blur = 0, rotate = 0, className = '' }) => (
  <div
    style={{
      width: size,
      height: size,
      transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined,
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

// Metallic 3D Gold Crown Component for Insignia
const InsigniaCrown: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 54 36" className={className} fill="none">
    <defs>
      <linearGradient id="insigniaCrownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFBE6" />
        <stop offset="25%" stopColor="#F6E3A1" />
        <stop offset="60%" stopColor="#D4A94A" />
        <stop offset="100%" stopColor="#8C6A1F" />
      </linearGradient>
      <linearGradient id="insigniaCrownBase" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#B58928" />
        <stop offset="50%" stopColor="#FFF2B8" />
        <stop offset="100%" stopColor="#8C6A1F" />
      </linearGradient>
    </defs>
    {/* Base rim */}
    <rect x="12" y="27" width="30" height="4" rx="2" fill="url(#insigniaCrownBase)" stroke="#4A3408" strokeWidth="0.8" />
    <rect x="13.5" y="28" width="27" height="1.5" rx="0.75" fill="#FFFBE6" opacity="0.9" />

    {/* 5 Crown Spikes */}
    <path
      d="M12 26 L13 13 L21 19 L27 6 L33 19 L41 13 L42 26 Z"
      fill="url(#insigniaCrownGrad)"
      stroke="#59400D"
      strokeWidth="0.8"
    />
    {/* Inner Chiseled Highlights */}
    <path
      d="M14 24 L15 15 L21 20 L27 9 L33 20 L39 15 L40 24 Z"
      fill="none"
      stroke="#FFFBE6"
      strokeWidth="0.9"
      opacity="0.85"
    />
    {/* Jewels on Tips */}
    <circle cx="13" cy="12.5" r="2.2" fill="#FFFCE6" stroke="#8C6A1F" strokeWidth="0.6" />
    <circle cx="27" cy="5.5" r="2.8" fill="#FFFFFF" stroke="#8C6A1F" strokeWidth="0.6" />
    <circle cx="41" cy="12.5" r="2.2" fill="#FFFCE6" stroke="#8C6A1F" strokeWidth="0.6" />
    <circle cx="21" cy="19.5" r="1.4" fill="#FFEAA0" />
    <circle cx="33" cy="19.5" r="1.4" fill="#FFEAA0" />
  </svg>
);

// Golden Laurel Wreath Component for Insignia
const LaurelWreath: React.FC<{ flipped?: boolean; className?: string }> = ({ flipped = false, className = '' }) => (
  <svg viewBox="0 0 32 36" className={`${className} ${flipped ? 'scale-x-[-1]' : ''}`} fill="none">
    <defs>
      <linearGradient id={`laurelGrad-${flipped ? 'r' : 'l'}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B8" />
        <stop offset="50%" stopColor="#E5BE5A" />
        <stop offset="100%" stopColor="#8C6A1F" />
      </linearGradient>
    </defs>
    {/* Curved Branch */}
    <path
      d="M26 31 C16 28 8 21 8 10 C8 6 10 3 11 2"
      stroke={`url(#laurelGrad-${flipped ? 'r' : 'l'})`}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path d="M12 3 C9 2 5 5 7 8 C8 9 11 8 12 3 Z" fill={`url(#laurelGrad-${flipped ? 'r' : 'l'})`} />
    <path d="M8 8 C5 8 2 12 4 14 C6 15 8 13 8 8 Z" fill={`url(#laurelGrad-${flipped ? 'r' : 'l'})`} />
    <path d="M7 15 C4 16 2 20 5 22 C7 22 8 19 7 15 Z" fill={`url(#laurelGrad-${flipped ? 'r' : 'l'})`} />
    <path d="M9 22 C6 24 5 28 9 29 C11 28 12 25 9 22 Z" fill={`url(#laurelGrad-${flipped ? 'r' : 'l'})`} />
    <path d="M15 26 C13 28 14 31 17 31 C19 30 18 27 15 26 Z" fill={`url(#laurelGrad-${flipped ? 'r' : 'l'})`} />
    <path d="M22 29 C20 30 21 33 24 33 C25 32 24 30 22 29 Z" fill={`url(#laurelGrad-${flipped ? 'r' : 'l'})`} />
  </svg>
);

// Refined Luxury Membership Insignia (Brand mark, non-clickable)
const EliteMembershipInsignia: React.FC = () => (
  <div className="relative inline-flex flex-col items-center select-none pointer-events-none">
    {/* Crown above */}
    <div className="relative -mb-1 z-10 flex justify-center">
      <InsigniaCrown className="w-8 h-5.5 sm:w-10 sm:h-7 drop-shadow-[0_4px_12px_rgba(212,169,74,0.7)]" />
    </div>

    {/* Capsule pill flanked by laurel wreaths */}
    <div className="relative flex items-center gap-2 sm:gap-3">
      {/* Left Laurel */}
      <LaurelWreath className="w-5 h-6 sm:w-6 sm:h-7 text-[#D4A94A] drop-shadow-[0_2px_8px_rgba(212,169,74,0.4)]" />

      {/* Main Glass Membership Capsule */}
      <div className="relative px-5 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-[#241A12]/95 via-[#140F0A]/95 to-[#0A0705]/98 border border-[#D4A94A]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,242,184,0.35)] flex items-center justify-center">
        <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase text-white/90">
          ZOZOTO{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6CC] via-[#E5BA5A] to-[#C2932E] font-black">
            ELITE VIP
          </span>
        </span>
      </div>

      {/* Right Laurel */}
      <LaurelWreath flipped className="w-5 h-6 sm:w-6 sm:h-7 text-[#D4A94A] drop-shadow-[0_2px_8px_rgba(212,169,74,0.4)]" />
    </div>

    {/* Horizontal Gold Illumination Line directly under capsule */}
    <div className="relative -mt-1 z-0 w-36 sm:w-48 h-[2px] bg-gradient-to-r from-transparent via-[#FFE89E] to-transparent shadow-[0_0_16px_rgba(255,232,158,0.9),0_0_30px_rgba(212,169,74,0.6)]" />
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
  // Phase 0: 0.0 - 0.20 -> Wordmark & Intro
  // Phase 1: 0.20 - 0.40 -> Benefit 01
  // Phase 2: 0.40 - 0.60 -> Benefit 02
  // Phase 3: 0.60 - 0.80 -> Benefit 03
  // Phase 4: 0.80 - 1.0  -> Savings Calculator
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const updatePhase = (latest: number) => {
      if (latest < 0.20) setActivePhase(0);
      else if (latest < 0.40) setActivePhase(1);
      else if (latest < 0.60) setActivePhase(2);
      else if (latest < 0.80) setActivePhase(3);
      else setActivePhase(4);
    };

    updatePhase(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on('change', updatePhase);
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToPhase = (targetPhase: number) => {
    setActivePhase(targetPhase);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;

    // Target positions along the 350vh track for each phase
    const phaseRatios = [0.06, 0.30, 0.50, 0.70, 0.92];
    const targetY = containerTop + (phaseRatios[targetPhase] ?? 0) * scrollableDistance;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const benefits = [
    {
      badge: 'THE DELIVERY PERK',
      title1: 'Your delivery fee?',
      title2: "We've got it.",
      subtext: 'Free delivery within 6 km. No surge charges, even when demand is high.',
    },
    {
      badge: 'THE SAVINGS PERK',
      title1: 'Your favourites.',
      title2: 'At better prices.',
      subtext:
        'Get up to 25% extra off across 15,000+ restaurants. Stack your Elite savings with existing promotional offers and restaurant coupons.',
    },
    {
      badge: 'THE PRIORITY PERK',
      title1: 'Less waiting.',
      title2: 'More enjoying.',
      subtext:
        'Get priority kitchen queueing and dedicated rider routing for a smoother delivery experience.',
    },
  ];

  const monthlySavings = ordersPerWeek * 170 * 4;

  return (
    <section
      ref={containerRef}
      id="elite"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#0E0B09] text-white stacked-card -mt-12 z-20"
    >
      {/* ── 350vh STICKY CONTAINER (Identical pattern to AppFeaturesSection) ── */}
      <div className="relative h-[350vh] w-full">
        {/* Sticky Pinned Viewport */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between py-8 sm:py-12 px-6 sm:px-12 lg:px-20 bg-[#0E0B09]">
          {/* Subtle Film Grain Texture Overlay */}
          <div className="pointer-events-none absolute inset-0 film-grain z-20" />

          {/* ── LUXURY ATMOSPHERIC LIGHTING & CELESTIAL RING ────────────── */}
          {/* Radial Warm Gold Aura */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(212,169,74,0.13)_0%,rgba(14,11,9,0.98)_75%)] pointer-events-none z-0" />
          {/* Centered Atmospheric Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[380px] sm:h-[480px] bg-[#D4A94A]/12 blur-[160px] rounded-full pointer-events-none z-0" />
          {/* Subtle Golden Orbital Sphere Outline */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] sm:w-[820px] lg:w-[940px] h-[380px] sm:h-[540px] lg:h-[620px] rounded-full border border-[#D4A94A]/15 pointer-events-none z-0 shadow-[0_0_80px_rgba(212,169,74,0.06)]" />

          {/* ── FLOATING METALLIC GOLD COINS WITH CINEMATIC DEPTH OF FIELD ─── */}
          {/* 1. Large Foreground Coin with Depth-of-Field Blur (Bottom Right) */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    y: coinCloseY,
                    x: useTransform(smoothMouseX, (v) => v * -25),
                  }
            }
            className="absolute -right-10 -bottom-12 sm:right-[-2%] sm:bottom-[-6%] z-20 pointer-events-none"
          >
            <EliteGoldCoin size={260} blur={5.5} rotate={25} className="hidden sm:block" />
            <EliteGoldCoin size={175} blur={4} rotate={25} className="sm:hidden" />
          </motion.div>

          {/* 2. Sharp Medium-Large Coin (Midground Left) */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    y: coinMidY,
                    x: useTransform(smoothMouseX, (v) => v * 25),
                  }
            }
            className="absolute left-[3%] top-[30%] sm:left-[5%] sm:top-[28%] z-20 pointer-events-none hidden md:block"
          >
            <EliteGoldCoin size={130} blur={0} rotate={-16} />
          </motion.div>

          {/* 3. Small Crisp Coin (Top Right) */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    y: coinFarY,
                    x: useTransform(smoothMouseX, (v) => v * -15),
                  }
            }
            className="absolute right-[13%] top-[16%] z-10 pointer-events-none hidden md:block"
          >
            <EliteGoldCoin size={62} blur={0} rotate={14} />
          </motion.div>

          {/* 4. Small Coin with Soft Depth Blur (Bottom Left) */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    y: coinMidY,
                    x: useTransform(smoothMouseX, (v) => v * -18),
                  }
            }
            className="absolute left-[14%] bottom-[22%] z-10 pointer-events-none hidden md:block"
          >
            <EliteGoldCoin size={52} blur={1} rotate={-12} />
          </motion.div>

          {/* 5. Golden Bokeh Light Particles */}
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    y: coinFarY,
                    x: useTransform(smoothMouseX, (v) => v * 12),
                  }
            }
            className="absolute left-[24%] top-[16%] w-3 h-3 rounded-full bg-[#FFE89E]/70 blur-[2px] pointer-events-none hidden lg:block"
          />
          <motion.div
            style={
              shouldReduceMotion
                ? {}
                : {
                    y: coinFarY,
                    x: useTransform(smoothMouseX, (v) => v * -10),
                  }
            }
            className="absolute right-[16%] bottom-[38%] w-2.5 h-2.5 rounded-full bg-[#FFE89E]/60 blur-[1.5px] pointer-events-none hidden lg:block"
          />

          {/* ── TOP: REFINED LUXURY MEMBERSHIP INSIGNIA (Fixed across all 5 states) ── */}
          <div className="relative z-30 w-full flex justify-center pt-1 sm:pt-3">
            <EliteMembershipInsignia />
          </div>

          {/* ── CENTER STAGE: SEQUENCED CONTENT WITH CONTINUOUS FOCAL POINT ── */}
          <div className="relative z-30 w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto px-4">
            <AnimatePresence mode="wait">
              {/* STAGE 01: The Introduction — Feeling: Exclusivity */}
              {activePhase === 0 && (
                <motion.div
                  key="phase-intro"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative flex flex-col items-center max-w-4xl mx-auto"
                >
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#D4A94A] tracking-[0.25em] uppercase mb-4">
                    ZOZOTO ELITE
                  </div>

                  <h2 className="font-black text-3xl sm:text-5xl lg:text-6.5xl text-white tracking-tight leading-[1.08] font-[family-name:var(--font-display)]">
                    Good food. Better perks. <br />
                    <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                      A little more Elite.
                    </span>
                  </h2>

                  <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                    Enjoy more savings, better delivery benefits and priority service with Zozoto Elite.
                  </p>

                  {/* Refined Scroll Prompt with Down Chevron */}
                  <div
                    onClick={() => scrollToPhase(1)}
                    className="mt-8 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400 hover:text-[#D4A94A] flex flex-col items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>SCROLL TO EXPLORE VIP PRIVILEGES</span>
                    <svg
                      className="w-3.5 h-3.5 text-[#D4A94A] animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* STAGE 02: Delivery Benefits — Feeling: Convenience */}
              {activePhase === 1 && (
                <motion.div
                  key="phase-benefit-1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="max-w-3xl"
                >
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#D4A94A] tracking-[0.2em] uppercase mb-3">
                    {benefits[0].badge}
                  </div>
                  <h3 className="font-black text-3xl sm:text-5xl lg:text-6.5xl text-white tracking-tight leading-[1.08] font-[family-name:var(--font-display)]">
                    {benefits[0].title1} <br />
                    <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                      {benefits[0].title2}
                    </span>
                  </h3>
                  <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                    {benefits[0].subtext}
                  </p>
                </motion.div>
              )}

              {/* STAGE 03: Restaurant Savings — Feeling: Value */}
              {activePhase === 2 && (
                <motion.div
                  key="phase-benefit-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="max-w-3xl"
                >
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#D4A94A] tracking-[0.2em] uppercase mb-3">
                    {benefits[1].badge}
                  </div>
                  <h3 className="font-black text-3xl sm:text-5xl lg:text-6.5xl text-white tracking-tight leading-[1.08] font-[family-name:var(--font-display)]">
                    {benefits[1].title1} <br />
                    <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                      {benefits[1].title2}
                    </span>
                  </h3>
                  <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                    {benefits[1].subtext}
                  </p>
                </motion.div>
              )}

              {/* STAGE 04: Priority Service — Feeling: Privilege */}
              {activePhase === 3 && (
                <motion.div
                  key="phase-benefit-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="max-w-3xl"
                >
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#D4A94A] tracking-[0.2em] uppercase mb-3">
                    {benefits[2].badge}
                  </div>
                  <h3 className="font-black text-3xl sm:text-5xl lg:text-6.5xl text-white tracking-tight leading-[1.08] font-[family-name:var(--font-display)]">
                    {benefits[2].title1} <br />
                    <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                      {benefits[2].title2}
                    </span>
                  </h3>
                  <p className="mt-6 text-base sm:text-xl text-neutral-300 leading-relaxed max-w-xl mx-auto">
                    {benefits[2].subtext}
                  </p>
                </motion.div>
              )}

              {/* STAGE 05: The Conversion — Feeling: Motivation to join (Matching Reference Design) */}
              {activePhase === 4 && (
                <motion.div
                  key="phase-calc"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="w-full max-w-2xl mx-auto flex flex-col items-center text-center"
                >
                  {/* Top Header Row with Heading Left & Monthly Savings Right */}
                  <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 sm:pb-6 text-center sm:text-left">
                    <div className="flex-1">
                      <div className="font-mono text-xs sm:text-sm font-bold text-[#D4A94A] tracking-[0.2em] uppercase mb-2">
                        YOUR ELITE MEMBERSHIP
                      </div>
                      <h3 className="font-black text-3xl sm:text-4.5xl lg:text-5xl text-white tracking-tight leading-[1.05] font-[family-name:var(--font-display)]">
                        How many orders <br />
                        <span className="text-gold-gradient font-[family-name:var(--font-accent)] italic font-normal">
                          weekly?
                        </span>
                      </h3>
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden sm:block h-16 w-[1px] bg-white/15 shrink-0" />

                    {/* Estimated Monthly Savings */}
                    <div className="sm:text-right shrink-0">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gold-gradient font-mono tracking-tight">
                        ₹{monthlySavings.toLocaleString('en-IN')}
                      </div>
                      <span className="text-xs text-neutral-400 font-medium tracking-wide">
                        est. monthly savings
                      </span>
                    </div>
                  </div>

                  {/* Interactive Luxury Gold Slider */}
                  <div className="w-full max-w-xl mx-auto my-4 sm:my-5">
                    <div className="flex justify-between text-xs text-neutral-400 font-mono mb-2.5">
                      <span>1 order / wk</span>
                      <span className="text-[#D4A94A] font-bold text-sm tracking-wide">
                        {ordersPerWeek} {ordersPerWeek === 1 ? 'order' : 'orders'} / week
                      </span>
                      <span>10 orders / wk</span>
                    </div>

                    <div className="relative w-full h-5 flex items-center">
                      {/* Active gold fill track */}
                      <div className="absolute inset-x-0 h-1.5 bg-neutral-800/90 rounded-full overflow-hidden pointer-events-none">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4A94A] to-[#FCE8B3] rounded-full transition-all duration-150"
                          style={{ width: `${((ordersPerWeek - 1) / 9) * 100}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={ordersPerWeek}
                        onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
                        className="elite-slider relative z-10 w-full h-5 cursor-pointer focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Illustrative estimate note */}
                  <p className="text-xs text-neutral-400/80 mb-6 font-mono">
                    Illustrative estimate at {ordersPerWeek} orders per week.
                  </p>

                  {/* High-conversion CTA Button */}
                  <button
                    data-cursor="JOIN"
                    className="px-8 sm:px-12 py-3.5 sm:py-4 bg-gradient-to-r from-[#F6E3A1] via-[#D4A94A] to-[#8C6A1F] text-[#0E0B09] rounded-full font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_10px_30px_rgba(212,169,74,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>GET 3 MONTHS OF ELITE FOR ₹199</span>
                    <span>→</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── BOTTOM PAGINATION INDICATOR (Matching Luxury Design) ───────── */}
          <div className="relative z-30 w-full flex items-center justify-center gap-2.5 pt-4 pb-2">
            {[0, 1, 2, 3, 4].map((step) => {
              const isActive = activePhase === step;
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => scrollToPhase(step)}
                  aria-label={`Jump to Elite phase ${step + 1}`}
                  className={`h-1.5 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-7 rounded-full bg-gradient-to-r from-[#FFF0B8] to-[#D4A94A] shadow-[0_0_12px_rgba(212,169,74,0.65)]'
                      : 'w-1.5 rounded-full bg-neutral-600/70 hover:bg-neutral-400'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteSection;
