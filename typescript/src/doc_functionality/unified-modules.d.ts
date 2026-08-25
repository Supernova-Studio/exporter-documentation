/**
 * Minimal declarations for the ESM-only unified ecosystem, whose types the project's
 * "moduleResolution": "node" cannot resolve. Webpack bundles the packages regardless
 * of module format, so only the compile-time view needs these.
 */
declare module 'unified' {
  interface UnifiedProcessor {
    use(plugin: unknown, options?: unknown): UnifiedProcessor;
    processSync(content: string): { toString(): string };
  }
  export function unified(): UnifiedProcessor;
}

declare module 'remark-parse' {
  const remarkParse: unknown;
  export default remarkParse;
}

declare module 'remark-gfm' {
  const remarkGfm: unknown;
  export default remarkGfm;
}

declare module 'remark-rehype' {
  const remarkRehype: unknown;
  export default remarkRehype;
}

declare module 'rehype-raw' {
  const rehypeRaw: unknown;
  export default rehypeRaw;
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
