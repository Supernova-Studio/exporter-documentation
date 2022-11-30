// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import { htmlSafeString } from "./sandbox"
import { withHTMLNewlines } from "./string_utils"

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Markdown

/** Convert rich text block to HTML */
export function richTextToHTML(text: DocumentationRichText): string {

    let string = ""
    for (let span of text.spans) {
        let text = htmlSafeString(span.text)
        for (let attribute of span.attributes) {
            switch (attribute.type) {
                case "Bold": text = `<strong>${text}</strong>`; break
                case "Italic": text = `<i>${text}</i>`; break
                case "Strikethrough": text = `<s>${text}</s>`; break
                case "Code": text = `<mark>${text}</mark>`; break
            }
        }
        string += text
    }

    return withHTMLNewlines(string)
}
