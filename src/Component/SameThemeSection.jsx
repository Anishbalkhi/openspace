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
    const el = document.getElementById('pick-theme');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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

      {/* Centre CTA block — no border box, open layout */}
      <div className="smt__center reveal relative z-[5] text-center flex flex-col items-center gap-6 max-w-[500px]">

        {/* Eyebrow */}
        <div className="flex items-center gap-[0.45rem] font-mono text-[0.72rem] font-bold tracking-[0.12em] text-[#7ed321] uppercase">
          <span className="smt__eyebrow-dot w-[7px] h-[7px] rounded-full bg-[#7ed321]" />
          6 Store Styles Available
        </div>

        {/* Heading */}
        <h2 className="font-[var(--font-pixel)] text-[clamp(1.8rem,4vw,3rem)] font-normal text-white leading-[1.3] tracking-[0.03em] uppercase m-0">
          SAME THEME.<br />MORE TO BUILD WITH.
        </h2>

        {/* Sub */}
        <p className="text-[0.9rem] text-white/55 leading-[1.7] max-w-[360px] m-0">
          Walk through live interactive demos, pick a licence, and start from a full production-ready theme.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            type="button"
            className="group inline-flex items-center gap-2 px-8 py-3.5 font-sans text-[0.9rem] font-bold rounded-full cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: '#e8ff4d', color: '#080808', boxShadow: '0 4px 18px rgba(232,255,77,0.3)' }}
            onClick={scrollToThemes}
          >
            Browse All Themes
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-sans text-[0.9rem] font-bold rounded-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: 'transparent', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.2)' }}
            onClick={scrollToThemes}
          >
            View Live Demos
          </button>
        </div>

        {/* Trust line */}
        <p className="text-[0.7rem] text-white/35 font-mono m-0 leading-[1.6]">
          One-time payment &nbsp;·&nbsp; 100% Money-back Guarantee &nbsp;·&nbsp; Free install help
        </p>

        {/* Nav hints */}
        <div className="flex items-center gap-[0.6rem] text-[0.78rem] text-white/40">
          <span className="cursor-pointer hover:text-[#e8ff4d] transition-colors duration-200">← All brand types</span>
          <span className="inline-block w-px h-[14px] bg-white/15" />
          <span className="cursor-pointer hover:text-[#e8ff4d] transition-colors duration-200">Plain Jane →</span>
        </div>
      </div>
    </section>
  );
};

export default SameThemeSection;
