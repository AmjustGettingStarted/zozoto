/**
 * Zozoto — Shared Motion System
 * Single source of truth for all animation tokens.
 * Every component imports from here.
 */

/* ── Easing Curves (cubic-bezier) ────────────────────────── */

export const EASE = {
  /** Smooth expo-out — default entrance */
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Smooth in-out — state changes */
  inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  /** Quick snap — micro-interactions */
  snap: [0.2, 0.65, 0, 1] as [number, number, number, number],
};

/* ── Duration Scale (seconds) ────────────────────────────── */

export const DURATION = {
  fast: 0.25,
  normal: 0.5,
  slow: 0.7,
  slower: 1.0,
  hero: 1.2,
};

/* ── Spring Physics Presets ──────────────────────────────── */

export const SPRING = {
  /** General-purpose smooth parallax */
  smooth: { stiffness: 80, damping: 20, mass: 0.6 },
  /** Snappy UI interactions */
  snappy: { stiffness: 300, damping: 30 },
  /** Gentle drift for deep-parallax elements */
  gentle: { stiffness: 50, damping: 18, mass: 0.8 },
  /** Card hover tilt */
  tilt: { stiffness: 350, damping: 25 },
};

/* ── Viewport Trigger Configs ────────────────────────────── */

export const VIEWPORT = {
  default: { once: true, margin: '-80px' as const },
  tight: { once: true, margin: '-40px' as const },
  loose: { once: true, margin: '-120px' as const },
};

/* ── Reusable Variants ───────────────────────────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, delay, ease: EASE.out },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.normal, delay, ease: EASE.out },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, delay, ease: EASE.out },
  }),
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, delay, ease: EASE.out },
  }),
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, delay, ease: EASE.out },
  }),
};

/** Split-line text reveal (clip mask) */
export const lineReveal = {
  hidden: { y: '110%' },
  visible: (delay = 0) => ({
    y: '0%',
    transition: { duration: DURATION.hero, delay, ease: EASE.out },
  }),
};

/** Stagger container — wrap children that each use a variant */
export const staggerContainer = (staggerDelay = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.15,
    },
  },
});

/** Screen transition for phone mockup */
export const screenTransition = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.03 },
  transition: { duration: 0.4, ease: EASE.out },
};
