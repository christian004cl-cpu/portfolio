"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { useLanguage } from "../lib/language";
import LangToggle from "./LangToggle";
import { useLenis } from "./SmoothScroll";

// Apple-like easing curve for scroll: easeInOutCubic
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function Nav() {
  const { t } = useLanguage();
  const links = t.nav.links;
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!lenis || !href.startsWith("#")) return;
    const target =
      href === "#" || href === "#hero"
        ? 0
        : document.querySelector<HTMLElement>(href);
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target, {
      duration: 1.6,
      easing: easeInOutCubic,
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 -z-10 bg-[var(--color-bg)]/55 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <motion.div
          aria-hidden
          style={{ scaleX, transformOrigin: "0% 50%" }}
          className={`pointer-events-none absolute bottom-0 inset-x-0 h-[2px] bg-[#313131] transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <a
          href="#hero"
          onClick={(e) => onLinkClick(e, "#hero")}
          data-cursor="link"
          className="flex items-center gap-2 text-sm tracking-wider"
        >
          <span className="inline-block size-2 rounded-full bg-[var(--color-accent)]" />
          <span className="font-medium">Christian Linares</span>
          <span className="text-[var(--color-fg-dim)] hidden sm:inline">
            {t.nav.role}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => onLinkClick(e, l.href)}
              data-cursor="link"
              className="text-sm link-underline"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LangToggle />
          <button
            data-cursor="link"
            onClick={() => setOpen(true)}
            className="md:hidden flex flex-col gap-1.5"
            aria-label={t.nav.menu}
          >
            <span className="block h-px w-6 bg-[var(--color-fg)]" />
            <span className="block h-px w-6 bg-[var(--color-fg)]" />
          </button>
          <a
            href="#contact"
            onClick={(e) => onLinkClick(e, "#contact")}
            data-cursor="link"
            className="hidden md:inline-flex btn-magnetic"
          >
            {t.nav.cta}
          </a>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] bg-[var(--color-bg)]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="text-sm">{t.nav.menu}</span>
              <button
                data-cursor="link"
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.16em]"
              >
                {t.nav.close}
              </button>
            </div>
            <ul className="px-6 pt-10 space-y-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      setOpen(false);
                      onLinkClick(e, l.href);
                    }}
                    className="text-5xl font-light tracking-tight"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="px-6 pt-10">
              <LangToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
