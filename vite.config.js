import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/weatherApi': {
        target: 'http://apis.juhe.cn', // 天气API的目标服务器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weatherApi/, ''), // 将 /weatherApi 重写为空
      },
      '/calendarApi': {
        target: 'http://v.juhe.cn', // 黄历API的目标服务器
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/calendarApi/, ''), // 将 /calendarApi 重写为空
      },
    },
  },
})

