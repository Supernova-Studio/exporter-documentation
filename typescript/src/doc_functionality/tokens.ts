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
export function shadowTokenValue(shadowToken: ShadowToken) {
  return `${shadowToken.value.type === "Inner" ? "inset " : ""}${shadowToken.value.x.measure}px ${shadowToken.value.y.measure}px ${shadowToken.value.radius.measure}px ${shadowToken.value.spread.measure}px #${shadowToken.value.color.hex}`
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
