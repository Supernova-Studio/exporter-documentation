<img src="https://raw.githubusercontent.com/Supernova-Studio/exporter-documentation/master/readme-icon.png" alt="Supernova Logo" style="max-width:100%;">

[Supernova](https://supernova.io) is a design system platform that allows you to seamlessly translate your design system data to production-ready code, document your decisions, and build design system tools on top of a thriving ecosystem. Supernova works with any platform or tech stack, is used by many developers and organizations around the world, and can help you save time by replacing manual and repetitive tasks that all developers hate. To learn everything Supernova, please check out our [developer documentation](https://developers.supernova.io/).

# Custom Supernova Documetation Templates
This is my customization to the main _Documentation Exporter_ from Supernova. It includes the following changes:
- add static file assets (`assets/_dist` & `assets/_img`)
- remove "table of contents" & simplify main content column
  - (right-side nav: `#content-nav-container`)

# Documentation Exporter

The documentation exporter allows you to export static documentation build inside Supernova editor. This exporter and description is currently work in progress.

## Installing

In order to make the Supernova HTML preview exporter available for your organization so you can start generating code from your design system, please follow the installation guide in our [developer documentation](https://developers.supernova.io/using-exporters/installing-exporters).

## Reporting Bugs or Requesting Features

In order to faciliate easy communication and speed up delivery of fixes and features for this exporter, we require everyone to log all issues and feature requests through the issue tracking of this repository.

Please read through the [existing issues](https://github.com/Supernova-Studio/exporter-documentation/issues) before you open a new issue! It might be that we have already discussed it before. If you are sure your request wasn't mentioned just yet, proceed to [open a new issue](https://github.com/Supernova-Studio/exporter-documentation/issues) and fill in the required information. Thank you!

## Contributing

If you have an idea for improving this exporter package or want a specific issue fixed quickly, we would love to see you contribute to its development!

There are multiple ways you can contribute, so we have written a [contribution guide](https://developers.supernova.io/building-exporters/contribution-and-requests) that will walk your through the process. Any pull requests to this repository are very welcome.

## Developing styles

Do not directly edit styles in `assets/css` folder. `main.min.css` file is automatically generated from Sass files.

To change a style, edit files in `scss` and run `npm run build`. You can also run `npm run watch` to trigger the build when files are changed.

## License

This exporter is distributed under the [MIT license](./LICENSE.md). [We absolutely encourage you](https://developers.supernova.io/building-exporters/cloning-exporters) to clone it and modify it for your purposes, so it fits the requirements of your stack. If you see that you have created something amazing in the process that others would benefit from, we strongly recommend you consider [publishing it back to the community](https://developers.supernova.io/building-exporters/sharing-exporters-with-others) as well.

## Useful Links

- To learn more about Supernova, [go visit our website](https://supernova.io)
- To join our community of fellow developers where we try to push what is possible with design systems and code automation, join our [community discord](https://community.supernova.io)
- To understand everything you can do with Supernova and how much time and resources it can save you, go read our [product documentation](https://learn.supernova.io/)
- Finally, to learn everything about what exporters are and how you can integrate with your codebase, go read our [developer documentation](https://developers.supernova.io/)

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
