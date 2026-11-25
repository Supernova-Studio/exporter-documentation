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
  test('reads the Ask AI config, so no token is created', async () => {
    const fetchImpl = vi.fn(async () => ({ status: 200, ok: true, json: async () => ({ isAvailable: true }) }))

    await checkAskAiAvailability(fetchImpl)

    expect(fetchImpl).toHaveBeenCalledWith('/ask-ai/config', expect.objectContaining({ credentials: 'same-origin' }))
  })

  test.each([
    [true, 'available'],
    [false, 'unavailable'],
  ])('maps isAvailable %s to %s', async (isAvailable, availability) => {
    const fetchImpl = vi.fn(async () => ({ status: 200, ok: true, json: async () => ({ isAvailable }) }))

    expect(await checkAskAiAvailability(fetchImpl)).toBe(availability)
  })

  test.each([401, 404, 500])('is unknown when the server answers %i', async (status) => {
    const fetchImpl = vi.fn(async () => ({ status, ok: false }))

    expect(await checkAskAiAvailability(fetchImpl)).toBe('unknown')
  })

  test('is unknown when the answer is not JSON', async () => {
    const fetchImpl = vi.fn(async () => ({
      status: 200,
      ok: true,
      json: async () => {
        throw new SyntaxError('Unexpected token <')
      },
    }))

    expect(await checkAskAiAvailability(fetchImpl)).toBe('unknown')
  })

  test('is unknown when the server cannot be reached', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('Failed to fetch')
    })

    expect(await checkAskAiAvailability(fetchImpl)).toBe('unknown')
  })
})
