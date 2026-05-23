"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  const [hover, setHover] = useState<"none" | "link" | "view" | "drag">("none");
  const [hidden, setHidden] = useState(true);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (hidden) setHidden(false);
    };
    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const targets = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-cursor]"));

    const bind = () => {
      targets().forEach((el) => {
        const type = (el.dataset.cursor as typeof hover) || "link";
        el.addEventListener("mouseenter", () => setHover(type));
        el.addEventListener("mouseleave", () => setHover("none"));
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);
    bind();

    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
      observer.disconnect();
    };
  }, [x, y, hidden]);

  const size = hover === "none" ? 10 : hover === "view" ? 84 : 44;
  const label =
    hover === "view" ? "VIEW" : hover === "drag" ? "DRAG" : hover === "link" ? "" : "";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden md:flex"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-[var(--color-accent)] mix-blend-difference"
        animate={{ width: size, height: size }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
      >
        <span
          ref={labelRef}
          className="text-[10px] font-medium uppercase tracking-[0.12em] text-black"
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
