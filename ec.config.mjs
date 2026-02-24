// @ts-check

import { defineEcConfig } from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";

export default defineEcConfig({
  themes: ["kanagawa-wave", "kanagawa-lotus"],
  themeCssSelector: theme => {
    const type = theme.type === "dark" ? "dark" : "light";
    return `[data-theme="${type}"]`;
  },
  shiki: {
    bundledLangs: [
      "astro",
      "sass",
      "typescript",
      "css",
      "html",
      "bash",
      "javascript",
      "markdown",
      "mdx",
      "md",
    ],
  },
  plugins: [pluginLineNumbers()],
  styleOverrides: {
    codeFontFamily: `"JetBrains Mono" ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
    codeFontSize: "0.8125rem",
    codeLineHeight: "1.6",
  },
});
