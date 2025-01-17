// Return the number of columns per asset block
export function getAssetBlockColumnsClassname(columns: number, legacyLayout: string) {
    if (columns) {
        return `grid-${columns}`;
    }

    if (legacyLayout) {
        return legacyLayout.replace('c', 'grid-');
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