import { motion } from 'framer-motion';

const NAV_LINKS = {
  Platform: ['QANAT — Underwriting', 'NETRA — Monitoring', 'Collections Intelligence', 'Integrations'],
  Company: ['About Us', 'Client Outcomes', 'Blog', 'Careers'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Data Processing Agreement', 'Security'],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/[0.06] overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-16 pb-8">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
              <span className="text-sm font-bold tracking-widest text-ink uppercase">Metis</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs mb-6">
              Metis Intelligence. Automating decisions. Predicting risk. Driving growth for future-ready lenders.
            </p>
            <a href="mailto:hello@metis.ai" className="text-sm font-medium text-ink hover:text-accent transition-colors">
              hello@metis.ai
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(NAV_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[10px] font-bold tracking-widest text-accent uppercase mb-5">{category}</h4>
              <ul className="flex flex-col gap-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted">
            © {new Date().getFullYear()} Metis Intelligence Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            {['RBI Compliant', 'SOC 2 Type II', 'ISO 27001'].map(b => (
              <span key={b} className="px-2.5 py-1 rounded-full border border-black/[0.08] text-[10px] font-semibold text-muted">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="border-t border-black/[0.06] bg-[#FAFAFA] overflow-hidden py-4 select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[1, 2].map(n => (
            <div key={n} className="flex gap-8 px-4 text-[clamp(3rem,8vw,6rem)] font-bold tracking-tighter text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(0,0,0,0.08)' }}>
              <span>METIS — DECISION INTELLIGENCE — </span>
              <span>METIS — DECISION INTELLIGENCE — </span>
            </div>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
