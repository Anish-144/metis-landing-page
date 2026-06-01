import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, { y: -80, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 });
    });
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { ctx.revert(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el && window.lenis) window.lenis.scrollTo(el, { offset: -72, duration: 1.4 });
    else if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const LINKS = [
    { label: 'Use Cases', href: '#case-studies' },
    { label: 'Products',  href: '#products'     },
    { label: 'About',     href: '#about'         },
    { label: 'Contact',   href: '#contact'       },
  ];

  return (
    <>
      <nav ref={navRef} style={{
        position: 'fixed', top:0, left:0, right:0,
        height: 'var(--nav-h, 72px)', zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.05)' : 'none',
        transition: 'background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
      }} aria-label="Main navigation">
        <div className="px-5 sm:px-8 md:px-12" style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:'1400px', margin:'0 auto' }}>
          
          {/* Logo */}
          <a href="#hero" onClick={e=>{e.preventDefault();scrollTo('#hero');}}
            className="font-inter font-bold tracking-tighter text-xl text-black"
            aria-label="Metis home">
            METIS
          </a>

          {/* Desktop nav */}
          <ul className="nav-desktop" style={{ display:'flex', gap:36, alignItems:'center' }}>
            {LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={e=>{e.preventDefault();scrollTo(l.href);}}
                  className="nav-lnk font-semibold tracking-widest text-xs uppercase text-black">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <a href="#contact" onClick={e=>{e.preventDefault();scrollTo('#contact');}}
              className="bg-black text-white px-6 py-3 font-semibold tracking-widest text-xs uppercase hover:bg-black/80 transition-colors nav-cta" id="nav-cta">
              Book a Demo
            </a>
            {/* Hamburger */}
            <button onClick={()=>setMenuOpen(m=>!m)} className="hamburger" aria-label="Menu" aria-expanded={menuOpen}>
              <span style={{ width:24, height:2, background:'#000', display:'block', borderRadius:2, transition:'transform 0.3s, opacity 0.3s', transform:menuOpen?'translateY(7px) rotate(45deg)':'' }} />
              <span style={{ width:24, height:2, background:'#000', display:'block', borderRadius:2, transition:'opacity 0.3s', opacity:menuOpen?0:1, margin:'5px 0' }} />
              <span style={{ width:24, height:2, background:'#000', display:'block', borderRadius:2, transition:'transform 0.3s', transform:menuOpen?'translateY(-7px) rotate(-45deg)':'' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:'fixed', top:'72px', left:0, right:0, zIndex:99,
          background:'rgba(255,255,255,0.97)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(0,0,0,0.05)', padding:'28px 24px 36px',
          display:'flex', flexDirection:'column', gap:20,
        }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e=>{e.preventDefault();scrollTo(l.href);}}
              className="font-semibold tracking-widest text-sm uppercase text-black" style={{ borderBottom:'1px solid rgba(0,0,0,0.05)', paddingBottom:16 }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={e=>{e.preventDefault();scrollTo('#contact');}}
            className="bg-black text-white px-6 py-3 font-semibold tracking-widest text-xs uppercase text-center mt-4" style={{ alignSelf:'flex-start' }}>
            Book a Demo
          </a>
        </div>
      )}

      <style>{`
        .nav-lnk { position: relative; }
        .nav-lnk::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:1.5px; background:#000; transform:scaleX(0); transform-origin:left; transition:transform 0.25s ease; }
        .nav-lnk:hover::after { transform:scaleX(1); }
        .hamburger { display:flex; flex-direction:column; padding:6px; }
        @media(max-width:768px) {
          .nav-desktop { display:none !important; }
          .nav-cta { display:none !important; }
        }
        @media(min-width:769px) { .hamburger { display:none !important; } }
      `}</style>
    </>
  );
}
