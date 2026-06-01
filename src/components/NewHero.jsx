import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

export default function NewHero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Animation variants
  const fadeDown = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const fadeUp = {
    initial: { opacity: 0, y: 32 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const slideUp = {
    initial: { y: "110%" },
    animate: (i) => ({
      y: 0,
      transition: {
        delay: 0.4 + i * 0.14,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const navLinks = ["Story", "Expertise", "Studios", "Feedback"];
  const headingWords = ["Fearless", "Vision", "Delivered"];

  const stats = [
    { num: "300", label: "CRAFTED\nBRANDS" },
    { num: "200", label: "DIGITAL\nPRODUCTS" },
    { num: "100", label: "VENTURES\nFUNDED" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col font-inter uppercase tracking-widest text-black font-semibold overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4" type="video/mp4" />
      </video>

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6">
        
        {/* Left: Logo */}
        <motion.div 
          custom={0} initial="initial" animate="animate" variants={fadeDown}
          className="w-8 h-8 rounded-full border-2 border-[#5E0ED7] flex items-center justify-center shrink-0"
        >
          <div className="w-[10px] h-[10px] rounded-full bg-[#5E0ED7]" />
        </motion.div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link}
              href={`#${link.toLowerCase()}`}
              custom={i + 1} initial="initial" animate="animate" variants={fadeDown}
              className="text-sm tracking-widest uppercase hover:text-[#5E0ED7] transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>

        {/* Right: Hamburger Button */}
        <motion.button 
          custom={5} initial="initial" animate="animate" variants={fadeDown}
          onClick={() => setIsMobileMenuOpen(true)}
          className="w-9 h-9 rounded-full bg-black flex flex-col items-center justify-center gap-1 shrink-0 hover:bg-[#5E0ED7] transition-colors"
          aria-label="Open menu"
        >
          <span className="w-4 h-0.5 bg-white block" />
          <span className="w-4 h-0.5 bg-white block" />
          <span className="w-4 h-0.5 bg-white block" />
        </motion.button>
      </nav>

      {/* Stats Row (Middle) */}
      <div className="relative z-10 flex-1 flex items-center justify-end px-5 sm:px-8 md:px-12 py-8 md:py-0">
        <div className="flex flex-row items-center gap-5 sm:gap-8 md:gap-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.num}
              custom={i + 2} initial="initial" animate="animate" variants={fadeUp}
              className="flex flex-col text-right"
            >
              <div className="flex items-start justify-end leading-none font-semibold" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}>
                <span className="text-[#5E0ED7] text-[0.5em] leading-tight">+</span>
                <span className="text-black">{stat.num}</span>
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm tracking-widest uppercase whitespace-pre-line leading-tight mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex flex-col gap-6 md:gap-12 px-5 sm:px-8 md:px-12 pb-8 md:pb-12">
        
        {/* Row A: Tagline + CTA */}
        <div className="flex items-center justify-between gap-4">
          <motion.div 
            custom={5} initial="initial" animate="animate" variants={fadeUp}
            className="text-[10px] sm:text-xs md:text-sm tracking-widest uppercase max-w-[130px] sm:max-w-[160px] md:max-w-xs leading-relaxed"
          >
            SHAPING BOLD<br/>VISIONS INTO POWER<br/>FOR YOUR TRIBE
          </motion.div>
          
          <motion.a 
            href="#contact"
            custom={6} initial="initial" animate="animate" variants={fadeUp}
            className="flex items-center gap-1 sm:gap-2 text-base sm:text-xl md:text-2xl text-[#5E0ED7] font-semibold tracking-widest whitespace-nowrap hover:opacity-80 transition-opacity"
          >
            WORK WITH US <ArrowUpRight className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]" strokeWidth={2.5} />
          </motion.a>
        </div>

        {/* Row B: Description + Main Heading */}
        <div className="flex items-end justify-between gap-3 sm:gap-4">
          <motion.div 
            custom={7} initial="initial" animate="animate" variants={fadeUp}
            className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0 text-[9px] sm:text-xs md:text-sm tracking-widest uppercase text-left md:text-right leading-relaxed"
          >
            CREATIVE STUDIOS BUILT AROUND ELEVATING YOUR VISION INTO STRIKING REALITY
          </motion.div>

          <div className="flex flex-col items-end justify-end text-right">
            {headingWords.map((word, i) => (
              <div key={word} className="overflow-hidden leading-[0.88]">
                <motion.div 
                  custom={i} initial="initial" animate="animate" variants={slideUp}
                  className="text-black font-semibold uppercase"
                  style={{ fontSize: 'clamp(2rem, 9vw, 9rem)' }}
                >
                  {word}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col px-5 py-5 sm:px-8"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full border-2 border-[#5E0ED7] flex items-center justify-center">
                <div className="w-[10px] h-[10px] rounded-full bg-[#5E0ED7]" />
              </div>
              
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-black flex items-center justify-center hover:bg-[#5E0ED7] transition-colors"
                aria-label="Close menu"
              >
                <X className="text-white w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-8 mt-16">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="text-3xl font-semibold tracking-widest uppercase text-black hover:text-[#5E0ED7] transition-colors"
                >
                  {link}
                </motion.a>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto flex items-center gap-2 text-xl text-[#5E0ED7] font-semibold tracking-widest uppercase"
            >
              WORK WITH US <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
