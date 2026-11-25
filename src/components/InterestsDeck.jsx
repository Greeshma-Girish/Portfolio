import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { HOBBIES } from '../data/portfolio';

export default function InterestsDeck() {
  const deckRef = useRef(null);
  const cards = useRef([]);
  const zTop = useRef(10);

  const spot = (i) => ({
    x: (i - (HOBBIES.length - 1) / 2) * 7,
    y: (i - (HOBBIES.length - 1) / 2) * -4,
    rotation: (i - (HOBBIES.length - 1) / 2) * 3.5,
  });

  const layout = useCallback((mode) => {
    const W = deckRef.current?.offsetWidth || 960;
    cards.current.forEach((c, i) => {
      if (!c) return;
      let p;
      if (mode === 'sort') {
        const cols = window.innerWidth < 640 ? 2 : 4;
        const col = i % cols;
        const row = Math.floor(i / cols);
        p = {
          x: (col - (cols - 1) / 2) * Math.min(220, W / (cols + 0.3)),
          y: (row - 0.3) * 295,
          rotation: 0,
        };
      } else if (mode === 'shuffle') {
        p = {
          x: gsap.utils.random(-W / 2 + 110, W / 2 - 110),
          y: gsap.utils.random(-140, 140),
          rotation: gsap.utils.random(-28, 28),
        };
      } else {
        p = spot(i);
      }
      gsap.to(c, { ...p, duration: 0.9, ease: 'back.out(1.3)', delay: i * 0.04 });
      const inner = c.querySelector('.ci');
      if (inner) gsap.to(inner, { rotationY: 0, duration: 0.4 });
      c.dataset.f = '0';
    });
  }, []);

  useEffect(() => {
    cards.current.forEach((c, i) => {
      if (c) gsap.set(c, spot(i));
    });
  }, []);

  const makeHandlers = (i) => {
    let st = null;
    return {
      onPointerDown(e) {
        const c = cards.current[i];
        if (!c) return;
        const sc = deckRef.current.getBoundingClientRect().width / deckRef.current.offsetWidth;
        st = {
          x: e.clientX, y: e.clientY,
          ox: gsap.getProperty(c, 'x'), oy: gsap.getProperty(c, 'y'),
          sc, lx: e.clientX, ly: e.clientY, vx: 0, vy: 0, m: 0,
        };
        gsap.killTweensOf(c);
        c.style.zIndex = ++zTop.current;
        c.setPointerCapture(e.pointerId);
        gsap.to(c, { scale: 1.07, duration: 0.18 });
      },
      onPointerMove(e) {
        if (!st) return;
        const c = cards.current[i];
        st.vx = e.clientX - st.lx; st.vy = e.clientY - st.ly;
        st.lx = e.clientX; st.ly = e.clientY;
        st.m += Math.abs(e.clientX - st.x) + Math.abs(e.clientY - st.y);
        gsap.set(c, {
          x: st.ox + (e.clientX - st.x) / st.sc,
          y: st.oy + (e.clientY - st.y) / st.sc,
          rotation: st.vx * 0.9,
        });
      },
      onPointerUp() {
        if (!st) return;
        const c = cards.current[i];
        const HW = (deckRef.current?.offsetWidth || 960) / 2 - 110;
        const HH = (deckRef.current?.offsetHeight || 500) / 2 - 40;
        gsap.to(c, { scale: 1, duration: 0.2 });

        if (st.m < 7) {
          const inner = c.querySelector('.ci');
          const flipped = c.dataset.f === '1';
          c.dataset.f = flipped ? '0' : '1';
          if (inner) gsap.to(inner, { rotationY: flipped ? 0 : 180, duration: 0.65, ease: 'power3.inOut' });
        } else {
          gsap.to(c, {
            x: gsap.utils.clamp(-HW, HW, gsap.getProperty(c, 'x') + st.vx * 15 / st.sc),
            y: gsap.utils.clamp(-HH, HH, gsap.getProperty(c, 'y') + st.vy * 15 / st.sc),
            rotation: st.vx * 2.5,
            duration: 1.1,
            ease: 'power3.out',
          });
        }
        st = null;
      },
    };
  };

  return (
    <section className="st" id="ib">
      <div className="fl" data-s="-45" style={{ right: '5%', top: '8%' }}>✦</div>
      <div className="in">
        <p className="k mono">05 · Interests</p>
        <h2>Beyond the code</h2>
        <p className="sub">Drag the cards, tap to flip — a few things I love outside of building.</p>

        <div className="deckwrap">
          <div className="deck" ref={deckRef}>
            {HOBBIES.map((h, i) => {
              const handlers = makeHandlers(i);
              return (
                <div
                  key={h.title}
                  className="card"
                  ref={(n) => { cards.current[i] = n; }}
                  data-f="0"
                  {...handlers}
                >
                  <div className="ci">
                    {/* Front */}
                    <div className="cf glass">
                      <div className="num">0{i + 1}</div>
                      <h4>{h.title}</h4>
                      <div className="chips">
                        {h.tags.map((t) => <i key={t}>{t}</i>)}
                      </div>
                      <span className="cf-hint mono">tap to flip ↩</span>
                    </div>
                    {/* Back */}
                    <div className="cf back glass">
                      <h4>{h.title}</h4>
                      <span className="cf-desc">{h.desc}</span>
                      {h.link && (
                        <a
                          href={h.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {h.linkLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="btns">
            <button type="button" className="btn" onClick={() => layout('shuffle')}>Shuffle</button>
            <button type="button" className="btn" onClick={() => layout('sort')}>Sort</button>
            <button type="button" className="btn" onClick={() => layout('stack')}>Stack</button>
          </div>
        </div>
      </div>
    </section>
  );
}

