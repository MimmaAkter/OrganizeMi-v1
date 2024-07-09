import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      //'/api':'http://localhost:5050'
      '/api':'https://organizemi-v1-server.onrender.com'
    },
  },
  plugins: [react()],
})
