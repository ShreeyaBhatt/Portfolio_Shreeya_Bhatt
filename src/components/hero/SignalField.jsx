import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

const MAX_NODES = 80;
const MAX_DPR = 2;
const LINK_DISTANCE = 140;
const CURSOR_RADIUS = 160;

/**
 * The site's signature motif: a hand-rolled canvas starfield — stars of
 * varying magnitude sit on a tidy, lightly-jittered grid (not a fully random
 * scatter, so the sky reads as deliberate constellations rather than noise),
 * connected by distance-fading lines, gently repelled by the cursor. Reused
 * at different densities/heights across pages so the motif recurs
 * consistently (Home hero, Projects/Certifications header strip).
 *
 * Perf: node count capped, devicePixelRatio capped, animation loop pauses
 * off-screen via IntersectionObserver, and prefers-reduced-motion renders a
 * single static frame instead of running requestAnimationFrame at all.
 */
export function SignalField({ density = 1, interactive = true, className = "" }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let nodes = [];
    let frameId = null;
    let running = false;
    let pointer = { x: null, y: null };
    let drift = 0;

    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim() || "#6C4CF0";

    function hexToRgb(hex) {
      const parsed = hex.replace("#", "");
      const bigint = parseInt(parsed, 16);
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    }
    const rgb = hexToRgb(accentColor.length === 7 ? accentColor : "#6C4CF0");

    function buildNodes() {
      const targetCount = Math.max(12, Math.min(MAX_NODES, Math.round((width / 18) * density)));
      const cols = Math.ceil(Math.sqrt(targetCount * (width / Math.max(height, 1))));
      const rows = Math.ceil(targetCount / cols);
      const cellW = width / cols;
      const cellH = height / rows;

      nodes = [];
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          if (nodes.length >= targetCount) break;
          // Modest jitter (not a full random scatter) keeps the sky reading
          // as an orderly star grid rather than chaotic noise.
          const jitterX = (Math.random() - 0.5) * cellW * 0.35;
          const jitterY = (Math.random() - 0.5) * cellH * 0.35;
          // Star magnitude: mostly small/dim stars, occasional bright ones.
          const magnitudeRoll = Math.random();
          const radius = magnitudeRoll > 0.92 ? 2.4 : magnitudeRoll > 0.6 ? 1.7 : 1.1;
          nodes.push({
            baseX: c * cellW + cellW / 2 + jitterX,
            baseY: r * cellH + cellH / 2 + jitterY,
            x: 0,
            y: 0,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            radius,
          });
        }
      }
      nodes.forEach((node) => {
        node.x = node.baseX;
        node.y = node.baseY;
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // node positions: autonomous drift + optional cursor repulsion
      nodes.forEach((node) => {
        if (interactive && pointer.x !== null) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_RADIUS) {
            const force = (CURSOR_RADIUS - dist) / CURSOR_RADIUS;
            node.vx += (dx / (dist || 1)) * force * 0.6;
            node.vy += (dy / (dist || 1)) * force * 0.6;
          }
        }

        // gentle pull back toward base position (keeps the circuit shape legible)
        node.vx += (node.baseX - node.x) * 0.01;
        node.vy += (node.baseY - node.y) * 0.01;
        node.vx *= 0.9;
        node.vy *= 0.9;
        node.x += node.vx;
        node.y += node.vy;
      });

      // constellation lines — thin and low-opacity, so the shape stays legible
      // without ever looking like a tangle.
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const opacity = (1 - dist / LINK_DISTANCE) * 0.3;
            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // stars — a soft glow behind a bright core, sized by magnitude
      ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)`;
      nodes.forEach((node) => {
        ctx.shadowBlur = node.radius * 4;
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    }

    function loop() {
      if (!running) return;
      drift += 1;
      if (!interactive && drift % 2 === 0) {
        // slow autonomous drift for non-interactive / touch contexts
        nodes.forEach((node) => {
          node.vx += (Math.random() - 0.5) * 0.02;
          node.vy += (Math.random() - 0.5) * 0.02;
        });
      }
      draw();
      frameId = requestAnimationFrame(loop);
    }

    function handlePointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    function handlePointerLeave() {
      pointer = { x: null, y: null };
    }

    resize();

    if (prefersReducedMotion) {
      draw();
    } else {
      const canPointerFollow = interactive && window.matchMedia("(pointer: fine)").matches;
      if (canPointerFollow) {
        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("pointerleave", handlePointerLeave);
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!running) {
              running = true;
              frameId = requestAnimationFrame(loop);
            }
          } else {
            running = false;
            if (frameId) cancelAnimationFrame(frameId);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);

      window.addEventListener("resize", resize);

      return () => {
        running = false;
        if (frameId) cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("pointermove", handlePointerMove);
        canvas.removeEventListener("pointerleave", handlePointerLeave);
        observer.disconnect();
      };
    }

    return undefined;
  }, [density, interactive, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
