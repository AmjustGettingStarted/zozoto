'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import QRCode from 'qrcode';
import { CONTENT } from '../content';
import StoreBadge from './StoreBadge';

export const DownloadSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    QRCode.toDataURL(CONTENT.download.qrUrl, {
      width: 260,
      margin: 1,
      color: {
        dark: '#0B0B0C',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 80, damping: 25, mass: 0.6 };

  // Card scales 0.96 -> 1 as it enters
  const cardScaleRaw = useTransform(scrollYProgress, [0, 0.45], [0.96, 1]);
  const cardScale = useSpring(cardScaleRaw, springConfig);

  // Phone rises slower than the page so it appears to float
  const phoneYRaw = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const phoneY = useSpring(phoneYRaw, springConfig);

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 7) {
      setSmsSent(true);
      setTimeout(() => setSmsSent(false), 5000);
    }
  };

  return (
    <section
      ref={containerRef}
      id="download"
      className="relative w-full bg-white text-[#0B0B0C] py-20 sm:py-28 px-4 sm:px-8 overflow-hidden z-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Large Rounded Blush Card (radius 32px, pink-to-white gradient, thin pink border) */}
        <motion.div
          style={shouldReduceMotion ? {} : { scale: cardScale }}
          className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#FFF1EB] via-[#FFEADB]/70 to-white border border-[#FF5B2E]/25 p-8 sm:p-12 lg:p-16 shadow-[0_25px_60px_-15px_rgba(255,91,46,0.15)] overflow-hidden"
        >
          {/* Subtle Ambient Background Flare */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5B2E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column (Content & Badges) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#FF5B2E]/20 text-[#D93A12] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <span>⚡ Instant Download</span>
              </div>

              {/* H2 "Download the app now!" in Brand Flame (#FF5B2E) */}
              <h2 className="font-heading font-extrabold text-[#FF5B2E] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.1] text-balance">
                {CONTENT.download.heading}
              </h2>

              {/* Subtext */}
              <p className="mt-4 text-base sm:text-lg text-[#6B6B72] font-normal max-w-lg leading-relaxed">
                {CONTENT.download.subtext}
              </p>

              {/* Rating Proof */}
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-neutral-700">
                <div className="flex text-amber-500">
                  {'★'.repeat(5)}
                </div>
                <span>{CONTENT.download.rating}</span>
              </div>

              {/* Store Badges Side by Side */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <StoreBadge platform="google-play" />
                <StoreBadge platform="app-store" />
              </div>

              {/* SMS download link input */}
              <form onSubmit={handleSmsSubmit} className="mt-8 w-full max-w-md">
                <div className="text-xs font-bold text-neutral-700 mb-2">Or get the download link sent to your phone:</div>
                <div className="flex items-center gap-2 bg-white rounded-full p-1.5 border border-neutral-300 focus-within:border-[#FF5B2E] focus-within:ring-2 focus-within:ring-[#FF5B2E]/20 shadow-xs transition-all">
                  <span className="pl-3 text-sm text-neutral-400 font-bold">📱</span>
                  <input
                    type="tel"
                    placeholder="Enter your phone number..."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-transparent text-xs sm:text-sm text-neutral-900 outline-none px-2"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-full bg-[#FF5B2E] hover:bg-[#D93A12] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Send Link
                  </button>
                </div>
                {smsSent && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold text-green-700 mt-2 pl-3 flex items-center gap-1.5"
                  >
                    <span>✓</span> Download link sent! Check your SMS inbox.
                  </motion.p>
                )}
              </form>
            </div>

            {/* Right Column: Phone Mockup cropped at the bottom edge */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end self-end z-20">
              <motion.div
                style={shouldReduceMotion ? {} : { y: phoneY }}
                className="relative w-[280px] sm:w-[310px] will-change-transform"
              >
                {/* Phone Frame cropped at bottom edge */}
                <div className="relative bg-[#111114] rounded-t-[42px] border-t-4 border-x-4 border-[#2E2E36] p-3 pb-0 shadow-[0_20px_50px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
                  
                  {/* Top Notch / Speaker */}
                  <div className="w-24 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#181822] mr-2" />
                    <div className="w-10 h-1 bg-[#22222A] rounded-full" />
                  </div>

                  {/* Phone Screen with QR Code Display */}
                  <div className="bg-white rounded-t-[32px] p-5 pb-8 flex flex-col items-center text-center">
                    
                    <span className="text-[10px] font-bold tracking-wider text-[#FF5B2E] uppercase mb-1">
                      Quick Scan
                    </span>
                    <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0B0B0C] leading-snug max-w-[200px]">
                      {CONTENT.download.qrText}
                    </h3>

                    {/* QR Code Graphic Frame */}
                    <div className="relative mt-4 p-3 bg-neutral-50 rounded-2xl border-2 border-dashed border-[#FF5B2E]/40 shadow-xs flex items-center justify-center group">
                      {qrCodeUrl ? (
                        <img
                          src={qrCodeUrl}
                          alt="QR Code to download Zozoto food delivery app"
                          className="w-40 h-40 object-contain rounded-lg"
                        />
                      ) : (
                        // Instant SVG QR Placeholder while loading
                        <div className="w-40 h-40 bg-neutral-900 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          QR Code Loading...
                        </div>
                      )}

                      {/* Center Brand Flame Pin over QR */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FF5B2E] border-2 border-white flex items-center justify-center shadow-md">
                        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                          <path d="M12 2C12 2 19 9 19 15C19 18.9 15.9 22 12 22C8.1 22 5 18.9 5 15C5 11 8.5 7 12 2Z" fill="white" />
                        </svg>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-[#6B6B72] font-medium">
                      Compatible with iOS 15+ and Android 9+
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
