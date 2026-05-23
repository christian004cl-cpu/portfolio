"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useMemo, useRef } from "react";
import type { MotionValue } from "motion/react";
import { useLanguage } from "../lib/language";

export default function About() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = useMemo(() => t.about.paragraph.split(" "), [t.about.paragraph]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative px-6 md:px-10 py-32 md:py-48"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-32">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
              {t.about.eyebrow}
            </span>
            <div className="mt-10 md:mt-16 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-dim)] space-y-2">
              {t.about.meta.map((m) => (
                <div key={m}>{m}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <p className="font-light leading-[1.15] tracking-tight text-3xl md:text-[3.6vw]">
            {words.map((w, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={`${w}-${i}`} progress={scrollYProgress} range={[start, end]}>
                  {w}
                </Word>
              );
            })}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 md:mt-28">
            {t.about.stats.map((s) => (
              <div
                key={s.k}
                className="border-t border-[var(--color-line)] pt-4"
              >
                <div className="text-4xl md:text-5xl font-light">{s.k}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--color-fg-dim)]">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">
      {children}
    </motion.span>
  );
}
