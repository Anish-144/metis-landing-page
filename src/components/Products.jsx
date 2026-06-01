import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    num: '01',
    title: 'QANAT — UNDERWRITING INTELLIGENCE',
    sub: 'BETTER DATA MAKES BETTER DECISIONS',
    body: 'Automate underwriting with comprehensive financial and behavioral borrower data. Bank statements, GST, ITR, and alternate signals — all structured and scored automatically.',
    cta: 'EXPLORE QANAT'
  },
  {
    num: '02',
    title: 'NETRA — DYNAMIC RISK MONITORING',
    sub: 'CONTINUOUS INTELLIGENCE, NOT PERIODIC REVIEWS',
    body: 'Identify emerging portfolio risks through real-time monitoring of borrower behavior, repayment patterns, and financial stress signals — before delinquency occurs.',
    cta: 'EXPLORE NETRA'
  },
  {
    num: '03',
    title: 'COLLECTIONS INTELLIGENCE',
    sub: 'PRIORITIZATION PROBLEM, NOT A VOLUME ONE',
    body: 'Drive proactive collection strategies with AI-led borrower segmentation, repayment propensity models, and real-time account monitoring workflows.',
    cta: 'EXPLORE COLLECTIONS'
  }
];

export default function Products() {
  return (
    <section id="products" className="bg-base text-black py-24 md:py-32 border-b border-gray-200 font-inter uppercase overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="text-xs font-semibold tracking-widest text-accent mb-4">OUR PLATFORM</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-widest leading-tight max-w-3xl">
            AI-POWERED WORKFLOWS FOR FUTURE-READY LENDERS
          </h2>
        </motion.div>

        <div className="flex flex-col">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-1 md:grid-cols-[100px_1fr_300px] gap-8 md:gap-12 py-12 border-t border-gray-200 hover:border-accent transition-colors"
            >
              {/* Number */}
              <div className="text-5xl md:text-7xl font-bold tracking-tighter text-black/10 group-hover:text-accent transition-all">
                {s.num}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-widest mb-3">{s.title}</h3>
                <div className="text-xs font-bold tracking-widest text-slate-500 mb-6">{s.sub}</div>
                <p className="text-sm font-medium tracking-widest text-slate-600 leading-relaxed max-w-2xl normal-case">
                  {s.body.toUpperCase()}
                </p>
                
                <a href="#contact" className="mt-8 flex items-center gap-2 text-sm text-accent font-semibold tracking-widest w-fit hover:opacity-80 transition-opacity">
                  {s.cta} <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                </a>
              </div>

              {/* Minimalist Graphic / Visual Placeholder */}
              <div className="hidden md:flex items-center justify-center border border-gray-200 bg-white group-hover:border-accent transition-all relative overflow-hidden h-full min-h-[200px]">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-[10px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-accent transition-colors">
                  METIS_MODULE_{s.num}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
