// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

Pulsar.registerFunction("relativePageUrl", relativePageUrl)
Pulsar.registerFunction("relativeAssetUrl", relativeAssetUrl)

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Page manipulation

/** Generate page slug for the generated page */
function relativePageUrl(page: DocumentationPage, withFolderPrefix: boolean) {

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

  // Retrieve url-safe path
  let slugPath = [...subpaths.reverse(), pageSlug].join("/") + ".html"
  // Generate path either as ./[path] or just [path] - for different purposes
  if (!withFolderPrefix) {
    return slugPath
  } else if (subpaths.length === 0) {
    return `./${slugPath}`
  } else {
    return `${"../".repeat(subpaths.length)}${slugPath}`
  }
}

/** Create proper url that changes with the folder-depth of the documentation */
function relativeAssetUrl(asset: string, page: DocumentationPage) {

  // Construct group path segments
  let segments: number = 0
  let parent: DocumentationGroup | null = page.parent
  while (parent) {
    segments += 1
    parent = parent.parent
  }

  // Remove last segment added, because we don't care about root group
  segments -= 1

  // Retrieve relative path
  if (segments === 0) {
    return `./${asset}`
  } else {
    return `${"../".repeat(segments)}${asset}`
  }
}



/** Retrieve safe slag name made out of any string
 */
function slugName(name: string) {
  return name.replace(/\W+/g, "-").toLowerCase()
}
