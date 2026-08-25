import { useState } from 'react';

const THEMES = [
  {
    id: 'plain-jane',
    badge: '↗ Growing & Levelling Up',
    badgeColor: '#e8ff4d',
    name: 'Plain Jane',
    price: '$99',
    billing: 'One-time payment · 12 months of updates',
    tagline: 'Deep customization and storytelling tools that grow with your brand.',
    taglineSelected: 'Deep customization, storytelling tools, and flexibility that grows with your brand.',
    features: [
      'Up to 9 lookbook pages',
      'Countdown timers for drops',
      'Custom font uploads',
      'Built-in music player',
      'Video backgrounds',
      'Password page with countdown',
    ],
    img: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    btnColor: '#4f8aff',
    btnGradient: 'linear-gradient(135deg, #2d6ff0 0%, #6ba8ff 100%)',
    btnTextColor: '#fff',
  },
  {
    id: 'plain-jane-interactive',
    badge: '✦ Full Creative Control',
    badgeColor: '#ff9d6b',
    name: 'Plain Jane Interactive',
    price: '$149',
    billing: 'One-time payment · 12 months of updates',
    tagline: 'Interactive elements and immersive storytelling to stand out.',
    taglineSelected: 'Interactive elements, immersive storytelling, and the creative freedom to stand out.',
    features: [
      'Everything in Plain Jane',
      '8 immersive scenes',
      'Interactive animations & transitions',
      'Floating product showcases',
      'Touch-optimised interactions',
      'Preloader animations',
    ],
    img: '/pickyourtheme/3_cf50cd1f-2b11-45c2-ac71-b585cc64e5aa.avif',
    btnColor: '#ff4db8',
    btnGradient: 'linear-gradient(135deg, #e0359a 0%, #ff80cc 100%)',
    btnTextColor: '#fff',
  },
];

