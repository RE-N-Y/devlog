import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import rehypeKatex from "rehype-katex";
import remarkMath from 'remark-math';
import partytown from "@astrojs/partytown";

import playformCompress from "@playform/compress";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://re-n-y.github.io/',
  base: '/devlog',
  integrations: [mdx({
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath]
  }), sitemap(), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), partytown(), playformCompress({ CSS: true, Image:true }), react()]
});