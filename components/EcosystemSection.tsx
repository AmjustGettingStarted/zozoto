'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { EASE } from '@/lib/motion';

interface EcosystemPanel {
  id: string;
  name: string;
  category: string;
  description: string;
  cta: string;
  accentColor: string;
  cardBg: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
}

const PANELS: EcosystemPanel[] = [
  {
    id: 'zozoto',
    name: 'Zozoto',
    category: 'FOOD DELIVERY',
    description: 'Your favourite meals, delivered fast and fresh.',
    cta: 'Explore Zozoto ↗',
    accentColor: '#FF5B2E',
    cardBg: '#FFF8F4', // Continuous soft warm peach
    imageSrc: '/images/ecosystem/zozoto-pasta.png',
    imageAlt: 'Steaming gourmet pasta meal in a dark bowl with vibrant orange atmosphere',
    link: '#hero',
  },
  {
    id: 'zipmart',
    name: 'Zipmart',
    category: 'INSTANT GROCERY',
    description: 'Groceries and daily essentials at your doorstep, in minutes.',
    cta: 'Explore Zipmart ↗',
    accentColor: '#D97706',
    cardBg: '#FFFDF5', // Continuous soft warm ivory yellow
    imageSrc: '/images/ecosystem/zipmart-groceries.png',
    imageAlt: 'Fresh produce, bell peppers, greens, and milk in a grocery bag with golden atmosphere',
    link: '#zipmart',
  },
  {
    id: 'evenzo',
    name: 'Evenzo',
    category: 'EVENTS & CINEMA',
    description: 'Discover events, movies, dining and experiences around you.',
    cta: 'Explore Evenzo ↗',
    accentColor: '#9333EA',
    cardBg: '#FAF7FD', // Continuous soft lavender
    imageSrc: '/images/ecosystem/evenzo-popcorn.png',
    imageAlt: 'Fresh cinema popcorn tub with floating popcorn kernels in violet atmosphere',
    link: '#evenzo',
  },
  {
    id: 'freshchain',
    name: 'Freshchain',
    category: 'FARM TO KITCHEN',
    description: 'End-to-end fresh supply solutions for your restaurant.',
    cta: 'Explore Freshchain ↗',
    accentColor: '#16A34A',
    cardBg: '#F4FAF6', // Continuous soft mint green
    imageSrc: '/images/ecosystem/freshchain-produce.png',
    imageAlt: 'Crisp green farm produce with water splash droplets in emerald atmosphere',
    link: '#freshchain',
  },
];

interface EcosystemCardProps {
  panel: EcosystemPanel;
  direction: 'left' | 'right';
  delay: number;
  isMobile: boolean;
  shouldReduceMotion: boolean;
}

