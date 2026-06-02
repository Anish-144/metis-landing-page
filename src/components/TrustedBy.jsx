import { motion } from 'framer-motion';
import AnimatedCounter from './ui/AnimatedCounter.jsx';

const LOGOS = [
  { name: 'HDFC Bank', abbr: 'HDFC' },
  { name: 'Axis Bank', abbr: 'AXIS' },
  { name: 'RBL Bank', abbr: 'RBL' },
  { name: 'Bajaj Finance', abbr: 'BAJAJ' },
  { name: 'Poonawalla', abbr: 'POON' },
  { name: 'Chola Finance', abbr: 'CHOLA' },
  { name: 'InCred', abbr: 'INCRED' },
  { name: 'UGRO Capital', abbr: 'UGRO' },
];

const METRICS = [
  { value: 2400000, suffix: '', prefix: '', label: 'Documents Processed', display: '2.4M+' },
  { value: 48, suffix: 'K Cr', prefix: '₹', label: 'Loan Value Analyzed', display: '₹48K Cr' },
  { value: 99.2, suffix: '%', prefix: '', label: 'Data Accuracy Rate', display: '99.2%', decimals: 1 },
  { value: 320, suffix: '+', prefix: '', label: 'Lender Partnerships', display: '320+' },
];

function LogoChip({ name, abbr }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="flex items-center justify-center px-6 py-4 rounded-xl border border-black/[0.07] bg-white grayscale hover:grayscale-0 transition-all duration-300 cursor-default min-w-[120px] group"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="text-sm font-bold tracking-widest text-black/30 group-hover:text-accent transition-colors">
        {abbr}
      </div>
    </motion.div>
  );
}

export default function TrustedBy() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="py-20 border-t border-black/[0.06] bg-[#FAFAFA] overflow-hidden relative">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
            Trusted by India's leading lenders
          </span>
        </motion.div>

        {/* Scrolling logo strip */}
        <div className="relative mb-16">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 animate-[ticker_28s_linear_infinite]" style={{ width: 'max-content' }}>
            {doubled.map((logo, i) => (
              <LogoChip key={`${logo.abbr}-${i}`} {...logo} />
            ))}
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center p-6 rounded-2xl bg-white border border-black/[0.06] shadow-card"
            >
              <div className="text-3xl md:text-4xl font-bold text-ink tracking-tighter mb-1">
                <AnimatedCounter
                  to={m.value}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals || 0}
                  duration={2000}
                />
              </div>
              <div className="text-xs text-muted">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
