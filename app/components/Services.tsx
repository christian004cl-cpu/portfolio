"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { useLanguage } from "../lib/language";

export default function Services() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-[var(--color-line)]"
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-20">
        <div className="col-span-12 md:col-span-5">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            {t.services.eyebrow}
          </span>
          <h2 className="mt-6 font-light tracking-tight text-5xl md:text-7xl leading-[0.95]">
            {t.services.titleA}
            <br />
            <span className="italic font-serif text-[var(--color-fg-dim)]">
              {t.services.titleB}
            </span>
            {t.services.titleC}
          </h2>
        </div>
        <p className="col-span-12 md:col-span-6 md:col-start-7 text-[var(--color-fg-dim)] text-lg md:text-xl leading-relaxed self-end">
          {t.services.subtitle}
        </p>
      </div>

      <ul className="border-t border-[var(--color-line)]">
        {t.services.items.map((s, i) => (
          <ServiceRow key={s.n} {...s} index={i} />
        ))}
      </ul>
    </section>
  );
}

function ServiceRow({
  n,
  title,
  body,
  deliverables,
}: {
  n: string;
  title: string;
  body: string;
  deliverables: readonly string[];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.li
      ref={ref}
      style={{ x, opacity }}
      className="border-b border-[var(--color-line)] group"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="link"
        className="w-full grid grid-cols-12 gap-4 items-center py-8 md:py-10 text-left"
      >
        <span className="col-span-2 md:col-span-1 text-xs uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">
          {n}
        </span>
        <span className="col-span-8 md:col-span-7 text-3xl md:text-5xl font-light tracking-tight">
          {title}
        </span>
        <span className="col-span-2 md:col-span-4 justify-self-end text-2xl md:text-3xl">
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            +
          </motion.span>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-12 gap-4 pb-10">
          <p className="col-span-12 md:col-span-7 md:col-start-2 text-lg md:text-xl text-[var(--color-fg-dim)] leading-relaxed">
            {body}
          </p>
          <ul className="col-span-12 md:col-span-3 md:col-start-10 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] self-end">
            {deliverables.map((d) => (
              <li
                key={d}
                className="border border-[var(--color-line)] rounded-full px-3 py-1 text-[var(--color-fg-dim)]"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.li>
  );
}
