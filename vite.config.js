import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Served from https://<user>.github.io/odoo-import-templates/
  base: process.env.GITHUB_ACTIONS ? '/odoo-import-templates/' : '/',
})
