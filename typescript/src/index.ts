// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Imports

import {
  getColorContrastRatio,
  returnSwatchClassnames,
  getClassForInvertedText,
  contrastColorAPCA
} from './doc_functionality/color';
import {
  convertHealthTagIfAny,
  getFigmaFileUrl,
  sortComponentsAlphabetically
} from './doc_functionality/health';
import {
  firstPageFromTop,
  firstSubgroupOfPage,
  flattenedPageStructure,
  isExportable,
  nextPage,
  pageOrGroupActiveInContext,
  previousPage,
  isHomepage,
  resolveMenuLabel,
  getCurrentTimestamp,
  checkKeyInArray,
  firstTabGroupFromTop,
  isHomepageTab
} from './doc_functionality/lookup';
import { markdownToHTML } from './doc_functionality/markdown';
import { htmlSafeString, htmlSafeUrl } from './doc_functionality/sandbox';
import { buildSearchIndexJSON } from './doc_functionality/search';
import {
  highlightSafeString,
  withHTMLNewlines,
  getUrlExtension,
  changelogToEntries,
  getSearchIDString,
  getVariantClass,
  escapeHtml,
  addSlashes,
  normalizeStringForSearch
} from './doc_functionality/string_utils';
import {
  convertTypographyTokenToCSS,
  formattedTokenGroupHeader,
  fullTokenGroupName,
  gradientDescription,
  gradientTokenValue,
  measureTypeIntoReadableUnit,
  shadowDescription,
  shadowTokenValue,
  typographyDescription,
  getFormattedColor,
  getColorValueFromSettings,
  safeToken,
  tokenValueToHex,
  getBorderStyleValue,
  measureValueToReadableUnit,
  isDimensionToken,
  isStringToken,
  decimalOpacityToPercentage,
  isOptionsToken,
  extendFontFamily,
  normalizeFontSizeCSS,
  convertTextDecorationToCSS,
  convertTextCaseToTextTransform
} from './doc_functionality/tokens';
import {
  assetUrl,
  textBlockPlainText,
  pageUrl,
  pageUrlForFilepath,
  rootUrl,
  pageAnchorUrl,
  slugifyHeading,
  pageIdentifier,
  removeVersionFromDomainUrl
} from './doc_functionality/urls';
import {
  generateCustomCSSHash,
  getFormattedDateTime,
  getFullYear,
  includes,
  sortVersionsBySemver,
  safeArray,
  isNonEmptyString,
  objectValues,
  objectEntries
} from './doc_functionality/general-utils';
import {
  getComponentPreviews,
  sortComponentsPreviews
} from './doc_functionality/components';
import { getThemesTooltip } from './doc_functionality/themes';
import {
  getDynamicVariableForStyle,
  getAssetBlockColumnsClassname,
  sortAssetsByName
} from './doc_functionality/assets';
import {
  extractFontFamiliesFromTokens,
  processFontsForLoading,
  getDefaultBrand,
  getFontFormat
} from './doc_functionality/fonts';
import { isEmbedDocs } from './doc_functionality/storybook';
import { getActualEmbedUrl } from './doc_functionality/storybook';
import { convertStoryPropsToJson } from './doc_functionality/storybook';
import {
  convertFileToShortcut,
  getActualFileName,
  getFileFromFiles,
  getFilesVariantClass,
  getFileTypeFromFileName,
  getIconUrlFromFileType
} from './doc_functionality/files';

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - Blueprint functions

/* Local lookup */
Pulsar.registerFunction('firstSubgroupOfPage', firstSubgroupOfPage);
Pulsar.registerFunction(
  'pageOrGroupActiveInContext',
  pageOrGroupActiveInContext
);
Pulsar.registerFunction('flattenedPageStructure', flattenedPageStructure);
Pulsar.registerFunction('firstPageFromTop', firstPageFromTop);
Pulsar.registerFunction('previousPage', previousPage);
Pulsar.registerFunction('nextPage', nextPage);
Pulsar.registerFunction('isExportable', isExportable);
Pulsar.registerFunction('isHomepage', isHomepage);
Pulsar.registerFunction('isHomepageTab', isHomepageTab);
Pulsar.registerFunction('resolveMenuLabel', resolveMenuLabel);
Pulsar.registerFunction('getCurrentTimestamp', getCurrentTimestamp);
Pulsar.registerFunction('checkKeyInArray', checkKeyInArray);
Pulsar.registerFunction('firstTabGroupFromTop', firstTabGroupFromTop);

/* General utils */
Pulsar.registerFunction('getFullYear', getFullYear);
Pulsar.registerFunction('getFormattedDateTime', getFormattedDateTime);
Pulsar.registerFunction('generateCustomCSSHash', generateCustomCSSHash);
Pulsar.registerFunction('includes', includes);
Pulsar.registerFunction('objectValues', objectValues);
Pulsar.registerFunction('objectEntries', objectEntries);
Pulsar.registerFunction('sortVersionsBySemver', sortVersionsBySemver);
Pulsar.registerFunction('safeArray', safeArray);
Pulsar.registerFunction('isNonEmptyString', isNonEmptyString);

/* String utilities */
Pulsar.registerFunction('highlightSafeString', highlightSafeString);
Pulsar.registerFunction('withHTMLNewlines', withHTMLNewlines);
Pulsar.registerFunction('getUrlExtension', getUrlExtension);
Pulsar.registerFunction('escapeHtml', escapeHtml);
Pulsar.registerFunction('addSlashes', addSlashes);
Pulsar.registerFunction('normalizeStringForSearch', normalizeStringForSearch);
Pulsar.registerFunction('getFontFormat', getFontFormat);

/* Themes utilities */
Pulsar.registerFunction('getThemesTooltip', getThemesTooltip);

