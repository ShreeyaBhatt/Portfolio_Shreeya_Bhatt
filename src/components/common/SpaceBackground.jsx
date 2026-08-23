import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";
import { RocketIcon } from "./icons.jsx";

const MAX_DPR = 2;
// Three depth layers drifting at different speeds — the parallax is what
// sells "moving through space" rather than just "stars sitting still".
const STAR_LAYERS = [
  { count: 70, speed: 5, size: [0.6, 1.2], alpha: 0.5 },
  { count: 45, speed: 12, size: [1, 1.8], alpha: 0.75 },
  { count: 20, speed: 22, size: [1.4, 2.4], alpha: 1 },
];
const SHOOTING_STAR_DELAY = [3500, 8000];
const FIRST_ROCKET_DELAY = [6000, 11000];
const ROCKET_INTERVAL = [20000, 32000];
const ROCKET_FLIGHT_S = 10;

function hexToRgb(hex) {
  const parsed = hex.replace("#", "");
  const bigint = parseInt(parsed, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

/**
 * The site's persistent backdrop, mounted once and present behind every
 * page: a slow parallax starfield (so the sky itself seems to glide past, as
 * if the site is a ship underway), the occasional shooting star, and a
 * rocket that periodically crosses the screen on its own diagonal flight
 * path. Purely decorative — aria-hidden, pointer-events: none, never
 * intercepts a click — and paused whenever the tab is hidden or the user
 * prefers reduced motion, in which case it renders one static frame with no
 * rocket flights at all.
 */
export function SpaceBackground() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [rocketFlight, setRocketFlight] = useState(null);
  const hasFlownRef = useRef(false);

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
    let lastTime = 0;
    let nextShootingStarAt = 0;
    let starRgb = { r: 255, g: 255, b: 255 };
    let starBaseAlpha = 0.7;
    let goldRgb = { r: 255, g: 193, b: 100 };

    function readThemeColors() {
      const styles = getComputedStyle(document.documentElement);
      const starColor = styles.getPropertyValue("--star-color").trim() || "#ffffff";
      const goldColor = styles.getPropertyValue("--color-accent-2").trim() || "#ffc164";
      starBaseAlpha = parseFloat(styles.getPropertyValue("--star-opacity")) || 0.7;
      starRgb = hexToRgb(starColor.length === 7 ? starColor : "#ffffff");
      goldRgb = hexToRgb(goldColor.length === 7 ? goldColor : "#ffc164");
    }

    function seedLayers() {
      layers = STAR_LAYERS.map((layer) => ({
        ...layer,
        stars: Array.from({ length: layer.count }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 600 + Math.random() * 600,
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
      const gold = Math.random() < 0.3;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: speed * 0.85,
        vy: speed,
        bornAt: now,
        maxLife: 650 + Math.random() * 250,
        gold,
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
          const twinkle = 0.55 + 0.45 * Math.sin(star.twinklePhase + now / star.twinkleSpeed);
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
        const c = s.gold ? goldRgb : starRgb;
        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${fade})`);
        gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
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
          time + SHOOTING_STAR_DELAY[0] + Math.random() * (SHOOTING_STAR_DELAY[1] - SHOOTING_STAR_DELAY[0]);
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

    nextShootingStarAt = performance.now() + 1800;

    function start() {
      if (running) return;
      running = true;
      lastTime = performance.now();
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

    // Re-read theme colors whenever the dark/light class flips, so a live
    // toggle updates the starfield instantly instead of on next reload.
    const themeObserver = new MutationObserver(readThemeColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      themeObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  // Rocket flyby scheduler — independent of the canvas loop, drives a DOM sprite.
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    if (rocketFlight) return undefined; // a flight is already underway

    const [min, max] = hasFlownRef.current ? ROCKET_INTERVAL : FIRST_ROCKET_DELAY;
    const delay = min + Math.random() * (max - min);
    const timeoutId = setTimeout(() => {
      hasFlownRef.current = true;
      setRocketFlight({ id: Date.now(), fromLeft: Math.random() < 0.5 });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion, rocketFlight]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: -2 }}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {rocketFlight && !prefersReducedMotion && (
        <motion.div
          key={rocketFlight.id}
          initial={{
            x: rocketFlight.fromLeft ? "-10vw" : "110vw",
            y: "105vh",
            rotate: rocketFlight.fromLeft ? 45 : -45,
            opacity: 0,
          }}
          animate={{
            x: rocketFlight.fromLeft ? "110vw" : "-10vw",
            y: "-15vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: ROCKET_FLIGHT_S, ease: "linear", opacity: { times: [0, 0.08, 0.85, 1] } }}
          onAnimationComplete={() => setRocketFlight(null)}
          className="absolute left-0 top-0"
          style={{ filter: "drop-shadow(0 0 10px var(--color-accent-2))" }}
        >
          <RocketIcon size={30} />
        </motion.div>
      )}
    </div>
  );
}
