import { afterEach, describe, expect, test, vi } from 'vitest'
import { checkAskAiAvailability, requestAskAiToken } from '../assets/js/ask-ai-token.js'

function stubFetch(reply: () => unknown) {
  const fetchMock = vi.fn(async () => reply())
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

const jsonReply = (body: unknown) => ({ status: 200, ok: true, json: async () => body })
const notJson = () => ({
  status: 200,
  ok: true,
  json: async () => {
    throw new SyntaxError('Unexpected token <')
  },
})
const unreachable = () => {
  throw new TypeError('Failed to fetch')
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Ask AI token request', () => {
  test('posts to the token endpoint and passes the token on', async () => {
    const fetchMock = stubFetch(() => jsonReply({ token: 't', expiresAt: 1 }))

    expect(await requestAskAiToken()).toEqual({ type: 'token', token: 't', expiresAt: 1 })
    expect(fetchMock).toHaveBeenCalledWith('/ask-ai/token', expect.objectContaining({ method: 'POST' }))
  })

  test('is signed-out when the server answers 401', async () => {
    stubFetch(() => ({ status: 401, ok: false }))

    expect(await requestAskAiToken()).toEqual({ type: 'token-error', reason: 'signed-out' })
  })

  test.each([
    ['the server answers 500', () => ({ status: 500, ok: false })],
    ['the answer is not JSON', notJson],
    ['the server cannot be reached', unreachable],
  ])('is unavailable when %s', async (_, reply) => {
    stubFetch(reply)

    expect(await requestAskAiToken()).toEqual({ type: 'token-error', reason: 'unavailable' })
  })
})

describe('Ask AI availability check', () => {
  test('reads the Ask AI config, so no token is created', async () => {
    const fetchMock = stubFetch(() => jsonReply({ isAvailable: true }))

    await checkAskAiAvailability()

    expect(fetchMock).toHaveBeenCalledWith('/ask-ai/config', expect.anything())
  })

  test.each([true, false])('is %s when isAvailable is %s', async (isAvailable) => {
    stubFetch(() => jsonReply({ isAvailable }))

    expect(await checkAskAiAvailability()).toBe(isAvailable)
  })

  test.each([
    ['the server answers 401', () => ({ status: 401, ok: false })],
    ['the server answers 404', () => ({ status: 404, ok: false })],
    ['the answer is not JSON', notJson],
    ['the server cannot be reached', unreachable],
  ])('is null when %s', async (_, reply) => {
    stubFetch(reply)

    expect(await checkAskAiAvailability()).toBeNull()
  })
})
