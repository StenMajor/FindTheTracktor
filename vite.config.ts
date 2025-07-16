import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'src',
  base: '/FindTheTracktor/', // <-- GitHub Pages URL-Präfix
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: '../dist', // <-- wichtig: relative zum root 'src'
    emptyOutDir: true
  }
})
