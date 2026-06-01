import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "METIS HAS BEEN WITH US THROUGH THE CRITICAL MOMENTS OF OUR DIGITAL TRANSFORMATION. TOGETHER WE BUILT A DECISIONING ENGINE THAT REPLACED THREE LEGACY TOOLS. TAT DROPPED, ACCURACY IMPROVED, AND OUR CREDIT TEAM FINALLY HAD CONFIDENCE IN EVERY DECISION.",
    name: "HEAD OF CREDIT RISK",
    title: "LEADING NBFC"
  },
  {
    quote: "WHAT SETS METIS APART IS HOW DEEPLY THEY UNDERSTAND THE INDIAN LENDING REALITY — THE GST QUIRKS, THE AA FRAMEWORK, THE MSME DATA GAPS. THEY DIDN'T JUST GIVE US A PRODUCT; THEY GAVE US INFRASTRUCTURE THAT ACTUALLY WORKS IN OUR CONTEXT.",
    name: "CTO",
    title: "FINTECH LENDER"
  },
  {
    quote: "OUR COLLECTIONS TEAM WENT FROM REACTIVE CHAOS TO STRUCTURED PRIORITIZATION WITHIN WEEKS OF DEPLOYING METIS. THE PROPENSITY MODELS ARE REMARKABLY ACCURATE. WE'VE SEEN RECOVERY RATES DOUBLE ON PREVIOUSLY WRITTEN-OFF ACCOUNTS.",
    name: "COLLECTIONS HEAD",
    title: "REGIONAL BANK"
  },
  {
    quote: "THE BEST PART OF THE COLLABORATION IS PEACE OF MIND: WE CAN TRUST THEIR EXPERTISE. THEY KNOW HOW TO REACH THE RIGHT BORROWERS WITH THE RIGHT DECISIONS — FAST. METIS HAS BECOME INFRASTRUCTURE WE CAN'T LIVE WITHOUT.",
    name: "CHIEF RISK OFFICER",
    title: "GOVERNMENT LENDER"
  },
  {
    quote: "METIS HELPED US MOVE FROM REACTIVE TO PROACTIVE RISK MANAGEMENT. WE DETECTED STRESS 60 DAYS BEFORE IT BECAME DELINQUENCY. THAT CHANGES EVERYTHING ABOUT HOW YOU RUN A PORTFOLIO.",
    name: "RISK HEAD",
    title: "MSME LENDER"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);
  const total = TESTIMONIALS.length;

  const next = () => setCurrent(c => (c + 1) % total);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 8000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  const t = TESTIMONIALS[current];

  return (
    <section id="testimonials" className="bg-base text-black py-24 md:py-32 font-inter uppercase border-t border-gray-200 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="flex flex-wrap justify-between items-end mb-16 gap-4">
          <div className="text-xs font-semibold tracking-widest text-accent">
            <span className="text-black">{String(current + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </div>
          <div className="text-[10px] font-bold tracking-widest text-slate-500">WHAT OUR CLIENTS SAY</div>
        </div>

        <div className="min-h-[300px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide leading-[1.2] mb-12 text-black">
                "{t.quote}"
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white flex items-center justify-center border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                </div>
                <div>
                  <div className="text-sm font-bold tracking-widest text-black">{t.name}</div>
                  <div className="text-xs font-medium tracking-widest text-slate-500">{t.title}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-16 pt-8 border-t border-gray-200">
          <button 
            onClick={() => { prev(); startAuto(); }}
            className="w-14 h-14 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
          </button>
          <button 
            onClick={() => { next(); startAuto(); }}
            className="w-14 h-14 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors group"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
