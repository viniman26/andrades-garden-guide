import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    port: 4173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  },
  plugins: [
    {
      name: 'copy-pwa-assets',
      writeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }
        
        // Copy manifest.json and service-worker.js to dist
        fs.copyFileSync(path.resolve(__dirname, 'manifest.json'), path.resolve(__dirname, 'dist/manifest.json'));
        fs.copyFileSync(path.resolve(__dirname, 'service-worker.js'), path.resolve(__dirname, 'dist/service-worker.js'));

        // Copy assets folder to dist/assets
        const distAssetsDir = path.resolve(distDir, 'assets');
        if (!fs.existsSync(distAssetsDir)) {
          fs.mkdirSync(distAssetsDir, { recursive: true });
        }
        
        const srcAssetsDir = path.resolve(__dirname, 'assets');
        if (fs.existsSync(srcAssetsDir)) {
          const files = fs.readdirSync(srcAssetsDir);
          for (const file of files) {
            fs.copyFileSync(path.resolve(srcAssetsDir, file), path.resolve(distAssetsDir, file));
          }
        }
      }
    }
  ]
});
