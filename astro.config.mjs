import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from "rehype-katex";
import remarkMath from 'remark-math';
import partytown from "@astrojs/partytown";

import playformCompress from "@playform/compress";

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://re-n-y.github.io/',
  base: '/devlog',

  image: {
    service: passthroughImageService(),
  },

  integrations: [
    mdx({
      rehypePlugins: [rehypeKatex],
      remarkPlugins: [remarkMath]
    }), sitemap(), 
    partytown(), 
    playformCompress({ CSS: true, Image:true }), 
    react({
      experimentalReactChildren: true,
    })
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});