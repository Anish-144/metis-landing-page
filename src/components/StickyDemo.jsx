import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSearch, User, Target, CheckCircle } from 'lucide-react';

const STEPS = [
  {
    id: 'upload',
    num: '01',
    icon: Upload,
    title: 'Upload Statement',
    body: 'Drop any bank statement — HDFC, ICICI, SBI, IDFC, or any of 200+ formats. Metis reads PDFs, images, and structured files automatically.',
    tag: 'Multi-format support',
  },
  {
    id: 'gst',
    num: '02',
    icon: FileSearch,
    title: 'Run GST Validation',
    body: 'Cross-validate declared turnover against actual transactions. Detect discrepancies, identify cash churning, and flag underreported income.',
    tag: '98% accuracy',
  },
  {
    id: 'profile',
    num: '03',
    icon: User,
    title: 'Generate Borrower Profile',
    body: 'Metis structures extracted data into a complete borrower profile — income, expenses, EMI obligations, behavior signals, and repayment capacity.',
    tag: 'AI-structured data',
  },
  {
    id: 'score',
    num: '04',
    icon: Target,
    title: 'Calculate Risk Score',
    body: 'A proprietary model combining 200+ behavioral, financial, and alternate data signals produces a confidence-weighted credit score with full explainability.',
    tag: 'Explainable AI',
  },
  {
    id: 'decision',
    num: '05',
    icon: CheckCircle,
    title: 'Approve or Flag',
    body: 'The system issues an approval recommendation with confidence score, risk flags, and a complete audit trail — ready for your credit team to review or auto-approve.',
    tag: 'RBI-compliant audit',
  },
];

/* ─── Dashboard Panels ─── */
function UploadDash() {
  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-accent/30 rounded-2xl p-8 text-center bg-accent/[0.03]">
        <Upload className="w-8 h-8 text-accent/50 mx-auto mb-3" />
        <div className="text-sm font-semibold text-ink mb-1">Drop files here</div>
        <div className="text-xs text-muted">PDF, XLSX, JPG — 200+ bank formats</div>
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 inline-block px-4 py-2 bg-accent text-white text-xs font-semibold rounded-full"
        >
          Browse Files
        </motion.div>
      </div>
      {['BankStmt_Q1_2024.pdf', 'GST_Return_FY24.pdf'].map((f, i) => (
        <motion.div
          key={f}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.25 }}
          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-black/[0.06]"
        >
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent text-[10px] font-bold shrink-0">PDF</div>
          <div className="flex-1 text-xs font-medium text-ink truncate">{f}</div>
          <div className="w-20 h-1 bg-accent/10 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + i * 0.25, duration: 1.2 }} className="h-full bg-accent rounded-full" />
          </div>
          <span className="text-[10px] text-green-600 font-semibold shrink-0">✓</span>
        </motion.div>
      ))}
    </div>
  );
}

