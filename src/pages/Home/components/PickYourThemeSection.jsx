import { useState } from 'react';
import './PickYourThemeSection.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../components/Cart';

const THEMES = [
  {
    id: 'plain-jane',
    headerTag: 'MOST POPULAR',
    headerTagColor: '#ffcc00',
    badge: '↗ Growing & Leveling Up',
    badgeColor: '#4589ff',
    badgeBg: 'rgba(69, 137, 255, 0.12)',
    badgeBorder: 'rgba(69, 137, 255, 0.35)',
    name: 'PLAIN JANE',
    priceStandard: '$99',
    priceLifetime: '$199',
    priceColor: '#4589ff',
    billing: 'One-time payment · 12 months of updates',
    billingLifetime: 'One-time payment · Lifetime updates',
    tagline: 'Deep customization and storytelling tools that grow with your brand.',
    bottomNote: 'Deep customization, storytelling tools, and flexibility that grows with your brand.',
    features: [
      'Up to 9 lookbook pages',
      'Countdown timers for drops',
      'Custom font uploads',
      'Built-in music player',
      'Video backgrounds',
      'Password page with countdown',
    ],
    img: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    accentColor: '#4589ff',
    accentGlow: 'rgba(69, 137, 255, 0.32)',
    btnColor: '#4589ff',
    btnHover: '#5c9aff',
  },
  {
    id: 'plain-jane-interactive',
    headerTag: 'BEST FEATURES',
    headerTagColor: '#ffcc00',
    badge: '✦ Full Creative Control',
    badgeColor: '#ff4db8',
    badgeBg: 'rgba(255, 77, 184, 0.12)',
    badgeBorder: 'rgba(255, 77, 184, 0.35)',
    name: 'PLAIN JANE INTERACTIVE',
    priceStandard: '$149',
    priceLifetime: '$299',
    priceColor: '#ff4db8',
    billing: 'One-time payment · 12 months of updates',
    billingLifetime: 'One-time payment · Lifetime updates',
    tagline: 'Interactive elements and immersive storytelling to stand out.',
    bottomNote: 'Interactive elements, immersive storytelling, and the creative freedom to stand out.',
    features: [
      'Everything in Plain Jane',
      '8 immersive spaces',
      'Interactive animations & transitions',
      'Floating product showcases',
      'Touch-optimised interactions',
      'Preloader animations',
    ],
    img: '/pickyourtheme/3_cf50cd1f-2b11-45c2-ac71-b585cc64e5aa.avif',
    accentColor: '#ff4db8',
    accentGlow: 'rgba(255, 77, 184, 0.32)',
    btnColor: '#ff4db8',
    btnHover: '#ff66c4',
  },
];

