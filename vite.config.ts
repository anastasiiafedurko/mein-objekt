import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import { VitePWA, type ManifestOptions } from "vite-plugin-pwa";
import path from "path";

const manifest: Partial<ManifestOptions> = {
  name: "Mein Objekt - Museum Client",
  short_name: "Mein Objekt",
  lang: "ru",
  display: "standalone",
  orientation: "any",
  theme_color: "#8936FF",
  background_color: "#2EC6FE",
  icons: [
    {
      src: "icon512_maskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "icon512_rounded.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
  ],
};

export default defineConfig({
  plugins: [
    react(),
    mkcert(),

    VitePWA({
      registerType: "autoUpdate",
      manifest,
      includeAssets: ["images/*"],

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,svg,ico,png,jpg,jpeg,webp}",
          "images/*",
        ],

        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/images/"),
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },

          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
            },
          },

          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "NetworkFirst",
            options: { cacheName: "js-cache" },
          },

          {
            urlPattern: ({ request }) => request.destination === "style",
            handler: "NetworkFirst",
            options: { cacheName: "css-cache" },
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@dummyData": path.resolve(__dirname, "src/dummyData"),
    },
  },

  server: {
    host: true,
    https: {
      cert: "./node_modules/vite-plugin-mkcert/certs/cert.pem",
      key: "./node_modules/vite-plugin-mkcert/certs/key.pem",
    },
    hmr: false,
  },
});
