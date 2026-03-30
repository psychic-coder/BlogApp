import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      //we are making a proxy,if we have an api, then it will show the below mentioned rest of the value before as in this case its 'api'
      //restart the server after making the changes 
       '/api':{
        target:'http://localhost:5000',
        secure:false,
        changeOrigin:true
       },
    },
  }, 
  plugins: [react()],
})
