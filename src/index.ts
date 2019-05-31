import { constants } from './typings';
import addons, { makeDecorator, StoryWrapper } from '@storybook/addons';

const wrapper: StoryWrapper = (getStory, context, { parameters, options }) => {
    const channel = addons.getChannel();
    const storyOptions = parameters || options;
    
    channel.emit(constants.UPDATE_CONFIG_EVENT, storyOptions.figma || storyOptions);
    
    return getStory(context);
};

export const withFigma = makeDecorator({
    name: constants.DECORATOR_NAME,
    parameterName: constants.PARAM_KEY,
    skipIfNoParameterOrOptions: true,
    wrapper,
});

if (module && module.hot && module.hot.decline) {
    module.hot.decline();
}


