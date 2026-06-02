import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Metis has been with us through the critical moments of our digital transformation. Together we built a decisioning engine that replaced three legacy tools. TAT dropped, accuracy improved, and our credit team finally had confidence in every decision.",
    name: "Head of Credit Risk",
    title: "Leading NBFC",
    metric: "60% faster decisions",
  },
  {
    quote: "What sets Metis apart is how deeply they understand the Indian lending reality — the GST quirks, the AA framework, the MSME data gaps. They didn't just give us a product; they gave us infrastructure that actually works in our context.",
    name: "CTO",
    title: "Fintech Lender",
    metric: "4.2× accuracy improvement",
  },
  {
    quote: "Our collections team went from reactive chaos to structured prioritization within weeks of deploying Metis. The propensity models are remarkably accurate. We've seen recovery rates double on previously written-off accounts.",
    name: "Collections Head",
    title: "Regional Bank",
    metric: "2× recovery rate",
  },
  {
    quote: "The best part of the collaboration is peace of mind: we can trust their expertise. They know how to reach the right borrowers with the right decisions — fast. Metis has become infrastructure we can't live without.",
    name: "Chief Risk Officer",
    title: "Government Lender",
    metric: "28% NPA reduction",
  },
  {
    quote: "Metis helped us move from reactive to proactive risk management. We detected stress 60 days before it became delinquency. That changes everything about how you run a portfolio.",
    name: "Risk Head",
    title: "MSME Lender",
    metric: "60-day early warning",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[current];

  const next = () => setCurrent(c => (c + 1) % total);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 7000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  return (
    <section id="testimonials" className="relative py-24 md:py-36 bg-white border-t border-black/[0.06] overflow-hidden">
      <div className="absolute inset-0 aurora pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header row */}
        <div className="flex items-end justify-between mb-16 gap-4 flex-wrap">
          <div>
            <div className="section-label mb-4">Client Voices</div>
            <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tighter">What our clients say.</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { prev(); startAuto(); }}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-all group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
            </button>
            <button
              onClick={() => { next(); startAuto(); }}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-ink hover:text-white hover:border-ink transition-all group"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            {/* Metric badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-xs font-semibold text-accent mb-6">
              ↑ {t.metric}
            </div>

            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-semibold text-ink leading-[1.3] tracking-tight mb-10">
              "{t.quote}"
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <div>
                <div className="text-sm font-bold text-ink">{t.name}</div>
                <div className="text-xs text-muted">{t.title}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots + counter */}
        <div className="flex items-center gap-6 mt-12 pt-8 border-t border-black/[0.06]">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); startAuto(); }}
                className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-black/15 hover:bg-black/30'}`}
              />
            ))}
          </div>
          <div className="text-xs font-semibold text-muted tabular-nums">
            {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>
      </div>
    </section>
  );
}
