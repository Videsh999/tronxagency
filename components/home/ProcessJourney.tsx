"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const steps = [
  { number: "01", title: "Understand", description: "Get to know the business, the people and the problem." },
  { number: "02", title: "Plan", description: "Agree on a clear direction and what matters first." },
  { number: "03", title: "Build", description: "Shape the right digital tool, experience or system." },
  { number: "04", title: "Launch", description: "Put it into use and make room for what comes next." },
];

function ProcessStep({ index, progress }: { index: number; progress: import("framer-motion").MotionValue<number> }) {
  const start = index / steps.length;
  const end = (index + 1) / steps.length;
  const opacity = useTransform(progress, [start, start + .09, end - .06, end], [.42, 1, 1, .48]);
  const x = useTransform(progress, [start, start + .12, end], [20, 0, -5]);
  const step = steps[index];
  return <motion.article className="process-launch-step" style={{ opacity, x }}><span className="process-launch-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><span className="process-launch-indicator" /></motion.article>;
}

export default function ProcessJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <section id="process" className="process-launch-section">
    <div className="container process-launch-heading"><p className="eyebrow"><span className="eyebrow-mark" />A clear path forward</p><h2>How we work</h2><p>A considered process, from the first question to putting something useful into the world.</p></div>
    {reduce ? <div className="container process-static-list">{steps.map((step) => <div key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div> : <div className="process-scroll-track" ref={ref}><div className="process-sticky-path"><div className="process-path-line"><motion.i style={{ scaleY: lineScale }} /></div><div className="process-steps-list">{steps.map((step, index) => <ProcessStep key={step.number} index={index} progress={scrollYProgress} />)}</div><span className="process-scroll-note"><ArrowDown size={13} /> MOVE THROUGH THE PROCESS</span></div></div>}
  </section>;
}
