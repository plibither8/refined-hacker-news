# Contributing
> Development contribution guide (work-in-progress).

## Contents

- [Contents](#contents)
- [Developing](#developing)
  - [Workflow](#workflow)
  - [Installing](#installing)
  - [Running](#running)
  - [Enabling Developer Extensions in Chrome](#enabling-developer-extensions-in-chrome)
  - [Linting](#linting)
- [Creating Features](#creating-features)

## Developing

### Workflow

1. Fork the repository
2. Do development on a branch
3. Submit a pull request from that branch to the upstream repository (`master`)

### Installing

1. Fork the repository
2. Clone the fork locally and navigate to the containing folder
3. Install dependencies:
    ```
    $ npm install
    ```

### Running

To run the development server in watch mode:

```
$ npm run watch
```

### Enabling Developer Extensions in Chrome

In order to access the development build of the extension, you must enable developer extensions
in Chrome.

1. Open Chrome
2. Navigate to `chrome://extensions/` (`More Tools` > `Extensions`)
3. Enable `Developer mode` in the top-right corner
4. Click `Load unpacked`
5. Select the `dist` folder of the project directory

### Linting

To run all linting:

```
$ npm run lint
```

To automatically fix linting errors:

```
$ npm run lint-fix
```

## Creating Features

To create new features, please take a look at the format of any feature file found [here](src/features). 

Proper documentation for contributing is a work in progress. Thanks for the patience! 🙂
