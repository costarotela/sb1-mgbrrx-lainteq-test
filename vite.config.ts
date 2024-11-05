import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['animejs'],
          'ui-components': ['lucide-react'],
          'pdf': ['jspdf']
        }
      }
    },
    chunkSizeWarningLimit: 500
  }
});