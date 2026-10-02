"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Bot, Layers3, Menu, Nfc, Workflow } from "lucide-react";

function InterfaceSlab({ label, title, className, icon }: { label: string; title: string; className: string; icon: React.ReactNode }) {
  return <div className={`launch-surface ${className}`}><div className="launch-surface-top">{icon}<span>{label}</span><i>•••</i></div><strong>{title}</strong><div className="launch-surface-lines"><i /><i /><i /></div><ArrowUpRight size={14} className="launch-surface-arrow" /></div>;
}

export default function CinematicHero() {
  const scene = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end end"] });
  const tiltX = useTransform(scrollYProgress, [0, .35, .75, 1], [-6, 0, 3, 0]);
  const tiltY = useTransform(scrollYProgress, [0, .3, .7, 1], [9, 0, -2, 0]);
  const scale = useTransform(scrollYProgress, [0, .35, .78, 1], [.88, 1, 1.11, 1.06]);
  const boardY = useTransform(scrollYProgress, [0, .35, .8, 1], [34, 0, -14, -7]);
  const layerOpacity = useTransform(scrollYProgress, [0, .16, .43, .78], [.1, .28, 1, 1]);
  const layerSpread = useTransform(scrollYProgress, [0, .35, .78, 1], [0, 1, 1.12, 1]);
  const titleY = useTransform(scrollYProgress, [0, .43, .86, 1], [0, -15, -48, -65]);

  return <section className="cinematic-hero" ref={scene} id="top">
    <div className="hero-sticky-stage">
      <div className="container launch-hero-grid">
        <motion.div className="launch-hero-copy" style={{ y: reduce ? 0 : titleY }}>
          <p className="launch-kicker">DIGITAL SOLUTIONS <span /> FOR GROWING BUSINESSES</p>
          <h1 className="launch-title"><span>BUILD BETTER.</span><span>RUN SMARTER.</span><span>GROW FURTHER.</span></h1>
          <p className="launch-description">TRONX builds websites, business software, automation, smart customer experiences and digital growth solutions around the way your business works.</p>
          <div className="launch-actions"><a href="#services" className="button button-dark">Explore services <ArrowUpRight size={16} /></a><a href="#book" className="button button-glass">Start a conversation <ArrowUpRight size={16} /></a></div>
          <div className="launch-scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></div>
        </motion.div>
        <div className="launch-object-wrap" aria-label="TRONX digital services concept illustration">
          <motion.div className="launch-object" style={{ rotateX: reduce ? 0 : tiltX, rotateY: reduce ? 0 : tiltY, scale: reduce ? 1 : scale }}>
            <div className="launch-haze" />
            <motion.div className="launch-main-glass" style={{ y: reduce ? 0 : boardY }}>
              <div className="launch-reflection" />
              <div className="launch-interface-header"><span className="launch-monogram">T</span><span>TRONX / DIGITAL ECOSYSTEM</span><span>01 — 09</span></div>
              <div className="launch-interface-title">One connected<br /><em>way forward.</em></div>
              <div className="launch-workflow-line"><i /><span /><i /><span /><i /></div>
              <div className="launch-interface-foot"><span>TOOLS · EXPERIENCES · SYSTEMS</span><ArrowUpRight size={17} /></div>
            </motion.div>
            <motion.div className="launch-capability-stack" style={{ opacity: reduce ? 1 : layerOpacity, scale: reduce ? 1 : layerSpread }}>
              <InterfaceSlab label="AUTOMATION" title="Work, connected." className="launch-automation" icon={<Workflow size={13} />} />
              <InterfaceSlab label="SMART IDENTITY" title="A better first hello." className="launch-nfc" icon={<Nfc size={13} />} />
              <InterfaceSlab label="DIGITAL MENU" title="Discover something good." className="launch-menu" icon={<Menu size={13} />} />
              <InterfaceSlab label="BUSINESS SOFTWARE" title="A clearer view of work." className="launch-software" icon={<Layers3 size={13} />} />
              <InterfaceSlab label="INTELLIGENT TOOLS" title="Make room for the work." className="launch-growth" icon={<Bot size={13} />} />
            </motion.div>
          </motion.div>
          <div className="launch-object-caption">BUSINESS-FIRST DIGITAL SYSTEMS <span /> TRONX CONCEPT</div>
        </div>
      </div>
    </div>
  </section>;
}
