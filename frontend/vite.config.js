// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
    proxy: {
      '/api': {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
    rollupOptions: {
      // Handle Rollup native module issues on Vercel and AWS Amplify
      external: (process.env.VERCEL || process.env.AWS_AMPLIFY || process.env.CI) ? ['@rollup/rollup-linux-x64-gnu'] : [],
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: [
            'lucide-react',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
          ],
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
  // Force disable native Rollup on cloud platforms
  define: {
    __VERCEL__: JSON.stringify(process.env.VERCEL === '1'),
    __AWS_AMPLIFY__: JSON.stringify(process.env.AWS_AMPLIFY === 'true'),
    __CI__: JSON.stringify(process.env.CI === 'true'),
  },
}))
