import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/madagascar-vanilla/', // Remplace 'madagascar-vanilla' par le nom exact de ton dépôt GitHub
  plugins: [react()],
});

