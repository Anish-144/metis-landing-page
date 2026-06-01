import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ── Canvas warm particle network ──
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COLORS = [
      'rgba(200,194,180,', 'rgba(168,160,152,',
      'rgba(216,210,200,', 'rgba(184,178,168,',
    ];
    const N = 90, MAX_D = 130;
    let raf, mouse = { x: null, y: null };

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.8 + 0.4;
        this.c = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.a = Math.random() * 0.5 + 0.15;
        this.ph = Math.random() * Math.PI * 2;
        this.sp = Math.random() * 0.001 + 0.0004;
      }
      update(t) {
        this.x += this.vx + Math.sin(t * this.sp + this.ph) * 0.22;
        this.y += this.vy + Math.cos(t * this.sp * 0.75 + this.ph) * 0.22;
        if (mouse.x) { const dx = mouse.x - this.x, dy = mouse.y - this.y, d2 = dx*dx+dy*dy; if (d2 < 180*180) { this.x += dx*0.0006; this.y += dy*0.0006; } }
        if (this.x < -8) this.x = canvas.width+8;
        if (this.x > canvas.width+8) this.x = -8;
        if (this.y < -8) this.y = canvas.height+8;
        if (this.y > canvas.height+8) this.y = -8;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = this.c + this.a + ')'; ctx.fill();
      }
    }

    const pts = Array.from({ length: N }, () => new P());

    const loop = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => p.update(t));
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y, d = Math.sqrt(dx*dx+dy*dy);
        if (d < MAX_D) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(168,162,152,${(1-d/MAX_D)*0.2})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }
      pts.forEach(p => p.draw());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX-r.left, y: e.clientY-r.top }; };
    const onLeave = () => { mouse = { x: null, y: null }; };
    canvas.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('mouseleave', onLeave);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" style={{
      position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0
    }} />
  );
}

// ── Mosaic cell ──
const SHADES = ['#C8C2B4','#D8D2C8','#A8A098','#D0CAC0','#B8B2A8','#BEB8B0'];

export default function Hero() {
  const sectionRef = useRef(null);
  const wordsRef   = useRef([]);
  const subRef     = useRef(null);
  const ctaRef     = useRef(null);
  const mosaicRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from(wordsRef.current.filter(Boolean), { y: '120%', opacity: 0, duration: 1, stagger: 0.06 })
        .from(subRef.current, { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(ctaRef.current?.children || [], { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.45')
        .from(mosaicRef.current?.children || [], { scale: 0.85, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'back.out(1.3)' }, '-=0.5');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const LINES = ['Where Data', 'Becomes', 'Decision', 'Intelligence'];
  let wordIdx = 0;

  return (
    <section id="hero" ref={sectionRef} style={{
      paddingTop: 'calc(var(--nav-h) + 80px)',
      paddingBottom: '100px',
      minHeight: '100svh',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleCanvas />

      <div className="padding-global" style={{ position:'relative', zIndex:1, width:'100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'center',
          maxWidth: 'var(--max-w)',
          margin: '0 auto',
        }}
          className="hero-grid"
        >
          {/* LEFT */}
          <div style={{ display:'flex', flexDirection:'column', gap:28 }}>
            <span className="label" style={{ opacity:0.65 }}>Decision Intelligence Platform</span>

            {/* BIG headline */}
            <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(52px,8vw,110px)', fontWeight:800, lineHeight:0.95, letterSpacing:'-0.03em', color:'var(--text-primary)' }}>
              {LINES.map((line, li) => (
                <span key={li} style={{ display:'block' }}>
                  {line.split(' ').map((word) => {
                    const i = wordIdx++;
                    return (
                      <span key={word+i} className="word-wrap">
                        <span className="word" ref={el => wordsRef.current[i] = el}>{word}&nbsp;</span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>

            <p ref={subRef} style={{ fontSize:18, color:'var(--text-secondary)', lineHeight:1.7, maxWidth:480, opacity:0 }}>
              A digital decisioning platform combining workflow automation,
              AI-driven intelligence, and risk management in one platform.
            </p>

            <div ref={ctaRef} style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center', opacity:0 }}>
              <a href="#contact" className="btn-primary" id="hero-demo">Book a Demo</a>
              <a href="#products" className="btn-ghost" id="hero-how">See How It Works →</a>
            </div>

            {/* Scroll indicator */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:4, opacity:0.45 }}>
              <div style={{ width:1, height:48, background:'linear-gradient(to bottom, var(--text-primary), transparent)', animation:'scrollPulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-muted)', fontWeight:600 }}>Scroll</span>
            </div>
          </div>

          {/* RIGHT — 3×2 mosaic */}
          <div ref={mosaicRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, clamp(140px, 18vw, 230px))',
            gap: 10,
          }} aria-label="Platform preview" role="img">
            {SHADES.map((bg, i) => (
              <div key={i} style={{
                background: bg, borderRadius: 14, position: 'relative', overflow: 'hidden',
                transition: 'transform 0.35s var(--ease-out)',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 55%)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse { 0%,100%{opacity:0.45;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }
        @media(max-width:900px){ .hero-grid{ grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}
