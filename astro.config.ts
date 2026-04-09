import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import { DEFAULT_LOCALE, LOCALES } from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site: "https://femphilic.com",
  prefetch: {
    prefetchAll: true,
  },
  output: "static",
  fonts: [
    {
      name: "Kiwi Maru",
      cssVariable: "--font-kiwi-maru",
      provider: fontProviders.google(),
      fallbacks: ["sans-serif"],
      optimizedFallbacks: true,
      weights: [300, 400, 500],
      display: "swap",
      subsets: ["latin", "japanese"],
    },
  ],
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },
  integrations: [
    markdoc(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: LOCALES.reduce(
          (acc, locale) => ({
            ...acc,
            [locale]: locale,
          }),
          {},
        ),
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss() as any],
  },
  trailingSlash: "never",
  adapter: cloudflare({
    imageService: "compile",
  }),
});
