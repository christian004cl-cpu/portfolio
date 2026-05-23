"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLanguage } from "../lib/language";

export default function Loader() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 1900;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[var(--color-bg)]"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-x-0 top-6 flex items-center justify-between px-6 text-[11px] uppercase tracking-[0.16em] text-[var(--color-fg-dim)]">
            <span>Christian Linares</span>
            <span>{t.loader.caption}</span>
          </div>

          <motion.div
            className="flex items-baseline gap-2 font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[18vw] leading-none font-light tracking-tighter">
              {String(progress).padStart(3, "0")}
            </span>
            <span className="text-2xl text-[var(--color-fg-dim)]">%</span>
          </motion.div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60vw] max-w-md">
            <div className="h-px w-full bg-[var(--color-line)] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-dim)]">
              <span>{t.loader.status}</span>
              <span className="blink">●</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
