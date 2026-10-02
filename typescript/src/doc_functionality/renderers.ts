import { getVariantClass, escapeHtml } from './string_utils'
import { tokenValueToHex, getFormattedColor } from './tokens'
import { returnSwatchClassnames } from './color'
import { isNonEmptyString } from './general-utils'
import { getThemesTooltip } from './themes'
import { htmlSafeString } from './sandbox'

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Token-list stack fast-path renderer [RCT-9849]
//
// Pulsar is a tree-walking interpreter: every `{{ x }}` and `{[ if ... ]}` routes through
// getVariableFailable / resolveExpression, and every `{[ inject ... /]}` spawns a fresh
// PLInterpreter + PLInterpreterContext. On a token-heavy page a swatch touches 5-6 nested
// injects (token_list → variant_stack_item → preview_stack → reference_badge + themes_badge
// + value). Batching swatch data in the .pr template and dispatching to one JS function
// collapses those thousands of template invocations into one native call.

// Independent of useFastRenderers so it can be enabled per-DS separately.
export function isFastRenderersTokensEnabled(): boolean {
  return (Pulsar as any)?.exportConfiguration?.useFastRenderersTokens === true
}

// Fast-path for page_block_token_list.pr stack variant with Color tokens.
// Non-Color / empty swatches / mismatched swatch shapes → returns null → template fallback.
// swatchData is batched in the .pr template ([{themedTokens, themes}] per swatch).
export function fastRenderTokenStackToHtml(block: any, swatchData: Array<{themedTokens: any[], themes: any[]}>): string | null {
  if (!isFastRenderersTokensEnabled()) return null
  const variant = String(block?.variantKey || '')
  if (!variant.includes('stack')) return null
  if (!Array.isArray(swatchData) || swatchData.length === 0) return null

  // Non-Color needs preview_small dispatch which this fast path doesn't mirror.
  for (const sd of swatchData) {
    if (!sd || !Array.isArray(sd.themedTokens) || sd.themedTokens.length === 0) return null
    for (const t of sd.themedTokens) if (!t || t.tokenType !== 'Color') return null
  }
  const tokenCount = swatchData[0].themedTokens.length
  for (const sd of swatchData) if (sd.themedTokens.length !== tokenCount) return null

  const iconStrokeWidth = (Pulsar as any)?.exportConfiguration?.iconStrokeWidth ?? 2
  const isMultiSwatch = swatchData.length > 1

  const parts: string[] = ['<div class="stack' + getVariantClass(variant) + '">']
  for (let i = 0; i < tokenCount; i++) {
    parts.push('<div class="stack-item is-color">')
    if (isMultiSwatch) {
      // Mirrors variant_stack_item.pr multi-swatch branch: showName true on first swatch only.
      parts.push('<div class="previews-side-by-side">')
      let showName = true
      for (const sd of swatchData) {
        parts.push(renderColorPreviewStack(sd.themedTokens[i], sd.themes || [], showName, iconStrokeWidth))
        showName = false
      }
      parts.push('</div>')
    } else {
      const sd = swatchData[0]
      parts.push(renderColorPreviewStack(sd.themedTokens[i], sd.themes || [], true, iconStrokeWidth))
    }
    parts.push('</div>')
  }
  parts.push('</div>')
  return parts.join('')
}

