import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import fs from 'node:fs'; // Import Node.js file system module
import path from 'node:path'; // Import Node.js path module
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

// Read package.json to get name and version
const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const appName = packageJson.name;
const appVersion = packageJson.version;

// Determine the entry point and build flavor from environment variables
const entryPoint = process.env.VITE_APP_ENTRY || 'src/main.ts'; // Default to src/main-integration.ts for library mode
const buildFlavor = process.env.VITE_APP_BUILD_FLAVOR || 'app'; // Default to 'app'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
       '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: entryPoint,
      fileName: (format) => {
        // Example: qiscus-vue-app-0.1.0-customer.es.js
        return `${appName}-${appVersion}-${buildFlavor}[hash].${format}.js`;
      },
      formats: ['es'] // You can specify the formats you want to build
    },
    rollupOptions: {
      // external: ['vue'], // Uncomment if Vue should not be bundled into your library
      output: {
        // globals: { // Uncomment if you uncommented external: ['vue']
        //   vue: 'Vue'
        // },
        assetFileNames: 'assets/[name].[hash].[ext]',
      }
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'), 
    'process.browser': true,
    'process.node': false
  }
})