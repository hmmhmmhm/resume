import { isSupportedLanguage } from "./config";

/**
 * Detect language from Accept-Language header.
 * @param acceptLanguageHeader - Accept-Language header value
 * @param supportedLanguages - Array of supported language codes
 * @param defaultLanguage - Default fallback language
 * @returns Detected language code
 */
export function detectLanguage(
  acceptLanguageHeader: string | null,
  supportedLanguages: readonly string[],
  defaultLanguage: string = "en"
): string {
  if (!acceptLanguageHeader) {
    return defaultLanguage;
  }

  // Parse Accept-Language header
  // Example: "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
  const languages = acceptLanguageHeader
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";");
      const quality = qValue ? parseFloat(qValue.split("=")[1]) : 1.0;
      // Remove region code from language code (e.g., ko-KR -> ko)
      const langCode = code.split("-")[0].toLowerCase();
      return { code: langCode, quality };
    })
    .sort((a, b) => b.quality - a.quality); // Sort by quality value

  // Find the highest priority language among supported languages
  for (const { code } of languages) {
    if (isSupportedLanguage(code, supportedLanguages)) {
      return code;
    }
  }

  return defaultLanguage;
}
