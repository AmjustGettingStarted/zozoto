'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // 0 = static, 0.5 = half speed, 1 = normal, -0.5 = inverse
  rotateRange?: [number, number]; // e.g. [-6, 6] degrees
  scaleRange?: [number, number]; // e.g. [0.95, 1.05]
  yOffsetRange?: [number, number]; // custom explicit pixel offset [start, end]
  className?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
  direction?: 'up' | 'down';
  smooth?: boolean;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.3,
  rotateRange,
  scaleRange,
  yOffsetRange,
  className = '',
  targetRef,
  direction = 'up',
  smooth = true,
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef || localRef,
    offset: ['start end', 'end start'],
  });

  // Calculate default vertical offset based on speed
  const multiplier = direction === 'up' ? -1 : 1;
  const defaultYStart = multiplier * -100 * speed;
  const defaultYEnd = multiplier * 100 * speed;

  const yRange = yOffsetRange || [defaultYStart, defaultYEnd];

  const rawY = useTransform(scrollYProgress, [0, 1], yRange);
  const rawRotate = useTransform(
    scrollYProgress,
    [0, 1],
    rotateRange || [0, 0]
  );
  const rawScale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleRange || [1, 1]
  );

  const springConfig = { stiffness: 90, damping: 20, mass: 0.5 };
  const smoothY = useSpring(rawY, springConfig);
  const smoothRotate = useSpring(rawRotate, springConfig);
  const smoothScale = useSpring(rawScale, springConfig);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={localRef}
      style={{
        y: smooth ? smoothY : rawY,
        rotate: rotateRange ? (smooth ? smoothRotate : rawRotate) : 0,
        scale: scaleRange ? (smooth ? smoothScale : rawScale) : 1,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
