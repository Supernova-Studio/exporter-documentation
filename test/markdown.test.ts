import { expect, test } from 'vitest';

import { markdownToHTML } from '../typescript/src/doc_functionality/markdown';

test('renders a language fence as an escaped Prism code block', () => {
  const markdown = ['```html', '<example>Content</example>', '```'].join('\n');

  const html = markdownToHTML(markdown);

  expect(html).toMatch(
    /<pre class="code-block"><code class="[^"]*\blanguage-html\b[^"]*">/,
  );
  expect(html).toMatch(/&lt;example&gt;Content&lt;\/example&gt;/);
  expect(html).not.toMatch(/language-html language-html/);
});

test('renders Markdown Extra attributes without swallowing following content', () => {
  const markdown = [
    'Before',
    '',
    '```html {.example .preview}',
    '<example>Content</example>',
    '```',
    '',
    '## After',
  ].join('\n');

  const html = markdownToHTML(markdown);

  expect(html).toMatch(/<p>Before<\/p>/);
  expect(html).toMatch(/<code class="[^"]*\blanguage-html\b[^"]*">/);
  expect(html).toMatch(/<h2 id="after">After<\/h2>/);
  expect(html.match(/<pre class="code-block">/g) || []).toHaveLength(1);
});

test('uses TypeScript highlighting for a single-line fence without a language', () => {
  const markdown = ['```', 'const value = 1', '```'].join('\n');

  const html = markdownToHTML(markdown);

  expect(html).toMatch(
    /<pre class="code-block"><code class="language-typescript">/,
  );
  expect(html).toMatch(/const value = 1/);
  expect(html).not.toMatch(/<pre><mark>/);
});

test('uses TypeScript highlighting for a multiline fence without a language', () => {
  const markdown = ['```', 'const first = 1', 'const second = 2', '```'].join(
    '\n',
  );

  const html = markdownToHTML(markdown);

  expect(html).toMatch(
    /<pre class="code-block"><code class="language-typescript">/,
  );
  expect(html).toMatch(/const first = 1\nconst second = 2/);
});

test('renders inline code as mark without changing fenced code', () => {
  const markdown = [
    'Use `inlineValue` here.',
    '',
    '```javascript',
    'const fencedValue = true',
    '```',
  ].join('\n');

  const html = markdownToHTML(markdown);

  expect(html).toMatch(/Use <mark>inlineValue<\/mark> here\./);
  expect(html).toMatch(/<code class="[^"]*\blanguage-javascript\b[^"]*">/);
  expect(html).not.toMatch(/<mark>const fencedValue/);
});

test('removes front matter without turning its final item into a heading', () => {
  const markdown = [
    '---',
    'title: Synthetic example',
    'aliases:',
    '  - first',
    '  - final item',
    '---',
    '',
    '# Visible content',
  ].join('\n');

  const html = markdownToHTML(markdown);

  expect(html).toMatch(/<h1 id="visible-content">Visible content<\/h1>/);
  expect(html).not.toMatch(/Synthetic example|first|final item/);
  expect(html).not.toMatch(/<h2 id="final-item">/);
});
