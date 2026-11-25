import { describe, expect, test, vi } from 'vitest'
import { checkAskAiAvailability, createAskAiTokenRequest } from '../assets/js/ask-ai-token.js'

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

describe('Ask AI availability check', () => {
  test('asks for a dry run, so no token is created', async () => {
    const fetchImpl = vi.fn(async () => ({ status: 200, ok: true }))

    await checkAskAiAvailability(fetchImpl)

    expect(fetchImpl).toHaveBeenCalledWith(
      '/auth/agent-token?dryRun=true',
      expect.objectContaining({ method: 'POST', credentials: 'same-origin' }),
    )
  })

  test.each([
    [200, 'available'],
    [401, 'signed-out'],
    [403, 'unavailable'],
    [500, 'unavailable'],
  ])('maps status %i to %s', async (status, availability) => {
    const fetchImpl = vi.fn(async () => ({ status, ok: status === 200 }))

    expect(await checkAskAiAvailability(fetchImpl)).toBe(availability)
  })

  test('is unknown when the server cannot be reached', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })

    expect(await checkAskAiAvailability(fetchImpl)).toBe('unknown')
  })
})
