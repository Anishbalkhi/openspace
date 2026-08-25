import { useEffect, useRef } from 'react';

/* ── Section → hue palette ───────────────────────────────────────────────
   Each section has a base hue. The spotlight lerps toward it smoothly,
   plus a ±18° sinusoidal breathe so colour is never static.
   hero = null → full rainbow cycle (matches the prismatic 3-D Box).
   ────────────────────────────────────────────────────────────────────── */
const ZONES = [
  { sel: '.hero',             hue: null },  // rainbow — matches Box.jsx
  { sel: '#globe-section',    hue: 195  },  // cyan  — globe / space
  { sel: '.whichone-section', hue: 28   },  // amber — activewear warmth
  { sel: '#pick-theme',       hue: 72   },  // yellow-green — brand accent
  { sel: '#features',         hue: 220  },  // blue  — tech / features
  { sel: '#themes',           hue: 300  },  // magenta — themes showcase
  { sel: '.footer',           hue: 265  },  // violet — footer
];

function getTargetHue(y, rainbowHue) {
  for (const z of ZONES) {
    const el = document.querySelector(z.sel);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (y >= r.top && y <= r.bottom) return z.hue ?? rainbowHue;
  }
  return 72;
}

/* Shortest-path hue lerp — never takes the long way around the wheel */
function lerpHue(from, to, t) {
  let d = to - from;
  if (d >  180) d -= 360;
  if (d < -180) d += 360;
  return (from + d * t + 360) % 360;
}

export default function CursorGlowTrail() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const rdotRef  = useRef(null);   // fast-following ring (camera-focus ring)

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const rdot  = rdotRef.current;

    const s = {
      mx: -900, my: -900,
      lx: -900, ly: -900,   // outer lerp position
      ix: -900, iy: -900,   // inner lerp position
      rx: -900, ry: -900,   // ring-dot lerp position
      hovering:    false,
      currentHue:  72,
      rainbowHue:  72,
      cycleT:      0,
      lastTS:      performance.now(),
    };

    let animId;

    /* ── Mouse: position tracked for lerp ────────────────────────────── */
    const onMove = (e) => {
      s.mx = e.clientX;
      s.my = e.clientY;
    };

    /* ── Hover: spotlight pulses on interactive elements ────────────── */
    const onEnter = () => { s.hovering = true;  };
    const onLeave = () => { s.hovering = false; };

    const attachHover = () => {
      document.querySelectorAll('button, a, .whichone-card, .pyt-card, .store-card')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
    };
    setTimeout(attachHover, 450);

    /* ── RAF loop ───────────────────────────────────────────────────── */
    const draw = (ts) => {
      const dt = Math.min((ts - s.lastTS) / 1000, 0.05);
      s.lastTS = ts;

      /* — Hue: rainbow in hero, section-aware elsewhere — */
      s.rainbowHue = (s.rainbowHue + dt * 45) % 360;
      s.cycleT    += dt;

      const base   = getTargetHue(s.my, s.rainbowHue);
      // ±18° sinusoidal breathe, period ~2 s
      const target = base + Math.sin(s.cycleT * Math.PI) * 18;
      s.currentHue = lerpHue(s.currentHue, target, Math.min(dt * 2.5, 1));
      const h = Math.round(s.currentHue);

      /* — Position lerp — */
      const outerEase = s.hovering ? 0.05 : 0.08;
      s.lx += (s.mx - s.lx) * outerEase;
      s.ly += (s.my - s.ly) * outerEase;
      s.ix += (s.mx - s.ix) * 0.14;
      s.iy += (s.my - s.iy) * 0.14;
      s.rx += (s.mx - s.rx) * 0.28;   // ring-dot is snappier
      s.ry += (s.my - s.ry) * 0.28;

      /* — Sizes — */
      const outerS = s.hovering ? 520 : 420;
      const innerS = s.hovering ? 170 : 120;

      /*
        Push hue as a CSS custom property — the stylesheet reads it via
        hsl(var(--h) …) so only a cheap style recalc fires, never layout.
        Position uses GPU-composited transform (no layout at all).
      */
      outer.style.setProperty('--h', h);
      inner.style.setProperty('--h', h);
      rdot.style.setProperty('--h', h);

      outer.style.transform = `translate(calc(${s.lx}px - 50%), calc(${s.ly}px - 50%))`;
      inner.style.transform = `translate(calc(${s.ix}px - 50%), calc(${s.iy}px - 50%))`;
      rdot.style.transform  = `translate(calc(${s.rx}px - 50%), calc(${s.ry}px - 50%))`;

      outer.style.width  = `${outerS}px`;
      outer.style.height = `${outerS}px`;
      inner.style.width  = `${innerS}px`;
      inner.style.height = `${innerS}px`;

      animId = requestAnimationFrame(draw);
    };

    document.documentElement.style.cursor = 'none';
    window.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Large ambient glow — slow, very diffuse */}
      <div ref={outerRef} className="spl-outer" aria-hidden="true" />
      {/* Tight hotspot — slightly faster */}
      <div ref={innerRef} className="spl-inner" aria-hidden="true" />
      {/* Fast-following thin ring — camera-focus feel */}
      <div ref={rdotRef}  className="spl-rdot"  aria-hidden="true" />
    </>
  );
}
