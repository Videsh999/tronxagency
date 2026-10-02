import { ArrowUpRight, MapPin, Nfc } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

function GalleryVisual({ visual }: { visual: string }) {
  if (visual === "menu") return <div className="gallery-art gallery-menu"><div className="gallery-field"><span>FIELD<br />& FLOUR</span><small>MENU / TRONX DEMO</small></div><div className="gallery-dish"><span>●</span><i /><i /><i /></div><div className="gallery-menu-lines"><b /><b /><b /><i /></div></div>;
  if (visual === "card") return <div className="gallery-art gallery-card"><div className="gallery-identity"><span>T.</span><small>SMART IDENTITY</small><strong>Make a<br />connection.</strong><Nfc size={22} /></div><div className="gallery-reflect" /></div>;
  if (visual === "dashboard") return <div className="gallery-art gallery-dashboard"><div className="gallery-dash-window"><aside><i /><i /><i /><i /></aside><div><small>WORKSPACE / OVERVIEW</small><strong>A clearer view<br />of the day.</strong><span /><span /><span /><div className="gallery-chart"><i /><i /><i /><i /><i /><i /></div></div></div></div>;
  if (visual === "place") return <div className="gallery-art gallery-place"><div className="gallery-landscape"><i /><i /><i /></div><div className="gallery-place-pin"><MapPin size={19} /><span>360°</span></div></div>;
  return <div className="gallery-art gallery-growth"><div className="gallery-rings" /><div className="gallery-growth-window"><small>LOCAL DISCOVERY</small><strong>Be found<br />in the right places.</strong><div><i /><i /><i /><i /></div></div></div>;
}

export default function WorkGallery() {
  return <section id="work" className="launch-work-section">
    <div className="container"><Reveal><div className="gallery-heading"><div><p className="eyebrow"><span className="eyebrow-mark" />A visual ecosystem</p><h2>Selected work</h2><p>Concepts and demos that show how useful digital ideas can take shape.</p></div><span className="gallery-count">DEMO & CONCEPT <i>05</i></span></div></Reveal>
      <div className="launch-gallery">{projects.map((project, index) => <Reveal key={project.title} delay={index * .06} effect={index === 0 || index === 3 ? "image" : "default"}><article className={`launch-project project-${project.visual}`}><a href="#book" className="gallery-link" aria-label={`Discuss ${project.title}`}><GalleryVisual visual={project.visual} /><div className="gallery-overlay"><span className="gallery-category">{project.category}</span><span className="gallery-type">{project.type}</span><h3>{project.visual === "menu" ? <>FIELD & FLOUR<br /><em>Digital menu</em></> : project.title}</h3><span className="gallery-arrow"><ArrowUpRight size={17} /></span></div></a></article></Reveal>)}</div>
    </div>
  </section>;
}
