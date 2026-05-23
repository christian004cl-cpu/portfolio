"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { projects, type Project } from "../lib/projects";
import { useLanguage } from "../lib/language";
import ProjectModal from "./ProjectModal";

export default function Work() {
  const { t } = useLanguage();
  const caseStudies = t.caseStudies as Record<string, unknown>;
  const [active, setActive] = useState<number | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 28, stiffness: 220 });
  const sy = useSpring(y, { damping: 28, stiffness: 220 });
  const wrap = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!wrap.current) return;
    const rect = wrap.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section
      id="work"
      className="relative px-6 md:px-10 py-32 md:py-48 border-t border-[var(--color-line)]"
    >
      <div className="flex items-end justify-between mb-12 md:mb-20">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
            {t.work.eyebrow}
          </span>
          <h2 className="mt-6 font-light tracking-tight text-5xl md:text-7xl leading-[0.95]">
            {t.work.titleA}
            <br />
            <span className="text-[var(--color-fg-dim)] italic font-serif">
              {t.work.titleB}
            </span>
          </h2>
        </div>
        <a href="#contact" data-cursor="link" className="hidden md:inline-flex btn-magnetic">
          {t.work.cta}
        </a>
      </div>

      <div
        ref={wrap}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
        className="relative"
      >
        <ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {projects.map((p, i) => {
            const hasCaseStudy = !!caseStudies[p.id];
            const isExternal = p.href.startsWith("http");
            const rowContent = (
              <>
                <span className="col-span-1 text-xs uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">
                  {p.index}
                </span>
                <span className="col-span-7 md:col-span-5 text-3xl md:text-6xl font-light tracking-tight relative overflow-hidden">
                  <motion.span
                    animate={{
                      x: active === i ? 24 : 0,
                      color: active === i ? "#d4ff00" : "#ededed",
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {p.title}
                  </motion.span>
                </span>
                <span className="col-span-4 md:col-span-4 hidden md:flex gap-3 flex-wrap text-xs uppercase tracking-[0.16em] text-[var(--color-fg-dim)]">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--color-line)] rounded-full px-3 py-1"
                    >
                      {(t.work.tags as Record<string, string>)[tag] ?? tag}
                    </span>
                  ))}
                </span>
                <span className="col-span-4 md:col-span-2 text-right text-xs uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
                  {p.client} · {p.year}
                </span>
              </>
            );
            const rowClass =
              "w-full text-left grid grid-cols-12 gap-4 items-center py-6 md:py-9 transition-colors duration-500";

            return (
              <li
                key={p.id}
                onMouseEnter={() => setActive(i)}
                data-cursor="view"
                className="group"
              >
                {hasCaseStudy ? (
                  <button
                    type="button"
                    onClick={() => setCaseStudyProject(p)}
                    className={rowClass}
                  >
                    {rowContent}
                  </button>
                ) : (
                  <a
                    href={p.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={rowClass}
                  >
                    {rowContent}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={projects[active].id}
              style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute left-0 top-0 w-[36vw] max-w-[440px] aspect-[4/5] z-10 hidden md:block overflow-hidden rounded-md"
            >
              <Image
                src={projects[active].image}
                alt={projects[active].title}
                fill
                sizes="40vw"
                className="object-cover"
                priority={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-10 md:hidden">
        <a href="#contact" data-cursor="link" className="btn-magnetic">
          {t.work.cta}
        </a>
      </div>

      <ProjectModal
        project={caseStudyProject}
        onClose={() => setCaseStudyProject(null)}
      />
    </section>
  );
}
