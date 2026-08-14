import { slugifyHeading, textBlockPlainText } from './urls';
import { getSearchIDString } from './string_utils';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Code sandbox

export function htmlSafeString(string: string): string {

  if (!string) {
    return ""
  }
  
  // Basic HTML encoding
  let encodedHTMLString = string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return encodedHTMLString
}

export function htmlSafeUrl(uri: string) {
  // Assume that the URI is already encoded if it contains a % character
  if (uri?.includes('%')) {
    return uri
  }
  // Encode otherwise
  return encodeURI(uri ?? '')
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Fast-path block renderers [RCT-9849]
//
// Each helper collapses a hot Pulsar template loop into a single JS call.
// Templates guard the fast path (e.g. richTextHasDynamicLinks) so cases that
// need runtime `ds` lookup or exotic content still take the original path.
//
// NOTE ON OUTPUT: fast paths emit compact HTML with no inter-tag whitespace
// from template indentation (`<p>text</p>` vs the template's `<p>\n    text\n</p>`).
// Browsers render both identically; text content and tag structure match.

export function richTextHasDynamicLinks(richText: any): boolean {
  const spans = richText?.spans
  if (!spans) return false
  for (const span of spans) {
    const attrs = span.attributes
    if (!attrs) continue
    for (const attr of attrs) {
      if (attr.type === "Link" && attr.documentationItemId) return true
    }
  }
  return false
}

// Source: src/page_body/structure/blocks/page_block_rich_text.pr
// Dynamic (documentationItemId) links need `ds` lookup so this helper skips
// them; templates must call richTextHasDynamicLinks first.
export function renderRichTextToHtml(richText: any): string {
  const spans = richText?.spans
  if (!spans || spans.length === 0) return ""

  const parts: string[] = []
  for (const span of spans) {
    let text = htmlSafeString(span.text)

    const attrs = span.attributes
    if (attrs && attrs.length > 0) {
      for (const attr of attrs) {
        switch (attr.type) {
          case "Bold":
            text = "<strong>" + text + "</strong>"
            break
          case "Italic":
            text = "<i>" + text + "</i>"
            break
          case "Strikethrough":
            text = "<s>" + text + "</s>"
            break
          case "Code":
            text = "<mark>" + text + "</mark>"
            break
          case "Link":
            if (attr.link && !attr.documentationItemId) {
              const openInNew = attr.openInNewTab || attr.openInNewWindow
              const closingBracket = openInNew ? '" target="_blank">' : '">'
              text = '<a href="' + htmlSafeUrl(attr.link) + closingBracket + text + "</a>"
            }
            break
        }
      }
    }

    parts.push(text)
  }

  return parts.join("").split("\n").join("<br />")
}

// Source: src/page_body/structure/blocks/page_block_text.pr
export function renderTextBlockToHtml(block: any): string {
  const text = block?.text
  if (!text || textBlockPlainText(block).length === 0) {
    return "<p>&nbsp;</p>"
  }
  const id = getSearchIDString(block.id)
  return '<p id="' + id + '">' + renderRichTextToHtml(text) + "</p>"
}

// Keep in sync with src/page_body/structure/blocks/page_block_copy_anchor.pr
const COPY_ANCHOR_SVG = '<span class="css-pxzk9z" role="presentation"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16.971 3.029a4.367 4.367 0 0 0-6.175 0l-2.27 2.269 1.25 1.249 2.269-2.269a2.6 2.6 0 1 1 3.677 3.677l-2.269 2.269 1.25 1.25 2.268-2.27a4.367 4.367 0 0 0 0-6.175Z" fill="currentColor"/><path d="m13.526 7.798-1.324-1.324-5.728 5.728 1.324 1.324 5.728-5.728Z" fill="currentColor"/><path d="m6.547 9.776-1.25-1.25-2.268 2.27a4.367 4.367 0 1 0 6.175 6.175l2.27-2.269-1.25-1.249-2.269 2.269a2.6 2.6 0 1 1-3.677-3.677l2.269-2.269Z" fill="currentColor"/></svg></span>'

const SUPPORTED_HEADING_LEVELS = new Set<string>(["1", "2", "3", "4", "5"])

// Source: src/page_body/structure/blocks/page_block_heading.pr
//         src/page_body/structure/blocks/page_block_anchor.pr
//         src/page_body/structure/blocks/page_block_copy_anchor.pr
// Original template emits the anchor unconditionally then runs a switch on
// levels 1–5 with no default. Unknown / missing levels get the anchor only.
export function renderHeadingBlockToHtml(block: any): string {
  const anchorId = getSearchIDString(block.id)
  const anchor = '<div class="anchor" id="' + anchorId + '" aria-hidden="true"></div>'
  const level = block?.headingType != null ? String(block.headingType) : ""
  if (!SUPPORTED_HEADING_LEVELS.has(level)) {
    return anchor
  }
  const slug = slugifyHeading(block)
  const inner = renderRichTextToHtml(block.text)
  const copyAnchor = '<a data-copy-url="true" title="Copy link to heading" class="copy-anchor" href="#' + slug + '" lang="en">' + COPY_ANCHOR_SVG + '</a>'
  return anchor +
    '<h' + level + ' class="heading heading--level-' + level + '" id="' + slug + '">' +
    inner + copyAnchor +
    '</h' + level + '>'
}

// Widths (px) the editor produces when a user picks "Fit to page width".
// Source: cloud-ji/packages/editor/src/components/editor/plugins/table/TableCommands.tsx
// `fitTableToPageWidth` derives them from `editorMaxWidth` for the standard
// viewport sizes. Mirrors the same check in page_block_table.pr.
const FIT_TO_PAGE_TABLE_WIDTHS = new Set<number>([751, 752, 753])

function tableCellsHaveOnlyStaticText(rows: any[]): boolean {
  for (const row of rows) {
    const cells: any[] = Array.isArray(row?.children) ? row.children : []
    for (const cell of cells) {
      const cellChildren: any[] = Array.isArray(cell?.children) ? cell.children : []
      for (const cellChild of cellChildren) {
        if (cellChild?.type !== "Text") return false
        if (richTextHasDynamicLinks(cellChild?.text)) return false
      }
    }
  }
  return true
}

// Source: src/page_body/structure/blocks/page_block_table.pr#L4-L8, #L48-L55
function computeTableWidth(columns: any[]): { totalPx: number; widthByColumnId: Record<string, number> } {
  let totalPx = 0
  const widthByColumnId: Record<string, number> = {}
  for (const c of columns) {
    const w = c?.width?.value?.measure
    if (typeof w === "number") {
      totalPx += w
      if (c.id) widthByColumnId[String(c.id)] = w
    }
  }
  return { totalPx, widthByColumnId }
}

// Source: src/page_body/structure/blocks/page_block_table.pr
// Returns null when any cell has non-Text content or dynamic links, so the
// template can fall back to its per-cell inject loop for those cases.
export function renderTableToHtml(block: any): string | null {
  const props = block?.tableProperties
  if (!props) return null
  const rows: any[] = Array.isArray(block?.children) ? block.children : []
  const columns: any[] = Array.isArray(props.columns) ? props.columns : []

  if (!tableCellsHaveOnlyStaticText(rows)) return null

  const { totalPx: tableWidth, widthByColumnId } = computeTableWidth(columns)
  const widthIsFit = FIT_TO_PAGE_TABLE_WIDTHS.has(tableWidth)
  const widthStyle = widthIsFit
    ? "width: 100%; min-width:" + tableWidth + "px"
    : "width:" + tableWidth + "px"

  const borderless = !props.showBorders ? " borderless" : ""
  const headerRow = props.showHeaderRow ? " header-row" : ""
  const headerColumn = props.showHeaderColumn ? " header-column" : ""

  const parts: string[] = []
  parts.push('<div class="content-block content-block--table data-table-wrapper"><div>')
  parts.push(
    '<table class="data-table' + borderless + headerRow + headerColumn +
    '" style="' + widthStyle + '">'
  )

  let inThead = false
  let inTbody = false
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex]
    if (rowIndex === 0 && props.showHeaderRow) {
      parts.push("<thead>")
      inThead = true
    }
    if (rowIndex === 1 && props.showHeaderRow) {
      parts.push("</thead><tbody>")
      inThead = false
      inTbody = true
    }
    if (rowIndex === 0 && !props.showHeaderRow) {
      parts.push("<tbody>")
      inTbody = true
    }

    parts.push("<tr>")
    const cellTag = (rowIndex === 0 && props.showHeaderRow) ? "th" : "td"
    const cells: any[] = Array.isArray(row?.children) ? row.children : []
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex]
      const alignment = String(cell?.alignment || "left").toLowerCase()
      const resolvedTag = (cellIndex === 0 && props.showHeaderColumn) ? "th" : cellTag

      if (rowIndex === 0) {
        const w = cell?.columnId ? widthByColumnId[String(cell.columnId)] : undefined
        const columnSize = (typeof w === "number") ? (w + "px") : "auto"
        parts.push('<' + resolvedTag + ' class="' + alignment + '" style="width: ' + columnSize + '">')
      } else {
        parts.push('<' + resolvedTag + ' class="' + alignment + '">')
      }

      const cellChildren: any[] = Array.isArray(cell?.children) ? cell.children : []
      for (const cellChild of cellChildren) {
        parts.push(renderTextBlockToHtml(cellChild))
      }
      parts.push('</' + resolvedTag + '>')
    }
    parts.push("</tr>")
  }

  // Original template unconditionally emits </tbody></table>; mirror that.
  if (inTbody || inThead) {
    parts.push("</tbody>")
  }
  parts.push("</table></div></div>")
  return parts.join("")
}

// Source: src/page_body/structure/page_body_structure_content.pr#L11-L14
// True when the page has any Heading of level 1, 2, or (if not hidden) 3.
export function pageHasTocHeadings(blocks: any, hideHeading3: boolean): boolean {
  if (!blocks) return false
  for (const b of blocks) {
    if (b?.type !== "Heading") continue
    const h = Number(b.headingType)
    if (h === 1 || h === 2 || (h === 3 && !hideHeading3)) return true
  }
  return false
}

// Source: src/page_body/structure/page_body_structure_content.pr#L15-L17
export function pageHasTopLevelHeading(blocks: any): boolean {
  if (!blocks) return false
  for (const b of blocks) {
    if (b?.type === "Heading" && Number(b.headingType) === 1) return true
  }
  return false
}