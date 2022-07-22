// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Health

export function contrastColor(color: string): "dark" | "light" {
    
    if (!color) {
        return "dark"
    }

    if (color.indexOf('#') === 0) {
        color = color.slice(1);
    } 

    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);

    // Calculate the perceptive luminance
    let luma = ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;

    // Return black for bright colors, white for dark colors
    return luma > 0.5 ? "dark" : "light";
}