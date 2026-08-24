const THEMES = [
  {
    id: 'bolt',
    name: 'Bolt',
    desc: 'High-energy layouts with bold type and full-bleed imagery. Built for performance apparel.',
    price: '$280',
    img: '/images/justdrop2-optimized.avif',
  },
  {
    id: 'apex',
    name: 'Apex',
    desc: 'Minimalist and editorial. Let your products do the talking with clean whitespace and sharp grids.',
    price: '$240',
    img: '/images/justdrop5-optimized.avif',
  },
  {
    id: 'circuit',
    name: 'Circuit',
    desc: 'Tech-forward dark mode theme. Data-driven layouts with animated stats and feature callouts.',
    price: '$260',
    img: '/images/justdrop7-optimized.avif',
  },
];

const ThemesSection = () => {
  return (
    <section id="themes" className="section">
      <p className="section__label reveal">Themes</p>
      <h2 className="section__title reveal">
        Pick your aesthetic.<br />
        <span style={{ color: 'var(--color-accent)' }}>Ship today.</span>
      </h2>
      <p className="section__sub reveal">
        Every theme is purpose-built for activewear. One-time payment — no subscriptions, no lock-in.
      </p>

      <div className="themes-grid">
        {THEMES.map((t, i) => (
          <div
            key={t.id}
            id={`theme-card-${t.id}`}
            className="theme-card reveal"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="theme-card__preview">
              <img src={t.img} alt={`${t.name} theme preview`} />
              <div className="theme-card__overlay" />
            </div>
            <div className="theme-card__body">
              <div className="theme-card__name">{t.name}</div>
              <p className="theme-card__desc">{t.desc}</p>
              <div className="theme-card__footer">
                <span className="theme-card__price">{t.price}</span>
                <span className="theme-card__action">
                  Preview →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThemesSection;
