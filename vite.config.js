import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import taiwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), taiwindcss()],
});
