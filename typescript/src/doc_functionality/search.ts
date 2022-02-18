// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Import

import { pageUrl } from "./urls"

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Search index processing

export function buildSearchIndexJSON(pages: Array<DocumentationPage>, domain: string): string {
  // Construct search index for Fuse.js
  // Note that by changing the data, or including more data here, you can improve behaviors of the search quite drastically
  // Example: You can pre-download data from different source and include it in your doc search index as well
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
  let si = `
  const FuseSearchData = ${JSON.stringify(data, null, 2)};
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