const PickYourThemeSection = () => {
  const [selected, setSelected] = useState('plain-jane');
  const [isLifetime, setIsLifetime] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddTheme = (theme, e) => {
    e?.stopPropagation();
    const isLife = isLifetime;
    const priceNum = isLife
      ? parseFloat(theme.priceLifetime.replace(/[^0-9.]/g, ''))
      : parseFloat(theme.priceStandard.replace(/[^0-9.]/g, ''));

    addItem({
      id: isLife ? `${theme.id}-lifetime` : theme.id,
      name: isLife ? `${theme.name} (Lifetime)` : `${theme.name} Theme`,
      subtitle: isLife ? theme.billingLifetime : theme.billing,
      price: priceNum,
      image: theme.img,
      tag: isLife ? 'Lifetime' : 'Standard',
      badge: theme.badge,
    });
  };

  const handleAddStarter = () => {
    addItem({
      id: 'starter',
      name: 'Plain Jane Starter Theme',
      subtitle: 'Clean product pages, cart drawer & fast launch',
      price: 49,
      image: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
      tag: 'Starter',
    });
  };

  return (
    <section id="pick-theme" className="pyt-section">
      
      {/* ── Subtle Background Grid ── */}
      <div className="pyt__bg" aria-hidden="true">
        <div className="pyt__grid" />
      </div>

      {/* ── Header ── */}
      <div className="pyt__header">
        <h2 className="pyt__title">PICK YOUR THEME</h2>
        <p className="pyt__sub">
          Plain Jane is where most brands land. Interactive adds motion
          and depth for stores that want to be remembered.
        </p>

        {/* Billing Toggle */}
        <div className="pyt__toggle-wrap">
          <button
            type="button"
            className={`pyt__toggle-pill ${!isLifetime ? 'pyt__toggle-pill--active' : ''}`}
            onClick={() => setIsLifetime(false)}
          >
            STANDARD
          </button>
          <button
            type="button"
            className={`pyt__toggle-pill ${isLifetime ? 'pyt__toggle-pill--active' : ''}`}
            onClick={() => setIsLifetime(true)}
          >
            <span>LIFETIME</span>
            <span className="pyt__toggle-badge">BEST VALUE</span>
          </button>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="pyt__cards-grid">
        {THEMES.map((t) => {
          const isSelected = selected === t.id;
          const price = isLifetime ? t.priceLifetime : t.priceStandard;
          const billing = isLifetime ? t.billingLifetime : t.billing;

          return (
            <div
              key={t.id}
              id={`pyt-card-${t.id}`}
              className={`pyt-card ${isSelected ? 'pyt-card--selected' : ''}`}
              style={{
                '--card-accent': t.accentColor,
                '--card-accent-glow': t.accentGlow,
                '--card-btn-color': t.btnColor,
                '--card-btn-hover': t.btnHover,
              }}
              onClick={() => setSelected(t.id)}
            >
              {/* Header Tag (MOST POPULAR / BEST FEATURES) */}
              <div className="pyt-card__tag-wrap">
                <span className="pyt-card__header-tag" style={{ color: t.headerTagColor }}>
                  {t.headerTag}
                </span>
              </div>

              {/* Product Mockup Image */}
              <div className="pyt-card__img-wrap">
                <img
                  src={t.img}
                  alt={`${t.name} preview`}
                  className="pyt-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Card Body */}
              <div className="pyt-card__body">
                {/* Badge */}
                <div
                  className="pyt-card__badge"
                  style={{
                    color: t.badgeColor,
                    background: t.badgeBg,
                    borderColor: t.badgeBorder,
                  }}
                >
                  {t.badge}
                </div>

                {/* Title in Pixel Font */}
                <h3 className="pyt-card__name">{t.name}</h3>

                {/* Price */}
                <div className="pyt-card__price" style={{ color: t.priceColor }}>
                  {price}
                </div>

                {/* Billing */}
                <p className="pyt-card__billing">{billing}</p>

                {/* Tagline */}
                <p className="pyt-card__tagline">{t.tagline}</p>

                {/* Feature Checklist */}
                <ul className="pyt-card__features">
                  {t.features.map((f) => (
                    <li key={f} className="pyt-card__feature">
                      <span className="pyt-card__check">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Active / Selected Bottom Expand Box */}
                {isSelected && (
                  <div className="pyt-card__selected-bottom">
                    <div className="pyt-card__divider" />
                    <p className="pyt-card__bottom-note">{t.bottomNote}</p>

                    <div className="pyt-card__btns">
                      <button
                        type="button"
                        className="pyt-card__btn-primary"
                        style={{ background: t.btnColor }}
                        onClick={(e) => handleAddTheme(t, e)}
                      >
                        View Theme →
                      </button>
                      <button
                        type="button"
                        className="pyt-card__btn-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/themes/demos');
                        }}
                      >
                        View Demo
                      </button>
                    </div>
                  </div>
                )}

                {/* Non-selected fallback buttons */}
                {!isSelected && (
                  <div className="pyt-card__btns pyt-card__btns--muted">
                    <button
                      type="button"
                      className="pyt-card__btn-primary pyt-card__btn-primary--outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(t.id);
                      }}
                    >
                      Select Theme
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

      {/* ── Starter Banner Card (Dual-Tone Accent) ── */}
      <div className="pyt__starter">
        <div className="pyt__starter-label">✦ OR A TIGHTER BUDGET</div>
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
            </p>
          </div>
          <button
            type="button"
            className="pyt__starter-btn"
            onClick={handleAddStarter}
          >
            Add Starter — $49
          </button>
        </div>
      </div>

    </section>
  );
};

export default PickYourThemeSection;
