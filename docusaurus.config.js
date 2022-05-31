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
    tagline: '快速、简洁、解决大文件内存溢出的java处理Excel工具',
    url: 'https://easyexcel.opensource.alibaba.com/',
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
                    editUrl: 'https://github.com/alibaba-open-source-website/easyexcel',
                    lastVersion: 'current',
                    versions: {
                        "current": {
                            label: "3.0.x",
                            path: "current",
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
                // ... other options
            },
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            //  这里设置 支持```java ``` 这种代码块的样式，详细文档参照： https://www.docusaurus.cn/docs/markdown-features/code-blocks
            prism: {
                additionalLanguages: ['java'],
            },
            // 这里设置关键字 和描述 ，方便给搜索引擎收录
            metadata: [
                {
                    name: 'keywords',
                    content: 'Excel,Easy Excel,easyexcel 官方,easyexcel,Java,xls,xlsx,csv,省内存,简单,读excel,写excel,解析Excel,poi,oom,OutOfMemoryError'
                },
                {
                    name: 'description',
                    content: '快速、简洁、解决大文件内存溢出的java处理Excel工具'
                },
            ],
            navbar: {
                title: 'Easy Excel',
                logo: {
                    alt: 'Easy Excel',
                    src: 'img/logo.png',
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
                        type: 'doc',
                        docId: 'qa/index',
                        position: 'right',
                        label: '常见问题',
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

};

module.exports = config;
