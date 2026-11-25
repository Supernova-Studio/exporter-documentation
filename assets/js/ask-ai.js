/*
  Ask AI widget

  Opens the Supernova docs agent chat in a floating panel. The chat page (`<agent url>/embed`) runs in an
  iframe that is created on first open only, so pages that never use it don't load it.

  The widget starts hidden. Every page load asks the docs server whether the reader can use Ask AI
  (`GET /ask-ai/config`, which creates no token). The last answer is kept in session storage,
  so on the next page the widget shows straight away and the new answer only corrects it.

  The two windows talk with postMessage. Every message is an envelope
  `{ source: "supernova-docs-agent", version: 1, type, ... }`:
  - iframe to page `ready`: the chat has loaded; the page does nothing
  - iframe to page `close`: the reader closed the chat, so the page hides the panel
  - iframe to page `token-request`: the chat needs a token, so the page asks the docs server
    (`POST /ask-ai/token`, with the docs session cookie) and answers with `token` or `token-error`
  - page to iframe `token`: `token` and `expiresAt` (epoch milliseconds)
  - page to iframe `token-error`: `reason` is `signed-out` (no docs session) or `unavailable`
  Messages to the iframe go to the agent's origin only, and the page keeps no copy of the token.
*/
import {
  checkAskAiAvailability,
  createAskAiTokenRequest,
} from './ask-ai-token';

(function () {
  var MESSAGE_SOURCE = 'supernova-docs-agent';
  var PROTOCOL_VERSION = 1;
  var OPEN_STATE_KEY = 'sn.askAi.open';
  var AVAILABLE_KEY = 'sn.askAi.available';

  var root = document.getElementById('ask-ai');
  if (!root) {
    return;
  }

  var panel = document.getElementById('ask-ai-panel');
  var launcher = document.getElementById('ask-ai-launcher');
  var collapse = document.getElementById('ask-ai-collapse');
  var frame = null;

  var agentOrigin = readAgentOrigin(root.dataset.agentUrl);
  if (!agentOrigin || !panel || !launcher || !collapse) {
    return;
  }

  var requestToken = createAskAiTokenRequest(window.fetch.bind(window));

  function readAgentOrigin(agentUrl) {
    try {
      return new URL(agentUrl).origin;
    } catch (error) {
      return null;
    }
  }

  function embedUrl() {
    var url = new URL('/embed', root.dataset.agentUrl);
    url.searchParams.set('wsId', root.dataset.workspaceId);
    url.searchParams.set('dsId', root.dataset.designSystemId);
    if (root.dataset.versionId) {
      url.searchParams.set('versionId', root.dataset.versionId);
    }
    return url.toString();
  }

  function createFrame() {
    var iframe = document.createElement('iframe');
    iframe.className = 'ask-ai-frame';
    iframe.title = 'Supernova Ask AI';
    iframe.src = embedUrl();
    iframe.setAttribute('allow', 'clipboard-write');
    panel.appendChild(iframe);
    return iframe;
  }

  function postToFrame(message) {
    if (!frame || !frame.contentWindow) {
      return;
    }
    var envelope = Object.assign(
      { source: MESSAGE_SOURCE, version: PROTOCOL_VERSION },
      message,
    );
    frame.contentWindow.postMessage(envelope, agentOrigin);
  }

  function answerTokenRequest() {
    requestToken().then(postToFrame);
  }

  function readChatMessage(event) {
    if (
      !frame ||
      event.source !== frame.contentWindow ||
      event.origin !== agentOrigin
    ) {
      return null;
    }
    var data = event.data;
    if (
      !data ||
      data.source !== MESSAGE_SOURCE ||
      data.version !== PROTOCOL_VERSION
    ) {
      return null;
    }
    return data;
  }

  function rememberOpenState(isOpen) {
    try {
      if (isOpen) {
        sessionStorage.setItem(OPEN_STATE_KEY, '1');
      } else {
        sessionStorage.removeItem(OPEN_STATE_KEY);
      }
    } catch (error) {
      // Storage can be unavailable, e.g. with blocked site data; the panel then just starts closed
    }
  }

  function wasOpen() {
    try {
      return sessionStorage.getItem(OPEN_STATE_KEY) === '1';
    } catch (error) {
      return false;
    }
  }

  function setOpen(isOpen) {
    if (isOpen && !frame) {
      frame = createFrame();
    }
    root.classList.toggle('is-open', isOpen);
    panel.hidden = !isOpen;
    launcher.hidden = isOpen;
    collapse.hidden = !isOpen;
    launcher.setAttribute('aria-expanded', String(isOpen));
    collapse.setAttribute('aria-expanded', String(isOpen));
    rememberOpenState(isOpen);
  }

  function open() {
    setOpen(true);
    collapse.focus();
  }

  function close() {
    setOpen(false);
    launcher.focus();
  }

  launcher.addEventListener('click', open);
  collapse.addEventListener('click', close);

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      root.classList.contains('is-open') &&
      root.contains(document.activeElement)
    ) {
      close();
    }
  });

  window.addEventListener('message', function (event) {
    var message = readChatMessage(event);
    if (!message) {
      return;
    }
    if (message.type === 'token-request') {
      answerTokenRequest();
    } else if (message.type === 'close') {
      close();
    }
  });

  function rememberAvailability(isAvailable) {
    try {
      if (isAvailable) {
        sessionStorage.setItem(AVAILABLE_KEY, '1');
      } else {
        sessionStorage.removeItem(AVAILABLE_KEY);
      }
    } catch (error) {
      // Without storage the widget waits for the server's answer on every page
    }
  }

  function wasAvailable() {
    try {
      return sessionStorage.getItem(AVAILABLE_KEY) === '1';
    } catch (error) {
      return false;
    }
  }

  function show() {
    root.hidden = false;
    // Keep the panel open while the reader moves between pages
    if (wasOpen()) {
      setOpen(true);
    }
  }

  var isShown = wasAvailable();
  if (isShown) {
    show();
  }

  checkAskAiAvailability(window.fetch.bind(window)).then(
    function (availability) {
      if (availability === 'unknown') {
        return;
      }
      var isAvailable = availability === 'available';
      rememberAvailability(isAvailable);
      if (isAvailable && !isShown) {
        isShown = true;
        show();
      } else if (
        !isAvailable &&
        isShown &&
        !root.classList.contains('is-open')
      ) {
        // An open chat stays, so the reader is not cut off mid-conversation
        isShown = false;
        root.hidden = true;
      }
    },
  );
})();
