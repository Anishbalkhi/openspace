const FEATURES = [
  { icon: '🚀', title: 'Same-day launch', desc: 'Import a theme, connect your products, and go live — usually in under 3 hours.' },
  { icon: '🎨', title: 'No-code editor', desc: 'Full Shopify sections & blocks. Drag, drop, and customise every pixel — no developer needed.' },
  { icon: '📱', title: 'Mobile-first', desc: 'Every theme is pixel-perfect on mobile. Tested on 40+ devices and screen sizes.' },
  { icon: '⚡', title: 'Blazing fast', desc: 'Lighthouse scores consistently above 90. Optimised images, deferred scripts, and zero render-blocking CSS.' },
  { icon: '🛒', title: 'Conversion-optimised', desc: 'Sticky ATCs, quick-add drawers, size guides, and trust badges — all wired up out of the box.' },
  { icon: '♾️', title: 'Lifetime updates', desc: 'One purchase, all future updates included. We ship new features every month.' },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section" style={{ paddingTop: 0 }}>
      <p className="section__label reveal">Why OpenSpaces</p>
      <h2 className="section__title reveal">
        Everything your store<br />needs, nothing it doesn't.
      </h2>
      <p className="section__sub reveal">
        We obsessed over every detail so you can focus on building your brand.
      </p>

      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            id={`feature-${i}`}
            className="feature-card reveal"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="feature-card__icon">{f.icon}</div>
            <div className="feature-card__title">{f.title}</div>
            <p className="feature-card__desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
