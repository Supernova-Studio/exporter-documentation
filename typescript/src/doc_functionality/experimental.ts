// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Experimental functions - page styling

export function experimentalForcedPageStyle(page: DocumentationPage): DocumentationPageStyle {
  // Note: This is only temporary code that will be removed when the model is finalized and available to everyone. This just forces formatting for specific page in specific workspace
  // Nothing to see here! <3 
  if (page.id === "55587") {
    return {
      title: page.title,
      textAlignment: "Center",
      description: "Our brand conveys personality and values we'd like to imprint to all of our products.",
      backgroundColor: null,
      backgroundImage:
        "https://images.unsplash.com/photo-1574169208507-84376144848b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBuYXR1cmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
      headerHeight: 400,
      hideSidebar: false,
      invertHeader: true,
    }
  } else if (page.id === "55586") {
    return {
      title: page.title,
      textAlignment: "Center",
      description: "We are super stylish company. See to believe!",
      backgroundColor: "0F62FE",
      backgroundImage: null,
      headerHeight: null,
      hideSidebar: true,
      invertHeader: true,
    }
  }

  return experimentalDefaultPageStyle(page)
}

export function experimentalDefaultPageStyle(page: DocumentationPage): DocumentationPageStyle {
  return {
    title: page.title,
    textAlignment: "Default",
    description: null,
    backgroundColor: null,
    backgroundImage: null,
    headerHeight: null,
    hideSidebar: false,
    invertHeader: false,
  }
}


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Experimental functions - Figma frames

export function experimentalFigmaFrameBlock(layout: FrameLayout): DocumentationPageBlockFrames {
 
  return {
    children: [],
    frameProperties: {
      alignment: "Center",
      backgroundColor: null,
      layout: layout
    },
    id: "non-existing-id",
    frames: [
      figmaFrame("Menu", "Standard hamburger", "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-menu-1024.png", null),
      figmaFrame("Shop", null, "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-store-512.png", null),
      figmaFrame("Larger Menu", "Very non-standard hamburger", "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-menu-1024.png", null),
      figmaFrame("Ikea", "Hamburgers for everyone", "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-store-512.png", "ca4450"),
      figmaFrame("Typography", "Standard hamburger", "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-menu-1024.png", null),
      figmaFrame("Large title", null, "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-store-512.png", null),
      figmaFrame("Smol title", "This will extend this line so much. Never do that.", "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-store-512.png", "ca4450"),
      figmaFrame("Colors", null, "https://cdn0.iconfinder.com/data/icons/heroicons-ui/24/icon-store-512.png", "cfdeff"),
    ],
    type: "FigmaFrames"
  }
}

function figmaFrame(name: string, description: string | null, previewUrl: string | null, backgroundColor: string | null): DocumentationPageBlockFrame {

  return {
    sourceFileId: "x",
    sourceFrameId: "y",
    sourceFileName: "z",

    title: name,
    description: description,
    previewUrl: previewUrl,
    backgroundColor: backgroundColor
  }
}
