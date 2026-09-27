// @ts-check
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

import { defineConfig } from 'vite'

const sourceRoot = path.resolve('src')
const templateRoot = path.resolve(sourceRoot, 'templater')

/**
 * @typedef {{ type: 'asset', fileName: string, source: string | Buffer }} AssetFile
 */

/**
 * @typedef {{ emitFile(file: AssetFile): void }} AssetEmitter
 */

/**
 * Yield markdown files under a directory tree.
 *
 * @param {string} directory
 * @returns {AsyncGenerator<string>}
 */
async function* walkMarkdownFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.resolve(directory, entry.name)

    if (entry.isDirectory()) {
      yield* walkMarkdownFiles(filePath)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      yield filePath
    }
  }
}

/**
 * Copy markdown template files into the build output while preserving their
 * location relative to `src/`.
 *
 * @returns {{ name: string, generateBundle(this: AssetEmitter): Promise<void> }}
 */
function copyTemplaterMarkdown() {
  return {
    name: 'copy-templater-markdown',
    async generateBundle() {
      for await (const filePath of walkMarkdownFiles(templateRoot)) {
        const fileName = path.relative(sourceRoot, filePath)

        this.emitFile({
          type: 'asset',
          fileName,
          source: await readFile(filePath),
        })
      }
    },
  }
}

/**
 * Replace the source `moment` import with the runtime global expected inside
 * Obsidian so no shim module is emitted.
 *
 * @returns {{ name: string, transform(code: string, id: string): string | null }}
 */
function inlineMomentGlobalForBuild() {
  return {
    name: 'inline-moment-global-for-build',
    /**
     * @param {string} code
     * @param {string} id
     */
    transform(code, id) {
      if (!id.endsWith('/src/scripts/templater/calendar.js')) {
        return null
      }

      return code.replace(
        "import moment from 'moment'",
        [
          'const moment = globalThis.moment',
          '',
          'if (!moment) {',
          "  throw new Error('Expected globalThis.moment to be provided at runtime')",
          '}',
        ].join('\n'),
      )
    },
  }
}

export default defineConfig(({ command }) => ({
  build: {
    minify: false,
    rollupOptions: {
      input: {
        'scripts/templater/calendar': path.resolve(
          sourceRoot,
          'scripts/templater/calendar.js',
        ),
      },
      output: {
        dir: 'dist',
        format: 'cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
    },
  },
  plugins:
    command === 'build'
      ? [inlineMomentGlobalForBuild(), copyTemplaterMarkdown()]
      : [copyTemplaterMarkdown()],
}))
