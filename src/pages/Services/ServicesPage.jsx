import { useState } from 'react';
import {
  LuWrench,
  LuZap,
  LuRefreshCw,
  LuCode,
  LuMail,
  LuMegaphone,
  LuFilm,
  LuCircleHelp,
  LuChevronDown,
  LuArrowRight,
  LuStore,
} from 'react-icons/lu';
import Footer from '../../Layout/Footer.jsx';
import './ServicesPage.css';
import ModelViewer from '../../Component/ModelViewer.jsx';


const SERVICES_DATA = [
  {
    category: 'store',
    categoryTitle: 'Service Packages',
    categorySub: 'Get your store installed, fixed, or fully set up. Works with any Shopify 2.0 theme.',
    items: [
      {
        id: 'theme-installation',
        title: 'Theme Installation',
        desc: 'We install your OpenSpaces theme, activate your license, and make sure it loads correctly.',
        price: '$20',
        timeline: '⚡ 1–2 days',
        url: '/products/theme-installation',
        btnText: 'Get Theme Installation →',
        icon: LuWrench,
        renderVisual: () => (
          <div className="srv-visual-canvas">
            <div className="srv-visual-grid" />
            <div className="srv-visual-glow" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)' }} />
            <div className="srv-radar-ring srv-radar-ring--1" style={{ borderColor: 'rgba(192, 132, 252, 0.4)' }} />
            <div className="srv-radar-ring srv-radar-ring--2" style={{ borderColor: 'rgba(168, 85, 247, 0.3)' }} />
            <div className="srv-corner-ticks" />
           
            <div className="srv-neon-capsule srv-neon-capsule--purple">
              <LuWrench className="srv-neon-svg srv-neon-svg--purple" />
            </div>
          </div>
        ),
      },
      {
        id: 'quick-task',
        title: 'Quick Task',
        desc: 'One focused Shopify fix or tweak — bugs, styling, apps, pixels, mobile fixes, and small changes.',
        price: '$65',
        timeline: '⚡ 1–2 days',
        url: '/products/quick-task',
        btnText: 'Get Quick Task →',
        icon: LuZap,
        renderVisual: () => (
          <div className="srv-visual-canvas">
            <div className="srv-visual-grid" />
            <div className="srv-visual-glow" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)' }} />
            <div className="srv-radar-ring srv-radar-ring--1" style={{ borderColor: 'rgba(34, 211, 238, 0.4)' }} />
            <div className="srv-radar-ring srv-radar-ring--2" style={{ borderColor: 'rgba(6, 182, 212, 0.3)' }} />
            <div className="srv-corner-ticks" />
            <div className="srv-neon-capsule srv-neon-capsule--cyan">
              <LuZap className="srv-neon-svg srv-neon-svg--cyan" />
            </div>
          </div>
        ),
      },
      {
        id: 'full-theme-setup',
        title: 'Full Theme Setup',
        desc: 'A launch-ready Plain Jane setup with core pages, navigation, products, and mobile polish.',
        price: '$499',
        timeline: '⚡ 7–10 days',
        url: '/products/full-theme-setup',
        btnText: 'Get Full Theme Setup →',
        isHighlightBtn: true,
        hasPaymentLogos: true,
        icon: LuRefreshCw,
        renderVisual: () => (
          <div className="srv-visual-canvas">
            <div className="srv-visual-grid" />
            <div className="srv-visual-glow" style={{ background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)' }} />
            <div className="srv-radar-ring srv-radar-ring--1" style={{ borderColor: 'rgba(74, 222, 128, 0.4)' }} />
            <div className="srv-radar-ring srv-radar-ring--2" style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }} />
            <div className="srv-corner-ticks" />
            <div className="srv-neon-capsule srv-neon-capsule--green">
              <LuStore className="srv-neon-svg srv-neon-svg--green" />
            </div>
          </div>
        ),
      },
      {
        id: 'custom-project',
        title: 'Custom Project',
        desc: 'Something bigger or more custom than our packages cover. Tell us what you need and we’ll scope it.',
        price: 'From $350',
        timeline: null,
        url: '/requests/services?service=not-sure',
        btnText: 'Get a Quote →',
        hasPaymentLogos: true,
        icon: LuCode,
        renderVisual: () => (
          <div className="srv-visual-canvas">
            <div className="srv-visual-grid" />
            <div className="srv-visual-glow" style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%)' }} />
            <div className="srv-radar-ring srv-radar-ring--1" style={{ borderColor: 'rgba(251, 191, 36, 0.4)' }} />
            <div className="srv-radar-ring srv-radar-ring--2" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }} />
            <div className="srv-corner-ticks" />
            <div className="srv-neon-capsule srv-neon-capsule--amber">
              <LuCode className="srv-neon-svg srv-neon-svg--amber" />
            </div>
          </div>
        ),
      },
    ],
  },
  {
    category: 'marketing',
    categoryTitle: 'Marketing Services',
    categorySub: 'Done-for-you email, text, and Meta ads setup. Flat rate, no monthly commitment.',
    items: [
      {
        id: 'email-sms-starter',
        title: 'Klaviyo Email/SMS — Starter',
        desc: 'The core Klaviyo setup, built for you — welcome, cart-recovery, and browse-abandonment flows, plus a signup popup.',
        price: '$199',
        timeline: '⚡ 5–7 days',
        url: '/products/email-sms-starter',
        btnText: 'Get Klaviyo Email/SMS — Starter →',
        icon: LuMail,
        renderVisual: () => (
          <div className="srv-visual-canvas srv-banner--klaviyo-white">
            <svg viewBox="0 0 100 100" className="srv-klaviyo-flag-3d">
              <defs>
                <linearGradient id="klaviyoMatte" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2a2a2a" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
              </defs>
              <path d="M18 16 H82 L58 50 L82 84 H18 Z" fill="url(#klaviyoMatte)" />
            </svg>
          </div>
        ),
      },
      {
        id: 'email-sms-growth',
        title: 'Klaviyo Email/SMS — Growth',
        desc: 'Everything in Starter, plus 6 flows total, full text/SMS setup, and a combined email + text signup popup.',
        price: '$349',
        timeline: '⚡ 7–10 days',
        url: '/products/email-sms-growth',
        btnText: 'Get Klaviyo Email/SMS — Growth →',
        icon: LuMail,
        renderVisual: () => (
          <div className="srv-visual-canvas srv-banner--klaviyo-dark">
            <div className="srv-visual-grid" />
            <svg viewBox="0 0 100 100" className="srv-klaviyo-flag-glow">
              <defs>
                <linearGradient id="klaviyoNeonEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#888888" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <path
                d="M18 16 H82 L58 50 L82 84 H18 Z"
                fill="rgba(10, 10, 15, 0.85)"
                stroke="url(#klaviyoNeonEdge)"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ),
      },
      {
        id: 'meta-ads-starter',
        title: 'Meta Ads — Starter',
        desc: 'Your Meta Pixel and ad account set up the right way, plus a month-long running plan made for your brand.',
        price: '$199',
        timeline: '⚡ 3–5 days',
        url: '/products/meta-ads-starter',
        btnText: 'Get Meta Ads — Starter →',
        icon: LuMegaphone,
        renderVisual: () => (
          <div className="srv-visual-canvas srv-banner--meta-white">
            <svg viewBox="0 0 140 80" className="srv-meta-logo-3d">
              <defs>
                <linearGradient id="metaBlue3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0082fb" />
                  <stop offset="100%" stopColor="#0055cc" />
                </linearGradient>
              </defs>
              <path
                d="M38 18 C22 18 12 28 12 40 C12 52 22 62 35 62 C48 62 58 50 70 39 C82 50 92 62 105 62 C118 62 128 52 128 40 C128 28 118 18 102 18 C88 18 78 30 70 41 C62 30 52 18 38 18 Z"
                fill="none"
                stroke="url(#metaBlue3D)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ),
      },
      {
        id: 'meta-ads-scale',
        title: 'Meta Ads — Scale',
        desc: 'Deeper tracking with Meta CAPI, a full account setup, and the exact ads to make and run — spelled out for you.',
        price: '$399',
        timeline: '⚡ 5–7 days',
        url: '/products/meta-ads-scale',
        btnText: 'Get Meta Ads — Scale →',
        icon: LuMegaphone,
        renderVisual: () => (
          <div className="srv-visual-canvas srv-banner--meta-dark">
            <div className="srv-visual-grid" />
            <div className="srv-visual-glow" style={{ background: 'radial-gradient(circle, rgba(0, 168, 255, 0.4) 0%, transparent 70%)' }} />
            <svg viewBox="0 0 140 80" className="srv-meta-logo-glow">
              <defs>
                <linearGradient id="metaNeon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#0080ff" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
              <path
                d="M38 18 C22 18 12 28 12 40 C12 52 22 62 35 62 C48 62 58 50 70 39 C82 50 92 62 105 62 C118 62 128 52 128 40 C128 28 118 18 102 18 C88 18 78 30 70 41 C62 30 52 18 38 18 Z"
                fill="none"
                stroke="url(#metaNeon)"
                strokeWidth="13"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ),
      },
    ],
  },
  {
    category: 'assets',
    categoryTitle: 'Custom Assets',
    categorySub: '3D interactive product assets and motion branding assets.',
    items: [
      {
        id: '3d-logo',
        title: '3D Logo',
        desc: '3D spinning logos for your clothing brand or business. Have your logo ready to go! Turnaround time is approximately 2 business days or less. MP4/GIF files provided.',
        price: '$49',
        timeline: '⚡ 3–5 days',
        url: '/products/3d-logo',
        btnText: 'Get 3D Logo →',
        icon: LuFilm,
        renderVisual: () => (
          <div className="srv-visual-canvas srv-banner--3d">
            <div className="srv-visual-grid" />
            <div className="srv-visual-glow" style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, transparent 70%)' }} />
            <div className="srv-radar-ring srv-radar-ring--1" style={{ borderColor: 'rgba(192, 132, 252, 0.4)' }} />
            <div className="srv-3d-model-wrap">
              <ModelViewer type="logo" />
            </div>
          </div>
        ),
      },
      {
        id: '3d-product-image',
        title: '3D Product Image',
        desc: 'Send an image of your product and we take care of the rest. We give a .gif/mp4 as well as a .gltf/glb file so your customers can even spin and interact with your product.',
        price: '$65',
        timeline: '⚡ 3–5 days',
        url: '/products/3d-product-image',
        btnText: 'Get 3D Product Image →',
        icon: LuFilm,
        renderVisual: () => (
          <div className="srv-visual-canvas srv-banner--3d">
            <div className="srv-visual-grid" />
            <div className="srv-visual-glow" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, transparent 70%)' }} />
            <div className="srv-radar-ring srv-radar-ring--1" style={{ borderColor: 'rgba(34, 211, 238, 0.4)' }} />
            <div className="srv-3d-model-wrap">
              <ModelViewer type="product" />
            </div>
          </div>
        ),
      },
    ],
  },
];

