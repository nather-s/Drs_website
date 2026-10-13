"use client";

/**
 * Patient review stack.
 * Adapted from Kokonut UI "Card Stack" by @dorianbaffier (MIT, https://kokonutui.com).
 * Changed from a fan-out product stack to a deck that cycles reviews to the front.
 */

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Review } from "@/lib/clinic";
import { cn } from "@/lib/utils";

function Stars() {
  return (
    <span aria-label="5 out of 5 stars" className="tracking-[2px] text-star" role="img">
      ★★★★★
    </span>
  );
}

export default function ReviewStack({ items }: { items: Review[] }) {
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const reducedMotion = useReducedMotion() ?? false;

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  const front = items[order[0]];

  return (
    <div className="grid gap-6">
      <div className="relative mx-auto min-h-[340px] w-full max-w-[460px] sm:min-h-[300px]">
        {items.map((review, index) => {
          const depth = order.indexOf(index);
          const isFront = depth === 0;
          return (
            <motion.article
              animate={{
                y: depth * 14,
                rotate: depth * 1.2,
                scale: 1 - depth * 0.05,
                opacity: depth > 2 ? 0 : 1,
              }}
              aria-hidden={!isFront}
              className={cn(
                "absolute inset-x-0 top-0 flex min-h-full flex-col gap-4 rounded-2xl border border-line bg-surface p-6",
                "shadow-[0_8px_20px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgb(0,0,0,0.3)]"
              )}
              initial={false}
              key={review.id}
              style={{ zIndex: items.length - depth }}
              transition={
                reducedMotion
                  ? { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                  : { type: "spring", stiffness: 220, damping: 28, mass: 1 }
              }
            >
              <div className="flex items-center justify-between gap-3">
                <Stars />
                <span className="rounded-full border border-line px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.08em] text-muted-ink">
                  {review.source}
                </span>
              </div>
              <blockquote className="m-0 font-display text-[1.15rem] leading-relaxed">
                “{review.text}”
              </blockquote>
              <footer className="mt-auto flex items-center justify-between gap-3 text-sm text-muted-ink">
                <b className="font-semibold text-ink">{review.name}</b>
                <span>{review.topic}</span>
              </footer>
            </motion.article>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          aria-label="Previous review"
          className="size-11 rounded-full border border-line bg-paper text-lg transition-colors hover:border-ink"
          onClick={prev}
          type="button"
        >
          ←
        </button>
        <p aria-live="polite" className="min-w-[8ch] text-center text-sm tabular-nums text-muted-ink">
          {order[0] + 1} of {items.length}
          <span className="sr-only">: review by {front.name}</span>
        </p>
        <button
          aria-label="Next review"
          className="size-11 rounded-full border border-line bg-paper text-lg transition-colors hover:border-ink"
          onClick={next}
          type="button"
        >
          →
        </button>
      </div>
    </div>
  );
}
