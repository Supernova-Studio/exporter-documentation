<img src="https://raw.githubusercontent.com/Supernova-Studio/exporter-documentation/master/readme-icon.png" alt="Supernova Logo" style="max-width:100%;">


# exporter-rdc-documentation
The RDC documentation exporter is a fork for Supernova's own [exporter](https://github.com/Supernova-Studio/exporter-documentation). It allows you to export static documentation built inside Supernova editor.

## Table of contents 
- [Exporter Overview](./documentation/EXPORTER_OVERVIEW.md) - An overview of the exporter and how to make changes to it 
- [Block Creation](./documentation/BLOCK_CREATION.md) - Full step by step guide on creating custom blocks
- [Documentation Guide](./documentation/DOCUMENTATION_GUIDE.md) - Learn how to write about your changes and custom blocks

## File Structure
```
├── assets
│   ├── css
│   ├── js
│   └── logos
├── icons
├── src
│   ├── page_body
│   │   ├── loaders
│   │   ├── structure
│   │   │   ├── blocks
│   │   │   │   ├── experimental
│   │   │   │   └── tokens
│   │   │   │       ├── previews
│   │   │   │       └── values
│   │   │   └── blocks_custom
│   │   └── support
│   ├── page_head
│   ├── search
│   └── seo
└── typescript
    └── src
        └── doc_functionality

```
### Noteworthy files
- `exporter.json` - Analogous to `package.json`, contains custom block declarations and configurations.
- `src/page_body/structure/page_body_structure_block_custom.pr` - Exports of all custom blocks
- `assets/css/stylesheet.css` - Contains almost all css for exporter (including custom block css)

## Useful Links From Supernova
- To learn more about Supernova, [go visit our website](https://supernova.io)
- To join our community of fellow developers where we try to push what is possible with design systems and code automation, join our [community discord](https://community.supernova.io)
- To understand everything you can do with Supernova and how much time and resources it can save you, go read our [product documentation](https://learn.supernova.io/)
- Finally, to learn everything about what exporters are and how you can integrate with your codebase, go read our [developer documentation](https://developers.supernova.io/

## Other Supernova Exporters
We are developing and maintaining exporters for many major technologies. Here are all the official exporters maintained by Supernova:

- [iOS Exporter](https://github.com/Supernova-Studio/exporter-ios)
- [iOS Localization Exporter](https://github.com/Supernova-Studio/exporter-ios-localization)
- [Android Exporter](https://github.com/Supernova-Studio/exporter-android)
- [React Exporter](https://github.com/Supernova-Studio/exporter-react)
- [Flutter Exporter](https://github.com/Supernova-Studio/exporter-flutter)
- [Angular Exporter](https://github.com/Supernova-Studio/exporter-angular)
- [Typescript Exporter](https://github.com/Supernova-Studio/exporter-typescript)
- [CSS Exporter](https://github.com/Supernova-Studio/exporter-css)
- [LESS Exporter](https://github.com/Supernova-Studio/exporter-less)
- [SASS Exporter](https://github.com/Supernova-Studio/exporter-sass)

Additionally, we are also developing and maintaining exporters for specific use cases:

- [Style Dictionary Exporter](https://github.com/Supernova-Studio/exporter-style-dictionary)
- [HTML Preview Exporter](https://github.com/Supernova-Studio/exporter-html-preview)

To browse all exporters created by our amazing community, please visit the [Supernova](https://supernova.io) Exporter Store.