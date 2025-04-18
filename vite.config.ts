import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('Vite config loaded');

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(3000),
  },
});
