// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Experimental functions - page styling

export function experimental_forcedPageStyle(page: DocumentationPage): DocumentationPageStyle {
  return {
    title: page.title,
    textAlignment: "Default",
    description: null,
    backgroundColor: null,
    backgroundImage: null,
    headerHeight: null,
    hideSidebar: false,
  }
}

export function experimental_defaultPageStyle(page: DocumentationPage): DocumentationPageStyle {
  return {
    title: page.title,
    textAlignment: "Default",
    description: null,
    backgroundColor: null,
    backgroundImage: null,
    headerHeight: null,
    hideSidebar: false,
  }
}
