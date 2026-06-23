import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Clock, Database, Zap, BarChart3, CheckCircle } from 'lucide-react';

/* ─────────────────────────────────────────
   ACT 1 — Problem panel
───────────────────────────────────────── */
const PROBLEMS = [
  { icon: Database, title: 'Fragmented Data', body: 'Customer data remains scattered across multiple systems and sources.', strike: true },
  { icon: AlertTriangle, title: 'Static Risk', body: 'Risk models are built on outdated, static data rather than real-time borrower behavior.', strike: true },
  { icon: Clock, title: 'Reactive Collections', body: 'Collections begin after delinquencies instead of through early risk prevention.', strike: true },
  { icon: Zap, title: 'Fragmented Workflows', body: 'Most lenders operate on systems that provide point solutions.', strike: true },
];

/* ─────────────────────────────────────────
   ACT 2 — AI pipeline panel
───────────────────────────────────────── */
const PIPELINE = [
  { id: 'data', label: 'Borrower Data', detail: 'Automated extraction from diverse data sources.', color: '#5E0ED7' },
  { id: 'intelligence', label: 'Intelligence', detail: 'AI structuring and reconciliation of financial behavior.', color: '#7c3aed' },
  { id: 'decision', label: 'Decision', detail: 'Intelligent underwriting and scoring workflows.', color: '#5E0ED7' },
  { id: 'monitoring', label: 'Monitoring', detail: 'Continuous evaluation of portfolio health.', color: '#16a34a' },
  { id: 'action', label: 'Action', detail: 'Explainable recommendations for timely intervention.', color: '#5E0ED7' },
];

/* ─────────────────────────────────────────
   ACT 3 — Decision dashboard panel
───────────────────────────────────────── */
const DECISIONS = [
  { name: 'Ramesh K.', score: 742, conf: 94, verdict: 'APPROVE', color: 'text-green-600 bg-green-50 border-green-200' },
  { name: 'Priya M.', score: 581, conf: 71, verdict: 'REVIEW', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { name: 'Suresh V.', score: 398, conf: 88, verdict: 'DECLINE', color: 'text-red-600 bg-red-50 border-red-200' },
];

function ProblemCard({ icon: Icon, title, body, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4 p-5 rounded-2xl bg-white border border-black/[0.07] shadow-card group overflow-hidden"
    >
      {/* Diagonal strikethrough line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ delay: delay + 0.4, duration: 0.5 }}
        className="absolute left-0 right-0 top-1/2 h-px bg-red-400/60 origin-left z-10"
        style={{ transform: 'translateY(-50%)' }}
      />
      <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-red-500" />
      </div>
      <div>
        <div className="text-sm font-semibold text-ink mb-1">{title}</div>
        <div className="text-xs text-muted leading-relaxed">{body}</div>
      </div>
    </motion.div>
  );
}

function PipelineStep({ id, label, detail, color, index, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ delay: index * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-start gap-4"
    >
      {/* Connector line */}
      {index < total - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
          className="absolute left-4 top-10 w-px h-8 origin-top"
          style={{ background: `${color}40` }}
        />
      )}

      {/* Icon node */}
      <motion.div
        whileInView={{ boxShadow: [`0 0 0 0 ${color}30`, `0 0 0 8px ${color}00`] }}
        transition={{ delay: index * 0.15 + 0.4, duration: 0.8 }}
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold"
        style={{ borderColor: color, color, background: `${color}10` }}
      >
        {index + 1}
      </motion.div>

      <div className="pt-1">
        <div className="text-sm font-semibold text-white">{label}</div>
        <div className="text-xs text-white/50 mt-0.5">{detail}</div>
      </div>
    </motion.div>
  );
}

