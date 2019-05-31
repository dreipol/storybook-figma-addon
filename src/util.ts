import { curry, flowRight as compose, memoize } from 'lodash';
import { fileImage } from './endpoints';
import { FigmaImage, FigmaImageAPIObject, FigmaImageAPIResponse } from './typings';

const FIGMA_TOKEN_HEADER = 'X-Figma-Token';

// Convert the API images into valid arguments for https://github.com/pocka/storybook-addon-designs
const toFigmaImages = (images: FigmaImageAPIObject): FigmaImage[] => Object.entries(images).map(([name, url]) => ({
    name,
    url,
    type: 'image',
}));

async function fetchImages(token: string, url: string) {
    const res = await fetch(url, {
        headers: {
            [FIGMA_TOKEN_HEADER]: token,
        },
    });
    
    return res.json();
}

// Load asynchronously figma images by id
export const loadFigmaImagesByIDs = memoize(async (ids: string, projectId: string, apiToken: string): Promise<FigmaImage[] | never> => {
    const figmaProjectId = projectId;
    
    if (!figmaProjectId) {
        throw new Error('The figma project id was not set. You can either pass it to this function or set in via "FIGMA_PROJECT_ID" in your environment variables');
    }
    
    // curry the file image api endpoint
    const imagesEndpointWithProjectID = curry(fileImage)(figmaProjectId);
    // curry the fetch method
    const fetchImagesWithToken = curry(fetchImages)(apiToken);
    const loadImagesByIDs = compose(fetchImagesWithToken, imagesEndpointWithProjectID);
    
    try {
        const data: FigmaImageAPIResponse = (await loadImagesByIDs(ids));
        
        return toFigmaImages(data.images);
    } catch (error) {
        throw new Error(error);
    }
});
