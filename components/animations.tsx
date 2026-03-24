"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Slight scale + fade for galleries */
export const fadeInUpZoom: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Subtle slide for mobile-friendly grids (smaller offset) */
export const fadeInLeftSubtle: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export const fadeInRightSubtle: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const viewport = { once: true, margin: "-100px" as const };

type MotionBlockProps = {
  children: ReactNode;
  className?: string;
  variants: Variants;
};

function MotionBlock({ children, className, variants }: MotionBlockProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={variants} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </motion.div>
  );
}

export function ScrollInLeft({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <MotionBlock variants={fadeInLeft} className={className}>
      {children}
    </MotionBlock>
  );
}

export function ScrollInRight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <MotionBlock variants={fadeInRight} className={className}>
      {children}
    </MotionBlock>
  );
}

export function ScrollInUp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <MotionBlock variants={fadeInUp} className={className}>
      {children}
    </MotionBlock>
  );
}

export function ScrollInUpZoom({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <MotionBlock variants={fadeInUpZoom} className={className}>
      {children}
    </MotionBlock>
  );
}
