"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "../lib/language";
import type { Project } from "../lib/projects";

type TeamMember = {
  readonly photo: string;
  readonly name: string;
  readonly role: string;
};

type CaseStudy = {
  tocTitle: string;
  closeLabel: string;
  accent: string;
  meta: ReadonlyArray<{
    readonly label: string;
    readonly values: ReadonlyArray<string>;
  }>;
  overview: {
    label: string;
    body: string;
    image: string;
    imageCaption?: string;
  };
  sections: ReadonlyArray<{
    readonly key: string;
    readonly label: string;
    readonly body: string;
    readonly image: string;
    readonly imageCaption?: string;
  }>;
  teamMembers: ReadonlyArray<TeamMember>;
};

function TeamGrid({ members }: { members: ReadonlyArray<TeamMember> }) {
  if (members.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 max-w-[60ch]">
      {members.map((m) => (
        <div key={m.name}>
          <div className="relative w-full aspect-square overflow-hidden rounded-md bg-[var(--color-bg-soft)]">
            <Image
              src={m.photo}
              alt={m.name}
              fill
              sizes="(min-width: 768px) 28vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4">
            <div className="text-base font-semibold leading-tight">{m.name}</div>
            <div className="text-sm text-[var(--color-fg-dim)] mt-1">{m.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderRichText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`link-${key++}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        className="text-[var(--color-fg)] underline underline-offset-4 decoration-1 hover:text-[var(--color-accent)] transition-colors duration-300"
      >
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function SectionImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  if (!src) return null;
  const isVideo = /\.(mp4|webm|mov)($|\?)/i.test(src);
  const isAnimatedGif = /\.gif($|\?)/i.test(src);
  return (
    <figure className="mt-6">
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-md bg-[var(--color-bg-soft)]">
        {isVideo ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            aria-label={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            unoptimized={isAnimatedGif}
            className="object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-[var(--color-fg-dim)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const open = !!project;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  // Body scroll lock while modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const lookup = project
    ? (t.caseStudies as Record<string, CaseStudy | undefined>)[project.id]
    : undefined;

  // Scrollspy: track active section as user scrolls inside the modal
  useEffect(() => {
    if (!open || !lookup) return;
    const root = scrollRef.current;
    if (!root) return;

    const elements = lookup.sections
      .map((s) => root.querySelector<HTMLElement>(`#${s.key}`))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    setActiveSection("");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root,
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [open, lookup, project?.id]);

  return (
    <AnimatePresence>
      {open && project && lookup && (
        <motion.div
          key={project.id}
          ref={scrollRef}
          className="fixed inset-0 z-[400] bg-[var(--color-bg)] overflow-y-auto"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={onClose}
            data-cursor="link"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="fixed top-5 right-5 md:top-8 md:right-8 z-[20] inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-soft)]/80 backdrop-blur px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-[var(--color-accent)] hover:text-black hover:border-[var(--color-accent)] transition-colors duration-300"
          >
            <span>{lookup.closeLabel}</span>
            <svg
              viewBox="0 0 12 12"
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M1 1 L11 11 M11 1 L1 11" />
            </svg>
          </motion.button>

          {/* TOC pinned to right margin */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block fixed top-20 right-5 md:right-8 z-[15] w-56"
          >
            <div className="border border-[var(--color-line)] rounded-md p-5 bg-[var(--color-bg)]/70 backdrop-blur">
              <div className="text-sm font-medium mb-4 text-[var(--color-fg)]">
                {lookup.tocTitle}
              </div>
              <ul className="space-y-2">
                {lookup.sections.map((s) => {
                  const isActive = activeSection === s.key;
                  return (
                    <li key={s.key}>
                      <a
                        href={`#${s.key}`}
                        data-cursor="link"
                        className={`text-sm transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--color-fg)] font-semibold"
                            : "text-[var(--color-fg-dim)] hover:text-[var(--color-fg)]"
                        }`}
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.aside>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="px-6 md:px-10 lg:px-16 py-20 md:py-28 max-w-[1440px] mx-auto"
          >
            {/* Title */}
            <h1 className="font-light tracking-tighter leading-[0.95] text-6xl md:text-[8vw] md:pr-72">
              {project.title}
              <span style={{ color: lookup.accent }}>.</span>
            </h1>

            {/* Meta + content */}
            <div className="grid grid-cols-12 gap-6 md:gap-10 mt-16 md:mt-28">
              <aside className="col-span-12 md:col-span-3">
                <div className="md:sticky md:top-8 space-y-7">
                  {lookup.meta.map((m) => (
                    <div key={m.label}>
                      <div className="text-sm font-medium mb-1.5">{m.label}</div>
                      <ul className="space-y-0.5 text-sm text-[var(--color-fg-dim)]">
                        {m.values.map((v) => (
                          <li key={v}>{v}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </aside>

              <article className="col-span-12 md:col-span-7 space-y-12 md:space-y-16">
                <section>
                  <h2 className="text-base font-medium mb-3">
                    {lookup.overview.label}
                  </h2>
                  <p className="text-lg md:text-xl leading-relaxed text-[var(--color-fg-dim)] max-w-[60ch]">
                    {renderRichText(lookup.overview.body)}
                  </p>
                  <SectionImage
                    src={lookup.overview.image}
                    alt={lookup.overview.label}
                    caption={lookup.overview.imageCaption}
                  />
                </section>

                {lookup.sections.map((s) => (
                  <section key={s.key} id={s.key} className="scroll-mt-10">
                    <h2 className="text-base font-medium mb-3">{s.label}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-[var(--color-fg-dim)] max-w-[60ch]">
                      {renderRichText(s.body)}
                    </p>
                    <SectionImage
                      src={s.image}
                      alt={s.label}
                      caption={s.imageCaption}
                    />
                    {s.key === "team" && (
                      <TeamGrid members={lookup.teamMembers} />
                    )}
                  </section>
                ))}
              </article>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
