import { describe, expect, it } from 'vitest'

import { buildLintSource, templaterPlugin } from './templater-eslint-plugin.js'

describe('templater ESLint plugin', () => {
  it('extracts templater JavaScript and blanks markdown text', () => {
    const template = `---
created: <% tp.file.creation_date() %>
date: <%* const dates = tp.user.calendar.pathToDates(tp.file.path()); %><% tp.user.calendar.formatIsoDate(dates.today) %>
note: <%# ignored comment %>
---`
    const lintSource = buildLintSource(template)
    const commentLine = lintSource.split('\n', 4).at(-1)

    expect(lintSource).toHaveLength(template.length)
    expect(lintSource.split('\n')).toHaveLength(template.split('\n').length)
    expect(lintSource).toContain('tp.file.creation_date()')
    expect(lintSource).toContain(
      'const dates = tp.user.calendar.pathToDates(tp.file.path());',
    )
    expect(lintSource).toContain('tp.user.calendar.formatIsoDate(dates.today)')
    expect(commentLine?.trim()).toBe('')
  })

  it('strips fixes and suggestions from processor messages', () => {
    const [message] = templaterPlugin.processors.extract.postprocess([
      [
        {
          column: 3,
          endColumn: 8,
          endLine: 1,
          fix: { range: [0, 1], text: 'x' },
          line: 1,
          message: 'Example problem',
          ruleId: 'example/rule',
          severity: 2,
          suggestions: [
            {
              desc: 'Do the thing',
              fix: { range: [0, 1], text: 'y' },
            },
          ],
        },
      ],
    ])

    expect(message).toEqual({
      column: 3,
      endColumn: 8,
      endLine: 1,
      line: 1,
      message: 'Example problem',
      ruleId: 'example/rule',
      severity: 2,
    })
  })
})
