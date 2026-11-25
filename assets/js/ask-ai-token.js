/*
  Asks the docs server for an Ask AI token. Calls made while a request is in flight share it, and the
  token is never kept, so every request after that goes back to the server.
*/
export function createAskAiTokenRequest(fetchImpl) {
  var inFlight = null;

  function readReply(response) {
    if (response.status === 401) {
      return Promise.resolve({ type: 'token-error', reason: 'signed-out' });
    }
    if (!response.ok) {
      return Promise.resolve({ type: 'token-error', reason: 'unavailable' });
    }
    return response.json().then(function (body) {
      return { type: 'token', token: body.token, expiresAt: body.expiresAt };
    });
  }

  function requestReply() {
    return fetchImpl('/auth/agent-token', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    })
      .then(readReply)
      .catch(function () {
        return { type: 'token-error', reason: 'unavailable' };
      });
  }

  return function requestToken() {
    if (!inFlight) {
      inFlight = requestReply().then(function (reply) {
        inFlight = null;
        return reply;
      });
    }
    return inFlight;
  };
}

/*
  Asks the docs server whether the reader can use Ask AI, with a dry run that creates no token.
  Resolves to `available`, `signed-out`, `unavailable`, or `unknown` when the server could not be reached.
*/
export function checkAskAiAvailability(fetchImpl) {
  return fetchImpl('/auth/agent-token?dryRun=true', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
  })
    .then(function (response) {
      if (response.ok) {
        return 'available';
      }
      return response.status === 401 ? 'signed-out' : 'unavailable';
    })
    .catch(function () {
      return 'unknown';
    });
}
