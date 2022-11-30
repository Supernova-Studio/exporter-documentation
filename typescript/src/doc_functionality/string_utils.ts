// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - String utils

/** Escape special characters in the given string of text. Encoding part taken from https://github.com/component/escape-html */
export function highlightSafeString(block: DocumentationPageBlockCode) {
  // Retrieve raw text, ignore all attributes for now
  let string = block.text.spans.map((s) => s.text).join("")

  // Make sure it is properly safe for HTML rendering
  return escapeHtml(string)
}

function escapeHtml(string: string) {
  return string.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

export function withHTMLNewlines(string: string): string {
  if (string) {
    return string.replace(/\n/g, "<br />")
  }
  return ""
}

export function getUrlExtension(url: string): string | undefined {
  if (url) {
    return url.split('.').pop()
  }
  return undefined
}

export function changelogToEntries(changeLog: string): Array<string> {

  if (!changeLog) {
    return []
  }

  let lines = changeLog.split("\n").map(c => c.trim())
  let modifiedLines = new Array<string>()
  for (let line of lines) {
    if (line.startsWith("-")) {
      modifiedLines.push(line.substring(1))
    } else {
      modifiedLines.push(line)
    }
  }

  modifiedLines = modifiedLines.map(l => l.trim()).filter(l => l.trim().length > 0)
  return modifiedLines
}


// Returns string for the block, so we can scroll to the specific result (from the search results)
export function getSearchIDString(blockId: string): string {
  return blockId ? "search-" + blockId : ""
}


// Returns class for variants
export function getVariantClass(variant: string): string {
  // It needs the space in front, otherwise it will not work
  return variant ? " variant-" + variant : ""
}