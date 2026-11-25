import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ME } from '../data/portfolio';

export default function ContactSection({ reduceMotion, onScrollTop }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '#ct .in',
        { scale: 0.85, opacity: 0.2 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section className="st" id="ct" ref={sectionRef}>
      {!reduceMotion && (
        <>
          <div className="fl" data-s="-45" style={{ left: '10%', top: '20%' }}>
            ✏️
          </div>
          <div className="fl" data-s="55" style={{ right: '10%', top: '62%' }}>
            🌿
          </div>
          <div className="gh" data-gh-index="3">
            HELLO
          </div>
        </>
      )}
      <div className="in">
        <p className="k mono">05 · Contact</p>
        <h2>Let’s build something.</h2>
        <a className="big" href={`mailto:${ME.email}`}>
          {ME.email}
        </a>
        <div className="lk mono">
          <a href={ME.ghHref} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
          <a href={ME.liHref} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a href={ME.phoneHref}>{ME.phone}</a>
        </div>
        <button
          className="bt"
          id="up"
          type="button"
          style={{ border: 0, cursor: 'pointer' }}
          onClick={onScrollTop}
        >
          Back to top ↑
        </button>
      </div>
    </section>
  );
}
