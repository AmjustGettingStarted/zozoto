'use client';

import React from 'react';
import { motion } from 'motion/react';

export interface StoreBadgeProps {
  platform: 'google-play' | 'app-store';
  className?: string;
  size?: 'default' | 'compact';
  onClick?: () => void;
}

export const StoreBadge: React.FC<StoreBadgeProps> = ({
  platform,
  className = '',
  size = 'default',
  onClick,
}) => {
  const isPlay = platform === 'google-play';
  const subtitle = isPlay ? 'GET IT ON' : 'Download on the';
  const title = isPlay ? 'Play Store' : 'App Store';

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
      className={`group relative inline-flex items-center gap-3 bg-[#0B0B0C] border border-white/25 hover:border-white/70 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_8px_25px_rgba(255,91,46,0.18)] focus:outline-none focus:ring-2 focus:ring-[#FF5B2E] ${
        size === 'compact' ? 'px-4 py-2 text-xs' : 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm'
      } ${className}`}
      aria-label={`${subtitle} ${title}`}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5B2E]/10 to-[#D4A94A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Custom Original Generic Glyph */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {isPlay ? (
          // Stylized faceted play triangle glyph (original, no trademark violation)
          <svg
            className={size === 'compact' ? 'w-5 h-5' : 'w-6 h-6'}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 3.5L14.2 12L4.5 20.5V3.5Z"
              fill="#FF5B2E"
            />
            <path
              d="M14.2 12L19.5 8.9C20.2 8.5 20.2 7.5 19.5 7.1L16.8 5.6L14.2 12Z"
              fill="#FBBF24"
            />
            <path
              d="M14.2 12L16.8 18.4L19.5 16.9C20.2 16.5 20.2 15.5 19.5 15.1L14.2 12Z"
              fill="#10B981"
            />
            <path
              d="M4.5 3.5L14.2 12L16.8 5.6L5.8 2.3C4.9 2 4.5 2.6 4.5 3.5Z"
              fill="#3B82F6"
            />
          </svg>
        ) : (
          // Stylized architectural minimalist 'A' apple store style glyph
          <svg
            className={size === 'compact' ? 'w-5 h-5' : 'w-6 h-6'}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3L4 18H7.5L9.3 14.5H14.7L16.5 18H20L12 3Z"
              fill="white"
            />
            <line
              x1="6.5"
              y1="13"
              x2="17.5"
              y2="13"
              stroke="#0B0B0C"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="4" r="1.5" fill="#FF5B2E" />
          </svg>
        )}
      </div>

      {/* Label and Title */}
      <div className="relative flex flex-col text-left leading-tight">
        <span className="text-[10px] tracking-wider uppercase text-neutral-400 group-hover:text-neutral-300 transition-colors">
          {subtitle}
        </span>
        <span className="font-bold text-white tracking-tight text-[13px] sm:text-[15px]">
          {title}
        </span>
      </div>
    </motion.a>
  );
};

export default StoreBadge;
