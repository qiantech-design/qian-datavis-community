import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: false
  },
  server: {
    host: '0.0.0.0',
    open: false,
    port: 2800,
    proxy: {
      '/frame_api': {
        target: 'http://113.45.138.156/frame_api/',
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: path => path.replace('/frame_api', '/')
      },
      '/resource': {
        target: 'http://113.45.138.156',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src/'
    }
  }
})
