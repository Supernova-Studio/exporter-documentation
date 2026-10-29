import { describe, expect, test } from 'vitest'
import { compile } from 'sass'
import {
  getImageContainerStyle,
  getImagePaddingClass,
} from '../typescript/src/doc_functionality/assets'

describe('getImageContainerStyle', () => {
  test('preserves existing styling when options are absent', () => {
    expect(getImageContainerStyle({})).toBe('')
    expect(getImageContainerStyle({ backgroundColor: null })).toBe('')
    expect(getImageContainerStyle({ backgroundColor: { value: null } })).toBe('')
    expect(getImageContainerStyle({ backgroundColor: { value: '' } })).toBe('')
  })

  test('applies the background color without adding padding', () => {
    expect(getImageContainerStyle({ backgroundColor: { value: '#ff0000' } })).toBe(
      'background-color: #ff0000;',
    )
    expect(getImageContainerStyle({ backgroundColor: { value: '#abcdef80' } })).toBe(
      'background-color: #abcdef80;',
    )
  })
})

describe('getImagePaddingClass', () => {
  const css = compile('scss/blocks/image.scss').css

  test('does not add padding when it is absent', () => {
    expect(getImagePaddingClass()).toBe('')
    expect(getImagePaddingClass(null)).toBe('')
  })

  test.each([
    ['None', 'image-padding-none', '0'],
    ['S', 'image-padding-s', '8px'],
    ['M', 'image-padding-m', '16px'],
    ['L', 'image-padding-l', '24px'],
  ] as const)('maps %s to a class with the exact CSS padding', (padding, className, value) => {
    expect(getImagePaddingClass(padding)).toBe(className)
    expect(css).toContain(`.${className} {\n  padding: ${value};\n}`)
    expect(css).toMatch(
      new RegExp(`\\.${className}[^{]*\\{\\s*box-sizing: border-box;`),
    )
  })
})
