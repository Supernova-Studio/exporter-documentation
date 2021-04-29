// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

Pulsar.registerFunction("pageUrl", pageUrl)
Pulsar.registerFunction("assetUrl", assetUrl)
Pulsar.registerFunction("highlightSafeString", highlightSafeString)
Pulsar.registerFunction("isExperimentalBlock", isExperimentalBlock)
Pulsar.registerFunction("parseExperimentalBlock", parseExperimentalBlock)
Pulsar.registerFunction("formattedTokenGroupHeader", formattedTokenGroupHeader)
Pulsar.registerFunction("fullTokenGroupName", fullTokenGroupName)
Pulsar.registerFunction("gradientDescription", gradientDescription)
Pulsar.registerFunction("gradientTokenValue", gradientTokenValue)
Pulsar.registerFunction("shadowDescription", shadowDescription)
Pulsar.registerFunction("shadowTokenValue", shadowTokenValue)
Pulsar.registerFunction("measureTypeIntoReadableUnit", measureTypeIntoReadableUnit)
Pulsar.registerFunction("typographyDescription", typographyDescription)

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

/** Parse out experimental block, if exists */
function isExperimentalBlock(block: DocumentationPageBlockText): boolean {
  return block.text.spans.length === 1 && block.text.spans[0].text.startsWith("[block:")
}

/** Parse experimental information from the text block, so we can convert it to experimental block  */
function parseExperimentalBlock(block: DocumentationPageBlockText): { blockType: string, payload: string, tabs: { headers: Array<string>, content: Array<string> } } {

  // This is stupid dumb parsing, but it really is just for that one usecase and will be removed :)
  let text = block.text.spans[0].text
  text = text.substr(1) // Remove first [
  let blocks = text.split("]") // Split by ] so we get block:X  and   payload (maybe URL)

  // Parse output
  let payload = blocks[1].trim()
  let blockType = blocks[0].split(":")[1]

  // Extra for tabs, if detected
  let tabs = payload.split("|").map(p => p.trim())
  let headers = new Array<string>()
  let content = new Array<string>()
  tabs.forEach((value, index) => {
    if (index % 2 === 0) {
      headers.push(value)
    } else {
      content.push(value)
    }
  })
  
  // Fallback to some sensible information if user didn't format it too much, or the block is not tab
  // and normalize
  headers = headers.length > 0 ? headers : ["Header"]
  content = content.length > 0 ? content : [payload]
  if (headers.length !== content.length) {
    headers = ["Incorrect tab structure"]
    content = ["Imbalanced number of tab structures, must be pairs of header / content"]
  }

  return {
    blockType: blockType,
    payload: payload,
    tabs: {
      headers: headers,
      content: content
    }
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


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Tokens

/**  Convert group into properly formatted header */
function fullTokenGroupName(tokenGroup: TokenGroup) {
  // Retrieve token group path
  return [...tokenGroup.path, tokenGroup.name].join("/")
}

/**  Convert group into properly formatted header */
function formattedTokenGroupHeader(tokenGroup: TokenGroup, showSubpath: boolean) {

  // Retrieve token group either including or not including the path to the group
  if (tokenGroup.path.length > 0 && showSubpath) {
      let light = tokenGroup.path.join(" / ")
      let dark = tokenGroup.name
      return `<span class="light">${light} / </span>${dark}`
  } else {
      return tokenGroup.name
  }
}

/** Describe complex gradient token */
function gradientDescription(gradientToken: GradientToken) {

 // Describe gradient as (type) (stop1, stop2 ...)
 let type = `${gradientToken.value.type} Gradient`
 let stops = gradientToken.value.stops.map(stop => {
      return `#${stop.color.hex.toUpperCase()}, ${stop.position * 100}%`
 }).join(", ")

 return `${type}, ${stops}`
}


/** Describe complex gradient value as token */
function gradientTokenValue(gradientToken) {

  let gradientType = ""
  switch (gradientToken.value.type) {
      case "Linear": gradientType = "linear-gradient(0deg, "; break;
      case "Radial": gradientType = "radial-gradient(circle, "; break;
      case "Angular": gradientType = "conic-gradient("; break; 
  } 
  
 // Describe gradient as (type) (stop1, stop2 ...)
 // Example: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
 let stops = gradientToken.value.stops.map(stop => {
      return `#${stop.color.hex.toUpperCase()} ${stop.position * 100}%`
 }).join(", ")

 return `${gradientType}${stops})`
}

/** Describe complex shadow token */
function shadowDescription(shadowToken: ShadowToken) {
 return shadowTokenValue(shadowToken)
}

/** Describe complex shadow token */
function typographyDescription(typographyToken: TypographyToken) {
  let value = typographyToken.value
  let fontName = `${value.font.family} ${value.font.subfamily}`
  let fontValue = `${value.fontSize.measure}${measureTypeIntoReadableUnit(value.fontSize.unit)}` 
  let textDecoration: string = ""
  let textCase: string = ""
  if (value.textDecoration !== 'None') {
    textDecoration = `, ${value.textDecoration.toLowerCase()}`
  }
  if (value.textCase !== 'Original') {
    textCase = `, ${value.textCase.toLowerCase()}`
  }
 return `${fontName} ${fontValue}${textDecoration}${textCase}`
}


/** Describe complex shadow value as token */
function shadowTokenValue(shadowToken: ShadowToken) {
  return `${shadowToken.value.x.measure}px ${shadowToken.value.y.measure}px ${shadowToken.value.radius.measure}px ${shadowToken.value.spread.measure}px #${shadowToken.value.color.hex}`
}


/** Describe complex gradient value as token */
function measureTypeIntoReadableUnit(type: Unit): string {

  switch (type) {
    case 'Points': return 'pt'
    case 'Pixels': return 'px'
    case 'Percent': return '%'
    case 'Ems': return 'em'
  }
}