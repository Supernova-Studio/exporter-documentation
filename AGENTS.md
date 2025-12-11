# Instructions for AI Agents

This document provides essential guidelines for AI agents working on this repository.

## Pre-Commit Requirements

### 1. Compile Assets Before Committing

This project uses a build process that compiles SCSS and TypeScript/JavaScript files. **Compiled files must be committed to the repository.**

Before committing any changes, you **must** run the build command:

```bash
npm run build
```

This command compiles:

- **SCSS files** from `scss/` → compiled CSS in `assets/dist/docs.min.css`
- **TypeScript files** from `typescript/` → compiled JavaScript in `src/js_helpers.js`
- **JavaScript files** from `assets/js/` → bundled and minified in `assets/dist/docs.min.js`

**Important:** The compiled files in `assets/dist/` and `src/js_helpers.js` must be committed alongside any source file changes.

### 2. Update Version in exporter.json

Whenever you make any changes to the codebase, you **must** update the version number in `exporter.json`.

The version field is located at:

```json
{
  "version": "X.Y.Z"
}
```

Follow semantic versioning:

- **Patch** (X.Y.Z+1): Bug fixes, minor changes
- **Minor** (X.Y+1.0): New features, backwards-compatible changes
- **Major** (X+1.0.0): Breaking changes

## Development Workflow

1. Make your changes to source files (`scss/`, `typescript/`, `assets/js/`, `src/`)
2. Run `npm run build` to compile assets
3. Update the version in `exporter.json`
4. Commit both source files and compiled assets together
5. Create a meaningful commit message describing the changes

## Additional Notes

- Do not edit files in `assets/dist/` or `src/js_helpers.js` directly - these are generated files
- For development, you can use `npm run watch` to automatically rebuild on file changes
- The build configuration is defined in `webpack.config.js`
