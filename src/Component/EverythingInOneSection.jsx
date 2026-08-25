import './EverythingInOneSection.css';
import { useEffect, useRef, useState } from 'react';

/* ── SVG arrows (user's originals — unchanged) ── */
const ArrowDown = () => (
  <svg className="eiop__arrow-down" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20 C 40 20, 60 60, 90 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M75 45 L90 60 L75 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ArrowCurveRight = () => (
  <svg className="eiop__arrow-curve-left" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 85 10 C 105 100, 95 160, 45 180 L 60 170 L 25 183 L 55 197 L 52 185 C 100 165, 110 100, 85 10 Z" fill="currentColor" />
  </svg>
);

const ArrowCurveLeft = () => (
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
      box.style.transform = `translateY(${Math.sin(t) * 10}px) rotate(${Math.sin(t * 0.6) * 1.2}deg)`;
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
          // Count down 249 → 49.99
          let current = 249;
          const target = 49.99;
          const step   = () => {
            current = Math.max(target, current - 4.5);
            setPrice(parseFloat(current.toFixed(2)));
            if (current > target) requestAnimationFrame(step);
          };
          setTimeout(() => requestAnimationFrame(step), 400);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [visible]);

  /* ── 3-D card tilt on mouse move ── */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="everything-package"
      className="relative overflow-hidden bg-[#080808] py-24 px-6 isolate"
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

      <div className="relative z-[2] max-w-[1100px] mx-auto">

        {/* ── Header ── */}
        <div
          className="flex flex-col items-center text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-[0.35rem] bg-[rgba(126,211,33,0.08)] border border-[rgba(126,211,33,0.25)] rounded-full font-mono text-[0.72rem] font-bold tracking-[0.14em] text-[#7ed321] uppercase mb-4">
            <span className="eiop__badge-dot w-[6px] h-[6px] rounded-full bg-[#7ed321]" />
            ALL-IN-ONE BUNDLE
          </div>
          <h2 className="font-sans text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold text-white leading-[1.15] tracking-[-0.015em] mb-3">
            Everything In <em className="not-italic eiop__title-gradient">One Package.</em>
          </h2>
          <p className="text-[clamp(0.85rem,1.4vw,1rem)] text-white/60 max-w-[520px] leading-[1.6]">
            Starting out? Scaling up? Going all in? Get every premium theme and all lifetime updates in one complete bundle.
          </p>
        </div>

        {/* ── Main 3-column layout ── */}
        <div className="grid grid-cols-[240px_1fr_240px] items-start justify-items-center gap-8 max-w-[1060px] mx-auto eiop__layout">

          {/* Left callout — slides in from left */}
          <div
            className="flex flex-col items-end text-right w-full pt-[160px] transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-40px)' }}
          >
            <div className="eiop__callout-bubble bg-[rgba(18,24,18,0.7)] border border-[rgba(126,211,33,0.2)] rounded-xl p-[0.8rem_1rem] backdrop-blur-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(126,211,33,0.5)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(126,211,33,0.12)]">
              <p className="text-[0.84rem] text-[#a3e635] leading-[1.5] italic m-0">
                Providing a <strong className="text-white font-bold not-italic">hundredfold more value</strong> than any alternative package offered.
              </p>
            </div>
            <div className="self-end">
              <ArrowCurveLeft />
            </div>
          </div>

          {/* Centre: top callout + 3-D card */}
          <div
            className="flex flex-col items-center w-full transition-all duration-700 delay-100"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)' }}
          >
            <div className="flex flex-col items-center gap-[0.35rem] mb-[0.35rem]">
              <p className="text-[0.88rem] text-[#a3e635] italic text-center bg-[rgba(18,24,18,0.85)] border border-[rgba(126,211,33,0.25)] rounded-full px-[1.1rem] py-[0.4rem] backdrop-blur-[10px] whitespace-nowrap">
                <strong className="not-italic text-white">100X the value</strong> of any other package.
              </p>
              <ArrowDown />
            </div>

            {/* Product card with 3-D tilt */}
            <div
              ref={cardRef}
              className="eiop__card relative w-full rounded-[22px] overflow-hidden border border-white/[0.12] backdrop-blur-[16px] cursor-default"
              style={{
                background: 'linear-gradient(180deg, rgba(26,28,26,0.75) 0%, rgba(12,14,12,0.95) 100%)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
                transform: `perspective(900px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1,1,1)`,
                transition: 'transform 0.12s ease-out, box-shadow 0.4s ease, border-color 0.4s ease',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >
              {/* Shimmer border animation */}
              <div className="eiop__card-shimmer" aria-hidden="true" />

              {/* SAVE badge */}
              <div className="absolute top-[0.9rem] right-[0.9rem] z-[5] bg-gradient-to-br from-[#7ed321] to-[#a3e635] text-[#080808] font-mono text-[0.65rem] font-extrabold tracking-[0.08em] px-[0.65rem] py-[0.25rem] rounded-full shadow-[0_2px_10px_rgba(126,211,33,0.4)] eiop__ribbon-pulse">
                SAVE 80%
              </div>

              {/* Image area */}
              <div className="relative bg-[radial-gradient(ellipse_at_50%_65%,#182218_0%,#0a0e0a_100%)] px-4 pt-8 pb-5 flex items-center justify-center min-h-[280px] border-b border-white/[0.06]">
                <div className="eiop__card-glow" />
                <div className="eiop__box-shadow-ground" />
                <img
                  src="/everythinginonepage/FC6750AB-9ABC-4D70-BDB8-4E357A3E70E0.webp"
                  alt="Elite Theme Package box"
                  className="eiop__box-img relative z-[2] w-[86%] max-w-[300px] h-auto object-contain block"
                />
              </div>

              {/* Card body */}
              <div className="px-6 pt-[1.4rem] pb-[1.6rem] flex flex-col gap-[0.9rem]">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-sans text-[1.2rem] font-bold text-white">Elite Theme Package</h3>
                  <div className="flex items-baseline gap-[0.4rem]">
                    <span className="font-mono text-[0.85rem] text-white/40 line-through">$249</span>
                    <span ref={priceRef} className="font-mono text-[1.35rem] font-extrabold text-[#7ed321]">
                      ${price}
                    </span>
                  </div>
                </div>

                <p className="text-[0.82rem] text-white/70 leading-[1.5] m-0">
                  Premium Shopify &amp; Web themes suite built for high-growth modern brands.
                </p>

                <div className="grid grid-cols-2 gap-[0.45rem] p-3 bg-white/[0.03] border border-white/[0.06] rounded-[10px]">
                  {['✓ All Themes Included', '✓ Lifetime Updates', '✓ Full Source Files', '✓ 24/7 Priority Support'].map((f) => (
                    <span key={f} className="text-[0.74rem] text-[#d1fae5] font-medium">{f}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="eiop__cta-btn inline-flex items-center justify-center gap-2 w-full py-[0.9rem] px-[1.4rem] bg-[#7ed321] text-[#080808] font-sans text-[0.92rem] font-bold rounded-[10px] cursor-pointer border-none overflow-hidden relative"
                  onClick={() => {
                    const el = document.getElementById('themes');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="eiop__cta-shine" aria-hidden="true" />
                  <span className="relative z-[1]">Get Complete Access</span>
                  <span className="relative z-[1] eiop__cta-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right callout — slides in from right */}
          <div
            className="flex flex-col items-start text-left w-full pt-[160px] transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(40px)' }}
          >
            <div className="eiop__callout-bubble bg-[rgba(18,24,18,0.7)] border border-[rgba(126,211,33,0.2)] rounded-xl p-[0.8rem_1rem] backdrop-blur-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(126,211,33,0.5)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_20px_rgba(126,211,33,0.12)]">
              <p className="text-[0.84rem] text-[#a3e635] leading-[1.5] italic m-0">
                Outperforming <strong className="text-white font-bold not-italic">every rival package</strong> with one hundred times the value.
              </p>
            </div>
            <div className="self-start">
              <ArrowCurveRight />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EverythingInOneSection;
