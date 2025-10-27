import type { AstroIntegration } from "astro";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

export interface GenerateServiceWorkerOptions {
  /**
   * Path to the i18n languages file containing supportedLanguages
   * @default "src/i18n/languages.ts"
   */
  i18nConfigPath?: string;
  /**
   * Path to the service worker template file
   * @default "public/sw.template.js"
   */
  templatePath?: string;
  /**
   * Path where the generated service worker should be written
   * @default "public/sw.js"
   */
  outputPath?: string;
}

/**
 * Astro integration that generates service worker before dev/build
 */
export function generateServiceWorker(
  options: GenerateServiceWorkerOptions = {}
): AstroIntegration {
  return {
    name: "generate-service-worker",
    hooks: {
      "astro:config:setup": () => {
        generateSW(options);
      },
    },
  };
}

function generateSW(options: GenerateServiceWorkerOptions) {
  const cwd = process.cwd();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const i18nConfigPath = resolve(
    cwd,
    options.i18nConfigPath || "src/i18n/languages.ts"
  );
  // Use package's template by default
  const defaultTemplatePath = resolve(__dirname, "../templates/sw.template.js");
  const templatePath = options.templatePath
    ? resolve(cwd, options.templatePath)
    : defaultTemplatePath;
  const outputPath = resolve(cwd, options.outputPath || "public/sw.js");

  // Read supported languages from i18n config
  const configContent = readFileSync(i18nConfigPath, "utf-8");

  // Extract supportedLanguages array from the config
  const match = configContent.match(
    /export const supportedLanguages = \[(.*?)\]/s
  );
  if (!match) {
    throw new Error("Could not find supportedLanguages in languages.ts");
  }

  // Parse the languages (remove quotes and whitespace)
  const languagesStr = match[1];
  const languages: string[] = languagesStr
    .split(",")
    .map((lang) => lang.trim().replace(/["']/g, ""))
    .filter(Boolean);

  // Read the template
  const template = readFileSync(templatePath, "utf-8");

  // Generate OFFLINE_URLS array
  const offlineUrls = languages.flatMap((lang) => [
    `/${lang}/offline`,
    `/${lang}/offline/`,
  ]);

  // Generate language regex pattern for matching (e.g., "en|ko")
  const langPattern = languages.join("|");

  // Generate fallback URLs array
  const fallbackUrls = languages.flatMap((lang) => [
    `/${lang}/offline/`,
    `/${lang}/offline`,
  ]);

  // Replace placeholders in template
  let output = template
    .replace("__OFFLINE_URLS__", JSON.stringify(offlineUrls, null, 2))
    .replace("__LANG_PATTERN__", langPattern)
    .replace("__FALLBACK_URLS__", JSON.stringify(fallbackUrls, null, 2));

  // Write the generated service worker
  writeFileSync(outputPath, output, "utf-8");
}
