import './EverythingInOneSection.css';
import { useEffect, useRef, useState } from 'react';
import DotGridPattern from './DotGridPattern.jsx';

/* ── SVG arrows ── */
const ArrowDown = () => (
  <svg className="eiop__arrow-down" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20 C 40 20, 60 60, 90 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M75 45 L90 60 L75 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ArrowCurveLeft = () => (
  <svg className="eiop__arrow-curve-left" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 85 10 C 105 100, 95 160, 45 180 L 60 170 L 25 183 L 55 197 L 52 185 C 100 165, 110 100, 85 10 Z" fill="currentColor" />
  </svg>
);

const ArrowCurveRight = () => (
  <svg className="eiop__arrow-curve-right" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M90,10 C115,100 95,170 35,185 L52,172 L18,188 L48,205 L44,192 C100,175 125,100 90,10 Z" fill="currentColor" />
  </svg>
);

/* ── Floating particle sparks ── */
const SPARKS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 3,
  left: 5 + Math.random() * 90,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 5,
  opacity: 0.15 + Math.random() * 0.4,
}));

const EverythingInOneSection = () => {
  const sectionRef   = useRef(null);
  const cardRef      = useRef(null);
  const priceRef     = useRef(null);
  const [visible, setVisible] = useState(false);
  const [price, setPrice]     = useState(249);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });

  /* ── Floating box animation ── */
  useEffect(() => {
    const box = sectionRef.current?.querySelector('.eiop__box-img');
    if (!box) return;
    let frame, t = 0;
    const tick = () => {
      t += 0.015;
      box.style.transform = `translateY(${Math.sin(t) * 8}px) rotate(${Math.sin(t * 0.6) * 1.1}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* ── Scroll-reveal + price counter ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
          let current = 249;
          const target = 49.99;
          const step   = () => {
            current = Math.max(target, current - 4.5);
            setPrice(parseFloat(current.toFixed(2)));
            if (current > target) requestAnimationFrame(step);
          };
          setTimeout(() => requestAnimationFrame(step), 300);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [visible]);

  /* ── 3-D card tilt on mouse move ── */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="everything-package"
      className="eiop-section relative overflow-hidden bg-[#080808] py-16 sm:py-24 px-4 sm:px-6 isolate w-full flex flex-col items-center justify-center text-center"
      ref={sectionRef}
    >
      {/* ── Dot Grid Matrix with Concentric Illuminated Pattern ── */}
      <DotGridPattern
        clusters={[
          { top: '48%', left: '50%' },
          { top: '30%', left: '18%' },
          { top: '65%', left: '82%' },
        ]}
      />

      {/* ── Ambient glow + streaks ── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="eiop__glow-orb" />
      </div>
      <div className="eiop__streaks absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="eiop__streak eiop__streak--1" />
        <div className="eiop__streak eiop__streak--2" />
        <div className="eiop__streak eiop__streak--3" />
      </div>

      {/* ── Floating particle sparks ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {SPARKS.map((s) => (
          <span
            key={s.id}
            className="eiop__spark absolute rounded-full bg-[#7ed321]"
            style={{
              width:  `${s.size}px`,
              height: `${s.size}px`,
              left:   `${s.left}%`,
              bottom: '-10px',
              opacity: s.opacity,
              animationDelay:    `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Central Content Container ── */}
      <div className="relative z-[2] max-w-[1060px] w-full mx-auto flex flex-col items-center justify-center">

        {/* ── Header ── */}
        <div
          className="flex flex-col items-center text-center w-full max-w-[650px] mx-auto mb-4 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[rgba(126,211,33,0.08)] border border-[rgba(126,211,33,0.25)] rounded-full font-mono text-[0.7rem] font-bold tracking-[0.14em] text-[#7ed321] uppercase mb-4 shadow-[0_0_15px_rgba(126,211,33,0.15)]">
            <span className="eiop__badge-dot w-[5px] h-[5px] rounded-full bg-[#7ed321]" />
            ALL-IN-ONE BUNDLE
          </div>
          <h2 className="font-sans text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white leading-[1.15] tracking-[-0.015em] mb-4">
            Everything In <em className="not-italic eiop__title-gradient">One Package.</em>
          </h2>
          <p className="text-[clamp(0.85rem,1.3vw,1rem)] text-white/60 max-w-[500px] leading-[1.6] mx-auto mb-6">
            Starting out? Scaling up? Going all in? Get every premium theme and all lifetime updates in one complete bundle.
          </p>
        </div>

        {/* ── Main Layout: Wide 3-Column matching reference image ── */}
        <div className="eiop__layout flex items-start justify-center gap-4 sm:gap-6 max-w-[1100px] w-full mx-auto">

          {/* Left Callout Column */}
          <div
            className="eiop__callout--left flex-1 min-w-0 max-w-[260px] flex flex-col items-end text-right pt-2 transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)' }}
          >
            <ArrowCurveRight />
            <p className="text-[0.95rem] sm:text-[1.05rem] text-[#7ed321] leading-[1.6] italic font-medium mt-3 break-words pr-2">
              Providing a <strong className="font-bold not-italic text-white">hundredfold more value</strong> than any alternative package offered.
            </p>
          </div>

          {/* Center Column */}
          <div
            className="flex-shrink-0 min-w-0 w-full max-w-[420px] flex flex-col items-center mx-auto transition-all duration-700 delay-100"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
          >
            {/* Center Callout Text + Arrow */}
            <div className="flex flex-col items-center gap-2 mb-4">
              <p className="text-[1.15rem] sm:text-[1.25rem] font-bold text-[#7ed321] text-center leading-[1.35] tracking-tight m-0 drop-shadow-[0_2px_12px_rgba(126,211,33,0.35)]">
                100X the value of<br />any other package.
              </p>
              <ArrowDown />
            </div>

            {/* Product Card */}
            <div
              ref={cardRef}
              className="w-full mx-auto"
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >
              <div
                className="eiop__card relative w-full rounded-[24px] overflow-hidden border border-white/[0.12] backdrop-blur-xl cursor-default bg-gradient-to-b from-[#181c18] via-[#101310] to-[#0a0d0a] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out, box-shadow 0.4s ease, border-color 0.4s ease',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                <div className="eiop__card-shimmer" aria-hidden="true" />

                <div className="absolute top-4 right-4 z-[15] bg-[#7ed321] text-[#080808] font-mono text-[0.65rem] font-extrabold tracking-[0.08em] px-3 py-1 rounded-full shadow-[0_2px_10px_rgba(126,211,33,0.5)] eiop__ribbon-pulse">
                  SAVE 80%
                </div>

                <div className="relative bg-[radial-gradient(ellipse_at_50%_65%,#1c261c_0%,#0c100c_100%)] px-4 pt-10 pb-8 flex items-center justify-center min-h-[250px] border-b border-white/[0.06]">
                  <div className="eiop__card-glow" />
                  <div className="eiop__box-shadow-ground" />
                  <img
                    src="/everythinginonepage/FC6750AB-9ABC-4D70-BDB8-4E357A3E70E0.webp"
                    alt="Elite Theme Package box"
                    className="eiop__box-img relative z-[2] w-[75%] max-w-[260px] h-auto object-contain block mx-auto"
                  />
                </div>

                <div className="px-6 pt-6 pb-5 flex flex-col gap-4 text-left">
                  
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <h3 className="font-sans text-[1.1rem] font-bold text-white tracking-tight m-0">Elite Theme Package</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-mono text-[0.8rem] text-white/40 line-through decoration-white/40">$249</span>
                      <span ref={priceRef} className="font-mono text-[1.5rem] font-extrabold text-[#7ed321] leading-none">${price}</span>
                    </div>
                  </div>

                  <p className="text-[0.8rem] text-white/50 leading-[1.5] m-0 -mt-1">
                    Every premium theme + lifetime updates in one complete bundle.
                  </p>

                  <div className="h-px w-full bg-white/[0.08] my-1" />

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 py-1">
                    {[
                      'All Themes Included',
                      'Lifetime Updates',
                      'Full Source Files',
                      '24/7 Priority Support',
                    ].map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <span className="text-[#7ed321] text-[0.75rem] font-bold flex-shrink-0">✓</span>
                        <span className="text-[0.75rem] text-white/75 leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="eiop__cta-btn inline-flex items-center justify-center gap-2 w-full py-3.5 px-5 mt-2 font-sans text-[0.9rem] font-bold rounded-lg cursor-pointer border-none overflow-hidden relative"
                    style={{ background: '#7ed321', color: '#080808', boxShadow: '0 4px 16px rgba(126,211,33,0.25)' }}
                  >
                    <span className="eiop__cta-shine" aria-hidden="true" />
                    <span className="relative z-[1]">Get Complete Access</span>
                    <span className="relative z-[1] eiop__cta-arrow">→</span>
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[0.65rem] text-white/30 font-mono mt-1">
                    <span className="flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Money-back guarantee
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[#7ed321]/70">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      Instant delivery
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Right Callout Column */}
          <div
            className="eiop__callout--right flex-1 min-w-0 max-w-[260px] flex flex-col items-start text-left pt-2 transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(30px)' }}
          >
            <ArrowCurveLeft />
            <p className="text-[0.95rem] sm:text-[1.05rem] text-[#7ed321] leading-[1.6] italic font-medium mt-3 break-words pl-2">
              Outperforming <strong className="font-bold not-italic text-white">every rival package</strong> with one hundred times the value.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EverythingInOneSection;