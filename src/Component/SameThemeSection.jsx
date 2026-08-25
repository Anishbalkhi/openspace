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
      <section id="same-theme" className="smt-section">
        {/* Ambient background */}
        <div className="smt__bg" aria-hidden="true">
          <div className="smt__glow smt__glow--left" />
          <div className="smt__glow smt__glow--right" />
          <div className="smt__grid" />
        </div>

        {/* Floating browser preview cards */}
        {FLOATING_PREVIEWS.map((p) => (
          <div key={p.id} className={`smt__preview ${p.cls}`} aria-hidden="true">
            {/* Browser chrome top bar */}
            <div className="smt__preview-bar">
              <span className="smt__preview-dot" style={{ background: '#ff5f57' }} />
              <span className="smt__preview-dot" style={{ background: '#febc2e' }} />
              <span className="smt__preview-dot" style={{ background: '#28c840' }} />
              <span className="smt__preview-url">{p.name.toLowerCase()}.co</span>
            </div>
            <img
              src={p.img}
              alt={`${p.name} store preview`}
              className="smt__preview-img"
              loading="lazy"
            />
            <div className="smt__preview-label">{p.name}</div>
          </div>
        ))}

        {/* Centre CTA block */}
        <div className="smt__center reveal">
          <div className="smt__eyebrow">
            <span className="smt__eyebrow-dot" />
            6 Store Styles Available
          </div>

          <h2 className="smt__title">
            SAME THEME.<br />MORE TO BUILD WITH.
          </h2>

          <p className="smt__sub">
            Walk through live interactive demos, pick a licence, and start from a full production-ready theme.
          </p>

          <div className="smt__ctas">
            <button
              type="button"
              className="smt__btn smt__btn--primary"
              onClick={scrollToThemes}
            >
              Browse All Themes
              <span className="smt__btn-arrow">→</span>
            </button>
            <button
              type="button"
              className="smt__btn smt__btn--ghost"
              onClick={scrollToThemes}
            >
              View Live Demos
            </button>
          </div>

          <p className="smt__guarantee">
            One-time payment &nbsp;·&nbsp; 100% Money-back Guarantee &nbsp;·&nbsp; Free install help
          </p>

          <div className="smt__nav-pills">
            <span className="smt__pill smt__pill--active">← All brand types</span>
            <span className="smt__pill-sep" />
            <span className="smt__pill">Plain Jane →</span>
          </div>
        </div>
      </section>

      {/* ── Sticky bottom purchase bar ── */}
      <div className="smt__sticky-bar" role="complementary" aria-label="Quick purchase bar">
        <div className="smt__sticky-inner">
          <div className="smt__sticky-product">
            <img
              src="/images/justdrop5-optimized.avif"
              alt="Theme thumbnail"
              className="smt__sticky-thumb"
            />
            <div className="smt__sticky-info">
              <div className="smt__sticky-name">
                Elite Theme Package
                <span className="smt__sticky-price"> · Standard&nbsp;<strong>$49.99</strong></span>
                <span className="smt__sticky-switch">
                  or&nbsp;<a href="#everything-package">4 monthly payments of $12.50</a>
                </span>
              </div>
              <div className="smt__sticky-stars">
                {'★★★★★'}
                <span className="smt__sticky-rating">4.9/5</span>
                <span className="smt__sticky-sep">·</span>
                <span>8,500+ stores</span>
                <span className="smt__sticky-sep">·</span>
                <span>🛡 100% Moneyback Guarantee</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="smt__sticky-cta"
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
