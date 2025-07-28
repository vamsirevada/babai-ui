// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://bug-saving-frog.ngrok-free.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    svgr({
      svgo: true,
      svgoConfig: {
        plugins: [{ removeViewBox: false }, { removeDimensions: true }],
      },
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}))
