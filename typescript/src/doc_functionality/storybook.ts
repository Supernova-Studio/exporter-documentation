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

const defaultEndpoint = 'index.html';
const embedEndpoint = 'iframe.html';

const fullQueryParameterKey = 'full';
const showAddonsQueryParameterKey = 'addons';
const storiesQueryParameter = 'stories';
const panelQueryParameterKey = 'panel';
const navQueryParameterKey = 'nav';
const viewModeQueryParameter = 'viewMode';

const componentIdQueryParameter = 'id';
const componentPathQueryParameter = 'path';
const componentPathPrefix = 'story';
const docsPathPrefix = 'docs';

const parseStorybookComponentId = (url: any): string | null => {
  const componentId = url.query[componentIdQueryParameter];

  if (componentId !== undefined && componentId !== '') {
    return componentId;
  }

  const componentPath = url.query[componentPathQueryParameter];
  if (componentPath === undefined || componentPath === '') {
    return null;
  }

  // We expect path to be in the form of /story/component-id. In case we encounter such a path
  // we take component id from it, otherwise we don't try to parse it in any way
  const parts = componentPath.split('/');

  const isDocsOrComponent =
    parts[1] === componentPathPrefix || parts[1] === docsPathPrefix;

  if (
    parts.length === 3 &&
    parts[0] === '' &&
    isDocsOrComponent &&
    parts[2] !== ''
  ) {
    return parts[2] ?? null;
  }

  return null;
};

const parseComponentIdCompositePrefix = (componentIdWithPrefix: string) => {
  const parts = componentIdWithPrefix.split('_');

  if (parts.length !== 2) {
    return {
      compositePrefix: undefined,
      componentId: componentIdWithPrefix
    };
  }

  return {
    compositePrefix: parts[0],
    componentId: parts[1]
  };
};

export const embedUrlIncludesAddons = (embedUrl: string): boolean => {
  try {
    const parsedUrl = url.parse(embedUrl, true);
    const addonsValue = parsedUrl.query[showAddonsQueryParameterKey];
    if (addonsValue !== null) {
      return addonsValue !== '0';
    }

    return true;
  } catch {
    // TODO logging?
    return false;
  }
};

export const stripStorybookAddons = (originalUrl: string): URL => {
  // TODO handle this if it errors out?
  const parsedUrl = url.parse(originalUrl, true);
  const componentIdWithPrefix = parseStorybookComponentId(parsedUrl);

  const componentIdParts =
    componentIdWithPrefix !== null
      ? parseComponentIdCompositePrefix(componentIdWithPrefix)
      : null;

  // Embedding without addons can use `iframe.html` endpoint
  const queryParametersToCopy = { ...parsedUrl.query };
  // Remove component path since it's going to be passed inside id parameter
  delete queryParametersToCopy[componentPathQueryParameter];

  // Make sure we are targeting `iframe.html` endpoint
  let newPathSegments = parsedUrl.pathname.split('/');
  if (
    newPathSegments.length > 0 &&
    newPathSegments.at(-1) === defaultEndpoint
  ) {
    newPathSegments.pop();
  }
  if (
    newPathSegments.length === 0 ||
    newPathSegments.at(-1) !== embedEndpoint
  ) {
    newPathSegments.push(embedEndpoint);
  }

  newPathSegments = [
    ...(componentIdParts?.compositePrefix
      ? [componentIdParts.compositePrefix]
      : []),
    ...newPathSegments
  ];

  queryParametersToCopy[fullQueryParameterKey] = '1';
  queryParametersToCopy[showAddonsQueryParameterKey] = '0';
  queryParametersToCopy[storiesQueryParameter] = '0';
  queryParametersToCopy[panelQueryParameterKey] = 'false';
  queryParametersToCopy[navQueryParameterKey] = 'false';
  queryParametersToCopy[viewModeQueryParameter] = 'story';

  if (componentIdParts?.componentId) {
    queryParametersToCopy[componentIdQueryParameter] =
      componentIdParts.componentId;
  }

  const newUrl = url.format({
    protocol: parsedUrl.protocol,
    host: parsedUrl.host,
    pathname: newPathSegments
      .filter(pathSegment => pathSegment && pathSegment.length !== 0)
      .join('/'),
    query: queryParametersToCopy
  });

  return newUrl;
};

export function getActualEmbedUrl(
  embedUrl?: string,
  entityId?: string,
  storybookEntries?: { id: string; url: string; aliases: string[] }[],
  variantKey?: string
) {
  if (!embedUrl) {
    return storybookEntries?.find(
      entry => entry.id === entityId || entry.aliases.includes(entityId ?? '')
    )?.url;
  }

  const actualEmbedUrl =
    variantKey === 'playground' && embedUrlIncludesAddons(embedUrl)
      ? stripStorybookAddons(embedUrl)
      : embedUrl;

  return actualEmbedUrl;
}

/**
 * Returns Storybook URL to embed in a documentation HTML page.
 *
 * In order to avoid 3rd party cookie context, all Storybook sites hosted in Supernova
 * can be accessed via documentation domain by using relative URLs like this. In order
 * to leverage this feature, we need to take the original Storybook page path, prepend
 * `/storybook` in the beginning and make it a relative URL so that it uses current
 * documentation website domain, example:
 *
 *  - original URL: https://storybook.supernova.io/design-systems/12345/alias/darkmatter/index.html
 *  - local URL: /storybook/design-systems/12345/alias/darkmatter/index.html
 *
 * Use this relative URL in iframe `src` property, however keep the original URL for cases like
 * "Open in Storybook" link.
 */
export function getDocsStorybookEmbedUrl(embedUrl: string | undefined | null) {
  const snStorybookUrlRegex = /^https:\/\/storybook(?:\.[a-z0-9-]+)*\.supernova\.io(\/.*)?$/;

  const supernovaStorybookMatch = embedUrl?.match(snStorybookUrlRegex);
  if (supernovaStorybookMatch) {
    return `/storybook${supernovaStorybookMatch[1] ?? ''}`;
  }

  return embedUrl;
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
