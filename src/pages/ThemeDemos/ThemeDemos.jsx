import './ThemeDemos.css';
import { useState, useMemo } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { FiCheck, FiExternalLink } from 'react-icons/fi';
import { Footer } from '../../Layout';
import { useCart } from '../../components/Cart';

const DEMOS = [
  {
    id: 'supreme',
    name: 'Supreme Demo',
    tagline: 'Best for drop culture stripped to the essentials',
    tags: ['Streetwear'],
    plan: 'Plain Jane',
    checklist: ['Text-only homepage, zero noise', 'Box-logo restraint that reads as confidence'],
    demoUrl: 'https://plain-jane-lite.com',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/supreme-hero.webp',
  },
  {
    id: 'entire-studios',
    name: 'Entire Studios Demo',
    tagline: 'Best for minimal fashion with a hard edge',
    tags: ['Fashion'],
    plan: 'Plain Jane Interactive',
    checklist: ['Whitespace as the whole design', 'Silhouette-first product presentation'],
    demoUrl: 'https://entires-studios-os.myshopify.com',
    productUrl: '/products/plain-jane-interactive',
    productLabel: 'View Interactive',
    img: '/demos/entire-studios-hero.webp',
  },
  {
    id: 'drake-related',
    name: 'Drake Related Demo',
    tagline: 'Best for artist merch and campaign worlds',
    tags: ['Streetwear'],
    plan: 'Plain Jane Interactive',
    checklist: ['Explorable 3D brand world', 'Product hotspots placed in scene'],
    demoUrl: 'https://plain-jane-interactive.myshopify.com',
    productUrl: '/products/plain-jane-interactive',
    productLabel: 'View Interactive',
    img: '/demos/drake-related-hero.webp',
  },
  {
    id: 'ald',
    name: 'A.L.D Demo',
    tagline: 'Best for contemporary labels with a lookbook habit',
    tags: ['Fashion'],
    plan: 'Plain Jane',
    checklist: ['Full-bleed campaign photography', 'Editorial pacing, quiet typography'],
    demoUrl: 'https://aime-leon-dore-os.myshopify.com',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/ald-hero.webp',
  },
  {
    id: 'gentle-monster',
    name: 'Gentle Monster Demo',
    tagline: 'Best for eyewear, jewelry and accessories',
    tags: ['Jewelry & Accessories'],
    plan: 'Plain Jane',
    checklist: ['Macro detail at hero scale', 'On-body shots that give a sense of size'],
    demoUrl: 'https://gentle-monster-os.myshopify.com',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/gentle-monster-hero.webp',
  },
  {
    id: 'pleasures',
    name: 'Pleasures Demo',
    tagline: 'Best for graphic-led streetwear with a dark edge',
    tags: ['Streetwear'],
    plan: 'Plain Jane Interactive',
    checklist: ['Moody full-bleed campaign hero', 'Shop-the-drop entry straight from the fold'],
    demoUrl: 'https://pleasures-os.myshopify.com',
    productUrl: '/products/plain-jane-interactive',
    productLabel: 'View Interactive',
    img: '/demos/pleasures-hero.webp',
  },
  {
    id: 'yzy',
    name: 'YZY Demo',
    tagline: 'Best for minimal drops where product is the only voice',
    tags: ['Streetwear'],
    plan: 'Plain Jane',
    checklist: ['Bare grid, no chrome', 'Every pixel earns its place'],
    demoUrl: 'https://yeezy-os.myshopify.com',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/yzy-hero.webp',
  },
  {
    id: 'alyx',
    name: 'Alyx Demo',
    tagline: 'Best for luxury houses that lead with motion',
    tags: ['Fashion'],
    plan: 'Plain Jane',
    checklist: ['Video hero with kinetic wordmark', 'Restraint that makes a price make sense'],
    demoUrl: 'https://demo3.plain-jane-lite.com/password',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/alyx-hero.webp',
  },
  {
    id: 'sporty-rich',
    name: 'Sporty & Rich Demo',
    tagline: 'Best for athleisure and wellness ranges',
    tags: ['Activewear'],
    plan: 'Plain Jane',
    checklist: ['Editorial campaign hero', 'Collection and lookbook side by side'],
    demoUrl: 'https://sporty-and-rich-os.myshopify.com',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/sporty-rich-hero.webp',
  },
  {
    id: 'a-cold-wall',
    name: 'A-Cold-Wall* Demo',
    tagline: 'Best for technical fashion with an industrial edge',
    tags: ['Fashion'],
    plan: 'Plain Jane',
    checklist: ['Muted palette that lets fabric lead', 'Utility detail shown close up'],
    demoUrl: 'https://a-cold-wall-os.myshopify.com',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/a-cold-wall-hero.webp',
  },
  {
    id: 'satisfy-running',
    name: 'Satisfy Running Demo',
    tagline: 'Best for technical running kit sold on fabric and fit',
    tags: ['Activewear'],
    plan: 'Plain Jane Interactive',
    checklist: ['Flat lay first, worn shot second', 'Fabric and construction shown close up'],
    demoUrl: 'https://satisfy-running-os.myshopify.com',
    productUrl: '/products/plain-jane-interactive',
    productLabel: 'View Interactive',
    img: '/demos/satisfy-running-hero.webp',
  },
  {
    id: 'on-running',
    name: 'On Running Demo',
    tagline: 'Best for performance running brands',
    tags: ['Activewear'],
    plan: 'Plain Jane',
    checklist: ['Motion-led hero built for movement', 'Fabric and fit given room on the PDP'],
    demoUrl: 'https://pulseform-yi9so5rd.myshopify.com/',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/demos/on-running-hero.webp',
  },
  {
    id: 'missoma',
    name: 'Missoma Demo',
    tagline: 'Best for fine jewelry sold on detail',
    tags: ['Jewelry & Accessories'],
    plan: 'Plain Jane Interactive',
    checklist: ['Macro hero that shows the finish', 'Stacking and materials read at a glance'],
    demoUrl: 'https://missoma-os.myshopify.com/',
    productUrl: '/products/plain-jane-interactive',
    productLabel: 'View Interactive',
    img: '/demos/missoma-hero.webp',
  },
  {
    id: 'triangl',
    name: 'Triangl Demo',
    tagline: 'Best for swim and resort labels',
    tags: ['Swimwear'],
    plan: 'Plain Jane Interactive',
    checklist: ['Campaign hero shot on location', 'Colourway grid straight under the fold'],
    demoUrl: 'https://triangl-os.myshopify.com/',
    productUrl: '/products/plain-jane-interactive',
    productLabel: 'View Interactive',
    img: '/whichoneare/swimwear.avif',
  },
  {
    id: 'adanola',
    name: 'Adanola Demo',
    tagline: 'Best for studio and athleisure labels',
    tags: ['Activewear'],
    plan: 'Plain Jane',
    checklist: ['Clean grid for variant-heavy ranges', 'Sets and colourways stay legible'],
    demoUrl: 'https://adanola-os.myshopify.com/',
    productUrl: '/products/plain-jane',
    productLabel: 'View Plain Jane',
    img: '/images/justdrop4-optimized.avif',
  },
  {
    id: 'plain-jane-starter',
    name: 'Plain Jane Starter Demo',
    tagline: 'Best for first collections on a budget',
    tags: ['Starter'],
    plan: 'Plain Jane Starter',
    checklist: ['Clean product grid out of the box', 'Everything essential, nothing extra'],
    note: 'Core storefront only — no lookbooks, drop tools, or custom fonts. Upgrade to Plain Jane anytime.',
    demoUrl: 'https://plain-jane-starter.myshopify.com',
    productUrl: '/products/plain-jane-starter',
    productLabel: 'View Starter',
    img: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
  },
];

