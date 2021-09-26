
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Code sandbox

function cleanupString(string: string): string {

  // Basic HTML encoding
  let encodedHTMLString = string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return encodedHTMLString
}
