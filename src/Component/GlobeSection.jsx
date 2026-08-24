import { useEffect, useRef } from 'react';

/* ── Pseudo-noise for continent shaping ──────────────────────────────── */
function landmassNoise(lat, lon) {
  const x = Math.cos(lat) * Math.cos(lon);
  const y = Math.cos(lat) * Math.sin(lon);
  const z = Math.sin(lat);
  return (
    Math.sin(x * 3.1 + 1.7) * Math.cos(y * 2.3) +
    Math.sin(y * 4.2 - z * 2.1) * 0.6 +
    Math.sin(z * 5.5 + x * 1.3) * 0.5
  );
}

function D2R(d) { return d * Math.PI / 180; }

/* ── Pre-build continent dots once (lat, baseLon) ────────────────────── */
const CONTINENT_DOTS = (() => {
  const dots = [];
  const rings = 100;
  for (let i = 0; i < rings; i++) {
    const lat = Math.PI * (i / (rings - 1) - 0.5);
    const ringR = Math.cos(lat);
    const count = Math.max(4, Math.floor(ringR * 2 * Math.PI * 26));
    for (let j = 0; j < count; j++) {
      const lon = (j / count) * Math.PI * 2;
      if (landmassNoise(lat, lon) > 0.12) {
        dots.push(lat, lon); // flat array for speed
      }
    }
  }
  return dots;
})();

/* ── City locations (lat °, lon °) ──────────────────────────────────── */
const CITY_DOTS = [
  // Europe — dense cluster
  [51.5, -0.1], [48.9, 2.35], [52.5, 13.4], [52.4, 4.9],
  [41.9, 12.5], [40.4, -3.7], [48.2, 16.4], [50.1, 8.7],
  [59.3, 18.1], [55.7, 12.6], [47.5, 19.1], [50.9, 4.3],
  [43.3, 5.4],  [53.4, -2.2], [55.9, -3.2], [45.5, 9.2],
  [53.1, 8.8],  [51.2, 6.8],  [47.4, 8.5],  [46.0, 14.5],
  // Americas
  [40.7, -74.0], [34.1, -118.2], [43.7, -79.4], [37.8, -122.4], [41.9, -87.6],
  // Asia-Pacific
  [35.7, 139.7], [1.3, 103.8], [-33.9, 151.2], [22.3, 114.2], [37.6, 126.9],
  // Middle East / South Asia
  [25.2, 55.3], [19.1, 72.9],
  // South America & Africa
  [-23.5, -46.6], [-26.2, 28.0], [30.1, 31.2],
].map(([lat, lon]) => [D2R(lat), D2R(lon)]);

/* ── Canvas Globe ─────────────────────────────────────────────────────── */
function GlobeCanvas() {
  const canvasRef = useRef(null);
  const rotRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let animId;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const CW  = canvas.offsetWidth;
      const CH  = canvas.offsetHeight;

      // Resize only when needed
      if (canvas.width !== CW * dpr || canvas.height !== CH * dpr) {
        canvas.width  = CW * dpr;
        canvas.height = CH * dpr;
      }

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = CW / 2;
      const cy = CH / 2;
      const R  = Math.min(CW, CH) * 0.5;

      /* ── Background sphere ── */
      const bgGrad = ctx.createRadialGradient(
        cx - R * 0.22, cy - R * 0.18, R * 0.04,
        cx, cy, R,
      );
      bgGrad.addColorStop(0, '#161616');
      bgGrad.addColorStop(1, '#020202');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      const rot = rotRef.current;

      /* ── Continent dots ── */
      for (let i = 0; i < CONTINENT_DOTS.length; i += 2) {
        const lat = CONTINENT_DOTS[i];
        const lon = CONTINENT_DOTS[i + 1] + rot;
        const x3  = Math.cos(lat) * Math.cos(lon);
        const y3  = Math.sin(lat);
        const z3  = Math.cos(lat) * Math.sin(lon);

        if (z3 < 0) continue; // back-face culling

        const px    = cx + x3 * R;
        const py    = cy - y3 * R;
        const alpha = Math.sqrt(z3) * 0.78;

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215,215,215,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      /* ── City glow dots ── */
      for (const [baseLat, baseLon] of CITY_DOTS) {
        const lon = baseLon + rot;
        const x3  = Math.cos(baseLat) * Math.cos(lon);
        const y3  = Math.sin(baseLat);
        const z3  = Math.cos(baseLat) * Math.sin(lon);

        if (z3 < 0) continue;

        const px    = cx + x3 * R;
        const py    = cy - y3 * R;
        const alpha = z3;

        // Soft radial glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 11);
        glow.addColorStop(0, `rgba(232,255,77,${(alpha * 0.9).toFixed(3)})`);
        glow.addColorStop(1, 'rgba(232,255,77,0)');
        ctx.beginPath();
        ctx.arc(px, py, 11, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,255,110,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      /* ── Edge vignette (darkens sphere rim) ── */
      const vignette = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.82)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = vignette;
      ctx.fill();

      ctx.restore();

      rotRef.current += 0.0035;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
    />
  );
}

/* ── Stats ───────────────────────────────────────────────────────────── */
const STATS = [
  { value: '8,500+', label: 'Brands worldwide' },
  { value: '190+',   label: 'Countries' },
  { value: '3 hrs',  label: 'Avg. time to live' },
];

/* ── Section ─────────────────────────────────────────────────────────── */
export default function GlobeSection() {
  return (
    <section id="globe-section" className="globe-section">
      <div className="globe-canvas">
        <GlobeCanvas />
      </div>

      <div className="globe-content">
        <h2 className="globe-title">Trusted by 8,500+ brands worldwide</h2>
        <p className="globe-desc">
          From a first collection run out of a bedroom to labels shipping
          internationally, the same three themes carry streetwear drops,
          activewear ranges, boutique lookbooks and culture-led merch. What
          changes is the demo you start from — not the tooling underneath it.
        </p>

        <div className="globe-stats">
          {STATS.map((s) => (
            <div key={s.label} className="globe-stat">
              <span className="globe-stat__value">{s.value}</span>
              <span className="globe-stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="globe-footnote">BRANDS BUILDING ON OPENSPACES</p>
      </div>
    </section>
  );
}
