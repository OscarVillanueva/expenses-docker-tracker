// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: "Raleway",
      cssVariable: "--font-raleway"
    }]
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],
  server: {
    host: "0.0.0.0" 
  },
  adapter: node({
    mode: "standalone"
  })
});
