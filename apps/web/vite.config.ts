import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      // Resolve workspace packages from their TypeScript source in dev
      '@lord-of-the-ipsum/core': path.resolve(root, 'packages/core/src/index.ts'),
      '@lord-of-the-ipsum/datasets/en': path.resolve(root, 'packages/datasets/src/en/index.ts'),
      '@lord-of-the-ipsum/datasets/pt-br': path.resolve(root, 'packages/datasets/src/pt-br/index.ts'),
      '@lord-of-the-ipsum/datasets/de': path.resolve(root, 'packages/datasets/src/de/index.ts'),
      '@lord-of-the-ipsum/datasets/es': path.resolve(root, 'packages/datasets/src/es/index.ts'),
      '@lord-of-the-ipsum/datasets': path.resolve(root, 'packages/datasets/src/index.ts'),
    },
  },
})
