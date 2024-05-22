// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import { htmlSafeString } from "./sandbox"

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Support

/** Retrieve first subgroup below root group */
export function firstSubgroupOfPage(page: DocumentationPage) {
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

/** Check whether targeted item is descendant of provided root */
export function pageOrGroupActiveInContext(pageOrGroup: DocumentationPage | DocumentationGroup, context: DocumentationPage | DocumentationGroup) {
  if (context.type === "Page") {
    // If we are checking against plain page, then we can only compare
    let contextPage = context as DocumentationPage
    return contextPage.id === pageOrGroup.id
  } else {
    // If we are checking against group, check everything upwards the tree. If group contains the page, return that information
    let contextGroup = context as DocumentationGroup
    if (contextGroup.childrenIds.indexOf(pageOrGroup.persistentId) !== -1) {
      return true
    } else if (pageOrGroup.parent) {
      return pageOrGroupActiveInContext(pageOrGroup.parent, contextGroup)
    } else {
      // Reached root and didn't find anything, abandon ship
      return false
    }
  }
}

/** Find first showable page from the top of the provided root */
export function firstPageFromTop(documentationRoot: DocumentationGroup): DocumentationPage | null {

  for (let child of documentationRoot.children) {
    if (isExportable(child as DocumentationPage | DocumentationGroup)) {
      if (child.type === "Page") {
        return child as DocumentationPage
      } else {
        let possiblePage = firstPageFromTop(child as DocumentationGroup)
        if (possiblePage) {
          return possiblePage
        }
      }
    }
  }
  return null
}


/** Get all children of the page if the homepage is tabs */
export function firstTabGroupFromTop(documentationRoot: DocumentationGroup): string[] | undefined {

  let pageCount = 0;
  for (let child of documentationRoot.children) {
    if (isExportable(child as DocumentationPage | DocumentationGroup)) {
      if (pageCount === 0 && child.type === "Group" && (child as DocumentationGroup).groupBehavior === "Tabs") {
        return (child as DocumentationGroup).childrenIds
      }
      pageCount++;
    }
  }
  return undefined;
}

/** Check if the page is part of the homepage (if homepage is tabs) */
export function isHomepageTab(page: DocumentationPage, documentationRoot: DocumentationGroup): boolean {
  
  const homepageTabs = firstTabGroupFromTop(documentationRoot);
  if (homepageTabs?.includes(page.persistentId)) {
    return true;
  }

  return false;
}

/** Check if the page is a homepage */
export function isHomepage(page: DocumentationPage, documentationRoot: DocumentationGroup): boolean {
  
  let homepagePage = firstPageFromTop(documentationRoot)
  if ((homepagePage !== null && page.id === homepagePage.id)) {
    return true;
  }

  return false;
}

/** Resolve menu label */
export function resolveMenuLabel(page: DocumentationPage, documentationRoot: DocumentationGroup, overridenLabel: string): string {
  if (isHomepage(page, documentationRoot) && overridenLabel !== "") { 
    return overridenLabel;
  } else {
    return htmlSafeString(page.title);
  }
}

/** Create flattened structure of pages */
export function flattenedPageStructure(root: DocumentationGroup): Array<DocumentationPage> {

  let pages: Array<DocumentationPage> = []
  for (let item of root.children) {
    if (isExportable(item as DocumentationPage | DocumentationGroup)) {
      if (item.type === "Page") {
        pages.push(item as DocumentationPage)
      } else if (item.type === "Group") {
        pages = pages.concat(flattenedPageStructure(item as DocumentationGroup))
      }
    }
  }

  return pages
}

/** Find next page after provided page */
export function nextPage(page: DocumentationPage, documentationRoot: DocumentationGroup): DocumentationPage | null {

  let flattenedPages = flattenedPageStructure(documentationRoot)
  let pageIndex = flattenedPages.findIndex(p => p.id === page.id)
  if (pageIndex !== -1) {
    if (pageIndex < flattenedPages.length - 1) {
      return flattenedPages[pageIndex + 1]
    }
  }
  return null
}

/** Find previous page of provided page */
export function previousPage(page: DocumentationPage, documentationRoot: DocumentationGroup): DocumentationPage | null {

  let flattenedPages = flattenedPageStructure(documentationRoot)
  let pageIndex = flattenedPages.findIndex(p => p.id === page.id)
  if (pageIndex > 0) {
    return flattenedPages[pageIndex - 1]
  }
  return null
}

/** Check whether page or group is exportable. Currently page is considered exportable if it doesn't start with underscore */
export function isExportable(object: DocumentationPage | DocumentationGroup): boolean {

  if (object === null || object === undefined) {
    return false
  }
  if (object.type === "Group") {
    if (object.title.startsWith("_")) {
      return false
    } else {
      let parent = (object as DocumentationGroup).parent
      if (parent) {
        return isExportable(parent)
      } else {
        // Reached root structure without any group being non-exportable, so the entire structure is exportable
        return true
      }
    }
  } else if (object.type === "Page") {
    return !object.title.startsWith("_")
  } else {
    return false
  }
}

/** Get current timestamp, 
 *  e.g. to version custom.css with the date of publishing
 */
export function getCurrentTimestamp(): string {
  return Math.floor(Date.now()).toString();
}


/** Check if the key is in the array of keys
 */
 export function checkKeyInArray(array, key: string): boolean {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === key) {
        return true;
      }
    }
  }

  return false;
}