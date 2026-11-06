import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { runInNewContext } from 'node:vm'
import { describe, expect, test, vi } from 'vitest'

const source = readFileSync(
  resolve(__dirname, '../assets/js/functionality.js'),
  'utf8',
)

function loadPage(host: string, hash = '') {
  const events = new Map<string, () => void>()
  const timers: (() => void)[] = []
  const setProperty = vi.fn()
  const observe = vi.fn()
  const resizeCallbacks: (() => void)[] = []
  const banner = { getBoundingClientRect: vi.fn(() => ({ height: 36 })) }
  const target = { closest: () => null, scrollIntoView: vi.fn() }
  const document = {
    documentElement: { style: { setProperty } },
    querySelector: vi.fn(() => banner),
    querySelectorAll: () => [],
    getElementById: (id: string) => id === 'user-content-heading' ? target : null,
  }
  const window = { location: { host, hash }, sandboxEngine: {} }
  const jquery = {
    ready: vi.fn(),
    click: vi.fn(),
    prepend: vi.fn(),
    on: vi.fn((event: string, callback: () => void) => {
      if (event === 'load' || event === 'hashchange') {
        events.set(event, callback)
      }
      return jquery
    }),
  }

  runInNewContext(source, {
    document,
    window,
    $: () => jquery,
    setTimeout: (callback: () => void) => timers.push(callback),
    ResizeObserver: class {
      constructor(callback: () => void) { resizeCallbacks.push(callback) }
      observe = observe
    },
    IntersectionObserver: class { observe = vi.fn() },
  })
  events.get('load')!()

  return { banner, events, jquery, observe, resizeCallbacks, setProperty, target, timers }
}

describe('preview heading navigation', () => {
  test('measures the banner before initial hash navigation and tracks wrapping', () => {
    const page = loadPage('test.preview.supernova-docs.io', '#heading')

    expect(page.setProperty).toHaveBeenLastCalledWith('--previewBannerHeight', '36px')
    expect(page.observe).toHaveBeenCalledWith(page.banner)
    page.timers.forEach(callback => callback())
    expect(page.target.scrollIntoView).toHaveBeenCalledWith({
      block: 'start', inline: 'nearest',
    })

    page.banner.getBoundingClientRect.mockReturnValue({ height: 58 })
    page.resizeCallbacks[0]()
    expect(page.setProperty).toHaveBeenLastCalledWith('--previewBannerHeight', '58px')
    page.events.get('hashchange')!()
    expect(page.target.scrollIntoView).toHaveBeenCalledTimes(2)
  })

  test('leaves published-site offsets unchanged', () => {
    const page = loadPage('docs.example.com')

    expect(page.jquery.prepend).not.toHaveBeenCalled()
    expect(page.setProperty).not.toHaveBeenCalled()
    expect(page.observe).not.toHaveBeenCalled()
  })
})
