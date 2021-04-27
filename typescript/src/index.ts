// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

Pulsar.registerFunction("pageUrl", pageUrl)
Pulsar.registerFunction("assetUrl", assetUrl)

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Page manipulation

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


/** Retrieve safe slag name made out of any string
 */
function slugName(name: string) {
  return name.replace(/\W+/g, "-").toLowerCase()
}
