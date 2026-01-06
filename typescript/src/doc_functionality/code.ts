export function mapCodeLanguageToPrismClass(language: string): string {
    let prismClass = "";

    switch (language) {
        case "reacttsx":
            prismClass = "tsx";
            break
        case "reactjsx":
            prismClass = "jsx";
            break
        case "vue":
            prismClass = "markup";
            break
        default:
            prismClass = language;
    }

    return prismClass ? "language-" + prismClass : "";
}