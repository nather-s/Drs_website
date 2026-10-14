"use client";

import { useEffect, useRef, useState } from "react";
import { siteHref } from "@/lib/href";

// Quick exit for sensitive pages, based on the GOV.UK "Exit this page" component.
// - The button (or Shift pressed three times on its own) blanks the screen, clears the
//   tab title and replaces this page with a neutral site, so Back doesn't return here.
// - Same-page links (contents, skip link) replace the history entry instead of adding
//   one, so there are no extra entries for this page left behind.
// - The referrer is dropped, so the destination isn't told where the visitor came from.
// It cannot erase browsing history; the browsing-safety page explains that.
const DESTINATION = "https://www.bbc.com/weather";

function leave() {
  document.title = "Weather";
  const meta = document.createElement("meta");
  meta.name = "referrer";
  meta.content = "no-referrer";
  document.head.appendChild(meta);
  window.location.replace(DESTINATION);
}

export default function ExitPage() {
  const [leaving, setLeaving] = useState(false);
  const presses = useRef<number[]>([]);

  const exit = () => {
    setLeaving(true);
    leave();
  };

  useEffect(() => {
    // Shift pressed and released on its own three times within 5 seconds. Any other key,
    // or Shift used together with another key (Shift+Tab, capitals), resets the count.
    let shiftAlone = false;
    const isTyping = (t: EventTarget | null) =>
      t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));
    const onDown = (e: KeyboardEvent) => {
      if (e.key === "Shift" && !e.repeat && !e.ctrlKey && !e.altKey && !e.metaKey && !isTyping(e.target)) {
        shiftAlone = true;
      } else {
        shiftAlone = false;
        if (e.key !== "Shift") presses.current = [];
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key !== "Shift" || !shiftAlone) return;
      shiftAlone = false;
      const now = Date.now();
      presses.current = [...presses.current.filter((t) => now - t < 5000), now];
      if (presses.current.length >= 3) exit();
    };
    // Same-page anchor links: scroll and focus without adding a history entry.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      try {
        history.replaceState(history.state, "", `#${id}`);
      } catch {
        // Some embedded previews don't allow changing the address; scrolling still works.
      }
      target.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div className="exit-cluster fixed right-3 bottom-[84px] z-40 grid justify-items-end gap-1 md:right-6 md:bottom-6">
        <a
          className="inline-flex min-h-11 items-center rounded-md bg-ink px-4 font-semibold text-paper no-underline shadow-lg hover:bg-black"
          href={DESTINATION}
          onClick={(e) => {
            e.preventDefault();
            exit();
          }}
          referrerPolicy="no-referrer"
          rel="nofollow noreferrer"
        >
          Exit this page
        </a>
        <a className="inline-flex min-h-7 items-center rounded bg-paper/90 px-2 text-xs text-muted-ink underline" href={siteHref("/browsing-safely/")}>
          Browsing safely
        </a>
      </div>
      {leaving && <div aria-hidden className="fixed inset-0 z-[100] bg-paper" />}
    </>
  );
}