const FAQS = [
  {
    q: "What if my request doesn't fit the package I bought?",
    a: "We catch this during the Scope Check — within 24 hours of purchase. If it doesn't fit, you get three options: switch to the right package, get a full refund, or we scope a custom quote. No work starts until scope is confirmed.",
  },
  {
    q: 'Do you work with non-OpenSpaces themes?',
    a: 'Yes. All packages work on any Shopify 2.0 theme at the same price.',
  },
  {
    q: "What's the Scope Check?",
    a: "Our 24-hour review after you purchase. We look at your intake form, check your store, and confirm your request fits the package. Think of it as a safety net — you never pay for something that doesn't fit.",
  },
  {
    q: 'How do I grant you access to my store?',
    a: "Through Shopify's collaborator system. Go to Shopify Admin → Settings → Users and permissions → scroll to 'Collaborator request code.' It's a 4-digit number. Takes 30 seconds.",
  },
  {
    q: 'What counts as a revision?',
    a: "One round of feedback after we deliver. You say 'change X, move Y, adjust Z' — we do it all in one pass. Quick Task gets 1 round. Project and Full Store Setup get 2 rounds. Additional rounds are $45 each.",
  },
  {
    q: "What if I need something that doesn't fit any package?",
    a: "Use the intake form and describe what you need. We'll send you a flat-rate custom quote within 48 hours. No commitment.",
  },
  {
    q: 'Do you offer ongoing maintenance?',
    a: 'Not as a monthly contract. But Quick Tasks are designed for exactly that — buy one whenever something needs attention. Most clients come back every few months.',
  },
  {
    q: "I'm an OpenSpaces+ member — do I get a discount?",
    a: 'Coming soon. OpenSpaces+ members will get service credits. Stay tuned.',
  },
];

const ServicesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const filteredGroups = SERVICES_DATA.filter(
    (group) => activeFilter === 'all' || group.category === activeFilter
  );

  return (
    <div className="srv-page">
      {/* ── High-Intensity Cyber Grid + Ambient Aurora Orbs ── */}
      <div className="srv-grid-bg" />
      <div className="srv-bg-orbs" aria-hidden="true">
        <div className="srv-orb srv-orb--purple" />
        <div className="srv-orb srv-orb--cyan" />
        <div className="srv-orb srv-orb--blue" />
      </div>

      <section className="srv-section">
        <div className="srv-container">
          {/* ── Hero Header ── */}
          <div className="srv-header">
            <h1 className="srv-title">
              SHOPIFY EXPERTS.
              <br />
              FLAT RATES. NO QUOTES.
            </h1>
            <p className="srv-sub">
              Tell us what you need. We build it.
              <span>Full refund if your request doesn&apos;t fit.</span>
            </p>
          </div>

          {/* ── Filter Pills Bar ── */}
          <div className="srv-filter-bar">
            {['all', 'store', 'marketing', 'assets'].map((filterKey) => (
              <button
                key={filterKey}
                type="button"
                onClick={() => setActiveFilter(filterKey)}
                className={`srv-filter-pill ${activeFilter === filterKey ? 'srv-filter-pill--active' : ''}`}
              >
                {filterKey === 'all' ? 'All' : filterKey.toUpperCase()}
              </button>
            ))}
          </div>

          {/* ── Service Categories & Cards ── */}
          {filteredGroups.map((group) => (
            <div key={group.category} className="srv-group">
              <div className="srv-group-header">
                <h2 className="srv-group-title">{group.categoryTitle}</h2>
                <p className="srv-group-sub">{group.categorySub}</p>
              </div>

              <div className="srv-grid">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.id} className="srv-card">
                      <div className="srv-card__visual">{item.renderVisual()}</div>

                      <div className="srv-card__body">
                        <div className="srv-card__header">
                          <Icon className="srv-card__icon" />
                          <h3 className="srv-card__title">{item.title}</h3>
                        </div>

                        <p className="srv-card__desc">{item.desc}</p>

                        <div className="srv-card__meta">
                          <span className="srv-card__price">{item.price}</span>
                          {item.timeline && (
                            <span className="srv-card__time">{item.timeline}</span>
                          )}
                        </div>

                        {item.hasPaymentLogos && (
                          <div className="srv-card__payments">
                            <span className="srv-pay-pill srv-pay-pill--klarna">Klarna</span>
                            <span className="srv-pay-pill srv-pay-pill--afterpay">afterpay</span>
                            <span className="srv-pay-pill srv-pay-pill--shoppay">Shop Pay</span>
                          </div>
                        )}

                        <a
                          href={item.url}
                          className={`srv-card__btn ${
                            item.isHighlightBtn ? 'srv-card__btn--highlight' : ''
                          }`}
                        >
                          {item.btnText}
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

          {/* ── Custom Quote Intake Banner ── */}
          <div className="srv-intake-banner">
            <h2 className="srv-intake-title">Not sure what you need?</h2>
            <p className="srv-intake-sub">
              Tell us what you&apos;re trying to do. We&apos;ll tell you which package fits — or give
              you a custom quote.
            </p>
            <a href="/requests/services?service=not-sure" className="srv-intake-btn">
              <span>Describe Your Project</span>
              <LuArrowRight />
            </a>
          </div>

          {/* ── FAQ Section ── */}
          <div className="srv-faq-wrap">
            <h2 className="srv-faq-title">Frequently Asked Questions</h2>
            <div className="srv-faq-list">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className={`srv-faq-item ${isOpen ? 'srv-faq-item--open' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="srv-faq-question"
                    >
                      <span className="srv-faq-icon-wrap">
                        <LuCircleHelp className="srv-faq-q-icon" />
                        <span>{faq.q}</span>
                      </span>
                      <LuChevronDown className="srv-faq-toggle" />
                    </button>
                    {isOpen && <div className="srv-faq-answer">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Global Footer ── */}
      <Footer />
    </div>
  );
};

export default ServicesPage;
