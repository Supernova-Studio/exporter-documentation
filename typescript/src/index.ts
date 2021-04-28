// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

Pulsar.registerFunction("pageUrl", pageUrl)
Pulsar.registerFunction("assetUrl", assetUrl)
Pulsar.registerFunction("highlightSafeString", highlightSafeString)
Pulsar.registerFunction("isExperimentalBlock", isExperimentalBlock)
Pulsar.registerFunction("parseExperimentalBlock", parseExperimentalBlock)

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - URLs

/** Generate page slug for the generated page */
function pageUrl(page: DocumentationPage, prefix: string | undefined) {
  let pageSlug = page.userSlug ?? page.slug
  let subpaths: Array<string> = []

  // Construct group path segments
  let parent: DocumentationGroup | null = page.parent
  while (parent) {
    subpaths.push(slugName(parent.title))
    parent = parent.parent
  }

  // Remove last segment added, because we don't care about root group
  subpaths.pop()

  // Retrieve url-safe path constructed as [host][group-slugs][path-slug][.html]
  let path = [prefix, ...subpaths.reverse(), pageSlug].join("/") + ".html"
  return path
}

/** Create proper url that changes with the folder-depth of the documentation */
function assetUrl(asset: string, prefix: string | undefined) {
  let assetFolder = "assets"
  let fragments = [prefix, assetFolder, asset]

  // Retrieve url-safe path constructed as [host][asset-folder][asset-slug]
  let path = fragments.join("/")
  return path
}

/** Retrieve safe slag name made out of any string */
function slugName(name: string) {
  return name.replace(/\W+/g, "-").toLowerCase()
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Experimental features

/**  */
function isExperimentalBlock(block: DocumentationPageBlockText): boolean {
  return block.text.spans.length === 1 && block.text.spans[0].text.startsWith("[block:")
}

/** Parse experimental information from the text block, so we can convert it to experimental block  */
function parseExperimentalBlock(block: DocumentationPageBlockText): { blockType: string, payload: string } {

  // This is stupid dumb parsing, but it really is just for that one usecase and will be removed :)
  let text = block.text.spans[0].text
  text = text.substr(1) // Remove first [
  let blocks = text.split("]") // Split by ] so we get block:X  and   payload (maybe URL)
  let blockType = blocks[0].split(".")
  return {
    blockType: blockType[0].split(":")[1],
    payload: blocks[1]
  }
}


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - String manipulation

/** Escape special characters in the given string of text. Encoding part taken from https://github.com/component/escape-html */
function highlightSafeString(block: DocumentationPageBlockCode) {
  // Retrieve raw text, ignore all attributes for now
  let string = block.text.spans.map((s) => s.text).join("")

  // Make sure it is properly safe for HTML rendering
  return escapeHtml(string)
}

function escapeHtml(string) {
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
