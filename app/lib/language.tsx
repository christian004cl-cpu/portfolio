"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { translations, type Lang, type Translation } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Translation;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "cl-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as Lang | null)
      : null;
    if (saved === "en" || saved === "es") {
      setLangState(saved);
      return;
    }
    if (typeof navigator !== "undefined" && navigator.language?.startsWith("es")) {
      setLangState("es");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((l) => (l === "en" ? "es" : "en")),
    [],
  );

  const value: Ctx = {
    lang,
    setLang,
    toggle,
    t: translations[lang] as Translation,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
