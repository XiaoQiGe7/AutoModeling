import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base:'./',
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") }
    ]
  },
  server: {
    host: "localhost",
    port: "6998",
    open: true,
    // proxy: {
    //   '/api': {
    //     // target: "http://localhost:80/",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/api/, '')
    //   }
    // }
  },
})
