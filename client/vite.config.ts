import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: mode === 'development' ? {
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
      },
    } : undefined, // No proxy in production
  },
  css: {
    postcss: './postcss.config.js',
  },
  plugins: [react()],
}));