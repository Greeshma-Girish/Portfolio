import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ME } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';
import avatarImgSrc from '../assets/img.jpg';

export default function HeroBadge({ reduceMotion }) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const cv = canvasRef.current;
    if (!hero || !cv) return;

    const renderer = new THREE.WebGLRenderer({
      canvas: cv,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 1, 5000);

    const N = 8;
    const L = 34;
    // Increased badge width slightly (from 190x285 to 205x292)
    const BW = 205;
    const BH = 292;
    const CW = 400;
    const CH = 570;
    const S = 3; // 3x resolution canvas for ultra-crisp HiDPI rendering

    let W = 0;
    let H = 0;
    let A = { x: 0, y: 0 };
    let K = 1;
    let P = [];
    let drag = false;
    let grabOffset = { x: 0, y: 0 };
    let pointerTarget = { x: 0, y: 0 };
    let moved = 0;
    let flip = 0;

    const badgeAccent = ME.badgeAccent || '#ff7a3d';

    function drawFront(ctx, img) {
      ctx.clearRect(0, 0, CW, CH);

      // Dark card background gradient
      const gr = ctx.createLinearGradient(0, 0, CW, CH);
      gr.addColorStop(0, '#1d2433');
      gr.addColorStop(1, '#0c0f17');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, CW, CH);

      // Top colored header bar
      ctx.fillStyle = badgeAccent;
      ctx.fillRect(0, 0, CW, 70);

      // Clip slot for lanyard
      ctx.fillStyle = '#0c0f17';
      ctx.beginPath();
      ctx.roundRect((CW - 80) / 2, 26, 80, 18, 9);
      ctx.fill();

      // Circular avatar (using image from assets instead of initials)
      const cx = CW / 2;
      const cy = 200;
      const r = 76;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();

      if (img && img.complete && img.naturalWidth > 0) {
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        const aspect = iw / ih;
        let dw, dh;
        if (aspect > 1) {
          dh = r * 2;
          dw = dh * aspect;
        } else {
          dw = r * 2;
          dh = dw / aspect;
        }
        ctx.drawImage(img, cx - dw / 2, cy - dh / 2, dw, dh);
      } else {
        ctx.fillStyle = '#2a3346';
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      }
      ctx.restore();

     

      // Name
      ctx.fillStyle = '#fff';
      ctx.font = '700 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ME.name, cx, 336);

      // Role
      ctx.fillStyle = badgeAccent;
      ctx.font = '500 21px sans-serif';
      ctx.fillText(ME.role, cx, 372);

      // ID
      ctx.fillStyle = '#9aa3b5';
      ctx.font = '500 17px monospace';
      ctx.fillText(ME.id, cx, 412);

      // Barcode
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 48; i++) {
        ctx.fillRect(52 + i * 6.2, 452, i % 3 ? 2 : 4, 60);
      }
    }

    function drawBack(ctx) {
      ctx.clearRect(0, 0, CW, CH);

      ctx.fillStyle = '#f4efe6';
      ctx.fillRect(0, 0, CW, CH);

      ctx.fillStyle = badgeAccent;
      ctx.fillRect(0, 0, CW, 70);

      ctx.fillStyle = '#222';
      ctx.textAlign = 'left';
      ctx.font = '700 30px sans-serif';
      ctx.fillText('Contact', 34, 130);

      const contactItems = [
        ['✉', ME.email],
        ['☎', ME.phone],
        ['in', ME.li],
        ['gh', ME.gh],
        ['⌖', ME.loc],
      ];

      contactItems.forEach((row, i) => {
        ctx.fillStyle = badgeAccent;
        ctx.font = '700 22px sans-serif';
        ctx.fillText(row[0], 34, 200 + i * 62);
        ctx.fillStyle = '#222';
        ctx.font = '500 19px monospace';
        ctx.fillText(row[1], 84, 200 + i * 62);
      });

      ctx.fillStyle = '#777';
      ctx.font = '16px monospace';
      ctx.fillText('click to flip back', 34, 530);
    }

    // High-resolution Canvas creation
    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = CW * S;
    frontCanvas.height = CH * S;
    const frontCtx = frontCanvas.getContext('2d');
    frontCtx.scale(S, S);
    frontCtx.beginPath();
    frontCtx.roundRect(0, 0, CW, CH, 28);
    frontCtx.clip();

    const backCanvas = document.createElement('canvas');
    backCanvas.width = CW * S;
    backCanvas.height = CH * S;
    const backCtx = backCanvas.getContext('2d');
    backCtx.scale(S, S);
    backCtx.beginPath();
    backCtx.roundRect(0, 0, CW, CH, 28);
    backCtx.clip();

    // Initial draw
    drawFront(frontCtx, null);
    drawBack(backCtx);

    const maxAniso = renderer.capabilities.getMaxAnisotropy ? renderer.capabilities.getMaxAnisotropy() : 16;

    const frontTexture = new THREE.CanvasTexture(frontCanvas);
    frontTexture.anisotropy = maxAniso;
    frontTexture.minFilter = THREE.LinearMipmapLinearFilter;
    frontTexture.generateMipmaps = true;

    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.anisotropy = maxAniso;
    backTexture.minFilter = THREE.LinearMipmapLinearFilter;
    backTexture.generateMipmaps = true;

    // Load avatar image and update front canvas once ready
    const avatarImg = new Image();
    avatarImg.crossOrigin = 'anonymous';
    avatarImg.src = avatarImgSrc;
    avatarImg.onload = () => {
      drawFront(frontCtx, avatarImg);
      frontTexture.needsUpdate = true;
    };

    const G = new THREE.Group();
    const F = new THREE.Group();
    G.add(F);
    scene.add(G);

    const planeGeo = new THREE.PlaneGeometry(BW, BH);
    const frontMat = new THREE.MeshBasicMaterial({ map: frontTexture, transparent: true });
    const backMat = new THREE.MeshBasicMaterial({ map: backTexture, transparent: true });
    const frontMesh = new THREE.Mesh(planeGeo, frontMat);
    const backMesh = new THREE.Mesh(planeGeo, backMat);
    backMesh.rotation.y = Math.PI;
    F.add(frontMesh, backMesh);

    const lanyardGeo = new THREE.BufferGeometry();
    lanyardGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 6), 3));
    const indices = [];
    for (let i = 0; i < N - 1; i++) {
      const a = i * 2;
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    lanyardGeo.setIndex(indices);
    const lanyardMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(badgeAccent),
      side: THREE.DoubleSide,
    });
    scene.add(new THREE.Mesh(lanyardGeo, lanyardMat));

    function size() {
      W = hero.clientWidth;
      H = hero.clientHeight;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.position.z = H / 2 / Math.tan((20 * Math.PI) / 180);
      camera.updateProjectionMatrix();

      K = Math.min(1, W / 520, H / 720);
      G.scale.setScalar(K);
      A = { x: (W > 800 ? W * 0.72 : W * 0.5) - W / 2, y: H / 2 + 30 };
      P = [];
      for (let i = 0; i < N; i++) {
        const y = A.y - i * L * K;
        P.push({ x: A.x + (i ? i * 3 : 0), y, ox: A.x, oy: y });
      }
    }

    size();
    window.addEventListener('resize', size);

    const toWorld = (e) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left - W / 2, y: H / 2 - (e.clientY - r.top) };
    };

    const onPointerDown = (e) => {
      const p = toWorld(e);
      const q = P[N - 1];
      const d = Math.hypot(p.x - G.position.x, p.y - G.position.y);
      if (d < BH * K * 0.55) {
        drag = true;
        moved = 0;
        grabOffset = { x: q.x - p.x, y: q.y - p.y };
        pointerTarget = { x: q.x, y: q.y };
        cv.style.cursor = 'grabbing';
      }
    };

    const onPointerMove = (e) => {
      if (!drag) return;
      const p = toWorld(e);
      moved += Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0);
      pointerTarget = { x: p.x + grabOffset.x, y: p.y + grabOffset.y };
    };

    const onPointerUp = () => {
      if (!drag) return;
      drag = false;
      cv.style.cursor = 'grab';
      if (moved < 8) {
        flip += Math.PI;
        gsap.to(F.rotation, { y: flip, duration: 0.8, ease: 'back.out(1.4)' });
      }
    };

    const onPointerCancel = () => {
      drag = false;
    };

    hero.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);

    const nudgeTimer = window.setTimeout(() => {
      if (P[N - 1]) P[N - 1].x += 60;
    }, 600);

    function step() {
      for (let i = 1; i < N; i++) {
        const p = P[i];
        const vx = (p.x - p.ox) * 0.985;
        const vy = (p.y - p.oy) * 0.985;
        p.ox = p.x;
        p.oy = p.y;
        p.x += vx;
        p.y += vy - 0.8 * K;
      }
      if (drag) {
        const p = P[N - 1];
        p.x = pointerTarget.x;
        p.y = pointerTarget.y;
        p.ox = p.x;
        p.oy = p.y;
      }
      const l = L * K;
      for (let k = 0; k < 12; k++) {
        P[0].x = A.x;
        P[0].y = A.y;
        for (let i = 0; i < N - 1; i++) {
          const a = P[i];
          const c = P[i + 1];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const d = Math.hypot(dx, dy) || 1;
          const fc = (d - l) / d;
          if (i === 0) {
            c.x -= dx * fc;
            c.y -= dy * fc;
          } else if (drag && i + 1 === N - 1) {
            a.x += dx * fc;
            a.y += dy * fc;
          } else {
            a.x += (dx * fc) / 2;
            a.y += (dy * fc) / 2;
            c.x -= (dx * fc) / 2;
            c.y -= (dy * fc) / 2;
          }
        }
      }
    }

    function draw() {
      const pos = lanyardGeo.attributes.position;
      const wd = 7 * K;
      for (let i = 0; i < N; i++) {
        const a = P[Math.max(i - 1, 0)];
        const c = P[Math.min(i + 1, N - 1)];
        let tx = c.x - a.x;
        let ty = c.y - a.y;
        const d = Math.hypot(tx, ty) || 1;
        tx /= d;
        ty /= d;
        pos.setXYZ(i * 2, P[i].x - ty * wd, P[i].y + tx * wd, 0);
        pos.setXYZ(i * 2 + 1, P[i].x + ty * wd, P[i].y - tx * wd, 0);
      }
      pos.needsUpdate = true;

      const q = P[N - 1];
      const p = P[N - 2];
      let dx = q.x - p.x;
      let dy = q.y - p.y;
      const d = Math.hypot(dx, dy) || 1;
      dx /= d;
      dy /= d;
      G.position.set(q.x + (dx * BH * K) / 2, q.y + (dy * BH * K) / 2, 2);
      G.rotation.z = Math.atan2(dx, -dy);
    }

    const tick = () => {
      step();
      draw();
      renderer.render(scene, camera);
    };

    gsap.ticker.add(tick);

    const ctx = gsap.context(() => {
      gsap.to(cv, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.from('#hero h1, #hero .sub, #hero .hint, #hero .k', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      if (!reduceMotion) {
        gsap.to('#hero .tx', {
          yPercent: -35,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      window.clearTimeout(nudgeTimer);
      window.removeEventListener('resize', size);
      hero.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      planeGeo.dispose();
      lanyardGeo.dispose();
      frontMat.dispose();
      backMat.dispose();
      lanyardMat.dispose();
      frontTexture.dispose();
      backTexture.dispose();
      renderer.dispose();
    };
  }, [reduceMotion]);

  return (
    <section className="st" id="hero" ref={heroRef}>
      <ThemeToggle />
      <canvas id="cv" ref={canvasRef} />
      <div className="fl" data-s="-30" style={{ left: '6%', top: '14%' }}>
        ☕
      </div>
      <div className="tx">
        <p className="k mono">Portfolio · 2026</p>
        <h1>
          Hi, I’m <span>{ME.displayName}</span>.
        </h1>
        <p className="sub" style={{ marginTop: 14 }}>
          {ME.bio}
        </p>
        <p className="hint mono">↳ drag the badge · click to flip · scroll to explore the desk</p>
      </div>
    </section>
  );
}
