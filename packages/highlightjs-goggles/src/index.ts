import { HLJSApi } from 'highlight.js'

/**
 * Highlight.js Goggles Language Definition
 */
export default function (hljs: HLJSApi) {
  return {
    name: 'Goggles',
    contains: [
      hljs.COMMENT(/!/, /$/, {
        contains: [
          {
            begin: [/\s([a-z_]+):\s/],
            beginScope: {
              1: 'meta keyword',
            },
          },
        ],
      }),
      {
        begin: /\*|\^|\|/,
        scope: 'regexp',
      },
      {
        begin: [/\$/],
        beginScope: {
          1: 'title.function',
        },
        end: /$/,
        contains: [
          {
            scope: 'title.function',
            match:
              'discard|boost|downrank|site|inurl|intitle|indescription|incontent',
          },
          {
            scope: 'punctuation',
            begin: [/=/, /([0-9]|10)/, /,|$/],
            beginScope: {
              2: 'number',
            },
          },
          {
            scope: 'punctuation',
            begin: [/=/, /[a-z0-9.-]+/, /,|$/],
            beginScope: {
              2: 'string',
            },
          },
        ],
      },
    ],
  }
}
