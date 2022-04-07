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
    url: 'https://your-docusaurus-test-site.com',
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
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    lastVersion: 'current',
                    versions: {
                        "current": {
                            label: "3.x",
                            path: "3.x",
                        },
                        "2.x": {
                            label: "2.x",
                            path: "2.x",
                        },
                    }
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    plugins: [
        [
          'content-docs',
          /** @type {import('@docusaurus/plugin-content-docs').Options} */
          ({
            id: 'qa',
            path: 'qa',
            routeBasePath: '/qa',
            sidebarPath: require.resolve('./sidebars.js'),
          }),
        ],
      ],


    i18n: {
        defaultLocale: "zh",
        locales: ["zh", "en"],
    },

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
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
                        label: '常见问题',
                        type: 'doc',
                        docId: 'index',
                        position: 'right',
                        docsPluginId: 'qa',
                    },

                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownActiveClassDisabled: true
                    },

                    {
                        type: "localeDropdown",
                        position: "right",
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
                style: 'dark',
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
