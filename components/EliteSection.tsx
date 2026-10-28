'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { CONTENT } from '@/lib/content';
import { SPRING, EASE } from '@/lib/motion';

// Embossed Metallic Gold Coin Component
const GoldCoin: React.FC<{
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
          : 'drop-shadow(0 15px 30px rgba(212, 169, 74, 0.4)) drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
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
      </defs>

      <circle cx="60" cy="60" r="56" fill={`url(#coinRim-${size})`} stroke="#6B4D0E" strokeWidth="2" />
      <circle cx="60" cy="60" r="50" stroke="#FFF2B8" strokeWidth="1.5" strokeDasharray="3 4" fill="none" opacity="0.6" />
      <circle cx="60" cy="60" r="44" fill={`url(#coinCenter-${size})`} stroke="#8C6A1F" strokeWidth="1.5" />

      {/* Embossed Crown */}
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
    </svg>
  </div>
);

export const EliteSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [ordersPerWeek, setOrdersPerWeek] = useState(4);

  // Weekly order savings calculation in INR (₹)
  // Avg delivery fee: ₹50, avg dining discount: ₹120 -> total savings ~ ₹170 per order
  const monthlySavings = ordersPerWeek * 170 * 4;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Memoized spring values to avoid recreating chains
  const raw1Y = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const raw2Y = useTransform(scrollYProgress, [0, 1], [80, -90]);
  const raw3Y = useTransform(scrollYProgress, [0, 1], [-80, 120]);

  const coin1Y = useSpring(raw1Y, SPRING.gentle);
  const coin2Y = useSpring(raw2Y, SPRING.gentle);
  const coin3Y = useSpring(raw3Y, SPRING.gentle);

  return (
    <section
      ref={containerRef}
      id="elite"
      className="relative w-full bg-[#08080A] text-white py-24 sm:py-32 px-6 sm:px-8 overflow-hidden z-20"
      style={{
        borderTopLeftRadius: 'clamp(32px, 5vw, 64px)',
        borderTopRightRadius: 'clamp(32px, 5vw, 64px)',
        marginTop: '-40px',
        boxShadow: '0 -25px 60px -12px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Ambient Gold Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#D4A94A]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[300px] bg-[#FF5B2E]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Parallax Floating 3D Gold Coins */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: coin1Y }}
        className="absolute left-[8%] top-[18%] z-10 pointer-events-none hidden md:block"
      >
        <GoldCoin size={90} />
      </motion.div>

      <motion.div
        style={shouldReduceMotion ? {} : { y: coin2Y }}
        className="absolute left-[12%] bottom-[15%] z-10 pointer-events-none hidden md:block"
      >
        <GoldCoin size={65} blur={1} />
      </motion.div>

      <motion.div
        style={shouldReduceMotion ? {} : { y: coin3Y }}
        className="absolute right-[8%] top-[25%] z-10 pointer-events-none hidden md:block"
      >
        <GoldCoin size={105} />
      </motion.div>

      {/* Central Content Stack */}
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center z-20">
        {/* Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE.out }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="font-extrabold italic text-white tracking-tight text-xl lowercase font-[family-name:var(--font-display)]">
            zozoto
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A94A]" />
          <span className="text-xs uppercase tracking-widest text-[#D4A94A] font-bold">VIP Tier</span>
        </motion.div>

        {/* Large "ELITE" in Gold Gradient with Crown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE.out }}
          className="relative inline-block my-1 select-none"
        >
          <div className="flex items-center justify-center font-black tracking-tight text-6xl sm:text-8xl md:text-9xl text-gold-gradient font-[family-name:var(--font-display)]">
            <span>EL</span>
            <span className="relative inline-flex flex-col items-center mx-1">
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 -mb-2 sm:-mb-3 text-[#FCE8B3] drop-shadow-[0_4px_12px_rgba(212,169,74,0.6)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V17H19V19Z" />
              </svg>
              <span>I</span>
            </span>
            <span>TE</span>
          </div>
        </motion.div>

        {/* Gold Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE.out }}
          className="font-bold text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#F6E3A1] via-[#D4A94A] to-[#F6E3A1] tracking-tight max-w-xl font-[family-name:var(--font-display)]"
        >
          {CONTENT.elite.tagline}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-8 sm:my-10 flex items-center gap-4 w-full max-w-md justify-center"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#D4A94A]/40 to-[#D4A94A]" />
          <div className="text-xs font-bold tracking-[0.25em] text-[#D4A94A] uppercase whitespace-nowrap">
            ✦ VIP PRIVILEGES ✦
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#D4A94A]/40 to-[#D4A94A]" />
        </motion.div>

        {/* Two Main Elite Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl text-left">
          {CONTENT.elite.benefits.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 + i * 0.1, ease: EASE.out }}
              className="p-6 sm:p-7 rounded-[26px] bg-gradient-to-b from-[#141418] to-[#0A0A0E] border border-[#D4A94A]/25 hover:border-[#D4A94A]/60 transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4A94A]/10 border border-[#D4A94A]/30 flex items-center justify-center shrink-0 text-[#E5BA5A] group-hover:scale-105 group-hover:bg-[#D4A94A]/20 transition-all">
                  {i === 0 ? (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="5.5" cy="17.5" r="3.5" />
                      <circle cx="18.5" cy="17.5" r="3.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6h-3l-2.5 6.5M12 17.5V14h3l3.5-5.5h-4" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-white tracking-tight group-hover:text-[#FCE8B3] transition-colors font-[family-name:var(--font-display)]">
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

        {/* Interactive Elite Savings Calculator (in ₹) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE.out }}
          className="mt-10 sm:mt-12 w-full max-w-2xl bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-7 text-neutral-300 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="text-left">
              <div className="text-xs font-bold text-[#D4A94A] uppercase tracking-wider">
                Savings Calculator
              </div>
              <div className="font-bold text-white text-base">
                How many orders do you place per week?
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="font-black text-3xl sm:text-4xl text-gold-gradient font-[family-name:var(--font-display)]">
                ₹{monthlySavings.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-neutral-400 block font-medium">
                estimated monthly savings
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 my-2">
            <span className="text-xs font-bold text-neutral-500">1x</span>
            <input
              type="range"
              min="1"
              max="10"
              value={ordersPerWeek}
              onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
              className="flex-1 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4A94A]"
            />
            <span className="text-xs font-bold text-neutral-500">10x</span>
            <span className="px-3 py-1 rounded-xl bg-[#D4A94A]/15 text-[#FCE8B3] font-bold text-xs border border-[#D4A94A]/30 min-w-20 text-center">
              {ordersPerWeek} / week
            </span>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-3">
            <span>Unlimited free delivery + up to 25% dining discount</span>
            <button className="px-5 py-2 rounded-full bg-gold-gradient text-neutral-950 font-bold hover:brightness-110 transition-all text-xs cursor-pointer shadow-md">
              Join Elite for ₹199 / 3 mos
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EliteSection;
