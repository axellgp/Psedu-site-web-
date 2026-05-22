import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
    },
    server: {
      host: true,
      port: 5173
    }
  }

  // Ajouter le base path seulement pour la production (GitHub Pages)
  if (command === 'build') {
    config.base = '/Psedu-site-web-/'
  }

  return config
})
