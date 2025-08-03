// vite.config.js - Production Optimized for AWS Amplify
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// Force Rollup to not use native modules
process.env.ROLLUP_NO_NATIVE = '1'
process.env.ESBUILD_BINARY_PATH = ''

export default defineConfig({
  server: {
    host: '::',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    target: 'es2020',
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Disable source maps for production
    minify: 'esbuild',
    // Production optimizations
    cssCodeSplit: true,
    reportCompressedSize: false,
    emptyOutDir: true,
    rollupOptions: {
      // Aggressively exclude Rollup native modules
      external: [
        '@rollup/rollup-linux-x64-gnu',
        '@rollup/rollup-win32-x64-msvc',
        '@rollup/rollup-darwin-x64',
        '@rollup/rollup-darwin-arm64',
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
        },
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
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Force disable native modules in client-side code too
    __ROLLUP_NO_NATIVE__: true,
  },
})