function ScoreRing({ score, conf, delay }) {
  const pct = (score / 900) * 100;
  const r = 28, cx = 36, cy = 36;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[72px] h-[72px]">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5" />
          <motion.circle
            cx={cx} cy={cy} r={r} fill="none"
            stroke="#5E0ED7" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - (pct / 100) * circ }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ delay, duration: 1.2, ease: 'easeOut' }}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-ink">{score}</span>
          <span className="text-[8px] text-muted">/ 900</span>
        </div>
      </div>
      <div>
        <div className="text-[10px] text-muted">Confidence</div>
        <div className="text-sm font-bold text-ink">{conf}%</div>
      </div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section id="scroll-story" className="relative overflow-hidden">

      {/* ─── ACT 1: The Problem ─── */}
      <div className="relative py-28 md:py-40 bg-white border-t border-black/[0.06]">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                className="section-label mb-6"
              >
                The Problem
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-5xl font-bold text-ink leading-[1.05] tracking-tighter mb-6"
              >
                Lending Workflows<br />
                Were Never Built for<br />
                <span className="line-through text-red-400 decoration-red-400">Real-Time Intelligence.</span>
              </motion.h2>
            </div>

            <div className="flex flex-col gap-4">
              {PROBLEMS.map((p, i) => (
                <ProblemCard key={p.title} {...p} delay={i * 0.15} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── ACT 2: AI Pipeline ─── */}
      <div className="relative py-28 md:py-40 bg-ink overflow-hidden">
        {/* Dark dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Purple glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(94,14,215,0.18) 0%, transparent 65%)' }} />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Pipeline steps */}
            <div className="flex flex-col gap-8">
              {PIPELINE.map((step, i) => (
                <PipelineStep key={step.id} {...step} index={i} total={PIPELINE.length} />
              ))}
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> The Metis Approach
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tighter mb-6"
              >
                ONE PLATFORM<br />
                <span className="gradient-text text-3xl md:text-4xl">THE COMPLETE CREDIT WORKFLOW</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-base text-white/50 leading-relaxed max-w-md mb-8 font-semibold tracking-wide"
              >
                MOST VENDORS STOP AT DATA. METIS COMPLETES THE DECISION LOOP.
              </motion.p>

              {/* Speed stat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="inline-flex items-center gap-4 p-5 rounded-2xl border border-white/10 glass-dark"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white tracking-tighter">&lt; 90 sec</div>
                  <div className="text-xs text-white/40">Average decision time</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ACT 3: Decision Intelligence ─── */}
      <div className="relative py-28 md:py-40 bg-white border-b border-black/[0.06]">
        <div className="absolute inset-0 aurora pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-label mb-6"
              >
                Decision Intelligence
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.05] tracking-tighter mb-6"
              >
                Every decision,<br />
                <span className="gradient-text">explained</span><br />
                and auditable.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-base text-muted leading-relaxed max-w-md mb-8"
              >
                Not a black box. Metis provides confidence scores, feature attribution, and full audit trails for every credit decision — compliant with RBI's explainability guidelines.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                className="flex flex-wrap gap-3"
              >
                {['RBI Compliant', 'Full Audit Trail', 'Explainable AI', 'SOC 2 Ready'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full border border-accent/20 bg-accent/[0.06] text-xs font-semibold text-accent">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Decision dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FAFAFA] rounded-2xl border border-black/[0.07] overflow-hidden shadow-card"
            >
              {/* Panel header */}
              <div className="px-5 py-4 border-b border-black/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-ink">Risk Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-semibold text-muted">Live</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="text-[10px] font-semibold tracking-widest text-muted uppercase mb-2">
                  Today's Queue
                </div>
                {DECISIONS.map((d, i) => (
                  <motion.div
                    key={d.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-black/[0.06]"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent shrink-0">
                      {d.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-ink">{d.name}</div>
                      <ScoreRing score={d.score} conf={d.conf} delay={0.5 + i * 0.15} />
                    </div>
                    <div className={`px-3 py-1.5 rounded-full border text-[10px] font-bold shrink-0 ${d.color}`}>
                      {d.verdict}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
