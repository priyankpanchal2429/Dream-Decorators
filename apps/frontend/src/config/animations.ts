import { Variants } from 'framer-motion';

/**
 * Global Animation System
 * Single Source of Truth for all motion variants and spring transitions across the ERP application.
 */

// Staggered Container for Pages & Bento Grids
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Fluid Spring Item Physics (matches Dashboard exact feel)
export const springItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Page Header Slide-Down Variant
export const pageHeaderVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Micro-interaction Card Hover & Tap
export const cardHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    y: -2,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    scale: 0.99,
  },
};

// Modal & Drawer Transitions
export const modalFadeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

// Route Level Page Switching & Refresh Animation
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};
