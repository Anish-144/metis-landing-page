import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

const TRUST_BADGES = ['RBI Compliant', 'SOC 2 Type II', 'ISO 27001', 'DPDP Act Ready'];

/* Animated grid of glowing data nodes */
function AnimatedGrid() {
  const nodes = Array.from({ length: 48 }, (_, i) => ({ id: i, x: (i % 8) * 12.5, y: Math.floor(i / 8) * 16.66 }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="final-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#final-grid)" />
      </svg>

      {/* Glowing nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute w-1 h-1 rounded-full bg-accent"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Radial gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 20%, #0A0A0A 75%)' }} />
    </div>
  );
}

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 bg-ink overflow-hidden">
      <AnimatedGrid />

      {/* Purple glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(94,14,215,0.2) 0%, transparent 65%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-8 md:px-12 text-center">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-accent uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          The Future of Lending
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.0] tracking-tighter mb-8"
        >
          Build the Future<br />
          of <span className="gradient-text">Lending.</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-lg md:text-xl text-white/50 leading-relaxed mb-12 max-w-xl mx-auto font-normal"
        >
          Automate underwriting, monitor risk in real time, and scale credit decisions with confidence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a href="#contact" className="btn-primary px-8 py-4 text-sm">
            Book a Demo <ArrowUpRight className="w-4 h-4" />
          </a>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            Talk to Experts
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {TRUST_BADGES.map(badge => (
            <span key={badge} className="px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-semibold text-white/40 tracking-wide">
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
