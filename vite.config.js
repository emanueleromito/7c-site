import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/7c-site/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        launch: resolve(__dirname, 'src/launch.html'),
        claim: resolve(__dirname, 'src/claim.html'),
        archive: resolve(__dirname, 'src/archive.html'),
        garment: resolve(__dirname, 'src/garment.html'),
        record: resolve(__dirname, 'src/record.html'),
      },
    },
  },
});
