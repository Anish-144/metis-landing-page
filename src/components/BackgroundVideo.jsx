import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export default function BackgroundVideo({ src, className = "", style = {} }) {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { margin: "0px" });

  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isInView) {
      videoRef.current.play().catch(e => console.log("Video auto-play prevented:", e));
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none ${className}`}
      style={style}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
