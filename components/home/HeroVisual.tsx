"use client";

import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Bot, Check, Layers3, Nfc, Smartphone, Workflow, Zap } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

export default function HeroVisual() {
  const scene = useRef<HTMLDivElement>(null);
  const reset = () => {
    const el = scene.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0px");
    el.style.setProperty("--tilt-y", "0px");
  };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const el = scene.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", `${x * 9}px`);
    el.style.setProperty("--tilt-y", `${y * 9}px`);
  };

  return <Reveal className="hero-art"><div className="art-topline"><span>CONNECTED BY DESIGN</span><span>01 — 04</span></div><div className="hero-composition" onPointerMove={move} onPointerLeave={reset}>
    <div ref={scene} className="hero-parallax-scene">
      <div className="hero-glow" />
      <div className="hero-glass-frame"><div className="hero-glass-reflection" /><div className="hero-board">
        <div className="board-header"><span className="board-dot" /><span>YOUR BUSINESS, IN SYNC</span><span>•••</span></div>
        <div className="board-title">Good ideas,<br />put to work.</div>
        <div className="board-pills"><span><Workflow size={13} /> Process</span><span><Smartphone size={13} /> Experience</span></div>
        <div className="board-connection"><i /><span /><i /></div>
        <div className="board-footer"><span>Digital tools</span><ArrowUpRight size={16} /></div>
      </div></div>
      <div className="floating-card nfc-float hero-float"><div className="float-top"><span>TRONX / CONNECT</span><Nfc size={16} /></div><div className="float-name">A better<br />first hello.</div><span className="float-card-foot">SMART IDENTITY</span></div>
      <div className="floating-card menu-float-card hero-float"><span className="tiny-eyebrow">FIELD & FLOUR · MENU</span><div className="tiny-food">◉</div><div className="tiny-caption"><span>Discover today’s menu</span><ArrowUpRight size={13} /></div></div>
      <div className="floating-card workflow-float hero-float"><div className="workflow-icon"><Zap size={15} /></div><div><strong>Make room<br />for the work.</strong><small>AUTOMATION</small></div></div>
      <div className="floating-card software-float hero-float"><span className="software-float-icon"><Layers3 size={14} /></span><span><small>SOFTWARE</small><b>One clear view.</b></span></div>
      <div className="floating-card growth-float hero-float"><Bot size={14} /><span><small>GROWTH</small><b>Thoughtful by design</b></span><Check size={12} /></div>
      <div className="art-index">IDEAS IN MOTION <ArrowDownRight size={13} /></div>
    </div>
  </div></Reveal>;
}
