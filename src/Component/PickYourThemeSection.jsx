const THEMES = [
  {
    id: 'plain-jane',
    badge: '↗ Growing & Levelling Up',
    badgeColor: '#e8ff4d',
    name: 'Plain Jane',
    price: '$99',
    billing: 'One-time payment · 12 months of updates',
    tagline: 'Deep customization and storytelling tools that grow with your brand.',
    features: [
      'Up to 9 lookbook pages',
      'Countdown timers for drops',
      'Custom font uploads',
      'Built-in music player',
      'Video backgrounds',
      'Password page with countdown',
    ],
    img: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    highlight: true,
    btnColor: '#e8ff4d',
    btnTextColor: '#000',
  },
  {
    id: 'plain-jane-interactive',
    badge: '✦ Full Creative Control',
    badgeColor: '#ff9d6b',
    name: 'Plain Jane Interactive',
    price: '$149',
    billing: 'One-time payment · 12 months of updates',
    tagline: 'Interactive elements and immersive storytelling to stand out.',
    features: [
      'Everything in Plain Jane',
      '8 immersive scenes',
      'Interactive animations & transitions',
      'Floating product showcases',
      'Touch-optimised interactions',
      'Preloader animations',
    ],
    img: '/pickyourtheme/3_cf50cd1f-2b11-45c2-ac71-b585cc64e5aa.avif',
    highlight: false,
    btnColor: '#4f8aff',
    btnTextColor: '#fff',
  },
];

const PickYourThemeSection = () => (
  <section id="pick-theme" className="pyt-section">
    <div className="pyt__header">
      <h2 className="pyt__title">Pick Your Theme</h2>
      <p className="pyt__sub">
        Plain Jane is where most brands land. Interactive adds motion
        and depth for stores that want to be remembered.
      </p>
      <div className="pyt__toggle">
        <span className="pyt__toggle-pill pyt__toggle-pill--active">Standard</span>
        <span className="pyt__toggle-pill">Lifetime</span>
      </div>
    </div>

    <div className="pyt__grid">
      {THEMES.map((t) => (
        <div
          key={t.id}
          id={`pyt-card-${t.id}`}
          className="pyt-card"
          style={{
            borderColor: `${t.btnColor}50`,
            boxShadow: `0 0 0 1px ${t.btnColor}18, 0 8px 30px ${t.btnColor}10`,
          }}
        >
          {/* Image area — dark bg, contains the product mockup */}
          <div className="pyt-card__img-wrap">
            <img src={t.img} alt={`${t.name} preview`} className="pyt-card__img" />
          </div>

          {/* Badge sits below image, above body */}
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
            <div className="pyt-card__price">{t.price}</div>
            <p className="pyt-card__billing">{t.billing}</p>
            <p className="pyt-card__tagline">{t.tagline}</p>

            <ul className="pyt-card__features">
              {t.features.map((f) => (
                <li key={f} className="pyt-card__feature">
                  <span className="pyt-card__check" style={{ color: t.badgeColor }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className="pyt-card__btn-primary"
              style={{ background: t.btnColor, color: t.btnTextColor }}
            >
              View Theme →
            </button>
            <button className="pyt-card__btn-secondary">View Demo</button>
          </div>
        </div>
      ))}
    </div>

    {/* Starter */}
    <div className="pyt__starter">
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

export default PickYourThemeSection;
