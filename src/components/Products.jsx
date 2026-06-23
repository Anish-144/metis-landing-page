import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, FileText, Activity, TrendingUp } from 'lucide-react';

/* ─────────────────────────────────────────
   QANAT mini-animation: Statement Parser
───────────────────────────────────────── */
function QanatPreview() {
  const lines = [
    { label: 'Net Salary', val: '₹1,20,000', color: 'text-green-600' },
    { label: 'EMI - Home', val: '-₹32,000', color: 'text-red-500' },
    { label: 'UPI Credits', val: '₹48,200', color: 'text-green-600' },
    { label: 'Cash Withdrawal', val: '-₹8,000', color: 'text-amber-600' },
    { label: 'Avg Balance', val: '₹1,23,800', color: 'text-ink' },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#F8F8FA] border border-black/[0.06] p-4 h-full">
      {/* Scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
          className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"
        />
      </div>
      <div className="text-[9px] font-semibold tracking-widest text-muted uppercase mb-3">AI Extraction</div>
      {lines.map((l, i) => (
        <motion.div
          key={l.label}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3, duration: 0.4, repeat: Infinity, repeatDelay: lines.length * 0.3 + 1 }}
          className="flex justify-between py-1.5 border-b border-black/[0.04] last:border-0"
        >
          <span className="text-[10px] text-muted">{l.label}</span>
          <span className={`text-[10px] font-semibold ${l.color}`}>{l.val}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   NETRA mini-animation: Risk graph
───────────────────────────────────────── */
function NetraPreview() {
  const points = [10, 22, 18, 35, 28, 45, 38, 62, 55, 71, 65, 80];
  const w = 240, h = 120;
  const max = 100;
  const pts = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`).join(' ');

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#F8F8FA] border border-black/[0.06] p-4 h-full">
      <div className="text-[9px] font-semibold tracking-widest text-muted uppercase mb-3">Risk Monitoring</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 100 }}>
        <defs>
          <linearGradient id="risk-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5E0ED7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#5E0ED7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polyline
          points={pts}
          fill="none"
          stroke="#5E0ED7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={(i / (points.length - 1)) * w}
            cy={h - (p / max) * h}
            r="3"
            fill="#5E0ED7"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (i / points.length) * 2, repeat: Infinity, repeatDelay: 3 - (i / points.length) * 2 }}
          />
        ))}
      </svg>
      <div className="flex gap-2 mt-2 flex-wrap">
        {['EMI Stress', 'Cash Drop', 'Bureau Dip'].map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.2, repeat: Infinity, repeatDelay: 3 - (0.8 + i * 0.2) }}
            className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200"
          >
            ⚠ {tag}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Collections mini-animation: Priority queue
───────────────────────────────────────── */
function CollectionsPreview() {
  const queue = [
    { name: 'Ramesh K.', daysOverdue: 45, propensity: 82, action: 'Call Now' },
    { name: 'Priya M.', daysOverdue: 22, propensity: 67, action: 'WhatsApp' },
    { name: 'Suresh V.', daysOverdue: 90, propensity: 31, action: 'Legal' },
  ];
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#F8F8FA] border border-black/[0.06] p-4 h-full">
      <div className="text-[9px] font-semibold tracking-widest text-muted uppercase mb-3">Recovery Queue</div>
      <div className="space-y-2">
        {queue.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25, duration: 0.4, repeat: Infinity, repeatDelay: queue.length * 0.25 + 1 }}
            className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-black/[0.06]"
          >
            <div className="w-6 h-6 rounded-full bg-accent/10 text-accent text-[9px] font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-ink">{item.name}</div>
              <div className="text-[9px] text-muted">{item.daysOverdue}d overdue</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] font-bold text-accent">{item.propensity}%</div>
              <div className="text-[8px] text-muted">{item.action}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Module data
───────────────────────────────────────── */
const MODULES = [
  {
    num: '01',
    id: 'sophiox',
    icon: FileText,
    name: 'SOPHIOX',
    tagline: 'Ingestion Engine',
    headline: 'Achieve Operational Excellence with Digital Onboarding & KYC Processes',
    body: 'Automate extraction and normalization of borrower data from diverse financial and alternative data sources, eliminating manual processing and ensuring accurate, structured inputs for credit evaluation.',
    bullets: [
      'Seamless integration: Customized APIs integrate with your tech stacks.',
      'Origination & Smart Onboarding: Extracting data from multiple sources with advanced analytics.',
      'Advanced Verification: Deploy advanced verification tools with built-in fraud checks.',
      'Compliant & Auditable: Built-in audit trails via Account Aggregator frameworks.'
    ],
    preview: QanatPreview,
    cta: 'Explore SOPHIOX',
  },
  {
    num: '02',
    id: 'qanat',
    icon: Activity,
    name: 'QANAT',
    tagline: 'Intelligence Engine',
    headline: 'Experience the Power Of AI & ML in Underwriting & Propensity Scoring',
    body: 'Automate underwriting with comprehensive financial and behavioral borrower data and intelligent decisioning workflows.',
    bullets: [
      'AI-Powered Underwriting: Evaluate borrowers using banking, bureau, GST, and alternative data.',
      'Real-Time Risk Assessment: Dynamic scoring through automated analysis of financial behavior.',
      'Propensity & Behavioural Models: Predict borrower behavior and estimate cash flows.',
      'Explainable & Compliant: Transparent, auditable scoring frameworks aligned with regulations.'
    ],
    preview: CollectionsPreview,
    cta: 'Explore QANAT',
  },
  {
    num: '03',
    id: 'netra',
    icon: TrendingUp,
    name: 'NETRA',
    tagline: 'Decisioning & Intelligence Engine',
    headline: 'Identify emerging portfolio risks through continuous monitoring',
    body: 'Continuous risk monitoring, real-time evaluation, and explainable recommendations for timely intervention.',
    bullets: [
      'Continuous Risk Monitoring: Identify emerging risk patterns and early warning signs in real time.',
      'AI-Driven Alert Systems: Proactively prioritize high-risk accounts for timely interventions.',
      'Portfolio Health Monitoring: Centralized visibility with automated reporting and PD models.',
      'Collections Optimization: Leverage automation and predictive analytics to maximize recovery rates.'
    ],
    preview: NetraPreview,
    cta: 'Explore NETRA',
  },
];

export default function Products() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="products" className="relative py-24 md:py-36 bg-white border-t border-black/[0.06] overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label mb-5">
            Our Platform
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight tracking-tighter max-w-3xl">
            Three modules. One complete lending intelligence platform.
          </motion.h2>
        </div>

        {/* Modules */}
        <div className="flex flex-col gap-6">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            const Preview = mod.preview;
            const isExpanded = expanded === mod.id;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-card-hover"
              >
                {/* Main row */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">

                  {/* Left: content */}
                  <div className="p-7 md:p-10">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-accent/[0.08] border border-accent/15 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold tracking-widest text-muted uppercase">{mod.num} · {mod.tagline}</div>
                          <div className="text-xl font-bold text-ink mt-0.5">{mod.name}</div>
                        </div>
                      </div>
                      <span className="text-3xl font-bold text-black/[0.05] tracking-tighter hidden md:block">{mod.num}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-ink leading-snug tracking-tight mb-3 max-w-xl">
                      {mod.headline}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6 max-w-xl">{mod.body}</p>

                    {/* Bullets — shown inline or in expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <ul className="space-y-2.5 mb-6">
                            {mod.bullets.map(b => (
                              <li key={b} className="flex items-start gap-2.5 text-sm text-muted">
                                <span className="w-4 h-4 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-center gap-4">
                      <a href="#contact" className="flex items-center gap-1.5 text-sm text-accent font-semibold hover:opacity-80 transition-opacity group/link">
                        {mod.cta}
                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                      <button
                        onClick={() => setExpanded(isExpanded ? null : mod.id)}
                        className="flex items-center gap-1.5 text-xs text-muted font-semibold hover:text-ink transition-colors"
                      >
                        {isExpanded ? 'Less detail' : 'More detail'}
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </motion.div>
                      </button>
                    </div>
                  </div>

                  {/* Right: animated preview */}
                  <div className="hidden lg:block border-l border-black/[0.06] bg-[#FAFAFA] p-6 group-hover:bg-white transition-colors">
                    <Preview />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
