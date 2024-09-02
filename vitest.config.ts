import { defineConfig } from 'vitest/config'
import path from 'path'
import { config } from 'dotenv'

export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    include: ['./tests/**/*.spec.ts'],
    env: {
      ...config({ path: './.env.local' }).parsed
    },
    sequence: {
      hooks: 'list',
      setupFiles: 'list'
    },
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})