
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Code sandbox

export function htmlSafeString(string: string): string {

  if (!string) {
    return ""
  }
  
  // Basic HTML encoding
  let encodedHTMLString = string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  return encodedHTMLString
}

export function htmlSafeUrl(uri: string) {
  // Assume that the URI is already encoded if it contains a % character
  if (uri?.includes('%')) {
    return uri
  }
  // Encode otherwise
  return encodeURI(uri ?? '')
}