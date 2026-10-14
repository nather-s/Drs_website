"use client";

import { useEffect, useRef, useState } from "react";
import { siteHref } from "@/lib/href";

// Quick exit for sensitive pages, based on the GOV.UK "Exit this page" component.
// Pressing the button (or Shift three times) blanks the screen and replaces this page
// with a neutral site, so Back doesn't return here. It cannot erase browsing history;
// the browsing-safety page explains that.
const DESTINATION = "https://www.bbc.com/weather";

export default function ExitPage() {
  const [leaving, setLeaving] = useState(false);
  const presses = useRef<number[]>([]);

  const exit = () => {
    setLeaving(true);
    window.location.replace(DESTINATION);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Shift" || e.repeat) return;
      const now = Date.now();
      presses.current = [...presses.current.filter((t) => now - t < 5000), now];
      if (presses.current.length >= 3) exit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="fixed right-3 bottom-[84px] z-40 grid justify-items-end gap-1 md:right-6 md:bottom-6">
        <a
          className="inline-flex min-h-11 items-center rounded-md bg-ink px-4 font-semibold text-paper no-underline shadow-lg hover:bg-black"
          href={DESTINATION}
          onClick={(e) => {
            e.preventDefault();
            exit();
          }}
          rel="nofollow noreferrer"
        >
          Exit this page
        </a>
        <a className="rounded bg-paper/90 px-1.5 text-xs text-muted-ink underline" href={siteHref("/browsing-safely/")}>
          Browsing safely
        </a>
      </div>
      {leaving && <div aria-hidden className="fixed inset-0 z-[100] bg-paper" />}
    </>
  );
}
