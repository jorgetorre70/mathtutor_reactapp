import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_GPT_API": JSON.stringify(process.env.VITE_GPT_API),
    "process.env.VITE_ASSISTANT_API": JSON.stringify(
      process.env.VITE_ASSISTANT_API
    ),
  },
  build: {
    sourcemap: true,
    outDir: "dist",
  },
});
