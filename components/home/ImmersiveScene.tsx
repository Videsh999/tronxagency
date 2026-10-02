"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";

export default function ImmersiveScene() {
  const scene = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, .48, 1], [1.07, 1, 1.04]);
  const labelY = useTransform(scrollYProgress, [0, .5, 1], [24, 0, -18]);
  const copyOpacity = useTransform(scrollYProgress, [0, .22, .5], [.15, .75, 1]);
  return <section className="immersive-launch" ref={scene} aria-labelledby="immersive-title">
    <div className="immersive-launch-visual"><motion.div className="immersive-landscape" style={{ scale: reduce ? 1 : scale }}><div className="immersive-sky"><span className="immersive-moon" /><i /><i /></div><div className="immersive-ridge ridge-back" /><div className="immersive-ridge ridge-mid" /><div className="immersive-ridge ridge-front" /><div className="immersive-structure"><i /><i /><i /></div><div className="immersive-orbit orbit-a" /><div className="immersive-orbit orbit-b" /><div className="immersive-grain" /></motion.div>
      <div className="immersive-topline"><span>TRONX / IMMERSIVE MEDIA</span><span>360° / CONCEPT EXPERIENCE</span></div>
      <motion.div className="immersive-overprint" style={{ y: reduce ? 0 : labelY, opacity: reduce ? 1 : copyOpacity }}><p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />A different point of view</p><h2 id="immersive-title">Let people experience the place before they arrive.</h2><div className="immersive-services"><span>360° virtual tours</span><span>Google 360°</span><span>FPV / aerial</span></div><a href="#book" aria-label="Ask about immersive media"><ArrowUpRight size={18} /></a></motion.div>
      <div className="immersive-bottomline"><span>CONCEPT VISUAL</span><MoveUpRight size={14} /><span>SCROLL TO LOOK CLOSER</span></div>
    </div>
  </section>;
}
