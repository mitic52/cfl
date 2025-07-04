import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["405d-2a06-63c5-8e0b-6b00-1551-3a3b-7ef9-7c8.ngrok-free.app"],
  },
});
