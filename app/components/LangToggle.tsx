"use client";

import { motion } from "motion/react";
import { useLanguage } from "../lib/language";

export default function LangToggle({ size = "md" }: { size?: "sm" | "md" }) {
  const { lang, toggle } = useLanguage();
  const isEn = lang === "en";

  return (
    <button
      onClick={toggle}
      data-cursor="link"
      aria-label={`Switch language to ${isEn ? "Spanish" : "English"}`}
      className={`relative inline-flex items-center rounded-full border border-[var(--color-line)] overflow-hidden select-none ${
        size === "sm" ? "text-[10px]" : "text-[11px]"
      }`}
    >
      <motion.span
        layout
        transition={{ type: "spring", damping: 24, stiffness: 260 }}
        className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-[var(--color-accent)] ${
          isEn ? "left-0.5" : "left-[calc(50%)]"
        }`}
        aria-hidden
      />
      <span
        className={`relative z-10 px-3 py-1.5 font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
          isEn ? "text-black" : "text-[var(--color-fg-dim)]"
        }`}
      >
        EN
      </span>
      <span
        className={`relative z-10 px-3 py-1.5 font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
          !isEn ? "text-black" : "text-[var(--color-fg-dim)]"
        }`}
      >
        ES
      </span>
    </button>
  );
}
