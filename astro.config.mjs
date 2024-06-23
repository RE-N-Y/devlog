import { defineConfig, squooshImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import rehypeKatex from "rehype-katex"
import remarkMath from 'remark-math';


// https://astro.build/config
export default defineConfig({
  site: 'https://nyre.github.io',
  base: '/devlog',
  image: {
    service: squooshImageService(),
  },
  integrations: [
    mdx({ rehypePlugins: [rehypeKatex], remarkPlugins: [remarkMath]}),
    sitemap(), 
    tailwind({config: { applyBaseStyles: false }}), 
  ]
});