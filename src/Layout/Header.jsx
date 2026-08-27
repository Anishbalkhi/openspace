import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../components/Cart/CartContext';
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
  LuFileText,
} from 'react-icons/lu';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import './Header.css';

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
        title: 'Streetwear',
        subtitle: 'Drops, restocks, sold-out states',
        target: '#which-one',
      },
      {
        title: 'Activewear',
        subtitle: 'Fabric, fit and colorways',
        target: '#which-one',
      },
      {
        title: 'Fashion',
        subtitle: 'Editorial imagery, quiet type',
        target: '#which-one',
      },
      {
        title: 'Jewelry & Accessories',
        subtitle: 'Macro detail, materials, scale',
        target: '#which-one',
      },
      {
        title: 'Swimwear',
        subtitle: 'Location-led, seasonal drops',
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
  const [scrollActive, setScrollActive] = useState('nav-home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileSubOpen, setMobileSubOpen] = useState({});
  const headerRef = useRef(null);
  const { toggleCart, totalQty } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  // Derive route-based active nav
  const getRouteActive = (pathname) => {
    if (
      pathname.startsWith('/themes/demos') ||
      pathname.startsWith('/demos') ||
      pathname.startsWith('/compare')
    ) {
      return 'nav-themes';
    }
    if (
      pathname.startsWith('/services') ||
      pathname.startsWith('/collections/services')
    ) {
      return 'nav-services';
    }
    if (
      pathname.startsWith('/add-ons') ||
      pathname.startsWith('/addons') ||
      pathname.startsWith('/collections/ai-tools-prompts') ||
      pathname.startsWith('/collections/sections') ||
      pathname.startsWith('/collections/e-books')
    ) {
      return 'nav-addons';
    }
    if (
      pathname.startsWith('/learn') ||
      pathname.startsWith('/docs') ||
      pathname.startsWith('/blog')
    ) {
      return 'nav-learn';
    }
    return null;
  };

  const routeActive = getRouteActive(location.pathname);
  const active = routeActive || scrollActive;

  /* Scroll-based background + active nav tracking */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!routeActive) {
        for (const link of NAV_LINKS) {
          if (!link.target) continue;
          const el = document.querySelector(link.target);
          if (!el) continue;
          const { top, bottom } = el.getBoundingClientRect();
          if (top <= 140 && bottom > 0) {
            setScrollActive(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [routeActive]);

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

  /* Automatically reset mobile menu when resizing to desktop or on route change */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) {
        setMenuOpen(false);
        setMobileSubOpen({});
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileSubOpen({});
  }, [location.pathname]);

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
    if (link.id === 'nav-support') {
      setOpenDropdown(null);
      setMenuOpen(false);
      window.dispatchEvent(new CustomEvent('open-live-support'));
      return;
    }

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
          className="header__icon-btn header__cart-btn"
          aria-label={`Cart${totalQty > 0 ? `, ${totalQty} items` : ''}`}
          onClick={toggleCart}
          style={{ position: 'relative' }}
        >
          <IoCartOutline />
          {totalQty > 0 && (
            <span className="header__cart-badge">{totalQty}</span>
          )}
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
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const hasSub = link.dropdown && link.dropdown.length > 0;
            const isSubOpen = !!mobileSubOpen[link.id];

            return (
              <div key={link.id} className="header__mobile-item">
                <button
                  className={`header__mobile-link header__mobile-link--${link.color} ${
                    active === link.id ? 'header__mobile-link--active' : ''
                  }`}
                  onClick={() => {
                    if (hasSub) {
                      setMobileSubOpen((prev) => ({ ...prev, [link.id]: !prev[link.id] }));
                    } else {
                      handleNavClick(link);
                    }
                  }}
                >
                  <div className="header__mobile-link-inner">
                    <Icon className="header__mobile-link-icon" />
                    <span>{link.label}</span>
                  </div>
                  {hasSub && (
                    <LuChevronDown
                      className={`header__nav-chevron ${isSubOpen ? 'header__nav-chevron--open' : ''}`}
                    />
                  )}
                </button>

                {hasSub && isSubOpen && (
                  <div className="header__mobile-sublist">
                    {link.dropdown.map((sub) => {
                      const SubIcon = sub.icon;
                      return (
                        <button
                          key={sub.title}
                          className="header__mobile-subitem"
                          onClick={() => handleDropdownItemClick(sub, link)}
                        >
                          {SubIcon && <SubIcon className="text-white/40" />}
                          <span>{sub.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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