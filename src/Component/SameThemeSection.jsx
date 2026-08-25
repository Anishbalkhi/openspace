import './SameThemeSection.css';

const FLOATING_PREVIEWS = [
  { id: 1, cls: 'smt__preview--tl', img: '/images/justdrop5-optimized.avif', name: 'STRYDE' },
  { id: 2, cls: 'smt__preview--tr', img: '/images/justdrop2-optimized.avif', name: 'ITALYA' },
  { id: 3, cls: 'smt__preview--ml', img: '/images/justdrop3-optimized.avif', name: 'HELIX' },
  { id: 4, cls: 'smt__preview--mr', img: '/images/justdrop7-optimized.avif', name: 'NOMAD' },
  { id: 5, cls: 'smt__preview--bl', img: '/images/justdrop4-optimized.avif', name: 'VORA' },
  { id: 6, cls: 'smt__preview--br', img: '/images/justdrop8-optimized.avif', name: 'KOVA' },
];

const SameThemeSection = () => {
  const scrollToThemes = () => {
    const el = document.getElementById('themes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="same-theme" className="smt-section relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808] py-20 px-6">
        {/* Ambient background */}
        <div className="smt__bg absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="smt__glow smt__glow--left" />
          <div className="smt__glow smt__glow--right" />
          <div className="smt__grid absolute inset-0" />
        </div>

        {/* Floating browser preview cards */}
        {FLOATING_PREVIEWS.map((p) => (
          <div key={p.id} className={`smt__preview ${p.cls} absolute w-[220px] rounded-[10px] overflow-hidden bg-[#111] border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.65)] z-[1] transition-[transform,box-shadow] duration-400 hover:z-[10]`} aria-hidden="true">
            {/* Browser chrome top bar */}
            <div className="flex items-center gap-[5px] px-[10px] py-[6px] bg-[#1c1c1c] border-b border-white/[0.06]">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#ff5f57' }} />
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#febc2e' }} />
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#28c840' }} />
              <span className="flex-1 ml-[6px] bg-white/[0.07] rounded text-[0.58rem] text-white/40 px-[6px] py-[2px] text-center font-mono tracking-[0.04em]">
                {p.name.toLowerCase()}.co
              </span>
            </div>
            <img
              src={p.img}
              alt={`${p.name} store preview`}
              className="w-full h-[150px] object-cover block"
              loading="lazy"
            />
            <div className="font-mono text-[0.62rem] font-bold tracking-[0.12em] text-white/50 text-center py-[5px] pb-[7px] bg-[#111]">
              {p.name}
            </div>
          </div>
        ))}

        {/* Centre CTA block */}
        <div className="smt__center reveal relative z-[5] text-center flex flex-col items-center gap-5 max-w-[520px] px-8 py-12 bg-[rgba(8,8,8,0.7)] border border-white/[0.08] rounded-3xl backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-[0.45rem] font-mono text-[0.72rem] font-bold tracking-[0.12em] text-[#7ed321] uppercase">
            <span className="smt__eyebrow-dot w-[7px] h-[7px] rounded-full bg-[#7ed321]" />
            6 Store Styles Available
          </div>

          <h2 className="font-[var(--font-pixel)] text-[clamp(1.1rem,3vw,1.7rem)] font-normal text-white leading-[1.5] tracking-[0.03em] uppercase m-0">
            SAME THEME.<br />MORE TO BUILD WITH.
          </h2>

          <p className="text-[0.9rem] text-white/60 leading-[1.65] max-w-[380px] m-0">
            Walk through live interactive demos, pick a licence, and start from a full production-ready theme.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3 font-sans text-sm font-bold rounded-full cursor-pointer border-none transition-all duration-200 bg-[#e8ff4d] text-[#080808] shadow-[0_4px_18px_rgba(232,255,77,0.3)] hover:bg-[#f0ff70] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,255,77,0.45)]"
              onClick={scrollToThemes}
            >
              Browse All Themes
              <span className="transition-transform duration-200 hover:translate-x-1">→</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-7 py-3 font-sans text-sm font-bold rounded-full cursor-pointer transition-all duration-200 bg-transparent text-white border border-white/20 hover:border-white/50 hover:-translate-y-0.5 hover:bg-white/[0.04]"
              onClick={scrollToThemes}
            >
              View Live Demos
            </button>
          </div>

          <p className="text-[0.72rem] text-white/40 font-mono m-0 leading-[1.6]">
            One-time payment &nbsp;·&nbsp; 100% Money-back Guarantee &nbsp;·&nbsp; Free install help
          </p>

          <div className="flex items-center gap-[0.6rem] text-[0.78rem] text-white/50">
            <span className="font-semibold text-white cursor-pointer hover:text-[#e8ff4d] transition-colors duration-200">← All brand types</span>
            <span className="inline-block w-px h-[14px] bg-white/20" />
            <span className="cursor-pointer hover:text-[#e8ff4d] transition-colors duration-200">Plain Jane →</span>
          </div>
        </div>
      </section>

      {/* ── Sticky bottom purchase bar ── */}
      <div className="sticky bottom-0 left-0 right-0 z-[100] bg-[rgba(12,14,12,0.92)] border-t border-white/10 backdrop-blur-xl shadow-[0_-4px_30px_rgba(0,0,0,0.6)]" role="complementary" aria-label="Quick purchase bar">
        <div className="max-w-[1100px] mx-auto px-6 py-[0.7rem] flex items-center justify-between gap-4">
          <div className="flex items-center gap-[0.9rem]">
            <img
              src="/images/justdrop5-optimized.avif"
              alt="Theme thumbnail"
              className="w-10 h-10 object-cover rounded-[6px] border border-white/10 flex-shrink-0"
            />
            <div className="flex flex-col gap-[0.2rem]">
              <div className="font-sans text-[0.85rem] text-white font-semibold flex items-center gap-[0.35rem] flex-wrap">
                Elite Theme Package
                <span className="font-normal text-white/75"> · Standard&nbsp;<strong>$49.99</strong></span>
                <span className="text-[0.78rem] text-white/50 font-normal">
                  or&nbsp;<a href="#everything-package" className="text-[#e8ff4d] underline decoration-[rgba(232,255,77,0.4)]">4 monthly payments of $12.50</a>
                </span>
              </div>
              <div className="flex items-center gap-[0.3rem] text-[0.72rem] text-white/50 font-mono">
                <span className="text-amber-400 text-[0.8rem]">★★★★★</span>
                <span className="font-bold text-white/85">4.9/5</span>
                <span className="opacity-40">·</span>
                <span>8,500+ stores</span>
                <span className="opacity-40">·</span>
                <span>🛡 100% Moneyback Guarantee</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#e8ff4d] text-[#080808] font-sans text-[0.9rem] font-bold px-7 py-[0.65rem] rounded-full border-none cursor-pointer whitespace-nowrap transition-all duration-200 shadow-[0_3px_14px_rgba(232,255,77,0.3)] hover:bg-[#f0ff70] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,255,77,0.45)] flex-shrink-0"
            onClick={scrollToThemes}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default SameThemeSection;
