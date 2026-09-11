import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { resolve } from 'node:path';

// Un HTML por ruta pública: mismo bundle, distinta cabecera (título, descripción, og:*),
// para que cada enlace compartido tenga su propia previsualización.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        quiz: resolve(__dirname, 'quiz.html'),
        gracias: resolve(__dirname, 'gracias.html'),
      },
    },
  },
});
