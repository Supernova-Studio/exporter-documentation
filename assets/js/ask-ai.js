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
  - iframe to page `openPage`: the reader clicked a docs page in the chat, so the page goes to its `url`
    (http or https only) and the panel stays open there
  - iframe to page `token-request`: the chat needs a token, so the page asks the docs server
    (`POST /ask-ai/token`, with the docs session cookie) and answers with `token` or `token-error`
  - page to iframe `token`: `token` and `expiresAt` (epoch milliseconds)
  - page to iframe `token-error`: `reason` is `signed-out` (no docs session) or `unavailable`
  Messages to the iframe go to the agent's origin only, and the page keeps no copy of the token.
*/
import { checkAskAiAvailability, requestAskAiToken } from './ask-ai-token';

const MESSAGE_SOURCE = 'supernova-docs-agent';
const PROTOCOL_VERSION = 1;
const OPEN_KEY = 'sn.askAi.open';
const AVAILABLE_KEY = 'sn.askAi.available';

// Session storage can be unavailable, e.g. with blocked site data; the widget then waits for the server
// on every page and the panel starts closed
function readFlag(key) {
  try {
    return sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeFlag(key, isOn) {
  try {
    if (isOn) {
      sessionStorage.setItem(key, '1');
    } else {
      sessionStorage.removeItem(key);
    }
  } catch {}
}

// Only web links, so a message can never run a `javascript:` URL on the docs page
function openPage(url) {
  let target;
  try {
    target = new URL(url, window.location.href);
  } catch {
    return;
  }
  if (target.protocol === 'https:' || target.protocol === 'http:') {
    window.location.assign(target.href);
  }
}

function initAskAi() {
  const root = document.getElementById('ask-ai');
  const panel = document.getElementById('ask-ai-panel');
  const launcher = document.getElementById('ask-ai-launcher');
  const collapse = document.getElementById('ask-ai-collapse');
  if (!root || !panel || !launcher || !collapse) {
    return;
  }

  const { agentUrl, workspaceId, designSystemId } = root.dataset;
  let embedUrl;
  try {
    embedUrl = new URL('/embed', agentUrl);
  } catch {
    return;
  }
  const agentOrigin = embedUrl.origin;
  embedUrl.searchParams.set('wsId', workspaceId);
  embedUrl.searchParams.set('dsId', designSystemId);

  let frame = null;

  function setOpen(isOpen) {
    if (isOpen && !frame) {
      frame = document.createElement('iframe');
      frame.className = 'ask-ai-frame';
      frame.title = 'Supernova Ask AI';
      frame.src = embedUrl.toString();
      frame.allow = 'clipboard-write';
      panel.appendChild(frame);
    }
    root.classList.toggle('is-open', isOpen);
    panel.hidden = !isOpen;
    launcher.hidden = isOpen;
    collapse.hidden = !isOpen;
    launcher.setAttribute('aria-expanded', String(isOpen));
    collapse.setAttribute('aria-expanded', String(isOpen));
    writeFlag(OPEN_KEY, isOpen);
  }

  function close() {
    setOpen(false);
    launcher.focus();
  }

  launcher.addEventListener('click', () => {
    setOpen(true);
    collapse.focus();
  });
  collapse.addEventListener('click', close);

  window.addEventListener('message', (event) => {
    const message = event.data;
    if (
      !frame ||
      event.source !== frame.contentWindow ||
      event.origin !== agentOrigin ||
      message?.source !== MESSAGE_SOURCE ||
      message.version !== PROTOCOL_VERSION
    ) {
      return;
    }
    if (message.type === 'token-request') {
      requestAskAiToken().then((reply) => {
        frame.contentWindow?.postMessage(
          { source: MESSAGE_SOURCE, version: PROTOCOL_VERSION, ...reply },
          agentOrigin,
        );
      });
    } else if (message.type === 'close') {
      close();
    } else if (message.type === 'openPage') {
      openPage(message.url);
    }
  });

  function show() {
    root.hidden = false;
    // Keep the panel open while the reader moves between pages
    if (readFlag(OPEN_KEY)) {
      setOpen(true);
    }
  }

  if (readFlag(AVAILABLE_KEY)) {
    show();
  }

  checkAskAiAvailability().then((isAvailable) => {
    if (isAvailable === null) {
      return;
    }
    writeFlag(AVAILABLE_KEY, isAvailable);
    if (isAvailable && root.hidden) {
      show();
    } else if (!isAvailable && !root.classList.contains('is-open')) {
      // An open chat stays, so the reader is not cut off mid-conversation
      root.hidden = true;
    }
  });
}

initAskAi();
