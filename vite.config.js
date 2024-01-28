import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ],
  },
  // ...

  server: {
    port: 3000,
    proxy: {
      "/api": { target: "https://truthgate-backend.vercel.app" },
      https: true,
      changeOrigin: true,
      secure: false,
      ws: false
    },
    '^/fallback/.*': {
      target: 'https://truthgate-backend.vercel.app',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/fallback/, '')
    },
  },

})
