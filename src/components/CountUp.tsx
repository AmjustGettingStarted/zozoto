import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

export interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  displayOverride?: string;
  className?: string;
  separator?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  displayOverride,
  className = '',
  separator = ',',
}) => {
  const [current, setCurrent] = useState<number>(0);
  const [hasCompleted, setHasCompleted] = useState<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setCurrent(end);
      setHasCompleted(true);
      return;
    }

    let startTimestamp: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease out expo for natural mechanical feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(easeProgress * end);

      setCurrent(val);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCurrent(end);
        setHasCompleted(true);
      }
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isInView, end, duration, shouldReduceMotion]);

  const formattedNumber = current.toLocaleString('en-US');

  if (displayOverride && hasCompleted) {
    return (
      <span ref={ref} className={className}>
        {prefix}{displayOverride}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};

export default CountUp;
