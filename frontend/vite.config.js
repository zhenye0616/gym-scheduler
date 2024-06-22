/* eslint-disable no-undef */

import { defineConfig, loadEnv } from "vite";

import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: "Gym App",
          short_name: "Gym App",
          theme_color: "#000000",
        },
      }),
    ],
  });
};
