import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { CONTENT } from '../content.ts';
import StoreBadge from './StoreBadge.tsx';

export const HeroSection: React.FC<{ onScrollClick?: () => void }> = ({ onScrollClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Active clip index that cycles every 3.2 seconds
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const clips = CONTENT.hero.clips;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveClipIndex((prev) => (prev + 1) % clips.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPlaying, clips.length]);

  // Scroll parallax bindings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Video layer moves at 0.5x speed (translateY) and scales 1.0 -> 1.1
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.12]);

  // Text stack moves up faster and fades out
  const textY = useTransform(scrollYProgress, [0, 0.75], ['0px', '-140px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[680px] overflow-hidden bg-[#0B0B0C] flex items-center justify-center select-none"
    >
      {/* Background Video / Ken-Burns Crossfading Layer */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: videoY, scale: videoScale }
        }
        className="absolute inset-0 w-full h-full will-change-transform"
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
              {/* Ken-Burns slow zoom effect on food photos */}
              <div
                className={`w-full h-full bg-cover bg-center transform duration-[6000ms] ease-out ${
                  isActive && !shouldReduceMotion ? 'scale-110' : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url(${clip.posterUrl})`,
                }}
              />
            </div>
          );
        })}

        {/* Dark gradient overlay (rgba(0,0,0,0.35) to 0.55) for optimal text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75 z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-20" />
      </motion.div>

      {/* Floating Ambient Brand Flame Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FF5B2E]/20 blur-[140px] rounded-full pointer-events-none z-20" />

      {/* Centered Hero Content Stack */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : { y: textY, opacity: textOpacity }
        }
        className="relative z-30 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center mt-4 sm:mt-0"
      >
        {/* Custom Wordmark "zozoto" (italic, bold, lowercase, custom SVG text/flame, white) */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 mb-4 group cursor-pointer"
        >
          {/* Flame Icon */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <path
                d="M20 2C20 2 32 14 32 24C32 30.6 26.6 36 20 36C13.4 36 8 30.6 8 24C8 18 14 11 20 2Z"
                fill="#FF5B2E"
              />
              <path
                d="M20 16C20 16 26 22 26 26.5C26 29.5 23.3 32 20 32C16.7 32 14 29.5 14 26.5C14 23 17.5 20 20 16Z"
                fill="#FFE6DC"
              />
            </svg>
          </div>
          {/* Custom SVG stylized wordmark for crisp italic geometry */}
          <svg
            className="h-9 sm:h-12 w-auto fill-white drop-shadow-md"
            viewBox="0 0 160 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="0"
              y="32"
              fill="white"
              fontFamily="Outfit, sans-serif"
              fontWeight="800"
              fontStyle="italic"
              letterSpacing="-0.04em"
              fontSize="38"
            >
              zozoto
            </text>
            {/* Small flame dot over the first 'o' */}
            <circle cx="58" cy="10" r="3" fill="#FF5B2E" />
          </svg>
        </motion.div>

        {/* H1 "Your city's favourite food delivery app" (2 lines, ~56-64px desktop, white) */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.08] tracking-tight max-w-3xl drop-shadow-lg text-balance"
        >
          Your city&apos;s favourite <br className="hidden sm:inline" />
          <span className="text-white">food delivery app</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-200/90 max-w-2xl font-normal leading-relaxed drop-shadow"
        >
          {CONTENT.hero.subtext}
        </motion.p>

        {/* Store Badges Side by Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <StoreBadge platform="google-play" />
          <StoreBadge platform="app-store" />
        </motion.div>

        {/* Clip Progress Indicator Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
        >
          {clips.map((clip, idx) => (
            <button
              key={clip.id}
              onClick={() => {
                setActiveClipIndex(idx);
                setIsPlaying(false);
              }}
              className={`h-1.5 rounded-full transition-all duration-400 focus:outline-none ${
                idx === activeClipIndex
                  ? 'w-6 bg-[#FF5B2E]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              title={clip.title}
              aria-label={`Go to clip ${clip.title}`}
            />
          ))}
          <span className="text-[11px] font-medium text-neutral-300 ml-1.5 hidden sm:inline">
            {clips[activeClipIndex].title}
          </span>
        </motion.div>

        {/* Scroll down label with bouncing chevron */}
        <motion.button
          onClick={onScrollClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mt-10 sm:mt-12 flex flex-col items-center gap-2 group cursor-pointer focus:outline-none text-neutral-300 hover:text-white transition-colors"
          aria-label="Scroll down to explore"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400 group-hover:text-white transition-colors">
            {CONTENT.hero.scrollPrompt}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF5B2E] transition-colors"
          >
            <svg
              className="w-4 h-4 text-white group-hover:text-[#FF5B2E] transition-colors"
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
