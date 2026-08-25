import React, { useEffect, useRef, useState } from 'react';
import './EverythingInOneSection.css';

/* ── Refined SVG Hand-Drawn / Dynamic Callout Arrows ── */
const ArrowDown = () => (
  <svg
    className="eiop__arrow-down"
    viewBox="0 0 80 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Dynamic curving downward arrow */}
    <path
      d="M40 10 C38 35, 46 55, 40 74"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M26 62 L40 76 L52 60"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowCurveLeft = () => (
  <svg
    className="eiop__arrow-curve eiop__arrow-curve--left"
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Swoop from top-left curving down-right towards the package */}
    <path
      d="M20 30 C 85 20, 135 60, 125 125"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M108 112 L 126 127 L 138 106"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowCurveRight = () => (
  <svg
    className="eiop__arrow-curve eiop__arrow-curve--right"
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Swoop from top-right curving down-left towards the package */}
    <path
      d="M130 30 C 65 20, 15 60, 25 125"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M42 112 L 24 127 L 12 106"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EverythingInOneSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  /* Floating animation when not hovered */
  useEffect(() => {
    const box = cardRef.current?.querySelector('.eiop__box-img');
    if (!box) return;

    let frameId;
    let t = 0;

    const animate = () => {
      if (!isHovered) {
        t += 0.02;
        const yOffset = Math.sin(t) * 12;
        const rOffset = Math.sin(t * 0.7) * 1.5;
        box.style.transform = `translateY(${yOffset}px) rotate(${rOffset}deg)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered]);

  /* 3D mouse parallax effect over card */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
  };

  return (
    <section id="everything-package" className="eiop-section" ref={sectionRef}>
      {/* ── Ambient Background Aura & Glow Elements ── */}
      <div className="eiop__backdrop" aria-hidden="true">
        <div className="eiop__glow-orb eiop__glow-orb--center" />
        <div className="eiop__glow-orb eiop__glow-orb--left" />
        <div className="eiop__glow-orb eiop__glow-orb--right" />
        <div className="eiop__grid-pattern" />
      </div>

      {/* ── Animated Streaks ── */}
      <div className="eiop__streaks" aria-hidden="true">
        <div className="eiop__streak eiop__streak--1" />
        <div className="eiop__streak eiop__streak--2" />
        <div className="eiop__streak eiop__streak--3" />
      </div>

      <div className="eiop__container">
        {/* ── Header ── */}
        <div className="eiop__header reveal">
          <div className="eiop__badge">
            <span className="eiop__badge-dot" />
            <span className="eiop__badge-text">ALL-IN-ONE BUNDLE</span>
          </div>
          <h2 className="eiop__title">
            Everything In <em>One Package.</em>
          </h2>
          <p className="eiop__sub">
            Starting out? Scaling up? Going all in? Get every premium theme, design asset, and lifetime update in a single master bundle.
          </p>
        </div>

        {/* ── Main Interactive Layout ── */}
        <div className="eiop__layout reveal">
          {/* Left Callout Annotation */}
          <div className="eiop__callout eiop__callout--left">
            <div className="eiop__callout-bubble">
              <span className="eiop__callout-tag">Maximum ROI</span>
              <p className="eiop__callout-text">
                Providing a <strong>hundredfold more value</strong> than any alternative package offered.
              </p>
            </div>
            <ArrowCurveLeft />
          </div>

          {/* Center Column: Top Annotation + Product Card */}
          <div className="eiop__center">
            <div className="eiop__top-callout">
              <div className="eiop__callout-bubble eiop__callout-bubble--top">
                <span className="eiop__callout-sparkle">✦</span>
                <p className="eiop__callout-text eiop__callout-text--top">
                  <strong>100X the value</strong> of any individual pack.
                </p>
              </div>
              <ArrowDown />
            </div>

            {/* Product Master Card */}
            <div
              className="eiop__card"
              ref={cardRef}
              style={tiltStyle}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Card Corner Highlight Accent */}
              <div className="eiop__card-shine" />

              {/* Tag / Ribbon */}
              <div className="eiop__card-ribbon">
                <span className="eiop__ribbon-text">BESTSELLER • SAVE 80%</span>
              </div>

              {/* 3D Box Showcase Canvas */}
              <div className="eiop__card-img-wrap">
                <div className="eiop__box-glow" />
                <img
                  src="/everythinginonepage/FC6750AB-9ABC-4D70-BDB8-4E357A3E70E0.webp"
                  alt="Elite Theme Package Box"
                  className="eiop__box-img"
                  loading="lazy"
                />
                <div className="eiop__box-shadow" />
              </div>

              {/* Card Body */}
              <div className="eiop__card-body">
                <div className="eiop__card-header-row">
                  <div>
                    <h3 className="eiop__card-name">Elite Theme Package</h3>
                    <p className="eiop__card-tagline">Complete Modern E-Commerce Suite</p>
                  </div>
                  <div className="eiop__price-wrap">
                    <span className="eiop__price-old">$249</span>
                    <span className="eiop__price-current">$49.99</span>
                  </div>
                </div>

                <p className="eiop__card-desc">
                  Unlock all 8+ flagship themes with production-ready Shopify code, React templates, Figma components, and lifetime priority updates.
                </p>

                {/* Feature Checklist */}
                <div className="eiop__features-grid">
                  <div className="eiop__feature-item">
                    <span className="eiop__feature-icon">✓</span>
                    <span>All 8+ Flagship Themes</span>
                  </div>
                  <div className="eiop__feature-item">
                    <span className="eiop__feature-icon">✓</span>
                    <span>Lifetime Free Updates</span>
                  </div>
                  <div className="eiop__feature-item">
                    <span className="eiop__feature-icon">✓</span>
                    <span>Figma + React + Shopify</span>
                  </div>
                  <div className="eiop__feature-item">
                    <span className="eiop__feature-icon">✓</span>
                    <span>Priority 1-on-1 Support</span>
                  </div>
                </div>

                {/* CTA Action */}
                <button
                  type="button"
                  className="eiop__cta-btn"
                  onClick={() => {
                    const themes = document.getElementById('themes');
                    if (themes) themes.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Unlock Elite Package Now</span>
                  <svg
                    className="eiop__cta-arrow"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                {/* Micro guarantees */}
                <div className="eiop__guarantee-row">
                  <span>⚡ Instant Access</span>
                  <span className="eiop__guarantee-sep">•</span>
                  <span>🔒 14-Day Money Back</span>
                  <span className="eiop__guarantee-sep">•</span>
                  <span>Commercial License</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Callout Annotation */}
          <div className="eiop__callout eiop__callout--right">
            <div className="eiop__callout-bubble">
              <span className="eiop__callout-tag">Unrivaled Power</span>
              <p className="eiop__callout-text">
                Outperforming <strong>every rival package</strong> with unparalleled design quality.
              </p>
            </div>
            <ArrowCurveRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EverythingInOneSection;
