"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";
import type { Review } from "@/lib/clinic";

// Reviews scroll continuously. Hovering pauses them, and a button pauses them for
// keyboard and touch users. The list is repeated so the strip always fills wide
// screens and loops without a jump; only the first copy is read by screen readers,
// and the repeats are hidden when reduced motion is on.
const MIN_CARDS_PER_LOOP = 8;

export default function ReviewMarquee({ items }: { items: Review[] }) {
  const [paused, setPaused] = useState(false);
  const repeats = Math.max(1, Math.ceil(MIN_CARDS_PER_LOOP / items.length));
  const loop = Array.from({ length: repeats }, () => items).flat();
  const cards = [...loop, ...loop];

  return (
    <div className="grid gap-4">
      <div
        className={`marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${paused ? "is-paused" : ""}`}
        style={{ ["--marquee-duration" as string]: `${loop.length * 9}s` }}
      >
        <ul aria-label="Patient reviews" className="marquee-track m-0 flex w-max list-none gap-5 p-0 py-1 pr-5">
          {cards.map((r, i) => {
            const isCopy = i >= items.length;
            return (
              <li
                aria-hidden={isCopy || undefined}
                className={`flex w-[300px] shrink-0 flex-col gap-3 rounded-lg border border-line bg-paper p-5 sm:w-[360px] ${isCopy ? "marquee-copy" : ""}`}
                key={`${r.id}-${i}`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-ink">{r.source} review</span>
                <blockquote className="m-0 text-[0.98rem] leading-relaxed">“{r.text}”</blockquote>
                <footer className="mt-auto flex justify-between gap-3 border-t border-line pt-3 text-sm">
                  <b className="font-semibold">{r.name}</b>
                  <span className="text-muted-ink">{r.topic}</span>
                </footer>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="wrap flex justify-end motion-reduce:hidden">
        <button
          aria-pressed={paused}
          className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm text-muted-ink hover:border-ink hover:text-ink"
          onClick={() => setPaused((p) => !p)}
          type="button"
        >
          {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
          {paused ? "Play reviews" : "Pause reviews"}
        </button>
      </div>
    </div>
  );
}
