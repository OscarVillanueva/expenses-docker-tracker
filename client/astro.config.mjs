// @ts-check
import { defineConfig, fontProviders, envField } from 'astro/config';

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
  env: {
    schema: {
      API_KEY: envField.string({ context: "server", access: "secret" }) 
    }
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
