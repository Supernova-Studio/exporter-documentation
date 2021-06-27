// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

Pulsar.registerFunction("pageUrl", pageUrl)
Pulsar.registerFunction("rootUrl", rootUrl)
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
Pulsar.registerFunction("firstSubgroupOfPage", firstSubgroupOfPage)
Pulsar.registerFunction("pageOrGroupActiveInContext", pageOrGroupActiveInContext)
Pulsar.registerFunction("slugifyHeading", slugifyHeading)
Pulsar.registerFunction("headingPlainText", headingPlainText)
Pulsar.registerFunction("firstPageFromTop", firstPageFromTop)
Pulsar.registerFunction("buildSearchIndexJSON", buildSearchIndexJSON)

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - URLs

/** Generate page slug for the generated page */
function pageUrl(object: DocumentationPage | DocumentationGroup, prefix: string | undefined) {

  if (object.type === "Group") {
    let group = object as DocumentationGroup
    let pages = group.children.filter(c => c.type === "Page")
    if (pages.length > 0) {
      return pageUrl(pages[0] as DocumentationPage | DocumentationGroup, prefix)
    } else {
      // This is not handled, group must contain page otherwise it should be hidden from generation
      return ""
    }
  }

  let page = object as DocumentationPage
  let pageSlug = page.userSlug ?? page.slug
  let subpaths: Array<string> = []

  // Construct group path segments
  let parent: DocumentationGroup | null = page.parent
  while (parent) {
    subpaths.push(slugify(parent.title))
    parent = parent.parent
  }

  // Remove last segment added, because we don't care about root group
  subpaths.pop()

  // Retrieve url-safe path constructed as [host][group-slugs][path-slug][.html]
  let path = [prefix, ...subpaths.reverse(), pageSlug].join("/") + ".html"
  return path
}

/** Create proper url that changes with the folder-depth of the documentation */
function rootUrl(asset: string, prefix: string | undefined) {
  let fragments = [prefix, asset]

  // Retrieve url-safe path constructed as [host][asset-slug]
  let path = fragments.join("/")
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


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Support

/** Retrieve first subgroup below root group */
function firstSubgroupOfPage(page: DocumentationPage) {

  let parent: DocumentationGroup | null = page.parent
  while (true) {
    if (!parent || parent.isRoot) {
      return undefined
    }

    if (parent.parent && parent.parent.isRoot) {
      return parent
    }
    parent = parent.parent
  }
}


function pageOrGroupActiveInContext(pageOrGroup: DocumentationPage | DocumentationGroup, context: DocumentationPage | DocumentationGroup) {

  if (context.type === "Page") {
    // If we are checking against plain page, then we can only compare
    let contextPage = context as DocumentationPage
    return contextPage.id === pageOrGroup.id
  } else {
    // If we are checking against group, check everything upwards the tree. If group contains the page, return that information
    let contextGroup = context as DocumentationGroup
    if (!contextGroup.isRoot && contextGroup.childrenIds.indexOf(pageOrGroup.persistentId) !== -1) {
      return true
    } else if (contextGroup.parent) {
      return pageOrGroupActiveInContext(pageOrGroup, contextGroup.parent as DocumentationGroup)
    } else {
      // Reached root and didn't find anything, abandon ship
      return false
    }
  }
}


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Headings

function headingPlainText(header: DocumentationPageBlockHeading): string {

  return header.text.spans.map(s => s.text).join("")
}

function slugifyHeading(header: DocumentationPageBlockHeading): string {

  let fullText = headingPlainText(header)
  return slugify(fullText)
}


function slugify(str: string): string {
  // Thanks to https://gist.github.com/codeguy/6684588
  str = str.replace(/^\s+|\s+$/g, ''); 
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaaeeeeiiiioooouuuunc------";

  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

function firstPageFromTop(documentationRoot: DocumentationGroup): DocumentationPage | null {

  for (let child of documentationRoot.children) {
    if (child.type === "Page") {
      return child as DocumentationPage
    } else {
      let possiblePage = firstPageFromTop(child as DocumentationGroup)
      if (possiblePage) {
        return possiblePage
      }
    }
  }
  return null
}


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Search index processing

function buildSearchIndexJSON(pages: Array<DocumentationPage>, domain: string): string {

  // Very naive search index implementation. The performance of this will be absolutely abysmal. 
  // This will get optimized when the core search works over time. Probably moved to elastic search or something like that
  let id = 0
  let data: Array<{
    id: number,
    name: string,
    path: string,
    url: string,
    text: string,
    type: "header" | "body"
  }> = []

  // Process every page for data
  for (let page of pages) {

    // Basic information
    let name = page.title

    // Path and url creation
    let subpaths: Array<string> = [name]
    let parent: DocumentationGroup | null = page.parent
    while (parent) {
      if (parent?.isRoot) {
        break
      }
      subpaths.splice(0, 0, parent.title)
      parent = parent.parent
    }
    let path = subpaths.join(" / ")
    let url = pageUrl(page, domain)

    // Header and text parsing
    let allBlocks = flattenedBlocksOfPage(page)
    var texts: Array<string> = []
    var headers: Array<string> = []

    for (let block of allBlocks) {
      if (block.type === "Text" || block.type === "Callout" || block.type === "OrderedList" || block.type === "UnorderedList" || block.type === "Quote") {
        let text = textOfBlock(block as DocumentationPageBlockText)
        if (text.length > 0) {
          texts.push(text)
        }
      } else if (block.type === "Heading") {
        let text = textOfBlock(block as DocumentationPageBlockText)
        if (text.length > 0) {
          headers.push(text)
        }
      }
    }

    // Construct pieces from text information
    for (let text of texts) {
      data.push({
        id: id++,
        name: name,
        path: path,
        url: url,
        text: text,
        type: "body"
      })
    }

    // Construct pieces from headers
    for (let header of headers) {
      data.push({
        id: id++,
        name: name,
        path: path,
        url: url,
        text: header,
        type: "header"
      })
    }
  }

  // Construct data and make index readable for easier debugging for now
  // return JSON.stringify(data, null, 2)

  // Experimental: Create index. WIP: Pregenerate loaded index
  let si = `
  const lunrData = ${JSON.stringify(data, null, 2)};
  const lunrIndexedData = {}
  const lunrIndex = lunr(function () {
    this.field('text')
    this.ref('id')
    this.metadataWhitelist = ['position']
  
    // Note index has been loaded into the page with page request
    lunrData.forEach(function (doc) {
      this.add(doc)
      lunrIndexedData[doc.id] = doc
    }, this)
  });
  `
  return si
}

function flattenedBlocksOfPage(page: DocumentationPage): Array<DocumentationPageBlock> {

  let blocks: Array<DocumentationPageBlock> = page.blocks
  for (let block of page.blocks) {
    blocks = blocks.concat(flattenedBlocksOfBlock(block))
  }

  return blocks
}

function flattenedBlocksOfBlock(block: DocumentationPageBlock): Array<DocumentationPageBlock> {

  let subblocks: Array<DocumentationPageBlock> = block.children
  for (let subblock of block.children) {
    subblocks = subblocks.concat(flattenedBlocksOfBlock(subblock))
  }
  return subblocks
}

function textOfBlock(block: DocumentationPageBlockText): string {

  return block.text.spans.map(s => s.text).join("")
}

