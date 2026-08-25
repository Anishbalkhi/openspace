import { useState, useEffect, useRef } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';

const NAV_LINKS = [
  { id: 'nav-themes',   label: 'Themes',    target: '#pick-theme'       },
  { id: 'nav-features', label: 'Features',  target: '#which-one'        },
  { id: 'nav-demos',    label: 'Demos',     target: '#same-theme'       },
  { id: 'nav-pricing',  label: 'Pricing',   target: '#everything-package' },
];

const Header = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState('nav-themes');
  const [menuOpen,  setMenuOpen]  = useState(false);
  const headerRef = useRef(null);

  /* Scroll-based background + active nav tracking */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Highlight nav item whose section is in viewport
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.target);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= 120 && bottom > 0) {
          setActive(link.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const scrollTo = (target) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
    >
      {/* Brand */}
      <div className="header__brand">OpenSpaces</div>

      {/* Desktop Nav pill */}
      <nav className="header__nav" aria-label="Main navigation">
        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            id={link.id}
            className={`header__nav-btn ${active === link.id ? 'header__nav-btn--active' : ''}`}
            onClick={() => scrollTo(link.target)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="header__actions">
        <button id="header-sparkles" className="header__icon-btn" aria-label="Highlights">
          <HiOutlineSparkles />
        </button>
        <button id="header-cart" className="header__icon-btn" aria-label="Cart">
          <IoCartOutline />
        </button>
        {/* Mobile hamburger */}
        <button
          id="header-menu"
          className="header__icon-btn header__hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="header__mobile-menu" role="dialog" aria-modal="true">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={`header__mobile-link ${active === link.id ? 'header__mobile-link--active' : ''}`}
              onClick={() => scrollTo(link.target)}
            >
              {link.label}
            </button>
          ))}
          <div className="header__mobile-divider" />
          <button className="header__mobile-cta" onClick={() => scrollTo('#pick-theme')}>
            Browse Themes →
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;