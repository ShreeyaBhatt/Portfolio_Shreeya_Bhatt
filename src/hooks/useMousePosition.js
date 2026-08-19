import { useEffect, useState } from "react";

/** rAF-throttled pointer position in viewport coordinates, null when untracked (touch/off-screen). */
export function useMousePosition() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    let frame = null;

    const handleMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
        frame = null;
      });
    };

    const handleLeave = () => setPosition(null);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return position;
}
