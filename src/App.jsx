import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor.jsx';
import NewHero      from './components/NewHero.jsx';
import QuoteStrip   from './components/QuoteStrip.jsx';
import CaseStudies  from './components/CaseStudies.jsx';
import Products     from './components/Products.jsx';
import Testimonials from './components/Testimonials.jsx';
import BrandStory   from './components/BrandStory.jsx';
import DualCTA      from './components/DualCTA.jsx';
import Contact      from './components/Contact.jsx';
import Footer       from './components/Footer.jsx';

export default function App() {
  useEffect(() => {
    document.body.classList.add('cursor-active');
    return () => document.body.classList.remove('cursor-active');
  }, []);

  return (
    <>
      <CustomCursor />
      <main className="bg-base text-black font-inter selection:bg-accent selection:text-white pb-24">
        <NewHero />
        <QuoteStrip />
        <Products />
        <CaseStudies />
        <Testimonials />
        <BrandStory />
        <DualCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
