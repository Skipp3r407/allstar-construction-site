"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";

/** Time logo stays fully visible before fade (ms). */
const DISPLAY_MS = 2400;
/** Fade-out duration (ms). */
const FADE_MS = 380;

/**
 * Full-viewport splash with logo (~2.4s + short fade). Skipped when prefers-reduced-motion.
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<"show" | "fade" | "done">("show");

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setPhase("done"));
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t1 = window.setTimeout(() => setPhase("fade"), DISPLAY_MS);
    const t2 = window.setTimeout(() => setPhase("done"), DISPLAY_MS + FADE_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

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

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#111827] motion-reduce:transition-none ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        transitionProperty: "opacity",
        transitionDuration: `${FADE_MS}ms`,
        transitionTimingFunction: "ease-out",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
      aria-hidden
    >
      <div className="logo-splash-inner px-6">
        <Image
          src="/images/logo.png"
          alt=""
          width={720}
          height={288}
          priority
          className="logo-splash-img h-auto w-[min(78vw,420px)] object-contain sm:w-[min(72vw,480px)]"
        />
      </div>
    </div>
  );
}
