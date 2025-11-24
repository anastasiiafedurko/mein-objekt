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
};

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: "autoUpdate",
      manifest,
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        runtimeCaching: [
          {
            urlPattern: /^\/images\/.*\.(png|jpg|jpeg|svg|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30 днів
            },
          },
          {
            urlPattern: /^\/.*\.json$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "json-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 }, // 1 день
            },
          },
          {
            urlPattern: /^\/.*\.js$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "js-cache",
            },
          },
          {
            urlPattern: /^\/.*\.css$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "css-cache",
            },
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
