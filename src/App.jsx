import { useEffect } from 'react';
import Header from './Layout/Header.jsx';
import Box from './Component/Box.jsx';
import WhichOneSection from './Component/WhichOneSection.jsx';
import PickYourThemeSection from './Component/PickYourThemeSection.jsx';
import GlobeSection from './Component/GlobeSection.jsx';
import CursorGlowTrail from './Component/CursorGlowTrail.jsx';
import TestimonialsSection from './Component/TestimonialsSection.jsx';
import EverythingInOneSection from './Component/EverythingInOneSection.jsx';
import SameThemeSection from './Component/SameThemeSection.jsx';
import './App.css';

// Floating store preview cards data
const STORE_CARDS = [
  { id: 1, cls: 'store-card--1', name: 'STRYDE', badge: 'Bolt', img: '/images/justdrop5-optimized.avif' },
  { id: 2, cls: 'store-card--2', name: 'ITALYA', badge: 'Bolt', img: '/images/justdrop2-optimized.avif' },
  { id: 3, cls: 'store-card--3', name: 'HELIX', badge: 'Apex', img: '/images/justdrop3-optimized.avif' },
  { id: 4, cls: 'store-card--4', name: 'NOMAD', badge: 'Apex', img: '/images/justdrop7-optimized.avif' },
  { id: 5, cls: 'store-card--5', name: 'VORA', badge: 'Circuit', img: '/images/justdrop4-optimized.avif' },
  { id: 6, cls: 'store-card--6', name: 'KOVA', badge: 'Circuit', img: '/images/justdrop8-optimized.avif' },
];

// Intersection observer for scroll-reveal
function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const App = () => {
  useReveal();

  return (
    <div className="app">
      {/* ── Cursor glow trail — fixed canvas, pointer-events: none ── */}
      <CursorGlowTrail />

      {/* ── Sticky Header ── */}
      <Header />

      {/* ── Hero ── */}
      <section className="hero">
        {/* 3-D canvas fills the whole hero */}
        <Box />

        {/* Floating store preview cards */}
        <div className="hero__cards" aria-hidden="true">
          {STORE_CARDS.map((card) => (
            <div
              key={card.id}
              className={`store-card-wrap store-card-wrap--${card.id}`}
            >
              <div className="store-card">
                <img
                  src={card.img}
                  alt={card.name}
                  style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block', borderRadius: 0 }}
                />
                {/* Name overlaid at the bottom of the image */}
                <span className="store-card__caption">{card.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Hero copy & CTAs */}
        <div className="hero__content">
          <span className="hero__eyebrow">Shopify Themes ✦ Activewear</span>

          <h1 className="hero__title">
            Shopify Themes for<br />
            <em>Activewear Brands</em>
          </h1>

          <p className="hero__sub">
            Your store should look as expensive as your product.
            One payment, no code — most brands are live the same afternoon.
          </p>

          <div className="hero__ctas">
            <button id="cta-pick-theme" className="btn-primary">
              Pick Your Theme 🛍
            </button>
            <button id="cta-live-demos" className="btn-secondary">
              See Live Demos →
            </button>
          </div>
        </div>
      </section>

      {/* ── Globe ── */}
      <GlobeSection />

      {/* ── Which One Are You ── */}
      <WhichOneSection />

      <div className="divider" />

      {/* ── Pick Your Theme ── */}
      <PickYourThemeSection />

      {/* ── Everything In One Package ── */}
      <EverythingInOneSection />

      {/* ── Reviews / Testimonials ── */}
      <TestimonialsSection />

      {/* ── Same Theme. More to Build With. ── */}
      <SameThemeSection />

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer__brand">OpenSpaces</div>
        <div className="footer__links">
          <a href="#">Themes</a>
          <a href="#">Demos</a>
          <a href="#">Support</a>
          <a href="#">License</a>
        </div>
        <p className="footer__copy">© 2026 OpenSpaces. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
