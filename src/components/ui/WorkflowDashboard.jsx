import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, FileText, AlertTriangle, TrendingUp, Shield, Zap } from 'lucide-react';

const STEPS = [
  {
    id: 'upload',
    label: 'Statement Upload',
    icon: FileText,
    color: '#5E0ED7',
    duration: 2500,
    content: <UploadPanel />,
  },
  {
    id: 'extract',
    label: 'AI Data Extraction',
    icon: Zap,
    color: '#7c3aed',
    duration: 2800,
    content: <ExtractPanel />,
  },
  {
    id: 'gst',
    label: 'GST Reconciliation',
    icon: CheckCircle,
    color: '#5E0ED7',
    duration: 2500,
    content: <GSTPanel />,
  },
  {
    id: 'risk',
    label: 'Risk Detection',
    icon: AlertTriangle,
    color: '#d97706',
    duration: 2600,
    content: <RiskPanel />,
  },
  {
    id: 'score',
    label: 'Credit Scoring',
    icon: TrendingUp,
    color: '#5E0ED7',
    duration: 2800,
    content: <ScorePanel />,
  },
  {
    id: 'decision',
    label: 'Underwriting Decision',
    icon: Shield,
    color: '#16a34a',
    duration: 3000,
    content: <DecisionPanel />,
  },
];

