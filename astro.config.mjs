import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import million from "million/compiler";
import vue from "@astrojs/vue";
import AutoImport from 'unplugin-auto-import/astro';
import { svelte as Svelte } from '@sveltejs/vite-plugin-svelte';
import Inspect from 'vite-plugin-inspect';
import bun from 'astro-bun';
import node from "@astrojs/node";
import TurboConsole from 'unplugin-turbo-console/astro';
// https://astro.build/config
export default defineConfig({
  site: 'https://fen4ik.vercel.app/',
  output: 'hybrid',
  adapter: bun({}),
  vite: {
    plugins: [Svelte(), Inspect(), million.vite({
      mode: "react",
      server: true,
      auto: {
        threshold: 0.05,
        skip: ["useBadHook", /badVariable/g]
      }
    })]
  },
  integrations: [mdx(), TurboConsole(), sitemap(), vue({
    reactivityTransform: true
  }), svelte(), react(), AutoImport({
    imports: ['vue', 'vue/macros', 'svelte', 'svelte/store', 'react'],
    dts: './src/auto-imports.d.ts'
  })]
});
// Write here your website url