import type { AstroGlobal } from "astro";
import { initI18n as baseInitI18n } from "@repo/astro-i18n/astro";
import { defaultLanguage } from "./languages";
import koTranslations from "./locales/ko.json";

/**
 * Initialize i18n for wiki project
 * This wraps the base initI18n with project-specific translations
 */
export function initI18n(Astro: Readonly<AstroGlobal>) {
  const translations = {
    ko: { translation: koTranslations },
  };

  return baseInitI18n(Astro, {
    translations,
    defaultLanguage,
  });
}

// Re-export language configuration
export { supportedLanguages, defaultLanguage } from "./languages";
export type { SupportedLanguage } from "./languages";

// Re-export helpers
export { extractLogoTranslations } from "@repo/astro-i18n/helpers";
