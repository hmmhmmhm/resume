// @ts-check
import { defineConfig } from "astro/config";
import { preactIntegration } from "@repo/astro-preact/integration";
import tailwindcss from "@repo/astro-tailwind/vite";
import cloudflare from "@astrojs/cloudflare";
import { excludePublicFiles } from "@repo/astro-pwa/vite-plugin";
import { generateServiceWorker } from "@repo/astro-pwa/integration";

/** @typedef {import('vite').PluginOption} PluginOption */

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "ko",
    locales: ["ko"],
    routing: {
      prefixDefaultLocale: true, // Also accessible via /en/
      redirectToDefaultLocale: false,
    },
  },
  integrations: [generateServiceWorker(), preactIntegration()],
  output: "server",
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: true,
    },
  }),
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [
      /** @type {PluginOption} */ (tailwindcss()),
      /** @type {PluginOption} */ (excludePublicFiles(["sw.template.js"])),
    ],
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },
    css: {
      transformer: "postcss",
    },
    assetsInclude: ["**/*.wasm"],
    ssr: {
      external: ["buffer", "path", "fs", "sharp"].map((i) => (i === "sharp" ? i : `node:${i}`)),
      noExternal: ["workers-og", "@supabase/supabase-js", "framer-motion"],
    },
    optimizeDeps: {
      exclude: ["sharp"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate lucide icons into their own chunk for better caching
            'lucide': ['lucide-preact'],
          },
        },
      },
    },
    define: {
      "import.meta.env.PUBLIC_SUPABASE_URL": JSON.stringify(process.env.PUBLIC_SUPABASE_URL),
      "import.meta.env.PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(
        process.env.PUBLIC_SUPABASE_ANON_KEY
      ),
      "import.meta.env.SUPABASE_SERVICE_ROLE_KEY": JSON.stringify(
        process.env.SUPABASE_SERVICE_ROLE_KEY
      ),
    },
  },
});
