# Changelog

All notable changes to this exporter are mentioned here in this file.

## [1.22] - 2022-22-02
### Block variants
- Added ability to define block variants. You can now select variant inside editor and access it through `variantKey` property
- Added tab mode rendering variant "pill"

## [1.21] - 2022-22-02
### Custom CSS, Custom Footers
- Added new configuration category - Advanced. This category contains super-powered features that are only available because of the Pulsar engine ❤️
- Added ability to define custom CSS for the entire doc site
- Added ability to change font definition for the site
- Added ability to load additional fonts for the site, and remove default one
- Added ability to define custom Footer using HTML
- Added default font definition (CSS)
- Added default font definition (HTML)
- Added default footer definition (HTML) and default generated footer
- Renamed all configuration sections to make more sense
- Unified CSS definitions to be just one file

## [1.19] - 2022-19-02
### Tab Blocks
- It is now possible to render tab blocks
- Preparation for tables, columns
- Cleanup of some experimental blocks and remnants of the old code

## [1.18] - 2022-19-02
### Previous & Next navigation
- It is now possible to navigate back and forth between pages with new navigation menu
- Added option to enable / disable this behavior
- Removed dynamic health custom blocks and general cleanup - additional functionality like this will be moved to separate repository as submodule when this feature is available globally (spoiler alert :)
- Significantly improved rendering of Figma frames, especially in large, single-image mode

## [1.17] - 2022-18-02
### Bugfixes & improvements
- Rendering of blocks have been heavily improved, all spacings, block paddings etc. was streamlined
- Fixed rendering of (un)ordered lists and numeric lists being incorrectly aligned with design
- Fixed rendering of child blocks (created with tabs) when used alongside lists, will now be exactly aligned with lists, except the bullet point or number  
- Foreground and background color of page titles can now be properly configured using both raw values and tokens
- Quotes, Callouts, Texts, Headers and all other blocks with rich text type will properly render soft newlines
- Page headers will properly render soft newlines for both title and description fields
- Quotes will no longer incorrectly offset the first row
- Auto-sized, cented page headers will no longer be too small to fix content
- Added option to show / hide frame titles on figma frames
- Fixed overriden asset titles now properly showing
- When scrolling through side content menu (headers), header will properly scroll to the viewport and won't be obscured be the top header anymore
- Fixed rendering of transparent background for figma frames
- Fixed rendering of transparent background for assets
- Added option to override background colors for frames and assets, also on per-asset basis


## [1.16] - 2022-18-02
### New Search Engine + Rendering improvements
- Exporter now uses Fuse.js to do the search and allows for very good customization of fuzzy searching as well
- Search was fixed to be more precise and allows to find "exact" match, which wasn't previously possible
- Search is now easier to modify and add additional sources of data into it, for example coming from external API when search index is built


## [1.0-1.15] - 2021 - 2022
### Initial implementation

