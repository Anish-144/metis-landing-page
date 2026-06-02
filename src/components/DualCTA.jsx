import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo.jsx';

const CARDS = [
  {
    title: "WE'LL CONTACT YOU",
    body: "We audit your lending stack and contact you with a proposal tailored to your portfolio.",
    cta: "SHARE YOUR CONTACT INFO",
    id: 'cta-card-contact',
  },
  {
    title: "CONTACT US",
    body: "Email or call us to start the discussion right away.",
    cta: "CONTACT INFORMATION",
    id: 'cta-card-info',
  },
];

export default function DualCTA() {
  return (
    <section id="dual-cta" className="relative bg-base text-black py-24 md:py-32 font-inter uppercase border-t border-gray-200 overflow-hidden">
      
      {/* Abstract Background Video */}
      <BackgroundVideo 
        src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-4172-large.mp4"
        className="opacity-5 mix-blend-multiply"
        style={{ filter: 'grayscale(1)' }}
      />

      {/* Heavy vignette for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#FFFFFF_80%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,14,215,0.05)_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide mb-6">
            READY TO WORK WITH US?
          </h2>
          <p className="text-sm md:text-base font-medium tracking-widest text-slate-500">
            CHOOSE HOW YOU WOULD LIKE TO GET IN TOUCH.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.map((card, i) => (
            <motion.a
              key={i}
              href="#contact"
              id={card.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group block bg-card border border-gray-200 p-10 md:p-12 hover:border-accent transition-all relative overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="text-xl md:text-2xl font-semibold tracking-widest mb-6 relative z-10 text-black">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm font-medium tracking-normal text-slate-600 leading-relaxed mb-12 relative z-10">
                {card.body}
              </p>
              
              <div className="flex items-center gap-2 text-sm text-accent font-semibold tracking-widest relative z-10 transition-all">
                {card.cta} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
