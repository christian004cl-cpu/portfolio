"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

const IMG_W = 640;
const IMG_H = 480;
const MARGIN = 24;
const CURSOR_GAP = 24;

function clampPosition(cx: number, cy: number) {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Default: try centered horizontally over cursor
  let imgX = cx - IMG_W / 2;
  imgX = Math.max(MARGIN, Math.min(vw - IMG_W - MARGIN, imgX));

  // Default: place above cursor with gap; if would clip top, place below
  let imgY = cy - IMG_H - CURSOR_GAP;
  if (imgY < MARGIN) imgY = cy + CURSOR_GAP;
  imgY = Math.max(MARGIN, Math.min(vh - IMG_H - MARGIN, imgY));

  return { x: imgX, y: imgY };
}

export default function HoverImageWord({
  children,
  src,
  alt,
}: {
  children: React.ReactNode;
  src: string;
  alt: string;
}) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 28, stiffness: 260 });
  const sy = useSpring(y, { damping: 28, stiffness: 260 });

  const move = (cx: number, cy: number) => {
    const pos = clampPosition(cx, cy);
    x.set(pos.x);
    y.set(pos.y);
  };

  const onEnter = (e: React.MouseEvent) => {
    move(e.clientX, e.clientY);
    setHovered(true);
  };

  return (
    <>
      <span
        onMouseEnter={onEnter}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => move(e.clientX, e.clientY)}
        data-cursor="view"
        className="font-semibold text-[var(--color-fg)] underline underline-offset-4 decoration-1 cursor-pointer"
      >
        {children}
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.div
            style={{ x: sx, y: sy, width: IMG_W, height: IMG_H }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed left-0 top-0 z-[150] hidden md:block overflow-hidden rounded-md shadow-2xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="640px"
              className="object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
