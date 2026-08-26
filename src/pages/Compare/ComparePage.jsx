import { useState, useMemo, Fragment } from 'react';
import { FiCheck, FiX, FiShield, FiArrowRight, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Footer from '../../Layout/Footer.jsx';
import './ComparePage.css';

const THEMES = [
  {
    id: 'starter',
    name: 'Starter',
    fullName: 'Plain Jane Starter',
    priceStandard: '$59',
    priceLifetime: '$59',
    billingStandard: 'One-time payment · Core features',
    billingLifetime: 'One-time payment · Core features',
    badge: null,
    glow: 'rgba(168, 85, 247, 0.15)',
    img: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    url: '/products/plain-jane-starter',
    btnLabel: 'Get Starter',
    btnVariant: 'white',
  },
  {
    id: 'plain-jane',
    name: 'Plain Jane',
    fullName: 'Plain Jane',
    priceStandard: '$99',
    priceLifetime: '$199',
    billingStandard: '12 months updates · Standard',
    billingLifetime: 'Lifetime updates · Never pay again',
    badge: 'Most Popular',
    glow: 'rgba(34, 211, 238, 0.2)',
    img: '/pickyourtheme/2_e4952070-9788-46f2-8798-5305c910d8d9.avif',
    url: '/products/plain-jane',
    btnLabel: 'Get Plain Jane',
    btnVariant: 'white',
  },
  {
    id: 'interactive',
    name: 'Interactive',
    fullName: 'Plain Jane Interactive',
    priceStandard: '$149',
    priceLifetime: '$299',
    billingStandard: '12 months updates · 8 3D Worlds',
    billingLifetime: 'Lifetime updates · Full Creative Suite',
    badge: 'Best Value',
    glow: 'rgba(236, 72, 153, 0.25)',
    img: '/pickyourtheme/3_cf50cd1f-2b11-45c2-ac71-b585cc64e5aa.avif',
    url: '/products/plain-jane-interactive',
    btnLabel: 'Get Interactive →',
    btnVariant: 'gradient',
  },
];

const COMPARISON_GROUPS = [
  {
    id: 'always-included',
    category: 'Always Included',
    rows: [
      { feature: 'Responsive & Mobile-Optimized', starter: true, pj: true, interactive: true, info: 'Optimized for high conversion on all iOS and Android devices' },
      { feature: 'Free Installation Help', starter: true, pj: true, interactive: true, info: 'Our developers will install and configure your theme for free' },
      { feature: 'YouTube Tutorials', starter: true, pj: true, interactive: true, info: 'Over 50+ video walkthroughs and setup guides' },
      { feature: 'Discord Community', starter: true, pj: true, interactive: true, info: 'Direct access to founders and 8,500+ e-commerce brand owners' },
      { feature: '100% Moneyback Guarantee', starter: true, pj: true, interactive: true, info: 'Risk-free 14-day conversion guarantee' },
    ],
  },
  {
    id: 'sell-pro',
    category: 'Sell Like a Pro',
    rows: [
      { feature: 'Product Image Zoom', starter: true, pj: true, interactive: true, info: 'Ultra-crisp crystal lens magnification on hover' },
      { feature: '3D/AR Product Viewer', starter: false, pj: true, interactive: true, info: 'Show real-time GLTF/USDZ models right on PDP' },
      { feature: 'Video in Product Gallery', starter: true, pj: true, interactive: true, info: 'Autoplaying looping videos in product carousels' },
      { feature: 'Cart Drawer', starter: true, pj: true, interactive: true, info: 'Slide-out cart with upsell addons and free-shipping progress bar' },
      { feature: 'Predictive Search', starter: true, pj: true, interactive: true, info: 'Instant live fuzzy search for products and collections' },
      { feature: 'Related Products', starter: true, pj: true, interactive: true, info: 'Algorithmic cross-sells powered by Shopify recommendations' },
      { feature: 'Customer Accounts', starter: true, pj: true, interactive: true, info: 'Modern customer login, order tracking, and account portal' },
      { feature: 'Product Hover Animations', starter: false, pj: true, interactive: true, info: 'Kinetic image flip, color swatch preview, and quick add' },
      { feature: 'Cart FOMO Timer', starter: false, pj: true, interactive: true, info: 'Reserve timer that counts down remaining hold time' },
      { feature: '2 Collection Layouts', starter: false, pj: true, interactive: true, info: 'Editorial split-view grid & infinite scroll catalog' },
    ],
  },
  {
    id: 'visuals',
    category: 'Look Like a Million Bucks',
    rows: [
      { feature: 'Custom Fonts (Upload Your Own)', starter: false, pj: true, interactive: true, info: 'Upload custom .woff2/.otf fonts directly into theme settings' },
      { feature: 'Custom Cursors', starter: false, pj: true, interactive: true, info: 'Neon glow dot, crosshair, or branded cursor trail' },
      { feature: 'Video Backgrounds', starter: false, pj: true, interactive: true, info: 'Full-bleed high framerate MP4/WebM video hero sections' },
      { feature: 'Music Player (Up to 6 Tracks)', starter: false, pj: true, interactive: true, info: 'Built-in soundtrack widget with play/pause and custom playlist' },
      { feature: 'Preloader Animations', starter: false, pj: true, interactive: true, info: 'Custom loading screen with logo pulse & percentage bar' },
      { feature: '3 Homepage Layouts', starter: false, pj: true, interactive: true, info: 'Lookbook hero, brutalist drop grid, or video-first storefront' },
    ],
  },
  {
    id: 'hype',
    category: 'Build Hype & Drive Sales',
    rows: [
      { feature: 'Countdown Timers for Drops', starter: false, pj: true, interactive: true, info: 'Synchronized global countdown clock with automated unlock' },
      { feature: 'Password Page w/ Countdown + Music', starter: false, pj: true, interactive: true, info: 'Hype locked storefront with background audio and SMS capture' },
      { feature: 'Scrolling Announcement Bar', starter: false, pj: true, interactive: true, info: 'Infinite marquee banner with custom speed & emoji support' },
      { feature: 'Email Popup', starter: false, pj: true, interactive: true, info: 'High-converting exit-intent discount popup' },
    ],
  },
  {
    id: 'story',
    category: 'Tell Your Brand Story',
    rows: [
      { feature: 'Lookbook Pages (Up to 9)', starter: false, pj: true, interactive: true, info: 'Full-bleed magazine style editorial lookbook layouts' },
      { feature: 'Blog System (Full)', starter: false, pj: true, interactive: true, info: 'Styled editorial articles, interviews, and press clippings' },
      { feature: 'FAQ Sections', starter: false, pj: true, interactive: true, info: 'Collapsible accordion for sizing, care, and shipping info' },
    ],
  },
  {
    id: 'interactive-edge',
    category: 'Interactive Edge (PJI Only)',
    rows: [
      { feature: '8 Immersive Spaces', starter: false, pj: false, interactive: true, info: 'Interactive 3D navigable rooms and digital showroom worlds' },
      { feature: 'Interactive Animations & Transitions', starter: false, pj: false, interactive: true, info: 'Liquid physics, smooth smooth-scroll and cursor magnetism' },
      { feature: 'Touch-Optimized Interactions', starter: false, pj: false, interactive: true, info: 'Fluid pinch, swipe, and tilt motions engineered for mobile' },
      { feature: 'Floating Product Showcases', starter: false, pj: false, interactive: true, info: 'Shoppable floating hotspots embedded right into 3D scenes' },
    ],
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Features' },
  { id: 'always-included', label: 'Always Included' },
  { id: 'sell-pro', label: 'Sell Tools' },
  { id: 'visuals', label: 'Design' },
  { id: 'hype', label: 'Hype & Drops' },
  { id: 'interactive-edge', label: 'Interactive' },
];

const ComparePage = () => {
  const [activeMobileTab, setActiveMobileTab] = useState('plain-jane');
  const [billingPlan, setBillingPlan] = useState('standard'); // 'standard' | 'lifetime'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategoryCollapse = (catId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  const selectedTheme = THEMES.find((t) => t.id === activeMobileTab) || THEMES[1];

  const getThemeValue = (row, themeId) => {
    if (themeId === 'starter') return row.starter;
    if (themeId === 'plain-jane') return row.pj;
    if (themeId === 'interactive') return row.interactive;
    return false;
  };

  const filteredGroups = useMemo(() => {
    return COMPARISON_GROUPS.map((group) => {
      if (selectedCategory !== 'all' && group.id !== selectedCategory) {
        return null;
      }
      if (!searchQuery.trim()) {
        return group;
      }
      const matchingRows = group.rows.filter(
        (row) =>
          row.feature.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (row.info && row.info.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (matchingRows.length === 0) return null;
      return { ...group, rows: matchingRows };
    }).filter(Boolean);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="cmp-page">
      <section className="cmp-section">
        <div className="cmp-container">
          {/* ── Top Eyebrow & Main Title ── */}
          <div className="cmp-header">
            <p className="cmp-eyebrow">Trusted by 8,500+ brands</p>
            <h1 className="cmp-title">Compare Our Themes</h1>
            <p className="cmp-sub">
              Find the perfect theme for your brand. All themes include free installation help,
              Discord community access, and lifetime conversion optimization.
            </p>

            {/* ── Interactive Billing Toggle ── */}
            <div className="cmp-billing-toggle-wrap">
              <div className="cmp-billing-toggle">
                <button
                  type="button"
                  onClick={() => setBillingPlan('standard')}
                  className={`cmp-billing-btn ${billingPlan === 'standard' ? 'cmp-billing-btn--active' : ''}`}
                >
                  Standard (12M Updates)
                </button>
                <button
                  type="button"
                  onClick={() => setBillingPlan('lifetime')}
                  className={`cmp-billing-btn ${billingPlan === 'lifetime' ? 'cmp-billing-btn--active' : ''}`}
                >
                  Lifetime (Forever Updates)
                  <span className="cmp-save-badge">Save 40%</span>
                </button>
              </div>
            </div>

            {/* ── Search & Category Filter Pills ── */}
            <div className="cmp-controls">
              <div className="cmp-search-box">
                <FiSearch className="cmp-search-icon" />
                <input
                  type="text"
                  placeholder="Search features (e.g. music, 3D, countdown, font)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="cmp-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="cmp-search-clear"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="cmp-cat-tabs">
                {CATEGORY_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`cmp-cat-tab ${selectedCategory === tab.id ? 'cmp-cat-tab--active' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Mobile Layout (< 768px) ── */}
          <div className="cmp-mobile">
            <div className="cmp-mobile-tabs">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setActiveMobileTab(theme.id)}
                  className={`cmp-mobile-tab-btn ${
                    activeMobileTab === theme.id ? 'cmp-mobile-tab-btn--active' : ''
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>

            <div className="cmp-mobile-card">
              <div
                className="cmp-theme-box-glow"
                style={{ background: `radial-gradient(circle, ${selectedTheme.glow} 0%, transparent 70%)` }}
              />
              <img
                src={selectedTheme.img}
                alt={selectedTheme.fullName}
                className="cmp-mobile-card__img"
              />
              {selectedTheme.badge && (
                <span className="cmp-mobile-badge">{selectedTheme.badge}</span>
              )}
              <h2 className="cmp-mobile-card__title">{selectedTheme.fullName}</h2>
              <p className="cmp-mobile-card__price">
                {billingPlan === 'standard' ? selectedTheme.priceStandard : selectedTheme.priceLifetime}{' '}
                <span className="cmp-mobile-card__billing">
                  {billingPlan === 'standard' ? '/ 12M' : '/ Lifetime'}
                </span>
              </p>
            </div>

            <div className="cmp-mobile-categories">
              {filteredGroups.map((group) => (
                <div key={group.category} className="cmp-mobile-cat">
                  <div
                    className="cmp-mobile-cat__header"
                    onClick={() => toggleCategoryCollapse(group.id)}
                  >
                    <h3 className="cmp-mobile-cat__title">{group.category}</h3>
                    {collapsedCategories[group.id] ? <FiChevronDown /> : <FiChevronUp />}
                  </div>
                  {!collapsedCategories[group.id] && (
                    <div className="cmp-mobile-cat__rows">
                      {group.rows.map((row) => {
                        const val = getThemeValue(row, activeMobileTab);
                        return (
                          <div key={row.feature} className="cmp-mobile-row">
                            <div>
                              <span className="cmp-mobile-row__label">{row.feature}</span>
                              {row.info && (
                                <span className="cmp-mobile-row__info">{row.info}</span>
                              )}
                            </div>
                            {val ? (
                              <FiCheck className="cmp-icon-check" />
                            ) : (
                              <FiX className="cmp-icon-x" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <a
              href={selectedTheme.url}
              className={`cmp-mobile-cta ${
                selectedTheme.btnVariant === 'gradient' ? 'cmp-mobile-cta--gradient' : ''
              }`}
            >
              Get {selectedTheme.name} →
            </a>
          </div>

          {/* ── Desktop Comparison Matrix (>= 768px) ── */}
          <div className="cmp-desktop">
            <div className="cmp-matrix-container">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th className="cmp-th--feature">Feature</th>
                    {THEMES.map((theme) => {
                      const displayPrice =
                        billingPlan === 'standard' ? theme.priceStandard : theme.priceLifetime;
                      const billingNote =
                        billingPlan === 'standard' ? theme.billingStandard : theme.billingLifetime;

                      return (
                        <th
                          key={theme.id}
                          className={`cmp-th--col ${
                            theme.id === 'plain-jane' ? 'cmp-th--highlight' : ''
                          }`}
                        >
                          <div className="cmp-theme-box-wrap">
                            <div
                              className="cmp-theme-box-glow"
                              style={{
                                background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
                              }}
                            />
                            <img
                              src={theme.img}
                              alt={theme.fullName}
                              className="cmp-theme-box-img"
                            />
                          </div>
                          {theme.badge && (
                            <span className="cmp-badge-popular">{theme.badge}</span>
                          )}
                          <div className="cmp-theme-name">{theme.name}</div>
                          <div className="cmp-theme-price-wrap">
                            <span className="cmp-theme-price">{displayPrice}</span>
                            <span className="cmp-theme-billing">{billingNote}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="cmp-no-results">
                        No features matching &ldquo;{searchQuery}&rdquo;. Try another term.
                      </td>
                    </tr>
                  ) : (
                    filteredGroups.map((group) => (
                      <Fragment key={group.category}>
                        <tr
                          className="cmp-tr--category"
                          onClick={() => toggleCategoryCollapse(group.id)}
                        >
                          <td colSpan={4}>
                            <div className="cmp-cat-header-inner">
                              <span className="cmp-cat-badge">{group.category}</span>
                              <span className="cmp-cat-toggle-icon">
                                {collapsedCategories[group.id] ? (
                                  <FiChevronDown />
                                ) : (
                                  <FiChevronUp />
                                )}
                              </span>
                            </div>
                          </td>
                        </tr>
                        {!collapsedCategories[group.id] &&
                          group.rows.map((row) => (
                            <tr key={row.feature} className="cmp-tr">
                              <td className="cmp-td--feature">
                                <span className="cmp-feat-title">{row.feature}</span>
                                {row.info && (
                                  <span className="cmp-feat-info">{row.info}</span>
                                )}
                              </td>
                              <td className="cmp-td--val">
                                {row.starter ? (
                                  <span className="cmp-check-wrap">
                                    <FiCheck className="cmp-icon-check" />
                                  </span>
                                ) : (
                                  <FiX className="cmp-icon-x" />
                                )}
                              </td>
                              <td className="cmp-td--val cmp-td--highlight">
                                {row.pj ? (
                                  <span className="cmp-check-wrap cmp-check-wrap--pj">
                                    <FiCheck className="cmp-icon-check" />
                                  </span>
                                ) : (
                                  <FiX className="cmp-icon-x" />
                                )}
                              </td>
                              <td className="cmp-td--val">
                                {row.interactive ? (
                                  <span className="cmp-check-wrap cmp-check-wrap--interactive">
                                    <FiCheck className="cmp-icon-check" />
                                  </span>
                                ) : (
                                  <FiX className="cmp-icon-x" />
                                )}
                              </td>
                            </tr>
                          ))}
                      </Fragment>
                    ))
                  )}
                </tbody>
              </table>

              {/* Desktop Sticky/Fixed Action Buttons Row */}
              <div className="cmp-cta-grid">
                <div className="cmp-cta-info">
                  <p className="cmp-cta-info-title">Need custom setup?</p>
                  <p className="cmp-cta-info-sub">Free 24h installation included</p>
                </div>
                {THEMES.map((theme) => (
                  <div key={theme.id} className="cmp-cta-col">
                    <a
                      href={theme.url}
                      className={`cmp-btn-cta ${
                        theme.btnVariant === 'gradient'
                          ? 'cmp-btn-cta--gradient'
                          : 'cmp-btn-cta--white'
                      }`}
                    >
                      {theme.btnLabel}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Moneyback Guarantee Card ── */}
          <div className="cmp-guarantee-card">
            <div className="cmp-guarantee-head">
              <FiShield />
              <span>100% Moneyback Guarantee</span>
            </div>
            <p className="cmp-guarantee-text">
              If Plain Jane doesn&apos;t boost your sales and conversion rate compared to standard
              Shopify themes, show us within 14 days and we will refund you 100% — no questions
              asked.
            </p>
          </div>

          {/* ── Bottom Upsell Banner ── */}
          <div className="cmp-upsell-banner">
            <div className="cmp-upsell-glow" />
            <h2 className="cmp-upsell-title">Not sure? Go with Interactive.</h2>
            <p className="cmp-upsell-sub">
              It&apos;s our most popular theme for a reason — everything in Plain Jane plus 8
              interactive 3D spaces that make brands go viral. 8,500+ stores can&apos;t be wrong.
            </p>
            <a href="/products/plain-jane-interactive" className="cmp-upsell-link">
              <span>See Plain Jane Interactive</span>
              <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ── Global Footer ── */}
      <Footer />
    </div>
  );
};

export default ComparePage;
