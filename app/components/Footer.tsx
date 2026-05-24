"use client";

import { useLanguage } from "../lib/language";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative px-6 md:px-10 pt-6 pb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
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
