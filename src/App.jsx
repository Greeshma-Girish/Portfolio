import { useCallback, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ScrollProgress from './components/ScrollProgress';
import HeroBadge from './components/HeroBadge';
import ProjectsMacbook from './components/ProjectsMacbook';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsTable from './components/SkillsTable';
import InterestsDeck from './components/InterestsDeck';
import ContactSection from './components/ContactSection';
import FloatingPencil from './components/FloatingPencil';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    let lenis = null;
    let rafCallback = null;

    if (!reduceMotion) {
      lenis = new Lenis();
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      rafCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        const scrubTrigger = (trigger, start = 'top bottom', end = 'bottom top') => ({
          trigger,
          start,
          end,
          scrub: true,
        });

        gsap.utils.toArray('.gh').forEach((el) => {
          const idx = Number(el.dataset.ghIndex || 0);
          const section = el.closest('.st');
          gsap.fromTo(
            el,
            { xPercent: idx % 2 ? -35 : 10 },
            { xPercent: idx % 2 ? 10 : -35, ease: 'none', scrollTrigger: scrubTrigger(section) }
          );
        });

        gsap.utils.toArray('.st:not(#pj) .in > h2').forEach((h) => {
          gsap.fromTo(
            h,
            { yPercent: 30 },
            { yPercent: -30, ease: 'none', scrollTrigger: scrubTrigger(h.closest('.st')) }
          );
        });

        gsap.utils.toArray('.st').forEach((s) => {
          gsap.fromTo(
            s,
            { backgroundPositionX: '0px,50%' },
            { backgroundPositionX: '-320px,50%', ease: 'none', scrollTrigger: scrubTrigger(s) }
          );
        });
      }

      gsap.utils.toArray('.fl').forEach((el) => {
        const speed = Number(el.dataset.s || 0);
        gsap.to(el, {
          y: speed * 3,
          rotation: speed / 3,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentNode,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      if (rafCallback) {
        gsap.ticker.remove(rafCallback);
      }
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, [reduceMotion]);

  const handleScrollTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <HeroBadge reduceMotion={reduceMotion} />
      <ProjectsMacbook reduceMotion={reduceMotion} />
      <ExperienceTimeline reduceMotion={reduceMotion} />
      <SkillsTable reduceMotion={reduceMotion} />
      <InterestsDeck />
      <ContactSection reduceMotion={reduceMotion} onScrollTop={handleScrollTop} />
      <FloatingPencil reduceMotion={reduceMotion} />
    </>
  );
}