/* Class/IDs */
Pulsar.registerFunction('getSearchIDString', getSearchIDString);
Pulsar.registerFunction('getVariantClass', getVariantClass);

/* Front-end search support */
Pulsar.registerFunction('buildSearchIndexJSON', buildSearchIndexJSON);

/* URL manipulation and support */
Pulsar.registerFunction('pageUrl', pageUrl);
Pulsar.registerFunction('pageUrlForFilepath', pageUrlForFilepath);
Pulsar.registerFunction('pageAnchorUrl', pageAnchorUrl);
Pulsar.registerFunction('pageIdentifier', pageIdentifier);
Pulsar.registerFunction('rootUrl', rootUrl);
Pulsar.registerFunction('assetUrl', assetUrl);
Pulsar.registerFunction('slugifyHeading', slugifyHeading);
Pulsar.registerFunction('textBlockPlainText', textBlockPlainText);
Pulsar.registerFunction(
  'removeVersionFromDomainUrl',
  removeVersionFromDomainUrl
);

/* Token manipulation and formatting */
Pulsar.registerFunction('formattedTokenGroupHeader', formattedTokenGroupHeader);
Pulsar.registerFunction('fullTokenGroupName', fullTokenGroupName);
Pulsar.registerFunction('gradientDescription', gradientDescription);
Pulsar.registerFunction('gradientTokenValue', gradientTokenValue);
Pulsar.registerFunction('shadowDescription', shadowDescription);
Pulsar.registerFunction('shadowTokenValue', shadowTokenValue);
Pulsar.registerFunction(
  'measureTypeIntoReadableUnit',
  measureTypeIntoReadableUnit
);
Pulsar.registerFunction('typographyDescription', typographyDescription);
Pulsar.registerFunction(
  'convertTypographyTokenToCSS',
  convertTypographyTokenToCSS
);
Pulsar.registerFunction('getFormattedColor', getFormattedColor);
Pulsar.registerFunction('getColorValueFromSettings', getColorValueFromSettings);
Pulsar.registerFunction('safeToken', safeToken);
Pulsar.registerFunction('tokenValueToHex', tokenValueToHex);
Pulsar.registerFunction('getBorderStyleValue', getBorderStyleValue);
Pulsar.registerFunction(
  'measureValueToReadableUnit',
  measureValueToReadableUnit
);
Pulsar.registerFunction('isDimensionToken', isDimensionToken);
Pulsar.registerFunction('isStringToken', isStringToken);
Pulsar.registerFunction('isOptionsToken', isOptionsToken);
Pulsar.registerFunction(
  'decimalOpacityToPercentage',
  decimalOpacityToPercentage
);
Pulsar.registerFunction('extendFontFamily', extendFontFamily);
Pulsar.registerFunction('normalizeFontSizeCSS', normalizeFontSizeCSS);
Pulsar.registerFunction(
  'convertTextDecorationToCSS',
  convertTextDecorationToCSS
);
Pulsar.registerFunction(
  'convertTextCaseToTextTransform',
  convertTextCaseToTextTransform
);

/* Markdown */
Pulsar.registerFunction('markdownToHTML', markdownToHTML);

/* Component Health */
Pulsar.registerFunction('convertHealthTagIfAny', convertHealthTagIfAny);
Pulsar.registerFunction(
  'sortComponentsAlphabetically',
  sortComponentsAlphabetically
);
Pulsar.registerFunction('getFigmaFileUrl', getFigmaFileUrl);

/* Sandbox */
Pulsar.registerFunction('htmlSafeString', htmlSafeString);
Pulsar.registerFunction('htmlSafeUrl', htmlSafeUrl);

/* Colors */
Pulsar.registerFunction('contrastColorAPCA', contrastColorAPCA);
Pulsar.registerFunction('returnSwatchClassnames', returnSwatchClassnames);
Pulsar.registerFunction('getColorContrastRatio', getColorContrastRatio);
Pulsar.registerFunction('getClassForInvertedText', getClassForInvertedText);

/* Release notes */
Pulsar.registerFunction('changelogToEntries', changelogToEntries);

/* Figma Components */
Pulsar.registerFunction('getComponentPreviews', getComponentPreviews);
Pulsar.registerFunction('sortComponentsPreviews', sortComponentsPreviews);

/* Assets */
Pulsar.registerFunction(
  'getAssetBlockColumnsClassname',
  getAssetBlockColumnsClassname
);
Pulsar.registerFunction('sortAssetsByName', sortAssetsByName);
Pulsar.registerFunction(
  'getDynamicVariableForStyle',
  getDynamicVariableForStyle
);

/* Fonts */
Pulsar.registerFunction(
  'extractFontFamiliesFromTokens',
  extractFontFamiliesFromTokens
);
Pulsar.registerFunction('processFontsForLoading', processFontsForLoading);
Pulsar.registerFunction('getDefaultBrand', getDefaultBrand);
Pulsar.registerFunction('getFontFormat', getFontFormat);

/* Storybook */
Pulsar.registerFunction('convertStoryPropsToJson', convertStoryPropsToJson);
Pulsar.registerFunction('getActualEmbedUrl', getActualEmbedUrl);
Pulsar.registerFunction('isEmbedDocs', isEmbedDocs);

/* Files */
Pulsar.registerFunction('convertFileToShortcut', convertFileToShortcut);
Pulsar.registerFunction('getIconUrlFromFileType', getIconUrlFromFileType);
Pulsar.registerFunction('getFileTypeFromFileName', getFileTypeFromFileName);
Pulsar.registerFunction('getFileFromFiles', getFileFromFiles);
Pulsar.registerFunction('getFilesVariantClass', getFilesVariantClass);
Pulsar.registerFunction('getActualFileName', getActualFileName);
