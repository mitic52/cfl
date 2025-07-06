import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["fa7d-2a06-63c5-8e0b-6b00-b540-7964-21b1-bb22.ngrok-free.app"],
  },
});