function UploadPanel() {
  const files = ['BankStmt_Q1_2024.pdf', 'ICICI_March2024.pdf', 'GST_Return_FY24.pdf'];
  return (
    <div className="space-y-3">
      <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-4">Documents Queued</div>
      {files.map((f, i) => (
        <motion.div
          key={f}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3, duration: 0.4 }}
          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-black/[0.06] group"
        >
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-ink truncate">{f}</div>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: i * 0.3 + 0.3, duration: 1.2, ease: 'easeOut' }}
              className="h-1 bg-accent rounded-full mt-1.5 origin-left"
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.3 + 1.5 }}
            className="text-[10px] font-semibold text-green-600"
          >✓</motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function ExtractPanel() {
  const fields = [
    { label: 'Net Monthly Inflow', value: '₹4,82,340' },
    { label: 'Average Balance', value: '₹1,23,800' },
    { label: 'EMI Obligations', value: '₹32,000' },
    { label: 'Salary Credits', value: '₹1,20,000' },
    { label: 'Bounce Rate', value: '2.3%' },
  ];
  return (
    <div>
      <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-4">OCR Extraction</div>
      <div className="relative bg-black/[0.02] rounded-xl p-3 border border-black/[0.05] overflow-hidden mb-3">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: ['0%', '500%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
          />
        </div>
        <div className="text-[9px] font-mono text-muted/60 leading-5">
          {['HDFC BANK STATEMENT', 'A/C: XXXX4521', 'Period: Jan–Mar 2024', '...extracting fields...'].map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>
              {l}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.18, duration: 0.35 }}
            className="flex justify-between items-center py-2 border-b border-black/[0.04] last:border-0"
          >
            <span className="text-[10px] text-muted">{f.label}</span>
            <span className="text-xs font-semibold text-ink">{f.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GSTPanel() {
  const items = [
    { label: 'Declared Turnover', declared: '₹58.4L', actual: '₹61.2L', match: 95 },
    { label: 'Tax Paid', declared: '₹5.2L', actual: '₹5.5L', match: 94 },
    { label: 'ITC Claimed', declared: '₹1.8L', actual: '₹1.8L', match: 100 },
  ];
  return (
    <div>
      <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-4">GST Cross-Validation</div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            className="bg-white rounded-xl p-3 border border-black/[0.06]"
          >
            <div className="flex justify-between text-[10px] mb-2">
              <span className="text-muted">{item.label}</span>
              <span className={`font-semibold ${item.match >= 98 ? 'text-green-600' : item.match >= 90 ? 'text-amber-600' : 'text-red-500'}`}>
                {item.match}% match
              </span>
            </div>
            <div className="flex gap-2 text-[10px] mb-2">
              <span className="text-muted">Filed: <strong className="text-ink">{item.declared}</strong></span>
              <span className="text-muted">·</span>
              <span className="text-muted">Actual: <strong className="text-ink">{item.actual}</strong></span>
            </div>
            <div className="h-1.5 bg-black/[0.05] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.match}%` }}
                transition={{ delay: i * 0.3 + 0.3, duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${item.match >= 98 ? 'bg-green-500' : 'bg-amber-500'}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RiskPanel() {
  const signals = [
    { label: 'Salary irregularity', level: 'LOW', color: 'text-green-600 bg-green-50' },
    { label: 'Cheque bounces (3)', level: 'MED', color: 'text-amber-600 bg-amber-50' },
    { label: 'Leverage ratio', level: 'LOW', color: 'text-green-600 bg-green-50' },
    { label: 'Cash withdrawals', level: 'HIGH', color: 'text-red-600 bg-red-50' },
    { label: 'GST discrepancy', level: 'LOW', color: 'text-green-600 bg-green-50' },
  ];
  return (
    <div>
      <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-4">Risk Signal Analysis</div>
      <div className="space-y-2">
        {signals.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.22 }}
            className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-black/[0.05]"
          >
            <span className="text-[10px] text-ink">{s.label}</span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.color}`}>{s.level}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ScorePanel() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let s = 0;
      const interval = setInterval(() => {
        s += 4;
        if (s >= 742) { setScore(742); clearInterval(interval); }
        else setScore(s);
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const pct = (score / 900) * 100;
  const r = 48, cx = 64, cy = 64;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div>
      <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-4">AI Credit Score</div>
      <div className="flex items-center gap-6">
        <div className="relative shrink-0">
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="8" />
            <motion.circle
              cx={cx} cy={cy} r={r} fill="none"
              stroke="#5E0ED7" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.8, ease: 'easeOut', delay: 0.3 }}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-ink tracking-tighter">{score}</div>
            <div className="text-[9px] text-muted">/900</div>
          </div>
        </div>
        <div className="space-y-2 flex-1">
          {[
            { label: 'Creditworthiness', val: 88 },
            { label: 'Cash Flow', val: 76 },
            { label: 'Repayment Capacity', val: 91 },
          ].map((item, i) => (
            <div key={item.label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-muted">{item.label}</span>
                <span className="font-semibold text-ink">{item.val}%</span>
              </div>
              <div className="h-1 bg-black/[0.06] rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.val}%` }}
                  transition={{ delay: 0.6 + i * 0.2, duration: 0.8 }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecisionPanel() {
  return (
    <div className="text-center py-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
        className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mx-auto mb-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="text-lg font-bold text-ink mb-1">Loan Approved</div>
        <div className="text-sm text-muted mb-4">Confidence: 94.2%</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Amount', val: '₹25L' },
            { label: 'Rate', val: '11.5%' },
            { label: 'Tenure', val: '36M' },
          ].map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.12 }}
              className="bg-white rounded-xl p-2 border border-black/[0.06]"
            >
              <div className="text-sm font-bold text-ink">{d.val}</div>
              <div className="text-[9px] text-muted">{d.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkflowDashboard({ compact = false }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);

  const step = STEPS[active];
  const StepIcon = step.icon;

  const advance = () => {
    setActive(a => (a + 1) % STEPS.length);
    setProgress(0);
  };

  useEffect(() => {
    setProgress(0);
    const dur = STEPS[active].duration;
    const tick = 50;
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressRef.current); return 100; }
        return p + (tick / dur) * 100;
      });
    }, tick);
    timerRef.current = setTimeout(advance, dur);
    return () => {
      clearInterval(progressRef.current);
      clearTimeout(timerRef.current);
    };
  }, [active]);

  return (
    <div className={`relative bg-[#FAFAFA] rounded-2xl border border-black/[0.07] overflow-hidden shadow-card ${compact ? 'w-full' : ''}`}
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.05)' }}>

      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-black/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-5 bg-black/[0.04] rounded-md flex items-center px-2">
            <span className="text-[9px] text-muted/60 font-mono">metis.ai/underwriting</span>
          </div>
        </div>
        <div className="text-[9px] font-semibold text-accent">● LIVE</div>
      </div>

      {/* Step nav */}
      <div className="flex border-b border-black/[0.05] overflow-x-auto scrollbar-none">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = i < active;
          const isCur = i === active;
          return (
            <button
              key={s.id}
              onClick={() => { setActive(i); setProgress(0); }}
              className={`flex-1 min-w-[80px] flex flex-col items-center gap-1 py-2.5 px-2 text-[9px] font-semibold tracking-wide transition-all border-b-2 ${
                isCur ? 'border-accent text-accent bg-accent/[0.04]' : done ? 'border-transparent text-green-600' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="leading-tight text-center hidden sm:block">{s.label.split(' ')[0]}</span>
              {done && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-black/[0.04]">
        <motion.div
          className="h-full bg-accent origin-left"
          style={{ scaleX: progress / 100 }}
          transition={{ duration: 0.05 }}
        />
      </div>

      {/* Content panel */}
      <div className="p-4 min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${step.color}18` }}>
                <StepIcon className="w-3.5 h-3.5" style={{ color: step.color }} />
              </div>
              <div>
                <div className="text-xs font-semibold text-ink">{step.label}</div>
                <div className="text-[9px] text-muted">Processing...</div>
              </div>
              <div className="ml-auto text-[10px] font-mono text-muted">{Math.round(progress)}%</div>
            </div>

            {/* Dynamic content */}
            <div key={`content-${active}`}>
              {STEPS[active].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
