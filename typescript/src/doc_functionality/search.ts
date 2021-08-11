// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Import

import { pageUrl } from "./urls"

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Search index processing

export function buildSearchIndexJSON(pages: Array<DocumentationPage>, domain: string): string {
  // Very naive search index implementation. The performance of this will be absolutely abysmal.
  // This will get optimized when the core search works over time. Probably moved to elastic search or something like that
  let id = 0
  let data: Array<{
    id: number
    name: string
    path: string
    url: string
    text: string
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
      if (
        block.type === "Text" ||
        block.type === "Callout" ||
        block.type === "OrderedList" ||
        block.type === "UnorderedList" ||
        block.type === "Quote"
      ) {
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
        type: "body",
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
        type: "header",
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
  return block.text.spans.map((s) => s.text).join("")
}
