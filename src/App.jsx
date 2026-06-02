import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor.jsx';
import PremiumHero    from './components/PremiumHero.jsx';
import TrustedBy      from './components/TrustedBy.jsx';
import ScrollStory    from './components/ScrollStory.jsx';
import StickyDemo     from './components/StickyDemo.jsx';
import Products       from './components/Products.jsx';
import CaseStudies    from './components/CaseStudies.jsx';
import Testimonials   from './components/Testimonials.jsx';
import ROICalculator  from './components/ROICalculator.jsx';
import FinalCTA       from './components/FinalCTA.jsx';
import Contact        from './components/Contact.jsx';
import Footer         from './components/Footer.jsx';

export default function App() {
  useEffect(() => {
    document.body.classList.add('cursor-active');
    return () => document.body.classList.remove('cursor-active');
  }, []);

  return (
    <>
      <CustomCursor />
      <main className="bg-base text-ink font-inter selection:bg-accent selection:text-white">
        <PremiumHero />
        <TrustedBy />
        <ScrollStory />
        <StickyDemo />
        <Products />
        <CaseStudies />
        <Testimonials />
        <ROICalculator />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
