import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, X, Menu } from 'lucide-react';
import WorkflowDashboard from './ui/WorkflowDashboard.jsx';
import DataGlobe from './ui/DataGlobe.jsx';

const NAV_LINKS = ['Platform', 'Case Studies', 'About', 'Contact'];

const STATS = [
  { num: '2.4M+', label: 'Documents Processed' },
  { num: '₹48K Cr', label: 'Loan Value Analyzed' },
  { num: '99.2%', label: 'Accuracy Rate' },
];

export default function PremiumHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#020202]">

      {/* ── 3D Interactive WebGL Globe ── */}
      <div className="absolute top-1/2 left-[60%] lg:left-[70%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-auto z-0 opacity-90 hidden md:block">
        <DataGlobe />
      </div>

      {/* Aurora blob top-right */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(94,14,215,0.08) 0%, transparent 65%)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(94,14,215,0.06) 0%, transparent 65%)' }}
      />

      {/* ─── Navigation ─── */}
      <nav className="relative z-20 flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 pt-6">

        {/* Logo */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center animate-pulse-ring">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          </div>
          <span className="text-sm font-bold tracking-widest text-white uppercase">Metis</span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.div {...fadeUp(0.05)} className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp(0.1)} className="hidden md:flex items-center gap-3">
          <a href="#contact" className="btn-ghost text-xs py-2.5 px-5 text-white border-white/20 hover:bg-white/10">
            Book Demo
          </a>
          <a href="#contact" className="btn-primary text-xs py-2.5 px-5">
            Get Started <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Mobile hamburger */}
        <motion.button
          {...fadeUp(0.1)}
          onClick={() => setMenuOpen(true)}
          className="md:hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
        >
          <Menu className="w-4 h-4 text-white" />
        </motion.button>
      </nav>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col px-6 py-6"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                </div>
                <span className="text-sm font-bold tracking-widest text-ink uppercase">Metis</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="w-9 h-9 rounded-full bg-ink flex items-center justify-center hover:bg-accent transition-colors">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="text-3xl font-semibold text-ink hover:text-accent transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary justify-center">
                Book Demo <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero Body ─── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-12 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* ── LEFT: Copy ── */}
            <div className="flex flex-col gap-8">

              {/* Badge */}
              <motion.div {...fadeUp(0.15)} className="w-fit">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] text-xs font-semibold text-accent tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  AI-Powered Lending Intelligence
                </span>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[clamp(2.8rem,6vw,5.5rem)] font-bold text-white leading-[1.0] tracking-tighter"
                >
                  The Intelligence<br />
                  Layer for <span className="gradient-text">Modern</span><br />
                  Lending.
                </motion.h1>
              </div>

              {/* Subheadline */}
              <motion.p {...fadeUp(0.35)} className="text-base md:text-lg text-slate-400 leading-relaxed max-w-md font-normal">
                Automate underwriting with AI, monitor portfolio risk in real time, and scale credit decisions with confidence — built for India's top lenders.
              </motion.p>

              {/* CTA row */}
              <motion.div {...fadeUp(0.45)} className="flex flex-wrap items-center gap-4">
                <a href="#contact" className="btn-primary">
                  Book a Demo <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="#scroll-story" className="btn-ghost flex items-center gap-2 text-white border-white/20 hover:bg-white/10">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                    <Play className="w-3 h-3 text-black fill-black" />
                  </div>
                  Watch Platform Demo
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                {STATS.map((s) => (
                  <div key={s.num}>
                    <div className="text-xl md:text-2xl font-bold text-white tracking-tighter">{s.num}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: Dashboard ── */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Floating glow behind dashboard */}
              <div className="absolute inset-0 -m-8 rounded-3xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(94,14,215,0.1) 0%, transparent 70%)' }} />

              {/* Floating tag chips */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 z-10 glass rounded-xl px-3 py-2 shadow-card hidden lg:flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-semibold text-ink">98.7% Accuracy</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-4 -right-4 z-10 glass rounded-xl px-3 py-2 shadow-card hidden lg:flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-semibold text-ink">Decision in &lt; 90s</span>
              </motion.div>

              <WorkflowDashboard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-8"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
        <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
