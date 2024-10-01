// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports


// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Health
const contrast = require("get-contrast");
import Color from "colorjs.io"

export function getColorContrast(color: string): number {
    
    if (!color) {
        return 0
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
    return luma;
}

export function getColorContrastRatio(colorBackground: string, colorForeground: string): number {

    return Math.round(contrast.ratio("#"+colorBackground, "#"+colorForeground) * 10) / 10;
}

export function contrastColor(color: string): "dark" | "light" {
    
    if (!color) {
        return "dark"
    }

    // Return black for bright colors, white for dark colors
    return getColorContrast(color) > 0.4 ? "dark" : "light";
}

function isValidHexColor(str: string) {
    const regex = /^#([0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?([0-9A-Fa-f]{2})?)$/
    return regex.test(str)
  }

export function contrastColorAPCA(color?: string): "dark" | "light" {
    if (!color || !isValidHexColor(color)) {
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
  
    // Return black for bright colors, white for dark colors
    return onWhite > onBlack ? "light" : "dark"
  }

export function returnSwatchClassnames(color: ColorTokenValue): string {
    if (!color) {
        return ""
    }

    let classNames = new Array();

    if (color.hex === "ffffffff") {
        classNames.push("bordered")
    }

    if ((getColorContrast(color.hex) < 0.5 && color.a > 180)) {
        classNames.push("inverted-text")
    }

    return classNames.join(" ");
}

export function getClassForInvertedText(color: string): string {
    if (!color) {
        return ""
    }

    if ((getColorContrast(color) < 0.4)) {
        return "inverted-text"
    } else {
        return ""
    }
}