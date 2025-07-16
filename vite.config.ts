import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/FindTheTracktor/",   // 👈 wichtig für GitHub Pages
  root: 'src',                 // 👈 dein Projekt startet in src/
  plugins: [react()],
  build: {
    outDir: '../dist',         // 👈 das Output-Verzeichnis (außerhalb src)
    emptyOutDir: true
  }
})
