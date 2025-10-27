import type { TFunction } from "i18next";

/**
 * Helper functions to extract translations for client:load components
 *
 * These helpers extract only translated strings from SSR and pass them to the client.
 * This prevents all language JSON files from being included in the client bundle.
 */

/**
 * Extract translations for LogoDownload component
 */
export function extractLogoTranslations(t: TFunction) {
  return {
    title: t("logo.title"),
    transparentSvg: {
      title: t("logo.transparentSvg.title"),
      description: t("logo.transparentSvg.description"),
      button: t("logo.transparentSvg.button"),
    },
    iconSvg: {
      title: t("logo.iconSvg.title"),
      description: t("logo.iconSvg.description"),
      button: t("logo.iconSvg.button"),
    },
  };
}

/**
 * Example translation extraction function for future components
 *
 * export function extractMyComponentTranslations(t: TFunction) {
 *   return {
 *     title: t("myComponent.title"),
 *     description: t("myComponent.description"),
 *     // ... extract only necessary keys
 *   };
 * }
 */
