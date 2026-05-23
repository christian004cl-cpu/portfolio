"use client";

import { motion } from "motion/react";
import { useLanguage } from "../lib/language";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section className="relative px-6 md:px-10 py-32 md:py-48 border-t border-[var(--color-line)]">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        <div className="col-span-12 md:col-span-5">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            {t.experience.eyebrow}
          </span>
          <h2 className="mt-6 font-light tracking-tight text-5xl md:text-7xl leading-[0.95]">
            {t.experience.titleA} <br />
            <span className="italic font-serif text-[var(--color-fg-dim)]">
              {t.experience.titleB}
            </span>
            {t.experience.titleC}
          </h2>

          <div className="mt-16">
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-fg-dim)] mb-4">
              {t.experience.recognitionTitle}
            </div>
            <ul className="space-y-3">
              {t.experience.recognitions.map((r) => (
                <li
                  key={r.label}
                  className="flex justify-between border-b border-[var(--color-line)] pb-2 text-sm"
                >
                  <span>{r.label}</span>
                  <span className="text-[var(--color-fg-dim)]">{r.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="col-span-12 md:col-span-7 space-y-2">
          {t.experience.items.map((it, i) => (
            <motion.li
              key={it.company}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-12 gap-4 items-baseline border-b border-[var(--color-line)] py-8"
            >
              <span className="col-span-4 text-xs uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
                {it.period}
              </span>
              <div className="col-span-8">
                <div className="flex items-center gap-2 text-2xl md:text-3xl font-light tracking-tight">
                  <span>{it.company}</span>
                  <span className="text-[var(--color-fg-dim)]">·</span>
                  <span className="text-[var(--color-fg-dim)]">{it.role}</span>
                </div>
                <div className="mt-2 text-sm text-[var(--color-fg-dim)]">{it.note}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
                  {it.location}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
