import { motion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo.jsx';

export default function QuoteStrip() {
  return (
    <section className="relative px-5 sm:px-8 md:px-12 py-20 md:py-32 bg-base text-black font-inter uppercase border-b border-gray-200 overflow-hidden" id="quote">
      
      {/* Background Video (Grayscale) */}
      <BackgroundVideo 
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
        className="opacity-5 mix-blend-multiply"
        style={{ filter: 'grayscale(1)' }}
      />

      {/* Light gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-base/50 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {/* Left massive provocation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide leading-[1.1]">
            IF YOUR PLATFORM CAN'T <span className="text-accent">IDENTIFY RISK</span> BEFORE IT BECOMES AN NPA, YOUR UNDERWRITING IS OBSOLETE.
          </h2>
        </motion.div>

        {/* Right sub-content / quotes */}
        <div className="flex flex-col gap-12 justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pl-6 border-l-2 border-accent"
          >
            <p className="text-sm sm:text-base font-semibold tracking-widest mb-4 leading-relaxed" style={{ color: '#000000' }}>
              "METIS AUTOMATES THE DATA EXTRACTION AND RISK SCORING PROCESS, ALLOWING OUR CREDIT TEAM TO FOCUS ON EDGE CASES INSTEAD OF MANUAL DATA ENTRY."
            </p>
            <div className="text-xs font-bold tracking-widest text-accent uppercase">
              &mdash; CHIEF RISK OFFICER, TOP TIER NBFC
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="pl-6 border-l-2 border-accent"
          >
            <p className="text-sm sm:text-base font-semibold tracking-widest mb-4 leading-relaxed" style={{ color: '#000000' }}>
              "BY IMPLEMENTING NETRA, WE SAW A 28% REDUCTION IN DELINQUENCY RATES WITHIN THE FIRST QUARTER OF ROLLOUT."
            </p>
            <div className="text-xs font-bold tracking-widest text-accent uppercase">
              &mdash; VP OF CREDIT, MSME LENDING CORP
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
