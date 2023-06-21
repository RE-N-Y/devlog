import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import rehypeKatex from "rehype-katex"
import remarkMath from 'remark-math';

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://nyre.github.io',
  base: '/devlog',
  integrations: [
    mdx({ remarkPlugins: [remarkMath], rehypePlugins:[rehypeKatex] }), 
    sitemap(), 
    tailwind({config: { applyBaseStyles: false }}), 
    image()
  ]
});