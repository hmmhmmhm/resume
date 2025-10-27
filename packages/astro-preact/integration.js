import preact from "@astrojs/preact";

/**
 * Astro Preact integration with React compatibility
 * @param {import('@astrojs/preact').Options} [options]
 * @returns {import('astro').AstroIntegration}
 */
export function preactIntegration(options = {}) {
  return preact({
    compat: true,
    ...options,
  });
}
