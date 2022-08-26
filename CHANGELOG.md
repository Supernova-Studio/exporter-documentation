# Changelog

All notable changes to this exporter are mentioned here in this file.

## [2.1.2] - 2022-23-08
### Add _hide pages

- It is now possible to force-hide pages if they are named with `_`. If group is named with `_`, it will hide all content inside it.

## [2.1.0] - 2022-23-08
### New code blocks

- Code blocks were completely reworked. You can now select from 5 different ways how to render your components, and we have added intergration with codemirror for amazing editing experience. Enjoy!

## [2.0.0] - 2022-23-08
### Welcome private libraries!

- We have completely reworked our sandbox engine and are now able to render private libraries! You can now link your private NPM repositories and render your live components directly in your browser. We have additionally made ton of improvements to many aspects of the documentation.

## [1.48] - 2022-21-07
### Added new token options

- Added option to render tokens as column (1, 2, 3, 4), tables and now stacks

## [1.44] - 2022-21-07
### Content menu improvements

- Content menu will now properly track all headers in viewport
- Introduced logic that also checks for the last header in the viewport and will persist it until new one shows up

## [1.43] - 2022-19-07
### New polished design

- We have polished design of the documentation - everything now has proper spacings, margings, paddings, line heights etc. This is to prepare documentation for customization
- We have introduced several new variants how to render tokens
- We have polished how lists and grids behave

## [1.42] - 2022-19-07
### New Search

- Search was completely rewritten
- It is now possible to search through pages, sections, text
- Results are better formatted and show categories where the result comes from
- It is now possible to invoke search using (cmd/ctrl)+(k)
- It is now possible to clear input using (esc), second (esc) will close search
- If there is no search, first (esc) will close search immediately
- It is now possible to go through results using arrow up, arrow down
- It is now possible to go directly to the result by pressing (enter/return)
- New animation was added to make it feel much nicer :)

## [1.40,41] - 2022-14-07
### Deployment + usability fixes and improvements

- Fixed lot of various issues
- Added option to invoke search by keyboard (cmd/ctrl+k)

## [1.38] - 2022-14-07
### Deployment fixes

- Fixed issue where status could prevent deployment of the docs under certain scenarios

## [1.37] - 2022-06-07
### Markdown fixes

- Markdown will no longer fail build if it fails to download itself
- Prepared base work for private markdowns

## [1.36] - 2022-09-06
### Visual fixes

- Table will no longer scroll if not necessary 
- Header Row and Header Column are no longer swapped
- Content menu will no longer show for pages without headers
- Component lists will no longer scroll if not necessary
- Fixed issue where sidebar could not be hidden inside the documentation if that page was not part of the tabbed group
- Removed unnecessary logs

## [1.33] - 2022-26-05
### Hideable version dropdown

- It is now possible to hide documentation version dropdown through documentation settings

## [1.32] - 2022-24-05
### More precise search

- Search will now autoscroll to the specific block instead of going into top of the selected page

## [1.31] - 2022-24-05
### New injection point

- It is now possible to inject custom css and js (or any kind of code / text, really) into the `<head>` block. This gives you even more flexibility than before!

## [1.28-1.30] - 2022-20-05
### Component widgets!

- We have added 3 new widgets: Component health, component checklist and component overview blocks
- Those blocks complement new functionality we are announcing today: System to replace all your spreadsheets!

## [1.27] - 2022-05-05
### Editable React Widgets

- It is now possible to edit React widgets live, and play around with the code
- It is now possible to open React widgets in Codesandbox.io

## [1.27] - 2022-05-05
### Table options

- Tables can now hide borders
- Tables can now highlight header row
- Tables can now highlight header column
- Table cells now have alignment (left, right, center) that applies to all content

## [1.26] - 2022-04-17
### Tables

- Tables will now be generated when used from the cloud editor
- Table configuration is now properly taken into account when generating tables

## [1.25] - 2022-04-07
### Inline links

- It is now possible to generate inline rich text with links
- It is now possible to open links in new tab
- Incorrect links or links to deleted pages are now handled properly (ignored in generation)

## [1.24] - 2022-04-07
### CTA

- Added option to create CTA button that can link to anything you want
- Added better rendering of inline code blocks

## [1.23] - 2022-03-03
### Block variants
- Added option to apply header image to all pages at once by using documentation settings
- Added option to apply header background color to all pages at once by using documentation settings
- Added option to apply header text color to all pages at once by using documentation settings
- Added option to apply header height to all pages at once by using documentation settings
- All header properties that are set through the page configuration will now take precedence over the documentation configuration settings

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

