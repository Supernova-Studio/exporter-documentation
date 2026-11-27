/*
  Calls to the docs server for Ask AI. The docs session cookie goes along, as fetch sends it to the same origin
  by default.
*/

const jsonHeaders = { Accept: 'application/json' };

/*
  Asks for an Ask AI token and resolves to the message the chat expects: `token` with `token` and `expiresAt`,
  or `token-error` with `reason` `signed-out` (no docs session) or `unavailable`. The token is never kept.
*/
export async function requestAskAiToken() {
  try {
    const response = await fetch('/ask-ai/token', {
      method: 'POST',
      headers: jsonHeaders,
    });
    if (response.status === 401) {
      return { type: 'token-error', reason: 'signed-out' };
    }
    if (!response.ok) {
      return { type: 'token-error', reason: 'unavailable' };
    }
    const { token, expiresAt } = await response.json();
    return { type: 'token', token, expiresAt };
  } catch {
    return { type: 'token-error', reason: 'unavailable' };
  }
}

/*
  Asks whether the reader can use Ask AI. This creates no token.
  Resolves to true or false, or null when the server gave no usable answer.
*/
export async function checkAskAiAvailability() {
  try {
    const response = await fetch('/ask-ai/config', { headers: jsonHeaders });
    if (!response.ok) {
      return null;
    }
    const body = await response.json();
    return body.isAvailable === true;
  } catch {
    return null;
  }
}
