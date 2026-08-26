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
    name: 'opens external links in a new tab with noopener noreferrer',
    markdown: [
      '[absolute](https://example.com/docs)',
      '[protocol relative](//example.com/docs)',
      '[relative](../other-page)',
      '[anchor](#section)',
      '[mail](mailto:hi@example.com)',
      '<a href="/internal" target="_blank">authored new-tab internal link</a>',
    ].join('\n\n'),
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

const dangerousCases = [
  '<img/onerror=alert(1) src=x>',
  '<svg/onload=alert(1)>',
  '<p/onmouseover=alert(1)>hi</p>',
  '[click](javascript:alert(1))',
  '![x](javascript:alert(1))',
  '[click](vbscript:msgbox(1))',
  '<a style="position:fixed;inset:0">x</a>',
  '<iframe src="//evil.example"></iframe>',
  '<script>alert(1)</script>',
];

for (const markdown of dangerousCases) {
  test(`sanitizes dangerous html: ${markdown}`, () => {
    const html = markdownToHTML(markdown);

    expect(html).not.toMatch(
      /<script|<iframe|<svg|\son\w+\s*=|javascript:|vbscript:|style=/i,
    );
  });
}
