// @ts-check

import { defineEcConfig } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export default defineEcConfig({
  themes: ["dracula", "solarized-light"],
  themeCssSelector: theme => {
    const type = theme.type === "dark" ? "dark" : "light";
    return `[data-theme="${type}"]`;
  },
  shiki: {
    bundledLangs: ["astro", "sass", "typescript", "css", "html", "bash", "javascript"],
  },
  plugins: [pluginLineNumbers()],
});
