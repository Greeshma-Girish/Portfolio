import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { EXPERIENCES } from '../data/portfolio';

export default function ExperienceTimeline({ reduceMotion }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('#fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.tl',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true,
        },
      });

      gsap.utils.toArray('.rv', sectionRef.current).forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 ? -60 : 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });

      if (!reduceMotion) {
        gsap.utils.toArray('.ex', sectionRef.current).forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 60 + i * 30 },
            {
              y: -40 - i * 20,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section className="st" id="xp" style={{ minHeight: '80vh' }} ref={sectionRef}>
      {!reduceMotion && (
        <>
          <div className="fl" data-s="-60" style={{ left: '4%', top: '62%' }}>
            🎧
          </div>
          <div className="gh" data-gh-index="1">
            EXPERIENCE
          </div>
        </>
      )}
      <div className="fl" data-s="-40" style={{ right: '8%', top: '8%' }}>
        📎
      </div>
      <div className="in">
        <p className="k mono">03 · Experience</p>
        <h2>Internships</h2>
        <p className="sub">Two internships, two chapters.</p>
        <div className="tl">
          <div id="fill" />
          {EXPERIENCES.map((exp) => (
            <div key={exp.title} className="ex gc rv">
              <span className="mono">{exp.period}</span>
              <h3>{exp.title}</h3>
              <ul>
                {exp.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {exp.chips.map((chip) => (
                <span key={chip} className="ch">
                  {chip}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
