// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import * as Showdown from "showdown"

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Markdown

/** Convert markdown to HTML */
export function markdownToHTML(markdown: string): string {

    // Handle github markdown propertly in addition to general syntax
    Showdown.setFlavor("github")

    // Create converter and register custom modifications
    let converter = new Showdown.Converter()

    // Mod 1: All <code> tags that are only used for inline code highlight should be changed to <mark>
    converter.addExtension([
        {
            type: "output",
            regex: '<code>(.*?)<\/code>',
            replace: function (match: string, codeContent) {
                return `<mark>${codeContent}</mark>`
            },
        },
    ])

    // Mod 2: Add default classes to specific tags, when exported
    const classMap = {
        table: 'table table-bordered'
    }

    const bindings = Object.keys(classMap)
        .map(key => ({
            type: 'output',
            regex: new RegExp(`<${key}(.*)>`, 'g'),
            replace: `<${key} class="${classMap[key]}" $1>`
        }))

    converter.addExtension([...bindings])

    // Mod 3: Add newlines to code, so the newline plugin for prism will properly align the generated code
    converter.addExtension([
        {
            type: "output",
            regex: '<pre><code class="(.+?)">((.|\n)*?)<\/code><\/pre>',
            replace: function (match: string, codeClass: string, content: string) {
                return `<pre><code class="${codeClass}">\n\n${content}</code></pre>`
            },
        },
    ])


    // Convert to html including modifications
    let html = converter.makeHtml(markdown)
    return `<div class="markdown">${html}</div>`
}
