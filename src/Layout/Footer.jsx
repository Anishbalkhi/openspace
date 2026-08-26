import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (path.startsWith('#')) {
      const el = document.querySelector(path);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else navigate('/');
    } else if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__glow" />

      <div className="footer__container">
        {/* Left Brand Column */}
        <div className="footer__brand-col">
          <div className="footer__logo" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            OPENSPACES
          </div>
          <p className="footer__tagline">
            Premium Shopify themes and design services for creative brands.
          </p>

          {/* Social Icons */}
          <div className="footer__socials">
            <a
              href="https://www.instagram.com/openspaces.io"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@openspaces_io"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-icon"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>

          {/* Copyright */}
          <div className="footer__copyright">
            ® © 2025 OpenSpaces. All rights reserved.
          </div>
        </div>

        {/* Right Columns Grid */}
        <div className="footer__nav-grid">
          {/* Col 1: SHOP & NAVIGATION */}
          <div className="footer__nav-col">
            <div className="footer__section">
              <h4 className="footer__heading">SHOP</h4>
              <ul className="footer__list">
                <li>
                  <a href="#pick-theme" onClick={(e) => handleLinkClick(e, '#pick-theme')}>
                    Shop
                  </a>
                </li>
                <li>
                  <a href="/blog" onClick={(e) => handleLinkClick(e, '/blog')}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#testimonials" onClick={(e) => handleLinkClick(e, '#testimonials')}>
                    Live Support
                  </a>
                </li>
                <li>
                  <a href="/docs" onClick={(e) => handleLinkClick(e, '/docs')}>
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__section footer__section--nav">
              <h4 className="footer__heading">NAVIGATION</h4>
              <ul className="footer__list">
                <li>
                  <button className="footer__back-to-top" onClick={scrollToTop}>
                    Back to top
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 2: SERVICES */}
          <div className="footer__nav-col">
            <div className="footer__section">
              <h4 className="footer__heading">SERVICES</h4>
              <ul className="footer__list">
                <li>
                  <a href="/services" onClick={(e) => handleLinkClick(e, '/services')}>
                    Quick Task
                  </a>
                </li>
                <li>
                  <a href="/services" onClick={(e) => handleLinkClick(e, '/services')}>
                    Project
                  </a>
                </li>
                <li>
                  <a href="/services" onClick={(e) => handleLinkClick(e, '/services')}>
                    Full Theme Setup
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: LICENSE */}
          <div className="footer__nav-col">
            <div className="footer__section">
              <h4 className="footer__heading">LICENSE</h4>
              <ul className="footer__list">
                <li>
                  <a href="/services" onClick={(e) => handleLinkClick(e, '/services')}>
                    Activate License
                  </a>
                </li>
                <li>
                  <a href="/services" onClick={(e) => handleLinkClick(e, '/services')}>
                    Update License
                  </a>
                </li>
                <li>
                  <a href="/services" onClick={(e) => handleLinkClick(e, '/services')}>
                    Get Theme Update
                  </a>
                </li>
                <li>
                  <a href="/services" onClick={(e) => handleLinkClick(e, '/services')}>
                    Partner Program
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: POLICIES */}
          <div className="footer__nav-col">
            <div className="footer__section">
              <h4 className="footer__heading">POLICIES</h4>
              <ul className="footer__list">
                <li>
                  <a href="/docs" onClick={(e) => handleLinkClick(e, '/docs')}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/docs" onClick={(e) => handleLinkClick(e, '/docs')}>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/docs" onClick={(e) => handleLinkClick(e, '/docs')}>
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

