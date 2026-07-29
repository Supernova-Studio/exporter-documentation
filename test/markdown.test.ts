import { expect, test } from 'vitest';

import { markdownToHTML } from '../typescript/src/doc_functionality/markdown';

const cases = [
  {
    name: 'renders a language fence as an escaped Prism code block',
    markdown: ['```html', '<example>Content</example>', '```'].join('\n'),
  },
  {
    name: 'renders Markdown Extra attributes without swallowing following content',
    markdown: [
      'Before',
      '',
      '```html {.example .preview}',
      '<example>Content</example>',
      '```',
      '',
      '## After',
    ].join('\n'),
  },
  {
    name: 'uses TypeScript highlighting for a single-line fence without a language',
    markdown: ['```', 'const value = 1', '```'].join('\n'),
  },
  {
    name: 'uses TypeScript highlighting for a multiline fence without a language',
    markdown: ['```', 'const first = 1', 'const second = 2', '```'].join('\n'),
  },
  {
    name: 'renders inline code as mark without changing fenced code',
    markdown: [
      'Use `inlineValue` here.',
      '',
      '```javascript',
      'const fencedValue = true',
      '```',
    ].join('\n'),
  },
  {
    name: 'removes front matter without turning its final item into a heading',
    markdown: [
      '---',
      'title: Synthetic example',
      'aliases:',
      '  - first',
      '  - final item',
      '---',
      '',
      '# Visible content',
    ].join('\n'),
  },
];

for (const { name, markdown } of cases) {
  test(name, () => {
    expect(markdownToHTML(markdown)).toMatchSnapshot();
  });
}
