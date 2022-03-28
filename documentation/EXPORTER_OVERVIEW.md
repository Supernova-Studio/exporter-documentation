# Getting Started
Follow these simple steps to get the library up and running locally.
```bash
# Clone the repo
git clone https://github.com/victor-move/exporter-rdc-documentation.git
cd exporter-rdc-documentation
```
No package installation is necessary, however you will need to install a VSCode plugin in order to start making changes or developing custom blocks.

## VSCode plugin
You can pull in the Supernova design system using their VSCode plugin. This allows you to see your changes to the exporter in the design system on demand. Currently there is no livereload/hot reloading feature, so you will have to make changes and then hit "Run Exporter" on the bottom right of the Supernova VSCode tab panel to manually compile.

Follow their documentation here: https://developers.supernova.io/getting-started.

## CSS Changes
This project is a fork of Supernova's default exporter, which is the primary way they deliver updates to the product. Unfortunately, almost all the exporter styles are located in `assets/css/stylesheet.css`. In order to not lose track of our changes, we want to avoid making changes to `stylesheet.css`. The one exception is custom block CSS, which is fairly standalone and should not cause any issues.

## Naming Your Branch
Pull requests must also have a summary as well as a screenshot of your changes. Their corresponding branches must also ve named accordingly: `<jira ticket name>-short-summary-of-story`.

- ie: given a ticket to update `README.md`, with a Jira ticket of `WEBP-38`, the branch's name is: `WEBP-38-update-readme`

## Pushing Change
Supernova does not automatically pull in changes that are commited to `master`. They must be manually pulled in by visiting the [exporter settings](https://cloud.supernova.io/ws/rdc-docs/ds/default/latest/ci/exporter/96-rdc-exporter/settings) and pressing `PULL LATEST VERSION` under the updates section.

## Documentation
Follow the guide [Documentation Guide](./DOCUMENTATION_GUIDE.md) for details.

## Writing Custom blocks
Follow the guide [Block Creation](./BLOCK_CREATION.md) for details.
