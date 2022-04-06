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
    tagline: 'The tagline of my site',
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
                links: [
                    {
                        title: 'Learn',
                        items: [
                            {
                                label: 'Style Guide',
                                to: 'docs/3.x/',
                            },
                            {
                                label: 'Second Doc',
                                to: 'docs/3.x/',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Stack Overflow',
                                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/docusaurus',
                            },
                            {
                                label: 'Discord',
                                href: 'https://discordapp.com/invite/docusaurus',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'Blog',
                                to: 'blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/facebook/docusaurus',
                            },
                        ],
                    },
                    {
                        title: 'Legal',
                        // Please do not remove the privacy and terms, it's a legal requirement.
                        items: [
                            {
                                label: 'Privacy',
                                href: 'https://opensource.facebook.com/legal/privacy/',
                            },
                            {
                                label: 'Terms',
                                href: 'https://opensource.facebook.com/legal/terms/',
                            },
                            {
                                label: 'Data Policy',
                                href: 'https://opensource.facebook.com/legal/data-policy/',
                            },
                            {
                                label: 'Cookie Policy',
                                href: 'https://opensource.facebook.com/legal/cookie-policy/',
                            },
                        ],
                    },
                ],
                logo: {
                    alt: 'Facebook Open Source Logo',
                    src: 'img/oss_logo.png',
                    href: 'https://opensource.facebook.com',
                },
                // Please do not remove the credits, help to publicize Docusaurus :)
                copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc. Built with Docusaurus.`,
            },
        }),
};

module.exports = config;
