# Description

Figma storybook addon to embed private and public figma projects

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
    ```jsx
   stories.add(
        'Default',
        () => <ComponentExample/>,
        {
            // one or more figma image ids concatenated via commas
            figma: { ids: '14%3A160,45%3A1939' },
            notes: { markdown },
        },
    );
    ```

