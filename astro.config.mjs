// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://enkhee-Osiris.github.io",
  base: "/kanso",
  trailingSlash: "always",
  integrations: [expressiveCode(), mdx(), sitemap()],
  experimental: {
    svgo: true,
  },
});
