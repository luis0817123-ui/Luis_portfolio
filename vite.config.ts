import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const viteBase =
  (globalThis as { process?: { env?: { VITE_BASE?: string } } }).process?.env
    ?.VITE_BASE || '/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: viteBase,
  server: {
    host: '127.0.0.1',
    port: 5175,
    strictPort: true,
  },
})
