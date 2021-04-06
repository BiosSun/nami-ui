const webpack = require('webpack')

module.exports = {
    core: { builder: 'webpack5' },
    stories: ['../packages/**/__stories__/*.@(ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-scss'],
    webpackFinal: async (config) => {
        // __DEV__
        // ---------------------------
        config.plugins.push(
            new webpack.DefinePlugin({
                __DEV__: true,
            }),
        )

        return config
    },
}
