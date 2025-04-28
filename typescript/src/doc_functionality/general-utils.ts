// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - General utils
var hash = require('short-hash');
import semver from "semver";

export function getFullYear(): string {
    return new Date().getFullYear().toString();
}

/* Check if javascript includes exact value */
export function includes(arr: string[], value: string): boolean {
    return arr.includes(value);
}

/* Get object values */
export function objectValues(obj: object): any[] {
    return Object.values(obj);
}

/* Get object entries */
export function objectEntries(obj: object): any[] {
    return Object.entries(obj);
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
  key: string | null;        // Normalized version string (e.g., "4.2.87" from "4.02.87")
  originalKey?: string;      // Original matched version string before normalization
}

/**
 * Normalizes a version string by removing leading zeros from each number part
 * Example: "4.02.87" -> "4.2.87"
 */
const normalizeVersion = (version: string): string | null => {
  // Remove leading zeros from each number part
  const normalized = version
    .split(".")
    .map((part) => {
      const num = part.replace(/^0+/, "")
      return num || "0" // If all zeros were removed, keep at least one zero
    })
    .join(".")

  return semver.valid(normalized) ? normalized : null
}

/**
 * Sorts an array of version objects by their semantic version numbers in descending order.
 * Non-semver versions are kept in their original order at the end of the array.
 * 
 * @param versions - Array of version objects to sort
 * @returns Sorted array with semver versions first (descending), followed by non-semver versions
 */
export const sortVersionsBySemver = (versions: VersionObject[]): VersionObject[] => {
  // Step 1: Process all versions
  // Convert each version into a normalized format for comparison
  const versionsWithKeys: VersionWithKey[] = versions.map(version => ({
    original: version,
    key: normalizeVersion(version.version),
    originalKey: version.version
  }));

  // Step 2: Split versions into two groups
  // - semverVersions: Versions that follow semantic versioning
  // - nonSemverVersions: Versions that don't follow semantic versioning
  const { semverVersions, nonSemverVersions } = versionsWithKeys.reduce((acc, item) => {
    if (item.key && semver.valid(item.key)) {
      acc.semverVersions.push(item);
    } else {
      acc.nonSemverVersions.push(item.original);
    }
    return acc;
  }, { semverVersions: [] as VersionWithKey[], nonSemverVersions: [] as VersionObject[] });

  // Step 3: Sort semver versions
  // Use semver.rsort to sort versions in descending order
  const sortedSemverVersions = semverVersions.length > 0
    ? semver.rsort(semverVersions.map(item => item.key!))
        .map(sortedKey => semverVersions.find(item => item.key === sortedKey)!.original)
    : [];

  // Step 4: Combine results
  // Return sorted semver versions followed by non-semver versions in original order
  return [...sortedSemverVersions, ...nonSemverVersions];
};

// check if the array is non empty or non null, otherwise return []
export const safeArray = (array: any[] | null | undefined): any[] => {
  return array && array.length > 0 ? array : [];
}

// check if the variable is non empty or non null, otherwise return false
export const isNonEmptyString = (value: string | null | undefined): boolean => {
  return !!value;
}