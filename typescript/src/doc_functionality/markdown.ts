import type { Element, Root } from 'hast';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

/** Shape of the rehype-sanitize schema options this module uses */
type SanitizeSchema = {
  tagNames: string[];
  attributes: Record<string, string[]>;
  protocols: Record<string, string[]>;
  clobber: string[];
};

/**
 * Allowlist for rendered markdown HTML, kept in sync with the cloud editor
 * (packages/editor/src/utils/markdown/markdownSanitizeSchema.ts) so the editor
 * preview and published docs sanitize identically. Update both together.
 */
const MARKDOWN_SANITIZE_SCHEMA: SanitizeSchema = {
  tagNames: [
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
    'caption',
    'colgroup',
    'col',
    'thead',
    'tbody',
    'tfoot',
    'tr',
    'th',
    'td',
    'sup',
    'sub',
    'details',
    'summary',
  ],
  attributes: {
    '*': ['className', 'id', 'align'],
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    td: ['colSpan', 'rowSpan'],
    th: ['colSpan', 'rowSpan', 'scope'],
    ol: ['start'],
    details: ['open'],
    colgroup: ['span', 'width'],
    col: ['span', 'width'],
  },
  protocols: {
    href: ['http', 'https', 'mailto'],
    src: ['http', 'https'],
  },
  // Keep ids as authored, the rendered page is not user-controlled enough to need clobbering
  clobber: [],
};

/** Drops a leading YAML frontmatter block so it never renders as content */
function stripFrontmatter(markdown: string): string {
  const match = markdown.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  return match ? markdown.slice(match[0].length) : markdown;
}

/** Class names of a hast element, normalized to strings */
function classNames(element: Element): string[] {
  const value = element.properties?.className;
  return Array.isArray(value) ? value.map(String) : [];
}

/**
 * Applies the exporter's markdown element conventions, mirroring the cloud editor
 * preview components (EditorMarkdownRenderer): tables get the data-table classes and
 * wrapper div, fenced code becomes pre.code-block with a TypeScript fallback language,
 * inline code becomes mark
 */
function rehypeExporterMods() {
  return (tree: Root) => {
    transformChildren(tree, false);
  };
}

function transformChildren(parent: Root | Element, isInsidePre: boolean): void {
  const children = parent.children;

  for (let index = 0; index < children.length; index += 1) {
    const child = children[index];
    if (child.type !== 'element') {
      continue;
    }

    if (child.tagName === 'table') {
      child.properties = {
        ...child.properties,
        className: ['data-table', 'header-row', 'table-bordered'],
      };
      children[index] = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: [
            'content-block',
            'content-block--table',
            'data-table-wrapper',
          ],
        },
        children: [child],
      };
      transformChildren(child, isInsidePre);
      continue;
    }

    if (child.tagName === 'a') {
      const properties = { ...child.properties };
      const href = String(properties.href ?? '');
      // Absolute and protocol-relative URLs leave the documentation site;
      // relative paths, anchors, and mailto links keep the default target
      if (/^(https?:)?\/\//i.test(href)) {
        properties.target = '_blank';
      }
      if (properties.target === '_blank') {
        // Covers authored target="_blank" too: block window.opener access
        // and strip the referrer for any link that opens a new tab
        properties.rel = ['noopener', 'noreferrer'];
      }
      child.properties = properties;
      transformChildren(child, isInsidePre);
      continue;
    }

    if (child.tagName === 'pre') {
      child.properties = { ...child.properties, className: ['code-block'] };
      transformChildren(child, true);
      continue;
    }

    if (child.tagName === 'code') {
      if (isInsidePre) {
        const hasLanguage = classNames(child).some((name) =>
          name.startsWith('language-'),
        );
        if (!hasLanguage) {
          child.properties = {
            ...child.properties,
            className: ['language-typescript'],
          };
        }
        // Pulsar indents every line of injected template output. Leading newlines push the
        // first code line onto an indented line too, so the indent is uniform and Prism's
        // normalize-whitespace plugin can strip it at page runtime
        child.children.unshift({ type: 'text', value: '\n\n' });
      } else {
        child.tagName = 'mark';
      }
      transformChildren(child, isInsidePre);
      continue;
    }

    transformChildren(child, isInsidePre);
  }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeSanitize, MARKDOWN_SANITIZE_SCHEMA)
  .use(rehypeExporterMods)
  .use(rehypeStringify);

/**
 * Converts markdown to HTML with the same remark pipeline, sanitization, and element
 * conventions as the cloud editor preview, so published docs match what authors see
 */
export function markdownToHTML(markdown: string): string {
  const html = processor.processSync(stripFrontmatter(markdown)).toString();
  return `<div class="markdown">${html}</div>`;
}
