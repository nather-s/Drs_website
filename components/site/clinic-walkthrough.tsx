"use client";

import { createTimeline, onScroll, svg } from "animejs";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ROUTE =
  "M60 410 L60 310 L300 310 L300 150 L320 150 L320 305 L480 305 L480 330";

const STAGES = [
  {
    room: "Reception",
    title: "Book, check in, and settle in privately.",
    body: "Book online, on WhatsApp or by phone. Most of the clinic's staff are women, and every conversation stays confidential. Same-day slots are often available for urgent concerns.",
    photo: "the reception desk and waiting area",
  },
  {
    room: "Consultation room",
    title: "Sit down with Dr. Shilpa.",
    body: "She starts with your history and your questions. Patients often mention that she explains things thoroughly and avoids medicines you don't need.",
    points: [
      "Gold medals in MBBS and MD",
      "Over 15 years in obstetrics and gynaecology",
      "Former Assistant Professor, Grant Medical College & Sir JJ Group of Hospitals",
    ],
    photo: "Dr. Shilpa in her consultation room",
  },
  {
    room: "Procedure suite",
    title: "Where treatment happens.",
    body: "Colposcopy, Pap smears, cosmetic gynaecology and minor procedures take place at the clinic. Laparoscopic and hysteroscopic surgery and deliveries take place at Dr. Shilpa's partner hospitals.",
    photo: "the procedure suite",
  },
];

// Share of the route at which each room is reached.
const STOPS = [0.2, 0.62];

export default function ClinicWalkthrough() {
  const sectionRef = useRef<HTMLElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const [active, setActive] = useState(0);
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !sectionRef.current || !routeRef.current || !dotRef.current) {
      return;
    }
    setEnhanced(true);
    const route = routeRef.current;
    const tl = createTimeline({
      defaults: { ease: "linear", duration: 1000 },
      autoplay: onScroll({
        target: sectionRef.current,
        enter: "top top",
        leave: "bottom bottom",
        sync: 0.4,
      }),
      onUpdate: (self) => {
        const p = self.progress;
        setActive(p < STOPS[0] ? 0 : p < STOPS[1] ? 1 : 2);
      },
    });
    tl.add(svg.createDrawable(route), { draw: ["0 0", "0 1"] }, 0).add(
      dotRef.current,
      { ...svg.createMotionPath(route) },
      0
    );
    return () => {
      tl.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="walk-title"
      className={cn(enhanced ? "h-[300svh]" : "section")}
      id="clinic"
      ref={sectionRef}
    >
      <div
        className={cn(
          "wrap",
          enhanced && "sticky top-0 flex h-svh flex-col justify-center pt-24 pb-20 md:pt-24 md:pb-10"
        )}
      >
        <div className="mb-6 grid gap-2 md:mb-8">
          <span className="eyebrow">Walk through the clinic</span>
          <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)]" id="walk-title">
            Know where you're going before you arrive.
          </h2>
        </div>

        <div className="grid items-center gap-3 md:grid-cols-[1.05fr_1fr] md:gap-16">
          <svg
            aria-label="Floor plan of the clinic: reception, consultation room and procedure suite"
            className="mx-auto block h-auto w-full max-w-[400px] md:max-w-[560px]"
            role="img"
            viewBox="0 0 600 420"
          >
            {[
              { x: 10, y: 210, w: 230, h: 200 },
              { x: 200, y: 10, w: 220, h: 170 },
              { x: 390, y: 210, w: 200, h: 200 },
            ].map((r, i) => (
              <rect
                className={cn(
                  "stroke-2 transition-[fill,stroke] duration-500",
                  enhanced && active === i
                    ? "fill-rose-soft stroke-accent"
                    : "fill-surface stroke-line"
                )}
                height={r.h}
                key={r.x}
                rx={6}
                width={r.w}
                x={r.x}
                y={r.y}
              />
            ))}
            <g className="fill-none stroke-muted-ink opacity-60" strokeWidth={1.5}>
              <rect height={34} rx={17} width={110} x={40} y={250} />
              <rect height={26} rx={6} width={26} x={40} y={340} />
              <rect height={26} rx={6} width={26} x={76} y={340} />
              <rect height={26} rx={6} width={26} x={112} y={340} />
              <rect height={50} rx={6} width={90} x={240} y={60} />
              <circle cx={285} cy={128} r={12} />
              <circle cx={285} cy={42} r={12} />
              <rect height={100} rx={8} width={44} x={350} y={40} />
              <rect height={110} rx={10} width={80} x={450} y={270} />
              <circle cx={490} cy={248} r={14} />
            </g>
            <g className="fill-muted-ink text-[11px] font-semibold uppercase tracking-[0.12em]">
              <text x={26} y={232}>Reception</text>
              <text x={216} y={32}>Consultation</text>
              <text x={406} y={232}>Procedure suite</text>
              <text className="text-[9px]" x={22} y={402}>▲ Entrance</text>
            </g>
            <path
              className="fill-none stroke-line"
              d={ROUTE}
              strokeDasharray="2 7"
              strokeLinecap="round"
              strokeWidth={3}
            />
            <path
              className="fill-none stroke-accent"
              d={ROUTE}
              ref={routeRef}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
            />
            {/* Drawn at the origin; anime.js moves it along the route. */}
            <g ref={dotRef} style={enhanced ? undefined : { transform: "translate(60px, 410px)" }}>
              <circle className="fill-accent opacity-20" r={16} />
              <circle className="fill-accent" r={7} />
            </g>
          </svg>

          <div>
            <div className={cn("grid gap-10", enhanced && "relative min-h-[340px] md:min-h-[440px]")}>
              {STAGES.map((s, i) => (
                <article
                  aria-hidden={enhanced ? active !== i : undefined}
                  className={cn(
                    "grid gap-3",
                    enhanced &&
                      "absolute inset-x-0 top-0 transition-[opacity,translate] duration-500",
                    enhanced &&
                      (active === i
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-4 opacity-0")
                  )}
                  key={s.room}
                >
                  <span className="font-display italic text-accent">
                    {["First", "Second", "Third"][i]} stop · {s.room}
                  </span>
                  <h3 className="text-[1.4rem]">{s.title}</h3>
                  <p className="max-w-[60ch] text-muted-ink">{s.body}</p>
                  {s.points && (
                    <ul className="m-0 grid list-disc gap-1 pl-5 text-muted-ink">
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  <div
                    className={cn(
                      "rounded-xl border-[1.5px] border-dashed border-line px-3.5 py-3 text-sm text-muted-ink",
                      enhanced && "max-md:hidden"
                    )}
                  >
                    Photo: {s.photo} (to be shot)
                  </div>
                </article>
              ))}
            </div>
            {enhanced && (
              <div aria-hidden className="mt-5 flex gap-1.5">
                {STAGES.map((s, i) => (
                  <i
                    className={cn(
                      "h-[3px] flex-1 rounded transition-colors duration-300",
                      i <= active ? "bg-accent" : "bg-line"
                    )}
                    key={s.room}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
