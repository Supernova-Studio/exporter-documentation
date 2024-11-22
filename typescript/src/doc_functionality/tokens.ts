// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Tokens

/**  Convert group into properly formatted header */
export function fullTokenGroupName(tokenGroup: TokenGroup) {
  // Retrieve token group path
  return [...tokenGroup.path, tokenGroup.name].join("/")
}

/**  Convert group into properly formatted header */
export function formattedTokenGroupHeader(tokenGroup: TokenGroup, showSubpath: boolean) {
  // Retrieve token group either including or not including the path to the group
  if (tokenGroup.path.length > 0 && showSubpath) {
    let light = tokenGroup.path.join(" / ")
    let dark = tokenGroup.name
    return `<span class="light">${light} / </span>${dark}`
  } else {
    return tokenGroup.name
  }
}

/** Describe complex gradient token */
export function gradientDescription(gradientToken: GradientToken) {
  // Describe gradient as (type) (stop1, stop2 ...) for each gradient layer
  return gradientToken.value.map(gradient => {
    let type = `${gradient.type} Gradient`
    let stops = gradient.stops
      .map((stop) => {
        return `${tokenValueToHex(stop.color)}, ${(stop.position * 100).toFixed(2)}%`
      })
      .join(", ")

    return `${type}, ${stops})`
  }).join(" + ")
}

/** Describe complex gradient value as token */
export function gradientTokenValue(gradientToken: GradientToken) {

  let gradientTypes = gradientToken.value.map(gradient => {
    let gradientType = ""

    switch (gradient.type) {
      case "Linear":
        // calculate the gradient angle
        const deltaX = Math.round((gradient.to.x - gradient.from.x)*100);
        const deltaY = Math.round((gradient.to.y - gradient.from.y)*100);

        // adding 90 to move the angle to the correct position
        // todo: take into account the direction of the gradient and position of the each stop
        const angle = Math.round(Math.atan2(deltaY, deltaX)*(180/Math.PI))+90;

        gradientType = `linear-gradient(${angle}deg, `
        break
      case "Radial":
        gradientType = "radial-gradient(circle, "
        break
      case "Angular":
        gradientType = "conic-gradient("
        break
    }

    // Describe gradient as (type) (stop1, stop2 ...)
    // Example: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
    let stops = gradient.stops
      .map((stop) => {
        return `${tokenValueToHex(stop.color)} ${(stop.position * 100).toFixed(2)}%`
      })
      .join(", ")

    return `${gradientType}${stops})`
  }).join(", ")

  return gradientTypes
}

/** Describe complex shadow token */
export function shadowDescription(shadowToken: ShadowToken) {

  let connectedShadow = shadowToken.value?.reverse().map((shadow) => {
      return shadowTokenValue(shadow)
    })
    .join(", ")
  

  return connectedShadow
}

/** Convert complex shadow value to CSS representation */
export function shadowTokenValue(shadowToken: ShadowTokenValue): string {

  var blurRadius = getValueWithPixels(nonNegativeValue(shadowToken.radius));
  var offsetX = getValueWithPixels(shadowToken.x);
  var offsetY = getValueWithPixels(shadowToken.y);
  var spreadRadius = getValueWithPixels(shadowToken.spread);

  return `${shadowToken.type === "Inner" ? "inset " : ""}${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${getFormattedColor(shadowToken.color, true, shadowToken.opacity)}`
}


export function getFormattedColor(colorValue: ColorTokenValue, forceRgbFormat: boolean = false, customOpacity: MeasureTokenValue | null = null): string {
  // Use custom opacity if provided, otherwise use color value's opacity
  const opacity = customOpacity?.measure ?? colorValue.opacity.measure;

  if (opacity === 0 || opacity === 1) {
    if (forceRgbFormat) {
      return `rgb(${colorValue.color.r},${colorValue.color.g},${colorValue.color.b})`
    } else {
      // return as hex by default
      return rgbToHex(colorValue.color.r, colorValue.color.g, colorValue.color.b)
    }
  } else {
    return `rgba(${colorValue.color.r},${colorValue.color.g},${colorValue.color.b},${Number(opacity.toFixed(2))})`
  }
}

