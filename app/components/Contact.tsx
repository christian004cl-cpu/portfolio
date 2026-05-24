"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "../lib/language";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/christian-linaresui" },
  { label: "Dribbble", href: "https://dribbble.com/christianUI_UX" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative px-6 md:px-10 py-20 md:py-24 border-t border-[var(--color-line)] overflow-hidden"
    >
      <motion.div
        style={{ y, scale }}
        className="text-center flex flex-col items-center"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          {t.contact.eyebrow}
        </span>

        <h2 className="mt-6 font-light tracking-tighter leading-[1.1] text-[12vw] md:text-[8vw]">
          <span className="block">{t.contact.line1}</span>
          <span className="block italic font-serif text-[var(--color-fg-dim)]">
            {t.contact.line2}
          </span>
          <span className="block">{t.contact.line3}</span>
        </h2>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href="mailto:christian.pdesign004@gmail.com"
            data-cursor="view"
            className="inline-flex items-center gap-3 text-2xl md:text-3xl group"
          >
            <span className="link-underline">christian.pdesign004@gmail.com</span>
            <motion.span
              animate={{ rotate: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              ↗
            </motion.span>
          </a>

          <a
            href="https://wa.me/51935591975"
            target="_blank"
            rel="noopener"
            data-cursor="link"
            className="inline-flex items-center gap-3 text-lg md:text-xl text-[var(--color-fg-dim)] hover:text-[var(--color-fg)] transition-colors duration-300 group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
              className="size-5 md:size-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
            <span className="link-underline">+51 935 591 975</span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl text-left">
          <div className="border-t border-[var(--color-line)] pt-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">
              {t.contact.labels.availability}
            </div>
            <div className="mt-2 text-lg">{t.contact.labels.availabilityValue}</div>
          </div>
          <div className="border-t border-[var(--color-line)] pt-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">
              {t.contact.labels.engagements}
            </div>
            <div className="mt-2 text-lg">{t.contact.labels.engagementsValue}</div>
          </div>
          <div className="border-t border-[var(--color-line)] pt-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">
              {t.contact.labels.response}
            </div>
            <div className="mt-2 text-lg">{t.contact.labels.responseValue}</div>
          </div>
        </div>
      </motion.div>

      <div className="relative mt-10 md:mt-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div>
          <div className="text-5xl md:text-7xl font-light tracking-tighter leading-none">
            CL<span className="text-[var(--color-accent)]">.</span>
          </div>
          <p className="mt-6 max-w-sm text-[var(--color-fg-dim)] text-sm">
            {t.footer.tagline}
          </p>
        </div>

        <div className="md:text-right">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)] mb-4">
            {t.footer.elsewhere}
          </div>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  data-cursor="link"
                  className="link-underline text-base"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
