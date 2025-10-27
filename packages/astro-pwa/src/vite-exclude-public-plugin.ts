import type { Plugin } from "vite";
import { unlinkSync, existsSync } from "fs";
import { join } from "path";

/**
 * Vite plugin to exclude specific files from the public directory in the build output
 */
export function excludePublicFiles(filesToExclude: string[]): Plugin {
  return {
    name: "exclude-public-files",
    apply: "build",
    closeBundle() {
      // Remove excluded files from dist after build
      for (const file of filesToExclude) {
        const filePath = join(process.cwd(), "dist", file);
        if (existsSync(filePath)) unlinkSync(filePath);
      }
    },
  };
}
