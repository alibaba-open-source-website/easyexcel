/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Easy Excel',
    tagline: 'EasyExcel是一个基于Java的，快速、简洁、解决大文件内存溢出的Excel处理工具。',
    url: 'https://easyexcel.opensource.alibaba.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'alibaba', // Usually your GitHub org/user name.
    projectName: 'easyexcel', // Usually your repo name.

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // 这里写自己的文档编辑地址
                    editUrl: 'https://github.com/alibaba-open-source-website/easyexcel/tree/main/',
                    lastVersion: 'current',
                    versions: {
                        "current": {
                            label: "3.1.x",
                            path: "current",
                        },
                        "3.0.x": {
                            label: "3.0.x",
                            path: "3.0.x",
                        },
                        "2.x": {
                            label: "2.x",
                            path: "2.x",
                        },
                    }
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
                // 设置谷歌数据分析
                gtag: {
                    trackingID: 'G-CKCNEFWX6M',
                    anonymizeIP: true,
                },
            }),
        ],
    ],

    plugins: [
        [
            // 这里新增一个 多个doc的插件 专门用来 管理 社区 可以参考：https://docusaurus.io/docs/docs-multi-instance
            // 为什么不用docs一起？ 因为 社区 不需要版本管理
            '@docusaurus/plugin-content-docs',
            {
                id: 'community',
                path: 'community',
                routeBasePath: 'community',
                sidebarPath: require.resolve('./sidebarsCommunity.js'),
            },
        ],
        [
            // 常见问题
            '@docusaurus/plugin-content-docs',
            {
                id: 'qa',
                path: 'qa',
                routeBasePath: 'qa',
                sidebarPath: require.resolve('./sidebarsQa.js'),
            },
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            prism: {
                //  这里设置 支持```java ``` 这种代码块的样式，详细文档参照： https://www.docusaurus.cn/docs/markdown-features/code-blocks
                additionalLanguages: ['java'],
                // 可以配置不同的代码块样式 参考：https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages
                // 可选项：https://github.com/FormidableLabs/prism-react-renderer/tree/master/src/themes
                theme: require('prism-react-renderer/themes/github'),
                darkTheme: require('prism-react-renderer/themes/oceanicNext'),
            },
            // 这里设置关键字 和描述 ，方便给搜索引擎收录
            metadata: [
                {
                    name: 'keywords',
                    content: 'easyexcel 官方,easyexcel官方文档,easyexcel,easyexcel官网,easyexcel official,Excel,Easy Excel,Java,xls,xlsx,csv,省内存,简单,读excel,写excel,解析Excel,poi,oom,OutOfMemoryError'
                },
                {
                    name: 'description',
                    content: 'EasyExcel是一个基于Java的，快速、简洁、解决大文件内存溢出的Excel处理工具。'
                },
            ],
            // 最上面的广告位
            announcementBar: {
                id: 'announcementBar-2',
                content: '⭐ 开源不易，如果觉得本项目对您的工作还是有帮助的话， 请帮忙在<a target="_blank" rel="noopener noreferrer" href="https://github.com/alibaba/easyexcel">GitHub</a> 点个⭐️',
            },
            navbar: {
                title: 'Easy Excel',
                logo: {
                    alt: 'Easy Excel',
                    src: 'img/logo.png',
                    href: 'https://easyexcel.opensource.alibaba.com',
                    target: '_self',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'index',
                        position: 'right',
                        label: '文档',
                    },
                    {
                        type: 'doc',
                        docId: 'api/index',
                        position: 'right',
                        label: 'API',
                    },
                    {
                        label: '常见问题',
                        type: 'doc',
                        docId: 'index',
                        position: 'right',
                        docsPluginId: 'qa',
                    },
                    {
                        label: '社区',
                        type: 'doc',
                        docId: 'support',
                        position: 'right',
                        docsPluginId: 'community',
                    },
                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownActiveClassDisabled: true
                    },
                    {
                        href: 'https://github.com/alibaba/easyexcel',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        type: 'search',
                        position: 'right',
                    },
                ],
            },
            footer: {
                logo: {
                    alt: 'Alibaba Open Source Logo',
                    src: 'img/opensource_logo.png',
                    href: 'https://opensource.alibaba.com',
                },
                // Please do not remove the credits, help to publicize Docusaurus :)
                copyright: `Copyright © ${new Date().getFullYear()} Alibaba, Inc. Built with Docusaurus.`,
            },
        }),

    themes: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                // `hashed` is recommended as long-term-cache of index file is possible.
                hashed: true,
                language: ["en", "zh"],
            },
        ],
    ],

};

module.exports = config;
