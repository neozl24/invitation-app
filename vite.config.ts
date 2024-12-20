/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      exclude: [
        './*.config.{js,ts}',
        'dist',
        './src/main.tsx',
        './src/vite-env.d.ts'
      ]
    }
  },
})
