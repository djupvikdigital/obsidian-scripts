import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import init, {
  ParserConfig,
  Renderer,
} from '@silentvoid13/rusty_engine/rusty_engine.js'
import { describe, expect, it } from 'vitest'

import * as calendar from './scripts/templater/calendar.js'

/**
 * @param {string} path
 */
function resolveFromHere(path) {
  return fileURLToPath(new URL(path, import.meta.url))
}

const wasmPath = resolveFromHere(
  '../node_modules/@silentvoid13/rusty_engine/rusty_engine_bg.wasm',
)
const templatesPath = resolveFromHere('./templater')
const snapshotCreationDate = '2024-01-02'

/**
 * Recursively gets all files in a directory.
 * @param {string} dir - The directory to search.
 * @returns {Promise<string[]>} - A promise that resolves to an array of file paths.
 */
async function getFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const res = `${dir}/${entry.name}`
      return entry.isDirectory() ? getFiles(res) : res
    }),
  )
  return files.flat()
}

function createTemplateContext() {
  return {
    file: {
      creation_date() {
        return snapshotCreationDate
      },
      title: snapshotCreationDate,
    },
    user: {
      calendar,
    },
  }
}

describe('templates', () => {
  it('renders and matches snapshots', async () => {
    const wasmbin = await fs.readFile(wasmPath)
    await init(wasmbin)
    const config = new ParserConfig('<%', '%>', '\0', '*', '-', '_', 'tR')
    const renderer = new Renderer(config)
    const files = await getFiles(templatesPath)
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8')
      const rendered = await renderer.render_content(
        content,
        createTemplateContext(),
      )
      expect(rendered).toMatchSnapshot()
    }
  })
})
