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

        <div className="relative z-30 w-full px-6 sm:px-12 lg:px-16 pb-8 sm:pb-12 mt-auto">
          <motion.div
            style={shouldReduceMotion ? {} : { y: headlineY, opacity: headlineOpacity }}
            className="max-w-6xl"
          >
            <h1 className="font-extrabold text-white text-[clamp(2.75rem,8.5vw,9.5rem)] leading-[0.88] tracking-[-0.04em] font-[family-name:var(--font-display)]">
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

              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
                  className="block font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E] pr-3"
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
          </motion.div>

          <motion.div
            style={shouldReduceMotion ? {} : { opacity: bottomBarOpacity }}
            className="mt-8 sm:mt-10 pt-6 border-t border-white/15 flex items-center"
          >
            <div className="flex items-center gap-3.5">
              <Magnetic intensity={0.15}>
                <StoreBadge platform="google-play" />
              </Magnetic>
              <Magnetic intensity={0.15}>
                <StoreBadge platform="app-store" />
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
