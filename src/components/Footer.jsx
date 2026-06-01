import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-base text-black pt-24 font-inter uppercase border-t border-gray-200 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center mb-6 shadow-sm">
              <div className="w-3 h-3 rounded-full bg-accent" />
            </div>
            <p className="text-xs font-medium tracking-widest text-slate-600 max-w-xs normal-case leading-relaxed">
              METIS INTELLIGENCE. AUTOMATING DECISIONS. PREDICTING RISK. DRIVING GROWTH FOR FUTURE-READY LENDERS.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-accent mb-6">PLATFORM</h4>
            <ul className="flex flex-col gap-4 text-xs font-semibold tracking-widest text-slate-600">
              <li><a href="#products" className="hover:text-black transition-colors">QANAT (UNDERWRITING)</a></li>
              <li><a href="#products" className="hover:text-black transition-colors">NETRA (MONITORING)</a></li>
              <li><a href="#products" className="hover:text-black transition-colors">COLLECTIONS</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold tracking-widest text-accent mb-6">COMPANY</h4>
            <ul className="flex flex-col gap-4 text-xs font-semibold tracking-widest text-slate-600">
              <li><a href="#about" className="hover:text-black transition-colors">ABOUT US</a></li>
              <li><a href="#case-studies" className="hover:text-black transition-colors">CLIENT OUTCOMES</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">CONTACT</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold tracking-widest text-black/50">
          <div>© {new Date().getFullYear()} METIS INTELLIGENCE PVT LTD. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-black transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>

      {/* Massive Marquee */}
      <div className="relative border-t border-gray-200 bg-card overflow-hidden py-4 select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {/* We render the text twice to create a seamless loop */}
          <div className="flex gap-8 px-4 text-[clamp(4rem,10vw,8rem)] font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.1)' }}>
            <span>METIS — DECISION INTELLIGENCE — </span>
            <span>METIS — DECISION INTELLIGENCE — </span>
          </div>
          <div className="flex gap-8 px-4 text-[clamp(4rem,10vw,8rem)] font-bold tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px rgba(0,0,0,0.1)' }}>
            <span>METIS — DECISION INTELLIGENCE — </span>
            <span>METIS — DECISION INTELLIGENCE — </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
