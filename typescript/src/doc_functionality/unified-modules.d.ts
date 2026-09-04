/**
 * Minimal declarations for the ESM-only unified/micromark ecosystem, whose types the
 * project's "moduleResolution": "node" cannot resolve. Webpack bundles the packages
 * regardless of module format, so only the compile-time view needs these.
 */
declare module 'unified' {
  interface UnifiedProcessor {
    use(plugin: unknown, options?: unknown): UnifiedProcessor;
    processSync(content: string): { toString(): string };
    runSync(tree: unknown): unknown;
    stringify(tree: unknown): unknown;
  }
  export function unified(): UnifiedProcessor;
}

declare module 'hast-util-from-parse5' {
  import type { Root } from 'hast';
  export function fromParse5(tree: unknown): Root;
}

declare module 'micromark' {
  export function micromark(value: string, options?: unknown): string;
}

declare module 'micromark-extension-gfm-autolink-literal' {
  export function gfmAutolinkLiteral(): unknown;
  export function gfmAutolinkLiteralHtml(): unknown;
}

declare module 'micromark-extension-gfm-footnote' {
  export function gfmFootnote(): unknown;
  export function gfmFootnoteHtml(options?: { clobberPrefix?: string }): unknown;
}

declare module 'micromark-extension-gfm-strikethrough' {
  export function gfmStrikethrough(options?: unknown): unknown;
  export function gfmStrikethroughHtml(): unknown;
}

declare module 'micromark-extension-gfm-table' {
  export function gfmTable(): unknown;
  export function gfmTableHtml(): unknown;
}

declare module 'micromark-extension-gfm-task-list-item' {
  export function gfmTaskListItem(): unknown;
  export function gfmTaskListItemHtml(): unknown;
}

declare module 'rehype-sanitize' {
  const rehypeSanitize: unknown;
  export default rehypeSanitize;
}

declare module 'rehype-slug' {
  const rehypeSlug: unknown;
  export default rehypeSlug;
}

declare module 'rehype-stringify' {
  const rehypeStringify: unknown;
  export default rehypeStringify;
}
