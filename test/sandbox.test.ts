import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import {
  htmlSafeString,
  htmlSafeUrl,
  richTextHasDynamicLinks,
  fastRenderRichTextToHtml,
  fastRenderTextBlockToHtml,
  fastRenderHeadingBlockToHtml,
  fastRenderTableToHtml,
  pageHasTocHeadings,
  pageHasTopLevelHeading,
} from '../typescript/src/doc_functionality/sandbox'

// Fast-path helpers read `Pulsar.exportConfiguration.useFastRenderers` at
// runtime. In tests we stub the Pulsar global so the helpers behave as if
// the flag is enabled; the "flag off" describe block below tears it down
// to verify the null-return path.
beforeAll(() => {
  ;(globalThis as any).Pulsar = { exportConfiguration: { useFastRenderers: true } }
})

afterAll(() => {
  delete (globalThis as any).Pulsar
})

// ----- small builders for readable fixtures ------------------------------

const span = (text: string, attributes: any[] = []) => ({ text, attributes })
const rt = (...spans: any[]) => ({ spans })
const textBlock = (id: string, ...spans: any[]) => ({ id, type: 'Text', text: rt(...spans), children: [] })
const headingBlock = (id: string, headingType: string, ...spans: any[]) => ({
  id, type: 'Heading', headingType, text: rt(...spans), children: [],
})
const tableCell = (opts: { id?: string; alignment?: string; columnId?: string; children: any[] }) => ({
  id: opts.id ?? 'cell', alignment: opts.alignment ?? 'Left',
  columnId: opts.columnId ?? 'col-0', children: opts.children,
})
const tableRow = (id: string, ...cells: any[]) => ({ id, children: cells })
const table = (opts: {
  id?: string
  columns?: any[]
  showBorders?: boolean
  showHeaderRow?: boolean
  showHeaderColumn?: boolean
  children: any[]
}) => ({
  id: opts.id ?? 'tbl',
  type: 'Table',
  children: opts.children,
  tableProperties: {
    columns: opts.columns ?? [
      { id: 'col-0', width: { value: { measure: 200 } } },
      { id: 'col-1', width: { value: { measure: 200 } } },
    ],
    showBorders: opts.showBorders ?? true,
    showHeaderRow: opts.showHeaderRow ?? false,
    showHeaderColumn: opts.showHeaderColumn ?? false,
  },
})

// -----------------------------------------------------------------------
// htmlSafeString / htmlSafeUrl (existing helpers — smoke coverage)
// -----------------------------------------------------------------------

describe('htmlSafeString', () => {
  test('escapes &, <, >', () => {
    expect(htmlSafeString('a & b <c> d')).toBe('a &amp; b &lt;c&gt; d')
  })
  test('empty input', () => {
    expect(htmlSafeString('')).toBe('')
    expect(htmlSafeString(null as any)).toBe('')
  })
})

describe('htmlSafeUrl', () => {
  test('passes through URI containing %', () => {
    expect(htmlSafeUrl('https://x.com/a%20b')).toBe('https://x.com/a%20b')
  })
  test('encodes URIs without %', () => {
    expect(htmlSafeUrl('https://x.com/a b')).toBe('https://x.com/a%20b')
  })
  test('empty/undefined', () => {
    expect(htmlSafeUrl(undefined as any)).toBe('')
  })
})

// -----------------------------------------------------------------------
// richTextHasDynamicLinks
// -----------------------------------------------------------------------

describe('richTextHasDynamicLinks', () => {
  test('empty rich text', () => {
    expect(richTextHasDynamicLinks(null)).toBe(false)
    expect(richTextHasDynamicLinks({ spans: [] })).toBe(false)
  })
  test('static links do NOT count', () => {
    const r = rt(span('link', [{ type: 'Link', link: 'https://x.com' }]))
    expect(richTextHasDynamicLinks(r)).toBe(false)
  })
  test('dynamic link (documentationItemId) counts', () => {
    const r = rt(span('link', [{ type: 'Link', documentationItemId: 'page-1' }]))
    expect(richTextHasDynamicLinks(r)).toBe(true)
  })
  test('one dynamic among many spans is enough', () => {
    const r = rt(
      span('plain'),
      span('bold', [{ type: 'Bold' }]),
      span('dynamic', [{ type: 'Link', documentationItemId: 'p' }])
    )
    expect(richTextHasDynamicLinks(r)).toBe(true)
  })
})

// -----------------------------------------------------------------------
// fastRenderRichTextToHtml
// -----------------------------------------------------------------------