// Source: page_block_token_preview_stack.pr + page_block_token_value.pr (Color branches)
function renderColorPreviewStack(token: any, themes: any[], showName: boolean, iconStrokeWidth: number): string {
  const value = token?.value
  if (!value) return ''
  const displayName = String(token?.name || '').replace(/\//g, ' / ')
  const themeClass = themes && themes.length > 0 ? 'theme-value' : ''
  let out = '<div class="preview is-color ' + returnSwatchClassnames(value) + '" style="background-color: ' + tokenValueToHex(value) + ';">'
  out += renderReferenceBadgeColor(token)
  out += renderThemesBadge(themes, iconStrokeWidth)
  // Template emits `{{ escapeHtml(...) }} ` with a trailing space before </div>; match byte-for-byte.
  if (showName) out += '<div class="name">' + (escapeHtml(displayName) ?? '') + ' </div>'
  // Trailing space matches template ternary: class="value " when unthemed, class="value theme-value" otherwise.
  out += '<div class="value ' + themeClass + '"><span class="token-value">' + getFormattedColor(value) + '</span></div>'
  return out + '</div>'
}

function renderReferenceBadgeColor(token: any): string {
  const v = token?.value
  if (!isNonEmptyString(v?.referencedTokenId) || !v?.referencedToken) return ''
  let refName = String(v.referencedToken.name || '')
  // Short names (e.g. "50", "L1") are ambiguous alone; template prepends parent group name.
  if (refName.length < 4 && v.referencedToken.parent) {
    refName = String(v.referencedToken.parent.name || '') + ' ' + refName
  }
  return '<div class="reference-badge" data-toggle="tooltip" title="Referenced token: ' + htmlSafeString(refName) + '" lang="en">' + REFERENCE_BADGE_SVG_COLOR + '</div>'
}

// Source: page_block_token_themes_badge.pr + page_block_token_theme_badge.pr
function renderThemesBadge(themes: any[], iconStrokeWidth: number): string {
  if (!themes || themes.length === 0) return ''
  if (themes.length > 1) {
    return '<div class="theme-badge" data-toggle="tooltip" data-html="true" title="Applied themes:<br /> ' + getThemesTooltip(themes) + ' " lang="en">' + themeIconSvg('', iconStrokeWidth) + '</div>'
  }
  const name = String(themes[0]?.name || '')
  return '<div class="theme-badge" data-toggle="tooltip" title="Applied theme: ' + htmlSafeString(name) + '" lang="en">' + themeIconSvg(name, iconStrokeWidth) + '</div>'
}

// Dispatch matches page_block_token_theme_badge.pr's substring cascade on theme name.
function themeIconSvg(name: string, iconStrokeWidth: number): string {
  const lc = name.toLowerCase()
  let body = THEME_ICON_SVG_BODIES.default
  for (const [keywords, svg] of THEME_ICON_DISPATCH) {
    if (keywords.some(k => lc.includes(k))) { body = svg; break }
  }
  const open = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" stroke-width="' + iconStrokeWidth + '" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">'
  return open + '<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>' + body + '</svg>'
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Baked SVG data

// keep in sync with src/page_body/structure/blocks/tokens/previews/page_block_token_reference_badge.pr (Color branch)
const REFERENCE_BADGE_SVG_COLOR = '<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 16 16 0H0v16Z" fill="currentColor"/><path d="M7.829 2.172a1.5 1.5 0 0 0-2.122 0l-1.06 1.06-.707-.707L5 1.465A2.5 2.5 0 1 1 8.536 5l-1.06 1.06-.708-.706 1.06-1.061a1.5 1.5 0 0 0 0-2.121ZM4.293 7.828l1.06-1.06.708.707L5 8.535A2.5 2.5 0 0 1 1.464 5l1.06-1.06.707.706-1.06 1.061a1.5 1.5 0 0 0 2.121 2.121Z" /><path d="M6.06 3.232 3.233 6.061l.708.707 2.828-2.829-.707-.707Z" /></svg>'

// Inner paths of src/icons/icon_theme_*.pr — keep each entry in sync with the corresponding file.
const THEME_ICON_SVG_BODIES = {
  // keep in sync with src/icons/icon_theme_dark.pr
  dark: '<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path><path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path><path d="M19 11h2m-1 -1v2"></path>',
  // keep in sync with src/icons/icon_theme_light.pr
  light: '<path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656z"></path><path d="M6.343 17.657l-1.414 1.414"></path><path d="M6.343 6.343l-1.414 -1.414"></path><path d="M17.657 6.343l1.414 -1.414"></path><path d="M17.657 17.657l1.414 1.414"></path><path d="M4 12h-2"></path><path d="M12 4v-2"></path><path d="M20 12h2"></path><path d="M12 20v2"></path>',
  // keep in sync with src/icons/icon_theme_contrast.pr
  contrast: '<circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 14l7 -7"></path><path d="M12 19l8.5 -8.5"></path><path d="M12 9l4.5 -4.5"></path>',
  // keep in sync with src/icons/icon_theme_mobile.pr
  mobile: '<rect x="6" y="3" width="12" height="18" rx="2"></rect><line x1="11" y1="4" x2="13" y2="4"></line><line x1="12" y1="17" x2="12" y2="17.01"></line>',
  // keep in sync with src/icons/icon_theme_tablet.pr
  tablet: '<rect x="5" y="3" width="14" height="18" rx="1"></rect><circle cx="12" cy="17" r="1"></circle>',
  // keep in sync with src/icons/icon_theme_desktop.pr
  desktop: '<rect x="3" y="4" width="18" height="12" rx="1"></rect><line x1="7" y1="20" x2="17" y2="20"></line><line x1="9" y1="16" x2="9" y2="20"></line><line x1="15" y1="16" x2="15" y2="20"></line>',
  // keep in sync with src/icons/icon_theme_ios.pr
  ios: '<path d="M9 7c-3 0 -4 3 -4 5.5c0 3 2 7.5 4 7.5c1.088 -.046 1.679 -.5 3 -.5c1.312 0 1.5 .5 3 .5s4 -3 4 -5c-.028 -.01 -2.472 -.403 -2.5 -3c-.019 -2.17 2.416 -2.954 2.5 -3c-1.023 -1.492 -2.951 -1.963 -3.5 -2c-1.433 -.111 -2.83 1 -3.5 1c-.68 0 -1.9 -1 -3 -1z"></path><path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2"></path>',
  // keep in sync with src/icons/icon_theme_android.pr
  android: '<line x1="4" y1="10" x2="4" y2="16"></line><line x1="20" y1="10" x2="20" y2="16"></line><path d="M7 9h10v8a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-8a5 5 0 0 1 10 0"></path><line x1="8" y1="3" x2="9" y2="5"></line><line x1="16" y1="3" x2="15" y2="5"></line><line x1="9" y1="18" x2="9" y2="21"></line><line x1="15" y1="18" x2="15" y2="21"></line>',
  // keep in sync with src/icons/icon_theme.pr (default fallback)
  default: '<path d="M6.8 11a6 6 0 1 0 10.396 0l-5.197 -8l-5.2 8z"></path>',
}

// Substring-to-icon cascade, matches page_block_token_theme_badge.pr order.
const THEME_ICON_DISPATCH: Array<[string[], string]> = [
  [['dark'], THEME_ICON_SVG_BODIES.dark],
  [['light'], THEME_ICON_SVG_BODIES.light],
  [['contrast'], THEME_ICON_SVG_BODIES.contrast],
  [['mobile'], THEME_ICON_SVG_BODIES.mobile],
  [['tablet'], THEME_ICON_SVG_BODIES.tablet],
  [['desktop', 'web'], THEME_ICON_SVG_BODIES.desktop],
  [['ios', 'apple'], THEME_ICON_SVG_BODIES.ios],
  [['android'], THEME_ICON_SVG_BODIES.android],
]
