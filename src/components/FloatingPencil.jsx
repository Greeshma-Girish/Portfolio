import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingPencil({ reduceMotion }) {
  const penRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;

    const h = document.getElementById('pjh');
    const pj = document.getElementById('pj');
    const pen = penRef.current;
    if (!h || !pj || !pen) return;

    const getMetrics = () => {
      const a = h.getBoundingClientRect();
      const b = pj.getBoundingClientRect();
      return {
        x0: a.left - 8,
        x1: a.right - 30,
        y: window.innerHeight * 0.15 + (a.top - b.top) + a.height * 0.82 - 66,
      };
    };

    const ctx = gsap.context(() => {
      gsap.set(h, { clipPath: 'inset(0 100% 0 0)' });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: pj,
          start: 'top bottom',
          end: () => '+=' + window.innerHeight * 1.25,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        pen,
        { x: () => window.innerWidth * 0.4, y: () => window.innerHeight * 0.7, rotation: 0 },
        {
          x: () => getMetrics().x0,
          y: () => getMetrics().y,
          rotation: -360,
          ease: 'power2.inOut',
          duration: 0.5,
        }
      )
        .to(h, { clipPath: 'inset(0 0% 0 0)', duration: 0.35 }, '>')
        .to(pen, { x: () => getMetrics().x1, rotation: -348, duration: 0.35 }, '<')
        .to(pen, { y: () => getMetrics().y - window.innerHeight * 0.4, duration: 0.4 })
        .to(pen, { opacity: 0, duration: 0.1 }, '-=.1');
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div id="pen" ref={penRef} aria-hidden="true">
      ✏️
    </div>
  );
}
