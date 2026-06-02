import { useEffect, useRef, useState } from 'react';

/**
 * AnimatedCounter — smoothly counts up to `to` when it enters viewport.
 */
export default function AnimatedCounter({ to, prefix = '', suffix = '', duration = 1800, decimals = 0, className = '' }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const target = parseFloat(String(to).replace(/[^0-9.]/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(target * easeOut);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
