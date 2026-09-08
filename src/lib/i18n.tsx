import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { messages, type MessageKey } from "@/i18n/ui";

export type Locale = "es" | "en" | "pt" | "ja" | "zh" | "hi" | "ar" | "fr" | "de" | "ru";

export interface LocaleMeta {
  code: Locale;
  label: string;
  flag: string;
  dir: "ltr" | "rtl";
  htmlLang: string;
}

/** Las 10 lenguas soportadas. Español, inglés, portugués y japonés son fijos. */
export const LOCALES: LocaleMeta[] = [
  { code: "es", label: "Español", flag: "🇪🇸", dir: "ltr", htmlLang: "es" },
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr", htmlLang: "en" },
  { code: "pt", label: "Português", flag: "🇵🇹", dir: "ltr", htmlLang: "pt" },
  { code: "ja", label: "日本語", flag: "🇯🇵", dir: "ltr", htmlLang: "ja" },
  { code: "zh", label: "中文", flag: "🇨🇳", dir: "ltr", htmlLang: "zh" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳", dir: "ltr", htmlLang: "hi" },
  { code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl", htmlLang: "ar" },
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr", htmlLang: "fr" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", dir: "ltr", htmlLang: "de" },
  { code: "ru", label: "Русский", flag: "🇷🇺", dir: "ltr", htmlLang: "ru" },
];

export const DEFAULT_LOCALE: Locale = "es";
const STORAGE_KEY = "aiforge-lang";

const codes = new Set(LOCALES.map((l) => l.code));

/** Mapea región → idioma para visitantes cuyo navegador no coincide con los soportados. */
const REGION_TO_LOCALE: Record<string, Locale> = {
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es", UY: "es", EC: "es",
  BR: "pt", PT: "pt", AO: "pt",
  JP: "ja", CN: "zh", TW: "zh", HK: "zh", SG: "zh",
  IN: "hi", SA: "ar", AE: "ar", EG: "ar", MA: "ar", QA: "ar", DZ: "ar",
  FR: "fr", BE: "fr", CA: "fr", CH: "de", DE: "de", AT: "de",
  RU: "ru", BY: "ru", KZ: "ru",
  US: "en", GB: "en", IE: "en", AU: "en", NZ: "en",
};

/** Detecta el idioma del visitante a partir del navegador y, si falla, de su zona horaria. */
export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  for (const raw of candidates) {
    const [lang, region] = raw.toLowerCase().split("-");
    if (lang && codes.has(lang as Locale)) return lang as Locale;
    if (region && REGION_TO_LOCALE[region.toUpperCase()]) return REGION_TO_LOCALE[region.toUpperCase()]!;
  }
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (/Tokyo/.test(tz)) return "ja";
    if (/Shanghai|Hong_Kong|Taipei/.test(tz)) return "zh";
    if (/Kolkata|Calcutta/.test(tz)) return "hi";
    if (/Riyadh|Dubai|Cairo/.test(tz)) return "ar";
    if (/Sao_Paulo|Lisbon/.test(tz)) return "pt";
    if (/Paris/.test(tz)) return "fr";
    if (/Berlin|Vienna|Zurich/.test(tz)) return "de";
    if (/Moscow/.test(tz)) return "ru";
    if (/Madrid|Mexico_City|Bogota|Buenos_Aires|Santiago|Lima/.test(tz)) return "es";
    if (/New_York|Chicago|Denver|Los_Angeles|London|Dublin|Sydney/.test(tz)) return "en";
  } catch {
    /* noop */
  }
  return DEFAULT_LOCALE;
}

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  meta: LocaleMeta;
}

const I18nContext = createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key) => messages[DEFAULT_LOCALE][key] ?? key,
  meta: LOCALES[0]!,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    const next = stored && codes.has(stored) ? stored : detectLocale();
    setLocaleState(next);
  }, []);

  useEffect(() => {
    const meta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;
    document.documentElement.lang = meta.htmlLang;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const value = useMemo<I18nValue>(() => {
    const meta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;
    return {
      locale,
      meta,
      setLocale: (l: Locale) => {
        setLocaleState(l);
        try {
          window.localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* noop */
        }
      },
      t: (key, vars) => {
        let text = messages[locale]?.[key] ?? messages[DEFAULT_LOCALE][key] ?? key;
        if (vars) for (const [k, v] of Object.entries(vars)) text = text.replace(`{${k}}`, String(v));
        return text;
      },
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
