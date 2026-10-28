'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '@/lib/motion';

interface SplitTextProps {
  children: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  children,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.04,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = children.split(' ');

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.05em] -mb-[0.05em]">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: EASE.out,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default SplitText;
