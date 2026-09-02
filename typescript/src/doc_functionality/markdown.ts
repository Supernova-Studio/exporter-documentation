import type { Element, Root } from 'hast';
import { micromark } from 'micromark';
import {
  gfmAutolinkLiteral,
  gfmAutolinkLiteralHtml,
} from 'micromark-extension-gfm-autolink-literal';
import { gfmFootnote, gfmFootnoteHtml } from 'micromark-extension-gfm-footnote';
import {
  gfmStrikethrough,
  gfmStrikethroughHtml,
} from 'micromark-extension-gfm-strikethrough';
import { gfmTable, gfmTableHtml } from 'micromark-extension-gfm-table';
import {
  gfmTaskListItem,
  gfmTaskListItemHtml,
} from 'micromark-extension-gfm-task-list-item';
import { fromParse5 } from 'hast-util-from-parse5';
import { parseFragment } from 'parse5';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

/** Shape of the rehype-sanitize schema options this module uses */
type SanitizeSchema = {
  tagNames: string[];
  attributes: Record<string, string[]>;
  protocols: Record<string, string[]>;
  clobber: string[];
  clobberPrefix: string;
  strip: string[];
};

/** Prefix the sanitizer puts on authored ids, mirrored by the hash fallback in assets/js/functionality.js */
const CLOBBER_PREFIX = 'user-content-';

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
  // Prefix ids and names so authored html cannot clobber window globals (e.g. <div id="dataLayer">).
  // Same-document #anchors are re-pointed by rehypeClobberedAnchors, the rest by functionality.js
  clobber: ['id', 'name'],
  clobberPrefix: CLOBBER_PREFIX,
  strip: ['script', 'style'],
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

/**
 * Sanitize prefixes ids but leaves href="#..." untouched, so anchors pointing at a
 * heading or footnote in the same document would miss. Re-point those; anchors whose
 * target is not in this document (e.g. another block on the page) are left alone and
 * resolved at runtime by the hash fallback in functionality.js. Must run after sanitize
 */
function rehypeClobberedAnchors() {
  return (tree: Root) => {
    const ids = new Set<string>();
    walkElements(tree, (element) => {
      const { id, name } = element.properties ?? {};
      if (typeof id === 'string') ids.add(id);
      if (element.tagName === 'a' && typeof name === 'string') ids.add(name);
    });
    walkElements(tree, (element) => {
      const href = element.properties?.href;
      if (element.tagName !== 'a' || typeof href !== 'string' || !href.startsWith('#')) {
        return;
      }
      const prefixed = CLOBBER_PREFIX + href.slice(1);
      if (ids.has(prefixed)) {
        element.properties = { ...element.properties, href: `#${prefixed}` };
      }
    });
  };
}

function walkElements(parent: Root | Element, visit: (element: Element) => void): void {
  for (const child of parent.children) {
    if (child.type !== 'element') {
      continue;
    }
    visit(child);
    walkElements(child, visit);
  }
}

/**
 * Restores the task-list classes remark-rehype used to add, keeping styling and
 * editor parity across the switch to micromark's HTML compiler. Must run before
 * sanitize, while the checkbox input marker (stripped by the schema) still exists
 */
function rehypeTaskListClasses() {
  return (tree: Root) => {
    markTaskLists(tree);
  };
}

function isCheckboxInput(node: Element['children'][number] | undefined): boolean {
  return (
    node?.type === 'element' &&
    node.tagName === 'input' &&
    node.properties?.type === 'checkbox'
  );
}

function markTaskLists(parent: Root | Element): void {
  for (const child of parent.children) {
    if (child.type !== 'element') {
      continue;
    }

    if (child.tagName === 'ul' || child.tagName === 'ol') {
      let containsTask = false;
      for (const item of child.children) {
        if (item.type !== 'element' || item.tagName !== 'li') {
          continue;
        }
        const head = item.children.find(
          (node) => !(node.type === 'text' && node.value.trim() === ''),
        );
        // The checkbox sits first in the li, or in its leading p for loose lists
        const marker =
          head?.type === 'element' && head.tagName === 'p'
            ? head.children[0]
            : head;
        if (isCheckboxInput(marker)) {
          containsTask = true;
          item.properties = { ...item.properties, className: ['task-list-item'] };
        }
      }
      if (containsTask) {
        child.properties = {
          ...child.properties,
          className: ['contains-task-list'],
        };
      }
    }

    markTaskLists(child);
  }
}

/**
 * micromark compiles markdown straight to an HTML string using the same parser core
 * remark-parse wrapped, skipping the mdast and hast tree builds entirely. GFM comes
 * from the individual extensions; tagfilter is deliberately omitted because it would
 * escape disallowed raw tags into visible text, whereas the sanitize pass below
 * strips them entirely, matching the previous rehype-raw pipeline's output
 */
const MICROMARK_OPTIONS = {
  extensions: [
    gfmAutolinkLiteral(),
    gfmFootnote(),
    gfmStrikethrough(),
    gfmTable(),
    gfmTaskListItem(),
  ],
  htmlExtensions: [
    gfmAutolinkLiteralHtml(),
    // Footnote ids get their user-content- prefix from the sanitizer like every other id
    gfmFootnoteHtml({ clobberPrefix: '' }),
    gfmStrikethroughHtml(),
    gfmTableHtml(),
    gfmTaskListItemHtml(),
  ],
  allowDangerousHtml: true,
};

const processor = unified()
  .use(rehypeTaskListClasses)
  .use(rehypeSlug)
  .use(rehypeSanitize, MARKDOWN_SANITIZE_SCHEMA)
  .use(rehypeClobberedAnchors)
  .use(rehypeExporterMods)
  .use(rehypeStringify);

/**
 * Converts markdown to HTML with the same parser core, sanitization, and element
 * conventions as the cloud editor preview, so published docs match what authors see
 */
export function markdownToHTML(markdown: string): string {
  const intermediateHtml = micromark(
    stripFrontmatter(markdown),
    MICROMARK_OPTIONS,
  );
  // One parse5 pass turns micromark's output (raw HTML islands included, so no
  // rehype-raw stage is needed) into the single tree that sanitization and the
  // exporter transforms require. parse5 is called directly instead of through
  // rehype-parse, whose source-position tracking is ~10x slower
  const tree = fromParse5(parseFragment(intermediateHtml));
  const html = String(processor.stringify(processor.runSync(tree)));
  return `<div class="markdown">${html}</div>`;
}
