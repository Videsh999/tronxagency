import { ArrowUpRight, Bot, Building2, Layers3, Sparkles } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const reasons = [
  { title: "Business-first thinking", copy: "Begin with what your business needs to do.", icon: Building2 },
  { title: "One team across digital", copy: "Bring experiences, software and growth into the same conversation.", icon: Layers3 },
  { title: "Built to evolve", copy: "Create a useful foundation with space to grow.", icon: Sparkles },
  { title: "Practical technology", copy: "Use the right tools for the work at hand.", icon: Bot },
];

export default function WhyScene() {
  return <section className="why-launch-section"><div className="container why-launch-layout"><Reveal className="why-launch-intro"><p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />A way of working</p><h2>Why TRONX</h2><p className="why-statement">Technology is most useful when it fits the people and purpose behind it.</p><a className="button button-glass" href="#book">Start a conversation <ArrowUpRight size={16} /></a></Reveal><div className="why-launch-list">{reasons.map((reason, index) => { const Icon = reason.icon; return <Reveal key={reason.title} delay={index * .08} effect="horizontal"><article><span className="why-launch-icon"><Icon size={17} /></span><div><h3>{reason.title}</h3><p>{reason.copy}</p></div><ArrowUpRight size={15} /></article></Reveal>; })}</div></div></section>;
}
