import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { CONTENT } from '../content.ts';
import CurvedDivider from './CurvedDivider.tsx';

// Embossed Gold Coin Component with 3D Radial Gradients & Crown Emblem
const GoldCoin: React.FC<{
  size: number;
  blur?: number;
  className?: string;
}> = ({ size, blur = 0, className = '' }) => (
  <div
    style={{
      width: size,
      height: size,
      filter: blur > 0 ? `blur(${blur}px)` : 'drop-shadow(0 15px 30px rgba(212, 169, 74, 0.45)) drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
    }}
    className={`relative rounded-full select-none ${className}`}
  >
    <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id={`coinRim-${size}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF2B8" />
          <stop offset="30%" stopColor="#F6E3A1" />
          <stop offset="65%" stopColor="#D4A94A" />
          <stop offset="85%" stopColor="#8C6A1F" />
          <stop offset="100%" stopColor="#5E4510" />
        </radialGradient>
        <radialGradient id={`coinCenter-${size}`} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFF6CC" />
          <stop offset="40%" stopColor="#E5BE5A" />
          <stop offset="80%" stopColor="#B58928" />
          <stop offset="100%" stopColor="#7A560F" />
        </radialGradient>
        <linearGradient id={`goldShine-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#7A560F" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Outer Coin Edge Rim */}
      <circle cx="60" cy="60" r="56" fill={`url(#coinRim-${size})`} stroke="#6B4D0E" strokeWidth="2" />
      {/* Milled coin rim notches */}
      <circle cx="60" cy="60" r="50" stroke="#FFF2B8" strokeWidth="1.5" strokeDasharray="3 4" fill="none" opacity="0.6" />
      {/* Inner Recessed Face */}
      <circle cx="60" cy="60" r="44" fill={`url(#coinCenter-${size})`} stroke="#8C6A1F" strokeWidth="1.5" />
      {/* Metallic Specular Shine Sweep */}
      <circle cx="60" cy="60" r="44" fill={`url(#goldShine-${size})`} />

      {/* Embossed Crown Symbol in Center */}
      <path
        d="M40 72 L40 68 L44 52 L54 60 L60 45 L66 60 L76 52 L80 68 L80 72 Z"
        fill="#5E430C"
      />
      <path
        d="M42 70 L42 67 L45 54 L54 61 L60 48 L66 61 L75 54 L78 67 L78 70 Z"
        fill="#FFF2B8"
      />
      <circle cx="44" cy="50" r="2.5" fill="#FFEAA0" />
      <circle cx="60" cy="43" r="3" fill="#FFEAA0" />
      <circle cx="76" cy="50" r="2.5" fill="#FFEAA0" />
      <rect x="42" y="72" width="36" height="4" rx="2" fill="#5E430C" />
      <rect x="43" y="71" width="34" height="3" rx="1.5" fill="#FFF2B8" />
      {/* Small engraved stars */}
      <circle cx="34" cy="60" r="1.5" fill="#FFEAA0" />
      <circle cx="86" cy="60" r="1.5" fill="#FFEAA0" />
    </svg>
  </div>
);

export const EliteSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [ordersPerWeek, setOrdersPerWeek] = useState(3);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };

  // 5 Scattered Coins Parallax (drifting at different speeds, some up, some down)
  // Coin 1: Top-Left (Close, speed 0.4x up)
  const coin1Y = useSpring(useTransform(scrollYProgress, [0, 1], [-70, 140]), springConfig);
  const coin1Rot = useSpring(useTransform(scrollYProgress, [0, 1], [-15, 35]), springConfig);

  // Coin 2: Bottom-Left (Medium, speed -0.3x down)
  const coin2Y = useSpring(useTransform(scrollYProgress, [0, 1], [90, -110]), springConfig);
  const coin2Rot = useSpring(useTransform(scrollYProgress, [0, 1], [25, -25]), springConfig);

  // Coin 3: Top-Right (Far, blur 3px, speed 0.6x up)
  const coin3Y = useSpring(useTransform(scrollYProgress, [0, 1], [-120, 180]), springConfig);
  const coin3Rot = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), springConfig);

  // Coin 4: Bottom-Right (Close, sharp, speed -0.5x down)
  const coin4Y = useSpring(useTransform(scrollYProgress, [0, 1], [110, -130]), springConfig);
  const coin4Rot = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 30]), springConfig);

  // Coin 5: Center-Right (Deep background, blur 4px, slow speed 0.2x)
  const coin5Y = useSpring(useTransform(scrollYProgress, [0, 1], [-40, 80]), springConfig);

  // Calculate estimated monthly savings
  const monthlySavings = ordersPerWeek * 4 * 6.5 + Math.round(ordersPerWeek * 4 * 4.8);

  return (
    <section
      ref={containerRef}
      id="elite"
      className="relative w-full bg-[#050505] text-white elite-pattern overflow-hidden select-none"
    >
      {/* Top Edge: Big downward arc transition (white/blush to dark #050505) */}
      <CurvedDivider type="curve-down" fillColor="#050505" bgFill="#FFF1EB" height={100} className="relative z-10" />

      {/* Pulsing Gold Glow Behind the Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] h-[320px] sm:h-[420px] bg-gradient-to-r from-[#D4A94A]/25 via-[#F6E3A1]/15 to-[#8C6A1F]/25 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse" />

      {/* Scattered Parallax Gold Coins */}
      {/* Coin 1: Top-Left (Sharp, medium size) */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: coin1Y, rotate: coin1Rot }}
        className="absolute left-[5%] sm:left-[10%] top-[14%] sm:top-[18%] z-10 pointer-events-none will-change-transform"
      >
        <GoldCoin size={75} />
      </motion.div>

      {/* Coin 2: Bottom-Left (Close, large) */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: coin2Y, rotate: coin2Rot }}
        className="absolute left-[3%] sm:left-[8%] bottom-[16%] sm:bottom-[20%] z-10 pointer-events-none will-change-transform"
      >
        <GoldCoin size={95} />
      </motion.div>

      {/* Coin 3: Top-Right (Far depth, blurred) */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: coin3Y, rotate: coin3Rot }}
        className="absolute right-[6%] sm:right-[12%] top-[12%] sm:top-[16%] z-10 pointer-events-none will-change-transform"
      >
        <GoldCoin size={54} blur={2.5} />
      </motion.div>

      {/* Coin 4: Bottom-Right (Sharp, large) */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: coin4Y, rotate: coin4Rot }}
        className="absolute right-[4%] sm:right-[9%] bottom-[14%] sm:bottom-[18%] z-10 pointer-events-none will-change-transform"
      >
        <GoldCoin size={88} />
      </motion.div>

      {/* Coin 5: Mid-Right (Distant background) */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: coin5Y }}
        className="absolute right-[24%] top-[38%] z-0 pointer-events-none will-change-transform opacity-70"
      >
        <GoldCoin size={42} blur={3.5} />
      </motion.div>

      {/* Central Content Stack */}
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 py-20 sm:py-28 text-center flex flex-col items-center z-20">
        
        {/* Small "zozoto" wordmark in white */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-1.5 mb-2"
        >
          <span className="font-heading font-extrabold italic text-white tracking-tighter text-xl sm:text-2xl lowercase">
            zozoto
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B2E]" />
        </motion.div>

        {/* Huge "ELITE" in Gold Gradient with Crown over 'I' */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block my-2"
        >
          <div className="relative flex items-center justify-center font-heading font-black tracking-tight text-6xl sm:text-8xl md:text-9xl text-gold-gradient select-none">
            {/* Custom SVG composition for ELITE with Crown crowning the letter 'I' */}
            <span className="tracking-tight">EL</span>
            {/* Letter I crowned */}
            <span className="relative inline-flex flex-col items-center mx-1">
              {/* Gold Crown */}
              <motion.svg
                animate={shouldReduceMotion ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-8 h-8 sm:w-12 sm:h-12 -mb-2 sm:-mb-3 text-[#FCE8B3] drop-shadow-[0_4px_12px_rgba(212,169,74,0.6)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V17H19V19Z" />
              </motion.svg>
              <span>I</span>
            </span>
            <span className="tracking-tight">TE</span>
          </div>
        </motion.div>

        {/* Gold Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-bold text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#F6E3A1] via-[#D4A94A] to-[#F6E3A1] tracking-tight max-w-xl"
        >
          {CONTENT.elite.tagline}
        </motion.p>

        {/* Gold Divider with Star "* ELITE BENEFITS *" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="my-10 flex items-center gap-4 w-full max-w-md justify-center"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4A94A]/60 to-[#D4A94A]" />
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D4A94A] uppercase whitespace-nowrap">
            <span>✦</span>
            <span>{CONTENT.elite.badgeLabel}</span>
            <span>✦</span>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4A94A]/60 to-[#D4A94A]" />
        </motion.div>

        {/* Two Benefit Items with Gold Line Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl text-left">
          {CONTENT.elite.benefits.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-6 sm:p-7 rounded-[24px] bg-gradient-to-b from-[#141417] to-[#0A0A0C] border border-[#D4A94A]/30 hover:border-[#D4A94A]/70 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex items-start gap-4">
                {/* Gold line icon container */}
                <div className="w-12 h-12 rounded-2xl bg-[#D4A94A]/10 border border-[#D4A94A]/30 flex items-center justify-center flex-shrink-0 text-[#E5BA5A] group-hover:scale-110 group-hover:bg-[#D4A94A]/20 transition-all">
                  {i === 0 ? (
                    // Free delivery bike/speed icon
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="5.5" cy="17.5" r="3.5" />
                      <circle cx="18.5" cy="17.5" r="3.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6h-3l-2.5 6.5M12 17.5V14h3l3.5-5.5h-4" />
                    </svg>
                  ) : (
                    // 25% extra off tag icon
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                  )}
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white tracking-tight group-hover:text-[#FCE8B3] transition-colors">
                    {benefit.title}
                  </h3>
                  <div className="text-sm font-semibold text-[#D4A94A] mt-0.5">
                    {benefit.description}
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    {benefit.subtext}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Elite Membership Savings Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 w-full max-w-2xl bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-7 text-neutral-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="text-left">
              <div className="text-xs font-bold text-[#D4A94A] uppercase tracking-wider">Interactive Calculator</div>
              <div className="font-heading font-bold text-white text-base">How many times do you order food per week?</div>
            </div>
            <div className="text-right">
              <span className="font-heading font-black text-2xl sm:text-3xl text-gold-gradient">${monthlySavings}</span>
              <span className="text-xs text-neutral-400 block font-medium">estimated monthly savings</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-neutral-400">1x</span>
            <input
              type="range"
              min="1"
              max="10"
              value={ordersPerWeek}
              onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
              className="flex-1 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4A94A]"
            />
            <span className="text-xs font-bold text-neutral-400">10x</span>
            <span className="px-3 py-1 rounded-lg bg-[#D4A94A]/20 text-[#FCE8B3] font-bold text-xs border border-[#D4A94A]/40 min-w-16 text-center">
              {ordersPerWeek} orders/wk
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-2">
            <span>Includes free delivery + 25% dining discount savings</span>
            <button className="px-4 py-1.5 rounded-full bg-gold-gradient text-neutral-950 font-bold hover:brightness-110 transition-all text-xs">
              Join Elite for $9.99/mo
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Edge: Upward arc transition (black #050505 to white) */}
      <CurvedDivider type="curve-up" fillColor="#050505" bgFill="#FFFFFF" height={100} className="relative z-10" />
    </section>
  );
};

export default EliteSection;
