import { useEffect, useRef } from 'react';
import './SameThemeSection.css';
import { useNavigate } from 'react-router-dom';

const SameThemeSection = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const scrollToThemes = () => {
    const el = document.getElementById('pick-theme');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ── Interactive 3D Perspective Wireframe Topographic Grid ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 3D Grid parameters
    const cols = 32;
    const rows = 24;
    const gridSpacing = 42;
    const fov = 380;

    let time = 0;
    const render = () => {
      time += 0.02;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2 + 60;

      // Calculate 3D projected points
      const points = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const x3d = (c - cols / 2) * gridSpacing;
          const z3d = (r - rows / 2) * gridSpacing + 420;

          // Harmonic wave elevation
          const distFromCenter = Math.sqrt(x3d * x3d + (z3d - 420) * (z3d - 420));
          const wave =
            Math.sin(distFromCenter * 0.015 - time * 1.5) * 22 +
            Math.cos(x3d * 0.02 + time) * 12;

          // Mouse 3D elevation warp
          const screenXApprox = cx + (x3d * fov) / z3d;
          const screenYApprox = cy + (wave * fov) / z3d;
          const mDist = Math.hypot(screenXApprox - mouse.x, screenYApprox - mouse.y);
          const warp = Math.exp(-mDist / 180) * 45 * Math.sin(time * 2);

          const y3d = 120 - wave - warp;

          // Perspective projection
          const scale = fov / (fov + z3d);
          const px = cx + x3d * scale;
          const py = cy + y3d * scale;
          const alpha = Math.max(0.04, Math.min(0.35, (1 - z3d / 1200) * 0.45));

          points[r][c] = { x: px, y: py, alpha, z: z3d };
        }
      }

      // Draw grid lines
      ctx.lineWidth = 1;

      // Horizontal lines (rows)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = points[r][c];
          const p2 = points[r][c + 1];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(126, 211, 33, ${p1.alpha})`;
          ctx.stroke();
        }
      }

      // Depth lines (columns)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = points[r][c];
          const p2 = points[r + 1][c];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${p1.alpha * 0.8})`;
          ctx.stroke();
        }
      }

      // Draw glowing intersection nodes
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = points[r][c];
          if (p.alpha > 0.15) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232, 255, 77, ${p.alpha * 1.5})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section id="same-theme" className="smt-section relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] py-24 px-6">
      
      {/* ── Top Animated Laser Divider & Light Flare ── */}
      <div className="smt__top-laser" aria-hidden="true">
        <div className="smt__top-laser-line" />
        <div className="smt__top-laser-flare" />
      </div>

      {/* ── Top Floating Telemetry Pills & Reticles ── */}
      <div className="smt__top-bar" aria-hidden="true">
        <div className="smt__top-chip smt__top-chip--left">
          <span className="smt__top-chip-dot" />
          <span>ENGINE: SHOPIFY 2.0</span>
          <span className="smt__top-chip-badge">ACTIVE</span>
        </div>

        <div className="smt__top-chip smt__top-chip--right">
          <span className="smt__top-chip-icon">⚡</span>
          <span>SPEED: 99/100</span>
          <span className="smt__top-chip-badge smt__top-chip-badge--lime">0.18s</span>
        </div>
      </div>

      {/* ── Top Corner HUD Crosshairs ── */}
      <div className="smt__corner smt__corner--tl" aria-hidden="true">
        <span className="smt__corner-line-h" />
        <span className="smt__corner-line-v" />
        <span className="smt__corner-text">01 // SYS</span>
      </div>
      <div className="smt__corner smt__corner--tr" aria-hidden="true">
        <span className="smt__corner-line-h" />
        <span className="smt__corner-line-v" />
        <span className="smt__corner-text">02 // ARCH</span>
      </div>

      {/* ── Ambient Background & Fluid Canvas ── */}
      <div className="smt__bg absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <canvas ref={canvasRef} className="smt__canvas absolute inset-0 w-full h-full" />
        <div className="smt__glow smt__glow--left" />
        <div className="smt__glow smt__glow--right" />
        <div className="smt__grid absolute inset-0" />
      </div>

      {/* ── Minimal Centre Content ── */}
      <div className="smt__center relative z-[5] text-center flex flex-col items-center gap-7 max-w-[560px]">

        {/* Eyebrow */}
        <div className="smt__eyebrow">
          <span className="smt__eyebrow-dot" />
          <span>6 Store Styles Available</span>
        </div>

        {/* Heading */}
        <h2 className="smt__title">
          SAME THEME.<br />
          MORE TO BUILD WITH.
        </h2>

        {/* Subtitle */}
        <p className="smt__sub">
          Walk through live interactive demos, pick a licence, and start from a full production-ready theme.
        </p>

        {/* CTA Buttons */}
        <div className="smt__buttons">
          <button
            type="button"
            className="smt__btn smt__btn--primary"
            onClick={scrollToThemes}
          >
            <span>Browse All Themes</span>
            <span className="smt__btn-arrow">→</span>
          </button>
          <button
            type="button"
            className="smt__btn smt__btn--secondary"
            onClick={() => navigate('/themes/demos')}
          >
            <span>View Live Demos</span>
          </button>
        </div>

        {/* Trust Line */}
        <p className="smt__trust">
          One-time payment &nbsp;·&nbsp; 100% Money-back Guarantee &nbsp;·&nbsp; Free install help
        </p>

        {/* Navigation Hints */}
        <div className="smt__nav-hints">
          <span className="smt__nav-link" onClick={scrollToThemes}>
            ← All brand types
          </span>
          <span className="smt__nav-divider" />
          <span className="smt__nav-link" onClick={() => navigate('/themes/demos')}>
            Plain Jane →
          </span>
        </div>

      </div>
    </section>
  );
};

export default SameThemeSection;
