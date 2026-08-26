import { useState } from 'react';

const THEMES = [
  {
    id: 'plain-jane',
    badge: '↗ Growing & Levelling Up',
    badgeColor: '#e8ff4d',
    name: 'Plain Jane',
    priceStandard: '$99',
    priceLifetime: '$199',
    billing: 'One-time payment · 12 months of updates',
    billingLifetime: 'One-time payment · Lifetime updates',
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
    priceStandard: '$149',
    priceLifetime: '$299',
    billing: 'One-time payment · 12 months of updates',
    billingLifetime: 'One-time payment · Lifetime updates',
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
  const [selected,  setSelected]  = useState(null);
  const [isLifetime, setIsLifetime] = useState(false);

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

        {/* Billing toggle */}
        <div className="pyt__toggle reveal" style={{ transitionDelay: '0.15s' }}>
          <button
            className={`pyt__toggle-pill ${!isLifetime ? 'pyt__toggle-pill--active' : ''}`}
            onClick={() => setIsLifetime(false)}
          >
            Standard
          </button>
          <button
            className={`pyt__toggle-pill ${isLifetime ? 'pyt__toggle-pill--active' : ''}`}
            onClick={() => setIsLifetime(true)}
          >
            Lifetime
            <span className="pyt__toggle-badge">Best Value</span>
          </button>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="pyt__grid">
        {THEMES.map((t, i) => {
          const isSelected = selected === t.id;
          const price   = isLifetime ? t.priceLifetime   : t.priceStandard;
          const billing = isLifetime ? t.billingLifetime : t.billing;

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
                  <img
                    src={t.img}
                    alt={`${t.name} preview`}
                    className="pyt-card__img"
                    loading="lazy"
                    decoding="async"
                  />
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
                  <div className="pyt-card__price-row">
                    <div
                      className="pyt-card__price"
                      style={{ color: isSelected ? t.btnColor : 'var(--color-accent)' }}
                    >
                      {price}
                    </div>
                    {isLifetime && (
                      <span className="pyt__lifetime-tag">Lifetime</span>
                    )}
                  </div>
                  <p className="pyt-card__billing">{billing}</p>
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

      {/* Starter */}
      <div className="pyt__starter reveal" style={{ transitionDelay: '0.35s' }}>
        <div className="pyt__starter-label">Or a tighter budget</div>
        <div className="pyt__starter-body">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="pyt__starter-name">Plain Jane Starter</span>
              <span className="pyt__starter-price">$49 one-time</span>
            </div>
            <p className="pyt__starter-desc">
              Clean product pages, a cart drawer and a fast launch.
              Enough to stop looking like a default theme.
            </p>
            <p className="pyt__starter-desc" style={{ opacity: 0.55 }}>
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
