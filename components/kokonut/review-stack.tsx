"use client";

/**
 * Patient review stack.
 * Adapted from Kokonut UI "Card Stack" by @dorianbaffier (MIT, https://kokonutui.com).
 * Changed from a fan-out product stack to a deck that cycles reviews to the front,
 * restyled for the clinic's editorial look. Only the front card is read by screen readers.
 */

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Review } from "@/lib/clinic";

export default function ReviewStack({ items }: { items: Review[] }) {
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const reducedMotion = useReducedMotion() ?? false;

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);
  const front = items[order[0]];

  return (
    <div className="grid gap-8">
      <div className="relative mx-auto min-h-[360px] w-full max-w-[560px] sm:min-h-[300px]">
        {items.map((review, index) => {
          const depth = order.indexOf(index);
          const isFront = depth === 0;
          return (
            <motion.article
              animate={{
                y: depth * 16,
                rotate: depth === 0 ? 0 : depth % 2 ? 1.6 : -1.4,
                scale: 1 - depth * 0.045,
                opacity: depth > 2 ? 0 : 1,
              }}
              aria-hidden={!isFront}
              className="absolute inset-x-0 top-0 flex min-h-full flex-col gap-5 border border-line bg-paper p-7 shadow-[0_24px_50px_-30px_rgba(47,44,40,0.45)] sm:p-9"
              initial={false}
              key={review.id}
              style={{ zIndex: items.length - depth }}
              transition={
                reducedMotion
                  ? { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                  : { type: "spring", stiffness: 160, damping: 26, mass: 1 }
              }
            >
              <span aria-hidden className="font-display text-6xl leading-[0.5] text-gold">“</span>
              <blockquote className="m-0 font-display text-[1.3rem] italic leading-snug text-plum sm:text-[1.45rem]">
                {review.text}
              </blockquote>
              <footer className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-[0.7rem] uppercase tracking-[0.2em] text-muted-ink">
                <b className="font-medium text-ink">{review.name}</b>
                <span>
                  {review.topic} · {review.source}
                </span>
              </footer>
            </motion.article>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          aria-label="Previous review"
          className="grid size-12 place-items-center rounded-full border border-plum/40 text-plum transition-colors hover:bg-plum hover:text-paper"
          onClick={prev}
          type="button"
        >
          <ArrowLeft aria-hidden className="size-4" />
        </button>
        <p aria-live="polite" className="min-w-[8ch] text-center text-[0.72rem] uppercase tracking-[0.2em] tabular-nums text-muted-ink">
          {order[0] + 1} / {items.length}
          <span className="sr-only">: review by {front.name}</span>
        </p>
        <button
          aria-label="Next review"
          className="grid size-12 place-items-center rounded-full border border-plum/40 text-plum transition-colors hover:bg-plum hover:text-paper"
          onClick={next}
          type="button"
        >
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
