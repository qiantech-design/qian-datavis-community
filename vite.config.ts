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
      '/frame_api/': {
        target: 'https://www.qiantech.com.cn/community_api/',
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: path => path.replace('/frame_api/', '/')
      },
      '/formwork_api/': {
        target: 'https://www.qiantech.com.cn/formwork_api/',
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: path => path.replace('/formwork_api/', '/')
      },
      '/resource': {
        target: 'https://resource.qiantech.com.cn',
        changeOrigin: true,
        rewrite: path => path.replace('/resource', '/')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src/'
    }
  }
})
