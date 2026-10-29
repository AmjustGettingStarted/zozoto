'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  displayOverride?: string;
  className?: string;
  compact?: boolean;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  displayOverride,
  className = '',
  compact = false,
}) => {
  const [val, setVal] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setVal(end);
      setCompleted(true);
      return;
    }

    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth cubic-out curve
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setVal(ease * end);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setVal(end);
        setCompleted(true);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isInView, end, duration, shouldReduceMotion]);

  if (completed && displayOverride) {
    return (
      <span ref={ref} className={`tabular-nums ${className}`}>
        {prefix}{displayOverride}
      </span>
    );
  }

  // Format during counting
  let formatted: string;
  if (displayOverride && displayOverride.includes('B')) {
    const billions = (val / 1_000_000_000).toFixed(1);
    formatted = `${billions}B`;
  } else if (end >= 100_000) {
    const rounded = completed ? Math.round(val) : Math.floor(val / 500) * 500;
    formatted = rounded.toLocaleString('en-US');
  } else {
    formatted = Math.floor(val).toLocaleString('en-US');
  }

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
};

export default CountUp;
