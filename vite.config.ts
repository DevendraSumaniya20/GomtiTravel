import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Two pages: the public site and the admin.
export default defineConfig({
  // relative asset paths, so the build works at a domain root and under a path such as GitHub Pages' /GomtiTravel/
  base: './',
  plugins: [react()],
  build: { rolldownOptions: { input: ['index.html', 'admin.html'] } },
})
