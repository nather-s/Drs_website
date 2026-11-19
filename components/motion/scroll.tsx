"use client";

import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Slow, soft easing used for every reveal: quick to start, long gentle finish.
const EASE = [0.22, 1, 0.36, 1] as const;

// Everything is rendered visible on the server, so the page reads fine before (or
// without) JavaScript and for people who skim. After the page loads, only content that
// is still below the screen is hidden and then revealed as it scrolls into view, so
// nothing on screen ever blinks out. Reduced-motion users get no animation at all.
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
      controls.set("hidden");
      setArmed(true);
    }
  }, [controls, reduce]);

  useEffect(() => {
    if (armed && inView) controls.start("shown");
  }, [armed, inView, controls]);

  return { ref, controls };
}

/** Fades and rises into place, with a slight blur that clears. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "figure";
}) {
  const { ref, controls } = useReveal<HTMLDivElement>();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      animate={controls}
      className={className}
      initial={false}
      ref={ref}
      transition={{ duration: 1.2, ease: EASE, delay }}
      variants={{
        hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
        shown: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Title words rise one after another from behind a mask, with a slight tilt that
 * straightens as they settle, like type being set.
 */
export function RevealLines({
  lines,
  className,
  as = "h2",
  id,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  const { ref, controls } = useReveal<HTMLHeadingElement>();
  const Tag = as;
  let n = 0;
  const word = (content: ReactNode, key: string) => {
    const i = n++;
    return (
      <span className="inline-block overflow-hidden pb-[0.1em] align-bottom" key={key}>
        <motion.span
          animate={controls}
          className="inline-block origin-bottom-left"
          initial={false}
          transition={{ duration: 1.15, ease: EASE, delay: i * 0.07 }}
          variants={{ hidden: { y: "110%", rotate: 5 }, shown: { y: "0%", rotate: 0 } }}
        >
          {content}
        </motion.span>
      </span>
    );
  };
  return (
    <Tag className={className} id={id} ref={ref}>
      {lines.map((line, li) => (
        <span className="block" key={li}>
          {typeof line === "string"
            ? line.split(" ").flatMap((w, wi) => [wi > 0 ? " " : null, word(w, `${li}-${wi}`)])
            : word(line, `${li}`)}
        </span>
      ))}
    </Tag>
  );
}

/**
 * A photo whose frame opens up in step with the scroll, from a smaller window to full
 * size while the picture settles from a slight zoom, then drifts against the scroll.
 * Because it follows the scroll rather than a timer, it feels weighted and unhurried.
 */
export function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(enter, [0, 1], reduce ? [0, 0] : [16, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v * 0.75}% ${v}% ${v * 0.75}%)`);
  const scale = useTransform(enter, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  const y = useTransform(pass, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <motion.div className={cn("relative overflow-hidden", className)} ref={ref} style={{ clipPath }}>
      <motion.div className="absolute inset-[-7%_0]" style={{ y }}>
        <motion.img
          alt={alt}
          className={cn("size-full object-cover", imgClassName)}
          height={height}
          loading={priority ? "eager" : "lazy"}
          src={src}
          style={{ scale }}
          width={width}
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * A sentence whose words light up one by one as it scrolls through the screen,
 * so it reads at the pace of the scroll. Screen readers get the plain sentence.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, still ? [1, 1] : [0.18, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}

/** Moves at a different speed from the page, for depth. */
export function Parallax({
  children,
  className,
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [distance, -distance]);
  return (
    <motion.div className={className} ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

/** Hero words drift up and fade as the page scrolls away from them. */
export function HeroContent({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], reduce ? [1, 1] : [1, 0]);
  return (
    <motion.div className={className} ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

/** Full-width photo band whose image moves slower than the page. */
export function ParallaxBand({
  src,
  children,
  className,
}: {
  src: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);
  return (
    <div className={cn("relative overflow-hidden", className)} ref={ref}>
      <motion.img
        alt=""
        className="absolute inset-x-0 top-[-14%] h-[128%] w-full object-cover"
        loading="lazy"
        src={src}
        style={{ y }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/** The hero photo: slow push-in as the page scrolls away, and a soft lift. */
export function HeroPhoto({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  return (
    <div className="hero-photo-in absolute inset-0 overflow-hidden" ref={ref}>
      <motion.img
        alt={alt}
        className="size-full object-cover object-[70%_center]"
        fetchPriority="high"
        src={src}
        style={{ y, scale }}
      />
    </div>
  );
}

/** A row of photos that glides sideways as you scroll past it. */
export function DriftRow({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-14%"]);
  return (
    <div className={cn("overflow-hidden", className)} ref={ref}>
      <motion.div className="flex w-max gap-3 sm:gap-4" style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}

/** A thin line across the top of the screen that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gold"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
