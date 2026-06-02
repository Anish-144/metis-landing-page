import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

const inputClasses = "w-full bg-transparent border-b border-black/15 pb-4 text-sm font-medium text-ink focus:outline-none focus:border-accent transition-all placeholder:text-black/25";

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[10px] font-semibold tracking-widest text-muted uppercase mb-3">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', updates: true });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-white border-t border-black/[0.06] overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-label mb-6">Contact Us</div>
            <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tighter mb-8">
              Let's talk about your lending stack.
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center border border-green-200 rounded-2xl bg-green-50"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 border border-green-300 flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h3 className="text-xl font-bold text-ink mb-2">Thanks for reaching out.</h3>
                <p className="text-sm text-muted">Our team will be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field label="Your Name" htmlFor="name">
                    <input id="name" required placeholder="Jane Doe" className={inputClasses}
                      value={form.name} onChange={e => update('name', e.target.value)} />
                  </Field>
                  <Field label="Work Email" htmlFor="email">
                    <input id="email" type="email" required placeholder="jane@company.com" className={inputClasses}
                      value={form.email} onChange={e => update('email', e.target.value)} />
                  </Field>
                </div>
                <Field label="Company / Institution" htmlFor="company">
                  <input id="company" placeholder="HDFC Bank, Bajaj Finance, etc." className={inputClasses}
                    value={form.company} onChange={e => update('company', e.target.value)} />
                </Field>
                <Field label="How can we help?" htmlFor="message">
                  <textarea id="message" required placeholder="Tell us about your lending operations, team size, and goals…" rows={4}
                    className={`${inputClasses} resize-none`}
                    value={form.message} onChange={e => update('message', e.target.value)} />
                </Field>

                <div className="flex items-start gap-3">
                  <input id="updates" type="checkbox" checked={form.updates}
                    onChange={e => update('updates', e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-accent cursor-pointer" />
                  <label htmlFor="updates" className="text-xs text-muted leading-relaxed cursor-pointer">
                    I agree to receive product updates and communications from Metis Intelligence.
                  </label>
                </div>

                <button type="submit" className="btn-primary w-fit">
                  Send Message <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:pt-28"
          >
            <div className="space-y-8 mb-12">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/[0.08] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-muted uppercase mb-2">Headquarters</div>
                  <p className="text-sm text-ink leading-relaxed">
                    Metis Intelligence Pvt. Ltd.<br />
                    Bandra Kurla Complex<br />
                    Mumbai, Maharashtra 400051
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/[0.08] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest text-muted uppercase mb-2">Email</div>
                  <a href="mailto:hello@metis.ai" className="text-sm text-ink hover:text-accent transition-colors font-medium">
                    hello@metis.ai
                  </a>
                </div>
              </div>
            </div>

            {/* Accent quote */}
            <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-black/[0.07]">
              <div className="text-4xl font-bold text-ink tracking-tighter leading-none">DATA_</div>
              <div className="text-4xl font-bold text-accent tracking-tighter leading-none">DRIVEN.</div>
              <p className="text-xs text-muted mt-4 leading-relaxed">
                Every decision at Metis is grounded in data — including how we serve our clients.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
