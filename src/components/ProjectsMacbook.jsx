import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PROJECTS } from '../data/portfolio';

export default function ProjectsMacbook({ reduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const pvRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.lid', {
        rotateX: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mac',
          start: 'top 90%',
          end: 'top 35%',
          scrub: true,
        },
      });

      if (!reduceMotion) {
        gsap.fromTo(
          '.mac',
          { y: 120, scale: 0.9 },
          {
            y: -30,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.mac',
              start: 'top bottom',
              end: 'top 30%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    if (!pvRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('#pv > *', {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
      });
    }, pvRef);

    return () => ctx.revert();
  }, [activeIndex]);

  const project = PROJECTS[activeIndex];

  return (
    <section className="st" id="pj" ref={sectionRef}>
      {!reduceMotion && (
        <>
          <div className="fl" data-s="50" style={{ right: '5%', top: '58%' }}>
            ☕
          </div>
          <div className="gh" data-gh-index="2">
            PROJECTS
          </div>
        </>
      )}
      <div className="fl" data-s="-40" style={{ left: '5%', top: '8%' }}>
        🗒️
      </div>
      <div className="in">
        <p className="k mono">02 · Projects</p>
        <h2 id="pjh">Projects</h2>
        <p className="sub">Scroll to open the lid, then click a tab to switch projects.</p>
        <div className="mac">
          <div className="lid">
            <div className="br" id="tabs">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  className={i === activeIndex ? 'on' : undefined}
                  onClick={() => setActiveIndex(i)}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <div id="pv" ref={pvRef}>
              <div
                className="th"
                style={{
                  background: project.img ? `url(${project.img}) center/cover` : project.gradient,
                }}
              >
                {project.title}
              </div>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.stack.map((tech) => (
                  <span key={tech} className="ch">
                    {tech}
                  </span>
                ))}
                <br />
                <a className="bt" href={project.live} target="_blank" rel="noopener noreferrer">
                  Live site ↗
                </a>
                <a className="bt g" href={project.gh} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
          <div className="bs" />
        </div>
      </div>
    </section>
  );
}
