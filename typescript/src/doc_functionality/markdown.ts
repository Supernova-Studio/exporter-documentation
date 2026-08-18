import sanitizeHtml from 'sanitize-html';
import * as Showdown from 'showdown';

/**
 * Allowlist for rendered markdown HTML, kept in sync with the cloud editor
 * (packages/editor/src/utils/markdown/sanitizeRenderedHtml.ts) so the editor
 * preview and published docs sanitize identically. Update both together.
 */
const MARKDOWN_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'div',
    'p',
    'span',
    'br',
    'hr',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'strong',
    'em',
    'del',
    'mark',
    'blockquote',
    'ul',
    'ol',
    'li',
    'a',
    'img',
    'pre',
    'code',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'sup',
    'sub',
  ],
  allowedAttributes: {
    '*': ['class', 'id', 'align'],
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan', 'scope'],
    ol: ['start'],
  },
  // No data: scheme, sanitize-html cannot filter data URIs by media type so svg/html would slip through
  allowedSchemes: ['http', 'https', 'mailto'],
  allowProtocolRelative: true,
};

export function markdownToHTML(markdown: string): string {
  Showdown.setFlavor('github');
  Showdown.setOption('simpleLineBreaks', false);

  let converter = new Showdown.Converter({
    // Ignore frontmatter
    metadata: true,
  });

  // Showdown does not support Markdown Extra attributes on fenced code blocks.
  // Example: "```html {.example .preview}" becomes "```html".
  converter.addExtension([
    {
      type: 'lang',
      regex: /^(\s*`{3,})([^\s`{}]+)\s+\{[^}\r\n]+\}\s*$/gm,
      replace: '$1$2',
    },
  ]);

  // Mod 1: Add default classes to specific tags
  const classMap: Record<string, string> = {
    table: 'data-table header-row table-bordered',
  };

  const bindings = Object.keys(classMap).map((key) => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`,
  }));

  converter.addExtension([...bindings]);

  // Mod 2: Add newlines to code blocks
  converter.addExtension([
    {
      type: 'output',
      regex: '<pre><code class="(.+?)">((.|\n)*?)<\/code><\/pre>',
      replace: function (match: string, codeClass: string, content: string) {
        return `<pre class="code-block"><code class="${codeClass}">\n\n${content}</code></pre>`;
      },
    },
  ]);

  // Mod 2.1: Handle code blocks without specified language
  converter.addExtension([
    {
      type: 'output',
      regex: '<pre><code>',
      replace: function () {
        return `<pre class="code-block"><code class="language-typescript">\n\n`;
      },
    },
  ]);

  // Mod 3: Change inline <code> to <mark> after code blocks have been assigned classes.
  converter.addExtension([
    {
      type: 'output',
      regex: '<code>(.*?)<\/code>',
      replace: function (match: string, codeContent: string) {
        return `<mark>${codeContent}</mark>`;
      },
    },
  ]);

  // Mod 4: Wrap tables in a div
  converter.addExtension([
    {
      type: 'output',
      filter: function (text) {
        return text
          .replace(
            /<table/g,
            '<div class="content-block content-block--table data-table-wrapper"><table',
          )
          .replace(/<\/table>/g, '</table></div>');
      },
    },
  ]);

  let html = converter.makeHtml(markdown);
  return `<div class="markdown">${sanitizeHtml(html, MARKDOWN_SANITIZE_OPTIONS)}</div>`;
}
