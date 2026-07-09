import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.obj', '**/*.webp'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('node_modules/three/examples')) return 'three-examples';
          if (normalizedId.includes('node_modules/three/src/renderers')) return 'three-renderers';
          if (normalizedId.includes('node_modules/three/src')) return 'three-core';
          if (normalizedId.includes('node_modules/three')) return 'three-vendor';
        }
      }
    },
    chunkSizeWarningLimit: 560
  },
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
});
