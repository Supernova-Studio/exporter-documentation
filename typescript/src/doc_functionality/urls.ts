// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import { firstPageFromTop } from './lookup';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - URLs

/** Generate page slug for the generated page */
export function pageUrl(
  object: DocumentationPage | DocumentationGroup,
  prefix: string | undefined
) {
  // Prevent generation of URLs for objects that are not provided
  if (!object) {
    return '#';
  }

  let page: DocumentationPage | null = null;
  if (object.type === 'Page') {
    page = object as DocumentationPage;
  } else {
    page = firstPageFromTop(object as DocumentationGroup);
  }

  if (!page) {
    return '';
  }

  const pagePathSegments = page.relativeUrl.split('/').filter(Boolean);
  const url = [prefix, ...pagePathSegments].join('/');
  const systemData = Pulsar.systemData?.() as any;
  if (systemData && systemData.environment === 'extension') {
    // For VSCode, retrieve the URL containing .html so local FS can read it
    return url + '.html';
  } else {
    // For web, keep server-obtained URL
    return url;
  }
}

export function pageUrlForFilepath(
  object: DocumentationPage | DocumentationGroup,
  prefix: string | undefined
) {
  let url = pageUrl(object, prefix);
  if (!url.endsWith('.html')) {
    // Make sure file writing URL always ends with .html
    return url + '.html';
  }
  return url;
}

export function pageAnchorUrl(
  page: DocumentationPage,
  anchorId: string | undefined,
  anchorTitle: string | undefined,
  prefix: string | undefined
): string {
  const url = pageUrl(page, prefix);

  return anchorId && anchorTitle ? url + '#' + slugifyHeadingText(anchorId, anchorTitle) : url;
}

/** Generate page slug for the generated page */
export function pageIdentifier(object: DocumentationPage | DocumentationGroup) {
  // Prevent generation of URLs for objects that are not provided
  if (!object) {
    return '#';
  }

  let page: DocumentationPage | null = null;
  if (object.type === 'Page') {
    page = object as DocumentationPage;
  } else {
    page = firstPageFromTop(object as DocumentationGroup);
  }

  if (!page) {
    return '';
  }

  return ['page', 'body', page.relativeUrl].join('/').replace('/', '-');
}

/** Create proper url that changes with the folder-depth of the documentation */
export function rootUrl(asset: string, prefix: string | undefined) {
  let fragments = [prefix, asset];

  // Retrieve url-safe path constructed as [host][asset-slug]
  let path = fragments.join('/');
  return path;
}

/** Create proper url that changes with the folder-depth of the documentation */
export function assetUrl(asset: string, prefix: string | undefined) {
  let assetFolder = 'assets';
  let fragments = [prefix, assetFolder, asset];

  // Retrieve url-safe path constructed as [host][asset-folder][asset-slug]
  let path = fragments.join('/');
  return path;
}

/** Pulsar {{ domain }} variable is returning the URL with the version -> this function removes it from it */
export function removeVersionFromDomainUrl(url: string) {
  return url.substring(0, url.lastIndexOf('/'));
}

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Headings

export function textBlockPlainText(
  header: DocumentationPageBlockHeading
): string {
  return header.text.spans.map(s => s.text).join('');
}

export function slugifyHeading(header: DocumentationPageBlockHeading): string {
  return slugifyHeadingText(header.id, textBlockPlainText(header));
}

function slugifyHeadingText(headerId: string, headerFullText: string = ''): string {
  return 'section-' + slugify(headerFullText) + '-' + headerId.substring(0, 2);
}

function slugify(str: string = ''): string {
  if (!str) {
    return '';
  }

  // Thanks to https://gist.github.com/codeguy/6684588
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaaeeeeiiiioooouuuunc------';

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
