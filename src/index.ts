import { constants } from './typings';
import addons, { makeDecorator, StoryWrapper } from '@storybook/addons';

const wrapper: StoryWrapper = (getStory, context, { options }) => {
    const channel = addons.getChannel();
    
    channel.emit(constants.UPDATE_CONFIG_EVENT, options);
    
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


