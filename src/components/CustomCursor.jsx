import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const posRef  = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hoverEl = useRef(null);
  const rafRef  = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Check if device is touch capable, hide custom cursor if so
    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const onMove = (e) => { posRef.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e) => {
      const t = e.target.closest('a, button, [data-hover], input, textarea');
      hoverEl.current = !!t;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);

    const tick = () => {
      const { x, y } = posRef.current;
      const hover = hoverEl.current;

      // Dot: instant
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;

      // Ring: lerp
      const lag = 0.15;
      ringPos.current.x += (x - ringPos.current.x) * lag;
      ringPos.current.y += (y - ringPos.current.y) * lag;
      const rSize = hover ? 48 : 36;
      ring.style.width = rSize + 'px';
      ring.style.height = rSize + 'px';
      ring.style.transform = `translate(${ringPos.current.x - rSize/2}px, ${ringPos.current.y - rSize/2}px)`;
      
      // Theme colors: Deep purple accent when hovering
      ring.style.borderColor = hover ? '#5E0ED7' : 'rgba(0,0,0,0.3)';
      ring.style.background  = hover ? 'rgba(94,14,215,0.05)' : 'transparent';
      dot.style.background = hover ? '#5E0ED7' : '#000000';

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const base = {
    position:'fixed', top:0, left:0, borderRadius:'50%',
    pointerEvents:'none', zIndex:9999,
  };

  return (
    <>
      <div ref={dotRef} aria-hidden="true" style={{ ...base,
        width:8, height:8, background:'#000000',
        zIndex: 10000,
      }} />
      <div ref={ringRef} aria-hidden="true" style={{ ...base,
        width:36, height:36, border:'1.5px solid rgba(0,0,0,0.3)',
        transition:'width 0.25s cubic-bezier(0.22, 1, 0.36, 1), height 0.25s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.2s, background 0.2s',
        zIndex: 9999,
      }} />
    </>
  );
}