const PickYourThemeSection = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (id) => setSelected((prev) => (prev === id ? null : id));

  return (
    <section id="pick-theme" className="pyt-section">

      {/* ── Header ── */}
      <div className="pyt__header">
        <h2 className="pyt__title reveal">Pick Your Theme</h2>
        <p className="pyt__sub reveal" style={{ transitionDelay: '0.08s' }}>
          Plain Jane is where most brands land. Interactive adds motion
          and depth for stores that want to be remembered.
        </p>
        <div className="pyt__toggle reveal" style={{ transitionDelay: '0.15s' }}>
          <span className="pyt__toggle-pill pyt__toggle-pill--active">Standard</span>
          <span className="pyt__toggle-pill">Lifetime</span>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="pyt__grid">
        {THEMES.map((t, i) => {
          const isSelected = selected === t.id;

          /*
            Outer wrapper handles scroll-reveal (opacity fade-up) with delay.
            Inner .pyt-card handles selection border/glow with ZERO delay
            so the color appears instantly on click.
          */
          return (
            <div
              key={t.id}
              className="pyt-card-reveal reveal"
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              <div
                id={`pyt-card-${t.id}`}
                className="pyt-card"
                style={isSelected ? {
                  borderColor: t.btnColor,
                  boxShadow: `0 0 0 1.5px ${t.btnColor}, 0 12px 50px ${t.btnColor}55`,
                } : {}}
                onClick={() => toggle(t.id)}
              >
                {/* Image */}
                <div className="pyt-card__img-wrap">
                  <img src={t.img} alt={`${t.name} preview`} className="pyt-card__img" />
                </div>

                {/* Badge */}
                <div className="pyt-card__badge-row">
                  <span
                    className="pyt-card__badge"
                    style={{ color: t.badgeColor, borderColor: `${t.badgeColor}50` }}
                  >
                    {t.badge}
                  </span>
                </div>

                {/* Body */}
                <div className="pyt-card__body">
                  <h3 className="pyt-card__name">{t.name}</h3>
                  <div className="pyt-card__price" style={{ color: isSelected ? t.btnColor : 'var(--color-accent)' }}>
                    {t.price}
                  </div>
                  <p className="pyt-card__billing">{t.billing}</p>
                  <p className="pyt-card__tagline">
                    {isSelected ? t.taglineSelected : t.tagline}
                  </p>

                  <ul className="pyt-card__features">
                    {t.features.map((f) => (
                      <li key={f} className="pyt-card__feature">
                        <span className="pyt-card__check" style={{ color: t.badgeColor }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {isSelected && (
                    <div className="pyt-card__btns">
                      <button
                        className="pyt-card__btn-primary"
                        style={{ background: t.btnGradient, color: t.btnTextColor }}
                      >
                        View Theme →
                      </button>
                      <button className="pyt-card__btn-secondary">View Demo</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Feature comparison — reacts to selected card ── */}
      <div className="pyt__compare reveal" style={{ transitionDelay: '0.28s' }}>
        <p className="pyt__compare-label">Compare plans</p>
        <div className="pyt__compare-grid">

          {/* Header row */}
          <div className="pyt__compare-row pyt__compare-row--head">
            <div className="pyt__compare-feature" />
            {THEMES.map((t) => {
              const isActive = selected === t.id;
              return (
                <div
                  key={t.id}
                  className="pyt__compare-plan"
                  style={{
                    color: isActive ? t.btnColor : 'rgba(255,255,255,0.35)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    transition: 'color 0.25s ease, transform 0.25s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggle(t.id)}
                >
                  {t.name}
                  {isActive && (
                    <div className="pyt__compare-active-bar" style={{ background: t.btnColor }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Feature rows */}
          {[
            { label: 'Lookbook pages',             pj: '9 pages',  pi: '9 pages'  },
            { label: 'Countdown timers',            pj: true,       pi: true       },
            { label: 'Custom font uploads',         pj: true,       pi: true       },
            { label: 'Built-in music player',       pj: true,       pi: true       },
            { label: 'Video backgrounds',           pj: true,       pi: true       },
            { label: 'Password page + countdown',   pj: true,       pi: true       },
            { label: 'Immersive scenes',            pj: false,      pi: '8 scenes' },
            { label: 'Interactive animations',      pj: false,      pi: true       },
            { label: 'Floating product showcases',  pj: false,      pi: true       },
            { label: 'Preloader animations',        pj: false,      pi: true       },
          ].map(({ label, pj, pi }) => {
            const pjActive = selected === 'plain-jane';
            const piActive = selected === 'plain-jane-interactive';
            return (
              <div key={label} className="pyt__compare-row">
                <div className="pyt__compare-feature">{label}</div>

                {/* Plain Jane cell */}
                <div
                  className="pyt__compare-cell"
                  style={{
                    background: pjActive ? 'rgba(79,138,255,0.08)' : 'transparent',
                    opacity: selected && !pjActive ? 0.35 : 1,
                    transition: 'background 0.25s ease, opacity 0.25s ease',
                  }}
                >
                  {pj === false
                    ? <span className="pyt__compare-no">—</span>
                    : <span className="pyt__compare-yes" style={{ color: '#4f8aff' }}>
                        {pj === true ? '✓' : pj}
                      </span>}
                </div>

                {/* Interactive cell */}
                <div
                  className="pyt__compare-cell"
                  style={{
                    background: piActive ? 'rgba(255,77,184,0.08)' : 'transparent',
                    opacity: selected && !piActive ? 0.35 : 1,
                    transition: 'background 0.25s ease, opacity 0.25s ease',
                  }}
                >
                  {pi === false
                    ? <span className="pyt__compare-no">—</span>
                    : <span className="pyt__compare-yes" style={{ color: '#ff4db8' }}>
                        {pi === true ? '✓' : pi}
                      </span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Starter */}
      <div className="pyt__starter reveal" style={{ transitionDelay: '0.35s' }}>
        <div className="pyt__starter-label">Or a tighter budget</div>
        <div className="pyt__starter-body">
          <div className="pyt__starter-info">
            <div className="pyt__starter-header">
              <span className="pyt__starter-name">Plain Jane Starter</span>
              <span className="pyt__starter-price">$49 one-time</span>
            </div>
            <p className="pyt__starter-desc">
              Clean product pages, a cart drawer and a fast launch.
              Enough to stop looking like a default theme.
            </p>
            <p className="pyt__starter-without">
              Without: Lookbooks · Custom fonts · Drop tools · Music player · Video backgrounds.
              If any of those matter, start with Plain Jane.
            </p>
          </div>
          <button className="pyt__starter-btn">View Starter</button>
        </div>
      </div>
    </section>
  );
};

export default PickYourThemeSection;
