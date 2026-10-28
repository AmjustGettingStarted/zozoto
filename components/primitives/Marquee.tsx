'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // duration in seconds for one complete cycle
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  className = '',
  speed = 30,
  reverse = false,
  pauseOnHover = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-x-auto flex whitespace-nowrap gap-8 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden flex whitespace-nowrap select-none ${className} ${
        pauseOnHover ? 'group' : ''
      }`}
    >
      <motion.div
        className="flex shrink-0 items-center gap-8 group-hover:[animation-play-state:paused]"
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {children}
        {children}
      </motion.div>
      <motion.div
        className="flex shrink-0 items-center gap-8 group-hover:[animation-play-state:paused]"
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
        aria-hidden="true"
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

export default Marquee;
