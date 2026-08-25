import './EverythingInOneSection.css';
import { useEffect, useRef } from 'react';

/* ── SVG arrows provided by user (Exact Unchanged SVGs) ── */
const ArrowDown = () => (
  <svg
    className="eiop__arrow-down"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 20 C 40 20, 60 60, 90 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M75 45 L90 60 L75 75" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const ArrowCurveRight = () => (
  <svg
    className="eiop__arrow-curve-left"
    viewBox="0 0 100 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 85 10 C 105 100, 95 160, 45 180 L 60 170 L 25 183 L 55 197 L 52 185 C 100 165, 110 100, 85 10 Z"
      fill="currentColor"
    />
  </svg>
);

const ArrowCurveLeft = () => (
  <svg
    className="eiop__arrow-curve-right"
    viewBox="0 0 100 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M90,10 C115,100 95,170 35,185 L52,172 L18,188 L48,205 L44,192 C100,175 125,100 90,10 Z"
      fill="currentColor"
    />
  </svg>
);

const EverythingInOneSection = () => {
  const sectionRef = useRef(null);

  /* Floating animation on the 3D box */
  useEffect(() => {
    const box = sectionRef.current?.querySelector('.eiop__box-img');
    if (!box) return;
    let frame;
    let t = 0;
    const tick = () => {
      t += 0.015;
      box.style.transform = `translateY(${Math.sin(t) * 10}px) rotate(${Math.sin(t * 0.6) * 1.2}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="everything-package" className="eiop-section" ref={sectionRef}>
      {/* ── Ambient Background Glow & Streaks ── */}
      <div className="eiop__backdrop" aria-hidden="true">
        <div className="eiop__glow-orb" />
      </div>

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
            <span>ALL-IN-ONE BUNDLE</span>
          </div>
          <h2 className="eiop__title">
            Everything In <em>One Package.</em>
          </h2>
          <p className="eiop__sub">
            Starting out? Scaling up? Going all in? Get every premium theme and all lifetime updates in one complete bundle.
          </p>
        </div>

        {/* ── Main layout: left callout · card · right callout ── */}
        <div className="eiop__layout reveal">

          {/* Left callout */}
          <div className="eiop__callout eiop__callout--left">
            <div className="eiop__callout-content">
              <p className="eiop__callout-text">
                Providing a <strong>hundredfold more value</strong> than any alternative package offered.
              </p>
            </div>
            <ArrowCurveLeft />
          </div>

          {/* Centre column: top-callout + card */}
          <div className="eiop__center">
            <div className="eiop__top-callout">
              <p className="eiop__callout-text eiop__callout-text--top">
                <strong>100X the value</strong> of any other package.
              </p>
              <ArrowDown />
            </div>

            {/* Product card */}
            <div className="eiop__card">
              <div className="eiop__card-ribbon">
                <span>SAVE 80%</span>
              </div>

              <div className="eiop__card-img-wrap">
                <div className="eiop__card-glow" />
                <img
                  src="/everythinginonepage/FC6750AB-9ABC-4D70-BDB8-4E357A3E70E0.webp"
                  alt="Elite Theme Package box"
                  className="eiop__box-img"
                />
              </div>

              <div className="eiop__card-body">
                <div className="eiop__card-meta">
                  <h3 className="eiop__card-name">Elite Theme Package</h3>
                  <div className="eiop__price-wrap">
                    <span className="eiop__price-old">$249</span>
                    <span className="eiop__card-price">$49.99</span>
                  </div>
                </div>

                <p className="eiop__card-desc">
                  Premium Shopify & Web themes suite built for high-growth modern brands.
                </p>

                {/* Feature Tags */}
                <div className="eiop__features-tags">
                  <span className="eiop__tag">✓ All Themes Included</span>
                  <span className="eiop__tag">✓ Lifetime Updates</span>
                  <span className="eiop__tag">✓ Full Source Files</span>
                  <span className="eiop__tag">✓ 24/7 Priority Support</span>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  className="eiop__btn"
                  onClick={() => {
                    const el = document.getElementById('themes');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Complete Access
                  <span className="eiop__btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right callout */}
          <div className="eiop__callout eiop__callout--right">
            <div className="eiop__callout-content">
              <p className="eiop__callout-text">
                Outperforming <strong>every rival package</strong> with one hundred times the value.
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
