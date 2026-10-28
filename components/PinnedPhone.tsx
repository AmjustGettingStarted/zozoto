'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [tipAmount, setTipAmount] = useState('$3');

  return (
    <div className={`relative mx-auto w-[290px] sm:w-[320px] md:w-[350px] aspect-[9/18.5] ${className}`}>
      {/* Outer Titanium/Glass Phone Frame */}
      <div className="absolute inset-0 bg-[#16161A] rounded-[48px] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.35),0_10px_20px_rgba(255,91,46,0.15)] border-4 border-[#2E2E36] ring-1 ring-white/20 select-none overflow-hidden">
        
        {/* Subtle specular phone rim reflection */}
        <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-white/10 z-50" />
        <div className="absolute top-0 right-10 w-24 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none z-40" />

        {/* Inner Screen Container */}
        <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col font-sans text-[#0B0B0C]">
          
          {/* Top Notch / Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-28 h-6 bg-black rounded-full px-2.5 shadow-md">
            {/* Camera lens & sensor */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#181820] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#3B82F6]/60" />
            </div>
            <div className="w-2 h-2 rounded-full bg-[#202028]" />
            {/* Audio pulse dot */}
            <div className="flex items-center gap-0.5">
              <span className="w-1 h-2 bg-[#FF5B2E] rounded-full animate-pulse" />
              <span className="w-1 h-3 bg-[#FF5B2E] rounded-full animate-pulse" />
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="w-full pt-2.5 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold text-neutral-800 z-40 bg-white/80 backdrop-blur-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
              </svg>
              <div className="w-4 h-2 rounded-xs border border-current p-0.5 flex items-center">
                <div className="h-full w-full bg-current rounded-2xs" />
              </div>
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative flex-1 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {/* SCREEN 1: SCHEDULE YOUR ORDER */}
              {activeScreenIndex === 0 && (
                <motion.div
                  key="screen-schedule"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col p-4 pt-3 bg-gradient-to-b from-[#FFF6F2] to-white"
                >
                  {/* Mini Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#FF5B2E] uppercase tracking-wider">Step 1 of 3</span>
                      <h3 className="font-heading font-extrabold text-base leading-tight">Schedule Delivery</h3>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#FFE6DC] flex items-center justify-center text-[#FF5B2E]">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                  </div>

                  {/* Veg Mode Banner if ON */}
                  {vegModeOn && (
                    <div className="mb-2.5 py-1 px-2.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-1.5 text-[11px] font-bold text-green-700">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      Veg Mode Active: Only 100% Pure Veg Kitchens
                    </div>
                  )}

                  {/* Date pills */}
                  <div className="flex gap-1.5 mb-3">
                    {['Today', 'Tomorrow', 'Fri, 28th'].map((d, i) => (
                      <button
                        key={d}
                        className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold border transition-colors ${
                          i === 0
                            ? 'bg-[#FF5B2E] text-white border-[#FF5B2E] shadow-sm'
                            : 'bg-white text-neutral-600 border-neutral-200'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Time Slot Selection */}
                  <div className="bg-white rounded-2xl p-3 border border-neutral-200/80 shadow-xs mb-3">
                    <div className="text-[11px] font-bold text-neutral-500 mb-2">Available Time Windows</div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['7:30 PM', '8:00 PM', '8:30 PM'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTimeSlot(t)}
                          className={`py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
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

                  {/* Selected Cart Item Preview */}
                  <div className="bg-white rounded-2xl p-3 border border-neutral-200/80 shadow-xs flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFE6DC] flex items-center justify-center text-lg">
                      🍱
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">Party Mezze Box & Pita</div>
                      <div className="text-[10px] text-neutral-500">Scheduled for {selectedTimeSlot}</div>
                    </div>
                    <div className="text-xs font-extrabold text-[#FF5B2E]">$28.50</div>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="mt-auto">
                    <button className="w-full py-2.5 bg-[#FF5B2E] text-white rounded-xl font-bold text-xs shadow-md shadow-[#FF5B2E]/30 flex items-center justify-center gap-1.5">
                      <span>Confirm Schedule</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col relative bg-neutral-900 text-white"
                >
                  {/* Interactive Map Visual */}
                  <div className="relative w-full h-[58%] overflow-hidden bg-[#1E232A]">
                    {/* SVG Map Grid & Routes */}
                    <svg className="w-full h-full opacity-60" viewBox="0 0 300 240">
                      <defs>
                        <linearGradient id="mapRouteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="60%" stopColor="#FF5B2E" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                      {/* Grid streets */}
                      <path d="M 0 40 L 300 40 M 0 100 L 300 100 M 0 180 L 300 180" stroke="#333D4B" strokeWidth="1.5" />
                      <path d="M 50 0 L 50 240 M 140 0 L 140 240 M 230 0 L 230 240" stroke="#333D4B" strokeWidth="1.5" />
                      {/* Route Path */}
                      <path
                        d="M 50 180 Q 90 140 140 100 T 230 40"
                        stroke="url(#mapRouteGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Kitchen Origin */}
                      <circle cx="50" cy="180" r="5" fill="#3B82F6" />
                      {/* Destination Home */}
                      <circle cx="230" cy="40" r="6" fill="#10B981" />
                    </svg>

                    {/* Animated Rider Marker */}
                    <motion.div
                      animate={{
                        x: [90, 160, 90],
                        y: [140, 75, 140],
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-0 left-0 w-8 h-8 rounded-full bg-[#FF5B2E] border-2 border-white shadow-lg flex items-center justify-center text-xs"
                    >
                      🛵
                    </motion.div>

                    {/* Live ETA Floating Pill */}
                    <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                      <span className="text-[10px] font-bold tracking-tight text-white">ETA: 14 Mins</span>
                    </div>
                  </div>

                  {/* Rider Info Card */}
                  <div className="flex-1 bg-white text-[#0B0B0C] rounded-t-3xl p-4 flex flex-col justify-between shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#FFE6DC] border border-[#FF5B2E]/30 flex items-center justify-center text-base font-bold text-[#FF5B2E]">
                          AK
                        </div>
                        <div>
                          <div className="text-xs font-bold">Alex K. • 4.9 ★</div>
                          <div className="text-[10px] text-neutral-500">Zozoto Speed Partner</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
                        Insulated Bag
                      </span>
                    </div>

                    {/* Live Order Timeline */}
                    <div className="bg-neutral-50 rounded-xl p-2 flex items-center justify-between text-[10px] font-semibold text-neutral-500">
                      <span className="text-green-600 font-bold">✓ Cooked</span>
                      <span>→</span>
                      <span className="text-[#FF5B2E] font-bold animate-pulse">● On the way</span>
                      <span>→</span>
                      <span>○ Doorstep</span>
                    </div>

                    <button className="w-full py-2 bg-neutral-900 text-white rounded-xl font-bold text-[11px] hover:bg-black transition-colors flex items-center justify-center gap-1.5">
                      <span>Call Alex</span>
                      <span className="text-neutral-400">|</span>
                      <span>Share Live Link</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SCREEN 3: PAY SECURELY */}
              {activeScreenIndex === 2 && (
                <motion.div
                  key="screen-pay"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex flex-col p-4 pt-3 bg-gradient-to-b from-[#FFFDF8] to-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Step 3 of 3</span>
                      <h3 className="font-heading font-extrabold text-base leading-tight">Instant Checkout</h3>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                  </div>

                  {/* Savings Promo Applied */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 flex items-center justify-between text-[10px] mb-2.5">
                    <div className="flex items-center gap-1 font-bold text-amber-800">
                      <span>🏷️</span>
                      <span>Code FRESH50 applied</span>
                    </div>
                    <span className="font-extrabold text-amber-900">-$12.50</span>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-1.5 mb-2.5">
                    <div className="p-2 rounded-xl border-2 border-[#FF5B2E] bg-[#FFF1EB] flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-[10px]">
                          
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] font-bold text-[#0B0B0C]">Apple Pay</div>
                          <div className="text-[9px] text-[#6B6B72]">Touch ID / Face ID</div>
                        </div>
                      </div>
                      <span className="w-3.5 h-3.5 rounded-full bg-[#FF5B2E] flex items-center justify-center text-white text-[9px]">
                        ✓
                      </span>
                    </div>

                    <div className="p-2 rounded-xl border border-neutral-200 bg-white flex items-center justify-between text-neutral-600">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">
                          VISA
                        </div>
                        <div className="text-left">
                          <div className="text-[11px] font-bold text-[#0B0B0C]">•••• 4242</div>
                          <div className="text-[9px] text-[#6B6B72]">Default Card</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tip Rider */}
                  <div className="mb-2">
                    <div className="text-[10px] font-bold text-neutral-500 mb-1">Rider Appreciation Tip</div>
                    <div className="flex gap-1.5">
                      {['$2', '$3', '$5'].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setTipAmount(amt)}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-bold border ${
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

                  {/* Order Total & Pay */}
                  <div className="mt-auto bg-neutral-900 text-white rounded-2xl p-2.5 shadow-md">
                    <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                      <span>Total to pay</span>
                      <span className="font-extrabold text-white text-xs">$23.50</span>
                    </div>
                    <button className="w-full py-2 bg-[#FF5B2E] hover:bg-[#D93A12] text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5">
                      <span>Pay with 1-Click</span>
                      <span className="text-[10px]">🔒</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-full py-1.5 flex justify-center bg-white/90">
            <div className="w-24 h-1 bg-neutral-900 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinnedPhone;
