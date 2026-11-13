'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface StoreBadgeProps {
  platform: 'google-play' | 'app-store';
  className?: string;
  size?: 'default' | 'compact';
  theme?: 'dark' | 'light';
  onClick?: () => void;
}

export const StoreBadge: React.FC<StoreBadgeProps> = ({
  platform,
  className = '',
  size = 'default',
  theme = 'dark',
  onClick,
}) => {
  const isPlay = platform === 'google-play';
  const subtitle = isPlay ? 'GET IT ON' : 'Download on the';
  const title = isPlay ? 'Google Play' : 'App Store';
  const isLight = theme === 'light';

  return (
    <motion.a
      href={isPlay ? '#download-google' : '#download-apple'}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group relative inline-flex items-center gap-3 rounded-full transition-all duration-300 shadow-lg focus:outline-none ${
        isLight
          ? 'bg-white text-[#0B0B0C] border border-white hover:bg-neutral-100 hover:shadow-[0_8px_25px_rgba(255,255,255,0.25)]'
          : 'bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/60 text-white hover:bg-black/80 hover:shadow-[0_8px_25px_rgba(255,91,46,0.18)]'
      } ${
        size === 'compact' ? 'px-4 py-2 text-xs' : 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm'
      } ${className}`}
      aria-label={`${subtitle} ${title}`}
    >
      {/* Background glow on hover */}
      <div
        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-r from-black/5 to-black/10'
            : 'bg-gradient-to-r from-[#FF5B2E]/10 to-[#D4A94A]/10'
        }`}
      />

      {/* Official Store Icons */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {isPlay ? (
          // Official Google Play Store multicolored vector logo
          <svg
            className={size === 'compact' ? 'w-5 h-5' : 'w-6 h-6'}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.609 1.814C3.23 2.213 3 2.822 3 3.619v16.762c0 .797.23 1.406.609 1.805l.096.095 9.387-9.388v-.22l-9.387-9.388-.096.095z"
              fill="#00D3FF"
            />
            <path
              d="M16.22 15.802l-3.128-3.128v-.22l3.128-3.128.07.04 3.708 2.106c1.059.601 1.059 1.587 0 2.19l-3.708 2.106-.07.034z"
              fill="#FFD200"
            />
            <path
              d="M13.162 12.454L3.609 22.007c.394.417 1.047.469 1.782.052l10.829-6.15-3.058-3.455z"
              fill="#FF334B"
            />
            <path
              d="M13.162 11.546l3.058-3.455L5.391 1.941c-.735-.417-1.388-.365-1.782.052l9.553 9.553z"
              fill="#00E676"
            />
          </svg>
        ) : (
          // Official Apple Logo
          <svg
            className={size === 'compact' ? 'w-5 h-5' : 'w-6 h-6'}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.65-.79 1.09-1.89.97-2.99-.95.04-2.09.64-2.77 1.43-.59.68-1.12 1.8-0.98 2.88 1.06.08 2.14-.54 2.78-1.32z" />
          </svg>
        )}
      </div>

      {/* Label and Title */}
      <div className="relative flex flex-col text-left leading-tight">
        <span
          className={`text-[9px] sm:text-[10px] ${
            isPlay ? 'tracking-wider uppercase' : 'tracking-normal'
          } ${
            isLight
              ? 'text-neutral-500 group-hover:text-neutral-700'
              : 'text-neutral-300 group-hover:text-neutral-200'
          } transition-colors`}
        >
          {subtitle}
        </span>
        <span
          className={`font-bold tracking-tight text-[13px] sm:text-[15px] ${
            isLight ? 'text-[#0B0B0C]' : 'text-white'
          }`}
        >
          {title}
        </span>
      </div>
    </motion.a>
  );
};

export default StoreBadge;
