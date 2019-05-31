# Description

Figma storybook addon to embed private and public figma projects.
This addon was designed and tested only in a react environment.

[![Build Status][circleci-image]][circleci-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![NPM version][npm-version-image]][npm-url]
[![Code quality][codeclimate-image]][codeclimate-url]
[![MIT License][license-image]][license-url]

# Installation

```bash
npm i @dreipol/storybook-figma-addon storybook-addon-designs -D
```

# Usage

1. Register the plugin in `addons.js`
    ```js
    import '@dreipol/storybook-figma-addon/register';
    ```
2. Set your figma project id and API token
    ```js
    import { addDecorator } from '@storybook/react';
    import { withFigma } from '@dreipol/storybook-figma-addon';

    addDecorator(withFigma({
        apiToken: process.env.FIGMA_API_TOKEN,
        projectID: process.env.FIGMA_PROJECT_ID,
    }));
    ```
3. Use it in your component stories
    ```jsx harmony
   stories.add(
        'Default',
        () => <ComponentExample/>,
        {
            // one or more figma image ids concatenated via commas
          figma: { 
             ids: '14%3A160,45%3A1939',
             names: ['Buttons', 'Buttons Hover']
          },
        },
    );
    ```
    
    
[circleci-image]: https://circleci.com/gh/dreipol/storybook-figma-addon.svg?style=svg
[circleci-url]: https://circleci.com/gh/dreipol/storybook-figma-addon
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]: LICENSE
[npm-version-image]: http://img.shields.io/npm/v/@dreipol/storybook-figma-addon.svg?style=flat-square
[npm-downloads-image]: http://img.shields.io/npm/dm/@dreipol/storybook-figma-addon.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@dreipol/storybook-figma-addon
[codeclimate-image]: https://api.codeclimate.com/v1/badges/fb8c4a8a6043d9e73f7f/maintainability
[codeclimate-url]: https://codeclimate.com/github/dreipol/storybook-figma-addon/maintainability


