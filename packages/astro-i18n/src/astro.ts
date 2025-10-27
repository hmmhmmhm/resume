import type { AstroGlobal } from "astro";
import { createI18nInstance } from "./config";

/**
 * Initialize i18n in Astro pages and return translation function.
 * @param Astro - Astro global object
 * @param config - Configuration object with translations, supported languages, and default language
 * @returns { language: string, t: TFunction }
 */
export function initI18n(
  Astro: Readonly<AstroGlobal>,
  config: {
    translations: Record<string, any>;
    defaultLanguage: string;
  }
) {
  // Get language from Astro.locals
  const language = Astro.locals.language || config.defaultLanguage;

  // Create i18next instance
  const i18n = createI18nInstance(language, config.translations, config.defaultLanguage);
  const t = i18n.t.bind(i18n);

  return { language, t };
}
