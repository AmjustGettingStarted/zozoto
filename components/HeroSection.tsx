'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CONTENT } from '@/lib/content';
import { EASE } from '@/lib/motion';
import StoreBadge from './StoreBadge';
import Magnetic from './primitives/Magnetic';

export const HeroSection: React.FC<{ onScrollClick?: () => void }> = ({ onScrollClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Active clip cycling
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const clips = CONTENT.hero.clips;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveClipIndex((prev) => (prev + 1) % clips.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, clips.length]);

  // Scroll parallax bindings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.75], ['0px', '-100px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[720px] overflow-hidden bg-[#0B0B0C] flex items-center justify-center select-none"
    >
      {/* Background Cinematic Ken-Burns Crossfading Layer */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: videoY, scale: videoScale }}
        className="absolute inset-0 w-full h-full"
      >
        {clips.map((clip, index) => {
          const isActive = index === activeClipIndex;
          return (
            <div
              key={clip.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div
                className={`w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                  isActive && !shouldReduceMotion ? 'scale-108' : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url(${clip.posterUrl})`,
                }}
              />
            </div>
          );
        })}

        {/* Sophisticated Dual Gradient Mask for Text Legibility & Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0B0B0C] z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,11,12,0.8)_100%)] z-20" />
      </motion.div>

      {/* Floating Ambient Brand Flame Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF5B2E]/18 blur-[160px] rounded-full pointer-events-none z-20" />

      {/* Hero Content Stack */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: textY, opacity: textOpacity }}
        className="relative z-30 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center pt-16 sm:pt-12"
      >
        {/* Curated Category Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.out }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5B2E] animate-pulse" />
          <span>Curated Dining & Delivery</span>
        </motion.div>

        {/* H1 Headline with Editorial Serif Accent ("favourite" in Instrument Serif) */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE.out }}
          className="font-extrabold text-white text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight max-w-3xl drop-shadow-xl text-balance font-[family-name:var(--font-display)]"
        >
          Your city&apos;s{' '}
          <span className="font-[family-name:var(--font-accent)] italic font-normal text-white/95 tracking-normal px-1">
            favourite
          </span>
          <br className="hidden sm:inline" />
          food delivery app
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE.out }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-normal leading-relaxed drop-shadow"
        >
          {CONTENT.hero.subtext}
        </motion.p>

        {/* Store Badges with Magnetic Physics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE.out }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <Magnetic intensity={0.15}>
            <StoreBadge platform="google-play" />
          </Magnetic>
          <Magnetic intensity={0.15}>
            <StoreBadge platform="app-store" />
          </Magnetic>
        </motion.div>

        {/* Clip Progress Dots Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-8 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
        >
          {clips.map((clip, idx) => (
            <button
              key={clip.id}
              onClick={() => {
                setActiveClipIndex(idx);
                setIsPlaying(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                idx === activeClipIndex ? 'w-6 bg-[#FF5B2E]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              title={clip.title}
              aria-label={`Go to clip ${clip.title}`}
            />
          ))}
          <span className="text-[11px] font-medium text-neutral-300 ml-1.5 hidden sm:inline">
            {clips[activeClipIndex].title}
          </span>
        </motion.div>

        {/* Scroll prompt chevron */}
        <motion.button
          onClick={onScrollClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none text-neutral-400 hover:text-white transition-colors"
          aria-label="Scroll down to explore"
        >
          <span className="text-[11px] uppercase tracking-widest font-semibold text-neutral-400 group-hover:text-white transition-colors">
            {CONTENT.hero.scrollPrompt}
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF5B2E] transition-colors"
          >
            <svg
              className="w-3.5 h-3.5 text-white group-hover:text-[#FF5B2E] transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
