"use client";

import { motion } from "motion/react";
import { useLanguage } from "../lib/language";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48 border-t border-[var(--color-line)]">
      {/* Eyebrow */}
      <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
        {t.experience.eyebrow}
      </span>

      {/* Heading */}
      <h2 className="mt-6 font-light tracking-tight text-5xl md:text-7xl leading-[1.05] max-w-3xl">
        {t.experience.titleA}
        <br />
        <span className="italic font-serif text-[var(--color-fg-dim)]">
          {t.experience.titleB}
        </span>
        {t.experience.titleC}
      </h2>

      {/* Recognitions — full width */}
      <div className="mt-20 md:mt-28">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] mb-6">
          {t.experience.recognitionTitle}
        </div>
        <ul>
          {t.experience.recognitions.map((r) => (
            <li
              key={r.label}
              className="flex justify-between items-baseline border-b border-[var(--color-line)] py-4 text-base"
            >
              <span>{r.label}</span>
              <span className="text-[var(--color-fg-dim)] text-sm">{r.year}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Experience items — full width */}
      <div className="mt-20 md:mt-28">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] mb-6">
          {t.experience.itemsLabel}
        </div>
        <ul>
          {t.experience.items.map((it, i) => (
            <motion.li
              key={it.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-b border-[var(--color-line)] py-8 md:py-10"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-6">
                <div className="text-2xl md:text-3xl font-light tracking-tight">
                  <span>{it.company}</span>
                  <span className="text-[var(--color-fg-dim)]"> · </span>
                  <span className="text-[var(--color-fg-dim)]">{it.role}</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] whitespace-nowrap">
                  {it.period}
                </span>
              </div>
              <div className="mt-3 text-sm md:text-base text-[var(--color-fg-dim)] max-w-3xl">
                {it.note}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">
                {it.location}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
