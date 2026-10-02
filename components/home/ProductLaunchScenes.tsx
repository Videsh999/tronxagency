"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, CirclePlay, Layers3, Plus, Workflow } from "lucide-react";

const menuStages = ["MENU", "CATEGORIES", "FOOD", "VIDEO", "ADD-ONS", "AVAILABLE"];

export function RestaurantMenuLaunch() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const deviceScale = useTransform(scrollYProgress, [0, .32, .77, 1], [.83, 1, 1.09, 1.06]);
  const deviceTurn = useTransform(scrollYProgress, [0, .34, .78, 1], [12, 0, -2, 0]);
  const deviceY = useTransform(scrollYProgress, [0, .34, .8, 1], [35, 0, -17, -10]);
  const deviceOpacity = useTransform(scrollYProgress, [0, .1, .3, .8], [.25, .65, 1, 1]);
  const details = useTransform(scrollYProgress, [0, .2, .42, .7, .9], [0, .1, .55, 1, 1]);
  const foodScale = useTransform(scrollYProgress, [.25, .5, .8], [.88, 1, 1.025]);
  const videoOpacity = useTransform(scrollYProgress, [.05, .26, .48], [0, 1, 1]);
  const addonsOpacity = useTransform(scrollYProgress, [.33, .58, .76], [0, 1, 1]);
  const availableOpacity = useTransform(scrollYProgress, [.57, .78, 1], [0, 1, 1]);
  return <section className="menu-launch-section" ref={ref} aria-labelledby="menu-launch-title">
    <div className="menu-launch-sticky">
      <div className="container menu-launch-layout">
          <div className="menu-launch-copy"><p className="eyebrow eyebrow-light"><span className="eyebrow-mark" />DIGITAL EXPERIENCE / 01</p><h2 id="menu-launch-title">A menu customers actually want to explore.</h2><p>A mobile-first digital restaurant menu that brings categories, food videos, dish details, add-ons and availability into one thoughtful experience.</p><span className="demo-tag demo-tag-light"><i />TRONX DEMO</span><div className="launch-stage-list">{menuStages.map((stage, index) => <MenuStage key={stage} label={stage} index={index} progress={scrollYProgress} reduce={!!reduce} />)}</div></div>
        <div className="menu-launch-product">
          <motion.div className="menu-orbit-panel" style={{ opacity: reduce ? 1 : deviceOpacity }}>
            <div className="menu-product-grain" /><span className="menu-orbit-label">FIELD & FLOUR / DIGITAL MENU</span>
            <motion.div className="menu-launch-device" style={{ scale: reduce ? 1 : deviceScale, rotateY: reduce ? 0 : deviceTurn, y: reduce ? 0 : deviceY }}>
              <div className="launch-device-frame"><div className="launch-device-reflection" /><div className="launch-device-speaker" /><div className="launch-device-screen">
                <div className="launch-menu-nav">FIELD & FLOUR <span>MENU <i>⌕</i></span></div>
                <div className="launch-menu-intro"><small>GOOD FOOD, GOOD MOOD</small><strong>A little something<br />for every appetite.</strong></div>
                <motion.div className="launch-menu-categories" style={{ opacity: reduce ? 1 : details }}><span>All</span><span>Breakfast</span><span>Bowls</span><span>Drinks</span></motion.div>
                <motion.div className="launch-food-card" style={{ opacity: reduce ? 1 : details, scale: reduce ? 1 : foodScale }}><div className="launch-food-visual"><span>FIELD<br />& FLOUR</span><CirclePlay size={26} /></div><div className="launch-food-meta"><strong>Garden bowl</strong><small>Bright, fresh & filling</small><b>₹ 340 <i><Plus size={12} /> Add</i></b></div></motion.div>
                <motion.div className="launch-addons" style={{ opacity: reduce ? 1 : details }}><span>MAKE IT YOURS</span><div><Check size={12} /> Add avocado <i>+ ₹ 50</i></div></motion.div>
                <motion.div className="launch-availability" style={{ opacity: reduce ? 1 : details }}><span />Available today</motion.div>
              </div></div>
            </motion.div>
            <motion.span className="menu-float-label menu-label-video" style={{ opacity: reduce ? 1 : videoOpacity }}><CirclePlay size={13} /> VIDEO</motion.span>
            <motion.span className="menu-float-label menu-label-addons" style={{ opacity: reduce ? 1 : addonsOpacity }}><Plus size={13} /> ADD-ONS</motion.span>
            <motion.span className="menu-float-label menu-label-available" style={{ opacity: reduce ? 1 : availableOpacity }}><Check size={13} /> AVAILABLE</motion.span>
            <div className="menu-product-shadow" />
          </motion.div>
          <span className="menu-scroll-counter">SCROLL TO EXPLORE <ArrowRight size={13} /></span>
        </div>
      </div>
    </div>
  </section>;
}

