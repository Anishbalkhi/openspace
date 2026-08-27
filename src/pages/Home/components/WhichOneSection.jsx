import { useRef } from 'react';

const CATEGORIES = [
  {
    id: 'streetwear',
    name: 'Streetwear',
    desc: 'Countdowns, restocks and sold-out states that build tension instead of leaking it.',
    tags: ['Graphic tees', 'Cut-and-sew', 'Drops'],
    img: '/whichoneare/streetwear.avif',
  },
  {
    id: 'activewear',
    name: 'Activewear',
    desc: 'Fabric, fit and range shown properly — the things people actually buy on.',
    tags: ['Gymwear', 'Running', 'Athleisure'],
    img: '/whichoneare/activewear.avif',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    desc: 'Full-bleed imagery and quiet type. The restraint that makes a price make sense.',
    tags: ['Boutiques', 'Occasionwear', 'Contemporary'],
    img: '/whichoneare/fashion.avif',
  },
  {
    id: 'accessories',
    name: 'Jewelry & Accessories',
    desc: 'Macro detail, materials and scale that survive being viewed on a phone.',
    tags: ['Fine Jewelry', 'Silver', 'Accessories'],
    img: '/whichoneare/jewelry.avif',
  },
  {
    id: 'swimwear',
    name: 'Swimwear',
    desc: 'Shot in the place it is worn, not flat on a hanger. Seasonal drops built in.',
    tags: ['Swim', 'Resort', 'Beachwear'],
    img: '/whichoneare/swimwear.avif',
  },
];

/** Individual card with 3-D mouse-tracking tilt + glare */
function ThemeCard({ cat, delay }) {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    const rotX =  -y * 14;   // tilt up/down  (max ±14°)
    const rotY =   x * 18;   // tilt left/right (max ±18°)

    card.style.transition = 'none';   // instant during movement
    card.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;
    card.style.boxShadow  = `
      ${rotY * -1.2}px ${rotX * 1.2}px 50px rgba(0,0,0,0.65),
      0 0 0 1px rgba(255,255,255,0.06)
    `;

    // Glare moves with cursor
    const shine = card.querySelector('.whichone-card__shine');
    if (shine) {
      shine.style.opacity = '1';
      shine.style.background = `radial-gradient(
        circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,
        rgba(255,255,255,0.22) 0%,
        rgba(255,255,255,0.04) 35%,
        transparent 65%
      )`;
    }
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.55s cubic-bezier(.03,.98,.52,.99), box-shadow 0.55s ease';
    card.style.transform  = '';
    card.style.boxShadow  = '';
    const shine = card.querySelector('.whichone-card__shine');
    if (shine) shine.style.opacity = '0';
  };

  return (
    <a
      ref={cardRef}
      id={`whichone-${cat.id}`}
      href="#"
      className="whichone-card"
      style={{ transitionDelay: `${delay}s` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      
      <img src={cat.img} alt={cat.name} className="whichone-card__img" loading="lazy" decoding="async" />
      <div className="whichone-card__overlay" />
      {/* Glare layer */}
      <div className="whichone-card__shine" />
      <div className="whichone-card__body">
        <div className="whichone-card__top">
          <span className="whichone-card__name">{cat.name}</span>
          <span className="whichone-card__arrow">→</span>
        </div>
        <p className="whichone-card__desc">{cat.desc}</p>
        <div className="whichone-card__tags">
          {cat.tags.map((tag) => (
            <span key={tag} className="whichone-tag">{tag}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

const WhichOneSection = () => (
  <section id="which-one" className="whichone-section">
    <div className="whichone__header">
      <h2 className="whichone__title">Which one are you?</h2>
      <p className="whichone__sub">
        The same three themes run all five. What changes is the demo you start
        from and the tools you lean on — drop timers for a release, a lookbook
        for a collection.
      </p>
    </div>

    <div className="whichone-grid">
      {/* Row 1: 3 cards */}
      <div className="whichone-row">
        {CATEGORIES.slice(0, 3).map((cat, i) => (
          <ThemeCard key={cat.id} cat={cat} delay={i * 0.07} />
        ))}
      </div>
      {/* Row 2: 2 cards centred */}
      <div className="whichone-row">
        {CATEGORIES.slice(3).map((cat, i) => (
          <ThemeCard key={cat.id} cat={cat} delay={(i + 3) * 0.07} />
        ))}
      </div>
    </div>
  </section>
);

export default WhichOneSection;
