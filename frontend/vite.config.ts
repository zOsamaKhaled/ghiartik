import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "0.0.0.0",
      "lobeliaceous-braylon-unloafing.ngrok-free.dev", // <-- ضيف هنا الرابط اللي ngrok اعطاه
    ],
  },
});
