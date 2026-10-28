/*-----------------------------
    Docs agent (POC) - chat side panel
------------------------------- */

// POC: the chat comes from a locally running docs agent
const DOCS_AGENT_URL = 'http://localhost:2001';
const DOCS_AGENT_OPEN_KEY = 'supernova.docsAgent.isOpen';

$(function () {
  const $toggle = $('#docs-agent-toggle');
  const $panel = $('#docs-agent-panel');
  if (!$toggle.length || !$panel.length) {
    return;
  }

  let $frame = null;

  // The page's published address, the same one its SEO tags carry
  function docsAgentChatUrl() {
    const docsUrl = $('meta[property="og:url"]').attr('content') || '';
    return `${DOCS_AGENT_URL}/embed?${new URLSearchParams({ docsUrl })}`;
  }

  function setOpen(isOpen) {
    // The chat loads on first open, so pages that never use it do not pay for it
    if (isOpen && !$frame) {
      $frame = $('<iframe>', {
        title: 'Documentation assistant',
        allow: 'clipboard-write',
        src: docsAgentChatUrl(),
      }).appendTo($panel);
    }

    $panel.prop('hidden', !isOpen);
    $toggle.attr('aria-expanded', String(isOpen));
    try {
      sessionStorage.setItem(DOCS_AGENT_OPEN_KEY, isOpen ? '1' : '0');
    } catch (error) {}
  }

  $toggle.on('click', function () {
    setOpen($panel.prop('hidden'));
  });

  // The chat's own close button asks the page to hide the panel
  $(window).on('message', function (event) {
    const message = event.originalEvent;
    if (!$frame || message.source !== $frame[0].contentWindow) {
      return;
    }

    const data = message.data;
    if (
      data &&
      data.source === 'supernova-docs-agent' &&
      data.type === 'close'
    ) {
      setOpen(false);
    }
  });

  // Keeps the chat open when the reader follows a link to another page
  try {
    if (sessionStorage.getItem(DOCS_AGENT_OPEN_KEY) === '1') {
      setOpen(true);
    }
  } catch (error) {}
});
