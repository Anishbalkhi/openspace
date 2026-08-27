import './TestimonialsSection.css';

/* ── Review data — 4 columns, each with enough cards to feel full ─────────
   Cards are duplicated in JSX for the seamless marquee loop.
   ──────────────────────────────────────────────────────────────────────── */
const COLUMNS = [
  /* ── Col 0 — 22s up ── */
  {
    duration: 22,
    cards: [
      { id: 'c0r1', text: 'So good!', name: 'Markus B.', initials: 'MB', color: '#e05c2a' },
      {
        id: 'c0r2',
        text: "If you're wondering whether to get the Plain Jane, go ahead — it's straightforward and easy to use.",
        name: 'Gideon U.', initials: 'GU', color: '#4a9d6f',
      },
      {
        id: 'c0r3',
        text: 'Great website theme, it helped me a lot with boosting my sales on my brand. Various features helped me display my products in a 100% better way than my previous theme.',
        name: 'Lena K.', initials: 'LK', color: '#6d5dfc',
      },
      {
        id: 'c0r4',
        text: 'Absolutely love the clean design. My customers keep complimenting how professional the store looks now.',
        name: 'Tara M.', initials: 'TM', color: '#d44c6e',
      },
      {
        id: 'c0r5',
        text: 'Switched from a free theme and the difference is night and day. Worth every penny.',
        name: 'Finn O.', initials: 'FO', color: '#3a7bd5',
      },
    ],
  },
  /* ── Col 1 — 30s up (slowest) ── */
  {
    duration: 30,
    cards: [
      {
        id: 'c1r1',
        text: 'Shopify and then begin to setup/build your store. The constant updating of the theme throughout the years has been a game changer.',
        name: 'Cameron R.', initials: 'CR', color: '#d44c6e',
      },
      { id: 'c1r2', text: 'Great minimal design for aesthetics!', name: 'Melarii L.', initials: 'ML', color: '#3a7bd5' },
      {
        id: 'c1r3',
        text: "I purchased a few themes straight through Shopify in the past but they don't compare to the Plain Jane V2 Theme. Best Theme hands down and easy to edit.",
        name: 'LJ', initials: 'LJ', color: '#7c4dff',
      },
      {
        id: 'c1r4',
        text: "Best purchase I've made for my business this year. Setup was smooth and the docs are excellent.",
        name: 'James T.', initials: 'JT', color: '#e05c2a',
      },
      {
        id: 'c1r5',
        text: 'The support team is incredible — replied within the hour and solved my issue instantly.',
        name: 'Sofia R.', initials: 'SR', color: '#3ad5a0',
      },
    ],
  },
  /* ── Col 2 — 19s up (fastest) ── */
  {
    duration: 19,
    cards: [
      { id: 'c2r1', text: 'Easy to work with, and will continue to support.', name: 'Daniel S.', initials: 'DS', color: '#3a7bd5' },
      {
        id: 'c2r2',
        text: "I am a beginner to website design and was very hesitant to purchase at first. After looking at YouTube videos, I felt much better and decided to give it a try. This setup has exceeded my expectations! It's been already a month and such a great investment for my business!",
        name: 'Eric', initials: 'ER', color: '#e05c2a',
      },
      {
        id: 'c2r3',
        text: 'Setup took less than an afternoon. Clean, responsive, and exactly what I pictured.',
        name: 'Noah W.', initials: 'NW', color: '#6d5dfc',
      },
      {
        id: 'c2r4',
        text: 'Exactly what my brand needed. The lookbook pages are stunning on mobile.',
        name: 'Aria C.', initials: 'AC', color: '#d44c6e',
      },
      {
        id: 'c2r5',
        text: 'Went live the same day I bought it. My conversion rate went up within the first week.',
        name: 'Kai B.', initials: 'KB', color: '#4a9d6f',
      },
    ],
  },
  /* ── Col 3 — 26s up ── */
  {
    duration: 26,
    cards: [
      {
        id: 'c3r1',
        text: 'Amazing theme, easy to install, very straightforward. Support has been no issue at all, very timely responses and clear instructions. Great work Openspaces team!',
        name: 'Aman', initials: 'AM', color: '#e0852a',
      },
      {
        id: 'c3r2',
        text: 'It was super easy to install the theme. Loving all the features. Cannot wait to go live in a couple of weeks!',
        name: 'Swaroop B.', initials: 'SB', color: '#3ad5a0',
      },
      {
        id: 'c3r3',
        text: "I love this theme for the uniqueness compared to the other generic fashion brand themes on Shopify. It's been really easy to setup and there's a lot of features I can play around with as my brand grows.",
        name: 'Dominique D.', initials: 'DD', color: '#e05c2a',
      },
      { id: 'c3r4', text: 'CUSTOMIZABLE AND THE MUSIC OPTION VERY GOOD', name: 'Akhil K.', initials: 'AK', color: '#6d5dfc' },
      {
        id: 'c3r5',
        text: 'Love this thing. This has been the easiest setup I\'ve had work with.',
        name: 'Derek S.', initials: 'DS', color: '#3a7bd5',
      },
    ],
  },
];

function StarIcons() {
  return (
    <span className="rev__star-icons" aria-label="5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ color: '#f5a623' }}>★</span>
      ))}
    </span>
  );
}

function ReviewCard({ card }) {
  return (
    <article className="rev-card">
      <p className="rev-card__text">{card.text}</p>
      <div className="rev-card__author">
        <div className="rev-card__avatar" style={{ background: card.color }} aria-hidden="true">
          {card.initials}
        </div>
        <div className="rev-card__info">
          <span className="rev-card__name">{card.name}</span>
          <span className="rev-card__badge">Verified Buyer</span>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="reviews-section">

      {/* ── Header ── */}
      <div className="rev__header">
        <h2 className="rev__title reveal">
          Used by 8,500+ brands.{' '}
          <span style={{ color: 'var(--color-accent)' }}>Rated 4.9 out of 5.</span>
        </h2>
        <p className="rev__sub reveal">
          Here's what brand owners say after they launched their store.
        </p>
        <div className="rev__stars reveal">
          <StarIcons />
          <span>4.9/5 from multiple verified reviews</span>
        </div>
      </div>

      {/* ── 4-column marquee grid ── */}
      <div className="rev__stage">

        {/* Fade overlays — top and bottom bleed into page bg */}
        <div className="rev__fade rev__fade--top"    aria-hidden="true" />
        <div className="rev__fade rev__fade--bottom" aria-hidden="true" />

        <div className="rev__masonry">
          {COLUMNS.map((col, ci) => (
            <div key={ci} className="rev__col-outer">
              {/*
                Inner track is doubled: [...cards, ...cards]
                Animation moves exactly -50% of total height → seamless loop.
                Odd columns are slightly offset (margin-top) for visual stagger.
              */}
              <div
                className="rev__col-track"
                style={{
                  animationDuration: `${col.duration}s`,
                  marginTop: ci % 2 === 1 ? '-60px' : '0',   // stagger alternating cols
                }}
              >
                {/* First set */}
                {col.cards.map((card) => <ReviewCard key={card.id} card={card} />)}
                {/* Duplicate — enables seamless loop */}
                {col.cards.map((card) => <ReviewCard key={`${card.id}-dup`} card={card} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
