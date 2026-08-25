import './EverythingInOneSection.css';
import { useEffect, useRef } from 'react';

/* ── SVG arrows provided by user (Exact Unchanged SVGs) ── */
const ArrowDown = () => (
  <svg
    className="eiop__arrow-down"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 20 C 40 20, 60 60, 90 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M75 45 L90 60 L75 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ArrowCurveRight = () => (
  <svg
    className="eiop__arrow-curve-left"
    viewBox="0 0 100 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 85 10 C 105 100, 95 160, 45 180 L 60 170 L 25 183 L 55 197 L 52 185 C 100 165, 110 100, 85 10 Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowCurveLeft = () => (
  <svg
    className="eiop__arrow-curve-right"
    viewBox="0 0 100 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M90,10 C115,100 95,170 35,185 L52,172 L18,188 L48,205 L44,192 C100,175 125,100 90,10 Z"
      fill="currentColor"
    />
  </svg>
);

const EverythingInOneSection = () => {
  const sectionRef = useRef(null);

  /* Floating animation on the 3D box */
  useEffect(() => {
    const box = sectionRef.current?.querySelector('.eiop__box-img');
    if (!box) return;
    let frame;
    let t = 0;
    const tick = () => {
      t += 0.015;
      box.style.transform = `translateY(${Math.sin(t) * 10}px) rotate(${Math.sin(t * 0.6) * 1.2}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="everything-package"
      className="relative overflow-hidden bg-[#080808] py-24 px-6 isolate"
      ref={sectionRef}
    >
      {/* ── Ambient Background Glow ── */}
      <div className="eiop__backdrop absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="eiop__glow-orb" />
      </div>

      {/* ── Decorative Streaks ── */}
      <div className="eiop__streaks absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="eiop__streak eiop__streak--1" />
        <div className="eiop__streak eiop__streak--2" />
        <div className="eiop__streak eiop__streak--3" />
      </div>

      <div className="relative z-[2] max-w-[1100px] mx-auto">
        {/* ── Header ── */}
        <div className="reveal flex flex-col items-center text-center mb-14">
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

        {/* ── Main layout: left callout · card · right callout ── */}
        <div className="reveal grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-6 max-w-[1020px] mx-auto">

          {/* Left callout */}
          <div className="flex flex-col items-end text-right translate-y-[-15px] max-w-[250px]">
            <div className="eiop__callout-bubble bg-[rgba(18,24,18,0.7)] border border-[rgba(126,211,33,0.2)] rounded-xl p-[0.8rem_1rem] backdrop-blur-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(126,211,33,0.4)]">
              <p className="text-[0.84rem] text-[#a3e635] leading-[1.5] italic m-0">
                Providing a <strong className="text-white font-bold not-italic">hundredfold more value</strong> than any alternative package offered.
              </p>
            </div>
            <ArrowCurveLeft />
          </div>

          {/* Centre column: top-callout + card */}
          <div className="flex flex-col items-center w-full max-w-[400px]">
            <div className="flex flex-col items-center gap-[0.35rem] mb-[0.35rem]">
              <p className="eiop__callout-text--top text-[0.88rem] text-[#a3e635] italic text-center bg-[rgba(18,24,18,0.85)] border border-[rgba(126,211,33,0.25)] rounded-full px-[1.1rem] py-[0.4rem] backdrop-blur-[10px] whitespace-nowrap">
                <strong className="not-italic text-white">100X the value</strong> of any other package.
              </p>
              <ArrowDown />
            </div>

            {/* Product card */}
            <div className="relative w-full bg-gradient-to-b from-[rgba(26,28,26,0.75)] to-[rgba(12,14,12,0.95)] border border-white/[0.12] rounded-[22px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-[16px] transition-all duration-400 hover:border-[rgba(126,211,33,0.4)] hover:shadow-[0_0_0_1px_rgba(126,211,33,0.3),0_30px_80px_rgba(0,0,0,0.85),0_0_35px_rgba(126,211,33,0.15)] hover:-translate-y-1">
              <div className="absolute top-[0.9rem] right-[0.9rem] z-[5] bg-gradient-to-br from-[#7ed321] to-[#a3e635] text-[#080808] font-mono text-[0.65rem] font-extrabold tracking-[0.08em] px-[0.65rem] py-[0.25rem] rounded-full shadow-[0_2px_10px_rgba(126,211,33,0.4)]">
                SAVE 80%
              </div>

              <div className="relative bg-[radial-gradient(ellipse_at_50%_65%,#182218_0%,#0a0e0a_100%)] px-4 pt-7 pb-5 flex items-center justify-center min-h-[270px] border-b border-white/[0.06]">
                <div className="eiop__card-glow" />
                <img
                  src="/everythinginonepage/FC6750AB-9ABC-4D70-BDB8-4E357A3E70E0.webp"
                  alt="Elite Theme Package box"
                  className="eiop__box-img relative z-[2] w-[86%] max-w-[300px] h-auto object-contain block"
                />
              </div>

              <div className="px-6 pt-[1.4rem] pb-[1.6rem] flex flex-col gap-[0.9rem]">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-sans text-[1.2rem] font-bold text-white">Elite Theme Package</h3>
                  <div className="flex items-baseline gap-[0.4rem]">
                    <span className="font-mono text-[0.85rem] text-white/40 line-through">$249</span>
                    <span className="font-mono text-[1.35rem] font-extrabold text-[#7ed321]">$49.99</span>
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
                  className="inline-flex items-center justify-center gap-2 w-full py-[0.85rem] px-[1.4rem] bg-[#7ed321] text-[#080808] font-sans text-[0.92rem] font-bold rounded-[10px] cursor-pointer border-none transition-all duration-200 shadow-[0_4px_18px_rgba(126,211,33,0.3)] hover:bg-[#8eef2a] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(126,211,33,0.45)]"
                  onClick={() => {
                    const el = document.getElementById('themes');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Complete Access
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right callout */}
          <div className="flex flex-col items-start text-left translate-y-[-15px] max-w-[250px]">
            <div className="eiop__callout-bubble bg-[rgba(18,24,18,0.7)] border border-[rgba(126,211,33,0.2)] rounded-xl p-[0.8rem_1rem] backdrop-blur-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(126,211,33,0.4)]">
              <p className="text-[0.84rem] text-[#a3e635] leading-[1.5] italic m-0">
                Outperforming <strong className="text-white font-bold not-italic">every rival package</strong> with one hundred times the value.
              </p>
            </div>
            <ArrowCurveRight />
          </div>

        </div>
      </div>
    </section>
  );
};

export default EverythingInOneSection;