describe('fastRenderRichTextToHtml', () => {
  test('empty rich text → empty string', () => {
    expect(fastRenderRichTextToHtml(null)).toBe('')
    expect(fastRenderRichTextToHtml({ spans: [] })).toBe('')
  })

  test('plain text is HTML-escaped', () => {
    expect(fastRenderRichTextToHtml(rt(span('a & <b>')))).toBe('a &amp; &lt;b&gt;')
  })

  test('single-attribute wrappers', () => {
    expect(fastRenderRichTextToHtml(rt(span('x', [{ type: 'Bold' }])))).toBe('<strong>x</strong>')
    expect(fastRenderRichTextToHtml(rt(span('x', [{ type: 'Italic' }])))).toBe('<i>x</i>')
    expect(fastRenderRichTextToHtml(rt(span('x', [{ type: 'Strikethrough' }])))).toBe('<s>x</s>')
    expect(fastRenderRichTextToHtml(rt(span('x', [{ type: 'Code' }])))).toBe('<mark>x</mark>')
  })

  test('stacked attributes wrap in order', () => {
    // Attributes are applied in order — bold then italic → <i><strong>x</strong></i>
    const out = fastRenderRichTextToHtml(rt(span('x', [{ type: 'Bold' }, { type: 'Italic' }])))
    expect(out).toBe('<i><strong>x</strong></i>')
  })

  test('static Link produces <a href="...">', () => {
    const r = rt(span('x', [{ type: 'Link', link: 'https://x.com' }]))
    expect(fastRenderRichTextToHtml(r)).toBe('<a href="https://x.com">x</a>')
  })

  test('static Link with openInNewTab adds target="_blank"', () => {
    const r = rt(span('x', [{ type: 'Link', link: 'https://x.com', openInNewTab: true }]))
    expect(fastRenderRichTextToHtml(r)).toBe('<a href="https://x.com" target="_blank">x</a>')
  })

  test('static Link with openInNewWindow also adds target="_blank"', () => {
    const r = rt(span('x', [{ type: 'Link', link: 'https://x.com', openInNewWindow: true }]))
    expect(fastRenderRichTextToHtml(r)).toBe('<a href="https://x.com" target="_blank">x</a>')
  })

  test('dynamic Link (has documentationItemId) → null (template falls back)', () => {
    const r = rt(span('x', [{ type: 'Link', documentationItemId: 'p-1', link: 'ignored' }]))
    expect(fastRenderRichTextToHtml(r)).toBeNull()
  })

  test('joins spans in order with no separator', () => {
    const r = rt(span('a'), span('b'))
    expect(fastRenderRichTextToHtml(r)).toBe('ab')
  })

  test('newlines become <br />', () => {
    expect(fastRenderRichTextToHtml(rt(span('a\nb\nc')))).toBe('a<br />b<br />c')
  })

  test('unknown attribute type is a no-op', () => {
    const r = rt(span('x', [{ type: 'Unknown' as any }]))
    expect(fastRenderRichTextToHtml(r)).toBe('x')
  })
})

// -----------------------------------------------------------------------
// fastRenderTextBlockToHtml
// -----------------------------------------------------------------------

describe('fastRenderTextBlockToHtml', () => {
  test('empty content → placeholder paragraph', () => {
    // textBlockPlainText concatenates span text; empty spans give length 0.
    const b = { id: 'b1', type: 'Text', text: { spans: [] }, children: [] }
    expect(fastRenderTextBlockToHtml(b)).toBe('<p>&nbsp;</p>')
  })

  test('non-empty content → wrapped in <p id="search-...">', () => {
    const b = textBlock('id-1', span('hello'))
    const out = fastRenderTextBlockToHtml(b)!
    expect(out.startsWith('<p id="search-id-1">')).toBe(true)
    expect(out.endsWith('hello</p>')).toBe(true)
  })

  test('inline formatting flows through', () => {
    const b = textBlock('id-1', span('x', [{ type: 'Bold' }]))
    const out = fastRenderTextBlockToHtml(b)!
    expect(out).toContain('<strong>x</strong>')
  })
})

// -----------------------------------------------------------------------
// fastRenderHeadingBlockToHtml
// -----------------------------------------------------------------------

