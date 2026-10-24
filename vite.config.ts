import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/')
          if (!moduleId.includes('/node_modules/')) return
          if (moduleId.includes('/framer-motion/') || moduleId.includes('/motion-dom/') || moduleId.includes('/motion-utils/')) return 'motion'
          if (moduleId.includes('/gsap/')) return 'gsap'
          if (moduleId.includes('/lenis/')) return 'lenis'
          if (moduleId.includes('/lucide-react/')) return 'icons'
          if (moduleId.includes('/react/') || moduleId.includes('/react-dom/') || moduleId.includes('/scheduler/')) return 'react'
        },
      },
    },
  },
})
