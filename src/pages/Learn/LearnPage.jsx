import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LuSearch,
  LuGlobe,
  LuChevronRight,
  LuArrowUpRight,
  LuLayers,
} from 'react-icons/lu';
import './LearnPage.css';

const SIDEBAR_SECTIONS = [
  {
    id: 'intro',
    title: 'Introduction',
    items: [],
  },
  {
    id: 'plain-jane',
    title: 'Plain Jane',
    items: ['Overview', 'Header & Mega Menu', 'Lookbook Lineup', 'Product Grid', 'Cart Drawer'],
  },
  {
    id: 'plain-jane-interactive',
    title: 'Plain Jane Interactive',
    items: ['3D WebGL Holograms', 'Motion Physics', 'Custom Cursors', 'Audio Drop FX'],
  },
  {
    id: 'plain-jane-starter',
    title: 'Plain Jane Starter',
    items: ['Lean Architecture', 'Speed Optimization', 'Essential Presets'],
  },
];

const LearnPage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [expandedSections, setExpandedSections] = useState({
    'plain-jane': false,
    'plain-jane-interactive': false,
    'plain-jane-starter': false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectSection = (id) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="docs-page">
      {/* ── Top Docs Sub-Header Bar ── */}
      <div className="docs-header">
        <div className="docs-header__brand" onClick={() => navigate('/')}>
          OPENSPACES
        </div>

        {/* Center Search */}
        <div className="docs-header__search">
          <LuSearch className="docs-header__search-icon" />
          <input
            type="text"
            placeholder="Ask or search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="docs-header__search-input"
          />
          <span className="docs-header__search-kbd">Ctrl K</span>
        </div>

        {/* Language Selector */}
        <button className="docs-header__lang" aria-label="Language selector">
          <LuGlobe />
          <span>English</span>
        </button>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="docs-body">
        {/* Left Sidebar Navigation */}
        <aside className="docs-sidebar">
          <div className="docs-sidebar__nav">
            {SIDEBAR_SECTIONS.map((sec) => {
              const isSelected = activeSection === sec.id;
              const hasSubitems = sec.items.length > 0;
              const isExpanded = !!expandedSections[sec.id];

              return (
                <div key={sec.id} className="docs-sidebar__group">
                  <button
                    className={`docs-sidebar__item ${
                      isSelected ? 'docs-sidebar__item--active' : ''
                    }`}
                    onClick={() => {
                      selectSection(sec.id);
                      if (hasSubitems) toggleSection(sec.id);
                    }}
                  >
                    <span>{sec.title}</span>
                    {hasSubitems && (
                      <LuChevronRight
                        className={`docs-sidebar__chevron ${
                          isExpanded ? 'docs-sidebar__chevron--open' : ''
                        }`}
                      />
                    )}
                  </button>

                  {hasSubitems && isExpanded && (
                    <div className="docs-sidebar__subitems">
                      {sec.items.map((item) => (
                        <button
                          key={item}
                          className="docs-sidebar__subitem"
                          onClick={() => selectSection(sec.id)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* GitBook attribution */}
          <div className="docs-sidebar__footer">
            <a
              href="https://docs.openspaces.design"
              target="_blank"
              rel="noopener noreferrer"
              className="docs-sidebar__gitbook"
            >
              <LuLayers />
              <span>Powered by GitBook</span>
            </a>
          </div>
        </aside>

        {/* Right Article Main Content */}
        <main className="docs-main">
          {/* Main Title */}
          <h1 className="docs-title">
            {activeSection === 'intro' && 'Welcome to the official OpenSpaces Themes Documentation'}
            {activeSection === 'plain-jane' && 'Plain Jane Theme Guide & Setup'}
            {activeSection === 'plain-jane-interactive' && 'Plain Jane Interactive: 3D Holograms & Canvas'}
            {activeSection === 'plain-jane-starter' && 'Plain Jane Starter: Lean Core Edition'}
          </h1>

          {/* Callout Quote */}
          <div className="docs-callout">
            <strong>Built for Designers, By Designers</strong> Get the most out of your
            OpenSpaces Shopify theme with our complete setup guides, feature breakdowns, and best practices.
          </div>

          {/* ── Modern Tablet Frame Mockup ── */}
          <div className="docs-mockup">
            <div className="docs-mockup__camera" />
            <img
              src={
                activeSection === 'plain-jane-starter'
                  ? '/demos/ald-hero.webp'
                  : activeSection === 'plain-jane-interactive'
                  ? '/demos/yzy-hero.webp'
                  : '/demos/entire-studios-hero.webp'
              }
              alt="OpenSpaces Theme Preview"
              className="docs-mockup__img"
            />
          </div>

          {/* ── What You'll Find Here ── */}
          <section className="docs-section">
            <h2 className="docs-section__heading">What You’ll Find Here</h2>
            <p className="docs-section__text">
              Whether you’re using <strong>Plain Jane Starter</strong>,{' '}
              <strong>Plain Jane</strong>, or <strong>Plain Jane Interactive</strong>,
              this documentation will walk you through:
            </p>

            <ul className="docs-list">
              <li className="docs-list__item">Theme installation and setup</li>
              <li className="docs-list__item">Customizing sections, fonts, and layouts</li>
              <li className="docs-list__item">
                Adding powerful features like email popups, countdown timers, custom cursors, and more
              </li>
              <li className="docs-list__item">Tips for mobile optimization and conversions</li>
              <li className="docs-list__item">Version-specific feature guides</li>
            </ul>
          </section>

          {/* ── Getting Started ── */}
          <section className="docs-section">
            <h2 className="docs-section__heading">Getting Started</h2>
            <p className="docs-section__text">Not sure where to begin?</p>

            <div className="docs-links-list">
              <button
                className="docs-link-item"
                onClick={() => selectSection('plain-jane-starter')}
              >
                👉 <span>Plain Jane Starter</span>
              </button>
              <button
                className="docs-link-item"
                onClick={() => selectSection('plain-jane')}
              >
                👉 <span>Plain Jane</span>
              </button>
              <button
                className="docs-link-item"
                onClick={() => selectSection('plain-jane-interactive')}
              >
                👉 <span>Plain Jane Interactive</span>
              </button>
            </div>
          </section>

          {/* ── Need Help? ── */}
          <section className="docs-section">
            <h2 className="docs-section__heading">Need Help?</h2>
            <ul className="docs-help-list">
              <li className="docs-help-item">
                💬 <strong>Join our community on Discord:</strong>
                <a
                  href="https://discord.gg/hcc2GvgZc6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://discord.gg/hcc2GvgZc6 <LuArrowUpRight style={{ display: 'inline' }} />
                </a>
              </li>
              <li className="docs-help-item">
                📧 <strong>Email us at:</strong> support@openspaces.design
              </li>
              <li className="docs-help-item">
                💻 <strong>Live chat with us:</strong> Available Monday–Friday, 10AM–6PM EST, directly on our website
              </li>
            </ul>
          </section>

          {/* ── Bottom Next Navigation ── */}
          <div className="docs-next-card">
            <button
              className="docs-next-btn"
              onClick={() => {
                if (activeSection === 'intro') selectSection('plain-jane');
                else if (activeSection === 'plain-jane') selectSection('plain-jane-interactive');
                else if (activeSection === 'plain-jane-interactive') selectSection('plain-jane-starter');
                else selectSection('intro');
              }}
            >
              <div>
                <div className="docs-next-btn__label">Next</div>
                <div className="docs-next-btn__title">
                  {activeSection === 'intro' ? 'Plain Jane' : 'Next Chapter'}
                </div>
              </div>
              <LuChevronRight className="docs-next-btn__icon" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LearnPage;
