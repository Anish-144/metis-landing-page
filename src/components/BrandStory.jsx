import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo.jsx';

export default function BrandStory() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" ref={containerRef} className="relative bg-base text-black py-32 md:py-48 font-inter uppercase overflow-hidden">
      
      {/* Background Video (Abstract Blur) */}
      <BackgroundVideo 
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4"
        className="opacity-5 mix-blend-multiply"
        style={{ transform: 'scale(1.2)', filter: 'blur(20px) grayscale(1) contrast(1.5)' }}
      />

      {/* Radial gradient overlay to focus the center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#FFFFFF_80%)] z-0 pointer-events-none" />

      {/* Decorative light elements */}
      <motion.div 
        style={{ y: yLeft }}
        className="hidden md:block absolute left-10 top-[20%] w-[200px] h-[300px] bg-card border border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)] z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(94,14,215,0.05)_0%,transparent_50%)]" />
        <div className="absolute bottom-4 left-4 text-[10px] tracking-widest text-black/20 font-bold">NODE_ALPHA</div>
      </motion.div>

      <motion.div 
        style={{ y: yRight }}
        className="hidden md:block absolute right-10 top-[10%] w-[240px] h-[340px] bg-card border border-gray-200 shadow-[0_4px_30px_rgba(0,0,0,0.05)] z-10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(225deg,rgba(94,14,215,0.05)_0%,transparent_50%)]" />
        <div className="absolute top-4 right-4 text-[10px] tracking-widest text-black/20 font-bold">NODE_BETA</div>
      </motion.div>

      <div className="max-w-[800px] mx-auto px-5 sm:px-8 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs font-semibold tracking-widest text-accent mb-8 shadow-accent">THE PROBLEM</div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-wide leading-[1.1] mb-10 text-black group-hover:text-accent transition-all">
            DOES YOUR LENDING <br /> HAVE DATA ISSUES?
          </h2>
          <p className="text-sm md:text-base font-medium tracking-widest text-slate-600 max-w-xl mx-auto leading-relaxed mb-12 normal-case">
            LENDERS THINK THEIR DATA ISN'T GOOD ENOUGH TO MAKE AUTOMATED DECISIONS. THAT MANUAL UNDERWRITING IS SAFER. WE BELIEVE IT'S SLOWER, RISKIER, AND A WASTE OF YOUR TEAM'S POTENTIAL.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#about" className="px-8 py-4 border border-black text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors backdrop-blur-sm">
              READ OUR STORY
            </a>
            <a href="#contact" className="px-8 py-4 bg-accent text-white text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-accent/80 transition-colors backdrop-blur-sm">
              GET IN TOUCH <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