const FILTERS = [
  'All',
  'Streetwear',
  'Activewear',
  'Fashion',
  'Jewelry & Accessories',
  'Swimwear',
  'Starter',
  'Plain Jane',
  'Interactive',
];

const ThemeDemos = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addItem } = useCart();

  const handleBuyDemoTheme = (demo) => {
    let id = 'plain-jane';
    let name = 'Plain Jane Theme';
    let price = 99;
    let subtitle = 'Lookbooks, drop timers, custom fonts';
    let image = '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif';

    if (demo.plan === 'Plain Jane Interactive') {
      id = 'plain-jane-interactive';
      name = 'Plain Jane Interactive Theme';
      price = 149;
      subtitle = '8 3D worlds, kinetic motion & audio player';
      image = '/pickyourtheme/3_cf50cd1f-2b11-45c2-ac71-b585cc64e5aa.avif';
    } else if (demo.plan === 'Plain Jane Starter') {
      id = 'starter';
      name = 'Plain Jane Starter Theme';
      price = 59;
      subtitle = 'Clean product pages & rapid checkout setup';
      image = '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif';
    }

    addItem({
      id,
      name,
      subtitle,
      price,
      image,
      tag: demo.name,
      badge: demo.plan,
    });
  };

  const filteredDemos = useMemo(() => {
    if (activeFilter === 'All') return DEMOS;
    if (activeFilter === 'Plain Jane') return DEMOS.filter((d) => d.plan === 'Plain Jane');
    if (activeFilter === 'Interactive') return DEMOS.filter((d) => d.plan === 'Plain Jane Interactive');
    if (activeFilter === 'Starter') return DEMOS.filter((d) => d.plan === 'Plain Jane Starter');
    return DEMOS.filter((d) => d.tags.includes(activeFilter));
  }, [activeFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    // Hook up to real email capture endpoint here
    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <div className="td-page">
      <section id="demo-grid" className="td-section">
        <div className="td-container">

          {/* ── Header ── */}
          <div className="td-header">
            <p className="td-eyebrow">Theme Demos</p>
            <h2 className="td-title">Demo Library</h2>
            <p className="td-sub">
              Every look below is available in Plain Jane Interactive too — it includes everything
              Plain Jane does, plus an optional layer of shoppable photos and connected scenes when
              you want it.
            </p>
            <p className="td-disclaimer">
              Every store shown here is a concept build — our themes styled after well-known brands
              to demonstrate their range. None of these brands use, endorse, or promote OpenSpaces,
              and we are not affiliated with them.
            </p>
          </div>

          {/* ── Mobile email capture ── */}
          <div className="td-email-capture">
            <form onSubmit={handleSubmit}>
              <div className="td-email-row">
                <div className="td-email-copy">
                  <HiOutlineMail className="td-email-icon" />
                  <span>Save for later + 10% off</span>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="td-email-input"
                />
                <button type="submit" disabled={!email || submitting} className="td-email-btn">
                  Send Me 10% Off
                </button>
              </div>
            </form>
          </div>

          {/* ── Filter pills ── */}
          <div className="td-filter-scroll">
            <div className="td-filter-row">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`td-filter-pill ${activeFilter === filter ? 'td-filter-pill--active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* ── Demo grid ── */}
          <div className="td-grid">
            {filteredDemos.map((demo) => (
              <article key={demo.id} className="td-card">
                <a
                  href={demo.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="td-card__media-link"
                >
                  <div className="td-card__media">
                    <img src={demo.img} alt={`${demo.name} storefront preview`} loading="lazy" />
                    <div className="td-card__badge td-card__badge--plan">{demo.plan}</div>
                    {demo.tags.map((tag) => (
                      <div key={tag} className="td-card__badge td-card__badge--tag">{tag}</div>
                    ))}
                  </div>
                </a>

                <div className="td-card__body">
                  <div className="td-card__heading">
                    <h3 className="td-card__name">{demo.name}</h3>
                    <p className="td-card__tagline">{demo.tagline}</p>
                  </div>

                  <ul className="td-card__checklist">
                    {demo.checklist.map((item) => (
                      <li key={item}>
                        <FiCheck className="td-card__check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {demo.note && <p className="td-card__note">{demo.note}</p>}

                  <p className="td-card__password">
                    Password: <span>plainjane</span>
                  </p>

                  <div className="td-card__actions">
                    <a
                      href={demo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="td-card__btn td-card__btn--primary"
                    >
                      View Demo <FiExternalLink />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleBuyDemoTheme(demo)}
                      className="td-card__btn td-card__btn--secondary"
                    >
                      {demo.productLabel} →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky bottom CTA bar ── */}
      <div className="td-sticky-bar">
        <div className="td-sticky-bar__inner">
          <p className="td-sticky-bar__text">Ready to make your store look less basic?</p>
          <div className="td-sticky-bar__actions">
            <button
              type="button"
              onClick={() => handleBuyDemoTheme({ plan: 'Plain Jane', name: 'Plain Jane Theme' })}
              className="td-sticky-bar__btn td-sticky-bar__btn--primary"
            >
              Shop Themes
            </button>
            <a href="/compare" className="td-sticky-bar__btn td-sticky-bar__btn--secondary">
              Compare Themes
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
};

export default ThemeDemos;