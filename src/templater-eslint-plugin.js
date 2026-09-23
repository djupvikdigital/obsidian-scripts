const templateTagPattern = /<%[*=_#-]?[\s\S]*?(?:-%>|_%>|%>)/gu
const templateStartTokens = [
  '<%*-',
  '<%*_',
  '<%*',
  '<%=',
  '<%-',
  '<%#',
  '<%_',
  '<%',
]
const templateEndTokens = ['-%>', '_%>', '%>']

/**
 * @param {string} text
 * @returns {string}
 */
export function buildLintSource(text) {
  const output = /** @type {string[]} */ (
    text.split('').map((character) => (character === '\n' ? '\n' : ' '))
  )

  for (const match of text.matchAll(templateTagPattern)) {
    const source = match[0]
    const startToken = templateStartTokens.find((token) =>
      source.startsWith(token),
    )
    const endToken = templateEndTokens.find((token) => source.endsWith(token))

    if (!startToken || !endToken || typeof match.index !== 'number') {
      continue
    }

    const startIndex = match.index + startToken.length
    const endIndex = match.index + source.length - endToken.length

    if (startToken !== '<%#') {
      for (let index = startIndex; index < endIndex; index += 1) {
        output[index] = text[index]
      }

      output[endIndex] = ';'
    }
  }

  return output.join('')
}

/**
 * @param {import('eslint').Linter.LintMessage} message
 * @returns {import('eslint').Linter.LintMessage}
 */
function normalizeMessage(message) {
  const normalizedMessage = { ...message }

  delete normalizedMessage.fix
  delete normalizedMessage.suggestions

  return normalizedMessage
}

export const templaterPlugin = {
  meta: {
    name: 'templater',
  },
  processors: {
    extract: {
      /**
       * @param {string} text
       * @returns {{ filename: string, text: string }[]}
       */
      preprocess(text) {
        return [{ filename: 'templater.js', text: buildLintSource(text) }]
      },
      /**
       * @param {import('eslint').Linter.LintMessage[][]} messages
       * @returns {import('eslint').Linter.LintMessage[]}
       */
      postprocess(messages) {
        return messages.flatMap((group) =>
          group.map((message) => normalizeMessage(message)),
        )
      },
      supportsAutofix: false,
    },
  },
}
