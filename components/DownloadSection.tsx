'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import QRCode from 'qrcode';
import { CONTENT } from '@/lib/content';
import { SPRING, EASE } from '@/lib/motion';
import StoreBadge from './StoreBadge';
import Magnetic from './primitives/Magnetic';

export const DownloadSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    QRCode.toDataURL(CONTENT.download.qrUrl, {
      width: 240,
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

  const cardScaleRaw = useTransform(scrollYProgress, [0, 0.45], [0.96, 1]);
  const cardScale = useSpring(cardScaleRaw, SPRING.smooth);

  const phoneYRaw = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const phoneY = useSpring(phoneYRaw, SPRING.smooth);

  const handleSmsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setSmsSent(true);
      setTimeout(() => setSmsSent(false), 5000);
    }
  };

  return (
    <section
      ref={containerRef}
      id="download"
      className="relative w-full bg-[#FAFAF8] text-[#0B0B0C] py-20 sm:py-28 px-4 sm:px-8 overflow-hidden z-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Large Blush Hero Card */}
        <motion.div
          style={shouldReduceMotion ? {} : { scale: cardScale }}
          className="relative rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#FFF1EB] via-[#FFEADB]/60 to-white border border-[#FF5B2E]/20 p-8 sm:p-12 lg:p-16 shadow-[0_25px_60px_-15px_rgba(255,91,46,0.15)] overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5B2E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column (Content & Badges) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#FF5B2E]/20 text-[#D93A12] text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <span>⚡ Instant Download</span>
              </div>

              <h2 className="font-extrabold text-[#0B0B0C] text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-balance font-[family-name:var(--font-display)]">
                Order your next meal in{' '}
                <span className="font-[family-name:var(--font-accent)] italic font-normal text-[#FF5B2E]">
                  seconds
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-[#6B6B72] font-normal max-w-lg leading-relaxed">
                {CONTENT.download.subtext}
              </p>

              {/* Store Badges Side by Side */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic intensity={0.15}>
                  <StoreBadge platform="google-play" />
                </Magnetic>
                <Magnetic intensity={0.15}>
                  <StoreBadge platform="app-store" />
                </Magnetic>
              </div>

              {/* SMS download link input */}
              <form onSubmit={handleSmsSubmit} className="mt-8 w-full max-w-md">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-neutral-200 text-sm text-[#0B0B0C] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF5B2E] shadow-xs"
                      aria-label="Mobile phone number for download link"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-[#FF5B2E] hover:bg-[#D93A12] text-white text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    Text Me Link
                  </button>
                </div>
                {smsSent && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1.5"
                  >
                    <span>✓</span> Download link sent to +91 {phoneNumber}
                  </motion.p>
                )}
              </form>
            </div>

            {/* Right Column: QR Code & Visual Breakout Card */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-6 z-20">
              <motion.div
                style={shouldReduceMotion ? {} : { y: phoneY }}
                className="p-6 bg-white rounded-3xl border border-neutral-200/90 shadow-[0_20px_40px_rgba(11,11,12,0.08)] flex flex-col items-center text-center max-w-[260px]"
              >
                <div className="w-48 h-48 rounded-2xl overflow-hidden border border-neutral-100 flex items-center justify-center bg-white p-2">
                  {qrCodeUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrCodeUrl}
                      alt="Scan QR code to install Zozoto app on iOS and Android"
                      width={180}
                      height={180}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100 animate-pulse rounded-xl" />
                  )}
                </div>

                <div className="mt-4">
                  <div className="font-extrabold text-sm text-[#0B0B0C] font-[family-name:var(--font-display)]">
                    Scan with camera
                  </div>
                  <p className="text-[11px] text-[#6B6B72] mt-0.5">
                    Instantly redirects to Google Play or App Store
                  </p>
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
