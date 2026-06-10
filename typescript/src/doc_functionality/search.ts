// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Import

import { isExportable } from './lookup';
import { pageUrl } from './urls';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Definition

export enum DocSearchResultDataType {
  contentBlock = 'contentBlock',
  shortcut = 'shortcut',
  sectionHeader = 'sectionHeader',
  pageTitle = 'pageTitle',
  groupTitle = 'groupTitle',
}

export type DocSearchResultData = {
  pageName: string;
  text: string;
  category: string;
  type: DocSearchResultDataType;
  keywords?: string;
  url: string;
};

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Search index processing

export function buildSearchIndexJSON(
  pages: Array<DocumentationPage>,
  groups: Array<DocumentationGroup>,
  domain: string,
): string {
  // Construct search index for Fuse.js
  // Note that by changing the data, or including more data here, you can improve behaviors of the search quite drastically
  // Example: You can pre-download data from different source and include it in your doc search index as well
  let data: Array<DocSearchResultData> = [];
  // Process every page for data
  for (let page of pages) {
    // Path and url creation
    let subpaths: Array<string> = [page.title];
    let parent: DocumentationGroup | null = page.parent;
    let skipGenBecauseHidden: boolean =
      !isExportable(page) || page.configuration.isPrivate;
    while (parent) {
      if (!isExportable(parent) || parent.configuration.isPrivate) {
        skipGenBecauseHidden = true;
      }
      if (parent?.isRoot) {
        break;
      }
      subpaths.splice(0, 0, parent.title);
      parent = parent.parent;
    }
    if (skipGenBecauseHidden) {
      // Don't generate content for hidden pages
      continue;
    }
    let url = pageUrl(page, domain);

    // For tabs, use name of the containing group, otherwise we get lot of design/code which is not very useful
    let pageName = page.title;
    if (page.parent && page.parent.groupBehavior === 'Tabs') {
      pageName = page.parent.title + '/' + pageName;
    }

    let category = subpaths.join(' / ');

    // Extract rich text from headers and any text piece there is
    let allBlocks = flattenedBlocksOfPage(page);
    for (let block of allBlocks) {
      // We only hide content from the private pages
      if (page.configuration.isPrivate) {
        continue;
      }
      if (block.hasOwnProperty('text')) {
        let textBlock = block as DocumentationPageBlockText;

        data.push({
          text: textBlock.text.spans.map((s) => s.text).join(''),
          type:
            block.type === 'Heading'
              ? DocSearchResultDataType.sectionHeader
              : DocSearchResultDataType.contentBlock,
          pageName: pageName,
          category: category,
          url: url + '#search-' + block.id,
        });
      } else if (block.type === 'Shortcuts') {
        let shortcutsBlock = block as DocumentationPageBlockShortcuts;
        for (let shortcut of shortcutsBlock.shortcuts) {
          if (!shortcut.title || shortcut.title.startsWith('_')) {
            continue;
          }

          data.push({
            text: shortcut.title,
            type: DocSearchResultDataType.shortcut,
            pageName: pageName,
            category: category,
            url: url + '#search-' + block.id,
          });
        }
      }
    }

    // Push page information
    data.push({
      text: page.title,
      type: DocSearchResultDataType.pageTitle,
      pageName: pageName,
      category: category,
      keywords: category,
      url: url,
    });
  }

  // Process every group for data
  for (let group of groups) {
    if (!isExportable(group) || group.configuration.isPrivate) {
      // Don't generate content for hidden groups
      continue;
    }
    // Path and url creation
    let subpaths: Array<string> = [group.title];
    let parent: DocumentationGroup | null = group.parent;
    while (parent) {
      if (parent?.isRoot) {
        break;
      }
      subpaths.splice(0, 0, parent.title);
      parent = parent.parent;
    }
    let groupUrl = pageUrl(group, domain);
    let category = subpaths.join(' / ');

    // Push group information
    data.push({
      text: group.title,
      type: DocSearchResultDataType.groupTitle,
      pageName: group.title,
      category: category,
      url: groupUrl,
    });
  }

  // Construct data and make index readable for easier debugging for now
  let si = `
  const FuseSearchData = ${JSON.stringify(data, null, 2)};
  `;
  return si;
}

function flattenedBlocksOfPage(
  page: DocumentationPage,
): Array<DocumentationPageBlock> {
  let blocks: Array<DocumentationPageBlock> = page.blocks;
  for (let block of page.blocks) {
    blocks = blocks.concat(flattenedBlocksOfBlock(block));
  }

  return blocks;
}

function flattenedBlocksOfBlock(
  block: DocumentationPageBlock,
): Array<DocumentationPageBlock> {
  let subblocks: Array<DocumentationPageBlock> = block.children;
  for (let subblock of block.children) {
    subblocks = subblocks.concat(flattenedBlocksOfBlock(subblock));
  }
  return subblocks;
}
