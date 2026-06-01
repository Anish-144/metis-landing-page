import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Simplified Animated Counter for Tailwind/Framer
function Counter({ to, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const target = parseFloat(to.replace(/[^0-9.]/g, ''));
  const isFloat = String(to).includes('.');

  useEffect(() => {
    let startTime;
    const duration = 1500; // 1.5s
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percent, 3);
      setCount(target * easeOut);
      if (percent < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);

  const displayVal = isFloat ? count.toFixed(1) : Math.round(count);
  return (
    <div className="text-4xl md:text-6xl font-bold tracking-tighter text-black">
      <span className="text-accent text-[0.6em] align-top">{prefix}</span>
      {displayVal}
      <span className="text-accent text-[0.6em] align-top">{suffix}</span>
    </div>
  );
}

const CASES = [
  {
    badge: 'NBFC PARTNER',
    headline: 'AUTOMATED UNDERWRITING PIPELINE, CUT DECISIONS FROM DAYS TO MINUTES.',
    cards: [
      { title: 'BANK STATEMENT ANALYSIS', desc: '500+ statements processed daily, fraud-checked and structured automatically.', stat: '500+ DOCS/DAY' },
      { title: 'GST RECONCILIATION', desc: 'Declared turnover cross-validated against actual transactions in real time.', stat: '98% ACCURACY' },
      { title: 'AI CREDIT SCORING', desc: 'AI-driven scores with full explainability and audit trail for regulators.', stat: '3× FASTER TAT' },
    ],
    metrics: [
      { value:'60', suffix:'%', label:'REDUCTION IN TAT' },
      { value:'33', suffix:'%', label:'DELINQUENCY DROPPED' },
    ],
  },
  {
    badge: 'GOVERNMENT LENDER',
    headline: 'SECTOR-SPECIFIC MSME RISK MODULES COMPLIANT WITH POLICY.',
    cards: [
      { title: 'MSME RISK MODELS', desc: 'Sector-specific models trained on MSME cash flow, seasonality, and GST patterns.', stat: '12 SECTORS' },
      { title: 'EARLY WARNING SYSTEM', desc: 'Portfolio stress detected 60 days before delinquency through behavioral signals.', stat: '60-DAY LEAD' },
      { title: 'POLICY COMPLIANCE', desc: 'All decisions explainable, auditable, and aligned with regulatory frameworks.', stat: '100% AUDIT-READY' },
    ],
    metrics: [
      { value:'50', suffix:'K+', label:'MSMES ASSESSED' },
      { value:'28', suffix:'%', label:'PORTFOLIO NPA REDUCED' },
    ],
  },
  {
    badge: 'MICROFINANCE BANK',
    headline: 'DEPLOYED MICRO-LENDING PLATFORM REACHING THIN-FILE BORROWERS AT SCALE.',
    cards: [
      { title: 'ALTERNATE DATA SCORING', desc: 'Borrowers with no bureau history scored via SMS, UPI, and digital transactions.', stat: '0 BUREAU NEEDED' },
      { title: 'DIGITAL ONBOARDING', desc: 'Full KYC and verification automated with consent-based AA integration.', stat: '<5 MIN ONBOARDING' },
      { title: 'COLLECTIONS INTELLIGENCE', desc: 'Proactive recovery prioritization using repayment propensity models.', stat: '2× RECOVERY RATE' },
    ],
    metrics: [
      { value:'20', suffix:'K+', label:'BORROWERS SERVED' },
      { value:'40', suffix:'%', label:'APPROVAL RATE INCREASED' },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="bg-base text-black py-24 md:py-32 font-inter uppercase">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="text-xs font-semibold tracking-widest text-accent mb-16">CLIENT OUTCOMES</div>

        <div className="flex flex-col gap-32">
          {CASES.map((c, i) => (
            <div key={i} className={`pt-12 ${i > 0 ? 'border-t border-gray-200' : ''}`}>
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
                className="inline-block border border-accent/30 bg-accent/5 rounded-full px-4 py-1.5 text-[10px] font-bold tracking-widest text-accent mb-8"
              >
                {c.badge}
              </motion.div>

              {/* Headline */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
                className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-wide leading-tight max-w-4xl mb-12"
              >
                {c.headline}
              </motion.h2>

              {/* 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {c.cards.map((card, ci) => (
                  <motion.div 
                    key={ci}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ delay: ci * 0.1 }}
                    className="bg-card border border-gray-200 p-6 md:p-8 group hover:border-accent transition-colors shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="h-24 bg-white mb-6 relative overflow-hidden flex items-center justify-center border border-gray-100 group-hover:border-accent/20 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {/* Tech grid */}
                      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                      <div className="text-[10px] text-accent/80 tracking-widest font-bold z-10 group-hover:text-accent transition-all">MODULE_{ci + 1}</div>
                    </div>
                    <h3 className="text-sm font-bold tracking-widest mb-3 relative z-10 text-black">{card.title}</h3>
                    <p className="text-xs font-medium tracking-wide text-slate-500 leading-relaxed mb-6 normal-case relative z-10">{card.desc.toUpperCase()}</p>
                    <div className="text-lg font-bold tracking-widest text-accent border-t border-gray-200 pt-4 mt-auto relative z-10">
                      {card.stat}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-12 md:gap-24 mb-12">
                {c.metrics.map((m, mi) => (
                  <motion.div key={mi} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-10%" }}>
                    <Counter to={m.value} suffix={m.suffix} prefix={m.prefix} />
                    <div className="text-xs font-bold tracking-widest text-slate-500 mt-2">{m.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.a 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                href="#contact" className="flex items-center gap-2 text-sm text-accent font-semibold tracking-widest w-fit hover:opacity-80 transition-opacity"
              >
                SHOW CASE STUDY <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
              </motion.a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
