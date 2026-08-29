import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const MAX_DPR = 2;
// Three depth layers drifting at different speeds — the parallax is what
// sells "moving through space" rather than "stars sitting still".
const STAR_LAYERS = [
  { count: 70, speed: 4, size: [0.5, 1.1], alpha: 0.45 },
  { count: 45, speed: 10, size: [0.9, 1.6], alpha: 0.7 },
  { count: 18, speed: 19, size: [1.3, 2.2], alpha: 1 },
];
const SHOOTING_STAR_DELAY = [5000, 11000];

function hexToRgb(hex) {
  const parsed = hex.replace("#", "");
  const bigint = parseInt(parsed, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

/**
 * The site's persistent backdrop, mounted once and present behind every page:
 * a slow parallax starfield with the occasional shooting star.
 *
 * It is deliberately quiet. The backdrop's job is to give the page depth and
 * a sense of place, not to be looked at — anything that crosses the screen on
 * its own path pulls the eye off the content and reads as decoration for its
 * own sake. Star speeds are low and the shooting stars are rare enough to
 * register as a detail rather than an effect.
 *
 * Purely decorative — aria-hidden, pointer-events: none, never intercepts a
 * click — and paused whenever the tab is hidden. Under reduced motion it
 * renders a single static frame.
 */
export function SpaceBackground() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let layers = [];
    let shootingStars = [];
    let frameId = null;
    let running = false;
    let nextShootingStarAt = 0;
    let starRgb = { r: 255, g: 255, b: 255 };
    let starBaseAlpha = 0.7;
    let accentRgb = { r: 245, g: 196, b: 83 };

    function readThemeColors() {
      const styles = getComputedStyle(document.documentElement);
      const starColor = styles.getPropertyValue("--star-color").trim() || "#ffffff";
      const accentColor = styles.getPropertyValue("--color-accent-2").trim() || "#f5c453";
      starBaseAlpha = parseFloat(styles.getPropertyValue("--star-opacity")) || 0.7;
      starRgb = hexToRgb(starColor.length === 7 ? starColor : "#ffffff");
      accentRgb = hexToRgb(accentColor.length === 7 ? accentColor : "#f5c453");
    }

    function seedLayers() {
      layers = STAR_LAYERS.map((layer) => ({
        ...layer,
        stars: Array.from({ length: layer.count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 700 + Math.random() * 700,
        })),
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedLayers();
    }

    function spawnShootingStar(now) {
      const startX = Math.random() * width * 0.7;
      const startY = -20 - Math.random() * height * 0.15;
      const speed = (Math.min(width, 900) / 900) * (7 + Math.random() * 3);
      shootingStars.push({
        x: startX,
        y: startY,
        vx: speed * 0.85,
        vy: speed,
        bornAt: now,
        maxLife: 650 + Math.random() * 250,
        accent: Math.random() < 0.25,
      });
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height);

      layers.forEach((layer) => {
        layer.stars.forEach((star) => {
          star.x -= layer.speed / 60;
          if (star.x < -4) {
            star.x = width + 4;
            star.y = Math.random() * height;
          }
          const twinkle = 0.6 + 0.4 * Math.sin(star.twinklePhase + now / star.twinkleSpeed);
          const alpha = starBaseAlpha * layer.alpha * twinkle;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${starRgb.r}, ${starRgb.g}, ${starRgb.b}, ${alpha})`;
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        });
      });

      shootingStars = shootingStars.filter((s) => now - s.bornAt < s.maxLife);
      shootingStars.forEach((s) => {
        const age = now - s.bornAt;
        s.x += s.vx;
        s.y += s.vy;
        const fade = 1 - age / s.maxLife;
        const tailX = s.x - s.vx * 3.2;
        const tailY = s.y - s.vy * 3.2;
        const c = s.accent ? accentRgb : starRgb;
        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${fade})`);
        gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      });
    }

    function loop(time) {
      if (!running) return;
      if (time > nextShootingStarAt) {
        spawnShootingStar(time);
        nextShootingStarAt =
          time +
          SHOOTING_STAR_DELAY[0] +
          Math.random() * (SHOOTING_STAR_DELAY[1] - SHOOTING_STAR_DELAY[0]);
      }
      draw(time);
      frameId = requestAnimationFrame(loop);
    }

    readThemeColors();
    resize();

    if (prefersReducedMotion) {
      draw(0);
      return undefined;
    }

    nextShootingStarAt = performance.now() + 2500;

    function start() {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
    }
    function handleVisibility() {
      if (document.hidden) stop();
      else start();
    }

    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    // Re-read theme colours whenever the dark/light class flips, so a live
    // toggle updates the starfield instantly instead of on next reload.
    const themeObserver = new MutationObserver(readThemeColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      themeObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -2 }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
