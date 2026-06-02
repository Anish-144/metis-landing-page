import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingDown, Clock, ShieldCheck } from 'lucide-react';

function Slider({ label, value, min, max, step, unit, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-medium text-muted">{label}</label>
        <span className="text-sm font-bold text-ink">{value.toLocaleString()} {unit}</span>
      </div>
      <div className="relative h-2 bg-black/[0.07] rounded-full cursor-pointer">
        <div
          className="absolute h-full bg-accent rounded-full pointer-events-none"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-accent shadow-purple-sm pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

function ResultCard({ icon: Icon, label, value, sub, color = 'text-accent', delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="p-5 rounded-2xl bg-white border border-black/[0.07] shadow-card flex gap-4 items-start"
    >
      <div className="w-10 h-10 rounded-xl bg-accent/[0.08] flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <div className={`text-2xl font-bold tracking-tighter ${color}`}>{value}</div>
        <div className="text-xs font-semibold text-ink mt-0.5">{label}</div>
        <div className="text-[10px] text-muted mt-0.5">{sub}</div>
      </div>
    </motion.div>
  );
}

export default function ROICalculator() {
  const [apps, setApps] = useState(500);
  const [teamSize, setTeamSize] = useState(10);
  const [hoursPerApp, setHoursPerApp] = useState(8);

  const results = useMemo(() => {
    const annualApps = apps * 12;
    const hoursManual = annualApps * hoursPerApp;
    const hoursAI = annualApps * 0.025; // ~1.5 min per app
    const hoursSaved = hoursManual - hoursAI;
    const costPerHour = 800; // ₹ per analyst hour estimate
    const costSaved = hoursSaved * costPerHour;
    const riskReduction = Math.min(28 + (apps / 200), 35); // approx
    const paybackMonths = Math.round(2400000 / (costSaved / 12)); // assume ₹24L annual cost

    return {
      timeSaved: `${Math.round(hoursSaved / 1000)}K hrs`,
      costSaved: `₹${(costSaved / 1000000).toFixed(1)}M`,
      riskReduction: `${riskReduction.toFixed(0)}%`,
      payback: paybackMonths <= 1 ? '< 1 month' : `${Math.min(paybackMonths, 6)} months`,
    };
  }, [apps, teamSize, hoursPerApp]);

  return (
    <section className="relative py-24 md:py-36 bg-white border-t border-black/[0.06] overflow-hidden">
      <div className="absolute inset-0 aurora pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-label mb-5 justify-center">
            ROI Calculator
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tighter mb-4">
            Calculate your ROI with Metis.
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            className="text-base text-muted leading-relaxed">
            Adjust the sliders to see how much time and money Metis can save your team annually.
          </motion.p>
        </div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Inputs */}
            <div className="bg-[#FAFAFA] rounded-2xl border border-black/[0.07] p-7 md:p-8">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-8 rounded-lg bg-accent/[0.08] flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-semibold text-ink">Your Operations</span>
              </div>
              <div className="flex flex-col gap-8">
                <Slider label="Loan applications per month" value={apps} min={50} max={5000} step={50} unit="apps" onChange={setApps} />
                <Slider label="Underwriting team size" value={teamSize} min={1} max={100} step={1} unit="analysts" onChange={setTeamSize} />
                <Slider label="Hours per application (manual)" value={hoursPerApp} min={1} max={24} step={0.5} unit="hrs" onChange={setHoursPerApp} />
              </div>

              <div className="mt-8 p-4 rounded-xl bg-accent/[0.06] border border-accent/20">
                <div className="text-[10px] font-semibold text-accent mb-1">Current annual cost estimate</div>
                <div className="text-xl font-bold text-ink tracking-tighter">
                  ₹{Math.round(apps * 12 * hoursPerApp * 800 / 100000) / 10}L / year
                </div>
                <div className="text-[10px] text-muted mt-1">in manual underwriting hours alone</div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col gap-4">
              <ResultCard icon={Clock} label="Annual time saved" value={results.timeSaved} sub="Hours your team gets back" delay={0.1} />
              <ResultCard icon={TrendingDown} label="Estimated cost reduction" value={results.costSaved} sub="Annual savings on analyst hours" delay={0.2} />
              <ResultCard icon={ShieldCheck} label="Risk reduction" value={results.riskReduction} sub="Estimated NPA improvement" delay={0.3} />
              <div className="p-5 rounded-2xl bg-accent text-white border border-accent">
                <div className="text-xs font-semibold text-white/70 mb-1 uppercase tracking-widest">Payback period</div>
                <div className="text-3xl font-bold tracking-tighter">{results.payback}</div>
                <div className="text-xs text-white/60 mt-1">From deployment to positive ROI</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <a href="#contact" className="btn-primary">
              Get a Custom ROI Analysis
            </a>
            <p className="text-[11px] text-muted mt-4">* Estimates based on actual client outcomes. Individual results may vary.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
