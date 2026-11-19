"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// Gentle, weighted scrolling for mouse wheels and trackpads (Lenis). Touch screens keep
// their own native scrolling, and it is switched off for anyone who prefers reduced
// motion. Links to a section on the same page glide there too.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, anchors: true, autoRaf: true });
    // Exposed so code that jumps the page (the design preview's page switcher) can tell it.
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}
