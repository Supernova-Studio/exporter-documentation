// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

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

export function firstPageFromTop(documentationRoot: DocumentationGroup): DocumentationPage | null {
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
