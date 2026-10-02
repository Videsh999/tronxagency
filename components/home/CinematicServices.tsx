"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Bot, Building2, Globe2, HeartPulse, MapPin, MessageSquareText, MoveUpRight, Nfc, Video, Workflow } from "lucide-react";
import { services } from "@/data/services";

const icons = { workflow: Workflow, message: MessageSquareText, map: MapPin, nfc: Nfc, media: Video, web: Globe2, software: Building2, health: HeartPulse, growth: MoveUpRight } as const;

function interpolate(value: number, input: number[], output: number[]) {
  if (value <= input[0]) return output[0];
  for (let index = 1; index < input.length; index += 1) {
    if (value <= input[index]) {
      const span = input[index] - input[index - 1];
      const amount = span === 0 ? 1 : (value - input[index - 1]) / span;
      return output[index - 1] + (output[index] - output[index - 1]) * amount;
    }
  }
  return output[output.length - 1];
}

function ServiceObject({ index }: { index: number }) {
  const patterns = ["nodes", "reviews", "local", "identity", "tour", "web", "system", "care", "growth"];
  const pattern = patterns[index];
  if (pattern === "nodes") return <div className="object-nodes"><i /><i /><i /><i /><i /><span /><span /></div>;
  if (pattern === "reviews") return <div className="object-reviews"><div className="object-stars">★★★★★</div><strong>Good to hear<br />from you.</strong><i /><i /><i /></div>;
  if (pattern === "local") return <div className="object-map"><span /><span /><span /><span /><i className="map-pin-shape"><MapPin size={22} /></i></div>;
  if (pattern === "identity") return <div className="object-identity"><span>T.</span><small>TRONX / CONNECT</small><strong>Make a<br />connection.</strong><Nfc size={23} /></div>;
  if (pattern === "tour") return <div className="object-tour"><div className="tour-ring ring-one" /><div className="tour-ring ring-two" /><span>360°</span></div>;
  if (pattern === "web") return <div className="object-browser"><div className="browser-bar"><i /><i /><i /></div><strong>Make a place<br />on the web.</strong><div className="browser-block" /><i className="browser-line" /></div>;
  if (pattern === "system") return <div className="object-system"><div className="system-sidebar"><i /><i /><i /><i /></div><div className="system-content"><small>WORKSPACE / OVERVIEW</small><strong>A clearer view<br />of the day.</strong><div className="system-counters"><i /><i /><i /></div><div className="system-graph"><b /><b /><b /><b /><b /><b /></div></div></div>;
  if (pattern === "care") return <div className="object-care"><HeartPulse size={24} /><span>CARE, MADE CLEAR.</span><strong>A simpler<br />digital visit.</strong><div><i /><i /><i /></div></div>;
  return <div className="object-growth"><small>LOCAL PRESENCE</small><strong>Good work,<br />more visible.</strong><div className="growth-columns"><i /><i /><i /><i /><i /><i /><i /></div></div>;
}

function CapabilityScene({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const span = 1 / services.length;
  const start = index * span - .025;
  const end = (index + 1) * span + .025;
  const opacity = useTransform(progress, (value) => interpolate(value, [start, start + .045, end - .05, end], [0, 1, 1, 0]));
  const y = useTransform(progress, (value) => interpolate(value, [start, start + .06, end - .04, end], [34, 0, 0, -30]));
  const scale = useTransform(progress, (value) => interpolate(value, [start, start + .07, end - .04, end], [.965, 1, 1, .98]));
  const [active, setActive] = useState(index === 0);
  useMotionValueEvent(opacity, "change", (value) => setActive(value > .62));
  const service = services[index];
  const Icon = icons[service.icon];
  return <motion.article className="capability-scene" style={{ opacity, y, scale }} aria-label={`${service.number} ${service.title}`} aria-hidden={!active} inert={!active}>
    <div className="capability-copy"><span className="capability-index">{service.number}<i />09</span><p className="launch-kicker">TRONX CAPABILITY</p><h3>{service.title}</h3><p className="capability-description">{service.description}</p><a href="#book" className="text-button">Explore this capability <ArrowUpRight size={16} /></a></div>
    <div className="capability-visual"><div className="capability-object-frame"><div className="capability-object-top"><span><Icon size={15} />{service.title.toUpperCase()}</span><span>TRONX / CONCEPT</span></div><ServiceObject index={index} /><div className="capability-object-bottom"><span>BUILT AROUND THE BUSINESS</span><span>{service.number} / 09</span></div></div><div className="object-shadow" /></div>
  </motion.article>;
}

function StaticServices() {
  return <div className="service-static-list">{services.map((service) => <article key={service.number}><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><a href="#book" aria-label={`Ask about ${service.title}`}><ArrowUpRight size={17} /></a></article>)}</div>;
}

export default function CinematicServices() {
  const track = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <section id="services" className="services-launch-section">
    <div className="container services-launch-heading"><p className="eyebrow"><span className="eyebrow-mark" />A connected digital ecosystem</p><h2>What we build</h2><p>Explore the tools, experiences, software and growth systems that can move a business forward.</p><div className="sr-only"><h3>TRONX capabilities</h3><ul>{services.map((service) => <li key={service.number}><strong>{service.title}.</strong> {service.description}</li>)}</ul></div></div>
    {reduce ? <div className="container"><StaticServices /></div> : <div className="service-scroll-track" ref={track}><div className="service-sticky-stage"><div className="service-progress"><span>CAPABILITIES</span><motion.i style={{ width: progressWidth }} /><span>01 — 09</span></div>{services.map((service, index) => <CapabilityScene key={service.number} index={index} progress={scrollYProgress} />)}<div className="service-scroll-hint"><ArrowDown size={13} /> SCROLL TO MOVE THROUGH THE ECOSYSTEM</div></div></div>}
  </section>;
}
