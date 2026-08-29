import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion.js";

/**
 * A lightweight canvas particle field — like looking through a spacecraft
 * window in dark mode, or faint motes drifting across a bright sky in light
 * mode (you don't see stars in the morning). Three depth layers drift slowly;
 * the pointer adds a small parallax the near layer feels more than the far one.
 * Star count scales down on small screens, and under reduced motion it renders
 * once and stops.
 *
 * The particle colour comes from the CSS custom property `--star-color` (an
 * "r, g, b" triplet) and is re-read whenever the theme class on <html> flips,
 * so a light/dark toggle recolours the field live without a remount.
 *
 * Pure 2D canvas (no WebGL) so it stays cheap and never competes with the
 * avatar scene for the GPU.
 */
export function StarField({ className }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const rootEl = document.documentElement;
    const readTheme = () => {
      const rgb =
        getComputedStyle(rootEl).getPropertyValue("--star-color").trim() || "210, 232, 255";
      const light = !rootEl.classList.contains("dark");
      // A brighter background needs a hair more alpha for the teal stars to
      // read as clearly as the near-white ones do on deep space.
      return { rgb, alphaScale: light ? 1.15 : 1 };
    };
    let theme = readTheme();
    const themeObserver = new MutationObserver(() => {
      theme = readTheme();
    });
    themeObserver.observe(rootEl, { attributes: true, attributeFilter: ["class"] });

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    let raf = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const LAYERS = [
      { count: 0.00013, speed: 0.006, size: [0.4, 0.9], alpha: [0.25, 0.5], parallax: 6 },
      { count: 0.00009, speed: 0.012, size: [0.6, 1.3], alpha: [0.35, 0.7], parallax: 14 },
      { count: 0.00003, speed: 0.02, size: [1.0, 1.8], alpha: [0.5, 0.95], parallax: 26 },
    ];

    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    const minFrameMs = isMobile ? 1000 / 30 : 0; // cap the star field at 30fps on phones
    let lastDraw = 0;

    function build() {
      const area = width * height;
      stars = [];
      LAYERS.forEach((layer, li) => {
        const n = Math.round(area * layer.count * (isMobile ? 0.32 : 1));
        for (let i = 0; i < n; i += 1) {
          stars.push({
            l: li,
            x: Math.random() * width,
            y: Math.random() * height,
            r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
            a: layer.alpha[0] + Math.random() * (layer.alpha[1] - layer.alpha[0]),
            tw: Math.random() * Math.PI * 2,
            tws: 0.6 + Math.random() * 1.6,
          });
        }
      });
    }

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw(t) {
      raf = requestAnimationFrame(draw);
      if (minFrameMs && t - lastDraw < minFrameMs) return;
      lastDraw = t;
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        const layer = LAYERS[s.l];
        s.y += layer.speed;
        if (s.y > height + 2) s.y = -2;
        const px = pointer.x * layer.parallax;
        const py = pointer.y * layer.parallax;
        const twinkle = prefersReducedMotion ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.tws + s.tw);
        ctx.beginPath();
        ctx.arc(s.x + px, s.y + py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${theme.rgb}, ${Math.min(1, s.a * twinkle * theme.alphaScale)})`;
        ctx.fill();
      }
    }

    function onPointer(e) {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }

    resize();
    window.addEventListener("resize", resize);
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      raf = requestAnimationFrame(draw);
    } else {
      draw(0);
    }

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
