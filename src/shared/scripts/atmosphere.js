/**
 * atmosphere.js — Subtle cursor-following atmospheric light & fluid smoke trail.
 *
 * Requirements:
 * - 100% native cursor preserved (never hides cursor, no fake cursor ball).
 * - Soft diffuse light halo + organic fading smoke puffs behind movement.
 * - Fluid inertia/smoothing with velocity-sensitive emission.
 * - Auto-adapts to dark and light themes (reading CSS variables / data-theme).
 * - Fully disabled on touch devices (pointer: coarse) and prefers-reduced-motion.
 * - High performance: capped particle pool, devicePixelRatio support, pointer-events: none.
 */

export function initAtmosphere(canvas) {
  if (!canvas) return () => {};

  // 1. Accessibility & device capability checks
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isFinePointer || prefersReducedMotion) {
    canvas.style.display = 'none';
    return () => {};
  }

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return () => {};

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx?.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // 2. Mouse tracking with smooth interpolation
  let mouseX = -1000;
  let mouseY = -1000;
  let currX = -1000;
  let currY = -1000;
  let isMoving = false;
  let lastMoveTime = 0;
  let mouseSpeed = 0;
  let hasPointer = false;

  function onPointerMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    hasPointer = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMoveTime = performance.now();
    if (currX < -500) {
      currX = mouseX;
      currY = mouseY;
    }
  }

  function onPointerLeave() {
    hasPointer = false;
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('mouseleave', onPointerLeave, { passive: true });

  // 3. Smoke particle pool (capped to avoid memory leaks/GC)
  const MAX_PARTICLES = 36;
  const particles = [];

  function spawnSmoke(x, y, speed) {
    if (particles.length >= MAX_PARTICLES) {
      // Recycle the oldest particle
      particles.shift();
    }

    const angle = Math.random() * Math.PI * 2;
    // Disperse slightly away from motion
    const driftSpeed = 0.2 + Math.random() * 0.8;
    const baseRadius = 22 + Math.random() * 26 + Math.min(speed * 0.4, 25);
    const maxAlpha = Math.min(0.08 + (speed * 0.0035), 0.18);

    particles.push({
      x: x + (Math.random() - 0.5) * 14,
      y: y + (Math.random() - 0.5) * 14,
      vx: Math.cos(angle) * driftSpeed,
      vy: Math.sin(angle) * driftSpeed - 0.15, // subtle upward thermal drift
      radius: baseRadius,
      maxRadius: baseRadius * (1.6 + Math.random() * 0.6),
      alpha: maxAlpha,
      maxAlpha,
      life: 1.0,
      decay: 0.016 + Math.random() * 0.018, // dies in ~40-60 frames (~0.7-1s)
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.02,
    });
  }

  // 4. Main animation loop
  let animationId = 0;
  let lastTime = performance.now();

  function render(time) {
    animationId = requestAnimationFrame(render);

    const dt = Math.min((time - lastTime) / 1000, 0.1);
    lastTime = time;

    if (!ctx) return;

    // Clear whole canvas
    ctx.clearRect(0, 0, width, height);

    // If mouse left or hasn't entered yet, only drain remaining particles
    if (hasPointer && mouseX > -500) {
      const dx = mouseX - currX;
      const dy = mouseY - currY;
      const dist = Math.hypot(dx, dy);

      // Smooth lag / interpolation
      const lerpFactor = 0.22;
      currX += dx * lerpFactor;
      currY += dy * lerpFactor;

      mouseSpeed = dist;
      isMoving = (time - lastMoveTime) < 180 && dist > 1.2;

      // Emit smoke puffs when moving
      if (isMoving && dist > 2) {
        // Spawn rate scales gently with movement distance
        const spawnCount = Math.min(Math.floor(dist / 12) + 1, 3);
        for (let i = 0; i < spawnCount; i++) {
          const t = i / spawnCount;
          spawnSmoke(currX - dx * t * 0.5, currY - dy * t * 0.5, dist);
        }
      }
    }

    // Determine current color palette based on active theme
    const isDark = document.documentElement.dataset.theme !== 'light';

    // 5. Draw Atmospheric Soft Halo around current position
    if (hasPointer && currX > -500) {
      // Glow size and opacity smoothly respond to velocity with a soft resting baseline
      const speedGlow = Math.min(mouseSpeed * 1.5, 60);
      const haloRadius = 70 + speedGlow;
      const haloAlpha = isDark
        ? (isMoving ? 0.09 : 0.035)
        : (isMoving ? 0.06 : 0.025);

      const glowGrad = ctx.createRadialGradient(currX, currY, 4, currX, currY, haloRadius);

      if (isDark) {
        // Luminous warm-teal tone matching Bittu palette
        glowGrad.addColorStop(0, `rgba(130, 240, 205, ${haloAlpha * 1.4})`);
        glowGrad.addColorStop(0.35, `rgba(110, 210, 230, ${haloAlpha * 0.7})`);
        glowGrad.addColorStop(0.7, `rgba(138, 160, 240, ${haloAlpha * 0.25})`);
        glowGrad.addColorStop(1, 'rgba(100, 150, 220, 0)');
      } else {
        // Soft golden-amber airy luminescence for light mode
        glowGrad.addColorStop(0, `rgba(180, 160, 230, ${haloAlpha * 1.2})`);
        glowGrad.addColorStop(0.4, `rgba(140, 180, 240, ${haloAlpha * 0.6})`);
        glowGrad.addColorStop(1, 'rgba(120, 160, 220, 0)');
      }

      ctx.save();
      ctx.globalCompositeOperation = isDark ? 'screen' : 'multiply';
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(currX, currY, haloRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 6. Draw and update Smoke Particles
    if (particles.length > 0) {
      ctx.save();
      // 'screen' blend gives brilliant fluid dissipation in dark mode; 'source-over'/'multiply' in light
      ctx.globalCompositeOperation = isDark ? 'screen' : 'source-over';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        // Expand smoothly as it dissipates
        const currentRadius = p.radius + (p.maxRadius - p.radius) * (1 - p.life);
        const currentAlpha = p.alpha * Math.sin(p.life * Math.PI); // Smooth ease in and out

        const smokeGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);

        if (isDark) {
          smokeGrad.addColorStop(0, `rgba(195, 235, 230, ${currentAlpha * 0.9})`);
          smokeGrad.addColorStop(0.3, `rgba(130, 200, 215, ${currentAlpha * 0.5})`);
          smokeGrad.addColorStop(0.7, `rgba(90, 140, 195, ${currentAlpha * 0.2})`);
          smokeGrad.addColorStop(1, 'rgba(70, 100, 160, 0)');
        } else {
          smokeGrad.addColorStop(0, `rgba(110, 130, 170, ${currentAlpha * 0.65})`);
          smokeGrad.addColorStop(0.4, `rgba(140, 160, 195, ${currentAlpha * 0.35})`);
          smokeGrad.addColorStop(1, 'rgba(160, 180, 210, 0)');
        }

        ctx.fillStyle = smokeGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  animationId = requestAnimationFrame(render);

  // 7. Cleanup callback
  return function cleanup() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('mouseleave', onPointerLeave);
  };
}
