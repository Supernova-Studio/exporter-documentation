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

export function contrastColorAPCA(color?: string): "dark" | "light" {
    if (!color) {
      return "dark"
    }
    if (!color.startsWith('#')) {
      color = '#' + color
    }
    if (!isValidHexColor(color)) {
      return "dark"
    }
  
    // check opacity of the color if 8HEX
    if (color.length === 9) {
      const opacity = parseInt(color.slice(7, 9), 16) / 255
      if (opacity < 0.45) {
        return "dark"
      }
    }
  
    const newColor = new Color(color)
  
    const onWhite = Math.abs(newColor.contrast("white", "APCA"))
    const onBlack = Math.abs(newColor.contrast("black", "APCA"))
  
    // Return dark for bright colors, light for dark colors
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

export function getClassForInvertedText(color: string): string {
    if (!color) {
        return ""
    }

    if ((contrastColorAPCA(color) === "light")) {
        return "inverted-text"
    } else {
        return ""
    }
}

function getLuminance(rgb: RGB): number {
    let [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(c => 
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function overlayColor(source: RGB & { a?: number }, background: RGB): RGB {
    const alpha = source.a ?? 1;
    return {
        r: Math.round(source.r * alpha + background.r * (1 - alpha)),
        g: Math.round(source.g * alpha + background.g * (1 - alpha)),
        b: Math.round(source.b * alpha + background.b * (1 - alpha))
    };
}

function getContrastRatio(l1: number, l2: number): number {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

export function getColorContrastRatio(background: ColorTokenValue, foreground: ColorTokenValue): number {
    const bg: RGB = background.color;
    const fg: RGB = foreground.color;
    const fgAlpha = foreground.opacity.measure;

    // Fully opaque foreground
    if (fgAlpha === 1) {
        return Math.round(getContrastRatio(getLuminance(fg), getLuminance(bg)) * 10) / 10;
    }

    // For semi-transparent colors, calculate contrast against both black and white backgrounds
    const blackBg: RGB = { r: 0, g: 0, b: 0 };
    const whiteBg: RGB = { r: 255, g: 255, b: 255 };

    const fgOnBlack = overlayColor({ ...fg, a: fgAlpha }, blackBg);
    const fgOnWhite = overlayColor({ ...fg, a: fgAlpha }, whiteBg);

    const lumBg = getLuminance(bg);
    const lumFgOnBlack = getLuminance(fgOnBlack);
    const lumFgOnWhite = getLuminance(fgOnWhite);

    // Return the minimum contrast ratio
    const ratio = Math.min(
        getContrastRatio(lumBg, lumFgOnBlack),
        getContrastRatio(lumBg, lumFgOnWhite)
    );

    return Math.round(ratio * 10) / 10;
}