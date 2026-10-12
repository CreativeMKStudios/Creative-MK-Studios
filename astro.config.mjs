import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { siteUrl } from "./site.config.mjs";

const priorityByPath = {
  "/": 1,
  "/web-design-milton-keynes": 0.9,
  "/web-design-bedfordshire": 0.9,
  "/pricing": 0.8,
  "/contact": 0.8,
  "/about": 0.7,
  "/privacy": 0.3,
};

export default defineConfig({
  site: siteUrl,
  trailingSlash: "never",
  compressHTML: true,
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
  build: {
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, "") || "/";
        item.priority = priorityByPath[path] ?? 0.5;
        item.changefreq = path === "/privacy" ? "yearly" : "monthly";
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
