"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/** Time logo stays fully visible before auto-advance (ms). */
const DISPLAY_MS = 2400;
/** Fade-out duration (ms). */
const FADE_MS = 420;

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Light, premium splash: white canvas, subtle motion, skip + progress, optional cursor parallax.
 */
export function LoadingScreen() {
  const prefersReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const autoFadeRef = useRef<number | undefined>(undefined);
  const autoDoneRef = useRef<number | undefined>(undefined);
  const skipFadeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (prefersReduced) return;

    autoFadeRef.current = window.setTimeout(() => setPhase("fade"), DISPLAY_MS);
    autoDoneRef.current = window.setTimeout(() => setPhase("done"), DISPLAY_MS + FADE_MS);

    return () => {
      if (autoFadeRef.current) window.clearTimeout(autoFadeRef.current);
      if (autoDoneRef.current) window.clearTimeout(autoDoneRef.current);
    };
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const max = 10;
      setParallax({
        x: ((e.clientX - cx) / cx) * max,
        y: ((e.clientY - cy) / cy) * max,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReduced]);

  useEffect(() => {
    if (phase === "show" || phase === "fade") {
      document.body.dataset.splashLock = "1";
      document.body.style.overflow = "hidden";
    } else {
      delete document.body.dataset.splashLock;
      document.body.style.overflow = "";
    }
    return () => {
      delete document.body.dataset.splashLock;
      document.body.style.overflow = "";
    };
  }, [phase]);

  const finishFade = useCallback(() => {
    setPhase("done");
  }, []);

  const handleSkip = useCallback(() => {
    if (autoFadeRef.current) window.clearTimeout(autoFadeRef.current);
    if (autoDoneRef.current) window.clearTimeout(autoDoneRef.current);
    if (skipFadeRef.current) window.clearTimeout(skipFadeRef.current);
    setPhase("fade");
    skipFadeRef.current = window.setTimeout(finishFade, FADE_MS);
  }, [finishFade]);

  if (prefersReduced) return null;
  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-white motion-reduce:transition-none ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "#ffffff",
        transitionProperty: "opacity",
        transitionDuration: `${FADE_MS}ms`,
        transitionTimingFunction: "ease-out",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
      role="presentation"
      aria-hidden
    >
      <div
        className="relative z-10 flex flex-col items-center px-6"
        style={{
          transform:
            phase === "fade" ? undefined : `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div
          className="splash-logo-frame relative rounded-2xl p-[2px] motion-reduce:p-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,160,23,0.45), rgba(212,160,23,0.12), rgba(31,41,55,0.08))",
            boxShadow: "0 25px 60px -20px rgba(17,24,39,0.12)",
          }}
        >
          <div className="splash-ring-inner rounded-[14px] bg-white p-6 sm:rounded-[14px] sm:p-8">
            <Image
              src="/images/logo.png"
              alt=""
              width={720}
              height={288}
              priority
              className="logo-splash-img h-auto w-[min(78vw,400px)] object-contain sm:w-[min(72vw,440px)]"
            />
          </div>
        </div>

        <p className="mt-6 flex items-center text-sm font-medium tracking-wide text-[#6b7280]">
          <span>Loading experience</span>
          <span className="inline-flex pl-0.5" aria-hidden>
            <span className="splash-dot">.</span>
            <span className="splash-dot">.</span>
            <span className="splash-dot">.</span>
          </span>
        </p>

        <button
          type="button"
          onClick={handleSkip}
          className="mt-5 min-h-[44px] rounded-full border border-[#d4a017]/40 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#1f2937] shadow-sm transition-all duration-200 hover:border-[#d4a017] hover:bg-[#fffef8] hover:text-[#d4a017] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017] active:scale-[0.98]"
        >
          Skip
        </button>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-[#e5e7eb]/90">
        <div
          className="splash-progress-bar h-full origin-left bg-gradient-to-r from-[#d4a017] to-[#c49212]"
          style={{ "--splash-ms": `${DISPLAY_MS}ms` } as CSSProperties}
        />
      </div>
    </div>
  );
}
