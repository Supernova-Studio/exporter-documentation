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
  var matchHtmlRegExp = /["'&<>]/
  var str = "" + string
  var match = matchHtmlRegExp.exec(str)

  if (!match) {
    return str
  }

  var escape
  var html = ""
  var index = 0
  var lastIndex = 0

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;"
        break
      case 38: // &
        escape = "&amp;"
        break
      case 39: // '
        escape = "&#39;"
        break
      case 60: // <
        escape = "&lt;"
        break
      case 62: // >
        escape = "&gt;"
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html
}

export function withHTMLNewlines(string: string): string {
  return string.split("\n").join("<br />")
}

export function getUrlExtension(url: string): string | undefined {
  return url.split('.').pop()
}

export function changelogToEntries(changeLog: string): Array<string> {

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