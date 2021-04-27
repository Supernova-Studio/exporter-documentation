// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

/** Generate page slug for the generated page */
Pulsar.registerFunction("pageUrl", (page: DocumentationPage) => {
  console.log(`user slug: ${page.userSlug}`)
  console.log(`page slug: ${page.slug}`)
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
  let slugPath = [...subpaths.reverse(), pageSlug].join("/")
  return `./${slugPath}.html`
})


/** Retrieve safe slag name made out of any string
 */
function slugName(name: string) {
  return name.replace(/\W+/g, "-").toLowerCase()
}
