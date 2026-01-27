import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(
    {
      svgrOptions: {
        exportType: 'default',  // garante que exporta como default
        ref: true,              // permite usar como ref
        svgo: false,            // desabilita otimizações que podem quebrar
        titleProp: true         // permite <title> nos SVGs
      }
    }
  )],
  server: {
    watch: {
      ignored: ['**/data/**']
    }
  }
})
