import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import image from "@astrojs/image";
import svelte from "@astrojs/svelte";
function defaultLayoutPlugin() {
  return function (tree, file) {
    file.data.astro.frontmatter.layout = "@layouts/BlogPost.astro";
  };
}
// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), tailwind(), image(), svelte()],
  markdown: {
    remarkPlugins: [defaultLayoutPlugin],
    extendDefaultPlugins: true
  }
});