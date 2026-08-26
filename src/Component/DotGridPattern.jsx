import './DotGridPattern.css';

// 7x7 matrix coordinates: center is (3, 3)
const MATRIX_DOTS = [];
for (let r = 0; r < 7; r++) {
  for (let c = 0; c < 7; c++) {
    const dist = Math.sqrt(Math.pow(r - 3, 2) + Math.pow(c - 3, 2));
    let lvl = 'hidden';
    if (dist < 0.5) lvl = 'core';
    else if (dist <= 1.2) lvl = 'lvl1';
    else if (dist <= 2.2) lvl = 'lvl2';
    else if (dist <= 3.2) lvl = 'lvl3';

    MATRIX_DOTS.push({ id: `${r}-${c}`, r, c, dist, lvl });
  }
}

const DotGridPattern = ({
  clusters = [{ top: '50%', left: '50%' }],
  showBase = true,
  className = '',
}) => {
  return (
    <div className={`dot-grid-pattern ${className}`} aria-hidden="true">
      {/* Uniform background grid of dots */}
      {showBase && <div className="dot-grid-pattern__base" />}

      {/* Illuminated Concentric Clusters */}
      {clusters.map((pos, idx) => (
        <div
          key={idx}
          className="dot-grid-pattern__cluster"
          style={{
            '--cluster-top': pos.top,
            '--cluster-left': pos.left,
          }}
        >
          {MATRIX_DOTS.map((dot) => {
            if (dot.lvl === 'hidden') return <div key={dot.id} />;
            return (
              <span
                key={dot.id}
                className={`dot-grid-pattern__dot dot-grid-pattern__dot--${dot.lvl}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DotGridPattern;
