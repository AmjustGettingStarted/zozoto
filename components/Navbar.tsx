'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useLenis } from '@/lib/lenis';
import Magnetic from './primitives/Magnetic';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const { scrollTo } = useLenis();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 60);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navLinks = [
    { label: 'Discover', href: '#better-food' },
    { label: 'Features', href: '#features' },
    { label: 'Zozoto Elite', href: '#elite' },
    { label: 'Ecosystem', href: '#ecosystem' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href, { offset: -30 });
  };

  return (
    <>
      {/* Top scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#FF5B2E] via-[#FBBF24] to-[#FF5B2E] z-50 pointer-events-none"
      />

      {/* Floating Glass Pill Navbar */}
      <header className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto w-full max-w-4xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0E0B09]/85 backdrop-blur-2xl border border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
              : 'bg-[#0E0B09]/60 backdrop-blur-md border border-white/10 shadow-lg'
          }`}
        >
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            aria-label="Zozoto Home"
          >
            <div className="w-8 h-8 rounded-full bg-[#FF5B2E] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,91,46,0.4)] group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
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
            <span className="font-extrabold italic text-xl tracking-tight text-white font-[family-name:var(--font-display)]">
              zozoto
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Magnetic CTA */}
          <div className="flex items-center gap-2">
            <Magnetic intensity={0.2}>
              <button
                onClick={() => handleNavClick('#download')}
                className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#FF5B2E] hover:bg-[#D93A12] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,91,46,0.35)] cursor-pointer flex items-center gap-1.5"
              >
                <span>Get App</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </button>
            </Magnetic>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#FF5B2E] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#0B0B0C]/95 backdrop-blur-2xl border border-white/15 p-6 rounded-3xl md:hidden flex flex-col gap-3 text-center shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="py-2.5 text-sm font-semibold text-neutral-200 hover:text-[#FF5B2E] transition-colors border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#download')}
              className="mt-2 w-full py-3 rounded-full bg-[#FF5B2E] text-white font-bold text-sm shadow-md"
            >
              Download App Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
