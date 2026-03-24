"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

const observerOptions: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: "0px 0px -10% 0px",
};

export type RevealDirection = "up" | "left" | "right" | "up-zoom";

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
  direction?: RevealDirection;
};

const directionClass: Record<RevealDirection, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  "up-zoom": "reveal-up-zoom",
};

/**
 * Single block reveal on scroll (Intersection Observer, runs once).
 */
export function Reveal({ children, delayMs = 0, className = "", direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, observerOptions);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${directionClass[direction]}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delayMs ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each direct child (ms). */
  staggerMs?: number;
  /** Odd children from left, even from right (subtle). */
  alternateSides?: boolean;
};

/**
 * Staggers direct children when the wrapper enters the viewport (once).
 * Each child should be a single element (e.g. article, div).
 */
export function StaggerReveal({
  children,
  className = "",
  staggerMs = 72,
  alternateSides = false,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, observerOptions);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const styled = Children.map(children, (child, i) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<{ className?: string; style?: CSSProperties }>;
    const side =
      alternateSides && i % 2 === 0
        ? " stagger-from-left"
        : alternateSides
          ? " stagger-from-right"
          : "";
    const delay = Math.min(i, 14) * staggerMs;
    return cloneElement(el, {
      className: `stagger-item${side}${el.props.className ? ` ${el.props.className}` : ""}`,
      style: { ...el.props.style, transitionDelay: `${delay}ms` },
    });
  });

  return (
    <div
      ref={ref}
      className={`stagger-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {styled}
    </div>
  );
}
