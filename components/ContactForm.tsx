"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { serviceOptions } from "@/data/services";

type FormData = { serviceInterested: string; name: string; phone: string; email: string; businessName: string; projectDescription: string; preferredContact: string };
const initial: FormData = { serviceInterested: "", name: "", phone: "", email: "", businessName: "", projectDescription: "", preferredContact: "" };

export default function ContactForm() {
  const [data, setData] = useState(initial);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const update = (field: keyof FormData, value: string) => setData((current) => ({ ...current, [field]: value }));
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (step === 1) {
      if (!data.serviceInterested) return setError("Choose a service to continue.");
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!data.name.trim() || !data.phone.trim() || !data.email.trim()) return setError("Add your name, phone and email to continue.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return setError("Enter a valid email address.");
      setStep(3);
      return;
    }
    if (step === 3) { setStep(4); return; }
    if (!data.preferredContact) return setError("Choose how you’d prefer to connect.");
    setStatus("loading");
    // Local-only placeholder for the future integration submit handler. Nothing is sent or persisted.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
  };
  if (status === "success") return <div className="form-success" role="status"><span className="success-icon"><Check size={22} /></span><p className="eyebrow"><span className="eyebrow-mark" />Enquiry prepared</p><h3>Thanks for reaching out.</h3><p>Your consultation request is ready. This demo does not send or store your information.</p><button className="text-button" type="button" onClick={() => { setData(initial); setStep(1); setStatus("idle"); }}>Start another enquiry <ArrowRight size={16} /></button></div>;
  return <div className="booking-form-shell"><div className="booking-intro"><p className="eyebrow"><span className="eyebrow-mark" />Book consultation</p><h3>Let’s talk about what you’re building.</h3><p>Tell us a little about your business and what you’d like to improve. We’ll use that to make the conversation more useful.</p><a href="#book" className="text-button">Book a consultation <ArrowUpRight size={16} /></a></div><form className="contact-form" onSubmit={submit} noValidate>
    <div className="form-top"><span>Book a consultation</span><span>0{step} <i>/ 04</i></span></div>
    <div className="progress-track" role="progressbar" aria-label={`Step ${step} of 4`} aria-valuemin={1} aria-valuemax={4} aria-valuenow={step}><span style={{ width: `${(step / 4) * 100}%` }} /></div>
    {step === 1 && <div className="form-step"><h3>What would you like help with?</h3><p>Choose the closest fit. We can figure out the details together.</p><div className="service-options">{serviceOptions.map((option) => <button type="button" className={`option-chip ${data.serviceInterested === option ? "selected" : ""}`} key={option} onClick={() => update("serviceInterested", option)} aria-pressed={data.serviceInterested === option}>{option}{data.serviceInterested === option && <Check size={14} />}</button>)}</div></div>}
    {step === 2 && <div className="form-step"><h3>Who should we reach out to?</h3><p>Just enough to continue the conversation.</p><div className="field-grid"><label>Your name <span>*</span><input autoComplete="name" required value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Name" /></label><label>Phone <span>*</span><input autoComplete="tel" type="tel" required value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91" /></label><label className="field-full">Email <span>*</span><input autoComplete="email" type="email" required value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@business.com" /></label></div></div>}
    {step === 3 && <div className="form-step"><h3>Tell us about the business</h3><p>Optional details help us understand where to begin.</p><div className="field-grid"><label className="field-full">Business name<input autoComplete="organization" value={data.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Your business" /></label><label className="field-full">What are you looking to do?<textarea rows={4} value={data.projectDescription} onChange={(e) => update("projectDescription", e.target.value)} placeholder="A few details about what you’re building, improving or trying to automate…" /></label></div></div>}
    {step === 4 && <div className="form-step"><h3>Preferred way to connect</h3><p>How would you like TRONX to follow up?</p><div className="connect-options">{["Phone", "WhatsApp", "Email"].map((method) => <button key={method} type="button" className={`connect-option ${data.preferredContact === method ? "selected" : ""}`} aria-pressed={data.preferredContact === method} onClick={() => update("preferredContact", method)}><span className="connect-option-icon">{data.preferredContact === method ? <Check size={16} /> : <ArrowRight size={16} />}</span><strong>{method}</strong><small>{method === "Phone" ? "A call" : method === "WhatsApp" ? "A message" : "An email"}</small></button>)}</div></div>}
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="form-actions">{step > 1 && <button type="button" className="back-button" onClick={() => { setError(""); setStep(step - 1); }}><ArrowLeft size={16} /> Back</button>}<button type="submit" className="button button-dark form-next" disabled={status === "loading"}>{status === "loading" ? <>Working <LoaderCircle size={16} className="spin" /></> : <>{step === 4 ? "Book Consultation" : "Continue"}<ArrowRight size={16} /></>}</button></div>
  </form></div>;
}
