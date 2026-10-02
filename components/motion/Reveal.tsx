"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({ children, className = "", delay = 0, effect = "default" }: { children: ReactNode; className?: string; delay?: number; effect?: "default" | "image" | "horizontal" }) {
  const reduce = useReducedMotion();
  const initial = effect === "image" ? { opacity: 0, y: 12, scale: 1.045, filter: "blur(8px)" } : effect === "horizontal" ? { opacity: 0, x: 22, filter: "blur(6px)" } : { opacity: 0, y: 26, filter: "blur(7px)" };
  const visible = effect === "image" ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : effect === "horizontal" ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : initial}
      whileInView={reduce ? undefined : visible}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduce ? 0 : 0.68, ease: [0.22, 1, 0.36, 1], delay }}
    >{children}</motion.div>
  );
}
