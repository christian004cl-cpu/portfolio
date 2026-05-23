"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../lib/language";

export default function Hero() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Build the three lines (line 2 has an italic word + a plain word)
  const renderLine2 = () => (
    <>
      <span className="italic font-serif text-[var(--color-fg-dim)]">
        {t.hero.line2a}
      </span>{" "}
      {t.hero.line2b}
    </>
  );

  const lines: React.ReactNode[] = [t.hero.line1, renderLine2(), t.hero.line3];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden px-6 md:px-10 pt-32 pb-12 flex flex-col justify-between"
    >
      <motion.div
        style={{ y: yTitle, opacity, scale }}
        className="flex-1 flex flex-col justify-center"
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-fg-dim)] mb-6 md:mb-10">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span>{t.hero.availability}</span>
        </div>

        <h1
          key={lang}
          className="font-light leading-[0.92] tracking-tighter text-[14vw] md:text-[10vw]"
        >
          {lines.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: li * 0.12,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-sm text-[var(--color-fg-dim)] max-w-xs"
        >
          {t.hero.bio}
        </motion.div>

        <motion.a
          href="#about"
          data-cursor="link"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="self-end flex items-center gap-3 text-xs uppercase tracking-[0.18em]"
        >
          <span className="relative flex items-center">
            <span className="block h-px w-10 bg-[var(--color-fg)]" />
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="ml-2"
            >
              ↓
            </motion.span>
          </span>
          {t.hero.scroll}
        </motion.a>
      </div>
    </section>
  );
}
