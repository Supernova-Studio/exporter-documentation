import { describe, expect, test, vi } from 'vitest'
import { createAskAiTokenRequest } from '../assets/js/ask-ai-token.js'

describe('Ask AI token request', () => {
  test('concurrent requests share one fetch and one reply', async () => {
    let resolveFetch: (response: unknown) => void = () => {}
    const fetchImpl = vi.fn(
      () => new Promise((resolve) => { resolveFetch = resolve }),
    )
    const requestToken = createAskAiTokenRequest(fetchImpl)

    const first = requestToken()
    const second = requestToken()
    resolveFetch({ status: 200, ok: true, json: async () => ({ token: 't', expiresAt: 1 }) })

    const replies = await Promise.all([first, second])
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    expect(replies[0]).toEqual({ type: 'token', token: 't', expiresAt: 1 })
    expect(replies[1]).toBe(replies[0])
  })
})
