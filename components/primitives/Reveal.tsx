'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { fadeUp, VIEWPORT } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Override the default variant */
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn';
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Scroll-triggered reveal wrapper.
 * Wraps children in a motion div that fades in when scrolled into view.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT.default}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
