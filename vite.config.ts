import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Two pages: the public site and the admin.
export default defineConfig({
  plugins: [react()],
  build: { rolldownOptions: { input: ['index.html', 'admin.html'] } },
})
