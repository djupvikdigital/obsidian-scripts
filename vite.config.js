// @ts-check
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  resolve: {
    alias:
      command === 'build'
        ? {
            moment: resolve('src/shims/moment-global.js'),
          }
        : undefined,
  },
  build: {
    lib: {
      formats: ['cjs'],
    },
    minify: false,
  },
  input: ['src/scripts/templater/calendar.js'],
}))
