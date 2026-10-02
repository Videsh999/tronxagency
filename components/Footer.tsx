import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

const serviceLinks = ["AI Automation", "Smart Branding", "Immersive Media", "Web & Software"];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#top" className="wordmark wordmark-light">TRONX<span className="wordmark-dot">.</span></a>
          <p>Digital tools, experiences and growth systems built around the way your business works.</p>
          <a className="footer-talk" href="#book">Start a conversation <ArrowUpRight size={16} /></a>
        </div>
        <div className="footer-column"><p className="footer-label">Explore</p><a href="#services">Services</a><a href="#work">Selected work</a><a href="#about">About TRONX</a><a href="#process">How we work</a></div>
        <div className="footer-column"><p className="footer-label">Capabilities</p>{serviceLinks.map((name) => <a key={name} href="#services">{name}</a>)}<a href="#services">Healthcare solutions</a><a href="#services">Digital growth</a></div>
        <div className="footer-column footer-contact"><p className="footer-label">Get in touch</p><a href="tel:+919133110805"><Phone size={15} />+91 9133110805</a><a href="mailto:nikhilindur@tronx.agency"><Mail size={15} />nikhilindur@tronx.agency</a><p><MapPin size={15} />T-Hub, Hyderabad</p></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TRONX</span><span>Built around business.</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
