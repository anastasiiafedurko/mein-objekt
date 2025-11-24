import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { VitePWA, type ManifestOptions } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> | false = {
  theme_color: "#8936FF",
  background_color: "#2EC6FE",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru",
  name: "Mein Objekt – Museum Client",
  short_name: "Mein Objekt",
};

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html, css, js, ico, png, svg}"],
      },
      manifest: manifest,
    }),
  ],
  server: {
    host: true,
    https: {
      cert: "./node_modules/vite-plugin-mkcert/certs/cert.pem",
      key: "./node_modules/vite-plugin-mkcert/certs/key.pem",
    },
    hmr: false,
  },
});
