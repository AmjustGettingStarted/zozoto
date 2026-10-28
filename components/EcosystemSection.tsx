'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CONTENT, EcosystemCard } from '@/lib/content';
import { EASE } from '@/lib/motion';
import TiltCard from './primitives/TiltCard';

export const EcosystemSection: React.FC = () => {
  const cards = CONTENT.ecosystem.cards;

  const renderAppIcon = (name: string) => {
    switch (name) {
      case 'zozoto':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#FF5B2E] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
              <path
                d="M16 2C16 2 26 12 26 20C26 25.5 21.5 30 16 30C10.5 30 6 25.5 6 20C6 15 11 9 16 2Z"
                fill="white"
              />
              <path
                d="M16 14C16 14 20 18.5 20 22C20 24.2 18.2 26 16 26C13.8 26 12 24.2 12 22C12 19 14.5 17 16 14Z"
                fill="#FF5B2E"
              />
            </svg>
          </div>
        );
      case 'zipmart':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#F59E0B] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        );
      case 'evenzo':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <rect x="2" y="4" width="20" height="16" rx="3" />
              <path d="M7 8v8M17 8v8M2 12h20" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>
        );
      case 'freshchain':
        return (
          <div className="w-12 h-12 rounded-2xl bg-[#E11D48] text-white flex items-center justify-center shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="ecosystem"
      className="relative w-full bg-[#FAFAF8] text-[#0B0B0C] py-28 sm:py-36 px-6 sm:px-10 overflow-hidden z-20"
      style={{
        borderTopLeftRadius: 'clamp(32px, 5vw, 64px)',
        borderTopRightRadius: 'clamp(32px, 5vw, 64px)',
        marginTop: '-40px',
        boxShadow: '0 -25px 60px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#D93A12] mb-3"
          >
            Connected Living
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: EASE.out }}
            className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-[#0B0B0C] tracking-tight leading-[1.08] font-[family-name:var(--font-display)]"
          >
            The Orbitly{' '}
            <span className="font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E]">
              ecosystem
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: EASE.out }}
            className="mt-4 text-base sm:text-lg text-[#6B6B72] max-w-xl leading-relaxed"
          >
            {CONTENT.ecosystem.kicker}
          </motion.p>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.12, duration: 0.7, ease: EASE.out }}
            >
              <TiltCard
                maxTilt={6}
                className="h-full rounded-[30px] border border-neutral-200/90 bg-white p-7 sm:p-9 shadow-[0_15px_40px_rgba(11,11,12,0.04)] hover:shadow-[0_25px_50px_rgba(255,91,46,0.1)] transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon and Category Tag */}
                  <div className="flex items-center justify-between mb-6">
                    {renderAppIcon(card.name)}
                    <span
                      style={{
                        backgroundColor: card.theme.badgeBg,
                        color: card.theme.badgeText,
                      }}
                      className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs"
                    >
                      {card.category}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-2xl sm:text-3xl text-[#0B0B0C] tracking-tight font-[family-name:var(--font-display)]">
                    {card.name.charAt(0).toUpperCase() + card.name.slice(1)}
                  </h3>
                  <div className="text-sm font-semibold text-[#FF5B2E] mt-1 mb-3">
                    {card.tagline}
                  </div>
                  <p className="text-sm text-[#6B6B72] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-400 group-hover:text-neutral-700 transition-colors">
                    Part of Orbitly Network
                  </span>
                  <a
                    href={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5B2E] hover:text-[#D93A12] transition-colors"
                  >
                    <span>Discover App</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
