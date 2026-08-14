import { describe, expect, test } from 'vitest'

import {
  htmlSafeString,
  htmlSafeUrl,
  richTextHasDynamicLinks,
  renderRichTextToHtml,
  renderTextBlockToHtml,
  renderHeadingBlockToHtml,
  renderTableToHtml,
  pageHasTocHeadings,
  pageHasTopLevelHeading,
} from '../typescript/src/doc_functionality/sandbox'

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
// renderRichTextToHtml
// -----------------------------------------------------------------------

describe('renderRichTextToHtml', () => {
  test('empty rich text → empty string', () => {
    expect(renderRichTextToHtml(null)).toBe('')
    expect(renderRichTextToHtml({ spans: [] })).toBe('')
  })

  test('plain text is HTML-escaped', () => {
    expect(renderRichTextToHtml(rt(span('a & <b>')))).toBe('a &amp; &lt;b&gt;')
  })

  test('single-attribute wrappers', () => {
    expect(renderRichTextToHtml(rt(span('x', [{ type: 'Bold' }])))).toBe('<strong>x</strong>')
    expect(renderRichTextToHtml(rt(span('x', [{ type: 'Italic' }])))).toBe('<i>x</i>')
    expect(renderRichTextToHtml(rt(span('x', [{ type: 'Strikethrough' }])))).toBe('<s>x</s>')
    expect(renderRichTextToHtml(rt(span('x', [{ type: 'Code' }])))).toBe('<mark>x</mark>')
  })

  test('stacked attributes wrap in order', () => {
    // Attributes are applied in order — bold then italic → <i><strong>x</strong></i>
    const out = renderRichTextToHtml(rt(span('x', [{ type: 'Bold' }, { type: 'Italic' }])))
    expect(out).toBe('<i><strong>x</strong></i>')
  })

  test('static Link produces <a href="...">', () => {
    const r = rt(span('x', [{ type: 'Link', link: 'https://x.com' }]))
    expect(renderRichTextToHtml(r)).toBe('<a href="https://x.com">x</a>')
  })

  test('static Link with openInNewTab adds target="_blank"', () => {
    const r = rt(span('x', [{ type: 'Link', link: 'https://x.com', openInNewTab: true }]))
    expect(renderRichTextToHtml(r)).toBe('<a href="https://x.com" target="_blank">x</a>')
  })

  test('static Link with openInNewWindow also adds target="_blank"', () => {
    const r = rt(span('x', [{ type: 'Link', link: 'https://x.com', openInNewWindow: true }]))
    expect(renderRichTextToHtml(r)).toBe('<a href="https://x.com" target="_blank">x</a>')
  })

  test('dynamic Link (has documentationItemId) is dropped by fast path', () => {
    const r = rt(span('x', [{ type: 'Link', documentationItemId: 'p-1', link: 'ignored' }]))
    // The template guard should have prevented us being called at all; if we
    // are called defensively, we must not emit an anchor for the dynamic link.
    expect(renderRichTextToHtml(r)).toBe('x')
  })

  test('joins spans in order with no separator', () => {
    const r = rt(span('a'), span('b'))
    expect(renderRichTextToHtml(r)).toBe('ab')
  })

  test('newlines become <br />', () => {
    expect(renderRichTextToHtml(rt(span('a\nb\nc')))).toBe('a<br />b<br />c')
  })

  test('unknown attribute type is a no-op', () => {
    const r = rt(span('x', [{ type: 'Unknown' as any }]))
    expect(renderRichTextToHtml(r)).toBe('x')
  })
})

// -----------------------------------------------------------------------
// renderTextBlockToHtml
// -----------------------------------------------------------------------

