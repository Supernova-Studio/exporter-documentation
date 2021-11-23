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
      return `#${stop.color.hex.toUpperCase()}, ${stop.position * 100}%`
    })
    .join(", ")

  return `${type}, ${stops}`
}

/** Describe complex gradient value as token */
export function gradientTokenValue(gradientToken) {
  let gradientType = ""
  switch (gradientToken.value.type) {
    case "Linear":
      gradientType = "linear-gradient(0deg, "
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
      return `#${stop.color.hex.toUpperCase()} ${stop.position * 100}%`
    })
    .join(", ")

  return `${gradientType}${stops})`
}

/** Describe complex shadow token */
export function shadowDescription(shadowToken: ShadowToken) {
  return shadowTokenValue(shadowToken)
}

/** Describe complex shadow token */
export function typographyDescription(typographyToken: TypographyToken) {
  let value = typographyToken.value
  let fontName = `${value.font.family} ${value.font.subfamily}`
  let fontValue = `${value.fontSize.measure}${measureTypeIntoReadableUnit(value.fontSize.unit)}`
  let textDecoration: string = ""
  let textCase: string = ""
  if (value.textDecoration !== "None") {
    textDecoration = `, ${value.textDecoration.toLowerCase()}`
  }
  if (value.textCase !== "Original") {
    textCase = `, ${value.textCase.toLowerCase()}`
  }
  return `${fontName} ${fontValue}${textDecoration}${textCase}`
}

/** Describe complex shadow value as token */
export function shadowTokenValue(shadowToken: ShadowToken): string {
  return `${shadowToken.value.type === "Inner" ? "inset " : ""}${shadowToken.value.x.measure}px ${shadowToken.value.y.measure}px ${shadowToken.value.radius.measure}px ${shadowToken.value.spread.measure}px #${shadowToken.value.color.hex}`
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
  
    return `${shadowToken.value.type === "Inner" ? "inset " : ""}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px #${shadowToken.value.color.hex}`
}

function nonNegativeValue(num: number) {
  if (num <= 0) {
    return 0
  } else {
    return num
  }
}

/** Describe complex gradient value as token */
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
  }
}
