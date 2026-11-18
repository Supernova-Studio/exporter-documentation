// Return the number of columns per asset block
export function getAssetBlockColumnsClassname(columns: number, legacyLayout: string) {
    if (columns) {
        return `grid-${columns}`;
    }

    if (legacyLayout) {
        return legacyLayout.toLowerCase().replace('c', 'grid-');
    }

    return "grid-4";
}

// Sort assets by name alphabetically
export function sortAssetsByName(assets: Array<{ name: string }>) {
    return assets.sort((a, b) => a.name.localeCompare(b.name));
}

// Get the CSS variable override for the style
export function getDynamicVariableForStyle(variableName: string, value: string, unit: string = "") {
    return `${variableName}: ${value}${unit};`;
}

export function getImageContainerStyle(block: {
    backgroundColor?: { value: string | null } | null;
}): string {
    return block.backgroundColor?.value
        ? `background-color: ${block.backgroundColor.value};`
        : "";
}

export function getImagePaddingClass(padding?: "None" | "S" | "M" | "L" | null): string {
    switch (padding) {
        case "None":
            return "image-padding-none";
        case "S":
            return "image-padding-s";
        case "M":
            return "image-padding-m";
        case "L":
            return "image-padding-l";
        default:
            return "";
    }
}