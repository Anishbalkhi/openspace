import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  WhichOneSection,
  PickYourThemeSection,
  GlobeSection,
  TestimonialsSection,
  EverythingInOneSection,
  SameThemeSection,
} from './components';
import { Footer } from '../../Layout';

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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const HomePage = () => {
  useReveal();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main id="home" className="home-page">
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
            <button
              id="cta-pick-theme"
              className="btn-primary"
              onClick={() => scrollToSection('pick-theme')}
            >
              Pick Your Theme 🛍
            </button>
            <button
              id="cta-live-demos"
              className="btn-secondary"
              onClick={() => navigate('/themes/demos')}
            >
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

      <div className="divider" />

      {/* ── Everything In One Package ── */}
      <EverythingInOneSection />

      <div className="divider" />

      {/* ── Reviews / Testimonials ── */}
      <TestimonialsSection />

      {/* ── Same Theme. More to Build With. ── */}
      <SameThemeSection />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
};

export default HomePage;
