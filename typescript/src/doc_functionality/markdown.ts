import * as Showdown from "showdown"

export function markdownToHTML(markdown: string): string {
    Showdown.setFlavor("github")
    Showdown.setOption('simpleLineBreaks', false)

    let converter = new Showdown.Converter()

    // Mod 1: Change inline <code> to <mark>
    converter.addExtension([
        {
            type: "output",
            regex: '<code>(.*?)<\/code>',
            replace: function (match: string, codeContent) {
                return `<mark>${codeContent}</mark>`
            },
        },
    ])

    // Mod 2: Add default classes to specific tags
    const classMap = {
        table: 'data-table header-row table-bordered'
    }

    const bindings = Object.keys(classMap)
        .map(key => ({
            type: 'output',
            regex: new RegExp(`<${key}(.*)>`, 'g'),
            replace: `<${key} class="${classMap[key]}" $1>`
        }))

    converter.addExtension([...bindings])

    // Mod 3: Add newlines to code blocks
    converter.addExtension([
        {
            type: "output",
            regex: '<pre><code class="(.+?)">((.|\n)*?)<\/code><\/pre>',
            replace: function (match: string, codeClass: string, content: string) {
                return `<pre class="code-block"><code class="language-${codeClass}">\n\n${content}</code></pre>`
            },
        },
    ])

    // Mod 3.1: Handle code blocks without specified language
    converter.addExtension([
        {
            type: "output",
            regex: '<pre><code>',
            replace: function () {
                return `<pre class="code-block"><code class="language-typescript">\n\n`
            },
        },
    ])

    // New Mod 4: Wrap tables in a div
    converter.addExtension([
        {
            type: 'output',
            filter: function(text) {
                return text.replace(/<table/g, '<div class="content-block content-block--table data-table-wrapper"><table')
                           .replace(/<\/table>/g, '</table></div>');
            }
        }
    ])

    let html = converter.makeHtml(markdown)
    return `<div class="markdown">${html}</div>`
}