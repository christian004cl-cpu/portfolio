"use client";

import { useLanguage } from "../lib/language";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/christian-linaresui" },
  { label: "Dribbble", href: "https://dribbble.com/christianUI_UX" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-[var(--color-line)] px-6 md:px-10 pt-16 pb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-fg-dim)]">
            {t.footer.index}
          </div>
          <div className="mt-6 text-5xl md:text-7xl font-light tracking-tighter leading-none">
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

      <div className="mt-20 mb-6">
        <div
          aria-hidden
          className="font-light text-[24vw] md:text-[18vw] leading-[0.8] tracking-tighter -mb-6"
        >
          CHRISTIAN<span className="text-[var(--color-accent)]">.</span>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-[var(--color-line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
        <div>{t.footer.copy}</div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          {t.footer.availability}
        </div>
        <a href="#hero" data-cursor="link" className="link-underline">
          {t.footer.back}
        </a>
      </div>
    </footer>
  );
}
