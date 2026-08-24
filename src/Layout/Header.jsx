import { useState, useEffect } from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { RxHamburgerMenu } from 'react-icons/rx';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      {/* Brand */}
      <div className="header__brand">OpenSpaces</div>

      {/* Nav pill */}
      <nav className="header__nav" aria-label="Main navigation">
        <button id="nav-themes" className="header__nav-btn header__nav-btn--active">
          Themes
        </button>
        <button id="nav-features" className="header__nav-btn">
          Features
        </button>
        <button id="nav-demos" className="header__nav-btn">
          Live Demos
        </button>
        <button id="nav-pricing" className="header__nav-btn">
          Pricing
        </button>
      </nav>

      {/* Actions */}
      <div className="header__actions">
        <button id="header-sparkles" className="header__icon-btn" aria-label="Highlights">
          <HiOutlineSparkles />
        </button>
        <button id="header-cart" className="header__icon-btn" aria-label="Cart">
          <IoCartOutline />
        </button>
        <button id="header-menu" className="header__icon-btn" aria-label="Menu" style={{ display: 'none' }}>
          <RxHamburgerMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;