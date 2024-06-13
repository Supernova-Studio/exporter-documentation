// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - General utils
var hash = require('short-hash');
import semverSort from "semver-sort";

export function getFullYear(): string {
    return new Date().getFullYear().toString();
}

/* Check if javascript includes exact value */
export function includes(arr: string[], value: string): boolean {
    return arr.includes(value);
}

/* Get current formatted datetime */
export function getFormattedDateTime(date = new Date()): string {
    return date.toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric', hour12: false, hour: '2-digit', minute:'2-digit'});
}

/* hash custom CSS to hash so it can be used for versioning CSS */
export function generateCustomCSSHash(configuration: any): string {

    // only hash the selected keys – only the ones that are tokenized as CSS Custom Properties or added to custom.cs file
    const selectedKeys = [
        'customCSS',
        'customFontFamily',
        'lookAndFeelAccentColor',
        'lookAndFeelAccentAlternativeColor',
        'lookAndFeelAccentSurfaceColor',
        'themeConfiguration',
        'siteMaxWidth',
        'contentContainerWidth',
        'topNavigationStyle',
        'topNavigationBackground',
        'topNavigationHeight',
        'limitSiteMaxWidth',
        'sideNavigationStyle',
        'sideNavigationBackground',
        'headerLogoHeight',
        'iconStrokeWidth',
        'lookAndFeelHeaderLayoutStyle',
        'lookAndFeelHeaderBackgroundColor',
        'lookAndFeelHeaderTextColor',
        'advancedCustomizationCustomCSS'
    ];

    // Filter only configuration keys from selectedKeys
    const filteredConfiguration = Object.keys(configuration)
        .filter(key => selectedKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = configuration[key];
            return obj;
        }, {});

    return hash(JSON.stringify(filteredConfiguration));
}


interface VersionObject {
  id: string;
  name: string;
  description: string;
  version: string;
  changeLog: string | null;
  isReadOnly: boolean;
  isSharedDraft: boolean;
}

interface VersionWithKey {
  original: VersionObject;
  key: string | null;
}

export const sortVersionsBySemver = (versions: VersionObject[]): VersionObject[] => {
  const versionsWithKeys: VersionWithKey[] = versions.map((version) => ({
    original: version,
    key: version.version.match(/\d+\.\d+\.\d+(-[a-zA-Z0-9_]+)?/)?.[0] || null,
  }));

  const validVersions = versionsWithKeys.filter((item) => item.key);

  const sortedValidVersions = semverSort
    .desc(validVersions.map((item) => item.key!))
    .map(
      (sortedKey) =>
        validVersions.find((item) => item.key === sortedKey)!.original
    );

  const nonSemverEntries = versionsWithKeys
    .filter((item) => !item.key)
    .map((item) => item.original);

  return sortedValidVersions.concat(nonSemverEntries);
};