const BASE = 'https://api.figma.com/v1';

// https://www.figma.com/developers/docs#get-images-endpoint
export function fileImage(fileKey: string, ids: string) {
    return `${ BASE }/images/${ fileKey }?ids=${ ids }&format=svg`;
}
