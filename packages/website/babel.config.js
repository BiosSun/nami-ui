module.exports = {
    presets: [require.resolve('@docusaurus/core/lib/babel/preset')],
    plugins: [
        require.resolve('@babel/plugin-proposal-class-properties'),
        [
            require.resolve('@babel/plugin-transform-react-jsx'),
            {
                runtime: 'automatic',
            },
        ],
    ],
}
