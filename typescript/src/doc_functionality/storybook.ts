export function convertStoryPropsToJson(
  input?: unknown,
  defaultValue?: unknown
) {
  if (!input) {
    return JSON.stringify(defaultValue);
  }

  return JSON.stringify(input);
}

export function getActualEmbedUrl(
  embedUrl?: string,
  entityId?: string,
  storybookEntries?: { id: string; url: string }[]
) {
  return (
    embedUrl ?? storybookEntries?.find(entry => entry.id === entityId)?.url
  );
}
