/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { STORY_CHANGED, STORY_RENDERED } from '@storybook/core-events';
import { ImageConfig } from 'storybook-addon-designs/esm/config';
// @ts-ignore
import { Placeholder, TabsState } from '@storybook/components';
import ImagePreview from 'storybook-addon-designs/esm/register/components/Image';
import { loadFigmaImagesByIDs } from './util';

import { Channel } from '@storybook/channels';
import { constants, DecoratorParams } from './typings';

declare interface StorybookAddon extends Channel {
    getParameters(id: string, key: string): DecoratorParams;
}

interface Props {
    active: boolean;
    api: StorybookAddon;
    channel: Channel;
}

function getPanels(config: ImageConfig | ImageConfig[], names: string[]): [ReactElement, { id: string; title: string }][] {
    return [...(Array.isArray(config) ? config : [config])].map((cfg, i) => {
        const meta = {
            id: `${ constants.ADDON_NAME }-${ i }`,
            title: names[i] || cfg.name || '',
        };
        
        return [<ImagePreview key={ meta.id } config={ cfg }/>, meta];
    });
}

function PlaceholderMessage(props: any): ReactElement {
    return (
        <Placeholder>
            <Fragment { ...props }/>
        </Placeholder>
    );
}

export default function FigmaPanel({ api, active, channel }: Props): ReactElement {
    const [config, setConfig] = useState<ImageConfig | ImageConfig[]>();
    const [hasImages, setHasImages] = useState();
    const [imageNames, setNames] = useState();
    const [apiConfig, setApiConfig] = useState<{
        apiToken: string;
        projectID: string;
    }>();
    
    const [storyId, changeStory] = useState<string>();
    
    useEffect(() => {
        const onStoryChanged = async (id: string) => {
            changeStory(id);
            
            const params = api.getParameters(id, constants.PARAM_KEY);
            
            setHasImages(Boolean(params));
            
            if (!params) {
                return;
            }
            
            const { ids, names } = params;
            
            if (ids && apiConfig) {
                setNames(names || []);
                const cfg = await loadFigmaImagesByIDs(ids, apiConfig.projectID, apiConfig.apiToken);
                
                setConfig(cfg);
            }
        };
        
        channel.on(constants.UPDATE_CONFIG_EVENT, setApiConfig);
        channel.on(STORY_CHANGED, onStoryChanged);
        channel.on(STORY_RENDERED, onStoryChanged);
        
        return () => {
            channel.removeListener(constants.UPDATE_CONFIG_EVENT, setApiConfig);
            channel.removeListener(STORY_CHANGED, onStoryChanged);
            channel.removeListener(STORY_RENDERED, onStoryChanged);
        };
    }, [apiConfig]);
    
    if (!active) {
        return <noscript/>;
    }
    
    if (hasImages === false) {
        return <PlaceholderMessage>This component has no figma designs ¯\_(ツ)_/¯</PlaceholderMessage>;
    }
    
    if (!config || !storyId) {
        return <PlaceholderMessage>Loading designs...</PlaceholderMessage>;
    }
    
    const panels = getPanels(config, imageNames);
    
    return (
        <TabsState key={ storyId } absolute={ true } initial={ panels[0][1].id }>
            { panels.map(([el, meta]) => (
                <div key={ meta.id } id={ meta.id } title={ meta.title }>
                    { el }
                </div>
            )) }
        </TabsState>
    );
}
