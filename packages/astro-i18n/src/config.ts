import i18next from "i18next";

/**
 * Create i18next instance for SSR usage
 * @param language - Current language code
 * @param resources - Translation resources object
 * @param defaultLanguage - Default fallback language
 * @returns Initialized i18next instance
 */
export function createI18nInstance(
  language: string,
  resources: Record<string, any>,
  defaultLanguage: string = "en"
) {
  const instance = i18next.createInstance();

  instance.init({
    lng: language,
    fallbackLng: defaultLanguage,
    resources,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

  return instance;
}

/**
 * Check if language is supported
 * @param lang - Language code to check
 * @param supportedLanguages - Array of supported language codes
 * @returns True if language is supported
 */
export function isSupportedLanguage(
  lang: string,
  supportedLanguages: readonly string[]
): boolean {
  return supportedLanguages.includes(lang);
}