describe('renderTextBlockToHtml', () => {
  test('empty content → placeholder paragraph', () => {
    // textBlockPlainText concatenates span text; empty spans give length 0.
    const b = { id: 'b1', type: 'Text', text: { spans: [] }, children: [] }
    expect(renderTextBlockToHtml(b)).toBe('<p>&nbsp;</p>')
  })

  test('non-empty content → wrapped in <p id="search-...">', () => {
    const b = textBlock('id-1', span('hello'))
    const out = renderTextBlockToHtml(b)
    expect(out.startsWith('<p id="search-id-1">')).toBe(true)
    expect(out.endsWith('hello</p>')).toBe(true)
  })

  test('inline formatting flows through', () => {
    const b = textBlock('id-1', span('x', [{ type: 'Bold' }]))
    const out = renderTextBlockToHtml(b)
    expect(out).toContain('<strong>x</strong>')
  })
})

// -----------------------------------------------------------------------
// renderHeadingBlockToHtml
// -----------------------------------------------------------------------

describe('renderHeadingBlockToHtml', () => {
  test.each([['1'], ['2'], ['3'], ['4'], ['5']])(
    'renders h%s with anchor + copy-anchor',
    (level) => {
      const b = headingBlock('h-1', level, span('Title'))
      const out = renderHeadingBlockToHtml(b)
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
    expect(renderHeadingBlockToHtml(b)).toBe('<div class="anchor" id="search-h-1" aria-hidden="true"></div>')
  })

  test('missing headingType emits ONLY the anchor (matches original template)', () => {
    const b = { id: 'h', type: 'Heading', text: rt(span('t')), children: [] }
    expect(renderHeadingBlockToHtml(b)).toBe('<div class="anchor" id="search-h" aria-hidden="true"></div>')
  })

  test('null headingType emits ONLY the anchor', () => {
    const b = { id: 'h', type: 'Heading', headingType: null, text: rt(span('t')), children: [] }
    expect(renderHeadingBlockToHtml(b)).toBe('<div class="anchor" id="search-h" aria-hidden="true"></div>')
  })
})

// -----------------------------------------------------------------------
// renderTableToHtml — includes the "return null → template fallback" guards
// -----------------------------------------------------------------------

describe('renderTableToHtml', () => {
  test('returns null with no tableProperties', () => {
    expect(renderTableToHtml({ children: [] })).toBeNull()
  })

  test('returns null when any cell child is not a Text block', () => {
    const t = table({
      children: [
        tableRow('r0', tableCell({
          children: [{ id: 'i', type: 'Image', children: [] }], // non-Text
        })),
      ],
    })
    expect(renderTableToHtml(t)).toBeNull()
  })

  test('returns null when any cell has a dynamic link', () => {
    const t = table({
      children: [
        tableRow('r0', tableCell({
          children: [textBlock('t', span('x', [{ type: 'Link', documentationItemId: 'p' }]))],
        })),
      ],
    })
    expect(renderTableToHtml(t)).toBeNull()
  })

  test('renders 1x1 static-content table (no header)', () => {
    const t = table({
      children: [tableRow('r0', tableCell({ columnId: 'col-0', children: [textBlock('t', span('X'))] }))],
    })
    const out = renderTableToHtml(t)
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
    const out = renderTableToHtml(t)!
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
    const out = renderTableToHtml(t)!
    // first cell = th (header column), second cell = td (data)
    expect(out).toMatch(/<th class="left" style="width: 200px">/)
    expect(out).toMatch(/<td class="left" style="width: 200px">/)
  })

  test('borderless when showBorders=false', () => {
    const t = table({ showBorders: false, children: [] })
    expect(renderTableToHtml(t)!).toContain('<table class="data-table borderless"')
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
    expect(renderTableToHtml(t)!).toContain('style="width: 100%; min-width:752px"')
  })

  test('non-fit width uses fixed width style', () => {
    const t = table({
      columns: [{ id: 'col-0', width: { value: { measure: 200 } } }],
      children: [],
    })
    expect(renderTableToHtml(t)!).toContain('style="width:200px"')
  })

  test('empty table (no rows) still emits table wrappers', () => {
    const t = table({ children: [] })
    const out = renderTableToHtml(t)!
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
