const url = require('url');

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

export const isEmbedDocs = (
  inputUrl?: string,
  entityId?: string,
  storybookEntries?: { id: string; origin: { type: string } }[]
) => {
  if (inputUrl) {
    const parsedUrl = url.parse(inputUrl, true);

    return parsedUrl.query['path']?.split('/')?.[1] === 'docs';
  }

  return (
    storybookEntries?.find(({ id }) => id === entityId)?.origin.type === 'docs'
  );
};
