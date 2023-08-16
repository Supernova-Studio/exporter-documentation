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
  // Describe gradient as (type) (stop1, stop2 ...)
  let type = `${gradientToken.value.type} Gradient`
  let stops = gradientToken.value.stops
    .map((stop) => {
      return `#${stop.color.hex.toUpperCase()}, ${(stop.position * 100).toFixed(2)}%`
    })
    .join(", ")

  return `${type}, ${stops}`
}

/** Describe complex gradient value as token */
export function gradientTokenValue(gradientToken) {
  let gradientType = ""

  switch (gradientToken.value.type) {
    case "Linear":

      // calculate the gradient angle
      const deltaX = Math.round((gradientToken.value.to.x - gradientToken.value.from.x)*100);
      const deltaY = Math.round((gradientToken.value.to.y - gradientToken.value.from.y)*100);

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
  let stops = gradientToken.value.stops
    .map((stop) => {
      return `#${stop.color.hex.toUpperCase()} ${(stop.position * 100).toFixed(2)}%`
    })
    .join(", ")

  return `${gradientType}${stops})`
}

/** Describe complex shadow token */
export function shadowDescription(shadowToken: ShadowToken) {
  
  let connectedShadow = shadowToken.shadowLayers?.reverse().map((shadow) => {
      return shadowTokenValue(shadow)
    })
    .join(", ")
  

  return connectedShadow
}

/** Convert complex shadow value to CSS representation */
export function shadowTokenValue(shadowToken: ShadowToken): string {
  var blurRadius = getValueWithCorrectUnit(nonNegativeValue(shadowToken.value.radius.measure));
  var offsetX = getValueWithCorrectUnit(shadowToken.value.x.measure);
  var offsetY = getValueWithCorrectUnit(shadowToken.value.y.measure);
  var spreadRadius = getValueWithCorrectUnit(shadowToken.value.spread.measure);

  return `${shadowToken.value.type === "Inner" ? "inset " : ""}${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${getFormattedColor(shadowToken.value.color, true)}`
}


/** Scale token values so they are still okay in smaller previews */
export function scaledShadowTokenValue(shadowToken: ShadowToken, scalingParamSum: number): string {  
    var blurRadius = nonNegativeValue(shadowToken.value.radius.measure);
    var offsetX = shadowToken.value.x.measure;
    var offsetY = shadowToken.value.y.measure;
    var spreadRadius = shadowToken.value.spread.measure;
  
    if (scalingParamSum != null) {
      var biggestOffset = Math.max(Math.abs(offsetX), Math.abs(offsetY));
      var allParamsSum = Math.max(nonNegativeValue(blurRadius) + Math.max(spreadRadius, 0) + biggestOffset, 1);
  
      blurRadius = blurRadius * scalingParamSum / allParamsSum;
      offsetX = offsetX * scalingParamSum / allParamsSum;
      offsetY = offsetY * scalingParamSum / allParamsSum;
      spreadRadius = spreadRadius * scalingParamSum / allParamsSum;
    }
  
    return `${shadowToken.value.type === "Inner" ? "inset " : ""}${getValueWithCorrectUnit(offsetX)} ${getValueWithCorrectUnit(offsetY)} ${getValueWithCorrectUnit(blurRadius)} ${getValueWithCorrectUnit(spreadRadius)} ${getFormattedColor(shadowToken.value.color, true)}`
}

export function getFormattedColor(colorValue: {r: number, g: number, b: number, a: number}, forceRgbFormat: boolean = false): string {

  if (colorValue.a === 0 || colorValue.a === 255) {
    if (forceRgbFormat) {
      return `rgb(${colorValue.r},${colorValue.g},${colorValue.b})`
    } else {
      // return as hex by default
      return rgbToHex(colorValue.r, colorValue.g, colorValue.b)
    }
  } else {
    const opacity = Math.round((colorValue.a/255) * 100) / 100;
    return `rgba(${colorValue.r},${colorValue.g},${colorValue.b},${opacity})`
  } 
}

function rgbToHex(r: number, g: number, b:number) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


/** Describe complex shadow token */
export function typographyDescription(typographyToken: TypographyToken) {
  let value = typographyToken.value
  let fontName = `${value.font.family} ${value.font.subfamily}`
  let fontValue = `${value.fontSize.measure}${measureTypeIntoReadableUnit(value.fontSize.unit)}`
  let lineHeightValue = value. lineHeight? `/${value.lineHeight.measure}${measureTypeIntoReadableUnit(value.lineHeight.unit)}` : '';
  let textDecoration: string = ""
  let textCase: string = ""
  if (value.textDecoration !== null && value.textDecoration !== "None") {
    textDecoration = `, ${value.textDecoration.toLowerCase()}`
  }
  if (value.textCase !== null && value.textCase !== "Original") {
    textCase = `, ${value.textCase.toLowerCase()}`
  }

  return `${fontName} ${fontValue}${lineHeightValue}${textDecoration}${textCase}`
}

function getValueWithCorrectUnit(value: number, unit?: string, forceUnit?: boolean): string {
  if (value === 0 && forceUnit !== true) {
    return `${value}`
  } else {
    // todo: add support for other units (px, rem, em, etc.)
    return `${value}px`
  }
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

/** Scale token values so they are still okay in smaller previews */
export function convertTypographyTokenToCSS(typographyToken: TypographyToken, maxFontSize: boolean = false): string {
  let font = typographyToken.value.font;
  let fontSize = typographyToken.value.fontSize;
  let fontSizeMeasure = typographyToken.value.fontSize.measure;
  let textDecoration = typographyToken.value.textDecoration;
  let textCase = convertTextCaseToTextTransform(typographyToken.value.textCase);
  let fontWeight = convertSubfamilyToFontWeight(typographyToken.value.font.subfamily);

  if (maxFontSize === true && fontSize.measure > 24) {
    fontSizeMeasure = 24;
  }

  return `font-family: '${font.family}', Inter, sans-serif; font-weight: ${fontWeight}; font-size: ${fontSizeMeasure}${measureTypeIntoReadableUnit(fontSize.unit)}; text-decoration: ${textDecoration.toLowerCase()}; text-transform: ${textCase};`
}

/** Get color value from settings option */
export function getColorValueFromSettings(value: string | null, alias: any): string | null {
  if (value !== null) {
    return value;
  } else if (alias !== null) {
      return `#${alias.value.hex}`;
  } else {
    return null;
  }
}
