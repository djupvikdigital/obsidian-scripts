// @ts-check
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: { calendar: 'src/calendar.js' },
      formats: ['cjs'],
    },
  },
})
