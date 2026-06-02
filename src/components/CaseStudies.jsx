import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter.jsx';

const CASES = [
  {
    id: 'nbfc',
    badge: 'Leading NBFC',
    headline: 'Automated underwriting pipeline — decisions in minutes, not days.',
    metrics: [
      { value: 60, suffix: '%', label: 'Faster TAT', color: 'text-accent' },
      { value: 33, suffix: '%', label: 'Lower Delinquency', color: 'text-accent' },
      { value: 98, suffix: '%', label: 'Data Accuracy', color: 'text-accent' },
    ],
    bars: [
      { label: 'Processing Time', before: 85, after: 34, unit: '% reduction' },
      { label: 'NPA Rate', before: 72, after: 39, unit: '% lower' },
      { label: 'Data Quality', before: 45, after: 98, unit: '% accuracy' },
    ],
    detail: 'Metis replaced three legacy underwriting tools for a top-tier NBFC with a ₹2,800 Cr book. By automating bank statement analysis, GST reconciliation, and AI credit scoring, the credit team went from spending 12 days per application to under 90 seconds — while improving accuracy by 4.2×.',
    tags: ['Bank Statement AI', 'GST Reconciliation', 'AI Credit Scoring'],
  },
  {
    id: 'govt',
    badge: 'Government Lender',
    headline: 'Sector-specific MSME risk modules — compliant with policy frameworks.',
    metrics: [
      { value: 50, suffix: 'K+', label: 'MSMEs Assessed', color: 'text-accent' },
      { value: 28, suffix: '%', label: 'NPA Reduced', color: 'text-accent' },
      { value: 60, suffix: ' Days', label: 'Early Warning Lead', color: 'text-accent' },
    ],
    bars: [
      { label: 'MSME Coverage', before: 30, after: 85, unit: '% increase' },
      { label: 'Early Warning Accuracy', before: 40, after: 91, unit: '% detection' },
      { label: 'Policy Compliance', before: 70, after: 100, unit: '% audit-ready' },
    ],
    detail: 'For a major government lending institution, Metis deployed sector-specific MSME risk modules trained on cash flow seasonality and GST patterns across 12 industries. The system detected portfolio stress 60 days before delinquency — enabling proactive intervention and reducing NPAs by 28% in the first two quarters.',
    tags: ['MSME Risk Models', 'Early Warning System', 'Policy Compliance'],
  },
  {
    id: 'mfi',
    badge: 'Microfinance Bank',
    headline: 'Serving thin-file borrowers at scale with zero bureau dependency.',
    metrics: [
      { value: 20, suffix: 'K+', label: 'Borrowers Served', color: 'text-accent' },
      { value: 40, suffix: '%', label: 'Approval Rate ↑', color: 'text-accent' },
      { value: 2, suffix: '×', label: 'Recovery Rate', color: 'text-accent' },
    ],
    bars: [
      { label: 'Approval Rate', before: 28, after: 68, unit: '% up' },
      { label: 'Onboarding Time', before: 90, after: 12, unit: 'min avg' },
      { label: 'Recovery Rate', before: 38, after: 76, unit: '% rate' },
    ],
    detail: 'Metis helped a leading MFI reach thin-file borrowers with no credit bureau history by scoring them via UPI transactions, SMS patterns, and digital behavior. Digital onboarding through Account Aggregator integration reduced KYC time from 2 days to under 5 minutes, enabling the MFI to scale from 3,000 to 20,000 borrowers in 6 months.',
    tags: ['Alternate Data Scoring', 'Account Aggregator', 'Collections AI'],
  },
];

function MetricBar({ label, before, after, unit, delay }) {
  return (
    <div>
      <div className="flex justify-between items-center text-[10px] mb-2">
        <span className="text-muted">{label}</span>
        <span className="font-semibold text-accent">{after}{unit}</span>
      </div>
      <div className="space-y-1.5">
        <div className="relative h-2 bg-black/[0.05] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${before}%` }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.2, duration: 0.8 }}
            className="absolute h-full rounded-full bg-black/15"
          />
        </div>
        <div className="relative h-2 bg-accent/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${after}%` }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, duration: 1, ease: 'easeOut' }}
            className="absolute h-full rounded-full bg-accent"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-1">
        <span className="text-[8px] text-muted">Before ■</span>
        <span className="text-[8px] text-accent">After ■</span>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const c = CASES[active];

  return (
    <section id="case-studies" className="relative py-24 md:py-36 bg-[#FAFAFA] border-t border-black/[0.06] overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label mb-5">
            Client Outcomes
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tighter max-w-2xl">
            Real results, from real lenders.
          </motion.h2>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-none pb-1">
          {CASES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { setActive(i); setExpanded(false); }}
              className={`px-5 py-2.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                active === i ? 'bg-accent text-white border-accent shadow-purple' : 'border-black/[0.08] text-muted hover:text-ink hover:border-black/20'
              }`}
            >
              {c.badge}
            </button>
          ))}
        </div>

        {/* Active case */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden shadow-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0">

              {/* Left */}
              <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-black/[0.06]">
                {/* Badge + headline */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/[0.08] border border-accent/20 text-xs font-semibold text-accent mb-5">
                  {c.badge}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-ink leading-snug tracking-tighter mb-6 max-w-xl">
                  {c.headline}
                </h3>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {c.metrics.map((m, i) => (
                    <div key={m.label} className="text-center p-4 bg-[#FAFAFA] rounded-xl border border-black/[0.05]">
                      <div className={`text-2xl md:text-3xl font-bold tracking-tighter ${m.color}`}>
                        <AnimatedCounter to={m.value} suffix={m.suffix} duration={1600} />
                      </div>
                      <div className="text-[10px] text-muted mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {c.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-black/[0.04] text-xs font-medium text-muted">{tag}</span>
                  ))}
                </div>

                {/* Expand detail */}
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-sm text-accent font-semibold hover:opacity-80 transition-opacity"
                >
                  {expanded ? 'Show less' : 'Read full case study'}
                  <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm text-muted leading-relaxed border-t border-black/[0.06] pt-4">{c.detail}</p>
                      <a href="#contact" className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-semibold hover:opacity-80 transition-opacity">
                        Talk to us about your portfolio <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: bar charts */}
              <div className="p-8 md:p-10 bg-[#FAFAFA]">
                <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-6">Performance Improvement</div>
                <div className="flex flex-col gap-6">
                  {c.bars.map((bar, i) => (
                    <MetricBar key={bar.label} {...bar} delay={i * 0.15} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
