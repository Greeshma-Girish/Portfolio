import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          scrub: 0.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return <div id="bar" ref={barRef} />;
}
