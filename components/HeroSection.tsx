'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'motion/react';
import { CONTENT } from '@/lib/content';
import StoreBadge from './StoreBadge';
import Magnetic from './primitives/Magnetic';

export const HeroSection: React.FC<{ onScrollClick?: () => void }> = ({ onScrollClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldReduceMotion) {
      video.pause();
      return;
    }

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt.catch(() => {
        // Autoplay can be blocked until a user gesture; muted + playsInline covers most cases.
      });
    }
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const insetVw = useTransform(scrollYProgress, [0, 0.85], [0, 4.5]);
  const cornerRadius = useTransform(scrollYProgress, [0, 0.85], [0, 40]);
  const clipPathStyle = useMotionTemplate`inset(${insetVw}vw round ${cornerRadius}px)`;

  const headlineY = useTransform(scrollYProgress, [0, 0.7], [0, -100]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const bottomBarOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[120vh] min-h-[780px] bg-[#0E0B09] text-white select-none sticky top-0 z-10"
    >
      <motion.div
        style={shouldReduceMotion ? {} : { clipPath: clipPathStyle }}
        className="relative w-full h-screen min-h-[720px] overflow-hidden bg-[#0E0B09] flex flex-col justify-between film-grain"
      >
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: 'scale(1.35)' }}
            src={CONTENT.hero.videoSrc}
            autoPlay={!shouldReduceMotion}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09]/90 via-[#0E0B09]/20 to-black/30 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,91,46,0.12)_0%,transparent_60%)] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(14,11,9,0.55)_0%,transparent_70%)] z-10" />
        </div>

        <div className="relative z-30 w-full pt-8 sm:pt-10 px-6 sm:px-12 lg:px-16 flex items-start justify-end">
          <Magnetic intensity={0.3}>
            <button
              onClick={onScrollClick}
              data-cursor="ORDER"
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center group cursor-pointer focus:outline-none"
              aria-label="Order Now"
            >
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full animate-[spin_18s_linear_infinite] group-hover:animate-[spin_8s_linear_infinite] transition-all"
              >
                <path
                  id="orderCirclePath"
                  d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  fill="none"
                />
                <text className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.24em] fill-white/90 uppercase">
                  <textPath href="#orderCirclePath" startOffset="0%">
                    ORDER NOW • ORDER NOW • ORDER NOW •
                  </textPath>
                </text>
              </svg>

              <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#FF5B2E] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(255,91,46,0.6)] group-hover:scale-110 group-hover:bg-[#D93A12] transition-transform duration-300">
                <svg
                  className="w-5 h-5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </button>
          </Magnetic>
        </div>

        {/* Content Stack matching reference image */}
        <div className="relative z-30 w-full px-6 sm:px-12 lg:px-16 my-auto pt-16 sm:pt-20">
          <motion.div
            style={shouldReduceMotion ? {} : { y: headlineY, opacity: headlineOpacity }}
            className="max-w-4xl"
          >
            <h1 className="font-extrabold text-white text-[clamp(2.75rem,7vw,7.25rem)] leading-[0.98] tracking-[-0.035em] font-[family-name:var(--font-display)] text-left">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block"
                >
                  Your city&apos;s
                </motion.span>
              </div>

              <div className="overflow-hidden -my-1 sm:-my-2">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                  className="block font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E] pr-3 text-[1.12em] leading-[0.95]"
                >
                  favourite
                </motion.span>
              </div>

              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
                  className="block"
                >
                  food delivery app
                </motion.span>
              </div>
            </h1>

            {/* Subtext from reference design */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 sm:mt-7 text-sm sm:text-base md:text-lg text-neutral-300/90 font-normal max-w-xl leading-relaxed text-left"
            >
              From local favourites to trending picks - get it delivered,
              <br className="hidden sm:inline" /> fresh and fast.
            </motion.p>

            {/* App Store Badges matching reference pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Magnetic intensity={0.15}>
                <StoreBadge platform="google-play" theme="light" />
              </Magnetic>
              <Magnetic intensity={0.15}>
                <StoreBadge platform="app-store" theme="dark" />
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom scroll down chevron indicator (bottom-left) */}
        <motion.div
          style={shouldReduceMotion ? {} : { opacity: bottomBarOpacity }}
          className="relative z-30 px-6 sm:px-12 lg:px-16 pb-6 sm:pb-8"
        >
          <button
            onClick={onScrollClick}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 transition-all cursor-pointer focus:outline-none"
            aria-label="Scroll down"
          >
            <motion.svg
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
