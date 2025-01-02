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
export function sortAssetsByName(assets: any[]) {
    return assets.sort((a, b) => a.name.localeCompare(b.name));
}