const EcosystemCard: React.FC<EcosystemCardProps> = ({
  panel,
  direction,
  delay,
  isMobile,
  shouldReduceMotion,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle scroll-linked parallax strictly on the inner image container
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  const initialX = shouldReduceMotion || isMobile ? 0 : direction === 'left' ? -45 : 45;
  const initialY = shouldReduceMotion ? 0 : 35;

  return (
    <motion.div
      ref={cardRef}
      initial={
        shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: initialX, y: initialY }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        delay,
        duration: 0.75,
        ease: EASE.out,
      }}
      style={{ backgroundColor: panel.cardBg }}
      className="rounded-[36px] sm:rounded-[40px] border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)] transition-shadow duration-500 overflow-hidden relative group flex flex-col md:flex-row h-auto md:h-[250px] lg:h-[260px] md:aspect-[2.95/1]"
    >
      {/* Left Side: Content & Typography */}
      <div className="w-full md:w-[48%] p-7 sm:p-8 lg:p-9 xl:p-10 flex flex-col justify-between z-10 relative h-full">
        <div>
          <h3 className="font-extrabold text-2xl sm:text-3xl lg:text-3.5xl text-[#0E0B09] tracking-tight font-[family-name:var(--font-display)] leading-tight">
            {panel.name}
          </h3>
          <div
            style={{ color: panel.accentColor }}
            className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase mt-1 mb-2.5"
          >
            {panel.category}
          </div>
          <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#4E4B46] leading-relaxed max-w-[270px]">
            {panel.description}
          </p>
        </div>

        <div className="pt-4">
          <a
            href={panel.link}
            style={{ color: panel.accentColor }}
            className="inline-flex items-center gap-1 font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 group-hover:translate-x-1 cursor-pointer"
          >
            <span>{panel.cta}</span>
          </a>
        </div>
      </div>

      {/* Right Side: Carefully Art-Directed Product Image with Organic Curve & Parallax */}
      <div className="w-full md:w-[52%] h-[200px] md:h-full relative overflow-hidden flex items-center justify-end pointer-events-none self-end">
        {/* Parallax inner container */}
        <motion.div
          style={shouldReduceMotion || isMobile ? {} : { y: imageParallaxY }}
          className="relative w-full h-[115%] -top-[7.5%] flex items-center justify-end"
        >
          {/* Subtle scale reveal on initial viewport entry */}
          <motion.div
            initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE.out, delay: delay + 0.08 }}
            className="relative w-full h-full"
          >
            <Image
              src={panel.imageSrc}
              alt={panel.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-right group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              priority={panel.id === 'zozoto' || panel.id === 'zipmart'}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const EcosystemSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="ecosystem"
      className="relative w-full bg-[#FAF7F2] text-[#0E0B09] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden z-20"
    >
      {/* ── ORGANIC WARM BACKGROUND AMBIENT GLOWS & CURVED RIBBONS ──── */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(255,91,46,0.035)_0%,rgba(212,169,74,0.035)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[#D4A94A]/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] bg-[#A855F7]/[0.025] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] xl:max-w-[1520px] mx-auto relative z-10">
        {/* ── CENTERED EDITORIAL HEADING ───────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          {/* Centered Eyebrow flanked by delicate horizontal rules */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE.out }}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5"
          >
            <div className="h-[1px] w-8 sm:w-14 bg-[#0E0B09]/20" />
            <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.24em] uppercase text-[#7E7771]">
              THE ZOZOTO ECOSYSTEM
            </span>
            <div className="h-[1px] w-8 sm:w-14 bg-[#0E0B09]/20" />
          </motion.div>

          {/* Main Headline: Bold Black Sans + Elegant Orange Italic Serif */}
          <motion.h2
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.12, duration: 0.8, ease: EASE.out }}
            className="font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#0E0B09] tracking-[-0.035em] leading-[1.04] font-[family-name:var(--font-display)]"
          >
            More than{' '}
            <span className="font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E]">
              food delivery
            </span>
          </motion.h2>

          {/* Supporting Description */}
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.24, duration: 0.7, ease: EASE.out }}
            className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-[#595550] max-w-xl mx-auto leading-relaxed font-normal"
          >
            A growing family of everyday apps for food, groceries, events and more.
          </motion.p>
        </div>

        {/* ── ROW 1: ZOZOTO (Left: -45) & ZIPMART (Right: +45) ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 mb-6 sm:mb-7">
          <EcosystemCard
            panel={PANELS[0]}
            direction="left"
            delay={0}
            isMobile={isMobile}
            shouldReduceMotion={shouldReduceMotion}
          />
          <EcosystemCard
            panel={PANELS[1]}
            direction="right"
            delay={0.15}
            isMobile={isMobile}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        {/* ── ROW 2: EVENZO (Left: -45) & FRESHCHAIN (Right: +45) ────────── */}
        {/* Triggers independently only when Row 2 enters viewport */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          <EcosystemCard
            panel={PANELS[2]}
            direction="left"
            delay={0}
            isMobile={isMobile}
            shouldReduceMotion={shouldReduceMotion}
          />
          <EcosystemCard
            panel={PANELS[3]}
            direction="right"
            delay={0.15}
            isMobile={isMobile}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
