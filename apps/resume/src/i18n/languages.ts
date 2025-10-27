/**
 * Supported languages configuration for the resume project
 */
export const supportedLanguages = ["ko", "en"] as const;
export const defaultLanguage = "ko";

export type SupportedLanguage = (typeof supportedLanguages)[number];
