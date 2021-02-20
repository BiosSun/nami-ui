const path = require('path')
const endent = require('endent').default

module.exports = {
    title: 'Nami UI - React Components.',
    tagline: '一套基于 React 实现的组件库，混乱中立。',
    url: 'https://nami.biossun.org',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'B.S. Labs', // Usually your GitHub org/user name.
    projectName: 'nami-ui', // Usually your repo name.
    themeConfig: {
        sidebarCollapsible: false,
        prism: {
            theme: require('prism-react-renderer/themes/nightOwlLight'),
            darkTheme: require('prism-react-renderer/themes/nightOwl'),
        },
        navbar: {
            hideOnScroll: true,
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    to: '/',
                    activeBaseRegex: '^/$',
                    label: '首页',
                    position: 'left',
                },
                {
                    to: 'docs/about',
                    activeBasePath: 'docs',
                    label: '文档',
                    position: 'left',
                },
                {
                    href: 'https://github.com/biossun/nami-ui',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            copyright: endent`
                该项目由 [Bios Sun][biossun] 设计、开发及维护，其设计灵感来自我无比钟爱的 [北海道的雪][snow]，而名字来自 [海贼王][onepiece] 漫画中的同名角色；

                项目代码遵循 [MIT 开源协议][mit] ，网站内容遵循 [知识共享协议 CC BY-NC-SA 4.0][cc]。

                [biossun]: http://biossun.org
                [snow]: https://www.youtube.com/embed/j0xbX5ivgdA
                [onepiece]: https://one-piece.com/
                [mit]: https://github.com/biossun/nami/blob/master/LICENSE
                [cc]: https://creativecommons.org/licenses/by-nc-sa/4.0
            `,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    path: 'docs',
                    // include: ['**/README.md', '**/docs/**/*.md'],
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.scss'),
                },
            },
        ],
    ],
    plugins: ['docusaurus-plugin-sass', require.resolve('./plugins/custom')],
}
