import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name:'', email:'', message:'', updates:true });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const InputLabel = ({ htmlFor, children }) => (
    <label htmlFor={htmlFor} className="block text-[10px] font-bold tracking-widest text-slate-500 mb-2 uppercase">
      {children}
    </label>
  );

  const inputClasses = "w-full bg-transparent border-b border-gray-300 pb-4 text-sm font-semibold tracking-widest text-black focus:outline-none focus:border-accent transition-all placeholder:text-gray-400";

  return (
    <section id="contact" className="bg-base text-black py-24 md:py-32 font-inter uppercase relative">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left side Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs font-semibold tracking-widest text-accent mb-8">CONTACT US</div>
          
          {submitted ? (
            <div className="py-20">
              <h2 className="text-3xl font-semibold tracking-widest mb-4 text-black">THANKS FOR REACHING OUT.</h2>
              <p className="text-slate-600 tracking-widest">WE WILL BE IN TOUCH SHORTLY.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <InputLabel htmlFor="name">NAME</InputLabel>
                  <input id="name" required placeholder="JANE DOE" className={inputClasses} value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} />
                </div>
                <div>
                  <InputLabel htmlFor="email">EMAIL</InputLabel>
                  <input id="email" type="email" required placeholder="JANE@COMPANY.COM" className={inputClasses} value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} />
                </div>
              </div>

              <div>
                <InputLabel htmlFor="message">MESSAGE</InputLabel>
                <textarea id="message" required placeholder="HOW CAN WE HELP?" rows={3} className={`${inputClasses} resize-none`} value={formData.message} onChange={e=>setFormData({...formData, message:e.target.value})} />
              </div>

              <div className="flex items-center gap-3">
                <input id="updates" type="checkbox" checked={formData.updates} onChange={e=>setFormData({...formData, updates:e.target.checked})}
                  className="w-4 h-4 bg-transparent border border-gray-300 rounded-none accent-accent cursor-pointer"
                />
                <label htmlFor="updates" className="text-[10px] font-semibold tracking-widest text-slate-500 cursor-pointer select-none">
                  I AGREE TO RECEIVE COMMUNICATIONS FROM METIS
                </label>
              </div>

              <button type="submit" className="w-fit flex items-center gap-2 text-sm text-accent font-semibold tracking-widest hover:opacity-80 transition-opacity mt-4 group">
                SUBMIT <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" strokeWidth={2.5} />
              </button>
            </form>
          )}
        </motion.div>

        {/* Right side decoration / info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between border-l border-gray-200 pl-10 lg:pl-20"
        >
          <div>
            <h3 className="text-xl font-semibold tracking-widest mb-6">MUMBAI HQ</h3>
            <p className="text-xs tracking-widest text-slate-500 leading-loose normal-case">
              METIS INTELLIGENCE PVT LTD.<br />
              BANDRA KURLA COMPLEX<br />
              MUMBAI, MAHARASHTRA 400051<br />
              HELLO@METIS.AI
            </p>
          </div>

          <div className="mt-20">
            <div className="text-8xl text-black">DATA_</div>
            <div className="text-8xl text-accent">DRIVEN.</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
