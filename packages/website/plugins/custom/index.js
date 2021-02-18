const webpack = require('webpack')

module.exports = () => {
    return {
        name: 'custom-docusaurus-plugin',
        configureWebpack(config) {
            const scriptsRule = config.module.rules[4]
            scriptsRule.exclude = ((_exclude) => {
                return function wrapExclude(modulePath) {
                    if (/\.tsx?$/.test(modulePath)) {
                        return false
                    }

                    return _exclude(modulePath)
                }
            })(scriptsRule.exclude)

            return {
                // 处理使用 react-view 时抛出的 `Can't resolve 'fs' in ...` 错误
                node: {
                    fs: 'empty',
                },

                resolve: {
                    // // 因为 docs/ 中的文档大多都是从其它子包中外链过来的，因此必须添加该配置
                    symlinks: false,

                    // // 在 react-view 修复 React 元素表达式无法正常渲染的问题之前，先使用私有的修复版本（2021-02-17）
                    // alias: {
                    //     'react-view': '@biossun/react-view',
                    // },
                },

                plugins: [
                    // 处理各组件代码中的 __DEV__ 常量
                    new webpack.DefinePlugin({
                        __DEV__: true,
                    }),
                ],

                // watchOptions: {
                //     followSymlinks: true,
                // },
            }
        },
    }
}
