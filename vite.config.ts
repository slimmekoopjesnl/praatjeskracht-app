import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for the sleep ritual app. This config enables the React
// plugin and sets up the build directory. Environment variables beginning with
// VITE_ are loaded from .env at the project root.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
})
