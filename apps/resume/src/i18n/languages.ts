/**
 * Supported languages configuration for the wiki project
 */
export const supportedLanguages = ["ko"] as const;
export const defaultLanguage = "ko";

export type SupportedLanguage = (typeof supportedLanguages)[number];
