// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier/flat'
import { importX } from 'eslint-plugin-import-x'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

export default defineConfig(
  eslint.configs.recommended,
  importX.flatConfigs.recommended,
  eslintPluginUnicorn.configs.unopinionated,
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'func-style': ['error', 'declaration'],
      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'prefer-const': 'error',
      'simple-import-sort/imports': 'error',
      'unicorn/no-array-method-this-argument': 'off',
    },
  },
  prettier,
)
