"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/data/faq";

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return <div className="faq-list">{faqs.map((item, index) => {
    const expanded = active === index;
    return <article className={`faq-item ${expanded ? "is-open" : ""}`} key={item.question}>
      <h3><button type="button" aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setActive(expanded ? null : index)}>{item.question}<span className="faq-icon">{expanded ? <Minus size={16} /> : <Plus size={16} />}</span></button></h3>
      <AnimatePresence initial={false}>{expanded && <motion.div id={`faq-answer-${index}`} className="faq-answer" initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduce ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.24 }}><p>{item.answer}</p></motion.div>}</AnimatePresence>
    </article>;
  })}</div>;
}