function MenuStage({ label, index, progress, reduce }: { label: string; index: number; progress: import("framer-motion").MotionValue<number>; reduce: boolean }) {
  const start = index / menuStages.length;
  const end = (index + 1) / menuStages.length;
  const opacity = useTransform(progress, [start, start + .08, end - .08, end], [0.38, 1, 1, .38]);
  return <motion.span className="launch-stage-item" style={{ opacity: reduce ? 1 : opacity }}><i>{String(index + 1).padStart(2, "0")}</i>{label}</motion.span>;
}

export function BusinessSystemLaunch() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const panelScale = useTransform(scrollYProgress, [0, .3, .78, 1], [.9, 1, 1.055, 1.04]);
  const panelY = useTransform(scrollYProgress, [0, .3, .8, 1], [27, 0, -15, -8]);
  const fade = useTransform(scrollYProgress, [0, .18, .4, .7, .92], [.22, .52, .9, 1, 1]);
  const modules = useTransform(scrollYProgress, [0, .24, .48, .77], [0, .2, .75, 1]);
  return <section className="business-launch-section" ref={ref} aria-labelledby="system-launch-title">
    <div className="business-launch-sticky"><div className="container business-launch-layout">
      <div className="business-launch-product">
        <motion.div className="business-product-shell" style={{ scale: reduce ? 1 : panelScale, y: reduce ? 0 : panelY, opacity: reduce ? 1 : fade }}>
          <div className="business-product-top"><span className="business-product-logo">T</span><span>TRONX / CONCEPT</span><span>WORKSPACE <i>•••</i></span></div>
          <div className="business-dashboard"><aside className="business-sidebar"><span className="selected"><Layers3 size={14} /></span><span><Workflow size={14} /></span><span>◷</span><span>⌘</span><i /></aside>
            <div className="business-dashboard-main"><div className="business-dashboard-nav"><span>Workspace overview</span><span>Monday, 09:41 <i>A</i></span></div><div className="business-welcome"><small>YOUR BUSINESS, AT A GLANCE</small><h3>A little more clarity<br />for the day ahead.</h3></div>
              <motion.div className="business-metrics" style={{ opacity: reduce ? 1 : modules }}>{[{ n: "04", label: "Items being worked on" }, { n: "12", label: "Recently updated" }, { n: "03", label: "Next up" }].map((item) => <div key={item.label}><small>{item.label}</small><strong>{item.n}</strong><i>Across your workspace</i></div>)}</motion.div>
              <motion.div className="business-workflow-row" style={{ opacity: reduce ? 1 : modules }}><div className="business-activity"><small>RECENT ACTIVITY</small><p><i />A workflow was updated <span>Just now</span></p><p><i />Workspace details changed <span>Today</span></p><p><i />A new item was added <span>Yesterday</span></p></div><div className="business-flow"><small>PROCESS AT A GLANCE</small><div>Request <ArrowRight size={12} /> Review</div><div>In progress <ArrowRight size={12} /> Complete</div></div></motion.div>
            </div>
          </div>
          <motion.div className="business-module-float module-one" style={{ opacity: reduce ? 1 : modules }}><span>01</span><b>Workflows</b><Workflow size={14} /></motion.div>
          <motion.div className="business-module-float module-two" style={{ opacity: reduce ? 1 : modules }}><span>02</span><b>Activity</b><Layers3 size={14} /></motion.div>
          <div className="business-reflection" />
        </motion.div><div className="business-ground-shadow" />
      </div>
      <div className="business-launch-copy"><p className="eyebrow"><span className="eyebrow-mark" />BUSINESS SYSTEMS / 02</p><h2 id="system-launch-title">From one digital tool to an entire business system.</h2><p>Custom digital systems can take shape around the way your business operates. Start with a focused tool, then build on what works.</p><span className="demo-tag"><i />TRONX CONCEPT</span><div className="business-proof-points"><span><i>01</i> Overview</span><span><i>02</i> Activity</span><span><i>03</i> Workflows</span></div></div>
    </div></div>
  </section>;
}
