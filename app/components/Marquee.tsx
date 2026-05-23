"use client";

import { useLanguage } from "../lib/language";

export default function Marquee() {
  const { t } = useLanguage();
  const all = [...t.marquee, ...t.marquee];
  return (
    <section
      aria-hidden
      className="border-y border-[var(--color-line)] py-6 md:py-8 overflow-hidden"
    >
      <div className="marquee-track gap-12 md:gap-20 px-6">
        {all.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 md:gap-20 text-3xl md:text-5xl font-light tracking-tight whitespace-nowrap"
          >
            <span>{item}</span>
            <span className="size-2 rounded-full bg-[var(--color-accent)]" />
          </div>
        ))}
      </div>
    </section>
  );
}
