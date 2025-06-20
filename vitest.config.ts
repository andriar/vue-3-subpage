import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  define: {
    'process.env': {},
    'process.browser': false,
    'process.node': true
  }
}) 