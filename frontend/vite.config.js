import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
<<<<<<< HEAD
      //'/api':'http://localhost:5050'
      '/api':{
        //target: 'https://organizemi-v1-server.onrender.com',
        target: 'http://localhost:5050',
        changeOrigin: true
      }
=======
      '/api':{
        target:'https://organizemi-v1-server.onrender.com',
        changeOrigin:true
      } 
>>>>>>> 853108177d51fb0705c5ff04d240800a95dabadd
    },
  },
  plugins: [react()],
})
