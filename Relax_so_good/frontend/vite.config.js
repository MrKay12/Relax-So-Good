import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 8000
  },
  root: 'public',  // Set the root to 'public'
});
