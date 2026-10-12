import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// base = 资源路径前缀：
//   本地开发 / Vercel 部署 → 根路径 '/'
//   GitHub Pages 部署 → 子路径 '/cat-life/'（构建时通过 BASE 环境变量传入）
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE || '/',
})
