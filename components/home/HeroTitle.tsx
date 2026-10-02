"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function HeroTitle() {
  const reduce = useReducedMotion();
  const lines = ["Build better.", <><em>Run smarter.</em></>, "Grow further."];
  return <h1 className="hero-title">{lines.map((line, index) => <span className="hero-title-line" key={index}><motion.span initial={reduce ? false : { y: "110%" }} animate={reduce ? undefined : { y: 0 }} transition={{ duration: reduce ? 0 : 0.72, delay: reduce ? 0 : 0.13 + index * 0.11, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>)}</h1>;
}
