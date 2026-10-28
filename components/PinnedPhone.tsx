'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { screenTransition } from '@/lib/motion';

export interface PinnedPhoneProps {
  activeScreenIndex: number; // 0: Schedule, 1: Track, 2: Pay
  vegModeOn?: boolean;
  onToggleVegMode?: () => void;
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
      className={`relative mx-auto max-h-[80vh] h-[610px] aspect-[9/18.5] flex flex-col items-center justify-center ${className}`}
    >
      {/* Outer Titanium/Dark Glass Phone Frame */}
      <div className="relative w-full h-full bg-[#141418] rounded-[44px] p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.3),0_10px_20px_rgba(255,91,46,0.12)] border-[3.5px] border-[#2A2A33] ring-1 ring-white/15 select-none overflow-hidden flex flex-col">
        {/* Subtle glass rim reflection */}
        <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/10 z-50" />
        <div className="absolute top-0 right-8 w-20 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none z-40" />

        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-[#FAFAF8] rounded-[34px] overflow-hidden flex flex-col font-sans text-[#0B0B0C]">
          {/* Top Notch / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-24 h-5 bg-black rounded-full px-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#1C1C24] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#3B82F6]/70" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#202028]" />
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-1.5 bg-[#FF5B2E] rounded-full" />
              <span className="w-1 h-2 bg-[#FF5B2E] rounded-full" />
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="w-full pt-2 px-5 pb-1 flex items-center justify-between text-[10px] font-semibold text-neutral-800 z-40 bg-white/70 backdrop-blur-xs">
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

          {/* Screen Content Wrapper */}
          <div className="relative flex-1 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {/* SCREEN 1: SCHEDULE ORDER */}
              {activeScreenIndex === 0 && (
                <motion.div
                  key="screen-schedule"
                  {...screenTransition}
                  className="w-full h-full flex flex-col p-4 pt-2 bg-gradient-to-b from-[#FFF5F0] to-[#FAFAF8]"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div>
                      <span className="text-[9px] font-bold text-[#FF5B2E] uppercase tracking-wider">
                        Feature 01
                      </span>
                      <h3 className="font-extrabold text-sm leading-tight text-[#0B0B0C]">
                        Schedule Delivery
                      </h3>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#FFE6DC] flex items-center justify-center text-[#FF5B2E]">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>

                  {/* Veg Mode Banner if ON */}
                  {vegModeOn && (
                    <div className="mb-2 py-1 px-2.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-1.5 text-[10px] font-bold text-green-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Veg Mode Active: 100% Pure Veg Kitchens
                    </div>
                  )}

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

                  {/* Time Slot Selection */}
                  <div className="bg-white rounded-2xl p-2.5 border border-neutral-200/80 shadow-xs mb-2.5">
                    <div className="text-[10px] font-bold text-neutral-500 mb-1.5">Delivery Time Window</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['7:30 PM', '8:00 PM', '8:30 PM'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTimeSlot(t)}
                          className={`py-1 rounded-lg text-[10px] font-bold border transition-all ${
                            selectedTimeSlot === t
                              ? 'bg-[#FFF1EB] border-[#FF5B2E] text-[#D93A12] ring-1 ring-[#FF5B2E]'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cart Item Preview with INR (₹) */}
                  <div className="bg-white rounded-2xl p-2.5 border border-neutral-200/80 shadow-xs flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-[#FFE6DC] flex items-center justify-center text-base">
                      🍱
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold truncate">Party Mezze & Kebab Box</div>
                      <div className="text-[9px] text-neutral-500">Scheduled for {selectedTimeSlot}</div>
                    </div>
                    <div className="text-[11px] font-extrabold text-[#FF5B2E]">₹449</div>
                  </div>

                  <div className="mt-auto">
                    <button className="w-full py-2 bg-[#FF5B2E] text-white rounded-xl font-bold text-[11px] shadow-sm flex items-center justify-center gap-1">
                      <span>Confirm Schedule</span>
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 2: TRACK YOUR RIDER */}
              {activeScreenIndex === 1 && (
                <motion.div
                  key="screen-track"
                  {...screenTransition}
                  className="w-full h-full flex flex-col relative bg-neutral-900 text-white"
                >
                  <div className="relative w-full h-[56%] overflow-hidden bg-[#1E232A]">
                    <svg className="w-full h-full opacity-60" viewBox="0 0 300 240">
                      <defs>
                        <linearGradient id="mapRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="60%" stopColor="#FF5B2E" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                      <path d="M 0 40 L 300 40 M 0 100 L 300 100 M 0 180 L 300 180" stroke="#333D4B" strokeWidth="1.5" />
                      <path d="M 50 0 L 50 240 M 140 0 L 140 240 M 230 0 L 230 240" stroke="#333D4B" strokeWidth="1.5" />
                      <path
                        d="M 50 180 Q 90 140 140 100 T 230 40"
                        stroke="url(#mapRouteGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <circle cx="50" cy="180" r="4.5" fill="#3B82F6" />
                      <circle cx="230" cy="40" r="5" fill="#10B981" />
                    </svg>

                    <motion.div
                      animate={{
                        x: [75, 145, 75],
                        y: [130, 70, 130],
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-0 left-0 w-7 h-7 rounded-full bg-[#FF5B2E] border-2 border-white shadow-md flex items-center justify-center text-[10px]"
                    >
                      🛵
                    </motion.div>

                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                      <span className="text-[9px] font-bold text-white">ETA: 12 Mins</span>
                    </div>
                  </div>

                  <div className="flex-1 bg-white text-[#0B0B0C] rounded-t-3xl p-3.5 flex flex-col justify-between shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#FFE6DC] border border-[#FF5B2E]/30 flex items-center justify-center text-xs font-bold text-[#FF5B2E]">
                          AK
                        </div>
                        <div>
                          <div className="text-[11px] font-bold">Alex K. • 4.9 ★</div>
                          <div className="text-[9px] text-neutral-500">Zozoto Speed Partner</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[9px] font-bold border border-green-200">
                        Insulated Bag
                      </span>
                    </div>

                    <div className="bg-neutral-50 rounded-xl p-1.5 flex items-center justify-between text-[9px] font-semibold text-neutral-500">
                      <span className="text-green-600 font-bold">✓ Prepared</span>
                      <span>→</span>
                      <span className="text-[#FF5B2E] font-bold animate-pulse">● In Transit</span>
                      <span>→</span>
                      <span>○ Doorstep</span>
                    </div>

                    <button className="w-full py-1.5 bg-neutral-900 text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-1">
                      <span>Call Alex</span>
                      <span className="text-neutral-500">|</span>
                      <span>Live Share</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 3: INSTANT CHECKOUT (₹) */}
              {activeScreenIndex === 2 && (
                <motion.div
                  key="screen-pay"
                  {...screenTransition}
                  className="w-full h-full flex flex-col p-4 pt-2 bg-gradient-to-b from-[#FFFDF8] to-[#FAFAF8]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[9px] font-bold text-green-600 uppercase tracking-wider">
                        Feature 03
                      </span>
                      <h3 className="font-extrabold text-sm leading-tight text-[#0B0B0C]">
                        Instant Checkout
                      </h3>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                  </div>

                  {/* Savings Promo in INR */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-1.5 flex items-center justify-between text-[9px] mb-2">
                    <div className="flex items-center gap-1 font-bold text-amber-800">
                      <span>🏷️</span>
                      <span>Code FRESH100 applied</span>
                    </div>
                    <span className="font-extrabold text-amber-900">-₹100</span>
                  </div>

                  {/* UPI / Cards Payment Methods */}
                  <div className="space-y-1.5 mb-2">
                    <div className="p-2 rounded-xl border-2 border-[#FF5B2E] bg-[#FFF1EB] flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-[#5F259F] text-white flex items-center justify-center font-bold text-[8px]">
                          UPI
                        </div>
                        <div className="text-left">
                          <div className="text-[10px] font-bold text-[#0B0B0C]">Google Pay / PhonePe</div>
                          <div className="text-[8px] text-[#6B6B72]">Instant UPI Autopay</div>
                        </div>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#FF5B2E] flex items-center justify-center text-white text-[8px]">
                        ✓
                      </span>
                    </div>

                    <div className="p-2 rounded-xl border border-neutral-200 bg-white flex items-center justify-between text-neutral-600">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[8px]">
                          VISA
                        </div>
                        <div className="text-left">
                          <div className="text-[10px] font-bold text-[#0B0B0C]">HDFC Bank •••• 4242</div>
                          <div className="text-[8px] text-[#6B6B72]">Saved Card</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tip Rider in ₹ */}
                  <div className="mb-2">
                    <div className="text-[9px] font-bold text-neutral-500 mb-1">Rider Appreciation Tip</div>
                    <div className="flex gap-1.5">
                      {['₹30', '₹50', '₹100'].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setTipAmount(amt)}
                          className={`flex-1 py-1 rounded-lg text-[9px] font-bold border ${
                            tipAmount === amt
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                          }`}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Total & Pay Button */}
                  <div className="mt-auto bg-neutral-900 text-white rounded-2xl p-2.5 shadow-md">
                    <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
                      <span>Total to pay</span>
                      <span className="font-extrabold text-white text-xs">₹379</span>
                    </div>
                    <button className="w-full py-2 bg-[#FF5B2E] hover:bg-[#D93A12] text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1">
                      <span>Pay ₹379 via UPI</span>
                      <span className="text-[10px]">🔒</span>
                    </button>
                  </div>
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
