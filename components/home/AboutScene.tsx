import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const principles = [
  { number: "01", title: "Understand", copy: "Start with how the business works and where it could work better." },
  { number: "02", title: "Build what matters", copy: "Focus on the right tools and experiences for the actual problem." },
  { number: "03", title: "Make it easier", copy: "Create useful digital systems people can carry forward." },
];

export default function AboutScene() {
  return <section id="about" className="about-launch-section"><div className="container">
    <Reveal><p className="eyebrow"><span className="eyebrow-mark" />A practical point of view</p><h2 className="about-launch-title"><span>Technology should solve</span><span>business problems,</span><em>not create new ones.</em></h2></Reveal>
    <div className="about-launch-lower"><Reveal className="about-launch-copy"><p>Good technology starts with understanding the people, processes and ambitions behind a business. Then it gets out of the way and helps make meaningful work easier.</p><span>That’s where TRONX begins.</span></Reveal><div className="about-principles">{principles.map((principle, index) => <Reveal key={principle.number} delay={index * .1} effect="horizontal"><article><span>{principle.number}</span><div><h3>{principle.title}</h3><p>{principle.copy}</p></div><ArrowUpRight size={16} /></article></Reveal>)}</div></div>
  </div></section>;
}
