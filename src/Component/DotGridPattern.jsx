import { useEffect, useRef } from 'react';
import './DotGridPattern.css';

const DotGridPattern = ({
  className = '',
  dotSpacing = 32,
  baseRadius = 1.8,
  hoverRadius = 240,
  maxScale = 5.8,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = 0;
    let height = 0;
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, isHovering: false };
    let dots = [];
    let ripples = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Rebuild dots grid
      dots = [];
      const cols = Math.ceil(width / dotSpacing) + 2;
      const rows = Math.ceil(height / dotSpacing) + 2;
      const offsetX = (width - (cols - 1) * dotSpacing) / 2;
      const offsetY = (height - (rows - 1) * dotSpacing) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: offsetX + c * dotSpacing,
            y: offsetY + r * dotSpacing,
            currentRadius: baseRadius,
            currentOpacity: 0.45,
          });
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      // Spawn ambient ripples periodically
      if (!mouse.isHovering && Math.random() < 0.018) {
        ripples.push({
          x: width * (0.15 + Math.random() * 0.7),
          y: height * (0.15 + Math.random() * 0.7),
          radius: 0,
          maxRadius: 240,
          alpha: 1.0,
        });
      }

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 3.5;
        rip.alpha -= 0.01;
        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Draw each dot
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let targetRadius = baseRadius;
        let targetOpacity = 0.42;
        let isGlow = false;

        // Hover distance
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < hoverRadius) {
          const factor = Math.pow(1 - dist / hoverRadius, 1.5);
          targetRadius = baseRadius + (baseRadius * maxScale - baseRadius) * factor;
          targetOpacity = 0.5 + 0.5 * factor;
          if (factor > 0.35) isGlow = true;
        }

        // Check active ripples
        for (let j = 0; j < ripples.length; j++) {
          const rip = ripples[j];
          const rdx = rip.x - dot.x;
          const rdy = rip.y - dot.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rdist - rip.radius);
          if (diff < 50) {
            const ripFactor = (1 - diff / 50) * rip.alpha;
            targetRadius = Math.max(targetRadius, baseRadius + baseRadius * 4.2 * ripFactor);
            targetOpacity = Math.max(targetOpacity, 0.45 + 0.55 * ripFactor);
            if (ripFactor > 0.4) isGlow = true;
          }
        }

        // Smoothly interpolate current values
        dot.currentRadius += (targetRadius - dot.currentRadius) * 0.24;
        dot.currentOpacity += (targetOpacity - dot.currentOpacity) * 0.24;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);

        if (isGlow && dot.currentRadius > 3.0) {
          ctx.shadowColor = 'rgba(255, 255, 255, 1)';
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${dot.currentOpacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dotSpacing, baseRadius, hoverRadius, maxScale]);

  return (
    <div ref={containerRef} className={`dot-grid-pattern ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="dot-grid-pattern__canvas" />
    </div>
  );
};

export default DotGridPattern;
