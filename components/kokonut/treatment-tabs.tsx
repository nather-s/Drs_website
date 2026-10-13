"use client";

/**
 * Treatment categories as tabs.
 * Adapted from Kokonut UI "Smooth Tab" by @dorianbaffier (MIT, https://kokonutui.com).
 * Changes: tab list above the panel, scrollable on phones, clinic palette,
 * panel holds a list of treatment links instead of a single card.
 */

import {
  AnimatePresence,
  motion,
  type Transition,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { type KeyboardEvent, useId, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Treatment = { name: string; blurb: string; href: string };
export type TreatmentGroup = { id: string; title: string; intro: string; items: Treatment[] };

const SLIDE_DISTANCE = 16;
const slideVariants = {
  enter: (offset: number) => ({ x: offset, opacity: 0, filter: "blur(2px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (offset: number) => ({ x: -offset, opacity: 0, filter: "blur(2px)" }),
} satisfies Variants;
const transition: Transition = { duration: 0.25, ease: [0.32, 0.72, 0, 1] };
const indicatorTransition: Transition = { type: "spring", stiffness: 400, damping: 30 };

export default function TreatmentTabs({ groups }: { groups: TreatmentGroup[] }) {
  const [selected, setSelected] = useState(groups[0].id);
  const [previous, setPrevious] = useState(selected);
  const [direction, setDirection] = useState(0);
  const [indicator, setIndicator] = useState<{ width: number; left: number } | null>(null);
  const reduce = useReducedMotion();
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const listRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  if (selected !== previous) {
    const indexOf = (id: string) => groups.findIndex((g) => g.id === id);
    setPrevious(selected);
    setDirection(indexOf(selected) > indexOf(previous) ? 1 : -1);
  }
  const slideOffset = reduce ? 0 : direction * SLIDE_DISTANCE;

  useLayoutEffect(() => {
    const list = listRef.current;
    const button = buttons.current.get(selected);
    if (!(list && button)) return;
    const measure = () =>
      setIndicator((c) =>
        c?.width === button.offsetWidth && c.left === button.offsetLeft
          ? c
          : { width: button.offsetWidth, left: button.offsetLeft }
      );
    measure();
    // Keep the selected tab visible in the horizontally scrolling row
    // without moving the page itself.
    const scroller = list.parentElement;
    if (scroller) {
      const left = button.offsetLeft - 16;
      const right = button.offsetLeft + button.offsetWidth + 16 - scroller.clientWidth;
      if (scroller.scrollLeft > left) scroller.scrollLeft = left;
      else if (scroller.scrollLeft < right) scroller.scrollLeft = right;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [selected]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const n = groups.length;
    const next =
      e.key === "ArrowRight" ? (index + 1) % n
      : e.key === "ArrowLeft" ? (index - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : null;
    if (next === null) return;
    e.preventDefault();
    buttons.current.get(groups[next].id)?.focus();
    setSelected(groups[next].id);
  };

  const index = groups.findIndex((g) => g.id === selected);
  const group = groups[index];
  const panelId = `${baseId}-panel`;

  return (
    <div className="grid gap-5">
      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
        <div
          aria-label="Treatment categories"
          className="relative inline-flex min-w-full gap-1 rounded-full border border-line bg-surface p-1 sm:min-w-0"
          ref={listRef}
          role="tablist"
        >
          {indicator && (
            <motion.div
              animate={{ width: indicator.width, x: indicator.left - 4 }}
              className="absolute top-1 bottom-1 left-1 z-[1] rounded-full bg-ink"
              initial={false}
              transition={reduce ? { duration: 0 } : indicatorTransition}
            />
          )}
          {groups.map((g, i) => {
            const isSelected = g.id === selected;
            return (
              <button
                aria-controls={isSelected ? panelId : undefined}
                aria-selected={isSelected}
                className={cn(
                  "relative z-[2] whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150 motion-safe:active:scale-[0.97]",
                  isSelected ? "text-paper" : "text-muted-ink hover:text-ink"
                )}
                id={`${baseId}-tab-${i}`}
                key={g.id}
                onClick={() => setSelected(g.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                ref={(el) => {
                  if (el) buttons.current.set(g.id, el);
                  else buttons.current.delete(g.id);
                }}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                {g.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        aria-labelledby={`${baseId}-tab-${index}`}
        className="relative overflow-hidden"
        id={panelId}
        role="tabpanel"
      >
        <AnimatePresence custom={slideOffset} initial={false} mode="popLayout">
          <motion.div
            animate="center"
            custom={slideOffset}
            exit="exit"
            initial="enter"
            key={group.id}
            transition={transition}
            variants={slideVariants}
          >
            <p className="mb-4 max-w-[62ch] text-muted-ink">{group.intro}</p>
            <ul className="m-0 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-line p-0 sm:grid-cols-2">
              {group.items.map((t) => (
                <li className="min-w-0 bg-paper" key={t.name}>
                  <a
                    className="group grid h-full gap-1 p-5 no-underline transition-colors hover:bg-surface"
                    href={t.href}
                  >
                    <span className="flex items-baseline justify-between gap-3 font-display text-[1.2rem]">
                      {t.name}
                      <span
                        aria-hidden
                        className="font-sans text-accent transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                    <span className="text-sm text-muted-ink">{t.blurb}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
