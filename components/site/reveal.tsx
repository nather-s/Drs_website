"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Content stays visible at rest; it only rises a little as it enters view.
export default function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 24 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      whileInView={{ y: 0 }}
    >
      {children}
    </motion.div>
  );
}
