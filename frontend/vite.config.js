import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      //'/api':'http://localhost:5050'
      '/api':{
        target: 'https://organizemi-v1-server.onrender.com',
        //target: 'http://localhost:5050',
        changeOrigin: true
      }
    },
  },
  plugins: [react()],
})
