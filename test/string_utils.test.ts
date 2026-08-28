import { describe, expect, test } from 'vitest'

import { escapeHtml } from '../typescript/src/doc_functionality/string_utils'

describe('escapeHtml', () => {
  // Pulsar templates interpolate the return value directly, so a missing
  // optional value (e.g. a component property description) must produce an
  // empty string — `undefined` would render as the literal text "undefined".
  test('returns empty string for missing values', () => {
    expect(escapeHtml(undefined as unknown as string)).toBe('')
    expect(escapeHtml(null as unknown as string)).toBe('')
    expect(escapeHtml('')).toBe('')
  })

  test('returns strings without special characters unchanged', () => {
    expect(escapeHtml('MUI Status')).toBe('MUI Status')
  })

  test('escapes HTML special characters', () => {
    expect(escapeHtml('<b>"a" & \'b\'</b>')).toBe('&lt;b&gt;&quot;a&quot; &amp; &#39;b&#39;&lt;/b&gt;')
  })
})
