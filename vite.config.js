import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/trendhop",
  server: {
    port: 4000, // Set port to 4000
  },
});
