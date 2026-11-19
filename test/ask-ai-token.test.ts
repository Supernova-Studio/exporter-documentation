import { readFileSync } from 'node:fs'
import { describe, expect, test, vi } from 'vitest'

function loadCreateTokenRequest(): (fetchImpl: typeof fetch) => () => Promise<unknown> {
  const fakeWindow: Record<string, any> = {}
  new Function('window', readFileSync('assets/js/ask-ai-token.js', 'utf8'))(fakeWindow)
  return fakeWindow.createAskAiTokenRequest
}

describe('Ask AI token request', () => {
  test('concurrent requests share one fetch and one reply', async () => {
    let resolveFetch: (response: unknown) => void = () => {}
    const fetchImpl = vi.fn(
      () => new Promise((resolve) => { resolveFetch = resolve }),
    )
    const requestToken = loadCreateTokenRequest()(fetchImpl as unknown as typeof fetch)

    const first = requestToken()
    const second = requestToken()
    resolveFetch({ status: 200, ok: true, json: async () => ({ token: 't', expiresAt: 1 }) })

    const replies = await Promise.all([first, second])
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    expect(replies[0]).toEqual({ type: 'token', token: 't', expiresAt: 1 })
    expect(replies[1]).toBe(replies[0])
  })
})
