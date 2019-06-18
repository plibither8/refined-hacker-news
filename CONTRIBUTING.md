# Contributing
> Development contribution guide (work-in-progress).

## Contents

- [Contents](#contents)
- [Developing](#developing)
  - [Workflows](#workflows)
  - [Installing](#installing)
  - [Running](#running)
  - [Enabling Developer Extensions](#enabling-developer-extensions)
    - [Chrome](#chrome)
    - [Firefox](#firefox)
  - [Linting](#linting)
- [Creating Features](#creating-features)

## Developing

### Workflows

To run the extension in development:

1. Clone the repository
2. [Install](#installing) and [run](#running)
3. Enable development extensions in [Chrome](#chrome) or [Firefox](#firefox)

### Installing

1. Fork the repository
2. Clone the fork locally and navigate to the containing folder
3. Install dependencies:
    ```sh
    npm install
    ```

### Running

To run the development server in watch mode:

```sh
npm run watch
```

### Enabling Developer Extensions

#### Chrome

In order to access the development build in Chrome, you must enable developer extensions.

1. Open Chrome
1. Navigate to [`chrome://extensions/`](chrome://extensions/) (`More Tools` > `Extensions`)
1. Enable `Developer mode` in the top-right corner
1. Click `Load unpacked`
1. Select the `dist` folder of the project directory

#### Firefox

In order to access the development build in Firefox, you can either run it on the command-line via [`web-ext`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext) or load it as a temporary add-on.

To run via command-line (with automatic reloading when files change):

1. Install `web-ext` globally:
    ```sh
    npm install -g web-ext
    ```
2. Make sure the development build is running (in watch mode)
3. Navigate into the `dist` directory, and run `web-ext`:
    ```sh
    web-ext run
    ```

This will open a browser with the add-on loaded.

To load as a temporary add-on:

1. Open Firefox
1. Navigate to [`about:debugging`](about:debugging)
1. Click `Enable add-on debugging`
1. Click `Load Temporary Add-on` and select the `manifest.json` file in the `dist` directory

### Linting

To run all linting:

```sh
npm run lint
```

To automatically fix linting errors:

```sh
npm run lint-fix
```

## Creating Features

To create new features, please take a look at the format of any feature file found [here](src/features).

Proper documentation for contributing is a work in progress. Thanks for the patience! 🙂