function GSTDash() {
  const rows = [
    { label: 'Turnover', filed: '₹58.4L', actual: '₹61.2L', ok: false },
    { label: 'Tax Paid', filed: '₹5.2L', actual: '₹5.5L', ok: false },
    { label: 'ITC', filed: '₹1.8L', actual: '₹1.8L', ok: true },
  ];
  return (
    <div>
      <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-4">GST Cross-Validation</div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <motion.div key={r.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.18 }}
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-black/[0.06]">
            <div className="text-xs font-medium text-ink w-20 shrink-0">{r.label}</div>
            <div className="text-[10px] text-muted flex-1">Filed: <strong className="text-ink">{r.filed}</strong></div>
            <div className="text-[10px] text-muted flex-1">Actual: <strong className="text-ink">{r.actual}</strong></div>
            <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${r.ok ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'}`}>
              {r.ok ? '✓ Match' : '⚠ Gap'}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
        className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
        <div className="text-[10px] font-semibold text-amber-700">⚠ 4.8% turnover discrepancy flagged for review</div>
      </motion.div>
    </div>
  );
}

function ProfileDash() {
  const fields = [
    { label: 'Monthly Inflow', val: '₹4,82,340' },
    { label: 'Avg Balance', val: '₹1,23,800' },
    { label: 'EMI Load', val: '₹32,000' },
    { label: 'Bounce Rate', val: '2.3%' },
    { label: 'Cash Ratio', val: '8.1%' },
    { label: 'Salary Credits', val: 'Regular' },
  ];
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 p-3 bg-accent/[0.06] rounded-xl border border-accent/20">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-sm font-bold text-accent shrink-0">RK</div>
        <div>
          <div className="text-sm font-semibold text-ink">Ramesh Kumar</div>
          <div className="text-[10px] text-muted">Profile generated — 94 fields extracted</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {fields.map((f, i) => (
          <motion.div key={f.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            className="p-3 bg-white rounded-xl border border-black/[0.06]">
            <div className="text-[9px] text-muted mb-1">{f.label}</div>
            <div className="text-xs font-semibold text-ink">{f.val}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScoreDash() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let v = 0;
      const iv = setInterval(() => {
        v += 8;
        if (v >= 742) { setScore(742); clearInterval(iv); }
        else setScore(v);
      }, 15);
      return () => clearInterval(iv);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  const pct = score / 900;
  const r = 52, cx = 68, cy = 68, circ = 2 * Math.PI * r;

  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-[136px] h-[136px]">
          <svg width="136" height="136" viewBox="0 0 136 136">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="10" />
            <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke="#5E0ED7" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ - pct * circ}
              transform={`rotate(-90 ${cx} ${cy})`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-ink tracking-tighter">{score}</div>
            <div className="text-[10px] text-muted">out of 900</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Creditworthiness', val: 88 },
          { label: 'Cash Flow Health', val: 76 },
          { label: 'Repayment Capacity', val: 91 },
          { label: 'Behavioral Score', val: 84 },
        ].map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-muted">{item.label}</span>
              <span className="font-semibold text-ink">{item.val}%</span>
            </div>
            <div className="h-1.5 bg-black/[0.05] rounded-full">
              <motion.div initial={{ width: 0 }} animate={{ width: `${item.val}%` }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                className="h-full rounded-full bg-accent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DecisionDash() {
  return (
    <div className="text-center py-2">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.2 }}
        className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center mx-auto mb-3">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="text-lg font-bold text-ink mb-1">Approved</div>
        <div className="text-sm text-muted mb-4">Confidence: 94.2% · Decision in 73s</div>
        <div className="grid grid-cols-3 gap-2">
          {[{ l: 'Amount', v: '₹25L' }, { l: 'Rate', v: '11.5%' }, { l: 'Tenure', v: '36M' }].map((d, i) => (
            <motion.div key={d.l} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
              className="p-3 bg-white rounded-xl border border-green-200">
              <div className="text-sm font-bold text-ink">{d.v}</div>
              <div className="text-[9px] text-muted">{d.l}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-3 p-3 bg-black/[0.03] rounded-xl border border-black/[0.06]">
          <div className="text-[10px] text-muted">Audit trail saved · Compliant with RBI guidelines</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const DASHBOARDS = [UploadDash, GSTDash, ProfileDash, ScoreDash, DecisionDash];
const STEP_DURATION = 4000; // ms each step auto-advances

export default function StickyDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const goTo = (idx) => {
    setActiveStep(idx);
    setProgress(0);
  };

  // Auto-advance
  useEffect(() => {
    setProgress(0);
    const tick = 50;
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + (tick / STEP_DURATION) * 100, 100));
    }, tick);
    timerRef.current = setTimeout(() => {
      setActiveStep(a => (a + 1) % STEPS.length);
      setProgress(0);
    }, STEP_DURATION);
    return () => {
      clearInterval(progressRef.current);
      clearTimeout(timerRef.current);
    };
  }, [activeStep]);

  const DashPanel = DASHBOARDS[activeStep];

  return (
    <section className="relative border-t border-black/[0.06] bg-[#FAFAFA] py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label mb-4">
          Platform Walkthrough
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tighter mb-10 md:mb-14 max-w-2xl">
          See Metis work through every step.
        </motion.h2>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT: Step list */}
          <div className="flex flex-col gap-2">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStep;
              const isDone = i < activeStep;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => goTo(i)}
                  animate={{ opacity: isActive ? 1 : isDone ? 0.5 : 0.35 }}
                  transition={{ duration: 0.3 }}
                  className={`text-left flex gap-4 p-4 rounded-2xl border transition-all duration-300 w-full ${
                    isActive
                      ? 'bg-white border-accent/20 shadow-card-hover'
                      : 'border-transparent hover:border-black/[0.06] hover:bg-white/60'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                    isActive ? 'bg-accent' : isDone ? 'bg-green-100' : 'bg-black/[0.05]'
                  }`}>
                    {isDone
                      ? <CheckCircle className="w-4 h-4 text-green-600" />
                      : <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-muted'}`} />
                    }
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-muted">{step.num}</span>
                      <span className={`text-sm font-semibold ${isActive ? 'text-ink' : 'text-muted'}`}>{step.title}</span>
                    </div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-muted leading-relaxed mt-1 mb-2">{step.body}</p>
                          <span className="px-2 py-1 bg-accent/[0.08] text-accent text-[10px] font-semibold rounded-full">{step.tag}</span>
                          {/* Progress bar */}
                          <div className="h-0.5 bg-black/[0.06] rounded-full mt-3 overflow-hidden">
                            <motion.div
                              className="h-full bg-accent rounded-full origin-left"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: Dashboard */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 -m-4 rounded-3xl pointer-events-none"
              style={{ background: 'radial-gradient(ellipse, rgba(94,14,215,0.07) 0%, transparent 70%)' }} />

            <div className="relative bg-white rounded-2xl border border-black/[0.07] overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)' }}>

              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#FAFAFA] border-b border-black/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="h-5 bg-black/[0.04] rounded-md flex items-center px-2">
                    <span className="text-[9px] text-muted/60 font-mono">metis.ai/underwriting/new</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`rounded-full transition-all duration-300 ${
                      i === activeStep ? 'w-4 h-1.5 bg-accent' : i < activeStep ? 'w-1.5 h-1.5 bg-green-500' : 'w-1.5 h-1.5 bg-black/10'
                    }`} />
                  ))}
                </div>
              </div>

              {/* Panel content */}
              <div className="p-5 min-h-[360px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DashPanel />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Step counter below */}
            <div className="flex items-center justify-between mt-4 px-1">
              <div className="text-xs text-muted tabular-nums">
                Step {String(activeStep + 1).padStart(2, '0')} of {STEPS.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => goTo((activeStep - 1 + STEPS.length) % STEPS.length)}
                  className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-muted hover:text-ink hover:border-black/20 transition-all text-xs"
                >‹</button>
                <button
                  onClick={() => goTo((activeStep + 1) % STEPS.length)}
                  className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-muted hover:text-ink hover:border-black/20 transition-all text-xs"
                >›</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
