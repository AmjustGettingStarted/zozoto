'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { screenTransition } from '@/lib/motion';

export interface PinnedPhoneProps {
  activeScreenIndex: number; // 0: Schedule, 1: Track, 2: Pay
  vegModeOn?: boolean;
  className?: string;
}

export const PinnedPhone: React.FC<PinnedPhoneProps> = ({
  activeScreenIndex,
  vegModeOn = false,
  className = '',
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('8:00 PM');
  const [tipAmount, setTipAmount] = useState('₹50');

  return (
    <div
      className={`relative mx-auto h-[380px] sm:h-[460px] lg:h-[580px] xl:h-[620px] max-h-[75vh] aspect-[9/18.5] flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Outer Titanium/Dark Glass Phone Frame */}
      <div className="relative w-full h-full bg-[#181513] rounded-[44px] p-2.5 sm:p-3 shadow-[0_30px_70px_rgba(14,11,9,0.35),0_10px_25px_rgba(255,91,46,0.12)] border-[3.5px] border-[#2C2622] ring-1 ring-white/10 overflow-hidden flex flex-col">
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/10 z-50" />
        <div className="absolute top-0 right-6 w-16 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none z-40" />

        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-[#FBF8F3] rounded-[34px] overflow-hidden flex flex-col font-sans text-[#0E0B09]">
          {/* Top Notch / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-24 h-5 bg-[#0E0B09] rounded-full px-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#241F1C] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#3B82F6]/80" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#2C2622]" />
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-1.5 bg-[#FF5B2E] rounded-full" />
              <span className="w-1 h-2 bg-[#FF5B2E] rounded-full" />
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="w-full pt-2.5 px-6 pb-1 flex items-center justify-between text-[10px] font-semibold text-neutral-800 z-40 bg-white/80 backdrop-blur-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z" />
              </svg>
              <div className="w-3.5 h-2 rounded-xs border border-current p-0.5 flex items-center">
                <div className="h-full w-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Screen Content Wrapper with Crossfade Transitions */}
          <div className="relative flex-1 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {/* SCREEN 1: SCHEDULE ORDER (Calendar slots in rupees) */}
              {activeScreenIndex === 0 && (
                <motion.div
                  key="screen-schedule"
                  {...screenTransition}
                  className="w-full h-full flex flex-col p-4 pt-2 bg-gradient-to-b from-[#FFF5EE] to-[#FBF8F3]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[9px] font-bold text-[#FF5B2E] uppercase tracking-wider font-mono">
                        Step 01
                      </span>
                      <h3 className="font-extrabold text-sm leading-tight text-[#0E0B09]">
                        Schedule Dinner Order
                      </h3>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#FFEAE0] flex items-center justify-center text-[#FF5B2E]">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                  </div>

                  {/* Date pills */}
                  <div className="flex gap-1.5 mb-2.5">
                    {['Today', 'Tomorrow', 'Fri, 28th'].map((d, i) => (
                      <button
                        key={d}
                        className={`flex-1 py-1 rounded-xl text-[10px] font-bold border transition-colors ${
                          i === 0
                            ? 'bg-[#FF5B2E] text-white border-[#FF5B2E] shadow-xs'
                            : 'bg-white text-neutral-600 border-neutral-200'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Calendar Time Slots in Rupees */}
                  <div className="bg-white rounded-2xl p-2.5 border border-neutral-200/80 shadow-xs mb-2.5">
                    <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 mb-1.5">
                      <span>Delivery Time Slot</span>
                      <span className="text-emerald-600 font-extrabold">₹0 Free Surge</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { time: '7:30 PM', price: '₹0' },
                        { time: '8:00 PM', price: '₹0' },
                        { time: '8:30 PM', price: '₹0' },
                      ].map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`py-1.5 px-1 rounded-xl text-center border transition-all ${
                            selectedTimeSlot === slot.time
                              ? 'bg-[#FFF1EB] border-[#FF5B2E] text-[#D93A12] ring-1 ring-[#FF5B2E]'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          <div className="text-[10px] font-bold leading-tight">{slot.time}</div>
                          <div className="text-[8px] font-extrabold text-emerald-600">{slot.price} fee</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cart Item Preview with INR (₹) */}
                  <div className="bg-white rounded-2xl p-2.5 border border-neutral-200/80 shadow-xs flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FFEAE0] flex items-center justify-center text-lg">
                      🍱
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold text-[#0E0B09] truncate">
                        Dum Handi Biryani Box
                      </div>
                      <div className="text-[9px] text-neutral-500">Scheduled for {selectedTimeSlot}</div>
                    </div>
                    <div className="text-[11px] font-extrabold text-[#FF5B2E]">₹480</div>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full py-2 bg-[#FF5B2E] text-white rounded-xl font-bold text-[11px] shadow-sm flex items-center justify-center gap-1">
                      <span>Lock Slot for ₹480</span>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 2: TRACK YOUR RIDER (Live map with animated route line & moving rider dot) */}
              {activeScreenIndex === 1 && (
                <motion.div
                  key="screen-track"
                  {...screenTransition}
                  className="w-full h-full flex flex-col relative bg-[#151210] text-white"
                >
                  <div className="relative w-full h-[58%] overflow-hidden bg-[#1E1916]">
                    {/* Animated Route Map Grid */}
                    <svg className="w-full h-full opacity-70" viewBox="0 0 300 240">
                      <defs>
                        <linearGradient id="mapRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF5B2E" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 50 L 300 50 M 0 110 L 300 110 M 0 190 L 300 190" stroke="#332A24" strokeWidth="1.5" />
                      <path d="M 50 0 L 50 240 M 150 0 L 150 240 M 240 0 L 240 240" stroke="#332A24" strokeWidth="1.5" />

                      {/* Route Path */}
                      <path
                        id="riderRoute"
                        d="M 50 190 Q 90 140 150 110 T 240 50"
                        stroke="url(#mapRouteGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="6 4"
                        fill="none"
                      />
                      {/* Restaurant Origin */}
                      <circle cx="50" cy="190" r="5" fill="#FF5B2E" />
                      {/* Customer Destination */}
                      <circle cx="240" cy="50" r="6" fill="#10B981" />
                    </svg>

                    {/* Moving Rider Dot pulsing along route */}
                    <motion.div
                      animate={{
                        x: [60, 160, 220, 60],
                        y: [170, 95, 55, 170],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[#FF5B2E] border-2 border-white shadow-[0_0_15px_rgba(255,91,46,0.8)] flex items-center justify-center text-xs"
                    >
                      🛵
                    </motion.div>

                    <div className="absolute top-3 left-3 bg-[#0E0B09]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                      <span className="text-[9px] font-bold text-white uppercase tracking-wider font-mono">
                        ETA: 12 Mins
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 bg-white text-[#0E0B09] rounded-t-3xl p-3.5 flex flex-col justify-between shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#FFEAE0] border border-[#FF5B2E]/30 flex items-center justify-center text-xs font-bold text-[#FF5B2E]">
                          AK
                        </div>
                        <div>
                          <div className="text-[11px] font-bold">Alex K. • 4.9 ★</div>
                          <div className="text-[9px] text-[#7E7771]">Speed Partner • Insulated Bag</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                        Live GPS
                      </span>
                    </div>

                    <div className="bg-neutral-50 rounded-xl p-2 flex items-center justify-between text-[9px] font-semibold text-neutral-500">
                      <span className="text-emerald-600 font-bold">✓ Fresh Packed</span>
                      <span>→</span>
                      <span className="text-[#FF5B2E] font-bold animate-pulse">● On the way</span>
                      <span>→</span>
                      <span>○ Doorstep</span>
                    </div>

                    <button className="w-full py-1.5 bg-[#0E0B09] text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1">
                      <span>Call Alex</span>
                      <span className="text-neutral-500">•</span>
                      <span>Share Live Route</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 3: PAY SECURELY (Payment success with checkmark draw) */}
              {activeScreenIndex === 2 && (
                <motion.div
                  key="screen-pay"
                  {...screenTransition}
                  className="w-full h-full flex flex-col items-center justify-between p-4 pt-3 bg-gradient-to-b from-[#F2FDF6] to-[#FFFFFF] text-center"
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider font-mono">
                      Step 03
                    </span>
                    <span className="text-[9px] font-bold text-neutral-400">Order #88392</span>
                  </div>

                  {/* Animated SVG Checkmark Draw */}
                  <div className="flex flex-col items-center my-auto">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.25)] mb-3">
                      <svg className="w-9 h-9 text-emerald-600" viewBox="0 0 50 50">
                        <motion.circle
                          cx="25"
                          cy="25"
                          r="22"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                        <motion.path
                          d="M14 26 L22 34 L36 18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
                        />
                      </svg>
                    </div>

                    <h3 className="font-extrabold text-base text-[#0E0B09] tracking-tight">
                      Payment Successful
                    </h3>
                    <div className="text-2xl font-black text-emerald-600 tracking-tight mt-0.5">
                      ₹640
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1 max-w-[200px]">
                      1-Tap UPI Autopay confirmed. Receipt sent to your email.
                    </p>
                  </div>

                  {/* Card summary box */}
                  <div className="w-full bg-neutral-50 border border-neutral-200/80 rounded-2xl p-2.5 text-left text-[10px] space-y-1">
                    <div className="flex justify-between text-neutral-500">
                      <span>Method</span>
                      <span className="font-bold text-[#0E0B09]">Google Pay (UPI)</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span>Cashback earned</span>
                      <span className="font-bold text-emerald-600">+₹45 Zozoto Coin</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-emerald-600 text-white rounded-xl font-bold text-[11px] shadow-sm">
                    View Digital Receipt
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Home Indicator */}
          <div className="w-full py-1.5 flex justify-center bg-white/80">
            <div className="w-20 h-1 bg-neutral-900 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinnedPhone;