function rgbToHex(r: number, g: number, b:number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/** Convert token value to 6-digit hex, or 8-hex when there is lower opacity */
export function tokenValueToHex(tokenValue: ColorTokenValue) {
  // Handle undefined/invalid token value
  if (!tokenValue || !tokenValue.color) {
    return '';
  }

  const { r, g, b } = tokenValue.color;
  const opacity = tokenValue.opacity?.measure;

  // Convert RGB to 6-digit hex
  const hex = rgbToHex(r, g, b).toLowerCase();

  // If opacity is 1 or undefined, return 6-digit hex
  if (opacity === 1) {
    return hex;
  }

  // Convert opacity to 2-digit hex and append to create 8-digit hex
  const alphaHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
  return `${hex}${alphaHex}`;
}


/** Describe complex shadow token */
export function typographyDescription(typographyToken: TypographyToken) {
  let value = typographyToken.value
  let fontName = `${value.fontFamily.text} ${value.fontWeight.text}`
  let fontValue = `${value.fontSize.measure}${measureTypeIntoReadableUnit(value.fontSize.unit)}`
  let lineHeightValue = value.lineHeight?.measure ? `/${value.lineHeight.measure}${measureTypeIntoReadableUnit(value.lineHeight.unit)}` : '';
  let textDecoration: string = ""
  let textCase: string = ""
  if (value.textDecoration.value !== null && value.textDecoration.value !== "None") {
    textDecoration = `, ${value.textDecoration.value.toLowerCase()}`
  }
  if (value.textCase.value !== null && value.textCase.value !== "Original") {
    textCase = `, ${convertTextCaseToTextTransform(value.textCase.value)}`
  }

  return `${fontName} ${fontValue}${lineHeightValue}${textDecoration}${textCase}`
}

function getValueWithPixels(value: number, forceUnit?: boolean): string {
  if (value === 0 && forceUnit !== true) {
    return `${value}`
  } else {
    return `${value}px`
  }
}

export function measureValueToReadableUnit(value: MeasureTokenValue) {
  return `${value.measure}${measureTypeIntoReadableUnit(value.unit)}`
}

function nonNegativeValue(num: number) {
  if (num <= 0) {
    return 0
  } else {
    return num
  }
}

/** Convert type to CSS unit */
export function measureTypeIntoReadableUnit(type: Unit): string {

  switch (type) {
    case "Points":
      return "pt"
    case "Pixels":
      return "px"
    case "Percent":
      return "%"
    case "Ems":
      return "em"
    case "Rem":
      return "rem"
    case "Ms":
      return "ms"
    case "Raw":
      return ""
  }
}

/** Convert textCase to CSS text transform */
export function convertTextCaseToTextTransform(textCase: TextCase): string {

  switch (textCase) {
    case "Upper":
      return "uppercase"
    case "Lower":
      return "lowercase"
    case "Camel":
      return "capitalize"
    default: 
      return "none"
  }
}

/** Convert textCase to CSS text transform */
export function convertTextDecorationToCSS(textDecoration: TextDecoration): string {

  switch (textDecoration) {
    case "Underline":
      return "underline"
    case "Strikethrough":
      return "line-through"
    default: 
      return "none"
  }
}

/** Convert subfamily to CSS font weight */
export function convertSubfamilyToFontWeight(subfamily: string): string {

  switch (subfamily.toLowerCase()) {
    case "thin":
      return "100"
    case "extralight":
      return "200"
    case "light":
      return "300"
    case "regular":
      return "400"
    case "medium":
      return "500"
    case "semibold":
      return "600"
    case "bold":
      return "700"
    case "extrabold":
      return "800"
    case "black":
      return "900"
    default:
      return subfamily
  }
}

export function extendFontFamily(fontFamily: string) {
  return fontFamily.includes(" ")
    ? `'${fontFamily}', '${fontFamily.replace(" ", "")}', Inter, sans-serif`
    : `'${fontFamily}', Inter, sans-serif`;
}

/** Scale token values so they are still okay in smaller previews */
export function convertTypographyTokenToCSS(typographyToken: TypographyToken, maxFontSize: boolean = false): string {

  let fontFamily = typographyToken.value.fontFamily.text;
  let fontSize = normalizeFontSizeCSS(typographyToken.value.fontSize, maxFontSize);
  let textCase = convertTextCaseToTextTransform(typographyToken.value.textCase.value);
  let fontWeight = convertSubfamilyToFontWeight(typographyToken.value.fontWeight.text);
  let textDecorationCSS = convertTextDecorationToCSS(typographyToken.value.textDecoration.value);
  let extendedFontFamily = extendFontFamily(fontFamily);

  return `font-family: ${extendedFontFamily}; font-weight: ${fontWeight}; font-size: ${fontSize}; text-decoration: ${textDecorationCSS}; text-transform: ${textCase};`
}

export function normalizeFontSizeCSS(fontSize: MeasureTokenValue, maxFontSize: boolean = false) {
  let fontSizeMeasure = fontSize.measure;
  const remBase = 16;

  if (maxFontSize === true) {
    const actualSize = fontSize.unit === "Rem" ? fontSize.measure * remBase : fontSize.measure;
    if (actualSize > 24) {
      fontSizeMeasure = fontSize.unit === "Rem" ? 24/remBase : 24;
    }
  }

  return `${fontSizeMeasure}${measureTypeIntoReadableUnit(fontSize.unit)}`;
}

/** Get color value from settings option */
export function getColorValueFromSettings(value: string | null, alias: ColorToken | null): string | null {
  if (value !== null) {
    return value;
  } else if (alias !== null) {
      return `${tokenValueToHex(alias.value)}`;
  } else {
    return null;
  }
}

/*
Return themedToken if non-empty, otherwise return token value 
*/
export function safeToken(themedToken: Token[], token: Token) {
  return themedToken[0] ?? token
}


/*
 Return CSS value for border style
*/
export function getBorderStyleValue(borderStyle: BorderStyle): string {
  return borderStyle?.toLowerCase() ?? "solid"
}

/** Check if the token is in part of dimension token group */
export function isDimensionToken(tokenType: TokenType): boolean {
  return (
    tokenType === "BorderRadius" ||
    tokenType === "BorderWidth" ||
    tokenType === "Dimension" || // Generic dimension in product
    tokenType === "Duration" ||
    tokenType === "FontSize" ||
    tokenType === "LetterSpacing" ||
    tokenType === "LineHeight" ||
    tokenType === "Opacity" ||
    tokenType === "ParagraphSpacing" ||
    tokenType === "Size" ||
    tokenType === "Space" ||
    tokenType === "ZIndex"
  )
}

/** Check if the token is in part of string token group */
export function isStringToken(tokenType: TokenType): boolean {
  return (
    tokenType === "ProductCopy" || 
    tokenType === "String" || 
    tokenType === "FontFamily" || 
    tokenType === "FontWeight"
  )
}
/** Check if the token is in part of string options group */
export function isOptionsToken(tokenType: TokenType): boolean {
  return (
    tokenType === "TextDecoration" ||
    tokenType === "TextCase" ||
    tokenType === "Visibility"
  )
}

/* Converts decimal opacity to percentage */
export function decimalOpacityToPercentage(token: MeasureTokenValue): string {
  return `${Math.round(token.measure * 100)}%`
}
