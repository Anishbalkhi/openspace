import './EverythingInOneSection.css';
import { useEffect, useRef, useState } from 'react';

/* ── SVG arrows (user's originals — unchanged, names match rendered classes) ── */
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
      className="eiop-section relative overflow-hidden bg-[#080808] py-16 sm:py-20 px-4 sm:px-6 isolate w-full flex flex-col items-center justify-center text-center"
      ref={sectionRef}
    >
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
              width:  s.size,
              height: s.size,
              left:   `${s.left}%`,
              bottom: '-10px',
              opacity: s.opacity,
              animationDelay:    `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* ── Central Content Container: Always Centered on Any Screen Size ── */}
      <div className="relative z-[2] max-w-[1060px] w-full mx-auto flex flex-col items-center justify-center">

        {/* ── Header ── */}
        <div
          className="flex flex-col items-center text-center w-full max-w-[650px] mx-auto mb-8 sm:mb-10 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[rgba(126,211,33,0.08)] border border-[rgba(126,211,33,0.25)] rounded-full font-mono text-[0.7rem] font-bold tracking-[0.14em] text-[#7ed321] uppercase mb-3 shadow-[0_0_15px_rgba(126,211,33,0.15)]">
            <span className="eiop__badge-dot w-[5px] h-[5px] rounded-full bg-[#7ed321]" />
            ALL-IN-ONE BUNDLE
          </div>
          <h2 className="font-sans text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-white leading-[1.15] tracking-[-0.015em] mb-2.5">
            Everything In <em className="not-italic eiop__title-gradient">One Package.</em>
          </h2>
          <p className="text-[clamp(0.82rem,1.3vw,0.95rem)] text-white/60 max-w-[500px] leading-[1.55] mx-auto">
            Starting out? Scaling up? Going all in? Get every premium theme and all lifetime updates in one complete bundle.
          </p>
        </div>

        {/* ── Main Layout: Perfectly Centered 3-Column Layout ── */}
        <div className="eiop__layout flex items-start justify-center gap-3 sm:gap-6 max-w-[960px] w-full mx-auto">

          {/* Left Callout Column — arrow above text */}
          <div
            className="eiop__callout--left flex-1 min-w-0 max-w-[210px] flex flex-col items-end text-right pt-2 transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-24px)' }}
          >
            <div className="pr-2 mb-1">
              <ArrowCurveLeft />
            </div>
            <div className="bg-[rgba(18,24,18,0.85)] border border-[rgba(126,211,33,0.25)] rounded-xl p-3.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(126,211,33,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(126,211,33,0.5)]">
              <p className="text-[0.8rem] text-[#a3e635] leading-[1.45] italic m-0 break-words">
                Providing a <strong className="text-white font-bold not-italic">hundredfold more value</strong> than any alternative package offered.
              </p>
            </div>
          </div>

          {/* Center Column: Top Pill + Product Card */}
          <div
            className="flex-shrink-0 min-w-0 w-full max-w-[380px] flex flex-col items-center mx-auto transition-all duration-700 delay-100"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}
          >
            {/* Top Callout Pill */}
            <div className="flex flex-col items-center gap-0.5 mb-1.5">
              <p className="text-[0.82rem] text-[#a3e635] italic text-center bg-[rgba(18,24,18,0.92)] border border-[rgba(126,211,33,0.3)] rounded-full px-4 py-1.5 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)] whitespace-nowrap m-0">
                <strong className="not-italic text-white font-bold">100X the value</strong> of any other package.
              </p>
              <ArrowDown />
            </div>

            {/*
              Product Card — tilt fix:
              OUTER wrapper owns the mouse handlers, the CSS `perspective`,
              and is what handleMouseMove measures via cardRef. It has NO
              overflow-hidden and NO transform of its own, so it never clips.
            */}
            <div
              ref={cardRef}
              className="w-full mx-auto"
              style={{ perspective: '900px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >
              {/*
                INNER card — owns rounded corners, overflow-hidden (needed to
                clip the shimmer ring + image to the rounded rect), and the
                background/border/shadow. The 3-D rotation lives here, alone,
                so it's the only thing being transformed — this is what stops
                browsers from mis-clipping the bottom content (the CTA button)
                during the tilt transform.
              */}
              <div
                className="eiop__card relative w-full rounded-[20px] overflow-hidden border border-white/[0.14] backdrop-blur-xl cursor-default bg-gradient-to-b from-[#181c18] via-[#101310] to-[#0a0d0a] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: 'transform 0.12s ease-out, box-shadow 0.4s ease, border-color 0.4s ease',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                {/* Shimmer Border Animation */}
                <div className="eiop__card-shimmer" aria-hidden="true" />

                {/* SAVE 80% Badge */}
                <div className="absolute top-3 right-3 z-[15] bg-gradient-to-br from-[#7ed321] to-[#a3e635] text-[#080808] font-mono text-[0.62rem] font-extrabold tracking-[0.08em] px-2.5 py-0.5 rounded-full shadow-[0_2px_10px_rgba(126,211,33,0.5)] eiop__ribbon-pulse">
                  SAVE 80%
                </div>

                {/* Image Area */}
                <div className="relative bg-[radial-gradient(ellipse_at_50%_65%,#1c261c_0%,#0c100c_100%)] px-4 pt-6 pb-4 flex items-center justify-center min-h-[220px] border-b border-white/[0.08]">
                  <div className="eiop__card-glow" />
                  <div className="eiop__box-shadow-ground" />
                  <img
                    src="/everythinginonepage/FC6750AB-9ABC-4D70-BDB8-4E357A3E70E0.webp"
                    alt="Elite Theme Package box"
                    className="eiop__box-img relative z-[2] w-[80%] max-w-[240px] h-auto object-contain block mx-auto"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-3.5 text-left">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-sans text-[1.1rem] font-bold text-white tracking-tight">Elite Theme Package</h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-[0.82rem] text-white/40 line-through">$249</span>
                      <span ref={priceRef} className="font-mono text-[1.25rem] font-extrabold text-[#7ed321]">
                        ${price}
                      </span>
                    </div>
                  </div>

                  <p className="text-[0.78rem] text-white/70 leading-[1.5] m-0">
                    Premium Shopify &amp; Web themes suite built for high-growth modern brands.
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-1.5 p-2.5 bg-white/[0.03] border border-white/[0.07] rounded-lg">
                    {['✓ All Themes Included', '✓ Lifetime Updates', '✓ Full Source Files', '✓ 24/7 Priority Support'].map((f) => (
                      <span key={f} className="text-[0.72rem] text-[#d1fae5] font-medium tracking-tight">{f}</span>
                    ))}
                  </div>

                  {/* Action CTA Button */}
                  <button
                    type="button"
                    className="eiop__cta-btn inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-[#7ed321] text-[#080808] font-sans text-[0.88rem] font-bold rounded-lg cursor-pointer border-none overflow-hidden relative shadow-[0_4px_16px_rgba(126,211,33,0.35)] hover:bg-[#8eef2a]"
                    onClick={() => {
                      const el = document.getElementById('themes') || document.getElementById('pick-theme');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="eiop__cta-shine" aria-hidden="true" />
                    <span className="relative z-[1]">Get Complete Access</span>
                    <span className="relative z-[1] eiop__cta-arrow text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Callout Column — arrow above text */}
          <div
            className="eiop__callout--right flex-1 min-w-0 max-w-[210px] flex flex-col items-start text-left pt-2 transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(24px)' }}
          >
            <div className="pl-2 mb-1">
              <ArrowCurveRight />
            </div>
            <div className="bg-[rgba(18,24,18,0.85)] border border-[rgba(126,211,33,0.25)] rounded-xl p-3.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.5),0_0_15px_rgba(126,211,33,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(126,211,33,0.5)]">
              <p className="text-[0.8rem] text-[#a3e635] leading-[1.45] italic m-0 break-words">
                Outperforming <strong className="text-white font-bold not-italic">every rival package</strong> with one hundred times the value.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EverythingInOneSection;
