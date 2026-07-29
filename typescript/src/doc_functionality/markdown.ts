import * as Showdown from "showdown"

export function markdownToHTML(markdown: string): string {
    Showdown.setFlavor("github")
    Showdown.setOption('simpleLineBreaks', false)

    let converter = new Showdown.Converter({
        // Ignore frontmatter
        metadata: true
    })

    // Showdown does not support Markdown Extra attributes on fenced code blocks.
    converter.addExtension([
        {
            type: "lang",
            regex: /^(\s*`{3,})([^\s`{}]+)\s+\{[^}\r\n]+\}\s*$/gm,
            replace: '$1$2',
        },
    ])

    // Mod 1: Add default classes to specific tags
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

    // Mod 2: Add newlines to code blocks
    converter.addExtension([
        {
            type: "output",
            regex: '<pre><code class="(.+?)">((.|\n)*?)<\/code><\/pre>',
            replace: function (match: string, codeClass: string, content: string) {
                return `<pre class="code-block"><code class="${codeClass}">\n\n${content}</code></pre>`
            },
        },
    ])

    // Mod 2.1: Handle code blocks without specified language
    converter.addExtension([
        {
            type: "output",
            regex: '<pre><code>',
            replace: function () {
                return `<pre class="code-block"><code class="language-typescript">\n\n`
            },
        },
    ])

    // Mod 3: Change inline <code> to <mark> after code blocks have been assigned classes.
    converter.addExtension([
        {
            type: "output",
            regex: '<code>(.*?)<\/code>',
            replace: function (match: string, codeContent) {
                return `<mark>${codeContent}</mark>`
            },
        },
    ])

    // Mod 4: Wrap tables in a div
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
