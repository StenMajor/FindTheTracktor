import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'src',
  base: '/FindTheTracktor/',
  plugins: [react()],
  build: {
    outDir: '../dist', // wichtig für Deploy!
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
