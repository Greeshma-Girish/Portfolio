import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CATEGORIES, SKILLS } from '../data/portfolio';

export default function SkillsTable({ reduceMotion }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    open: false,
    left: 0,
    top: 0,
    skill: null,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.t', {
        scale: 0.6,
        opacity: 0,
        stagger: { each: 0.03, from: 'start' },
        duration: 0.5,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    const hideOnScroll = () => {
      setTooltip((prev) => (prev.open ? { ...prev, open: false } : prev));
    };
    window.addEventListener('scroll', hideOnScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', hideOnScroll);
    };
  }, []);

  const showTooltip = (skill, target) => {
    const rect = target.getBoundingClientRect();
    const left = Math.min(Math.max(8, rect.left), window.innerWidth - 262);
    const top = rect.bottom + 170 > window.innerHeight ? rect.top - 150 : rect.bottom + 10;
    setTooltip({ open: true, left, top, skill });
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <section className="st" id="sk" ref={sectionRef}>
        {!reduceMotion && (
          <div className="gh" data-gh-index="0">
            SKILLS
          </div>
        )}
        <div className="fl" data-s="-50" style={{ right: '6%', top: '10%' }}>
          🌿
        </div>
        <div className="in">
          <p className="k mono">04 · Skills</p>
          <h2>Periodic table of skills</h2>
          <p className="sub">Hover (or tap) an element to see the full name and what I learned.</p>
          <div id="grid" ref={gridRef}>
            {SKILLS.map((skill, idx) => (
              <div
                key={skill.name}
                className="t"
                tabIndex={0}
                style={{ '--c': CATEGORIES[skill.category] }}
                onMouseEnter={(e) => showTooltip(skill, e.currentTarget)}
                onFocus={(e) => showTooltip(skill, e.currentTarget)}
                onClick={(e) => showTooltip(skill, e.currentTarget)}
                onMouseLeave={hideTooltip}
                onBlur={hideTooltip}
              >
                <i>{idx + 1}</i>
                <b>{skill.symbol}</b>
                <u>{skill.name}</u>
              </div>
            ))}
          </div>
          <div className="lg" id="lg">
            {Object.entries(CATEGORIES).map(([name, color]) => (
              <span key={name} style={{ '--c': color }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div
        id="gl"
        className={tooltip.open ? 'on' : undefined}
        style={{ left: `${tooltip.left}px`, top: `${tooltip.top}px` }}
      >
        {tooltip.skill && (
          <>
            <small className="mono">{tooltip.skill.category}</small>
            <h4>{tooltip.skill.name}</h4>
            <p>
              <b>What I learned:</b> {tooltip.skill.note}
            </p>
          </>
        )}
      </div>
    </>
  );
}
