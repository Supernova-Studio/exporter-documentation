// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Health
const contrast = require("get-contrast");
import Color from "colorjs.io"
import { tokenValueToHex } from "./tokens";

function isValidHexColor(str: string) {
    const regex = /^#([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?([0-9A-Fa-f]{2})?)$/
    return regex.test(str)
  }

/**
 * Determines whether a color should use dark or light text based on APCA contrast.
 * Uses the APCA (Advanced Perceptual Contrast Algorithm) to calculate contrast ratios
 * and determine optimal text color.
 * 
 * @param color - Optional hex color string (with or without leading #)
 * @returns "dark" for light background colors, "light" for dark background colors
 */
export function contrastColorAPCA(color?: string): "dark" | "light" {
    // Default to dark text if no color provided
    if (!color) {
      return "dark"
    }

    // Ensure color has # prefix
    if (!color.startsWith('#')) {
      color = '#' + color
    }

    // Return default if invalid hex format
    if (!isValidHexColor(color)) {
      return "dark"
    }
  
    // For 8-digit hex colors (with alpha channel)
    if (color.length === 9) {
      // Extract and normalize opacity value to 0-1 range
      const opacity = parseInt(color.slice(7, 9), 16) / 255
      // Use dark text for semi-transparent colors
      if (opacity < 0.45) {
        return "dark"
      }
    }
  
    // Create Color object for contrast calculations
    const newColor = new Color(color)
  
    // Calculate absolute contrast values against white and black
    const onWhite = Math.abs(newColor.contrast("white", "APCA"))
    const onBlack = Math.abs(newColor.contrast("black", "APCA"))
  
    // Return light text if contrast with white is stronger,
    // dark text if contrast with black is stronger
    return onWhite > onBlack ? "light" : "dark"
  }

export function returnSwatchClassnames(color: ColorTokenValue): string {
    if (!color) {
        return ""
    }

    let classNames = new Array();

    const hexValue = tokenValueToHex(color)

    if (hexValue === "#ffffff") {
        classNames.push("bordered")
    }

    if ((contrastColorAPCA(hexValue) === "light" && color.opacity.measure > 0.5)) {
        classNames.push("inverted-text")
    }

    return classNames.join(" ");
    
}

/**
 * Determines if a color should use inverted (light) text based on its contrast.
 * Returns the CSS class name "inverted-text" for dark background colors that need light text,
 * or an empty string for light background colors that should use dark text.
 * 
 * @param color - The color value to check, as a hex string
 * @returns "inverted-text" if the color needs light text, empty string otherwise
 */
export function getClassForInvertedText(color: string): string {
    // Return empty string for null/undefined colors
    if (!color) {
        return ""
    }

    // Check if the color has "light" contrast (meaning it's a dark color)
    // and return the inverted text class if so
    if ((contrastColorAPCA(color) === "light")) {
        return "inverted-text"
    } else {
        return ""
    }
}

/**
 * Calculates the relative luminance of a color according to WCAG 2.0 specification.
 * 
 * The relative luminance is the relative brightness of any point, normalized to 0 for black and 1 for white.
 * Formula from: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 * 
 * The calculation involves:
 * 1. Normalizing RGB values to 0-1 range
 * 2. Converting to linear RGB space using the sRGB transfer function
 * 3. Applying luminance coefficients that account for human perception of different colors
 *    (humans are most sensitive to green, less to red, and least to blue)
 * 
 * @param rgb The RGB color values
 * @returns The relative luminance value between 0 and 1
 */
function getLuminance(rgb: RGB): number {
    // Normalize RGB values to 0-1 range and convert to linear RGB space
    let [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(c => 
        // Use simple linear conversion for small values, power function for larger ones
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    // Apply luminance coefficients: 21.26% red, 71.52% green, 7.22% blue
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates the resulting color when overlaying a semi-transparent color on top of a background color.
 * Uses the standard alpha compositing formula: result = (source × alpha) + (background × (1 - alpha))
 * 
 * @param source The source (foreground) color with optional alpha value
 * @param background The solid background color
 * @returns The resulting RGB color after compositing
 *
 * Example:
 * - source: {r: 255, g: 0, b: 0, a: 0.5} (semi-transparent red)
 * - background: {r: 255, g: 255, b: 255} (white)
 * - result: {r: 255, g: 128, b: 128} (pink)
 */
function overlayColor(source: RGB & { a?: number }, background: RGB): RGB {
    // Use alpha value from source if provided, otherwise default to 1 (fully opaque)
    const alpha = source.a ?? 1;
    
    return {
        // For each RGB channel, apply the alpha compositing formula and round to nearest integer
        r: Math.round(source.r * alpha + background.r * (1 - alpha)),
        g: Math.round(source.g * alpha + background.g * (1 - alpha)),
        b: Math.round(source.b * alpha + background.b * (1 - alpha))
    };
}

/**
 * Calculates the contrast ratio between two colors based on their relative luminance.
 * 
 * @param l1 The relative luminance of the first color
 * @param l2 The relative luminance of the second color
 * @returns The contrast ratio as a number
 */
function getContrastRatio(l1: number, l2: number): number {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculates the contrast ratio between a background color and a foreground color.
 * For semi-transparent foreground colors, calculates the worst-case contrast ratio
 * by comparing against both black and white backgrounds.
 * 
 * The contrast ratio is rounded to 1 decimal place and ranges from 1:1 (no contrast) 
 * to 21:1 (maximum contrast).
 * 
 * @param background The background color token containing RGB values
 * @param foreground The foreground color token containing RGB values and opacity
 * @returns The contrast ratio as a number with 1 decimal place precision
 * 
 * Example:
 * - background: {color: {r: 255, g: 255, b: 255}} (white)
 * - foreground: {color: {r: 0, g: 0, b: 0}, opacity: {measure: 0.5}} (50% black)
 * - returns: 5.3 (contrast ratio accounting for transparency)
 */
export function getColorContrastRatio(background: ColorTokenValue, foreground: ColorTokenValue): number {
    const bg: RGB = background.color;
    const fg: RGB = foreground.color;
    const fgAlpha = foreground.opacity.measure;

    // For fully opaque colors, simply calculate direct contrast ratio
    if (fgAlpha === 1) {
        return Math.round(getContrastRatio(getLuminance(fg), getLuminance(bg)) * 10) / 10;
    }

    // For semi-transparent colors, we need to:
    // 1. Calculate how the color appears when overlaid on both black and white
    // 2. Compare those results against the background color
    // 3. Use the worst (minimum) contrast ratio to ensure accessibility
    const blackBg: RGB = { r: 0, g: 0, b: 0 };
    const whiteBg: RGB = { r: 255, g: 255, b: 255 };

    // Calculate the resulting colors when overlaying on black and white
    const fgOnBlack = overlayColor({ ...fg, a: fgAlpha }, blackBg);
    const fgOnWhite = overlayColor({ ...fg, a: fgAlpha }, whiteBg);

    // Calculate luminance values for all colors
    const lumBg = getLuminance(bg);
    const lumFgOnBlack = getLuminance(fgOnBlack);
    const lumFgOnWhite = getLuminance(fgOnWhite);

    // Get the minimum contrast ratio and round to 1 decimal place
    const ratio = Math.min(
        getContrastRatio(lumBg, lumFgOnBlack),
        getContrastRatio(lumBg, lumFgOnWhite)
    );

    return Math.round(ratio * 10) / 10;
}