describe('fastRenderHeadingBlockToHtml', () => {
  test.each([['1'], ['2'], ['3'], ['4'], ['5']])(
    'renders h%s with anchor + copy-anchor',
    (level) => {
      const b = headingBlock('h-1', level, span('Title'))
      const out = fastRenderHeadingBlockToHtml(b)!
      expect(out).toContain(`<h${level} class="heading heading--level-${level}"`)
      expect(out).toContain(`</h${level}>`)
      expect(out).toContain('<div class="anchor" id="search-h-1" aria-hidden="true">')
      expect(out).toContain('class="copy-anchor"')
      expect(out).toContain('Title')
    }
  )

  test('unwired heading levels emit ONLY the anchor (matches original template)', () => {
    // Original template unconditionally injects page_block_anchor before the
    // level switch. Unknown levels get an anchor but no <hN> tag.
    const b = headingBlock('h-1', '6', span('Title'))
    expect(fastRenderHeadingBlockToHtml(b)).toBe('<div class="anchor" id="search-h-1" aria-hidden="true"></div>')
  })

  test('missing headingType emits ONLY the anchor (matches original template)', () => {
    const b = { id: 'h', type: 'Heading', text: rt(span('t')), children: [] }
    expect(fastRenderHeadingBlockToHtml(b)).toBe('<div class="anchor" id="search-h" aria-hidden="true"></div>')
  })

  test('null headingType emits ONLY the anchor', () => {
    const b = { id: 'h', type: 'Heading', headingType: null, text: rt(span('t')), children: [] }
    expect(fastRenderHeadingBlockToHtml(b)).toBe('<div class="anchor" id="search-h" aria-hidden="true"></div>')
  })
})

// -----------------------------------------------------------------------
// fastRenderTableToHtml — includes the "return null → template fallback" guards
// -----------------------------------------------------------------------

describe('fastRenderTableToHtml', () => {
  test('returns null with no tableProperties', () => {
    expect(fastRenderTableToHtml({ children: [] })).toBeNull()
  })

  test('returns null when any cell child is not a Text block', () => {
    const t = table({
      children: [
        tableRow('r0', tableCell({
          children: [{ id: 'i', type: 'Image', children: [] }], // non-Text
        })),
      ],
    })
    expect(fastRenderTableToHtml(t)).toBeNull()
  })

  test('returns null when any cell has a dynamic link', () => {
    const t = table({
      children: [
        tableRow('r0', tableCell({
          children: [textBlock('t', span('x', [{ type: 'Link', documentationItemId: 'p' }]))],
        })),
      ],
    })
    expect(fastRenderTableToHtml(t)).toBeNull()
  })

  test('renders 1x1 static-content table (no header)', () => {
    const t = table({
      children: [tableRow('r0', tableCell({ columnId: 'col-0', children: [textBlock('t', span('X'))] }))],
    })
    const out = fastRenderTableToHtml(t)
    expect(out).not.toBeNull()
    expect(out!).toContain('<div class="content-block content-block--table data-table-wrapper">')
    expect(out!).toContain('<table class="data-table"')  // borderless=false, no header row/col
    expect(out!).toContain('<tbody>')
    expect(out!).toContain('<tr>')
    expect(out!).toContain('<td class="left"')            // alignment lowercased
    expect(out!).toContain('style="width: 200px"')        // first-row column width
    expect(out!).toContain('X</p>')
    expect(out!.endsWith('</tbody></table></div></div>')).toBe(true)
  })

  test('showHeaderRow wraps first row in <thead>', () => {
    const t = table({
      showHeaderRow: true,
      children: [
        tableRow('r0', tableCell({ children: [textBlock('a', span('H'))] })),
        tableRow('r1', tableCell({ children: [textBlock('b', span('D'))] })),
      ],
    })
    const out = fastRenderTableToHtml(t)!
    expect(out).toContain('<thead>')
    expect(out).toContain('<th class="left"')
    expect(out).toContain('</thead><tbody>')
    expect(out).toContain('<td class="left">')
  })

  test('showHeaderColumn: first cell in every row is <th>', () => {
    const t = table({
      showHeaderColumn: true,
      children: [
        tableRow('r0',
          tableCell({ columnId: 'col-0', children: [textBlock('a', span('A'))] }),
          tableCell({ columnId: 'col-1', children: [textBlock('b', span('B'))] }),
        ),
      ],
    })
    const out = fastRenderTableToHtml(t)!
    // first cell = th (header column), second cell = td (data)
    expect(out).toMatch(/<th class="left" style="width: 200px">/)
    expect(out).toMatch(/<td class="left" style="width: 200px">/)
  })

  test('borderless when showBorders=false', () => {
    const t = table({ showBorders: false, children: [] })
    expect(fastRenderTableToHtml(t)!).toContain('<table class="data-table borderless"')
  })

  test('Fit-to-page-width triggers width: 100% (751/752/753)', () => {
    // Two columns of 376 = 752 = fit-to-page width
    const t = table({
      columns: [
        { id: 'col-0', width: { value: { measure: 376 } } },
        { id: 'col-1', width: { value: { measure: 376 } } },
      ],
      children: [],
    })
    expect(fastRenderTableToHtml(t)!).toContain('style="width: 100%; min-width:752px"')
  })

  test('non-fit width uses fixed width style', () => {
    const t = table({
      columns: [{ id: 'col-0', width: { value: { measure: 200 } } }],
      children: [],
    })
    expect(fastRenderTableToHtml(t)!).toContain('style="width:200px"')
  })

  test('empty table (no rows) still emits table wrappers', () => {
    const t = table({ children: [] })
    const out = fastRenderTableToHtml(t)!
    expect(out).toBe(
      '<div class="content-block content-block--table data-table-wrapper"><div>' +
      '<table class="data-table" style="width:400px"></table></div></div>'
    )
  })
})

