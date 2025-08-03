// vite.config.safe.js - Safe config for AWS Amplify with no Rollup native modules
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  server: {
    host: '::',
    port: 8080,
  },
  build: {
    outDir: 'dist',
    target: 'es2020',
    minify: 'esbuild', // Use esbuild instead of terser
    chunkSizeWarningLimit: 1000,
    // Minimal Rollup config to avoid native modules
    rollupOptions: {
      output: {
        format: 'es',
        // Disable chunking to avoid complex Rollup operations
        manualChunks: undefined,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  define: {
    __AWS_AMPLIFY__: 'true',
  },
})
