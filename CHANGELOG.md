# Changelog

All notable changes to this exporter are mentioned here in this file.


## [1.17] - (work in progress)
### Bugfixes & improvements
- Foreground and background color of page titles can now be properly configured using both raw values and tokens
- Quotes, Callouts, Texts, Headers and all other blocks with rich text type will properly render soft newlines
- Page headers will properly render soft newlines for both title and description fields
- Quotes will no longer incorrectly offset the first row
- Auto-sized, cented page headers will no longer be too small to fix content
- Added option to show / hide frame titles on figma frames
- Fixed overriden asset titles now properly showing
- When scrolling through side content menu (headers), header will properly scroll to the viewport and won't be obscured be the top header anymore


## [1.16] - 2022-18-02
### New Search Engine + Rendering improvements
- Exporter now uses Fuse.js to do the search and allows for very good customization of fuzzy searching as well
- Search was fixed to be more precise and allows to find "exact" match, which wasn't previously possible
- Search is now easier to modify and add additional sources of data into it, for example coming from external API when search index is built
- Rendering of blocks have been heavily improved, all spacings, block paddings etc. was streamlined


## [1.0-1.15] - 2021 - 2022
### Initial implementation