// -----------------------------------------------------------------------
// pageHasTocHeadings / pageHasTopLevelHeading
// -----------------------------------------------------------------------

describe('pageHasTocHeadings', () => {
  test('empty / null → false', () => {
    expect(pageHasTocHeadings(null, false)).toBe(false)
    expect(pageHasTocHeadings([], false)).toBe(false)
  })
  test('h1 counts', () => {
    expect(pageHasTocHeadings([headingBlock('a', '1', span('t'))], false)).toBe(true)
  })
  test('h2 counts', () => {
    expect(pageHasTocHeadings([headingBlock('a', '2', span('t'))], false)).toBe(true)
  })
  test('h3 counts when hideHeading3=false', () => {
    expect(pageHasTocHeadings([headingBlock('a', '3', span('t'))], false)).toBe(true)
  })
  test('h3 does NOT count when hideHeading3=true', () => {
    expect(pageHasTocHeadings([headingBlock('a', '3', span('t'))], true)).toBe(false)
  })
  test('h4/h5 never count', () => {
    expect(pageHasTocHeadings([headingBlock('a', '4', span('t')), headingBlock('b', '5', span('t'))], false)).toBe(false)
  })
  test('non-heading blocks ignored', () => {
    expect(pageHasTocHeadings([textBlock('t', span('x'))], false)).toBe(false)
  })
})

describe('pageHasTopLevelHeading', () => {
  test('empty / null → false', () => {
    expect(pageHasTopLevelHeading(null)).toBe(false)
    expect(pageHasTopLevelHeading([])).toBe(false)
  })
  test('only h1 counts', () => {
    expect(pageHasTopLevelHeading([headingBlock('a', '1', span('t'))])).toBe(true)
    expect(pageHasTopLevelHeading([headingBlock('a', '2', span('t'))])).toBe(false)
    expect(pageHasTopLevelHeading([headingBlock('a', '3', span('t'))])).toBe(false)
  })
})

// -----------------------------------------------------------------------
// Fast-path gate: helpers must return null when useFastRenderers is off
// so templates fall back to the original Pulsar rendering paths.
// -----------------------------------------------------------------------

describe('fast-path gate (useFastRenderers off)', () => {
  beforeAll(() => {
    ;(globalThis as any).Pulsar = { exportConfiguration: { useFastRenderers: false } }
  })
  afterAll(() => {
    // Restore the "on" stub used by every other test suite.
    ;(globalThis as any).Pulsar = { exportConfiguration: { useFastRenderers: true } }
  })

  test('fastRenderRichTextToHtml → null', () => {
    expect(fastRenderRichTextToHtml(rt(span('x')))).toBeNull()
  })
  test('fastRenderTextBlockToHtml → null', () => {
    expect(fastRenderTextBlockToHtml(textBlock('id-1', span('hello')))).toBeNull()
  })
  test('fastRenderHeadingBlockToHtml → null', () => {
    expect(fastRenderHeadingBlockToHtml(headingBlock('h-1', '2', span('Title')))).toBeNull()
  })
  test('fastRenderTableToHtml → null', () => {
    const t = table({
      children: [tableRow('r0', tableCell({ children: [textBlock('t', span('X'))] }))],
    })
    expect(fastRenderTableToHtml(t)).toBeNull()
  })
})
