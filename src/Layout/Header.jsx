import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import {
  LuHouse,
  LuPanelsTopLeft,
  LuShirt,
  LuWrench,
  LuBlocks,
  LuGraduationCap,
  LuMessageCircle,
  LuChevronDown,
  LuTv,
  LuScale,
  LuRocket,
  LuBuilding2,
  LuCrown,
  LuBookOpen,
  LuCode,
  LuFileText,
} from 'react-icons/lu';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';

const NAV_LINKS = [
  { id: 'nav-home', label: 'Home', icon: LuHouse, target: '#home', color: 'blue' },
  {
    id: 'nav-themes',
    label: 'Themes',
    icon: LuPanelsTopLeft,
    target: '#pick-theme',
    color: 'green',
    dropdown: [
      {
        title: 'Demos',
        subtitle: '16 concept stores, live',
        icon: LuTv,
        route: '/themes/demos',
      },
      {
        title: 'Compare',
        subtitle: 'Every feature, side by side',
        icon: LuScale,
        route: '/compare',
      },
    ],
  },
  {
    id: 'nav-built-for',
    label: 'Built for',
    icon: LuShirt,
    target: '#which-one',
    color: 'yellow',
    dropdown: [
      {
        title: 'Startups',
        subtitle: 'Launch fast with lean speed',
        icon: LuRocket,
        target: '#which-one',
      },
      {
        title: 'Agencies',
        subtitle: 'Client-ready storefront packages',
        icon: LuBuilding2,
        target: '#which-one',
      },
      {
        title: 'Enterprise',
        subtitle: 'Custom drop systems at scale',
        icon: LuCrown,
        target: '#which-one',
      },
    ],
  },
  { id: 'nav-services', label: 'Services', icon: LuWrench, route: '/services', color: 'sky' },
  { id: 'nav-addons', label: 'Add-Ons', icon: LuBlocks, route: '/add-ons', color: 'purple' },
  {
    id: 'nav-learn',
    label: 'Learn',
    icon: LuGraduationCap,
    route: '/learn',
    color: 'red',
    dropdown: [
      {
        title: 'Blog',
        subtitle: 'OpenSpaces news, tips\nand guides',
        icon: LuBookOpen,
        route: '/blog',
      },
      {
        title: 'Docs & Tutorials',
        subtitle: 'Learn how to use\nPlain Jane',
        icon: LuFileText,
        route: '/docs',
      },
    ],
  },
  { id: 'nav-support', label: 'Live Support', icon: LuMessageCircle, target: '#testimonials', color: 'orange' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('nav-home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const headerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* Scroll-based background + active nav tracking */
  useEffect(() => {
    if (
      location.pathname.startsWith('/themes/demos') ||
      location.pathname.startsWith('/demos') ||
      location.pathname.startsWith('/compare')
    ) {
      setActive('nav-themes');
      const onDemoScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', onDemoScroll, { passive: true });
      return () => window.removeEventListener('scroll', onDemoScroll);
    }

    if (
      location.pathname.startsWith('/services') ||
      location.pathname.startsWith('/collections/services')
    ) {
      setActive('nav-services');
      const onServiceScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', onServiceScroll, { passive: true });
      return () => window.removeEventListener('scroll', onServiceScroll);
    }

    if (
      location.pathname.startsWith('/add-ons') ||
      location.pathname.startsWith('/addons') ||
      location.pathname.startsWith('/collections/ai-tools-prompts') ||
      location.pathname.startsWith('/collections/sections') ||
      location.pathname.startsWith('/collections/e-books')
    ) {
      setActive('nav-addons');
      const onAddonsScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', onAddonsScroll, { passive: true });
      return () => window.removeEventListener('scroll', onAddonsScroll);
    }

    if (
      location.pathname.startsWith('/learn') ||
      location.pathname.startsWith('/docs') ||
      location.pathname.startsWith('/blog')
    ) {
      setActive('nav-learn');
      const onLearnScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener('scroll', onLearnScroll, { passive: true });
      return () => window.removeEventListener('scroll', onLearnScroll);
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      for (const link of NAV_LINKS) {
        if (!link.target) continue;
        const el = document.querySelector(link.target);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= 140 && bottom > 0) {
          setActive(link.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  /* Close menu / dropdown on outside click */
  useEffect(() => {
    if (!menuOpen && !openDropdown) return;
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen, openDropdown]);

  const handleBrandClick = () => {
    setOpenDropdown(null);
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (link) => {
    if (link.dropdown) {
      setOpenDropdown((cur) => (cur === link.id ? null : link.id));
    } else {
      setOpenDropdown(null);
      setMenuOpen(false);
      if (link.route) {
        navigate(link.route);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (link.target) {
        if (location.pathname !== '/') {
          navigate('/');
          if (link.target !== '#home') {
            setTimeout(() => {
              const el = document.querySelector(link.target);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          if (link.target === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.querySelector(link.target);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }
  };

  const handleDropdownItemClick = (item, parentLink) => {
    setOpenDropdown(null);
    setMenuOpen(false);
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.route) {
      navigate(item.route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (item.target || parentLink.target) {
      const target = item.target || parentLink.target;
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
    >
      {/* Brand */}
      <div className="header__brand" onClick={handleBrandClick}>
        OPENSPACES
      </div>

      {/* Desktop Nav pill */}
      <nav className="header__nav" aria-label="Main navigation">
        {NAV_LINKS.map((link) => {
          const Icon = link.icon;
          const isOpen = openDropdown === link.id;
          const isActive = active === link.id;

          return (
            <div key={link.id} className="header__nav-item">
              <button
                id={link.id}
                className={`header__nav-btn header__nav-btn--${link.color} ${
                  isActive ? 'header__nav-btn--active' : ''
                } ${isOpen ? 'header__nav-btn--open' : ''}`}
                onClick={() => handleNavClick(link)}
                aria-expanded={isOpen}
              >
                {/* Ambient Top Light Beam */}
                <div className="header__nav-spotlight" />

                <div className="header__nav-content">
                  <Icon className="header__nav-icon" />
                  <span className="header__nav-text">{link.label}</span>
                  {link.dropdown && (
                    <LuChevronDown
                      className={`header__nav-chevron ${isOpen ? 'header__nav-chevron--open' : ''}`}
                    />
                  )}
                </div>
              </button>

              {link.dropdown && isOpen && (
                <div className="header__dropdown" role="menu">
                  {link.dropdown.map((item) => {
                    const DropIcon = item.icon;
                    return (
                      <button
                        key={item.title}
                        className="header__dropdown-item"
                        onClick={() => handleDropdownItemClick(item, link)}
                      >
                        {DropIcon && (
                          <div className="header__dropdown-item-icon">
                            <DropIcon />
                          </div>
                        )}
                        <div className="header__dropdown-item-content">
                          <div className="header__dropdown-item-title">{item.title}</div>
                          {item.subtitle && (
                            <div className="header__dropdown-item-sub">{item.subtitle}</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="header__actions">
        <button
          id="header-cart"
          className="header__icon-btn"
          aria-label="Cart"
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
              setTimeout(() => {
                const el = document.getElementById('everything-package');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              const el = document.getElementById('everything-package');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
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
              onClick={() => handleNavClick(link)}
            >
              {link.label}
            </button>
          ))}
          <div className="header__mobile-divider" />
          <button
            className="header__mobile-cta"
            onClick={() => {
              setMenuOpen(false);
              navigate('/themes/demos');
            }}
          >
            Browse Demos →
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;