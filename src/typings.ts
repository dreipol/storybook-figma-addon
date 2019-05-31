export interface FigmaImageAPIResponse {
    err: string | null;
    images: FigmaImageAPIObject;
}

export interface FigmaImageAPIObject {
    [key: string]: string;
}

export interface FigmaImage {
    url: string;
    name: string;
    type: 'image';
}

export interface DecoratorParams {
    ids?: string;
    apiToken: string;
    projectID: string;
}

export enum constants {
    ADDON_NAME = 'STORYBOOK_ADDON_FIGMA',
    DECORATOR_NAME = 'withFigma',
    PARAM_KEY = 'figma',
    PANEL_NAME = 'STORYBOOK_ADDON_FIGMA/panel',
    UPDATE_CONFIG_EVENT = 'STORYBOOK_ADDON_FIGMA/update_config',
    ADDON_TITLE = 'Figma',
}
