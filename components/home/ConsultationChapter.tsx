import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ConsultationChapter() {
  return <section id="contact" className="consultation-chapter"><div className="consultation-heading container">
    <p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />A useful first conversation</p>
    <p className="consultation-question">Have a business problem worth solving?</p>
    <h2><span>LET’S BUILD</span><span>SOMETHING</span><em>USEFUL.</em></h2>
    <p>Tell us a little about your business and what you’d like to improve. We’ll use that to make the conversation more useful.</p>
  </div><div className="container consultation-panel" id="book"><div className="consultation-side"><p className="eyebrow"><span className="eyebrow-mark" />BOOK A CONSULTATION</p><h3>Start with the thing that matters most.</h3><p>Choose a way to reach us, or work through the short enquiry below. This demo does not send or store your information.</p><div className="consultation-contact-list"><a href="tel:+919133110805"><span><Phone size={16} /></span><div><small>PHONE</small><strong>+91 9133110805</strong></div><ArrowUpRight size={15} /></a><a href="mailto:nikhilindur@tronx.agency"><span><Mail size={16} /></span><div><small>EMAIL</small><strong>nikhilindur@tronx.agency</strong></div><ArrowUpRight size={15} /></a><div><span><MapPin size={16} /></span><div><small>LOCATION</small><strong>T-Hub, Hyderabad</strong></div></div></div><span className="consultation-note">LOCAL DEMO · NO DATA SENT</span></div><div className="consultation-form-wrap"><ContactForm /></div></div></section>;
}
