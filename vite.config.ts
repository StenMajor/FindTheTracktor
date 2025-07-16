import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'src', // 👈 Vite startet im src-Ordner
  plugins: [react()],
  build: {
    outDir: '../dist',      // 👈 Output-Verzeichnis (außerhalb von src)
    emptyOutDir: true       // 👈 Löscht dist vorher
  }
})
