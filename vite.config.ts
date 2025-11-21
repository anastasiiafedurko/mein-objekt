import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    host: true,
    https: {
      cert: "./node_modules/vite-plugin-mkcert/certs/cert.pem",
      key: "./node_modules/vite-plugin-mkcert/certs/key.pem",
    },
    hmr: false,
  },
});
