'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useLenis } from '../lib/lenis';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const { scrollTo } = useLenis();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
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
    scrollTo(href);
  };

  return (
    <>
      {/* Top window scroll progress line */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FF5B2E] via-[#FBBF24] to-[#FF5B2E] z-50 pointer-events-none"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#0B0B0C]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'py-5 bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-label="Zozoto Home"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF5B2E] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                <path d="M16 2C16 2 26 12 26 20C26 25.5 21.5 30 16 30C10.5 30 6 25.5 6 20C6 15 11 9 16 2Z" fill="white" />
                <path d="M16 14C16 14 20 18.5 20 22C20 24.2 18.2 26 16 26C13.8 26 12 24.2 12 22C12 19 14.5 17 16 14Z" fill="#FF5B2E" />
              </svg>
            </div>
            <span className="font-heading font-black italic text-2xl text-white tracking-tighter lowercase">
              zozoto
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer relative py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Download App CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#download')}
              className="px-5 py-2.5 rounded-full bg-[#FF5B2E] hover:bg-[#D93A12] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,91,46,0.3)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Get the App</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#FF5B2E] transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-30 bg-[#0B0B0C]/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4 text-center shadow-2xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="py-2 text-base font-bold text-neutral-200 hover:text-[#FF5B2E] transition-colors"
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
