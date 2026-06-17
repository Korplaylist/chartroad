import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://chartroad.pages.dev",
  output: "static",
  integrations: [sitemap()],
});
