// vite.config.js - Clean configuration for AWS Amplify only
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// Force Rollup to not use native modules
process.env.ROLLUP_NO_NATIVE = '1'

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
    // Use esbuild for faster builds and avoid Rollup native module issues
    minify: 'esbuild',
    rollupOptions: {
      // Exclude the problematic native module completely
      external: ['@rollup/rollup-linux-x64-gnu'],
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
