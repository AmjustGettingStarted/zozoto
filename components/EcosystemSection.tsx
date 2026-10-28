'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { CONTENT, EcosystemCard } from '../content';

// 3D Tilt Card Component
const TiltCard: React.FC<{
  card: EcosystemCard;
  index: number;
  yOffset: any;
}> = ({ card, index, yOffset }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 6 degrees tilt
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Render original illustrated app icon
  const renderAppIcon = (name: string) => {
    switch (name) {
      case 'zozoto':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#FF5B2E] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
              <path
                d="M20 4C20 4 31 15 31 24C31 30.1 26.1 35 20 35C13.9 35 9 30.1 9 24C9 18.5 14.5 12 20 4Z"
                fill="white"
              />
              <path
                d="M20 17C20 17 25 22.5 25 26.5C25 29.3 22.8 31.5 20 31.5C17.2 31.5 15 29.3 15 26.5C15 23.5 18 20.5 20 17Z"
                fill="#FF5B2E"
              />
            </svg>
          </div>
        );
      case 'zipmart':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case 'evenzo':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="M7 8v8M17 8v8M2 12h20" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
        );
      case 'freshchain':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#E11D48] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              <path d="M16 6c0 3-2 5-5 5" stroke="#FFE4E6" strokeWidth="2" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      style={shouldReduceMotion ? {} : { y: yOffset }}
      className="perspective-1000 will-change-transform"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          y: isHovered ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        style={{
          backgroundColor: card.theme.bg,
          borderColor: card.theme.cardBorder,
          transformStyle: 'preserve-3d',
        }}
        className="h-full rounded-[24px] p-7 border flex flex-col justify-between transition-shadow duration-300 shadow-soft-card hover:shadow-[0_25px_45px_-12px_rgba(0,0,0,0.12)] cursor-pointer group"
      >
        <div>
          {/* Top category badge & app icon */}
          <div className="flex items-center justify-between mb-6">
            {renderAppIcon(card.name)}
            <span
              style={{
                backgroundColor: card.theme.badgeBg,
                color: card.theme.badgeText,
              }}
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
            >
              {card.category}
            </span>
          </div>

          {/* App Name */}
          <h3 className="font-heading font-black text-2xl text-[#0B0B0C] tracking-tight group-hover:text-[#FF5B2E] transition-colors">
            {card.name}
          </h3>
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            {card.tagline}
          </div>

          {/* One line description */}
          <p className="text-sm text-[#6B6B72] leading-relaxed font-normal">
            {card.description}
          </p>
        </div>

        {/* "Check it out >" link with a small flame arrow */}
        <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between">
          <span className="font-heading font-bold text-sm text-[#0B0B0C] group-hover:text-[#FF5B2E] transition-colors flex items-center gap-1.5">
            <span>Check it out</span>
            {/* Small flame arrow */}
            <svg
              className="w-4 h-4 text-[#FF5B2E] group-hover:translate-x-1.5 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-xs text-neutral-400 group-hover:text-[#FF5B2E] transition-colors font-medium">
            Explore ↗
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const EcosystemSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 60, damping: 20, mass: 0.6 };

  // Staggered y-parallax: each column offset by a different amount that settles to aligned
  const yOffset0 = useSpring(useTransform(scrollYProgress, [0, 0.6], [80, 0]), springConfig);
  const yOffset1 = useSpring(useTransform(scrollYProgress, [0, 0.6], [130, 0]), springConfig);
  const yOffset2 = useSpring(useTransform(scrollYProgress, [0, 0.6], [60, 0]), springConfig);
  const yOffset3 = useSpring(useTransform(scrollYProgress, [0, 0.6], [110, 0]), springConfig);

  const yOffsets = [yOffset0, yOffset1, yOffset2, yOffset3];

  return (
    <section
      ref={containerRef}
      id="ecosystem"
      className="relative w-full bg-white text-[#0B0B0C] py-24 sm:py-32 px-6 sm:px-8 overflow-hidden z-20"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Centered Large Wordmark "orbitly" in black */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl text-[#0B0B0C] tracking-tight lowercase">
              {CONTENT.ecosystem.wordmark}
            </h2>

            {/* Small uppercase label below flanked by thin lines */}
            <div className="mt-3 flex items-center gap-4 w-full max-w-sm justify-center">
              <div className="flex-1 h-[1px] bg-neutral-300" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#6B6B72] uppercase whitespace-nowrap">
                {CONTENT.ecosystem.kicker}
              </span>
              <div className="flex-1 h-[1px] bg-neutral-300" />
            </div>
          </motion.div>
        </div>

        {/* Row of 4 Equal Pastel Cards (stacked into 2x2 or carousel on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {CONTENT.ecosystem.cards.map((card, idx) => (
            <TiltCard
              key={card.id}
              card={card}
              index={idx}
              yOffset={yOffsets[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
